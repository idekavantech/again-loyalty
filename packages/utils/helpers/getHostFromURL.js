export function getHostFromURL(incomingUrl) {
  return incomingUrl
    .replace("www.", "")
    .replace("order.", "")
    .replace("http://", "")
    .replace("https://", "")
    .split("/")[0]
    .split("?")[0];
}
