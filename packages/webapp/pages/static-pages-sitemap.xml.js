const createSitemap = (_url, links) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
          <loc>${_url}</loc>
          <priority>1</priority>
      </url>
      ${links.map(
        (link) => `
          <url>
              <loc>${_url}${link}</loc>
              <priority>0.8</priority>
          </url>
        `
      )}
    </urlset>
    `;
function Sitemap() {
  return null;
}
Sitemap.getInitialProps = async ({ res, isServer, business, store }) => {
  if (isServer) {
    const plugins = store.getState().plugins.plugins;
    const links = Object.keys(plugins)
      .filter(
        (name) =>
          plugins[name].isActive &&
          plugins[name].baseUrl &&
          plugins[name].baseUrl.should_be_in_sitemap &&
          plugins[name].baseUrl.url
      )
      .map((name) => plugins[name].baseUrl.url);

    return res
      .writeHead(200, { "Content-Type": "text/xml" })
      .end(createSitemap(business.get_vitrin_absolute_url, links));
  }
};

export default Sitemap;
