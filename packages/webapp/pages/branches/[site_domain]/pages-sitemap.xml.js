import { GET_PAGES_API } from "@saas/utils/api";
import { getPages } from "@saas/utils/services/getPages";
import { slugify } from "@saas/utils/helpers/slugify";
const createSitemap = (_url, pages) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${`${_url}/`}</loc>
            <priority>0.8</priority>
        </url>
        ${pages
          .filter(
            (page) =>
              page.data &&
              (typeof page.data.is_active === "undefined" ||
                Boolean(page.data.is_active))
          )
          .map((page) => {
            const slug =
              page.data &&
              (page.data.slug ||
                (page.data.seo_title && slugify(page.data.seo_title)));
            return `
                    <url>
                        <loc>${`${_url}${page.data.is_blog ? "/blog/" : "/"}${
                          page.id
                        }-${slug}`}</loc>
                        <priority>0.8</priority>
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
    const pages = await getPages(GET_PAGES_API(business.slug));
    return res
      .writeHead(200, { "Content-Type": "text/xml" })
      .end(createSitemap(business.get_vitrin_absolute_url, pages));
  }
};

export default Sitemap;
