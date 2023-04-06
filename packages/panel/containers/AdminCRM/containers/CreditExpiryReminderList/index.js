import React from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import CRMRCreditExpiryTable from "./CRMCreditExpiryTable";
import { useCreditExpiryDetail } from "./useCreditExpiryReminder";

function CRMCreditExpiryPage() {
  const { adminUrlPrefix, router } = useCreditExpiryDetail();

  return (
    <div className="container">
      <Head>
        <title>Reminders</title>
      </Head>
      <AdminBreadCrumb
        submitButtonText="Creating a new reminder"
        submitButtonHasPlus
        submitAction={() => {
          router.push(`${adminUrlPrefix}crm/expiry_reminder/details/new`);
        }}
      />

      <p
        className="mb-4"
        style={{
          fontSize: 16,
          fontweight: 400,
        }}
      ></p>

      <Paper elevation={1} style={{ marginTop: 8, minHeight: 500 }}>
        <CRMRCreditExpiryTable />
      </Paper>
    </div>
  );
}

export default CRMCreditExpiryPage;
