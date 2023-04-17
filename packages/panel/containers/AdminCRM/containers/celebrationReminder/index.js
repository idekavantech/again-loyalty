import { useCelebrationReminder } from "./useCelebrationReminder";
import CreditExpiryReminderWithDurationTable from "./CreditExpiryReminderWithDurationTable";
import Button from "@material-ui/core/Button";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import AddIcon from "@mui/icons-material/Add";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import Box from "@material-ui/core/Box";
import { Dialog, Paper } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@mui/icons-material/Close";
import { DISCOUNT_CODE, REWARD } from "containers/AdminCRM/constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import MessageBox from "containers/AdminCRM/icons/messageBox";

function CreditExpiryReminderWithDuration() {
  const hooks = useCelebrationReminder();

  const { haveSetNoReminders, adminUrlPrefix, openPopperItem, router, handleClosePopper, giftTypes } = hooks;

  const StyledPopperPaper = withStyles(() => ({
    root: {
      zIndex: 100,
      width: 300,
      background: "white",
      borderRadius: 16,
      padding: 16,
    },
  }))(Paper);

  const StyledButton = withStyles(() => ({
    root: {
      borderRadius: 8,
      boxShadow: "none",
      fontWeight: 500,
    },
  }))(Button);

  const GiftDetails = (props) => {
    const { action } = props;
    const giftType = giftTypes[action.type];
    if (!giftType) return "--";

    const timeToUse = isNaN(Number(action?.expiration))
      ? `Unlimited`
      : `${englishNumberToPersianNumber(action.expiration)}Day`;

    return (
      <>
        <>
          <Box className="d-flex justify-content-between">
            <p style={{ fontSize: 16, fontWeight: 600 }}>Gift details</p>
            <CloseIcon fontSize="10" onClick={handleClosePopper} />
          </Box>
          {giftType.type === DISCOUNT_CODE && (
            <div style={{ fontSize: 15 }} className="w-100 mt-5">
              The amount of discount: {englishNumberToPersianNumber(action.discount_percent)}٪
            </div>
          )}
          {giftType.type === REWARD && (
            <div style={{ fontSize: 15 }} className="w-100 mt-5">
              The amount of credit: {englishNumberToPersianNumber(action.amount)} $
            </div>
          )}
          <div style={{ fontSize: 15 }} className="w-100 mt-5">
            Use deadline: {timeToUse}
          </div>
        </>
      </>
    );
  };

  return (
    <div className="container">
      <Head>
        <title>Birthday greetings and marriage anniversary</title>
      </Head>
      <AdminBreadCrumb
        responsive={true}
        buttons={
          <div className="d-flex w-100">
            {!haveSetNoReminders && (
              <Button
                onClick={() => router.push(`${adminUrlPrefix}/crm/celebration_reminder/details/new`)}
                className="pl-4 w-100"
                color="primary"
                variant="contained"
              >
                <AddIcon className="mx-1" />
                <p>Create a congratulatory message</p>
              </Button>
            )}
          </div>
        }
      />
      <AssuranceDialog
        isOpen={false}
        closeDialogHandler={() => {}}
        contentText={
          <>
            Are you sure to deactivate?
            <br /> You need support confirmation to activate it later.
          </>
        }
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {}}
        dialogSecondActions={() => {}}
        dialogMainActionText="Confirm"
        dialogSecondActionText="cancel"
      />
      <Dialog onClose={handleClosePopper} PaperComponent={StyledPopperPaper} open={openPopperItem !== null}>
        {openPopperItem && <GiftDetails {...openPopperItem} />}
      </Dialog>
      <div className="mb-4">
        Send them with a discount code or gift credit on the occasion of your customers 'birthday or anniversary of your
        customers' marriage.
      </div>
      {!haveSetNoReminders ? (
        <CreditExpiryReminderWithDurationTable {...hooks} />
      ) : (
        <Paper
          style={{
            height: "60vh",
            boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.12)",
            borderRadius: 8,
          }}
          className="d-flex flex-column justify-content-center align-items-center "
        >
          <div>
            <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
              <MessageBox />
            </div>
            <p className="mt-5" style={{ fontSize: 12 }}>
              Greetings SMS settings are displayed here.
            </p>
            <div className=" mt-5 d-flex w-100 justify-content-center">
              <StyledButton
                onClick={() => router.push(`${adminUrlPrefix}/crm/celebration_reminder/details/new`)}
                startIcon={<AddIcon className="ml-3" />}
                color="primary"
                variant="contained"
                size="medium"
                className="pl-5 pr-3"
              >
                Create a congratulatory message
              </StyledButton>
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
}

export default CreditExpiryReminderWithDuration;
