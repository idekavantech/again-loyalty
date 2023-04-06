const createSitemap = (
  _url,
  sitemaps
) => `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${_url}/static-pages-sitemap.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${_url}/pages-sitemap.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${_url}/blog-sitemap.xml</loc>
      </sitemap>
      ${sitemaps.map((links) =>
        links.map(
          (link) => `
            <sitemap>
              <loc>${_url}${link}</loc>
            </sitemap>
          `
        )
      )}
    </sitemapindex>
    `;
function Sitemap() {
  return null;
}
Sitemap.getInitialProps = async ({ res, isServer, business, store }) => {
  if (isServer) {
    const plugins = store.getState().plugins.plugins;
    const sitemaps = Object.keys(plugins)
      .filter((name) => plugins[name].isActive && plugins[name].sitemaps)
      .map((name) => plugins[name].sitemaps);

    return res
      .writeHead(200, { "Content-Type": "text/xml" })
      .end(createSitemap(business.get_vitrin_absolute_url, sitemaps));
  }
};

export default Sitemap;
