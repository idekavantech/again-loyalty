import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@mui/icons-material/Help";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  MEMBERSHIP_NAME_KEYWORD,
  BUSINESS_TITLE_KEYWORD,
  MEMBERSHIP_TOTAL_POINT_KEYWORD,
  EXPIRY_DATE_KEYWORD,
  CREDIT_AMOUNT_KEYWORD,
} from "../../constants";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { replaceEnglishSmsKeywordsWithPersian } from "../../helpers/smsKeywords";
import LoadingIndicator from "@saas/components/LoadingIndicator";

function CreditExpiryReminderWithDurationModal(props) {
  const {
    expirationInDays,
    _isCampaignItemLoading,
    expirationInDaysError,
    smsState,
    isActiveSubmitBtn,
    isEditSmsActive,
    handleSmsSelectionChange,
    timeToExecute,
    theme,
    isDetailModalOpen,
    maxWidth768,
    isCreatingNewReminder,
    submit,
    handleActiveSmsContent,
    onExpirationInDaysChange,
    onTimeToExecuteChange,
    crontabToReadableTime,
    onSmsChange,
    insertText,
    handleCloseDetailModal,
  } = props;

  const smsKeywords = [
    MEMBERSHIP_NAME_KEYWORD,
    BUSINESS_TITLE_KEYWORD,
    CREDIT_AMOUNT_KEYWORD,
    MEMBERSHIP_TOTAL_POINT_KEYWORD,
    EXPIRY_DATE_KEYWORD,
  ];

  const toolTipUseStyles = makeStyles(() => ({
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      width: "200px",
      fontSize: 12,
      borderRadius: 8,
      margin: "5px 0px",
      padding: 8,
    },
    arrow: {
      color: theme.palette.primary.main,
    },
  }));
  const tooltipClasses = toolTipUseStyles();

  return (
    <Dialog
      PaperProps={{ style: { borderRadius: maxWidth768 ? 0 : 16 } }}
      open={isDetailModalOpen}
      fullScreen={maxWidth768}
    >
      <Paper style={{ height: "max(600px , 100%)" }} className="p-4">
        {_isCampaignItemLoading ? (
          <>
            <div
              className="d-flex justify-content-center  align-items-center"
              style={{ minHeight: "590px", minWidth: "590px" }}
            >
              <LoadingIndicator size={40} />
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between row-rev mb-4">
              <IconButton onClick={handleCloseDetailModal} size="small">
                <CloseIcon />
              </IconButton>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isCreatingNewReminder ? "Creation" : "Edit"} Expiry reminder (with-duration)
              </p>
            </div>
            <div className="my-5">
              <span className="d-flex justify-content-start align-items-center" style={{ fontSize: 15 }}>
                <p>SMS time interval*</p>
                <Tooltip
                  enterTouchDelay={0}
                  color="primary"
                  arrow
                  placement="left"
                  classes={tooltipClasses}
                  title={
                    <div>
                      For example, if you enter the number 2, the reminder SMS will be sent to the customer 2 days
                      before the expiry of the credit.
                    </div>
                  }
                >
                  <IconButton size="small">
                    <HelpIcon fontSize="small" color={theme.palette.primary.main} />
                  </IconButton>
                </Tooltip>
              </span>
              <div style={{ position: "relative" }}>
                <TextField
                  placeholder="number"
                  error={expirationInDaysError}
                  value={expirationInDays ? englishNumberToPersianNumber(expirationInDays) : ""}
                  onChange={onExpirationInDaysChange}
                  style={{ textAlign: "left", height: 44 }}
                  InputProps={{
                    style: { borderRadius: 8, height: 44 },
                  }}
                  variant="outlined"
                  className="w-100 mt-2"
                />
                <div className="mt-1" style={{ fontSize: 12 }}>
                  Determine the SMS reminder a few days before the expiry of the credit.{" "}
                  <span style={{ color: expirationInDaysError ? "red" : "unset" }}>(At least 2 days ago)</span>
                </div>
                <div style={{ position: "absolute", top: 22, right: 15 }}>The day before the expiry</div>
              </div>
            </div>
            <div className="my-5">
              <span className="d-flex justify-content-start align-items-center" style={{ fontSize: 15 }}>
                <p>SMS time*</p>
                <Tooltip
                  enterTouchDelay={0}
                  color="primary"
                  arrow
                  placement="left"
                  classes={tooltipClasses}
                  title={
                    <div>
                      For example, if the time interval is 2 and the hour of sending is 16:00 , 2 days before the
                      expiration of credit, at 4pm reminder sms will be sent
                    </div>
                  }
                >
                  <IconButton size="small">
                    <HelpIcon fontSize="small" color={theme.palette.primary.main} />
                  </IconButton>
                </Tooltip>
              </span>
              <MuiPickersUtilsProvider utils={MomentUtils} locale={"en"}>
                <TimePicker
                  style={{
                    border: "1px solid #E4E6E7",
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                    padding: ".5rem",
                  }}
                  disabled={!isCreatingNewReminder}
                  InputProps={{ disableUnderline: true }}
                  inputVariant="standard"
                  okLabel="Confirm"
                  fullWidth
                  cancelLabel="Cancel"
                  ampm={false}
                  required
                  invalidDateMessage="The selected time is not correct."
                  minDateMessage="Date of the past days is not allowed"
                  minTime={new Date(0, 0, 0, 9)}
                  placeholder={englishNumberToPersianNumber("00:00")}
                  labelFunc={() => {
                    return crontabToReadableTime(timeToExecute);
                  }}
                  onChange={onTimeToExecuteChange}
                />
              </MuiPickersUtilsProvider>
              <div className="mt-1" style={{ fontSize: 12 }}>
                Determine the hour you want to send SMS to the customer.
              </div>
            </div>

            <div className="my-3">
              <span style={{ fontSize: 15 }}>SMS text*</span>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ fontSize: 12, height: "35px" }}
              >
                <p>You can edit the text of the SMS with the help of keywords.</p>
                {!isEditSmsActive && (
                  <IconButton onClick={handleActiveSmsContent} size="small">
                    <EditOutlinedIcon style={{ color: theme.palette.primary.main }} />
                  </IconButton>
                )}
              </div>
              <div style={{ padding: "0px 10%" }} className="d-flex flex-wrap justify-content-center">
                {smsKeywords.map((smsKeyword) => {
                  return (
                    <Chip
                      onClick={() => insertText(smsKeyword.value)}
                      disabled={!isEditSmsActive}
                      className="m-1"
                      // style={{ color: isEditSmsActive ? "unset" : theme.palette.grey["400"] }}
                      key={smsKeyword.value}
                      label={smsKeyword.name}
                      color="primary"
                      variant="outlined"
                    />
                  );
                })}
              </div>
              <TextField
                disabled={!isEditSmsActive}
                InputProps={{
                  style: { borderRadius: 8, color: isEditSmsActive ? "unset" : theme.palette.grey["400"] },
                }}
                value={replaceEnglishSmsKeywordsWithPersian(smsState.content) || ""}
                onChange={onSmsChange}
                onSelect={handleSmsSelectionChange}
                variant="outlined"
                className="w-100 mt-2"
                multiline={true}
                minRows={4}
                maxRows={4}
              />
            </div>
            <div className="d-flex">
              <Button
                onClick={submit}
                disabled={!isActiveSubmitBtn}
                variant="contained"
                color="primary"
                className="mr-2"
              >
                Confirm
              </Button>
              <Button onClick={handleCloseDetailModal} variant="outlined" color="primary" className="mr-2">
                cancel
              </Button>
            </div>
          </>
        )}
      </Paper>
    </Dialog>
  );
}

export default CreditExpiryReminderWithDurationModal;
