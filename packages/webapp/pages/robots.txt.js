function robots() {
  return null;
}

robots.getInitialProps = async ({ res, isServer, business }) => {
  // const request = await fetch(EXTERNAL_DATA_URL);
  // const posts = await request.json();
  if (isServer) {
    return res.writeHead(200, { "Content-Type": "text/plain" }).end(`
        Sitemap: ${business.get_vitrin_absolute_url}/sitemap.xml
        User-agent:*
        Disallow: /*?*
        Disallow: /checkout/cart
        Disallow: /profile/addresses
        Disallow: /[site_domain]/s
      `);
  }
  return {};
};

export default robots;
