import { APP_URL } from "../constants";

export function getAdminUrl(business) {
  const splitUrl = APP_URL.split(".");
  const domain = splitUrl[splitUrl.length - 2];

  const superBusinessDomain = business?.super_business?.site_domain;

  return `https://${domain}.reval.me/admin/${
    superBusinessDomain ? `${superBusinessDomain}/branches/` : ""
  }${business.site_domain}`;
}
