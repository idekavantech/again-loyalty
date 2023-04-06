import React from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import CRMRCampaignTable from "./CRMRCampaignTable.js";
import {useCampaignDetail} from "./useCampaignList"

function CRMCampaignPage() {
  const {adminUrlPrefix , router} = useCampaignDetail()

  return (
    <div className="container">
      <Head>
        <title>Campaigns</title>
      </Head>
      <AdminBreadCrumb
        submitButtonText="Creating a new campaign"
        submitButtonHasPlus
        submitAction={() => {
          router.push(`${adminUrlPrefix}crm/campaign/details/new`);
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
        <CRMRCampaignTable />
      </Paper>
    </div>
  );
}

export default CRMCampaignPage;
