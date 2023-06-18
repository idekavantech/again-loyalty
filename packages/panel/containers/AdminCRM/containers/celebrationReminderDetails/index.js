import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import MomentUtils from "@date-io/moment";
import { crontabToReadableTime } from "containers/AdminCRM/helpers/crontabToReadableTime";
import { REWARD } from "containers/AdminCRM/constants";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useCelebrationReminderDetails } from "./useCelebrationReminderDetails";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import { replaceEnglishSmsKeywordsWithPersian } from "../../helpers/smsKeywords";
import LoadingIndicator from "@saas/components/LoadingIndicator";

function CelebrationReminderDetails() {
  const hooks = useCelebrationReminderDetails();

  const {
    theme,
    isSmsFieldActive,
    state,
    selectionRangeChange,
    isCelebrationReminderLoading,
    giftTypes,
    DISCOUNT_CODE,
    OTHERS,
    smsKeywordsMap,
    eventTypes,
    isFormValidForSubmit,
    isCreatingNewCelebrationReminder,
    celebrationReminder,
    handleSmsContentChange,
    handleSmsKeywordsClick,
    handleActivateSmsField,
    handleNavigateBack,
    handleEventTypeChange,
    handleDiscountAmountChange,
    handleGiftTypeChange,
    handleRewardAmountChange,
    handleDeadlineChange,
    submit,
    handleSetDefaultSmsField,
    onTimeToExecuteChange,
    handleDaysBeforeExecuteChange,
  } = hooks;

  const StyledInputTitle = withStyles(() => ({
    root: {
      fontSize: "15px !important",
      fontWeight: 400,
    },
  }))(Typography);

  const StyledButton = withStyles(() => ({
    root: {
      borderRadius: 8,
      boxShadow: "none",
      fontWeight: 400,
    },
  }))(Button);


  const DiscountAmountInputField = () => {
    return (
      <div className="d-flex">
        <div className="col-12 col-lg-6 col-sm-12 p-0 my-4">
          <StyledInputTitle className="mb-2" >The amount of discount*</StyledInputTitle>
          <div className="position-relative">
            <TextField
              onChange={handleDiscountAmountChange}
              value={
                !isNaN(Number(celebrationReminder.action.discount_percent))
                  ? englishNumberToPersianNumber(celebrationReminder.action.discount_percent)
                  : ""
              }
              placeholder="number"
              style={{ textAlign: "left", height: 44 }}
              InputProps={{
                style: { borderRadius: 8, height: 44 },
              }}
              variant="outlined"
              className="w-100"
            />
            <p style={{ top: 13, left: 20, fontSize: 15 }} className="position-absolute">
              Percent
            </p>
          </div>

          <p style={{ fontSize: 12 }} className="mt-2">
            Determine the appropriateness you want to do for that greeting SMS settings.
          </p>
        </div>
      </div>
    );
  };

  const CreditAmountInputField = () => {
    return (
      <div className="d-flex">
        <div className="col-12 col-lg-6 col-sm-12 p-0 my-4">
          <StyledInputTitle className="mb-2" >The amount of credit*</StyledInputTitle>
          <div className="position-relative">
            <TextField
              onChange={handleRewardAmountChange}
              value={
                !isNaN(Number(celebrationReminder.action.amount))
                  ? englishNumberToPersianNumber(celebrationReminder.action.amount)
                  : ""
              }
              placeholder="number"
              style={{ textAlign: "left", height: 44 }}
              InputProps={{
                style: { borderRadius: 8, height: 44 },
              }}
              variant="outlined"
              className="w-100"
            />
            <p style={{ top: 13, left: 20, fontSize: 15 }} className="position-absolute">
            $
            </p>
          </div>
        </div>
      </div>
    );
  };

  const DeadlineInputField = () => {
    return (
      <div className="d-flex">
        <div className="col-12 col-lg-6 col-sm-12 p-0 my-4">
          <StyledInputTitle className="mb-2" >Use deadline</StyledInputTitle>
          <div className="position-relative">
            <TextField
              onChange={handleDeadlineChange}
              value={
                !isNaN(Number(celebrationReminder.action.expiration))
                  ? englishNumberToPersianNumber(celebrationReminder.action.expiration)
                  : ""
              }
              placeholder="No deadline"
              style={{ textAlign: "left", height: 44 }}
              InputProps={{
                style: { borderRadius: 8, height: 44 },
              }}
              variant="outlined"
              className="w-100"
            />
            <p style={{ top: 13, left: 20, fontSize: 15 }} className="position-absolute">
              Day
            </p>
          </div>
          <p style={{ fontSize: 12 }} className="mt-2">
          If you do not specify the number of use, the deadline will be unlimited.
          </p>
        </div>
      </div>
    );
  };

  const giftTypesInputFieldsMap = new Map();

  giftTypesInputFieldsMap.set(DISCOUNT_CODE, [DiscountAmountInputField, DeadlineInputField]);
  giftTypesInputFieldsMap.set(REWARD, [CreditAmountInputField, DeadlineInputField]);
  giftTypesInputFieldsMap.set(OTHERS, []);

  return (
    <div className="container">
      <Head>
        <title> Birthday greetings and marriage anniversary</title>
      </Head>
      <AdminBreadCrumb responsive={true} />
      <p className="mb-5">
        On the occasion of the birthday or anniversary of your customers' marriage, send them a congratulatory message, along with a discount code or gift credit.
      </p>
      {isCelebrationReminderLoading ? (
        <LoadingIndicator />
      ) : (
        <Paper style={{ boxShadow: ` 1px 1px 10px #0000001F`, border: "none" }} className="p-4">
          <Typography style={{ fontWeight: 400 }} variant="h6" className="mb-4">
            Set up congratulatory SMS
          </Typography>

          <div className="d-flex flex-col">
            <div className="d-flex">
              <div className="col-12 col-lg-6 col-sm-12 p-0 my-4">
                <StyledInputTitle className="mb-2">occasion*</StyledInputTitle>
                <Select
                  style={{
                    minWidth: 150,
                    flex: 1,
                    borderRadius: 8,

                    height: 44,
                  }}
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={celebrationReminder.segment.data.customer_related_date.date_type || ""}
                  className="w-100"
                  variant="outlined"
                  displayEmpty
                  renderValue={(e) => {
                    if (!e) return <p style={{ color: theme.palette.grey[400] }}>Select</p>;
                    return eventTypes.find((evt) => evt.value === e)?.name;
                  }}
                  onChange={handleEventTypeChange}
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
                  {eventTypes?.map?.((eventType) => (
                    <MenuItem value={eventType.value} key={eventType.id}>
                      {eventType.name}
                    </MenuItem>
                  ))}
                </Select>
                <p style={{ fontSize: 12 }} className="mt-2">
                  Determine the appropriateness you want to do for that greeting SMS settings.
                </p>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-12 col-lg-6 col-sm-12 p-0 my-4">
                <StyledInputTitle className="mb-2">SMS time interval*</StyledInputTitle>
                <div className="position-relative">
                  <TextField
                    placeholder="number"
                    onChange={handleDaysBeforeExecuteChange}
                    value={
                      !isNaN(Number(celebrationReminder.segment.data.customer_related_date.from))
                        ? englishNumberToPersianNumber(celebrationReminder.segment.data.customer_related_date.from)
                        : ""
                    }
                    style={{ textAlign: "left", height: 44 }}
                    InputProps={{
                      style: { borderRadius: 8, height: 44 },
                    }}
                    variant="outlined"
                    className="w-100"
                  />
                  <p style={{ top: 13, left: 20, fontSize: 15 }} className="position-absolute">
                    The day before the occasion
                  </p>
                </div>
                <p style={{ fontSize: 12 }} className="mt-2">
                  Determine the congratulatory SMS a few days before the customer's birth.
                </p>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-12 col-lg-6 col-sm-12 p-0 my-4">
                <StyledInputTitle className="mb-2">SMS time*</StyledInputTitle>
                <MuiPickersUtilsProvider utils={MomentUtils} locale={"en"}>
                  <TimePicker
                    style={{
                      border: "1px solid #E4E6E7",
                      flex: 1,
                      borderRadius: 8,
                      height: 44,
                      padding: ".5rem",
                    }}
                    disabled={!isCreatingNewCelebrationReminder}
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
                      return crontabToReadableTime(celebrationReminder?.periodic_task?.crontab ?? {});
                    }}
                    onChange={onTimeToExecuteChange}
                  />
                </MuiPickersUtilsProvider>
                <p style={{ fontSize: 12 }} className="mt-2">
                  Determine the hour you want to send SMS to the customer.
                </p>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-12 col-lg-6 col-sm-12 p-0 my-4">
                <StyledInputTitle>Gift type</StyledInputTitle>
                <p style={{ fontSize: 12 }} className="mt-2">
                  You can send a credit or discount code with a greeting SMS.
                </p>

                <RadioGroup
                  className="w-100"
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={handleGiftTypeChange}
                  value={celebrationReminder?.action?.type ?? null}
                >
                  {giftTypes.map((giftType) => {
                    return (
                      <FormControlLabel
                        style={{ flex: 1, margin: 0 }}
                        label={giftType.name}
                        control={<Radio color="primary" value={giftType.value} />}
                        key={giftType.id}
                        value={giftType.value}
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
            {giftTypesInputFieldsMap
              .get(celebrationReminder?.action?.type)
              .map((inputField) => inputField && inputField())}
            <div className="d-flex">
              <div className="col-12 col-lg-6 col-sm-12 p-0 my-4">
                <StyledInputTitle>SMS text*</StyledInputTitle>
                <div className="d-flex justify-content-between align-items-center" style={{ height: 50 }}>
                  <p style={{ fontSize: 12 }} className="mt-2">
                    You can edit the text of the SMS with the help of keywords.
                  </p>
                  {!isSmsFieldActive && (
                    <IconButton onClick={handleActivateSmsField}>
                      <ModeEditOutlineOutlinedIcon style={{ color: theme.palette.primary.main }} />
                    </IconButton>
                  )}
                </div>
                <div className="d-flex flex-wrap justify-content-center px-0 mx-0 px-lg-5 mx-lg-5 px-md-5 mx-md-5 mt-2 mb-1">
                  {smsKeywordsMap.get(celebrationReminder?.action?.type ?? DISCOUNT_CODE).map((smsKeyword) => {
                    return (
                      <Chip
                        onClick={() => handleSmsKeywordsClick(smsKeyword.value)}
                        disabled={!isSmsFieldActive}
                        className="m-1"
                        style={{
                          color: isSmsFieldActive ? theme.palette.primary.main : theme.palette.grey["600"],
                          border: `1px solid ${
                            isSmsFieldActive ? theme.palette.primary.main : theme.palette.grey["600"]
                          }`,
                        }}
                        key={smsKeyword.value}
                        label={smsKeyword.name}
                        variant="outlined"
                      />
                    );
                  })}
                </div>
                <div className="position-relative">
                  <TextField
                    disabled={!isSmsFieldActive}
                    minRows={5}
                    maxRows={5}
                    multiline
                    value={replaceEnglishSmsKeywordsWithPersian(state?.content) ?? ""}
                    onChange={handleSmsContentChange}
                    onSelect={selectionRangeChange}
                    InputProps={{
                      style: { borderRadius: 8, color: isSmsFieldActive ? "unset" : theme.palette.grey["400"] , paddingBottom:"2.3rem" },
                    }}
                    placeholder="SMS text"
                    variant="outlined"
                    className="w-100"
                  />
                  <div className="position-absolute" style={{ left: 10, bottom: 10 }}>
                    {isSmsFieldActive && (
                      <Button onClick={handleSetDefaultSmsField} size="small" style={{ color: theme.palette.primary.main, fontSize: 15, fontWeight: 400 }}>
                        <span style={{ borderBottom: `solid 1px ${theme.palette.primary.light}`, lineHeight: 1.1 }}>
                          Use the default text
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <StyledButton
                onClick={handleNavigateBack}
                style={{ color: theme.palette.grey[700] }}
                variant="outlined"
                className="mr-2"
              >
                cancel
              </StyledButton>
              <StyledButton
                onClick={submit}
                disabled={!isFormValidForSubmit}
                color="primary"
                variant="contained"
                className="mr-2"
              >
                Confirm
              </StyledButton>
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
}

export default CelebrationReminderDetails;
