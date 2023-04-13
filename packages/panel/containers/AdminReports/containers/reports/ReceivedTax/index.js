/**
 *
 * PURCHASE BY INGREDIETNS REPORTS
 *
 */
import React, { memo, useEffect, useMemo, useState } from "react";
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
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  makeSelectBranches,
  makeSelectBusinessSlug,
} from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import { HIGHEST_TAX, LOWEST_TAX } from "../constants";
import { getCustomersTaxingReports } from "store/actions";
import { makeSelectCustomersTaxingReports } from "store/selectors";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

 
 

const branchHeadCells = [
  {
    id: "id",
    label: "Row",
    name: "Row",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    label: "Factor number",
    name: "Factor number",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "total sales",
    label: (
      <div className="d-flex justify-content-between flex-column">
        <div>total sales</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "Tax received",
    label: (
      <div className="d-flex justify-content-between flex-column">
        <div>Tax received</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
    minWidth: 100,
  },
];

let timeoutId = null;

const sortingOptions = [
  { id: 1, text: "Most tax", keyword: HIGHEST_TAX },
  { id: 2, text: "The lowest taxes", keyword: LOWEST_TAX },
];
const sortingFunctions = {
  [HIGHEST_TAX]: (purchases) =>
    purchases?.sort((a, b) => (a.total_taxes < b.total_taxes ? 1 : -1)),
  [LOWEST_TAX]: (purchases) =>
    purchases?.sort((a, b) => (a.total_taxes < b.total_taxes ? -1 : 1)),
};
export function AdminReceivedTaxReport({
  isLoading,
  isSuper,
  branches,
  _getCustomersTaxingReports,
  customersTaxingReports,
}) {
  const theme = useTheme();
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );

  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
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
          _getCustomersTaxingReports({
            business_id: selectedBranches,
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
        _getCustomersTaxingReports({
          from_date: persianToEnglishNumber(fromDate.format("YYYY-MM-DD")),
          to_date: persianToEnglishNumber(toDate.format("YYYY-MM-DD")),
        });
      }, 500);
    }
    handleClose();
  };

  const purchaseReports = useMemo(
    () =>
      sortingFunctions[selectedSortingType](customersTaxingReports?.businesses),
    [isSuper, customersTaxingReports, selectedSortingType]
  );

  const headCells = useMemo(() => {
    if (isSuper) {
      const mainBranchHeadCells = [...branchHeadCells];
      mainBranchHeadCells.splice(1, 0, {
        id: "id",
        label: "Branch",
        name: "Branch",
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
          _getCustomersTaxingReports({
            business_id: selectedBranches,
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
        _getCustomersTaxingReports({});
      }, 500);
    }
  }, [isSuper, selectedBranches]);

  const headRow = useMemo(
    () => headCells.map((headCell) => headCell.name),
    [headCells]
  );
  const rows = useMemo(
    () =>
      customersTaxingReports &&
      purchaseReports?.map((report, index) => {
        const num = index + 1;
        const branchName = report.business_title;
        const factorNum = report.total_num_orders;
        const totalSale = report.total_payments;
        const receivedTax = report.total_taxes;

        return [num, branchName, factorNum, totalSale, receivedTax];
      }),
    [customersTaxingReports, purchaseReports]
  );

  const summaryRow = useMemo(
    () =>
      customersTaxingReports && [
        "total",
        "",
        customersTaxingReports?.totals?.[0].total_num_orders,
        customersTaxingReports?.totals?.[0].total_payments,
        customersTaxingReports?.totals?.[0].total_taxes,
      ],
    [customersTaxingReports]
  );

  return (
    <div className="container">
      <Head>
        <title>Tax report based on branches</title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="Output"
        submitAction={() =>
          generateCSVFile(
            headRow,
            rows || [],
            summaryRow || [],
            "Tax report based on branches"
          )
        }
      />

      <Paper
        elevation={2}
        className="d-flex flex-column mt-4"
        style={{ marginBottom: 50 }}
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
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
                    submitDate={submitDate}
                    selectedDayRange={selectedDayRange}
                    setSelectedDayRange={setSelectedDayRange}
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
        {isSuper && (
          <div className="d-flex align-items-center flex-wrap px-4">
            {selectedBranches?.length === branches?.length ? (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() => setSelectedBranches([])}
                label="All branches"
              />
            ) : selectedBranches?.length ? (
              branches
                ?.filter((item) => selectedBranches.includes(item.id))
                .map((branch) => {
                  return (
                    <Chip
                      key={branch.id}
                      deleteIcon={
                        <ClearRoundedIcon
                          style={{ color: theme.palette.text.disabled }}
                        />
                      }
                      style={{
                        borderRadius: 4,
                        background: theme.palette.background.secondary,
                        maxWidth: "fit-content",
                      }}
                      className="ml-2 mb-2"
                      onDelete={() =>
                        setSelectedBranches(
                          selectedBranches.filter((item) => item !== branch.id)
                        )
                      }
                      label={branch.title}
                    />
                  );
                })
            ) : (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() =>
                  setSelectedBranches(branches.map((branch) => branch.id))
                }
                label="None of the branches"
              />
            )}
          </div>
        )}
        {!selectedBranches?.length && isSuper ? (
          <div className="mx-auto">No branch is selected.</div>
        ) : (
          <TableContainer
            className="mt-3 purchase-by-order-table"
            style={{ maxHeight: 500 }}
          >
            <Table
              aria-labelledby="tableTitle"
              size="small"
              aria-label="sticky table"
            >
              <TableHead
                style={{
                  backgroundColor: "#F1F2F3",
                  height: 50,
                  position: "sticky",
                  top: 0,
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
                      style={{ minWidth: headCell.minWidth }}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableBody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <TableRow style={{ height: 53 }} key={item}>
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
                  {customersTaxingReports &&
                    purchaseReports?.map((report, index) => {
                      return (
                        <TableRow key={report.business_id}>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(index + 1)}
                          </TableCell>
                          {isSuper && (
                            <TableCell align="center">
                              {report.business_title}
                            </TableCell>
                          )}
                          <TableCell align="center">
                            {englishNumberToPersianNumber(
                              report.total_num_orders
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {priceFormatter(report.total_payments)}
                          </TableCell>
                          <TableCell align="center">
                            {priceFormatter(report.total_taxes)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <TableRow
                    style={{
                      backgroundColor: "#F1F2F3",
                      height: 85,
                      position: "sticky",
                      bottom: 0,
                    }}
                  >
                    <TableCell align="center" style={{ border: "none" }}>
                      total
                    </TableCell>
                    {isSuper && (
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                    )}
                    <TableCell align="center" style={{ border: "none" }}>
                      <div
                        style={{
                          backgroundColor: surface.neutral.default,
                          borderRadius: 4,
                        }}
                        className="px-4 py-3 u-fontWeightBold"
                      >
                        {priceFormatter(
                          customersTaxingReports?.totals?.[0].total_num_orders
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ border: "none" }}>
                      <div
                        style={{
                          backgroundColor: surface.neutral.default,
                          borderRadius: 4,
                        }}
                        className="px-4 py-3 u-fontWeightBold"
                      >
                        {priceFormatter(
                          customersTaxingReports?.totals?.[0].total_payments
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ border: "none" }}>
                      <div
                        style={{
                          backgroundColor: surface.neutral.default,
                          borderRadius: 4,
                        }}
                        className="px-4 py-3 u-fontWeightBold"
                      >
                        {priceFormatter(
                          customersTaxingReports?.totals?.[0].total_taxes
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  businessSlug: makeSelectBusinessSlug(),
  branches: makeSelectBranches(),
  customersTaxingReports: makeSelectCustomersTaxingReports(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCustomersTaxingReports: (data) =>
      dispatch(getCustomersTaxingReports(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminReceivedTaxReport);
