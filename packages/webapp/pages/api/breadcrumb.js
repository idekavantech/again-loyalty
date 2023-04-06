import Cors from "cors";
function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
const initBreadCrumb = async (pathname, route) => {
  const pathnames = pathname.split("/").map((route, index, self) => {
    let _route = "";
    for (let i = 0; i <= index; i++) {
      if (self[i]) {
        _route += `${self[i]}${index === i ? "" : "/"}`;
      }
    }
    return _route;
  });
  const routes = route.split("/").map((route, index, self) => {
    let _route = "";
    for (let i = 0; i <= index; i++) {
      if (self[i]) {
        _route += `${self[i]}${index === i ? "" : "/"}`;
      }
    }
    return _route;
  });
  const _breadcrumb = routes.map((route) => ({ url: `/${route}` }));

  for (let index = 0; index < pathnames.length; index++) {
    try {
      const pathname = pathnames[index];
      const {
        breadcrumb: { title },
      } = await import(`pages/${pathname}`);
      _breadcrumb[index].title = title;
    } catch (e) {
      console.log(e);
    }
  }
  return _breadcrumb.filter((item) => item.title);
};
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: "*",
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "OPTIONS"],
  })
);
export default async function handler(req, res) {
  try {
    if (process.env.NODE_ENV === "production") {
      await cors(req, res);
      const breadcrumb = await initBreadCrumb(
        req.query.pathname,
        req.query.route
      );
      res.status(200).json({ breadcrumb });
    } else res.status(200).json({ breadcrumb: [] });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
