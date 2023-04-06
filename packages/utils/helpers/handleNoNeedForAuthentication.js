import Router from "next/router";

export const handleNoNeedForAuthentication = ({
  isServer,
  res,
  isAuthenticated,
  urlPrefix,
}) => {
  if (isAuthenticated) {
    if (isServer) {
      return res.writeHead(302, { Location: `${urlPrefix}/` }).end();
    } else {
      window.location.href = `${urlPrefix}/`;
    }
  }
};
