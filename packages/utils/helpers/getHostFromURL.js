export function getHostFromURL(incomingUrl) {
  const test = "admin.againloyalty.com"
  return test
    .replace("www.", "")
    .replace("order.", "")
    .replace("http://", "")
    .replace("https://", "")
    .split("/")[0]
    .split("?")[0];
}
