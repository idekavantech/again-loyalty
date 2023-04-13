import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Head from "next/head";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import { SAVE_MODAL, CANCEL_MODAL } from "containers/AdminCRM/constants";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import Input from "@saas/components/Input";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import JalaliUtils from "@date-io/jalaali";
import moment from "moment";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import CRMRExpiryReminderTableDetails from "./CRMExpiryReminderTableDetails";
import { useCampaignDetail } from "./useExpiryReminderDetail";
import { ClickAwayListener, Tooltip } from "@material-ui/core";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import { makeStyles } from "@material-ui/core/styles";
import { replaceEnglishSmsKeywordsWithPersian } from "containers/AdminCRM/helpers/smsKeywords";

moment.locale("en");
moment.loadPersian({ usePersianDigits: true });

function CRMCampaignDetails() {
  const {
    theme,
    isCreatingNewCampaign,
    _isCampaignLoading,
    campaignDetail,
    toggleCampaignStatusDialogOpen,
    updateCampaignStatus,
    submit,
    modals,
    onSmsKeyItemsClick,
    smsDynamicKeysMap,
    toggleCampaignStatusModal,
    toggleModals,
    onPeriodicTaskChange,
    onCampaignActionExpirationInDaysChange,
    onCampaignCrontabTimeChange,
    onCampaignSMSChange,
    toggleTooltip,
    disableTooltip,
    isOpenTooltipOpen,
    TIME_TOOLTIP,
    EXPIRATION_TOOLTIP,
    isSmsFieldEnabled,
    setIsSmsFieldEnabled,
  } = useCampaignDetail();

  const useStyle = makeStyles(() => ({
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      minWidth: 320,
      color: "#fff",
      fontSize: 13,
      borderRadius: 8,
      margin: "5px 0px",
      padding: 8,
    },
    arrow: {
      color: theme.palette.primary.main,
    },
  }));
  const classes = useStyle();

  return (
    <>
      <AssuranceDialog
        isOpen={modals[SAVE_MODAL]}
        closeDialogHandler={() => toggleModals(SAVE_MODAL)}
        contentText="Are you sure to save changes?"
        dialogMainActions={() => {
          submit();
          toggleModals(SAVE_MODAL);
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleModals(SAVE_MODAL)}
        dialogSecondActionTextColor="primary"
        dialogSecondActionText="Back"
      />
      <AssuranceDialog
        isOpen={modals[CANCEL_MODAL]}
        closeDialogHandler={() => toggleModals(CANCEL_MODAL)}
        contentText="Are you sure to cancel the changes?"
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {
          toggleModals(CANCEL_MODAL);
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleModals(CANCEL_MODAL)}
        dialogSecondActionText="Back"
      />
      <AssuranceDialog
        isOpen={toggleCampaignStatusDialogOpen}
        closeDialogHandler={() => toggleCampaignStatusModal()}
        contentText="Are you sure to cancel the reminder?"
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {
          updateCampaignStatus(!campaignDetail?.is_active);
          toggleCampaignStatusModal();
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleCampaignStatusModal()}
        dialogSecondActionText="Back"
      />
      {_isCampaignLoading ? (
        <LoadingIndicator height={600} />
      ) : (
        <div className="container">
          <Head>
            <title>Details reminiscent</title>
          </Head>
          <div className="d-flex justify-content-between align-items-center">
            <AdminBreadCrumb responsive={false} />
          </div>

          <Paper
            elevation={3}
            style={{ padding: 24 }}
            className="campaignStyle"
          >
            <div className="d-flex">
              <p style={{ fontSize: 16, fontWeight: 600 }} className="mb-2">
                Reminder Settings
              </p>
              {!isCreatingNewCampaign && campaignDetail.is_active && (
                <p className="px-3">
                  (
                  {campaignDetail.enabled
                    ? "Approved by admin"
                    : "Awaiting approval by the admin"}
                  )
                </p>
              )}
            </div>
            <Divider style={{ margin: "24px 0" }} />

            <div className="d-flex row px-5 justify-content-between">
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 24 }}>
                {campaignDetail?.title}
              </p>
              <div className="d-flex align-items-center">
                <Switch
                  color="primary"
                  checked={!!campaignDetail?.is_active}
                  onChange={onPeriodicTaskChange}
                />
                <div style={{ width: "80px" }}>
                  <Chip
                    label={campaignDetail?.is_active ? "active" : "Inactive"}
                    variant="default"
                    style={{
                      color: campaignDetail?.is_active ? "#FFFFFF" : "#000000",
                      background: campaignDetail?.is_active
                        ? "#2E7D32"
                        : "#FFC453",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className=" w-100 d-felx row mx-1 ">
              <div className="col-12 col-lg-6 col-md-12 px-md-2 mb-2">
                <p>Days left to end credit</p>
                <div className="d-flex">
                  <div
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: 8,
                      height: 44,
                    }}
                    className=" w-100 position-relative d-flex justify-content-between"
                  >
                    <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                      <input
                        onChange={onCampaignActionExpirationInDaysChange}
                        value={campaignDetail?.action?.expiration_in_days}
                        className="w-100"
                      />
                    </div>
                    <div className="px-3 d-flex justify-content-center align-items-center">
                      Day
                    </div>
                  </div>
                  <ClickAwayListener
                    onClickAway={() => disableTooltip(EXPIRATION_TOOLTIP)}
                  >
                    <Tooltip
                      placement="top"
                      PopperProps={{
                        disablePortal: true,
                      }}
                      arrow
                      classes={classes}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      onClose={() => disableTooltip(EXPIRATION_TOOLTIP)}
                      open={isOpenTooltipOpen[EXPIRATION_TOOLTIP]}
                      title={
                        <>
                          SMS Reminder a few days before the expiration of gift credit
                          To be sent to the customer?
                        </>
                      }
                    >
                      <Button
                        style={{ height: 44 }}
                        onClick={() => toggleTooltip(EXPIRATION_TOOLTIP)}
                      >
                        <HelpOutlineRoundedIcon
                          style={{
                            width: 44,
                            height: 20,
                            color: "#8C9196",
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </ClickAwayListener>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-md-12 px-md-2 mb-2">
                <p>SMS time</p>
                <div className="d-flex">
                  <MuiPickersUtilsProvider
                    className="w-100 mb-3"
                    utils={JalaliUtils}
                    locale={"fa"}
                  >
                    <TimePicker
                      style={{
                        border: "1px solid #E4E6E7",
                        flex: 1,
                        borderRadius: 8,
                        height: 44,
                        padding: ".5rem",
                      }}
                      disabled={!isCreatingNewCampaign}
                      InputProps={{ disableUnderline: true }}
                      inputVariant="standard"
                      disableUnderline={true}
                      fullWidth={true}
                      okLabel="Confirmation"
                      cancelLabel="Cancellation"
                      ampm={true}
                      required
                      invalidDateMessage="The selected time is not correct."
                      placeholder=" 00 : 00 "
                      labelFunc={() => {
                        const { hour, minute } =
                          campaignDetail?.periodic_task?.crontab;
                        if (hour && minute) {
                          return `${hour}:${minute}`;
                        }
                        return "";
                      }}
                      onChange={onCampaignCrontabTimeChange}
                    />
                  </MuiPickersUtilsProvider>

                  <ClickAwayListener
                    onClickAway={() => disableTooltip(TIME_TOOLTIP)}
                  >
                    <Tooltip
                      placement="top"
                      PopperProps={{
                        disablePortal: true,
                      }}
                      arrow
                      classes={classes}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      onClose={() => disableTooltip(TIME_TOOLTIP)}
                      open={isOpenTooltipOpen[TIME_TOOLTIP]}
                      title={<>At what time of the SMS Day to be sent.</>}
                    >
                      <Button
                        style={{ height: 44 }}
                        onClick={() => toggleTooltip(TIME_TOOLTIP)}
                      >
                        <HelpOutlineRoundedIcon
                          style={{
                            width: 44,
                            height: 20,
                            color: "#8C9196",
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </ClickAwayListener>
                </div>
              </div>
            </div>
            <div className="d-felx row mb-md-4 mt-4">
              <div className="col-12 col-md-12 pl-md-2 mb-2 mb-md-0">
                {isSmsFieldEnabled && (
                  <div className="mb-3">
                    {smsDynamicKeysMap?.map((smsKeyItem) => {
                      return (
                        <Chip
                          key={smsKeyItem.name}
                          className="m-1"
                          onClick={() => onSmsKeyItemsClick(smsKeyItem)}
                          color="secondary"
                          label={smsKeyItem.name}
                        />
                      );
                    })}
                  </div>
                )}
                <p> The text of the message</p>
                <div className=" w-100 position-relative d-flex justify-content-between">
                  <Input
                    disabled={!isSmsFieldEnabled}
                    variant="outlined"
                    placeholder="The text of the message"
                    className="w-100"
                    multiline
                    onChange={onCampaignSMSChange}
                    value={
                      campaignDetail?.action?.sms
                        ? replaceEnglishSmsKeywordsWithPersian(
                            campaignDetail?.action?.sms
                          )
                        : ""
                    }
                  />
                  {!isSmsFieldEnabled && (
                    <Button
                      onClick={() => setIsSmsFieldEnabled(true)}
                      style={{ position: "absolute", left: 10, bottom: 10 }}
                    >
                      <span
                        style={{
                          color: theme.palette.primary.main,
                          borderBottom: `solid 2px ${theme.palette.primary.main}`,
                        }}
                      >
                        Edit SMS text
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <>
              <Divider />
              <div className="d-flex mt-4 justify-content-end w-100 ">
                <Button
                  className="mx-2"
                  variant="contained"
                  color="default"
                  onClick={() => toggleModals(CANCEL_MODAL)}
                >
                  Cancellation
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleModals(SAVE_MODAL)}
                >
                  {isCreatingNewCampaign ? "Reminding Making" : "Save changes"}
                </Button>
              </div>
            </>
          </Paper>
          <br />
          {!isCreatingNewCampaign && (
            <CRMRExpiryReminderTableDetails
              isLoadin={_isCampaignLoading}
              historyLogs={campaignDetail?.history_logs}
            />
          )}
        </div>
      )}
    </>
  );
}

export default memo(CRMCampaignDetails);
