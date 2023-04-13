/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import jMoment from "moment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { surface } from "@saas/utils/colors";
import MaterialSelect from "@saas/components/Select/MaterialSelect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  makeSelectBranches,
  makeSelectBusinessSiteDomain,
} from "@saas/stores/business/selector";
import {
  getAdminVendors,
  getSubmittedPurchasesReports,
  getSubmittedPurchasesReportsPerBranch,
} from "store/actions";
import { PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE } from "store/constants";
import {
  makeSelectAdminVendors,
  makeSelectSubmittedPurchasesReports,
  makeSelectSubmittedPurchasesReportsPerBranch,
} from "store/selectors";
import {
  HIGHEST_PRICE,
  NEWEST_CREATED_PURCHASE_DATE,
  NEWEST_UPDATED_PURCHASE_DATE,
  OLDEST_CREATED_PURCHASE_DATE,
  OLDEST_UPDATED_PURCHASE_DATE,
  VENDORS,
} from "../constants";
import Input from "@saas/components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

 
 

const sortingOptions = [
  { id: 0, text: "The latest order registration", keyword: NEWEST_CREATED_PURCHASE_DATE },
  {
    id: 1,
    text: "The oldest order registration",
    keyword: OLDEST_CREATED_PURCHASE_DATE,
  },
  {
    id: 2,
    text: "The latest order receipt",
    keyword: NEWEST_UPDATED_PURCHASE_DATE,
  },
  {
    id: 3,
    text: "The oldest order receipt",
    keyword: OLDEST_UPDATED_PURCHASE_DATE,
  },
  { id: 4, text: "The highest amount", keyword: HIGHEST_PRICE },
  { id: 5, text: "Supplier", keyword: VENDORS },
];

const sortingFunctions = {
  [NEWEST_CREATED_PURCHASE_DATE]: (purchases) =>
    purchases?.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
  [OLDEST_CREATED_PURCHASE_DATE]: (purchases) =>
    purchases?.sort((a, b) => (a.created_at > b.created_at ? 1 : -1)),
  [NEWEST_UPDATED_PURCHASE_DATE]: (purchases) =>
    purchases?.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1)),
  [OLDEST_UPDATED_PURCHASE_DATE]: (purchases) =>
    purchases?.sort((a, b) => (a.updated_at > b.updated_at ? 1 : -1)),
  [HIGHEST_PRICE]: (purchases) =>
    purchases?.sort((a, b) => (a.final_price < b.final_price ? 1 : -1)),
  [VENDORS]: (purchases) =>
    purchases?.sort((a, b) => (a.vendor.name === b.vendor.name ? 1 : -1)),
};

