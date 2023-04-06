export const isUrlExternal = (url) => {
  if (!url) return false;
  if (url.startsWith("/")) return false;
  return (
    url.split("/")[2] !==
    (typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "")
  );
};
