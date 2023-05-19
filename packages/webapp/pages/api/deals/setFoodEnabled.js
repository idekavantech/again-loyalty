import axios from "axios";
export default async function handler(req, res) {
  try {
    const { method, body } = req;
    const _body = typeof body === "string" ? JSON.parse(body) : body;
    if (method === "POST") {
      axios
        .post(
          "https://api-againloyalty.hectora.app/api/v2/resources/hami/change-availability/",
          { ..._body, status: true }
        )
        .then((response) => {
          if (response.data.meta.status_code === 200)
            res.status(200).json({ status: true, ...response.data });
          else res.status(400).json({ status: false, ...response.data });
        })
        .catch((error) => {
          res.status(400).json({ status: false, error });
          return error;
        });
    } else {
      res.status(400).json({ status: false, error: "Method is not allowed!" });
    }
  } catch (e) {
    res.status(500).end(JSON.stringify({ status: false, error: e }));
  }
}
