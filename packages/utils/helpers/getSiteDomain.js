import { getHostFromURL } from "./getHostFromURL";
import { WEBAPP_URLS } from "../constants";

export function getSiteDomain(incomingUrl = "http://localhost:3000") {  
  console.log({incomingUrl})
  const appDomains = WEBAPP_URLS?.split(",") || [];
  const host = getHostFromURL(incomingUrl);

  return process.env.NEXT_PUBLIC_SITE_DOMAIN
  
  return host.search("192.168") > -1 ||
    host.search("localhost") > -1 ||
    host.search("healthCheck") > -1 ||
    appDomains.includes(host) ||
    new RegExp(
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    ).test(host)
    ? process.env.NEXT_PUBLIC_SITE_DOMAIN
    : host.substr(0, host.indexOf("."));
}