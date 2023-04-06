import axios from "axios";
import { VITRIN_TOKEN } from "@saas/utils/constants";
import { getCookie } from "@saas/utils/helpers/getCookie";

import { getBaseUrl } from "@saas/utils/helpers/getBaseUrl";

export const BASE_URL = getBaseUrl();
const USER_API = `${BASE_URL}users/self/`;
import nodemailer from "nodemailer";
const EMAIL = "info@vitrin.site";
const PASSWORD = "Mobile09362116864";
export default async function handler(req, res) {
  try {
    const {
      headers: { cookie },
      method,
      body,
    } = req;
    const token = req.headers.authorization || getCookie(VITRIN_TOKEN, cookie);

    axios.defaults.headers.common.Authorization = token.startsWith("eyJ")
      ? `Bearer ${token}`
      : token.includes("Token")
      ? token
      : `Token ${token}`;
    const {
      data: {
        meta: { status_code },
      },
    } = await axios.get(USER_API);
    if (status_code === 200) {
      if (method === "POST") {
        const transporter = nodemailer.createTransport({
          host: "smtp.zoho.com",
          port: 465,
          secure: true, // use SSL
          auth: {
            user: EMAIL,
            pass: PASSWORD,
          },
        });
        const mailOptions = {
          from: EMAIL,
          to: body.to,
          subject: body.subject,
          html: body.html,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.status(400).json({ status: "failed", error });
          } else {
            res.status(200).json({ status: "success", data: info });
          }
        });
      } else {
        res
          .status(400)
          .json({ status: "failed", error: "Method is not allowed!" });
      }
    } else {
      res.status(403).end("You don't have access!");
    }
  } catch (e) {
    res.status(500).end({ error: e });
  }
}
