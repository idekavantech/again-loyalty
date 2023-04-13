import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import ListItemText from "@material-ui/core/ListItemText";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import { satisfactionChoices } from "store/constants";
import { useCRMSegmentsDetail } from "./useCRMSegmentsDetail";
import { ClickAwayListener, TextField, Tooltip } from "@material-ui/core";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { borderColor } from "@saas/utils/colors";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CRMSegmentsSetting() {
  const {
    theme,
    isLoading,
    router,
    _crmLevels,
    _crmLabels,
    variationList,
    isSaveModalOpen,
    setIsSaveModalOpen,
    segmentMediums,
    selectableMediums,
    UNSET,
    segmentsEventDateType,
    segmentEventValueTypes,
    isUsingDateRange,
    isCreatingNewSegment,
    submit,
    onSegmentNameChange,
    onOrderFilterFromChange,
    onOrderFilterToChange,
    onOrderFilterAmountFromChange,
    onOrderFilterAmountToChange,
    handleCRMLevelClick,
    handleCRMLevelItemClick,
    handleCRMSatisfactionClick,
    handleCRMSatisfactionItemClick,
    handleCRMLabelClick,
    handleCRMLabelItemClick,
    handleCRMMediumsClick,
    handleCRMMediumsItemClick,
    handleCRMProductIdsClick,
    handleCRMProductIdsItemClick,
    onSegmentEventValueTypeClick,
    onSegmentEventDateTypeClick,
    onSegmentDateFilterFromChange,
    onSegmentDateFilterToChange,
    onCreditExpireInChange,
    onSegmentDateFilterChange,
    crmSegmentDetails,
    onLastSubmitedOrderChange,
    onMinimumCreditChange,
    onNoEventInDaysChange,
    isOpenTooltip,
    setIsOpenToolip,
  } = useCRMSegmentsDetail();

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
  const [isOpenAdvancedSettings, setIsOpenAdvancedSettings] = useState(false);

  if (isLoading) {
    return <LoadingIndicator height="80vh" />;
  } else {
    return (
      <div className="container">
        <Head>
          <title>Customer segmentation settings</title>
        </Head>

        <AdminBreadCrumb
          overrideCurrentLinkWith={crmSegmentDetails?.title}
          buttons={
            <div className="d-flex justify-content-end">
              <Button
                style={{
                  borderRadius: 8,
                  background: theme.palette.primary.main,
                  color: "#FFFFFF",
                }}
                className="py-2 px-4"
                onClick={() => {
                  setIsSaveModalOpen(true);
                }}
              >
                Save changes
              </Button>
            </div>
          }
        />
        <AssuranceDialog
          isOpen={isSaveModalOpen}
          closeDialogHandler={() => setIsSaveModalOpen(false)}
          contentText="Are you sure to save changes?"
          dialogSecondActionTextColor="primary"
          dialogMainActions={() => {
            submit();
            setIsSaveModalOpen(false);
            router.back();
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setIsSaveModalOpen(false)}
          dialogSecondActionText="Cancel"
        />
        <Paper elevation={3} style={{ marginTop: 24, padding: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 500 }} className="pb-2">
            Customer segmentation settings
          </p>
          <div>
            <p style={{ lineHeight: "24px" }}>
              You can Make your own sections with a combination of customer levels, their satisfaction and number
              Customer orders and... pay attention That to execute automated trends or campaign for a portion of your
              customers, You must create the segmentation you want in this section.
            </p>
          </div>
          {!isCreatingNewSegment && (
            <div className="mt-4">
              {Number(crmSegmentDetails.num_memberships) === 0 ? (
                <div> There are currently no customers in this segmentation</div>
              ) : (
                <p>
                  There are{" "}
                  <Chip
                    className="mx-1"
                    size="small"
                    color="primary"
                    label={priceFormatter(crmSegmentDetails.num_memberships)}
                  />
                  customers in this segmentation at the moment
                </p>
              )}
            </div>
          )}
          <div
            className="faq-box position-relative text-right rtl mt-4 t-align-left"
            style={{
              overflowX: "hidden",
            }}
          >
            <div
              className="flex-wrap row-rev d-flex u-fontLarge u-pre-wrap u-overflow-wrap justify-content-start"
              style={{ paddingTop: 32 }}
            >
              <div className="col-12  col-lg-3 mb-3 mb-lg-0 px-2">
                <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                  Name of segmentation
                </p>
                <input
                  placeholder="Section"
                  value={crmSegmentDetails?.title}
                  style={{
                    color: "#202223",
                    border: "1px solid #E4E6E7",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 400,
                    height: 44,
                  }}
                  className="w-100 px-4"
                  onChange={onSegmentNameChange}
                />
              </div>
            </div>
            <div
              className="flex-wrap row-rev d-flex u-fontLarge u-pre-wrap u-overflow-wrap justify-content-start"
              style={{ paddingTop: 32 }}
            >
              <div className="col-12  col-lg-3 mb-3 mb-lg-0 px-2">
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                  className="mb-1"
                >
                  Customer levels(Based on points)
                </p>
                <Select
                  className="w-100 mb-3"
                  style={{
                    minWidth: 150,
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                  }}
                  value={crmSegmentDetails?.levels || []}
                  multiple
                  margin="dense"
                  variant="outlined"
                  displayEmpty
                  size="large"
                  renderValue={() => {
                    if (crmSegmentDetails?.levels?.length === 0) return "All customers";
                    if (crmSegmentDetails?.levels?.length === 1 && crmSegmentDetails?.levels[0])
                      return _crmLevels?.find((level) => level?.id === crmSegmentDetails?.levels[0])?.title;
                    if (crmSegmentDetails?.levels?.length === _crmLevels?.length) return "All levels";
                    return `${englishNumberToPersianNumber(crmSegmentDetails?.levels?.length)} Level`;
                  }}
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
                  <MenuItem className="px-2">
                    <div className="w-100 d-flex align-items-center" onClick={handleCRMLevelClick}>
                      <Checkbox
                        className="p-1"
                        size="small"
                        indeterminate={
                          crmSegmentDetails?.levels?.length !== _crmLevels?.length && crmSegmentDetails?.levels?.length
                        }
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        color="primary"
                        checked={crmSegmentDetails?.levels?.length === _crmLevels?.length}
                      />
                      <ListItemText primary="Select all levels" className="text-right" />
                    </div>
                  </MenuItem>
                  {_crmLevels?.map((label) => {
                    return (
                      <MenuItem className="px-2" key={label?.title} value={label?.id}>
                        <div
                          className="w-100 d-flex align-items-center"
                          onClick={(e) => handleCRMLevelItemClick(e, label)}
                        >
                          <Checkbox
                            className="p-1"
                            size="small"
                            onChange={(e) => {
                              e.preventDefault();
                            }}
                            color="primary"
                            checked={crmSegmentDetails?.levels?.includes(label?.id)}
                          />
                          <ListItemText primary={label?.title} className="text-right" />
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className="col-12  col-lg-3 mb-3 mb-lg-0 px-2">
                <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                  Customer satisfaction
                </p>
                <Select
                  className="w-100 mb-3"
                  style={{
                    minWidth: 150,
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                  }}
                  value={crmSegmentDetails?.data?.satisfaction || []}
                  multiple
                  margin="dense"
                  variant="outlined"
                  displayEmpty
                  size="large"
                  renderValue={() => {
                    if (!crmSegmentDetails?.data?.satisfaction || crmSegmentDetails?.data?.satisfaction?.length === 0)
                      return "All customers";
                    if (
                      crmSegmentDetails?.data?.satisfaction?.length === 1 &&
                      crmSegmentDetails?.data?.satisfaction?.[0]
                    )
                      return satisfactionChoices.find(
                        (satisfactionItem) => crmSegmentDetails?.data?.satisfaction?.[0] === satisfactionItem.id
                      )?.title;
                    if (crmSegmentDetails?.data?.satisfaction?.length === satisfactionChoices?.length)
                      return "All levels of satisfaction";
                    return `${englishNumberToPersianNumber(
                      crmSegmentDetails?.data?.satisfaction?.length
                    )} The level of satisfaction`;
                  }}
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
                  <MenuItem className="px-2" onClick={handleCRMSatisfactionClick}>
                    <div className="w-100 d-flex align-items-center">
                      <Checkbox
                        className="p-1"
                        size="small"
                        indeterminate={
                          crmSegmentDetails?.data?.satisfaction?.length !== satisfactionChoices?.length &&
                          crmSegmentDetails?.data?.satisfaction?.length
                        }
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        color="primary"
                        checked={crmSegmentDetails?.data?.satisfaction?.length === satisfactionChoices?.length}
                      />
                      <ListItemText primary="Select all levels of satisfaction" className="text-right" />
                    </div>
                  </MenuItem>
                  {satisfactionChoices?.map((label) => {
                    return (
                      <MenuItem
                        className="px-2"
                        key={label?.title}
                        value={label?.id}
                        onClick={(e) => handleCRMSatisfactionItemClick(e, label)}
                      >
                        <div className="w-100 d-flex align-items-center">
                          <Checkbox
                            className="p-1"
                            size="small"
                            onChange={(e) => {
                              e.preventDefault();
                            }}
                            color="primary"
                            checked={
                              crmSegmentDetails?.data?.satisfaction
                                ? crmSegmentDetails?.data?.satisfaction?.includes(label?.id)
                                : false
                            }
                          />
                          <ListItemText primary={label?.title} className="text-right" />
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className="col-12 col-lg-3 mb-3 mb-lg-0 px-2">
                <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                  customer labels
                </p>
                <Select
                  className="w-100 mb-3"
                  style={{
                    minWidth: 150,
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                  }}
                  value={crmSegmentDetails?.labels || []}
                  multiple
                  margin="dense"
                  variant="outlined"
                  displayEmpty
                  size="large"
                  renderValue={() => {
                    if (crmSegmentDetails?.labels?.length === 0) return "All customers";
                    if (crmSegmentDetails?.labels?.length === 1 && crmSegmentDetails?.labels[0])
                      return _crmLabels?.find((level) => level?.id === crmSegmentDetails?.labels[0])?.title;
                    if (crmSegmentDetails?.labels?.length === _crmLabels?.length) return "All tags";
                    return `${englishNumberToPersianNumber(crmSegmentDetails?.labels?.length)} Label`;
                  }}
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
                  <MenuItem className="px-2">
                    <div className="w-100 d-flex align-items-center" onClick={handleCRMLabelClick}>
                      <Checkbox
                        className="p-1"
                        size="small"
                        indeterminate={
                          crmSegmentDetails?.labels?.length !== _crmLabels?.length && crmSegmentDetails?.labels?.length
                        }
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        color="primary"
                        checked={crmSegmentDetails?.labels?.length === _crmLabels?.length}
                      />
                      <ListItemText primary="Select all tags" className="text-right" />
                    </div>
                  </MenuItem>
                  {_crmLabels?.map((label) => {
                    return (
                      <MenuItem className="px-2" key={label?.title} value={label?.id}>
                        <div
                          className="w-100 d-flex align-items-center"
                          onClick={(e) => handleCRMLabelItemClick(e, label)}
                        >
                          <Checkbox
                            className="p-1"
                            size="small"
                            onChange={(e) => {
                              e.preventDefault();
                            }}
                            color="primary"
                            checked={crmSegmentDetails?.labels?.includes(label?.id)}
                          />
                          <ListItemText primary={label?.title} className="text-right" />
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className="col-12 col-lg-3 mb-3 mb-lg-0 px-2">
                <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                  Customer login link
                </p>
                <Select
                  className="w-100 mb-3"
                  style={{
                    minWidth: 150,
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                  }}
                  value={segmentMediums || []}
                  multiple
                  margin="dense"
                  variant="outlined"
                  displayEmpty
                  size="large"
                  renderValue={() => {
                    if (segmentMediums?.length === 0) return "All customers";
                    if (segmentMediums?.length === 1 && segmentMediums?.[0]) return segmentMediums?.[0];
                    if (segmentMediums?.length === selectableMediums?.length) return "All log links";
                    return `${englishNumberToPersianNumber(segmentMediums?.length)} Link link`;
                  }}
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
                  <MenuItem className="px-2" onClick={handleCRMMediumsClick}>
                    <div className="w-100 d-flex align-items-center">
                      <Checkbox
                        className="p-1"
                        size="small"
                        indeterminate={segmentMediums?.length !== selectableMediums?.length && segmentMediums?.length}
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        color="primary"
                        checked={segmentMediums?.length === selectableMediums?.length}
                      />
                      <ListItemText primary="Select all login links" className="text-right" />
                    </div>
                  </MenuItem>
                  {selectableMediums?.map((medium) => {
                    return (
                      <MenuItem
                        className="px-2"
                        key={medium}
                        value={medium}
                        onClick={(e) => handleCRMMediumsItemClick(e, medium)}
                      >
                        <div className="w-100 d-flex align-items-center">
                          <Checkbox
                            className="p-1"
                            size="small"
                            onChange={(e) => {
                              e.preventDefault();
                            }}
                            color="primary"
                            checked={segmentMediums?.includes(medium)}
                          />
                          <ListItemText primary={medium} className="text-right" />
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className="col-12 col-lg-12 mb-5 d-flex flex-wrap px-0  pb-3">
                <div className="col-12 col-lg-6 mb-3 mb-lg-0 px-2">
                  <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                    Number of customer order
                  </p>
                  <div
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: 8,
                    }}
                    className="position-relative d-flex justify-content-between"
                  >
                    <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                      <input
                        onChange={onOrderFilterToChange}
                        value={crmSegmentDetails?.data?.shopping_order?.count?.to}
                        className="w-100 text-center"
                        type="number"
                        placeholder="Maximum number"
                      />
                    </div>
                    <div className="px-3 d-flex justify-content-center align-items-center">until the</div>
                    <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                      <input
                        onChange={onOrderFilterFromChange}
                        value={crmSegmentDetails?.data?.shopping_order?.count?.from}
                        className="w-100 text-center"
                        type="number"
                        placeholder="Minimum number"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 mb-3 mb-lg-0 px-2">
                  <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                    The sum of the total amount of customer purchase
                  </p>
                  <div
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: 8,
                    }}
                    className="position-relative d-flex justify-content-between"
                  >
                    <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                      <input
                        onChange={onOrderFilterAmountToChange}
                        value={crmSegmentDetails?.data?.shopping_order?.total?.to}
                        className="w-100 text-center"
                        type="number"
                        placeholder="The maximum amount($)"
                      />
                    </div>
                    <div className="px-3 d-flex justify-content-center align-items-center">until the</div>
                    <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                      <input
                        className="w-100 text-center"
                        type="number"
                        placeholder="The minimum amount($)"
                        onChange={onOrderFilterAmountFromChange}
                        value={crmSegmentDetails?.data?.shopping_order?.total?.from}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-100 d-flex justify-content-end mt-2 mb-2">
                <Button
                  endIcon={isOpenAdvancedSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  onClick={() => setIsOpenAdvancedSettings((e) => !e)}
                >
                  <span className="px-3">More</span>
                </Button>
              </div>
              <Collapse in={isOpenAdvancedSettings} className="w-100">
                <div
                  className="w-100 d-flex justify-content-between pt-3"
                  style={{
                    borderTop: `solid 1px ${borderColor}`,
                    cursor: "pointer",
                  }}
                >
                  <p className="w-100">More settings(Advanced)</p>
                </div>

                <div className="d-flex row-rev w-100 mb-4 flex-wrap row-rev mt-2 pt-2">
                  <div className="col-12 col-lg-4 mb-3 mb-lg-0 px-2">
                    <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                      The number of days left to expire gift credit
                    </p>
                    <div
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: 8,
                      }}
                      className="position-relative row-rev d-flex justify-content-between"
                    >
                      <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                        <input
                          onChange={onCreditExpireInChange}
                          value={crmSegmentDetails?.data?.credit_expires_in_days}
                          className="w-100"
                          type="number"
                          placeholder="The end of credit"
                        />
                      </div>
                      <div className="px-3 d-flex justify-content-center align-items-center">Day</div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 mb-3 mb-lg-0 px-2">
                    <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                      Number of day from last customer interaction
                    </p>
                    <div
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: 8,
                      }}
                      className="position-relative d-flex row-rev justify-content-between"
                    >
                      <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                        <input
                          onChange={onNoEventInDaysChange}
                          value={crmSegmentDetails?.data?.no_event_in_days}
                          className="w-100"
                        />
                      </div>
                      <div className="px-3 d-flex justify-content-center align-items-center">Day</div>
                    </div>
                  </div>

                  <div className="col-12  col-lg-4 mb-3 mb-lg-0 px-2">
                    <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1 ">
                      Number of days from last customer's purchase
                    </p>
                    <div
                      style={{
                        color: "#202223",
                        border: "1px solid #E4E6E7",
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 400,
                        height: 44,
                      }}
                      className="position-relative d-flex row-rev justify-content-between"
                    >
                      <input
                        value={crmSegmentDetails?.data?.last_submitted_order_days}
                        type="number"
                        className="w-100 px-4"
                        onChange={onLastSubmitedOrderChange}
                      />
                      <div className="px-3 d-flex justify-content-center align-items-center">Day</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap row-rev w-100 mb-4">
                  <div className="col-12 col-lg-4 mb-3 mb-lg-0 px-2">
                    <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                      Minimum Customer Gift Credit
                    </p>
                    <div
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: 8,
                      }}
                      className="position-relative d-flex row-rev justify-content-between"
                    >
                      <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                        <input
                          onChange={onMinimumCreditChange}
                          value={crmSegmentDetails?.data?.gift_credit?.from}
                          className="w-100"
                        />
                      </div>
                      <div className="px-3 d-flex justify-content-center align-items-center">$</div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 mb-6 mb-lg-0 px-2">
                    <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                      Product/Products in order
                    </p>
                    <div className="d-flex row-rev">
                      <Select
                        className="w-100 mb-3"
                        style={{
                          minWidth: 150,
                          flex: 1,
                          borderRadius: 8,
                          height: 44,
                        }}
                        value={crmSegmentDetails?.variations || []}
                        multiple
                        margin="dense"
                        variant="outlined"
                        displayEmpty
                        size="large"
                        renderValue={() => {
                          if (crmSegmentDetails?.variations?.length === 0 || !crmSegmentDetails?.variations)
                            return "All customers";
                          if (crmSegmentDetails?.variations?.length === 1 && crmSegmentDetails?.variations[0])
                            return variationList?.find((product) => product?.id === crmSegmentDetails?.variations[0])
                              ?.title;
                          if (crmSegmentDetails?.variations?.length === variationList?.length) return "All products";
                          return `${englishNumberToPersianNumber(crmSegmentDetails?.variations?.length)} the product`;
                        }}
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
                        <MenuItem className="px-2" onClick={handleCRMProductIdsClick}>
                          <div className="w-100 d-flex align-items-center">
                            <Checkbox
                              className="p-1"
                              size="small"
                              color="primary"
                              onClick={(e) => e.preventDefault()}
                              indeterminate={
                                crmSegmentDetails?.variations?.length !== variationList?.length &&
                                crmSegmentDetails?.variations?.length
                              }
                              checked={crmSegmentDetails?.variations?.length === variationList?.length}
                            />
                            <ListItemText primary={"Select all products"} className="text-right" />
                          </div>
                        </MenuItem>
                        {variationList?.map((product) => {
                          return (
                            <MenuItem
                              className="px-2"
                              key={product?.id}
                              value={product.title}
                              onClick={(e) => handleCRMProductIdsItemClick(e, product)}
                            >
                              <div className="w-100 d-flex align-items-center">
                                <Checkbox
                                  className="p-1"
                                  size="small"
                                  color="primary"
                                  checked={
                                    crmSegmentDetails?.variations
                                      ? crmSegmentDetails?.variations?.includes(product?.id)
                                      : false
                                  }
                                />
                                <ListItemText primary={product.title} className="text-right" />
                              </div>
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <ClickAwayListener onClickAway={() => setIsOpenToolip(false)}>
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
                          onClose={() => setIsOpenToolip(false)}
                          open={isOpenTooltip}
                          title={
                            <>
                              Customers on their last purchase of this product/products will be included in this section
                              <br />
                              This segmentation is only available for <b>Order</b> automated process
                            </>
                          }
                        >
                          <Button style={{ height: 44 }} onClick={() => setIsOpenToolip(!isOpenTooltip)}>
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
                <div className="d-flex w-100 mb-4 flex-wrap row-rev">
                  <div className="w-100 col-12 col-lg-4 mb-3 col-md-12 mb-6 mb-lg-0 px-2">
                    <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                      Date of birth or marriage
                    </p>
                    <Select
                      className="w-100"
                      style={{
                        minWidth: 150,
                        flex: 1,
                        borderRadius: 8,
                        height: 44,
                      }}
                      value={segmentsEventDateType || []}
                      margin="dense"
                      variant="outlined"
                      displayEmpty
                      size="large"
                      onClick={onSegmentEventDateTypeClick}
                      renderValue={() => {
                        if (
                          !crmSegmentDetails?.data?.customer_related_date ||
                          !crmSegmentDetails?.data?.customer_related_date.date_type
                        )
                          return "All customers";
                        return segmentsEventDateType.find(
                          (eventType) =>
                            eventType.type === crmSegmentDetails?.data?.customer_related_date?.date_type?.toUpperCase()
                        )?.description;
                      }}
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
                      <MenuItem className="px-2" key={UNSET} value={UNSET}>
                        <div className="w-100 d-flex align-items-center">
                          <ListItemText primary="All customers" className="text-right" />
                        </div>
                      </MenuItem>
                      {segmentsEventDateType?.map((dateType) => {
                        return (
                          <MenuItem className="px-2" key={dateType.type} value={dateType.type}>
                            <div className="w-100 d-flex align-items-center">
                              <ListItemText primary={dateType.description} className="text-right" />
                            </div>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  {crmSegmentDetails?.data?.customer_related_date?.date_type && (
                    <div className="col-12 col-lg-8 mb-3 mb-lg-0 px-2">
                      <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                        Event interval
                      </p>
                      <div
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.23)",
                          borderRadius: 8,
                          height: 44,
                        }}
                        className="position-relative d-flex justify-content-between"
                      >
                        <div className="d-flex row-rev justify-content-center align-items-center">
                          <Select
                            className="w-100"
                            style={{
                              minWidth: 120,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: 1,
                              borderRadius: "0px 8px 8px 0px",
                              height: 44,
                              textAlign: "center",
                              background: "rgba(0,0,0,0.08)",
                            }}
                            value={segmentEventValueTypes}
                            margin="dense"
                            variant="standard"
                            disableUnderline={true}
                            displayEmpty
                            size="large"
                            onClick={onSegmentEventValueTypeClick}
                            renderValue={() => {
                              if (isUsingDateRange) return "Choosing the interval";
                              return "Select the day";
                            }}
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
                            {segmentEventValueTypes?.map((dateItem) => {
                              return (
                                <MenuItem className="px-2" key={dateItem.type} value={dateItem.type}>
                                  <div className="w-100 d-flex align-items-center">
                                    <ListItemText primary={dateItem.description} className="text-right" />
                                  </div>
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </div>
                        {isUsingDateRange ? (
                          <>
                            <div className="px-3 d-flex justify-content-center align-items-center">From</div>
                            <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                              <input
                                value={crmSegmentDetails?.data?.customer_related_date?.from}
                                onChange={onSegmentDateFilterFromChange}
                                className="w-100 text-center"
                                type="number"
                                placeholder="number of days"
                              />
                            </div>
                            <div className="px-3 d-flex justify-content-center align-items-center">The day before</div>
                            <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                              <input
                                value={crmSegmentDetails?.data?.customer_related_date?.to}
                                onChange={onSegmentDateFilterToChange}
                                className="w-100 text-center"
                                type="number"
                                placeholder="number of days"
                              />
                            </div>
                            <div className="px-3 d-flex justify-content-center align-items-center">The next day</div>
                          </>
                        ) : (
                          <>
                            <div className="px-5 d-flex justify-content-center align-items-center">Select the day</div>
                            <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                              <TextField
                                value={crmSegmentDetails?.data?.customer_related_date?.to}
                                onChange={onSegmentDateFilterChange}
                                className="w-100 text-center"
                                InputProps={{ disableUnderline: true }}
                                type="number"
                                placeholder="number of days"
                              />
                            </div>
                          </>
                        )}
                      </div>
                      {!isUsingDateRange && (
                        <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                          Negative numbers mean the days before
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Collapse>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default memo(CRMSegmentsSetting);
