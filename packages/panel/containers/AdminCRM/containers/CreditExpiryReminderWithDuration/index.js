import { useCreditExpiryReminderWithDuration } from "./useCreditExpiryReminderWithDuration";
import CreditExpiryReminderWithDurationTable from "./CreditExpiryReminderWithDurationTable";
import CreditExpiryReminderWithDurationModal from "./CreditExpiryReminderWithDurationModal";
import Button from "@material-ui/core/Button";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import AddIcon from "@mui/icons-material/Add";
import Warn from "containers/AdminCRM/icons/warn";
import AssuranceDialog from "@saas/components/AssuranceDialog";

function CreditExpiryReminderWithDuration() {
  const hooks = useCreditExpiryReminderWithDuration();
  const {
    isCampaignAssuranceIsActiveModalOpen,
    handleCloseCampaignIsActiveAssuranceModal,
    handleSubmitCampaignIsActiveAssuranceModal,
    handleCreateNewCampaign,
    haveNoExpiryReminder,
  } = hooks;

  return (
    <div className="container">
      <CreditExpiryReminderWithDurationModal {...hooks} />
      <Head>
        <title>Expiry reminder</title>
      </Head>
      <AdminBreadCrumb
        responsive={true}
        buttons={
          <div className="d-flex w-100">
            <Button
              onClick={handleCreateNewCampaign}
              className="pl-4 w-100"
              color="primary"
              variant="contained"
            >
              <AddIcon className="mx-1" />
              <p>Creating a reminder</p>
            </Button>
          </div>
        }
      />
      <AssuranceDialog
        isOpen={isCampaignAssuranceIsActiveModalOpen}
        closeDialogHandler={handleCloseCampaignIsActiveAssuranceModal}
        contentText= {<>Are you sure to deactivate?<br/> If re -enabled you need support confirmation.</>} 
        dialogSecondActionTextColor="primary"
        dialogMainActions={handleSubmitCampaignIsActiveAssuranceModal}
        dialogSecondActions={handleCloseCampaignIsActiveAssuranceModal}
        dialogMainActionText="Confirm"
        dialogSecondActionText="cancel"
      />
      <div className="mb-4">
        In this section you can adjust reminders for (reward , cashback and ...) that you set expiration date for theme 
      </div>
      {haveNoExpiryReminder ? (
        <div
          style={{
            height: "60vh",
            color: "rgba(0,0,0,.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
          }}
        >``
          <div>
            <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
              <Warn />
            </div>
            <p>You haven't reminded yet.</p>
          </div>
        </div>
      ) : (
        <CreditExpiryReminderWithDurationTable {...hooks} />
      )}
    </div>
  );
}

export default CreditExpiryReminderWithDuration;
