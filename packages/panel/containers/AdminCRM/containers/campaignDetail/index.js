import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Head from "next/head";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
  campaignActionTypes,
  SAVE_MODAL,
  CANCEL_MODAL,
  REWARD,
  POINT,
  SMS,
  CREDIT_EXPIRY_REMINDER,
  DISCOUNT_CODE,
} from "containers/AdminCRM/constants";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import Input from "@saas/components/Input";
import { availableOnDayOptions } from "store/constants";
import { FormControl } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  TimePicker,
} from "@material-ui/pickers";
import JalaliUtils from "@date-io/jalaali";
import moment from "moment-jalaali";
import { textTypes } from "@saas/utils/colors";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import CRMRCampaignTableDetails from "./CRMRCampaignTableDetails";
import { useCampaignDetail } from "./useCampaignDetail";
import { isNullish } from "utils/helpers";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import TextField from '@material-ui/core/TextField'

moment.locale("en");
moment.loadPersian({ usePersianDigits: true });


function CRMCampaignDetails() {
  const {
    router,
    segment,
    isCreatingNewCampaign,
    isLoading,
    _crmSegments,
    campaignDetail,
    handleSmsSelectionChange,
    toggleCampaignStatusDialogOpen,
    updateCampaignStatus,
    submit,
    modals,
    onSmsKeyItemsClick,
    smsDynamicKeysMap,
    smsState,
    toggleCampaignStatusModal,
    toggleModals,
    onPeriodicTaskOneOffClick,
    onPeriodicTaskChange,
    onCampaignNameChange,
    onCampaignSegmentsChange,
    onCampaignStartTimeChange,
    onCampaignActionTypeChange,
    onCampaignActionAmountChange,
    onCampaignActionExpirationChange,
    onCampaignCrontabTimeChange,
    onCamapignCrontabDayOfWeekChange,
    onCampaignSMSChange,
    onCampaignActionExpirationInDaysChange,
    onCampaignActionDiscountPercentChange,
    onCampaignActionDiscountFloorChange,
    onCampignActionDiscountExpirationChange,
    onCampaignActionDiscountCeilingChange,
    replaceEnglishSmsKeywordsWithPersian,
  } = useCampaignDetail();

  const EXPIRATION_IN_DAYS = "EXPIRATION_IN_DAYS";
  const DISCOUNT_PERCENT = "DISCOUNT_PERCENT";
  const DISCOUNT_FLOOR = "DISCOUNT_FLOOR";
  const DISCOUNT_CEILING_AMOUNT = "DISCOUNT_CEILING_AMOUNT";
  const REWARD_AMOUNT = "REWARD_AMOUNT";
  const EXPIRATION = "EXPIRATION";
  const DISCOUNT_EXPIRATION = "DISCOUNT_EXPIRATION";

  const actionFields = {
    [EXPIRATION_IN_DAYS]: () => (
      <div className="col-12 col-lg-3 col-md-3 px-md-2 mb-2 mb-md-0">
        <p>The end of the credit</p>
        <input
          style={{
            color: isCreatingNewCampaign ? "#202223" : "#909090",
            border: "1px solid #E4E6E7",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 400,
            height: 44,
          }}
          className="w-100 px-4"
          placeholder="The number of days to the end of credit"
          disabled={!isCreatingNewCampaign}
          type="number"
          variant="outlined"
          numberOnly
          onChange={onCampaignActionExpirationInDaysChange}
          value={
            campaignDetail?.action?.expiration_in_days
              ? campaignDetail?.action?.expiration_in_days
              : ""
          }
        />
      </div>
    ),
    [DISCOUNT_PERCENT]: () => (
      <div className="col-12 col-md-3 px-md-2 mb-2 mb-md-0">
        <p>discount percent</p>
        <div className="position-relative">
          <input
            style={{
              color: isCreatingNewCampaign ? "#202223" : "#909090",
              border: "1px solid #E4E6E7",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 400,
              height: 44,
            }}
            className="w-100 px-4"
            disabled={!isCreatingNewCampaign}
            variant="outlined"
            numberOnly
            onChange={onCampaignActionDiscountPercentChange}
            value={
              !isNullish(campaignDetail?.action?.discount_percent)
                ? englishNumberToPersianNumber(
                    campaignDetail?.action?.discount_percent
                  )
                : ""
            }
          />
          <p
            style={{
              position: "absolute",
              top: 14,
              left: 16,
              color: textTypes.text.subdued,
            }}
          >
            Percent
          </p>
        </div>
      </div>
    ),
    [DISCOUNT_FLOOR]: () => (
      <div className="col-12 col-md-3 px-md-2 mb-2 mb-md-0">
        <p> Minimum purchase</p>
        <div className="position-relative">
          <input
            style={{
              color: isCreatingNewCampaign ? "#202223" : "#909090",
              border: "1px solid #E4E6E7",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 400,
              height: 44,
            }}
            className="w-100 px-4"
            disabled={!isCreatingNewCampaign}
            type="number"
            variant="outlined"
            numberOnly
            onChange={onCampaignActionDiscountFloorChange}
            value={
              campaignDetail?.action?.discount_floor_amount
                ? campaignDetail?.action?.discount_floor_amount
                : ""
            }
          />
          <p
            style={{
              position: "absolute",
              top: 14,
              left: 16,
              color: textTypes.text.subdued,
            }}
          >
            $
          </p>
        </div>
      </div>
    ),
    [DISCOUNT_CEILING_AMOUNT]: () => (
      <div className="col-12 col-md-3  px-md-2 mb-2 mb-md-0">
        <p> Maximum discount rate</p>
        <div className="position-relative">
          <input
            style={{
              color: isCreatingNewCampaign ? "#202223" : "#909090",
              border: "1px solid #E4E6E7",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 400,
              height: 44,
            }}
            className="w-100 px-4"
            disabled={!isCreatingNewCampaign}
            variant="outlined"
            numberOnly
            onChange={onCampaignActionDiscountCeilingChange}
            value={
              !isNullish(campaignDetail?.action?.discount_ceiling_amount)
                ? priceFormatter(
                    campaignDetail?.action?.discount_ceiling_amount
                  )
                : ""
            }
          />
          <p
            style={{
              position: "absolute",
              top: 14,
              left: 16,
              color: textTypes.text.subdued,
            }}
          >
            $
          </p>
        </div>
      </div>
    ),
    [REWARD_AMOUNT]: () => (
      <div className="col-12 col-md-3 px-md-2 mb-2 mb-md-0">
        <p> reward</p>
        <input
          style={{
            color: isCreatingNewCampaign ? "#202223" : "#909090",
            border: "1px solid #E4E6E7",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 400,
            height: 44,
          }}
          className="w-100 px-4"
          placeholder="Enter the amount of reward"
          disabled={!isCreatingNewCampaign}
          variant="outlined"
          numberOnly
          onChange={onCampaignActionAmountChange}
          value={
            !isNullish(campaignDetail?.action?.amount)
              ? priceFormatter(campaignDetail?.action?.amount)
              : ""
          }
        />
      </div>
    ),
    [EXPIRATION]: () => (
      <div className="d-flex flex-col col-12 col-md-3 pr-md-2">
        <p>validity duration</p>
        <div className="position-relative">
          <input
            style={{
              color: isCreatingNewCampaign ? "#202223" : "#909090",
              border: "1px solid #E4E6E7",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 400,
              height: 44,
            }}
            className="w-100 px-4"
            disabled={!isCreatingNewCampaign}
            selectOnFocus
            placeholder="No expiration"
            value={
              !isNullish(campaignDetail?.action?.expiration)
                ? englishNumberToPersianNumber(
                    campaignDetail?.action?.expiration
                  )
                : ""
            }
            onChange={onCampaignActionExpirationChange}
            numberOnly
          />

          <p
            style={{
              position: "absolute",
              top: 14,
              left: 16,
              color: textTypes.text.subdued,
            }}
          >
            Day
          </p>
        </div>
      </div>
    ),
    [DISCOUNT_EXPIRATION]: () => (
      <div className="col-12 col-md-3 pr-lg-2 mb-2 mb-md-0">
        <p> Expiration Code</p>
        <div className="position-relative">
          <input
            style={{
              color: isCreatingNewCampaign ? "#202223" : "#909090",
              border: "1px solid #E4E6E7",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 400,
              height: 44,
            }}
            className="w-100 px-4"
            disabled={!isCreatingNewCampaign}
            variant="outlined"
            numberOnly
            onChange={onCampignActionDiscountExpirationChange}
            value={
              !isNullish(campaignDetail?.action?.expiration)
                ? englishNumberToPersianNumber(
                    campaignDetail?.action?.expiration
                  )
                : ""
            }
          />
          <p
            style={{
              position: "absolute",
              top: 14,
              left: 16,
              color: textTypes.text.subdued,
            }}
          >
            Day
          </p>
        </div>
      </div>
    ),
  };

  const campaignActionFieldsMap = {
    [SMS]: [],
    [POINT]: [REWARD_AMOUNT, EXPIRATION],
    [REWARD]: [REWARD_AMOUNT, EXPIRATION],
    [DISCOUNT_CODE]: [
      DISCOUNT_PERCENT,
      DISCOUNT_CEILING_AMOUNT,
      DISCOUNT_EXPIRATION,
    ],
    [CREDIT_EXPIRY_REMINDER]: [EXPIRATION_IN_DAYS],
  };

  return (
    <>
      <AssuranceDialog
        isOpen={modals[SAVE_MODAL]}
        closeDialogHandler={() => toggleModals(SAVE_MODAL)}
        contentText="Are you sure to save changes?"
        dialogMainActions={() => {
          submit();
          toggleModals(SAVE_MODAL);
          router.back();
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleModals(SAVE_MODAL)}
        dialogSecondActionTextColor="primary"
        dialogSecondActionText="Good"
      />
      <AssuranceDialog
        isOpen={modals[CANCEL_MODAL]}
        closeDialogHandler={() => toggleModals(CANCEL_MODAL)}
        contentText="Are you sure to cancel the changes?"
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {
          router.back();
          toggleModals(CANCEL_MODAL);
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleModals(CANCEL_MODAL)}
        dialogSecondActionText="Good"
      />
      <AssuranceDialog
        isOpen={toggleCampaignStatusDialogOpen}
        closeDialogHandler={() => toggleCampaignStatusModal()}
        contentText="Are you sure to cancel the campaign?"
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {
          updateCampaignStatus(!campaignDetail?.is_active);
          toggleCampaignStatusModal();
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleCampaignStatusModal()}
        dialogSecondActionText="Good"
      />
      {isLoading ? (
        <LoadingIndicator height={600} />
      ) : (
        <div className="container">
          <Head>
            <title>Campaign Details</title>
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
                Campaign settings
              </p>
              {!isCreatingNewCampaign && campaignDetail?.is_active &&(
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
            <div className="d-felx row mb-md-4 mt-5">
              <div className="col-12 col-md-4 pl-md-2 mb-2 mb-md-0">
                <p>Campaign name</p>
                <input
                  style={{
                    color: isCreatingNewCampaign ? "#202223" : "#909090",
                    border: "1px solid #E4E6E7",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 400,
                    height: 44,
                  }}
                  className="w-100 px-4"
                  disabled={!isCreatingNewCampaign}
                  variant="outlined"
                  placeholder="Campaign"
                  onChange={onCampaignNameChange}
                  value={campaignDetail?.title}
                />
              </div>
              <div className="col-12 col-md-4 px-md-2 mb-2 mb-md-0">
                <p>Customer segmentation</p>
                <Select
                  style={{
                    color: isCreatingNewCampaign ? "#202223" : "#909090",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 400,
                    height: 44,
                  }}
                  disabled={!isCreatingNewCampaign}
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  label="Customer segmentation"
                  placeholder="Customer segmentation"
                  variant="outlined"
                  className="w-100"
                  MenuProps={{
                    getContentAnchorEl: null,
                    style: { maxHeight: 500 },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                    variant: "menu",
                  }}
                  value={campaignDetail.segment ? campaignDetail.segment : ""}
                  onChange={onCampaignSegmentsChange}
                >
                  {_crmSegments?.map?.((segment) => (
                    <MenuItem value={segment.id} key={segment.id}>
                      {segment.title}
                    </MenuItem>
                  ))}
                </Select>
                {segment && !isNaN(Number(segment.num_memberships)) && (
                  <p className="mt-1">
                    <div>
                      {" "}
                      In this segmentation<b>{segment.num_memberships}</b> Customer
                      There is{" "}
                    </div>
                  </p>
                )}
              </div>
              <div className="d-flex flex-col col-12 col-md-4 pr-md-2 mb-2 mb-md-0">
                <div className="d-flex">
                  <div className="col-8 p-0">start date</div>
                  <div className="col-4 p-0">Repeat the campaign</div>
                </div>
                <div className="d-flex">
                  <MuiPickersUtilsProvider utils={JalaliUtils} locale={"fa"}>
                    <DateTimePicker
                      style={{
                        border: "1px solid #E4E6E7",
                        flex: 1,
                        borderRadius: 8,
                        height: 44,
                        padding: ".5rem",
                      }}
                      InputProps={{ disableUnderline: true }}
                      disabled={!isCreatingNewCampaign}
                      inputVariant="standard"
                      fullWidth={true}
                      okLabel="Confirmation"
                      cancelLabel="Cancellation"
                      ampm={false}
                      required
                      invalidDateMessage="The selected time is not correct."
                      minDateMessage="Date of the past days is not allowed"
                      minTime={new Date(0, 0, 0, 9)}
                      placeholder="00/00/00"
                      labelFunc={(date) => {
                        return campaignDetail.periodic_task?.start_time
                          ? date.format("jYYYY/jMM/jDD   HH:mm ")
                          : "";
                      }}
                      value={campaignDetail.periodic_task?.start_time}
                      onChange={onCampaignStartTimeChange}
                    />
                  </MuiPickersUtilsProvider>
                  <div className="col-4" style={{ padding: 0 }}>
                    <FormControl
                      style={{
                        flex: 1,
                        borderRadius: 8,
                        height: 44,
                      }}
                      className="w-100"
                    >
                      <Select
                        className="w-100"
                        style={{
                          flex: 1,
                          borderRadius: 8,
                          height: 44,
                        }}
                        disabled={!isCreatingNewCampaign}
                        labelId="campaign-repeat-label"
                        id="demo-customized-select"
                        label=" Repeat the campaign"
                        placeholder=" Repeat the campaign"
                        variant="outlined"
                        value={!campaignDetail?.periodic_task?.one_off}
                        renderValue={(e) => {
                          return <div> {e ? "active" : "Inactive"}</div>;
                        }}
                        onClick={onPeriodicTaskOneOffClick}
                      >
                        <MenuItem value={true}>active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-felx row">
              <div className="col-12 col-md-3 pl-md-2 mb-2 mb-md-0">
                <p> Action type</p>
                <Select
                  className="w-100 mb-3"
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                  }}
                  disabled={!isCreatingNewCampaign}
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  label="Action type"
                  placeholder="Action type"
                  variant="outlined"
                  displayEmpty={false}
                  value={
                    campaignDetail.action.type ? campaignDetail.action.type : ""
                  }
                  onChange={onCampaignActionTypeChange}
                >
                  {campaignActionTypes?.map?.((actionType) => (
                    <MenuItem value={actionType.type} key={actionType.type}>
                      {actionType.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              {campaignActionFieldsMap[campaignDetail.action.type]?.map(
                (actionItem) => actionFields[actionItem]({})
              )}
            </div>
            <div className="d-felx row mt-4">
              <div className="col-12 col-md-4 col-lg-2 pl-md-2 mb-2 mb-md-0">
                <p> Hours and minutes</p>
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
              </div>
              <div className="col-12 col-md-8 col-lg-6 px-md-2 mb-2 mb-md-0">
                <p> Day per week</p>
                <Select
                  className="w-100 mb-3"
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                  }}
                  disabled={!isCreatingNewCampaign}
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  label="Day per week"
                  placeholder="Day per week"
                  variant="outlined"
                  multiple
                  value={
                    campaignDetail.periodic_task?.crontab?.day_of_week
                      ? campaignDetail.periodic_task?.crontab?.day_of_week?.split(
                          ","
                        )
                      : []
                  }
                  renderValue={(e) => {
                    if (e[0] === "*" || !e || e.length === 0) {
                      return "Without the amount";
                    }
                    return (
                      <div>
                        {e
                          .map((item) => {
                            return availableOnDayOptions.find(
                              (availableDay) => availableDay.id === Number(item)
                            ).text;
                          })
                          .join(" , ")}
                      </div>
                    );
                  }}
                  onChange={onCamapignCrontabDayOfWeekChange}
                  MenuProps={{
                    getContentAnchorEl: null,
                    style: { maxHeight: 500 },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                    variant: "menu",
                  }}
                >
                  {availableOnDayOptions?.map?.((weekDay) => (
                    <MenuItem
                      style={{ height: 40 }}
                      value={weekDay.id}
                      key={weekDay.id}
                    >
                      <Checkbox
                        checked={
                          campaignDetail.periodic_task?.crontab?.day_of_week
                            ? campaignDetail.periodic_task.crontab.day_of_week
                                .split(",")
                                .filter((item) => item.length !== 0)
                                .map((item) => Number(item))
                                .includes(weekDay.id)
                            : false
                        }
                        color="primary"
                      />
                      <ListItemText
                        primary={weekDay?.text}
                        className="text-right"
                      />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="d-felx row mb-md-4 mt-4">
              <div className="col-12 col-md-12 pl-md-2 mb-2 mb-md-0">
                <div className="mb-3">
                  {smsDynamicKeysMap[campaignDetail.action?.type]?.map(
                    (smsKeyItem) => {
                      return (
                        <Chip
                          key={smsKeyItem?.value}
                          className="m-1"
                          onClick={() => onSmsKeyItemsClick(smsKeyItem)}
                          color="primary"
                          label={smsKeyItem.name}
                        />
                      );
                    }
                  )}
                </div>
                <p> The text of the message</p>
                <TextField
                  variant="outlined"
                  placeholder="The text of the message"
                  style={{borderRadius:8}}
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                  className="w-100"
                  multiline
                  onChange={onCampaignSMSChange}
                  value={replaceEnglishSmsKeywordsWithPersian(smsState.content)}
                  onSelect={handleSmsSelectionChange}
                />
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
                  {isCreatingNewCampaign ? "Campaign" : "Save changes"}
                </Button>
              </div>
            </>
          </Paper>
          <br />
          {!isCreatingNewCampaign && (
            <CRMRCampaignTableDetails
              isLoadin={isLoading}
              historyLogs={campaignDetail?.history_logs}
            />
          )}
        </div>
      )}
    </>
  );
}

export default memo(CRMCampaignDetails);
