import axios from "axios";
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
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: "*",
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  const { body } = req;
  try {
    await cors(req, res);
    const { data } = await axios.post(
      `https://hostiran.net/endpoint/api/domain/lookup`,
      {
        domain: `${body.name}.ir`,
      }
    );
    if (data?.check?.status === "available")
      res.status(200).json({ status: "success", data: "Domain is available.." });
    else res.status(404).json({ status: "fail", data: "The domain is not available.." });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
