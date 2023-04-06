import axios from "axios";
import { VITRIN_TOKEN } from "@saas/utils/constants";
import { getCookie } from "@saas/utils/helpers/getCookie";

import { getBaseUrl } from "@saas/utils/helpers/getBaseUrl";

export const BASE_URL = getBaseUrl();
const USER_API = `${BASE_URL}users/self/`;
import puppeteer from "puppeteer";

// Default export is a4 paper, portrait, using millimeters for units
const baseStyles = `
  @font-face {
    font-family: "dana";
    font-style: normal;
    font-weight: 300;
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-light.eot');
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-light.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
      url('https://hs3-cf.behtarino.com/static/fonts/dana-light.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
      url('https://hs3-cf.behtarino.com/static/fonts/dana-light.woff') format('woff');  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
  }
  @font-face {
    font-family: "dana";
    font-style: normal;
    font-weight: 500;
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-medium.eot');
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-medium.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
      url('https://hs3-cf.behtarino.com/static/fonts/dana-medium.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
      url('https://hs3-cf.behtarino.com/static/fonts/dana-medium.woff') format('woff');  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
  }
  @font-face {
    font-family: "dana";
    font-style: normal;
    font-weight: 600;
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-demibold.eot');
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-demibold.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
      url('https://hs3-cf.behtarino.com/static/fonts/dana-demibold.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
      url('https://hs3-cf.behtarino.com/static/fonts/dana-demibold.woff') format('woff');  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
  }
  @font-face {
    font-family: "dana";
    font-style: normal;
    font-weight: 750;
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-ultrabold.eot');
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-ultrabold.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
      url('https://hs3-cf.behtarino.com/static/fonts/dana-ultrabold.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
      url('https://hs3-cf.behtarino.com/static/fonts/dana-ultrabold.woff') format('woff');  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
  }
  @font-face {
    font-family: "dana";
    font-style: normal;
    font-weight: 800;
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-extrabold.eot');
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-extrabold.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
      url('https://hs3-cf.behtarino.com/static/fonts/dana-extrabold.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
      url('https://hs3-cf.behtarino.com/static/fonts/dana-extrabold.woff') format('woff');  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
  }
  @font-face {
    font-family: "dana";
    font-style: normal;
    font-weight: 900;
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-black.eot');
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-black.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
      url('https://hs3-cf.behtarino.com/static/fonts/dana-black.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
      url('https://hs3-cf.behtarino.com/static/fonts/dana-black.woff') format('woff');  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
  }
  @font-face {
    font-family: "dana";
    font-style: normal;
    font-weight: bold;
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-bold.eot');
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-bold.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
      url('https://hs3-cf.behtarino.com/static/fonts/dana-bold.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
      url('https://hs3-cf.behtarino.com/static/fonts/dana-bold.woff') format('woff');  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
  }
  @font-face {
    font-family: "dana";
    font-style: normal;
    font-weight: normal;
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-regular.eot');
    src: url('https://hs3-cf.behtarino.com/static/fonts/dana-regular.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
      url('https://hs3-cf.behtarino.com/static/fonts/dana-regular.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
      url('https://hs3-cf.behtarino.com/static/fonts/dana-regular.woff') format('woff');  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
  }
  
`;
const generatePDF = async (html, configs = {}) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
      ],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      ...configs,
    });
    await page.close();
    await browser.close();
    return pdfBuffer;
  } catch (e) {
    console.log(e);
  }
};
export default async function handler(req, res) {
  try {
    const {
      headers: { cookie },
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
      const pdf = await generatePDF(
        `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
          
          ${baseStyles}
          body {
            font-family: 'dana';
            direction: rtl;
            font-size: 13px;
          }
          ${body.css}
          </style>
        </head>
        <body>
          ${body.html}
        </body>
      </html>
        `,

        body.configs
      );
      res.json(pdf.toJSON());
    } else {
      res.status(403).end("You don't have access!");
    }
  } catch (e) {
    res.status(500).end({ error: e });
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};
