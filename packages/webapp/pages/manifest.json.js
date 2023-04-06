import { BUSINESS_MANIFEST_API } from "@saas/utils/serverApi";

function manifest() {
  return null;
}
manifest.getInitialProps = async ({ res, req, isServer }) => {
  // const request = await fetch(EXTERNAL_DATA_URL);
  // const posts = await request.json();
  if (isServer) {
    const data = await fetch(BUSINESS_MANIFEST_API(req.headers.host));
    const manifestData = await data.json();
    return res
      .writeHead(200, { "Content-Type": "application/json" })
      .end(JSON.stringify(manifestData.data));
  }
};

export default manifest;
