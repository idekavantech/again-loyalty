import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import { textTypes } from "@saas/utils/colors";
import Paper from "@material-ui/core/Paper";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import { SAVE_MODAL, CANCEL_MODAL } from "../../constants";
import Select from "@material-ui/core/Select";
import {
  automatedProcessesActionTypes,
  SMS,
  POINT,
  REWARD,
  CASHBACK,
} from "../../constants";
import { actionDelayTypes } from "../../constants";
import MenuItem from "@material-ui/core/MenuItem";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { isNullish } from "utils/helpers";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function AddActionCRMAutomatedTrends({ props }) {
  const {
    isLoading,
    _crmSegments,
    CUSTOM_LINK,
    business,
    internalLinks,
    modals,
    setSettingActionsCanceled,
    au,
    submit,
    toggleModals,
    ACTION_FIELDS,
    automatedTrendsSMSConstant,
    selectedLinkLabel,
    automatedProcessDetail,
    onNameChange,
    onTimeToExecuteTypeChange,
    onTimeToExecuteValueChange,
    onActionTypeChange,
    EXPIRATION,
    CASHBACK_AMOUNT,
    DISCOUNT_EXPIRY,
    USAGE_LIMITATION,
    POINT_AMOUNT,
    POINT_BY_STEP,
    CODE_PERCENT,
    DISCOUNT_CEILING_AMOUNT,
    DISCOUNT_FLOOR_AMOUNT,
    onActionExpirationChange,
    onActionAmountChange,
    onActionMaxCashbackChange,
    onActionPriceDivisionAmount,
    onActionPercentChange,
    onActionSelectLinkChange,
    onActionInputLinkChange,
    onActionDiscountPercentChange,
    onActionFloorAmountChange,
    onActionCeilingAmountChange,
    onSegmentChange,
    onDiscountExpiryChange,
    delayError,
  } = props;

  const { minWidth992 } = useResponsive();

  const automatedTrendsConstant = {
    [SMS]: { amount: "", unit: "" },
    [POINT]: { amount: "The value of the rating", unit: "" },
    [REWARD]: { amount: "The amount of reward", unit: "$" },
  };

  const FIELDS = {
    [EXPIRATION]: () => (
      <div
        className= "col-12 mt-3 mt-md-0 col-lg-4"
        style={{ padding: 0 }}
      >
        <div
          className={`${
            automatedProcessDetail?.action?.type === CASHBACK ? null : "pr-lg-4"
          }`}
        >
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            validity duration
          </p>
          <div className="position-relative">
            <input
              className="w-100 px-4"
              style={{
                color: "#202223",
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                height: 44,
              }}
              selectOnFocus
              placeholder="No expiration"
              value={
                !isNullish(automatedProcessDetail.action.expiration)
                  ? englishNumberToPersianNumber(
                      automatedProcessDetail?.action?.expiration
                    )
                  : ""
              }
              onChange={onActionExpirationChange}
              numberOnly
            />
            <p
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                color: textTypes.text.subdued,
              }}
            >
              Day
            </p>
          </div>
        </div>
      </div>
    ),
    [CASHBACK_AMOUNT]: () => (
      <div className="col-12 col-lg-4" style={{ padding: 0 }}>
        <div className="pl-lg-4">
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            The percentage of repayment
          </p>
          <div className="position-relative">
            <input
              className="w-100 px-4"
              style={{
                color: "#202223",
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                height: 44,
              }}
              selectOnFocus
              value={
                !isNullish(automatedProcessDetail?.action?.percent)
                  ? englishNumberToPersianNumber(
                      automatedProcessDetail?.action?.percent
                    )
                  : ""
              }
              onChange={onActionPercentChange}
              numberOnly
            />
          </div>
        </div>
      </div>
    ),
    [USAGE_LIMITATION]: () => (
      <div className="col-12 col-lg-4 mt-3 mt-md-0" style={{ padding: 0 }}>
        <div className="px-lg-2">
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            Use ceiling
          </p>
          <div className="position-relative">
            <input
              className="w-100 px-4"
              style={{
                color: "#202223",
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                height: 44,
              }}
              selectOnFocus
              placeholder="unlimited"
              value={
                !isNullish(automatedProcessDetail?.action?.max_cashback)
                  ? englishNumberToPersianNumber(
                      automatedProcessDetail?.action?.max_cashback
                    )
                  : ""
              }
              onChange={onActionMaxCashbackChange}
              numberOnly
            />
          </div>
        </div>
      </div>
    ),
    [POINT_AMOUNT]: () => (
      <div className="col-12 col-lg-4 mt-3 mt-md-0" style={{ padding: 0 }}>
        <div className="px-lg-2">
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            {!automatedProcessDetail?.action?.type
              ? "The value of the rating"
              : automatedTrendsConstant[automatedProcessDetail?.action?.type]
                  ?.amount}
          </p>
          <div className="position-relative">
            <input
              className="w-100 px-4"
              style={{
                color: "#202223",
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                height: 44,
              }}
              selectOnFocus
              value={
                !isNullish(automatedProcessDetail.action.amount) ?
                priceFormatter(
                automatedProcessDetail?.action?.amount) :
                ""
              }
              onChange={onActionAmountChange}
              numberOnly
            />
            <p
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                color: textTypes.text.subdued,
              }}
            >
              {
                automatedTrendsConstant[automatedProcessDetail?.action?.type]
                  ?.unit
              }
            </p>
          </div>
        </div>
      </div>
    ),
    [POINT_BY_STEP]: () =>
      au?.type === "shopping_order_accepted_event" && (
        <div className="col-12 col-lg-4 mt-3 pl-lg-3" style={{ padding: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            The amount on the points
          </p>
          <div className="position-relative">
            <input
              className="w-100 px-4"
              style={{
                color: "#202223",
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                height: 44,
              }}
              placeholder="Without calculating an amount"
              selectOnFocus
              value={
                automatedProcessDetail?.action?.price_division_amount &&
                Number(
                  automatedProcessDetail?.action?.price_division_amount
                ) !== 0
                  ? englishNumberToPersianNumber(
                      automatedProcessDetail?.action?.price_division_amount
                    )
                  : ""
              }
              onChange={onActionPriceDivisionAmount}
              numberOnly
            />
          </div>
        </div>
      ),
    [CODE_PERCENT]: () => (
      <div className="col-12 col-lg-4 mt-3 mt-md-0" style={{ padding: 0 }}>
        <div className="px-lg-2">
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            discount percent
          </p>
          <div className="position-relative">
            <input
              className="w-100 px-4"
              style={{
                color: "#202223",
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                height: 44,
              }}
              selectOnFocus
              value={
                !isNullish(automatedProcessDetail?.action?.discount_percent)
                  ? englishNumberToPersianNumber(
                      automatedProcessDetail?.action?.discount_percent
                    )
                  : ""
              }
              onChange={onActionDiscountPercentChange}
              numberOnly
            />
            <p
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                color: textTypes.text.subdued,
              }}
            >
              Percent
            </p>
          </div>
        </div>
      </div>
    ),
    [DISCOUNT_FLOOR_AMOUNT]: () => (
      <div className="col-12 col-lg-4 mt-3 mt-md-0" style={{ padding: 0 }}>
        <div className="pr-lg-3">
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            {" "}
            Minimum purchase
          </p>
          <div className="position-relative">
            <input
              className="w-100 px-4"
              style={{
                color: "#202223",
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                height: 44,
              }}
              selectOnFocus
              placeholder=" Enter the amount"
              value={
                !isNullish(automatedProcessDetail?.action?.discount_floor_amount)
                  ? priceFormatter(
                      automatedProcessDetail?.action?.discount_floor_amount
                    )
                  : ""
              }
              onChange={onActionFloorAmountChange}
            />
            <p
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                color: textTypes.text.subdued,
              }}
            >
              $
            </p>
          </div>
        </div>
      </div>
    ),
    [DISCOUNT_CEILING_AMOUNT]: () => (
      <div className="col-12 col-lg-4 mt-3 mt-md-0" style={{ padding: 0 }}>
        <div className="pr-lg-4">
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            Maximum discount Amount
          </p>
          <div className="position-relative">
            <input
              selectOnFocus
              placeholder=" Enter the amount"
              className="w-100 px-4"
              style={{
                color: "#202223",
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                height: 44,
              }}
              value={
                !isNullish(
                  automatedProcessDetail?.action?.discount_ceiling_amount
                )
                  ? priceFormatter(
                      automatedProcessDetail?.action?.discount_ceiling_amount
                    )
                  : ""
              }
              onChange={onActionCeilingAmountChange}
            />
            <p
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                color: textTypes.text.subdued,
              }}
            >
              $
            </p>
          </div>
        </div>
      </div>
    ),
    [DISCOUNT_EXPIRY]: () => (
      <div className="col-12 col-lg-4 mt-4 mt-md-0" style={{ padding: 0 }}>
        <div className="pl-lg-3">
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            Expiration
          </p>
          <div className="position-relative">
            <input
              className="w-100 px-4"
              style={{
                color: "#202223",
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                height: 44,
              }}

              selectOnFocus
              value={
                !isNullish(automatedProcessDetail?.action?.expiration)
                  ? englishNumberToPersianNumber(automatedProcessDetail?.action?.expiration)
                  : ""
              }
              onChange={onDiscountExpiryChange}
            />
            <p
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                color: textTypes.text.subdued,
              }}
            >
              Day
            </p>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <>
      <AssuranceDialog
        isOpen={modals[SAVE_MODAL]}
        closeDialogHandler={() => toggleModals(SAVE_MODAL)}
        contentText="Are you sure to save changes?"
        dialogMainActions={() => {
          submit();
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleModals(SAVE_MODAL)}
        dialogSecondActionTextColor="primary"
        dialogSecondActionText="No"
      />
      <AssuranceDialog
        isOpen={modals[CANCEL_MODAL]}
        closeDialogHandler={() => toggleModals(CANCEL_MODAL)}
        contentText="Are you sure to cancel the changes?"
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {
          setSettingActionsCanceled(true);
          toggleModals(CANCEL_MODAL);
          router.back();
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleModals(CANCEL_MODAL)}
        dialogSecondActionText="No"
      />

      {isLoading ? (
        <LoadingIndicator height="80vh" />
      ) : (
        <div className="container">
          <AdminBreadCrumb />

          <div>
            <Paper elevation={1} style={{ padding: 24 }}>
              <p
                style={{
                  color: textTypes.text.default,
                  fontWeight: 600,
                  lineHeight: "24px",
                  fontSize: 16,
                }}
              >
                Add action
              </p>
              <p
                className="mt-2"
                style={{
                  lineHeight: "24px",
                  fontSize: 14,
                  paddingBottom: 24,
                  borderBottom: "1px solid #E4E6E7",
                }}
              >
                In this section you can determine that some time after<b>{au.title.replace("To" , "")}</b> on witch automated process run for the customer.
              </p>
              <div className="d-flex flex-wrap mt-3 pb-3">
                <div className="col-12 col-lg-4 mt-3" style={{ padding: 0 }}>
                  <div className="pl-lg-4">
                    <p
                      style={{ fontSize: 12, fontWeight: 600 }}
                      className="mb-1"
                    >
                      Name of automatic trend
                    </p>
                    <input
                      className="w-100 px-4"
                      style={{
                        color: "#202223",
                        border: "1px solid #E4E6E7",
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 400,
                        height: 44,
                      }}
                      required={true}
                      type="text"
                      onChange={onNameChange}
                      value={automatedProcessDetail?.title}
                    />
                  </div>
                </div>

                <div className="col-12 col-lg-4 mt-3" style={{ padding: 0 }}>
                  <div className="px-lg-2">
                    <p
                      style={{ fontSize: 12, fontWeight: 600 }}
                      className="mb-1"
                    >
                      {" "}
                      Customer segmentation
                    </p>
                    <Select
                      style={{
                        minWidth: 150,
                        flex: 1,
                        borderRadius: 8,

                        height: 44,
                      }}
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={automatedProcessDetail?.segment || ""}
                      className="w-100"
                      variant="outlined"
                      onChange={onSegmentChange}
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
                      {_crmSegments?.map?.((segment) => (
                        <MenuItem value={segment.id} key={segment.id}>
                          {segment.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="col-12 col-lg-4 mt-3" style={{ padding: 0 }}>
                  <div className="pr-lg-4">
                    <p
                      style={{ fontSize: 12, fontWeight: 600 }}
                      className="mb-1"
                    >
                      Action start time
                    </p>
                    <div className="position-relative">
                      <input
                        className="w-100 px-4"
                        style={{
                          color: "#202223",
                          border: "1px solid #E4E6E7",
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 400,
                          height: 44,
                        }}
                        selectOnFocus
                        value={englishNumberToPersianNumber(
                          automatedProcessDetail?.time_to_execute?.value
                        )}
                        onChange={onTimeToExecuteValueChange}
                        numberOnly
                        error={Boolean(delayError)}
                      />
                      <Select
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          height: 44,
                          borderRadius: "0px 8px 8px  0px",
                        }}
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={
                          automatedProcessDetail?.time_to_execute?.type || ""
                        }
                        className="w-25 "
                        variant="outlined"
                        onChange={onTimeToExecuteTypeChange}
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
                        {actionDelayTypes.map((delayType) => (
                          <MenuItem value={delayType.type} key={delayType.type}>
                            {delayType.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <p style={{ color: "red" }}>{delayError}</p>
                  </div>
                </div>
              </div>
              <div
                className="d-flex mt-3 pb-3 flex-wrap justify-content-start"
                style={{
                  gap: "15px 0px",
                }}
              >
                <div
                  className={`col-12 mt-3 mt-md-0 ${
                    false ? "col-lg-6  pl-lg-3" : "col-lg-4"
                  }`}
                  style={{ padding: 0 }}
                >
                  <div className="mt-3 mt-md-0 pl-lg-3">
                    <p
                      style={{ fontSize: 12, fontWeight: 600 }}
                      className="mb-1"
                    >
                      Action type
                    </p>
                    <Select
                      style={{
                        minWidth: 150,
                        flex: 1,
                        borderRadius: 8,
                        height: 44,
                      }}
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={automatedProcessDetail?.action?.type || ""}
                      className="w-100"
                      variant="outlined"
                      onChange={onActionTypeChange}
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
                      {automatedProcessesActionTypes[au?.type].map(
                        (actionType) => {
                          return (
                            <MenuItem
                              key={actionType.type}
                              value={actionType.type}
                            >
                              {actionType.name}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </div>
                </div>
                {Array.isArray(
                  ACTION_FIELDS[automatedProcessDetail?.action?.type]
                ) &&
                  ACTION_FIELDS[automatedProcessDetail?.action?.type].map(
                    (actionItem) => FIELDS[actionItem]({})
                  )}
              </div>
              <div className="mt-4">
                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: 8,
                  }}
                  className="position-relative"
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -9,
                      right: 12,
                      fontSize: 12,
                      background: "white",
                    }}
                    className="px-2"
                  >
                    SMS text
                  </div>
                  <div
                    className="p-3"
                    style={{
                      color: "rgba(0, 0, 0, 0.38)",
                    }}
                  >
                    {typeof automatedTrendsSMSConstant[au?.type]?.[
                      automatedProcessDetail?.action?.type || ""
                    ] === "function"
                      ? automatedTrendsSMSConstant[au?.type]?.[
                          automatedProcessDetail?.action?.type || ""
                        ]?.({ businessTitle: business.revised_title })
                      : null}
                  </div>
                  <div className="d-flex flex-wrap justify-content-between">
                    <div
                      className=" col-sm-12 col-md-12 col-lg-4 col-xl-3 "
                      style={{ padding: "0" }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "18px",
                          fontWeight: "400",
                          height: "56px",
                          cursor: "pointer",
                          width: "100%",
                          position: "absolute",
                        }}
                      >
                        {selectedLinkLabel.length === 0
                          ? "Enter the desired link"
                          : selectedLinkLabel.length > 15
                          ? `${selectedLinkLabel.slice(0, 17)} ...`
                          : selectedLinkLabel}
                      </div>
                      <Select
                        disableUnderline={true}
                        style={{
                          minWidth: 150,
                          flex: 1,
                          borderRadius: minWidth992 ? "0px 0px 0px 8px" : 0,
                          height: 50,
                        }}
                        labelId="demo-customized-select-label"
                        className="w-100"
                        value=""
                        variant="filled"
                        onChange={onActionSelectLinkChange}
                      >
                        <MenuItem value={CUSTOM_LINK} key={CUSTOM_LINK}>
                          {CUSTOM_LINK.label}
                        </MenuItem>
                        <MenuItem disabled key={"header"}>
                          Default links
                        </MenuItem>
                        {internalLinks.map((link, idx) => {
                          return (
                            <MenuItem
                              key={idx}
                              value={{
                                link: `${business.get_vitrin_absolute_url}${link.value}`,
                                label: link.label,
                              }}
                            >
                              <div className="w-100 d-flex justify-content-between">
                                <div className="ml-5">{link.label}</div>
                                <div>
                                  {business.get_vitrin_absolute_url}
                                  {link.value}
                                </div>
                              </div>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                    <div
                      className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9"
                      style={{ padding: "0" }}
                    >
                      <input
                        style={{
                          color: "#202223",
                          border: "1px solid #E4E6E7",
                          direction: "ltr",
                          borderRadius: minWidth992
                            ? "0px 0px 8px 0px"
                            : "0px 0px 8px 8px",
                          fontSize: 14,
                          fontWeight: 400,
                          height: 50,
                        }}
                        className="w-100 px-4"
                        onChange={onActionInputLinkChange}
                        value={automatedProcessDetail?.action?.link}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
            <div
              className="d-flex justify-content-end align-items-center"
              style={{
                marginTop: 20,
                paddingTop: 32,
                borderTop: "1px solid #E4E6E7",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "transparent",
                  minWidth: 50,
                  height: 40,
                  border: "1px solid #8C9196",
                  color: "#8C9196",
                  padding: 0,
                }}
                onClick={() => toggleModals(CANCEL_MODAL)}
                className="ml-2 u-box-shadow-none p-4"
              >
                cancel
              </Button>
              <Button
                onClick={() => toggleModals(SAVE_MODAL)}
                color="primary"
                variant="contained"
                style={{ height: 40 }}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(AddActionCRMAutomatedTrends);
