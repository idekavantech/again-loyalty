import Axios from "axios";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { SITEMAP_PRODUCTS_API } from "@saas/utils/api";
import { slugify } from "@saas/utils/helpers/slugify";

const createSitemap = (
  _url,
  products
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${`${_url}/${SHOPPING_PLUGIN_URL}`}</loc>
            <priority>0.8</priority>
        </url>
        ${products
          .map((product) => {
            const slug =
              (product.seo && slugify(product.seo.slug)) ||
              (product.title && slugify(product.title));
            return `
                    <url>
                        <loc>${`${_url}/${SHOPPING_PLUGIN_URL}/products/${product.id}-${slug}`}</loc>
                        <priority>0.6</priority>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;
function Sitemap() {
  return null;
}
const getProducts = async (url) => {
  const _products = [];
  const {
    data: { data: products },
  } = await Axios.get(url);
  _products.push(...products);
  return _products;
};
Sitemap.getInitialProps = async ({ res, isServer, business }) => {
  if (isServer) {
    const products = await getProducts(SITEMAP_PRODUCTS_API(business.slug));

    return res
      .writeHead(200, { "Content-Type": "text/xml" })
      .end(createSitemap(business.get_vitrin_absolute_url, products));
  }
};

export default Sitemap;
