import Router from "next/router";

export const handlePluginsAccess = (
  { store, res, isServer, urlPrefix },
  Component
) => {
  const plugins = store.getState().plugins.plugins;
  let hasAccess = true;
  for (const plugin in plugins) {
    if (Component[plugin]) {
      hasAccess = false;
    }
  }
  for (const plugin in plugins) {
    if (Component[plugin] && plugins[plugin].isActive) {
      hasAccess = true;
    }
  }
  if (!hasAccess) {
    if (isServer) {
      return res.writeHead(302, { Location: `${urlPrefix}/no-access` }).end();
    } else {
      Router.push(`${urlPrefix}/no-access`);
    }
  }
};
