export const formatUrl = (url) => {
  if (!url) return url;
  if (url.slice(0, 4).includes("tel") || url.slice(0, 6).includes("mailto"))
    return url.replace(/^https?:\/\//, "");
  return "//" + url.replace(/^https?:\/\//, "");
};
