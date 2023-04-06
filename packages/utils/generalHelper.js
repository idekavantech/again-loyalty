/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-const */
/* eslint-disable no-var */

import { BACKEND_API_URL, WEBAPP_URLS } from "./constants";

export function getHostFromURL(incomingUrl) {
  return incomingUrl
    .replace("www.", "")
    .replace("order.", "")
    .replace("http://", "")
    .replace("https://", "")
    .split("/")[0]
    .split("?")[0];
}

export function getSiteDomain(incomingUrl = "http://localhost:3000") {
  const appDomains = WEBAPP_URLS?.split(",") || [];
  const host = getHostFromURL(incomingUrl);

  return host.search("localhost") > -1 ||
    host.search("healthCheck") > -1 ||
    appDomains.includes(host) ||
    new RegExp(
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    ).test(host)
    ? process.env.NEXT_PUBLIC_SITE_DOMAIN
    : host.substr(0, host.indexOf("."));
}

export function getBaseUrl() {
  return BACKEND_API_URL;
}
