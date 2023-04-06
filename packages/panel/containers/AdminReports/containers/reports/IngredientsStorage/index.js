/**
 *
 * PURCHASE BY PRODUCT REPORTS
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
import { exportPDFFromHTML } from "@saas/utils/helpers/exportPDFFromHTML";

import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

import MaterialSelect from "@saas/components/Select/MaterialSelect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import EmptyStateForIngredients from "./components/EmptyStateForIngredients";
import EmptyStateForReports from "./components/EmptyStateForReports";
import { useRouter } from "next/router";
import {
  BRANCHES_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import { getIngredients, getIngredientsRecountingReports } from "store/actions";
import {
  makeSelectIngredients,
  makeSelectIngredientsRecountingReports,
} from "store/selectors";
import {
  HIGHEST_PRICE,
  LOWEST_PRICE,
  NEWEST,
  OLDEST,
  VENDORS,
} from "../constants";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import jMoment from "moment-jalaali";
import Chip from "@material-ui/core/Chip";
import useTheme from "@material-ui/core/styles/useTheme";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const sortingOptions = [
  { id: 0, text: "the newest", keyword: NEWEST },
  { id: 1, text: "The oldest", keyword: OLDEST },
  { id: 2, text: "The highest amount", keyword: HIGHEST_PRICE },
  { id: 3, text: "The least amount", keyword: LOWEST_PRICE },
];

const pdf = ({ business, branches, is_super }) => {
  const createdAtFormattedDate = jMoment(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
    "YYYY-MM-DD"
  );
  const jalaaliDate = createdAtFormattedDate.format("jYYYY/jMM/jDD");
  return {
    headerTemplate: (
      <div className="d-none">
        <div
          style={{
            border: "1px solid #00000033",
            borderRadius: 8,
            color: "#202223",
            padding: 12,
            marginBottom: 8,
            marginTop: -5,
            fontSize: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "spacee-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>Date Received: {jalaaliDate}</div>
            <div
              style={{
                width: 300,
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {business.revised_title}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "left",
              }}
            >
              She. Report:{" "}
              {englishNumberToPersianNumber(
                Math.floor(100000 + Math.random() * 900000)
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "spacee-between",
              alignItems: "start",
              marginTop: 12,
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            ></div>
            <div
              style={{
                width: 300,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              «Raw material warehousing report»
            </div>
            <div style={{ flex: 1 }}></div>
          </div>
        </div>
        {is_super && (
          <div
            style={{
              border: "1px solid #00000033",
              borderRadius: 8,
              color: "#202223",
              padding: 12,
              marginBottom: 8,
              marginTop: 0,
              fontSize: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "spacee-between",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  flex: 1,
                  textAlign: "left",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    padding: "4px 8px",
                    margin: "4px",
                    background: "#E4E5E7",
                    fontWeight: "bold",
                    borderRadius: "4px",
                  }}
                >
                  branches:
                </span>{" "}
                {branches.map((branch) => (
                  <div
                    key={branch}
                    style={{
                      padding: "4px 8px",
                      margin: "4px",
                      background: "#F6F6F7",
                      borderRadius: "4px",
                    }}
                  >
                    {branch}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    footerTemplate: `<footer style="width: max-content;font-size: 10px;margin:0px auto 0px; border: 0.5px solid #c4c4c4;border-radius: 4px; padding: 4px 12px;font-family: 'dana'">
      Page<span class="pageNumber"></span> / <span class="totalPages"></span>
      </footer>`,
    main_styles: `
    *{
      box-sizing: border-box;
    }
    thead{
      background: #F1F2F3;
      border-radius:8px 8px 0 0;

    }
    img{
      display:none
    }
    th{
      padding:16px 8px;
      background: #F1F2F3;
      border: 0.5px solid #00000033;
      color: white;
      font-size:12px;
      text-align: right
    }
    td{
      padding:4px;
      border: 0.5px solid #c4c4c4;
    }
    table{
      width: 100%;
      border-collapse: separate;
      border-spacing: 0px;
    }
    .summary{
      font-size:12px !important;
    }
    table th:first-child{
      border-radius:0 8px 0 0;
    }
    
    table th:last-child{
      border-radius:8px 0 0 0;
    }
    table tr:last-child td:first-child{
      border-radius:0 0 4px 0;
    }
    table tr:last-child td:last-child{
      border-radius:0 0 0 4px;
    }
    .pdf-display-none{
      display: none
    }
  `,
  };
};
const sortingFunctions = {
  [NEWEST]: (reports) =>
    reports?.sort((a, b) => (a.submitted_at < b.submitted_at ? 1 : -1)),
  [OLDEST]: (reports) =>
    reports?.sort((a, b) => (a.submitted_at > b.submitted_at ? 1 : -1)),
  [HIGHEST_PRICE]: (reports) =>
    reports?.sort((a, b) =>
      Number(a.total_diff_price) < Number(b.total_diff_price) ? 1 : -1
    ),
  [LOWEST_PRICE]: (reports) =>
    reports?.sort((a, b) =>
      Number(a.total_diff_price) > Number(b.total_diff_price) ? 1 : -1
    ),
  [VENDORS]: (reports) =>
    reports?.sort((a, b) => (a.amount < b.amount ? 1 : -1)),
};

const branchHeadCells = [
  {
    id: "id",
    label: "Row",
    align: "center",
  },
  {
    id: "id",
    label: "Date",
    align: "center",
  },
  {
    id: "id",
    label: "The amount of difference(Toman)",
    align: "center",
  },
];

let timeoutId = null;

export function AdminIngredientsStorageReport({
  isLoading,
  isSuper,
  urlPrefix,
  _getIngredients,
  branchIngredients,
  _getIngredientsRecountingReports,
  ingredientsRecountingReports,
  branches,
  business,
}) {
  const router = useRouter();
  const theme = useTheme();
  const [exportAnchor, toggleExportAnchor] = useState(null);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = openModal ? "simple-popover" : undefined;

  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );
  const [hasAnyReport, toggleHasAnyReport] = useState(false);
  const hasAnyKeepTrackedIngredient =
    (!isSuper && Boolean(branchIngredients?.length)) || isSuper;
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
    if (!isSuper) {
      setTimeout(() => {
        _getIngredients({});
      }, 0);
    }
  }, [isSuper]);
  useEffect(() => {
    toggleHasAnyReport(Boolean(ingredientsRecountingReports?.length));
  }, [ingredientsRecountingReports]);
  useEffect(() => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getIngredientsRecountingReports({
            business_id: selectedBranches,
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getIngredientsRecountingReports();
      }, 500);
    }
  }, [isSuper, selectedBranches]);
  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getIngredientsRecountingReports({
            business_id: selectedBranches,
            from_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.from),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.to),
                "jYYYY-jM-jD"
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
        _getIngredientsRecountingReports({
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
  };
  const PDFConfigs = useMemo(() => {
    return typeof pdf === "function"
      ? pdf({
          business,
          branches: isSuper
            ? selectedBranches.map(
                (_branch) =>
                  branches?.find((__branch) => __branch.id === _branch)?.title
              )
            : null,
          from_date: null,
          to_date: null,
          is_super: isSuper,
        })
      : {};
  }, [selectedBranches, isSuper, business, pdf]);
  const reports = useMemo(() => {
    return sortingFunctions[selectedSortingType](ingredientsRecountingReports);
  }, [isSuper, ingredientsRecountingReports, selectedSortingType]);

  const headRow = useMemo(
    () => headCells.map((headCell) => headCell.label),
    [headCells]
  );
  const rows = useMemo(
    () =>
      reports?.map((report, index) => {
        const itemDate = new Date(report.submitted_at);
        const itemJalaaliFormat = jMoment(
          `${itemDate.getFullYear()}-${
            itemDate.getMonth() + 1
          }-${itemDate.getDate()}`,
          "YYYY-MM-DD"
        );
        const formattedDate =
          itemJalaaliFormat.jYear() +
          "-" +
          (itemJalaaliFormat.jMonth() + 1) +
          "-" +
          itemJalaaliFormat.jDate();
        const num = index + 1;
        const branchName = branches?.find(
          (branch) => branch.id === report.business_id
        )?.title;
        const diffrencePrice = report.total_diff_price;
        if (isSuper) {
          return [num, branchName, formattedDate, diffrencePrice];
        }
        return [num, formattedDate, diffrencePrice];
      }),
    [reports, branches, isSuper]
  );

  return (
    <div className="container">
      <Head>
        <title>View the results of warehousing raw materials</title>
      </Head>

      <AdminBreadCrumb
        submitButtonText={
          hasAnyKeepTrackedIngredient && !isSuper ? "Asking for a new count" : ""
        }
        submitAction={() =>
          router.push(
            `${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/ingredients_storage/new`
          )
        }
        buttons={
          <div className="d-inline-block mr-auto">
            <Button
              className="mr-auto"
              size="medium"
              color="primary"
              variant="contained"
              onClick={(e) => toggleExportAnchor(e.currentTarget)}
            >
              Output
            </Button>
            <Menu
              elevation={1}
              anchorEl={exportAnchor}
              keepMounted
              open={Boolean(exportAnchor)}
              onClose={() => toggleExportAnchor(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              {/* <MenuItem
                onClick={async () => {
                  await exportPDFFromHTML(
                    {
                      css: PDFConfigs.main_styles,
                      html: document.getElementById("report").innerHTML,
                      configs: {
                        margin: {
                          top: 10,
                          left: 0,
                          bottom: 60,
                          right: 0,
                        },
                        displayHeaderFooter: true,
                        footerTemplate: PDFConfigs.footerTemplate,
                      },
                    },
                    `View the results of warehousing raw materials from${formatDateObjectToNormal(
                      selectedDayRange.from
                    )} until the${formatDateObjectToNormal(selectedDayRange.to)}.pdf`
                  );
                }}
              >
                PDF
              </MenuItem> */}
              <MenuItem
                onClick={() =>
                  generateCSVFile(
                    headRow,
                    rows,
                    [],
                    `View the results of warehousing raw materials from${formatDateObjectToNormal(
                      selectedDayRange.from
                    )} until the${formatDateObjectToNormal(selectedDayRange.to)}`
                  )
                }
              >
                CSV
              </MenuItem>
            </Menu>
          </div>
        }
      />

      {hasAnyKeepTrackedIngredient ? (
        <Paper elevation={2} className="d-flex flex-column mt-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
            <div className="d-flex flex-wrap align-items-center">
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
                    if (selectedBranches.length === 0)
                      return "Choose a branch";
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
                                selectedBranches.filter(
                                  (id) => id !== branch.id
                                )
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
              <div className="d-flex flex-wrap align-items-center mb-3 ml-3">
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
                  <div
                    style={{ backgroundColor: "#fff", position: "relative" }}
                  >
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
                      setSelectedDayRange={setSelectedDayRange}
                      selectedDayRange={selectedDayRange}
                    />
                  </div>
                </Popover>
              </div>
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
                            selectedBranches.filter(
                              (item) => item !== branch.id
                            )
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
          ) : hasAnyReport ? (
            <div id="report">
              {PDFConfigs.headerTemplate}
              <TableContainer
                className="mt-3 purchase-by-order-table"
                style={{ marginBottom: 70 }}
              >
                <Table
                  aria-labelledby="tableTitle"
                  size="small"
                  aria-label="enhanced table"
                >
                  <TableHead style={{ backgroundColor: "#F1F2F3", height: 50 }}>
                    <TableRow>
                      {headCells.map((headCell) => (
                        <TableCell
                          padding={headCell.padding || "unset"}
                          width={headCell.width || ""}
                          className="text-nowrap u-fontWeightBold"
                          key={headCell.id}
                          align={headCell.align}
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
                      {reports?.map((report, index) => {
                        const itemDate = new Date(report.submitted_at);
                        const itemJalaaliFormat = jMoment(
                          `${itemDate.getFullYear()}-${
                            itemDate.getMonth() + 1
                          }-${itemDate.getDate()}`,
                          "YYYY-MM-DD"
                        );
                        const formattedDate =
                          itemJalaaliFormat.jYear() +
                          "-" +
                          (itemJalaaliFormat.jMonth() + 1) +
                          "-" +
                          itemJalaaliFormat.jDate();
                        return (
                          <TableRow key={report.id}>
                            <TableCell align="center">
                              {englishNumberToPersianNumber(index + 1)}
                            </TableCell>
                            {isSuper && (
                              <TableCell align="center">
                                {
                                  branches?.find(
                                    (branch) => branch.id === report.business_id
                                  )?.title
                                }
                              </TableCell>
                            )}
                            <TableCell align="center">
                              {englishNumberToPersianNumber(formattedDate)}
                            </TableCell>
                            <TableCell align="center">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  {priceFormatter(report.total_diff_price)}
                                </div>
                                <div
                                  style={{
                                    color:
                                      process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                                  }}
                                  className="u-cursor-pointer pdf-display-none"
                                  onClick={() => {
                                    router.push(
                                      `${urlPrefix}${
                                        isSuper
                                          ? BRANCHES_PLUGIN
                                          : SHOPPING_PLUGIN_URL
                                      }/analytics/reports/ingredients_storage/${
                                        report.id
                                      }`
                                    );
                                  }}
                                >
                                  See the details
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </div>
          ) : (
            <EmptyStateForReports
              urlPrefix={urlPrefix}
              isSuper={isSuper}
              hasAnyKeepTrackedIngredient={hasAnyKeepTrackedIngredient}
            />
          )}
        </Paper>
      ) : (
        <EmptyStateForIngredients urlPrefix={urlPrefix} isSuper={isSuper} />
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  branchIngredients: makeSelectIngredients(),
  ingredientsRecountingReports: makeSelectIngredientsRecountingReports(),
  branches: makeSelectBranches(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getIngredients: (data) => dispatch(getIngredients(data)),
    _getIngredientsRecountingReports: (data) =>
      dispatch(getIngredientsRecountingReports(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminIngredientsStorageReport);
