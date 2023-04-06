import React, { memo } from "react";

import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { useAdminDevices } from "./useAdminDevices";
import FilterWidgets from "./containers/FilterWidgets";
import DevicesList from "./containers/DevicesList";

function AdminDevicesContainer() {
  const { goToNewDevicePage, filters, setFilters } = useAdminDevices();

  return (
    <div className="container">
      <Head>
        <title>دستگاه‌ها</title>
      </Head>

      <AdminBreadCrumb
        submitAction={goToNewDevicePage}
        submitButtonHasPlus
        submitButtonText="دستگاه جدید"
      />

      <Paper elevation={1} className="py-4 mt-4">
        <div className="pl-4 pr-2">
          <FilterWidgets setFilters={setFilters} />
          <DevicesList filters={filters} />
        </div>
      </Paper>
    </div>
  );
}
export default memo(AdminDevicesContainer);
