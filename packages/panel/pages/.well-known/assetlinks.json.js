import { getBaseUrl } from "@saas/utils/helpers/getBaseUrl";

export const BASE_URL = getBaseUrl();

export default function assetLinks() {
  return null;
}
assetLinks.getInitialProps = async ({ res, isServer, store }) => {
  const hasPWAPlugin = store.getState().plugins.plugins?.pwa?.isActive;
  const TWAAssetLinksInPWAPlugin =
    store.getState().plugins.plugins?.pwa?.data.asset_links;

  if (isServer) {
    if (hasPWAPlugin && TWAAssetLinksInPWAPlugin) {
      try {
        return res
          .writeHead(200, { "Content-Type": "application/json" })
          .end(JSON.stringify(TWAAssetLinksInPWAPlugin || []));
      } catch (e) {
        return res.writeHead(500).end("error!");
      }
    } else {
      return res.writeHead(404).end("Not Found!");
    }
  }
};
