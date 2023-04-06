export function getRelativeURL(link, businessAddress) {
  return (
    link?.replace(`/${businessAddress}`, "").replace(businessAddress, "") || ""
  );
}
