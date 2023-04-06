export const handleNeedAuthentication = ({
  isServer,
  res,
  req,
  isAuthenticated,
  pathname,
  urlPrefix,
}) => {
  if (!isAuthenticated) {
    if (isServer) {
      return res
        .writeHead(302, {
          Location: `${urlPrefix}/login?url=${req.url}`,
        })
        .end();
    } else {
      window.location.href = `${urlPrefix}/login?url=${pathname}`
    }
  }
};
