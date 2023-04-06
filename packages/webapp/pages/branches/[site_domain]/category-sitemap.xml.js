import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { getAllItemsFromMenu } from "@saas/utils/helpers/getAllItemsFromMenu";
import { slugify } from "@saas/utils/helpers/slugify";
const createSitemap = (
  _url,
  menu_items
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${`${_url}/${SHOPPING_PLUGIN_URL}`}</loc>
            <priority>0.8</priority>
        </url>
        ${menu_items
          .map((menuItem) => {
            const slug =
              (menuItem.seo && slugify(menuItem.seo.slug)) ||
              slugify(menuItem.name);
            return `
                    <url>
                        <loc>${`${_url}/${SHOPPING_PLUGIN_URL}/c/${menuItem.id}-${slug}`}</loc>
                        <priority>0.1</priority>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;
function Sitemap() {
  return null;
}
Sitemap.getInitialProps = async ({ res, isServer, business }) => {
  if (isServer) {
    try {
      const menu_items = getAllItemsFromMenu(business.menu);
      return res
        .writeHead(200, { "Content-Type": "text/xml" })
        .end(createSitemap(business.get_vitrin_absolute_url, menu_items));
    } catch (e) {
      console.log(e);
    }
  }
};

export default Sitemap;
