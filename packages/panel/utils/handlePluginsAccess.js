
export const handlePluginsAccess = ({ plugins }, Component) => {
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
  return hasAccess;
};