const branchHeadCells = [
  {
    id: "id",
    name: "Row",
    label: "Row",
    align: "center",
  },
  {
    id: "id",
    name: "She.Document",
    label: "She.Document",
    align: "center",
  },
  {
    id: "id",
    name: "Supplier",
    label: "Supplier",
    align: "center",
  },
  {
    id: "id",
    name: "Order registration date",
    label: (
      <div className="d-flex flex-column">
        <div>Order registration date</div>
        <div className="u-font-semi-small u-fontWeightNormal">(By the branch)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "Order confirmation date",
    label: (
      <div className="d-flex flex-column">
        <div>Order confirmation date</div>
        <div className="u-font-semi-small u-fontWeightNormal">
          (By the headquarters)
        </div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "The date of receiving the order",
    label: (
      <div className="d-flex flex-column">
        <div>The date of receiving the order</div>
        <div className="u-font-semi-small u-fontWeightNormal">(By the branch)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "The sum of the sums received",
    label: (
      <div className="d-flex flex-column">
        <div>The sum of the sums received</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "The sum of the document amount",
    label: (
      <div className="d-flex flex-column">
        <div>The sum of the document amount</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "Tax",
    label: (
      <div className="d-flex flex-column">
        <div>Tax</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "The rest",
    label: (
      <div className="d-flex flex-column">
        <div>The rest</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "Description",
    label: "Description",
    align: "center",
  },
  {
    id: "id",
    name: "The total amount received",
    label: (
      <div className="d-flex flex-column">
        <div>The total amount received</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "Total Amount",
    label: (
      <div className="d-flex flex-column">
        <div>Total Amount</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
    style: {
      position: "sticky",
      top: 0,
      left: 0,
      background: "#F1F2F3",
      borderRight: "none",
      borderBottom: "none",
    },
  },
];

let timeoutId = null;

export function AdminPurchaseReport({
  isLoading,
  isSuper,
  branches,
  siteDomain,
  _getSubmittedPurchasesReports,
  _getSubmittedPurchasesReportsPerBranch,
  purchasesReports,
  _getAdminVendors,
  vendors,
}) {
  const router = useRouter();
  const theme = useTheme();
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedVendors, setSelectedVendors] = useState(
    vendors?.map((vendor) => vendor.id) || []
  );
  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );
  const documentNumberSearchInputRef = useRef(null);
  const documentNumberSearchTimeout = useRef(null);
  const [documentNumberSearch, setDocumentNumberSearch] = useState(
    router.query.documentNumberSearch || ""
  );

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getSubmittedPurchasesReports({
            submitter_business: selectedBranches,
            site_domain: siteDomain,
            status: PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE,
            from_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.from),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.to),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getSubmittedPurchasesReportsPerBranch({
          site_domain: siteDomain,
          status: PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
    handleClose();
  };

  const headCells = useMemo(() => {
    if (isSuper) {
      const mainBranchHeadCells = [...branchHeadCells];
      mainBranchHeadCells.splice(1, 0, {
        id: "id",
        name: "Branch Name",
        label: "Branch Name",
        align: "center",
      });
      return mainBranchHeadCells;
    } else {
      return branchHeadCells;
    }
  }, [isSuper]);
  useEffect(() => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getSubmittedPurchasesReports({
            // submitter_business: selectedBranches,
            // site_domain: siteDomain,
            // status: PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE,
            from_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.from),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.to),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getSubmittedPurchasesReportsPerBranch({
          // site_domain: siteDomain,
          // status: PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
  }, [isSuper, selectedBranches, siteDomain]);
  useEffect(() => {
    setTimeout(() => {
      _getAdminVendors();
    }, 0);
  }, []);

  const headRow = useMemo(
    () => headCells?.map((headCell) => headCell.name),
    [headCells]
  );

  const rows = useMemo(
    () =>
      sortingFunctions[selectedSortingType](
        purchasesReports?.filter((purchase) =>
          purchase.order_id?.includes(documentNumberSearch)
        )
      )?.map((report, index) => {
        const createdAt = new Date(report.created_at);
        const createdAtFormattedDate = jMoment(
          `${createdAt.getFullYear()}-${
            createdAt.getMonth() + 1
          }-${createdAt.getDate()}`,
          "YYYY-MM-DD"
        );
        const num = index + 1;
        const jalaaliDateCreatedAt =
          createdAtFormattedDate.year() +
          "-" +
          (createdAtFormattedDate.month() + 1) +
          "-" +
          createdAtFormattedDate.date();
        const updatedAt = new Date(report.updated_at);
        const updatedAtFormattedDate = jMoment(
          `${updatedAt.getFullYear()}-${
            updatedAt.getMonth() + 1
          }-${updatedAt.getDate()}`,
          "YYYY-MM-DD"
        );
        const jalaaliDateUpdatedAt =
          updatedAtFormattedDate.year() +
          "-" +
          (updatedAtFormattedDate.month() + 1) +
          "-" +
          updatedAtFormattedDate.date();
        const acceptedAt = new Date(report.expected_date_to_receive);
        const acceptedAtFormattedDate = jMoment(
          `${acceptedAt.getFullYear()}-${
            acceptedAt.getMonth() + 1
          }-${acceptedAt.getDate()}`,
          "YYYY-MM-DD"
        );
        const jalaaliDateAcceptedAt =
          acceptedAtFormattedDate.year() +
          "-" +
          (acceptedAtFormattedDate.month() + 1) +
          "-" +
          acceptedAtFormattedDate.date();
        const branch = branches?.find(
          (branch) => branch.id === report?.submitter_business?.id
        )?.title;

        const sku = report.order_id;
        const vendor = report.vendor.name;

        const totalOrder = report.total_items_price;
        const tax = report.taxing_price;
        const extraCost = report.extra_costs_price;
        const des = report.description || "-";
        const finalPrice = report.final_price;

        if (isSuper) {
          return [
            num,
            branch,
            sku,
            vendor,
            jalaaliDateCreatedAt,
            jalaaliDateAcceptedAt,
            jalaaliDateUpdatedAt,
            totalOrder,
            tax,
            extraCost,
            des,
            finalPrice,
          ];
        }
        return [
          num,
          sku,
          vendor,
          jalaaliDateCreatedAt,
          jalaaliDateAcceptedAt,
          jalaaliDateUpdatedAt,
          totalOrder,
          tax,
          extraCost,
          des,
          finalPrice,
        ];
      }),

    [
      selectedSortingType,
      documentNumberSearch,
      branches,
      isSuper,
      purchasesReports,
    ]
  );

  return (
    <div className="container">
      <Head>
        <title>
          {isSuper
            ? "Financial Report of Order Registration and Branches Purchase Document"
            : "Financial Report of Order Registration and Purchase Document"}
        </title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="Output"
        submitAction={() =>
          generateCSVFile(
            headRow,
            rows || [],
            [],
            isSuper
              ? "Financial Report of Order Registration and Branches Purchase Document"
              : "Financial Report of Order Registration and Purchase Document"
          )
        }
      />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div
              className="d-flex align-items-center ml-3 mb-3"
              style={{ flex: 1 }}
            >
              <Input
                size="small"
                inputRef={documentNumberSearchInputRef}
                value={documentNumberSearch}
                fullWidth={false}
                onChange={(documentNumberSearch) => {
                  setDocumentNumberSearch(
                    persianToEnglishNumber(documentNumberSearch)
                  );
                  clearTimeout(documentNumberSearchTimeout.current);
                  const query = { ...router.query };
                  delete query.documentNumberSearch;
                  if (documentNumberSearch) {
                    query.documentNumberSearch =
                      persianToEnglishNumber(documentNumberSearch);
                  }
                  documentNumberSearchTimeout.current = setTimeout(() => {
                    router.push({
                      pathname: router.pathname,
                      query,
                    });
                  }, 500);
                }}
                placeholder="Search.‌Document"
                inputProps={{
                  className: "pr-5 mr-2",
                }}
                InputProps={{
                  startAdornment: (
                    <>
                      {router.query.documentNumberSearch ? (
                        <InputAdornment
                          style={{ position: "absolute", left: 3 }}
                          className="u-cursor-pointer"
                          position="start"
                          onClick={() => {
                            setDocumentNumberSearch("");
                            const query = { ...router.query };
                            delete query.documentNumberSearch;
                            router.push({
                              pathname: router.pathname,
                              query,
                            });
                          }}
                        >
                          <ClearRoundedIcon
                            style={{ color: theme.palette.text.disabled }}
                          />
                        </InputAdornment>
                      ) : null}
                      <InputAdornment
                        style={{ position: "absolute", right: 0 }}
                        className={`u-cursor-pointer u-pointer-events-none`}
                        position="start"
                      >
                        <SearchRoundedIcon
                          className="ml-1"
                          style={{ color: theme.palette.text.disabled }}
                          fontSize="small"
                        />
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            </div>
            <div className="d-flex flex-wrap align-items-center ml-3 mb-3">
              <Button
                style={{
                  direction: "rtl",
                }}
                aria-describedby={id}
                onClick={handleOpen}
                variant="outlined"
              >
                From{" "}
                <span className="px-2">
                  {englishNumberToPersianNumber(
                    formatDateObjectToNormal(selectedDayRange.from)
                  )}
                </span>
                until the{" "}
                <span className="px-2">
                  {englishNumberToPersianNumber(
                    formatDateObjectToNormal(selectedDayRange.to)
                  )}
                </span>
              </Button>
              <Popover
                id={id}
                anchorOrigin={{
                  vertical: 195,
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={openModal}
                onClose={handleClose}
              >
                <div style={{ backgroundColor: "#fff", position: "relative" }}>
                  <CloseIcon
                    onClick={handleClose}
                    className="u-cursor-pointer"
                    style={{
                      fontSize: 24,
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 10000,
                      color: "#555555",
                    }}
                  />

                  <CustomCalendar
                    selectedDayRange={selectedDayRange}
                    setSelectedDayRange={setSelectedDayRange}
                    submitDate={submitDate}
                  />
                </div>
              </Popover>
            </div>
            {isSuper && (
              <Select
                className=" ml-3 mb-3"
                style={{ minWidth: 150, height: 36, flex: 1 }}
                value={selectedBranches}
                multiple
                margin="dense"
                variant="outlined"
                displayEmpty
                size="large"
                // IconComponent={() => null}
                renderValue={() => {
                  if (selectedBranches.length === 0) return "Choose a branch";
                  if (selectedBranches.length === 1 && selectedBranches[0])
                    return branches.find(
                      (branch) => branch.id === selectedBranches[0]
                    ).title;
                  if (selectedBranches.length === branches.length)
                    return "All branches";
                  return `${englishNumberToPersianNumber(
                    selectedBranches.length
                  )} Branch`;
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
                  <Checkbox
                    className="p-1"
                    size="small"
                    indeterminate={
                      selectedBranches.length !== branches.length &&
                      selectedBranches.length
                    }
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      if (selectedBranches.length) setSelectedBranches([]);
                      else setSelectedBranches(branches.map((b) => b.id));
                    }}
                    color="primary"
                    checked={selectedBranches.length === branches.length}
                  />
                  <ListItemText
                    primary="Choosing all branches"
                    className="text-right"
                  />
                </MenuItem>
                {branches.map((branch) => {
                  return (
                    <MenuItem
                      className="px-2"
                      key={`${branch.id}-${selectedBranches.includes(
                        branch.id
                      )}`}
                      value={branch.id}
                    >
                      <Checkbox
                        className="p-1"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!selectedBranches.includes(branch.id)) {
                            setSelectedBranches([
                              ...selectedBranches,
                              branch.id,
                            ]);
                          } else {
                            setSelectedBranches(
                              selectedBranches.filter((id) => id !== branch.id)
                            );
                          }
                        }}
                        color="primary"
                        checked={selectedBranches.includes(branch.id)}
                      />
                      <ListItemText
                        primary={branch.title}
                        className="text-right"
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            )}
            <Select
              className=" ml-3 mb-3"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedVendors}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (selectedVendors?.length === 0)
                  return "Select the supplier";
                if (selectedVendors?.length === 1 && selectedVendors?.[0])
                  return vendors?.find(
                    (vendor) => vendor.id === selectedVendors?.[0]
                  ).title;
                if (selectedVendors?.length === vendors?.length)
                  return "All suppliers";
                return `${englishNumberToPersianNumber(
                  selectedVendors?.length
                )} Supplier`;
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
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedVendors?.length !== vendors?.length &&
                    selectedVendors?.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedVendors?.length) setSelectedVendors([]);
                    else setSelectedVendors(vendors?.map((b) => b.id));
                  }}
                  color="primary"
                  checked={selectedVendors?.length === vendors?.length}
                />
                <ListItemText
                  primary="Choosing all suppliers"
                  className="text-right"
                />
              </MenuItem>
              {vendors?.map((vendor) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${vendor.id}-${selectedVendors.includes(vendor.id)}`}
                    value={vendor.id}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!selectedVendors?.includes(vendor.id)) {
                          setSelectedVendors([...selectedVendors, vendor.id]);
                        } else {
                          setSelectedVendors(
                            selectedVendors?.filter((id) => id !== vendor.id)
                          );
                        }
                      }}
                      color="primary"
                      checked={selectedVendors?.includes(vendor.id)}
                    />
                    <ListItemText
                      primary={vendor.name}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <MaterialSelect
            FormControlProps={{
              style: {
                width: 80,
                flexShrink: 0,
              },
            }}
            className="small ml-2 pr-0 direction-ltr mb-3"
            inputProps={{
              className: "text-center ml-minus-2",
            }}
            IconComponent={() => null}
            options={sortingOptions}
            themeColor={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
            menuHeader={
              <div
                style={{ width: 200 }}
                className="px-3 u-fontWeightBold u-fontNormal my-1"
              >
                order by
              </div>
            }
            selectOption={(text) =>
              selectSortingType(
                sortingOptions.find((i) => i.text === text).keyword
              )
            }
            inputData={{
              defaultValue: "Ordering",
            }}
            selected={sortingOptions.find(
              (i) => i.keyword === selectedSortingType
            )}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              elevation: 3,
              getContentAnchorEl: null,
            }}
          />
        </div>
        <TableContainer
          className="mt-3 purchase-by-order-table"
          style={{ maxHeight: 500 }}
        >
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableHead
              style={{
                backgroundColor: "#F1F2F3",
                height: 50,
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    padding={headCell.padding || "unset"}
                    width={headCell.width || ""}
                    className="text-nowrap u-fontWeightBold"
                    key={headCell.id}
                    align={headCell.align}
                    style={headCell.style}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <TableRow style={{ height: 53 }} key={item.id}>
                    {headCells.map((cell) => (
                      <TableCell key={cell.id}>
                        <Skeleton
                          style={{
                            transform: "scale(1)",
                            width: "100%",
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {sortingFunctions[selectedSortingType](
                  purchasesReports?.filter((purchase) =>
                    purchase.order_id?.includes(documentNumberSearch)
                  )
                )?.map((report, index) => {
                  const createdAt = new Date(report.created_at);
                  const createdAtFormattedDate = jMoment(
                    `${createdAt.getFullYear()}-${
                      createdAt.getMonth() + 1
                    }-${createdAt.getDate()}`,
                    "YYYY-MM-DD"
                  );
                  const jalaaliDateCreatedAt =
                    createdAtFormattedDate.year() +
                    "-" +
                    (createdAtFormattedDate.month() + 1) +
                    "-" +
                    createdAtFormattedDate.date();
                  const updatedAt = new Date(report.updated_at);
                  const updatedAtFormattedDate = jMoment(
                    `${updatedAt.getFullYear()}-${
                      updatedAt.getMonth() + 1
                    }-${updatedAt.getDate()}`,
                    "YYYY-MM-DD"
                  );
                  const jalaaliDateUpdatedAt =
                    updatedAtFormattedDate.year() +
                    "-" +
                    (updatedAtFormattedDate.month() + 1) +
                    "-" +
                    updatedAtFormattedDate.date();
                  const acceptedAt = new Date(report.expected_date_to_receive);
                  const acceptedAtFormattedDate = jMoment(
                    `${acceptedAt.getFullYear()}-${
                      acceptedAt.getMonth() + 1
                    }-${acceptedAt.getDate()}`,
                    "YYYY-MM-DD"
                  );
                  const jalaaliDateAcceptedAt =
                    acceptedAtFormattedDate.year() +
                    "-" +
                    (acceptedAtFormattedDate.month() + 1) +
                    "-" +
                    acceptedAtFormattedDate.date();
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {englishNumberToPersianNumber(index + 1)}
                      </TableCell>
                      {isSuper && (
                        <TableCell align="center">
                          {
                            branches?.find(
                              (branch) =>
                                branch.id === report?.submitter_business?.id
                            )?.title
                          }
                        </TableCell>
                      )}
                      <TableCell align="center">
                        {englishNumberToPersianNumber(report.order_id)}
                      </TableCell>
                      <TableCell align="center">{report.vendor.name}</TableCell>
                      <TableCell align="center">
                        {englishNumberToPersianNumber(jalaaliDateCreatedAt)}
                      </TableCell>
                      <TableCell align="center">
                        {englishNumberToPersianNumber(jalaaliDateAcceptedAt)}
                      </TableCell>
                      <TableCell align="center">
                        {englishNumberToPersianNumber(jalaaliDateUpdatedAt)}
                      </TableCell>
                      <TableCell align="center">
                        {priceFormatter(report.received_final_price)}
                      </TableCell>
                      <TableCell align="center">
                        {priceFormatter(report.total_items_price)}
                      </TableCell>
                      <TableCell align="center">
                        {priceFormatter(report.taxing_price)}
                      </TableCell>
                      <TableCell align="center">
                        {priceFormatter(report.extra_costs_price)}
                      </TableCell>
                      <TableCell align="center">
                        {report.description || "-"}
                      </TableCell>
                      <TableCell align="center">
                        {priceFormatter(report.total_received_items_price)}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          position: "sticky",
                          left: 0,
                          background: "#F1F2F3",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: surface.neutral.default,
                            borderRadius: 4,
                          }}
                          className="px-4 py-3 u-fontWeightBold"
                        >
                          {priceFormatter(report.final_price)}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
  siteDomain: makeSelectBusinessSiteDomain(),
  purchasesReports: makeSelectSubmittedPurchasesReports(),
  purchasesReportsPerBranch: makeSelectSubmittedPurchasesReportsPerBranch(),
  vendors: makeSelectAdminVendors(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getSubmittedPurchasesReports: (params) =>
      dispatch(getSubmittedPurchasesReports(params)),
    _getSubmittedPurchasesReportsPerBranch: (params) =>
      dispatch(getSubmittedPurchasesReportsPerBranch(params)),
    _getAdminVendors: () => dispatch(getAdminVendors()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminPurchaseReport);
