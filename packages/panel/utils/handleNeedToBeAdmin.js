export const handleNeedToBeAdmin = ({ user }) => {
  if (user && !user.isAdmin) {
    return false;
  }
  return true;
};
