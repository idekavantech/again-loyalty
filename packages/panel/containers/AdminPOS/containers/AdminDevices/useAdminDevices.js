import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
export function useAdminDevices() {
  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());

  const router = useRouter();

  const [filters, setFilters] = useState({});

  const goToNewDevicePage = () => router.push(`${urlPrefix}devices/new`);

  return {
    filters,
    setFilters,
    goToNewDevicePage,
  };
}
