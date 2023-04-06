/* eslint-disable camelcase */
import { getSiteDomain } from "./generalHelper";
import { getBaseUrl } from "./helpers/getBaseUrl";

export const BUSINESS_PAGES_BY_SITEDOMAIN_API = (url, slug) =>
  `${getBaseUrl(2)}businesses/pages/by_business/?business_slug=${slug}`;
export const BUSINESS_LIGHT_SEO_BY_SITEDOMAIN_API = (url, site_domain) =>
  `${getBaseUrl(2)}businesses/${
    site_domain || getSiteDomain(url)
  }/light_seo_by_site_domain/`;
export const BUSINESS_MANIFEST_API = (url, site_domain) =>
  `https://api.behtarino.com/ssr/${
    site_domain || getSiteDomain(url)
  }/manifest.json`;
