import Router from "next/router";

export const handleRedirectsMap = ({ redirectsMap, asPath, isServer, res }) => {
  const item =
    redirectsMap &&
    redirectsMap.find(
      (item) => decodeURIComponent(item.origin) === decodeURIComponent(asPath)
    );
  if (item) {
    if (isServer) {
      return res
        .writeHead(item.type || 302, {
          Location: encodeURI(item.destination),
        })
        .end();
    } else {
      Router.push(encodeURI(item.destination));
    }
  }
};
