export const getBranchBusinessSiteDomain = (url) => {
  const beforeAndAfterOfUrl = url
    .replace("https://", "")
    .replace("http://", "")
    .split("/branches/");
  return (
    (beforeAndAfterOfUrl &&
      beforeAndAfterOfUrl[1] &&
      beforeAndAfterOfUrl[1].split("/")[0]) ||
    ""
  );
};
