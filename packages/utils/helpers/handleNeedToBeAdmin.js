import Router from "next/router";

export const handleNeedToBeAdmin = ({ user, res, isServer, urlPrefix }) => {
  if (user && !user.isAdmin) {
    if (isServer) {
      return res.writeHead(302, { Location: `${urlPrefix}/no-access` }).end();
    } else {
      Router.push(`${urlPrefix}/no-access`);
    }
  }
};
