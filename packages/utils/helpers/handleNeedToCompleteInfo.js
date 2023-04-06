const handleNeedToCompleteInfo = ({ isStaff, business, pathname }) => {
  const requiredFields = [
    "first_name",
    "last_name",
    "national_id",
    "province",
    "city",
    "address",
    "landline",
  ];
  const isCompletionRequired = requiredFields.some(
    (field) => !business?.main_owner?.extra_data?.[field]
  );
  if (
    business &&
    business.plugins_config?.base?.status === "active" &&
    !pathname?.includes("owner_info") &&
    !isStaff &&
    isCompletionRequired
  ) {
    window.location.href = `/admin/${business?.site_domain}/owner_info`;
  }
};
export { handleNeedToCompleteInfo };
