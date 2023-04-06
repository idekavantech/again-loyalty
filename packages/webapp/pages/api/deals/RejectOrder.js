import axios from "axios";
export default async function handler(req, res) {
  try {
    const { method, body } = req;
    const _body = typeof body === "string" ? JSON.parse(body) : body;
    if (method === "POST") {
      axios
        .patch(
          `https://api.behtarino.com/api/v2/shopping-orders/hami/${_body.OrderId?.[0]}/cancel/`,
          _body
        )
        .then((response) => {
          if (response.status === 204)
            res.status(200).json({
              status: true,
              meta: {
                status_code: 200,
                paginated: false,
              },
              data: null,
            });
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
