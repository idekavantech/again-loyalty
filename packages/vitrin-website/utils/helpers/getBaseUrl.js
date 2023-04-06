export function getBaseUrl(url) {
  if (process.env.NODE_ENV === "development") {
    return process.env.STAGING_BASE_URL;
  }
  if (url.search(process.env.STAGING_URL) > -1) {
    return process.env.STAGING_BASE_URL;
  }
  return process.env.PRODUCTION_BASE_URL;
}
