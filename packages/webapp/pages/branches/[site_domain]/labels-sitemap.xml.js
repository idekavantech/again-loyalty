import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { slugify } from "@saas/utils/helpers/slugify";
const createSitemap = (_url, categories) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${`${_url}/${SHOPPING_PLUGIN_URL}`}</loc>
            <priority>0.8</priority>
        </url>
        ${categories
          .map((category) => {
            const slug =
              (category.seo && slugify(category.seo.slug)) ||
              slugify(category.title);
            return `
                    <url>
                        <loc>${`${_url}/${SHOPPING_PLUGIN_URL}/l/${category.id}-${slug}`}</loc>
                        <priority>0.9</priority>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;
};
function Sitemap() {
  return null;
}
Sitemap.getInitialProps = async ({ res, isServer, business }) => {
  if (isServer) {
    try {
      return res
        .writeHead(200, { "Content-Type": "text/xml" })
        .end(
          createSitemap(
            business.get_vitrin_absolute_url,
            business.resource_labels
          )
        );
    } catch (e) {
      console.log(e);
    }
  }
};

export default Sitemap;
