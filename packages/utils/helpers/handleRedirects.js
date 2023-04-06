import Router from "next/router";

export const handleRedirects = ({ redirectUrl, asPath, isServer, res , redirectType = 302 }) => {
  try {
    const asPathWithoutQuery = asPath.split("?")[0];
    const queryString = asPath.split("?")[1];
    if (redirectUrl && decodeURIComponent(asPathWithoutQuery) !== redirectUrl) {
      if (isServer) {
        return res
          .writeHead(redirectType, {
            Location: encodeURI(
              `${redirectUrl}${queryString ? `?${queryString}` : ""}`
            ),
          })
          .end();
      } else {
        Router.push(
          encodeURI(`${redirectUrl}${queryString ? `?${queryString}` : ""}`)
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
};
