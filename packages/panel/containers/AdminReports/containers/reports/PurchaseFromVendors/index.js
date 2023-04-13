import React, { memo, useState, useRef, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import DateRangePickerWrapper from "@saas/components/DateRangePickerWrapper";
import moment from "moment";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { exportPDFFromHTML } from "@saas/utils/helpers/exportPDFFromHTML";

import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

 
 
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
import Input from "@saas/components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  getAdminVendors,
  getIngredients,
  getPurchaseReportsFromVendors,
  getPurchaseReportsFromVendorsPerBranch,
} from "store/actions";
import {
  makeSelectAdminVendors,
  makeSelectIngredients,
  makeSelectPurchaseReportsFromVendors,
  makeSelectPurchaseReportsFromVendorsPerBranch,
} from "store/selectors";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import EmptyStateForTableReports from "../components/EmptyStateForTableReports";
import { NEWEST, OLDEST, VENDORS } from "../constants";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
const pdf = ({ business, branches, is_super }) => {
  const createdAtFormattedDate = moment(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
    "YYYY-MM-DD"
  );
  const jalaaliDate = createdAtFormattedDate.format("YYYY/MM/DD");
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

const sortingOptions = [
  { id: 0, text: "the newest", keyword: NEWEST },
  { id: 1, text: "The oldest", keyword: OLDEST },
  { id: 4, text: "Supplier", keyword: VENDORS },
];

const sortingFunctions = {
  [NEWEST]: (purchases) =>
    purchases?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
  [OLDEST]: (purchases) =>
    purchases?.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1)),
  [VENDORS]: (purchases) =>
    purchases?.sort((a, b) => (a.vendor_name === b.vendor_name ? 1 : -1)),
};

const baseHeadCells = [
  {
    id: "id",
    name: "Row",
    label: "Row",
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
    name: "Date",
    label: "Date",
    align: "center",
  },
];

let timeoutId = null;

export function AdminPurchaseFromVendorsReport({
  isLoading,
  isSuper,
  _getPurchaseReportsFromVendors,
  purchaseReportsFromVendors,
  _getPurchaseReportsFromVendorsPerBranch,
  purchaseReportsFromVendorsPerBranch,
  branches,
  branchIngredients,
  _getIngredients,
  business,
  _getAdminVendors,
  vendors,
}) {
  const router = useRouter();
  const theme = useTheme();
  const [exportAnchor, toggleExportAnchor] = useState(null);
  const { minWidth768 } = useResponsive();
  const [fromDate, setFromDate] = useState(moment().add(-29, "day"));
  const [toDate, setToDate] = useState(moment());
  const [focused, setFocused] = useState(null);
  const [compareToPrevious, setCompareToPrevious] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );
  const ingredientSearchInputRef = useRef(null);
  const ingredientSearchTimeout = useRef(null);
  const [ingredientSearch, setIngredientSearch] = useState(
    router.query.ingredientSearch || ""
  );
  const handleCompare = (event) => {
    setCompareToPrevious(event.target.checked);
  };

  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getPurchaseReportsFromVendors({
            object_id: selectedIngredients,
            business_id: selectedBranches,
            from_date: persianToEnglishNumber(fromDate.format("YYYY-MM-DD")),
            to_date: persianToEnglishNumber(toDate.format("YYYY-MM-DD")),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getPurchaseReportsFromVendorsPerBranch({
          object_id: selectedIngredients,
          from_date: persianToEnglishNumber(fromDate.format("YYYY-MM-DD")),
          to_date: persianToEnglishNumber(toDate.format("YYYY-MM-DD")),
        });
      }, 500);
    }
  };

  useEffect(() => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getPurchaseReportsFromVendors({
            object_id: selectedIngredients,
            business_id: selectedBranches,
            from_date: persianToEnglishNumber(fromDate.format("YYYY-MM-DD")),
            to_date: persianToEnglishNumber(toDate.format("YYYY-MM-DD")),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getPurchaseReportsFromVendorsPerBranch({
          object_id: selectedIngredients,
          from_date: persianToEnglishNumber(fromDate.format("YYYY-MM-DD")),
          to_date: persianToEnglishNumber(toDate.format("YYYY-MM-DD")),
        });
      }, 500);
    }
  }, [selectedIngredients, isSuper, selectedBranches]);
  useEffect(() => {
    setTimeout(() => {
      _getIngredients();
    }, 0);
  }, [isSuper]);
  const ingredients = useMemo(() => {
    return branchIngredients;
  }, [isSuper, branchIngredients]);
  useEffect(() => {
    setSelectedIngredients(ingredients?.map((ingredient) => ingredient.id));
  }, [ingredients]);
  const purchaseReports = useMemo(() => {
    return purchaseReportsFromVendorsPerBranch;
  }, [
    isSuper,
    purchaseReportsFromVendors,
    purchaseReportsFromVendorsPerBranch,
  ]);
  const headCells = useMemo(() => {
    if (purchaseReports) {
      if (isSuper) {
        let mainBranchHeadCells = [...baseHeadCells];
        mainBranchHeadCells?.push(
          ...purchaseReports?.items?.map((item) => ({
            id: item._id,
            name: item.title,
            label: item.title,
          }))
        );
        mainBranchHeadCells.splice(1, 0, {
          id: "id",
          name: "Branch Name",
          label: "Branch Name",
          align: "center",
        });
        return mainBranchHeadCells;
      } else {
        let branchanchHeadCells = [...baseHeadCells];
        branchanchHeadCells?.push(
          ...purchaseReports?.items?.map((item) => ({
            id: item._id,
            name: item.title,
            label: item.title,
          }))
        );
        return branchanchHeadCells;
      }
    }
  }, [isSuper, purchaseReports]);
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
  useEffect(() => {
    setTimeout(() => {
      _getAdminVendors();
    }, 0);
  }, []);
  useEffect(() => {
    if (vendors?.length) {
      setSelectedVendors(vendors?.map((vendor) => vendor.id));
    }
  }, [vendors]);
  const headRow = useMemo(
    () => headCells?.map((headCell) => headCell.name),
    [headCells]
  );

  const rows = useMemo(() => {
    const _rows = sortingFunctions[selectedSortingType](
      purchaseReports?.business_items
    )?.map((report, index) => {
      const createdAt = new Date(report.created_at);
      const createdAtFormattedDate = moment(
        `${createdAt.getFullYear()}-${
          createdAt.getMonth() + 1
        }-${createdAt.getDate()}`,
        "YYYY-MM-DD"
      );
      const jalaaliDate =
        createdAtFormattedDate.year() +
        "-" +
        (createdAtFormattedDate.month() + 1) +
        "-" +
        createdAtFormattedDate.date();
      const num = index + 1;
      const branch = branches?.find(
        (branch) => branch.id === report.business_id
      )?.title;
      const vendor = jalaaliDate;
      const counts =
        purchaseReports?.items?.map(
          (item) =>
            report?.items_count?.find((_item) =>
              isSuper
                ? _item?.super_object_id === item?._id
                : _item?.object_id === item?._id
            )?.count
        ) || [];
      if (isSuper) {
        return [num, branch, vendor, jalaaliDate, ...counts];
      }
      return [num, vendor, jalaaliDate, ...counts];
    });
    if (_rows?.length) {
      return _rows;
    }
    return [];
  }, [isSuper, branches, purchaseReports, selectedSortingType]);

  const summaryRow = useMemo(() => {
    const counts =
      purchaseReports?.items?.map((item) => item.total_count) || [];
    if (isSuper) {
      return ["total", "", "", "", ...counts];
    }
    return ["total", "", "", ...counts];
  }, [purchaseReports, isSuper]);

  return (
    <div className="container">
      <Head>
        <title>
          {isSuper
            ? "Report branch purchase documents from suppliers"
            : "Report purchase documents from suppliers"}
        </title>
      </Head>

      <AdminBreadCrumb
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
              <MenuItem
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
                    `Reporting purchase documents based on the raw material of${formatDateObjectToNormal(
                      selectedDayRange.from
                    )} until the${formatDateObjectToNormal(selectedDayRange.to)}.pdf`
                  );
                }}
              >
                PDF
              </MenuItem>
              <MenuItem
                onClick={() =>
                  generateCSVFile(
                    headRow,
                    rows || [],
                    summaryRow || [],
                    isSuper
                      ? "Report branch purchase documents from suppliers"
                      : "Report purchase documents from suppliers"
                  )
                }
              >
                CSV
              </MenuItem>
            </Menu>
          </div>
        }
      />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex align-items-center  ml-3 mb-3">
              <DateRangePickerWrapper
                keepOpenOnDateSelect
                initialStartDate={fromDate}
                initialEndDate={toDate}
                stateDateWrapper={moment}
                maxDate={moment()}
                startDatePlaceholderText="start date"
                endDatePlaceholderText="The end date"
                onFocusChange={(focusedInput) => setFocused({ focusedInput })}
                onDatesChange={({ startDate, endDate }) => {
                  if (startDate) setFromDate(startDate);
                  // else delete query.from_date;
                  if (endDate) setToDate(endDate);
                  // else delete query.to_date;
                }}
                focused={focused}
                numberOfMonths={!minWidth768 ? 1 : 2}
                renderMonthText={(month) => moment(month).format("MMMM YYYY")}
                renderDayContents={(day) => moment(day).format("jD")}
                hasSubmitButton
                onSubmit={submitDate}
                isCompared={compareToPrevious}
                onCompare={handleCompare}
              />
            </div>
            <Select
              className=" ml-3 mb-3"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedIngredients || []}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              // IconComponent={() => null}
              renderValue={() => {
                if (selectedIngredients?.length === 0)
                  return "Choose the goods";
                if (
                  selectedIngredients?.length === 1 &&
                  selectedIngredients?.[0]
                )
                  return ingredients?.find(
                    (ingredient) => ingredient.id === selectedIngredients?.[0]
                  ).title;
                if (selectedIngredients?.length === ingredients?.length)
                  return "All goods";
                return `${englishNumberToPersianNumber(
                  selectedIngredients?.length
                )} commodity`;
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
                <Input
                  size="small"
                  inputRef={ingredientSearchInputRef}
                  value={ingredientSearch}
                  fullWidth={false}
                  onChange={(ingredientSearch) => {
                    setIngredientSearch(ingredientSearch);
                    clearTimeout(ingredientSearchTimeout.current);
                    const query = { ...router.query };
                    delete query.ingredientSearch;
                    delete query.page;
                    if (ingredientSearch) {
                      query.ingredientSearch = ingredientSearch;
                    }
                    ingredientSearchTimeout.current = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }}
                  placeholder="Search of raw material"
                  inputProps={{
                    className: "pr-5 mr-2",
                  }}
                  InputProps={{
                    startAdornment: (
                      <>
                        {router.query.ingredientSearch ? (
                          <InputAdornment
                            style={{ position: "absolute", left: 3 }}
                            className="u-cursor-pointer"
                            position="start"
                            onClick={() => {
                              setIngredientSearch("");
                              const query = { ...router.query };
                              delete query.ingredientSearch;
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
              </MenuItem>
              <MenuItem className="px-2">
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedIngredients?.length !== ingredients?.length &&
                    selectedIngredients?.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedIngredients?.length) setSelectedIngredients([]);
                    else
                      setSelectedIngredients(
                        ingredients?.map((ingredient) => ingredient.id)
                      );
                  }}
                  color="primary"
                  checked={selectedIngredients?.length === ingredients?.length}
                />
                <ListItemText
                  primary="Select all goods"
                  className="text-right"
                />
              </MenuItem>
              {ingredients
                ?.filter((item) => item.title.includes(ingredientSearch))
                ?.map((ingredient) => {
                  return (
                    <MenuItem
                      className="px-2"
                      key={ingredient.id}
                      value={ingredient.id}
                    >
                      <Checkbox
                        className="p-1"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!selectedIngredients?.includes(ingredient.id)) {
                            setSelectedIngredients([
                              ...selectedIngredients,
                              ingredient.id,
                            ]);
                          } else {
                            setSelectedIngredients(
                              selectedIngredients?.filter(
                                (pr) => pr !== ingredient.id
                              )
                            );
                          }
                        }}
                        color="primary"
                        checked={selectedIngredients?.includes(ingredient.id)}
                      />
                      <ListItemText
                        primary={ingredient.title}
                        className="text-right"
                      />
                    </MenuItem>
                  );
                })}
            </Select>
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
              // IconComponent={() => null}
              renderValue={() => {
                if (selectedVendors?.length === 0)
                  return "Select the supplier";
                if (selectedVendors?.length === 1 && selectedVendors[0])
                  return vendors?.find(
                    (vendor) => vendor.id === selectedVendors[0]
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
                    key={`${vendor.id}-${selectedVendors?.includes(vendor.id)}`}
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
        <div className="d-flex align-items-center flex-wrap px-4">
          {selectedIngredients?.length === ingredients?.length ? (
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
              onDelete={() => setSelectedIngredients([])}
              label="All materials"
            />
          ) : selectedIngredients?.length ? (
            ingredients
              ?.filter((item) => selectedIngredients.includes(item.id))
              .map((ingredient) => {
                return (
                  <Chip
                    key={ingredient.id}
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
                      setSelectedIngredients(
                        selectedIngredients.filter(
                          (item) => item !== ingredient.id
                        )
                      )
                    }
                    label={ingredient.title}
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
                setSelectedIngredients(
                  ingredients?.map((ingredient) => ingredient.id)
                )
              }
              label="None of the raw materials"
            />
          )}
        </div>
        {purchaseReports?.business_items?.length || true ? (
          <div id="report">
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
                  }}
                >
                  <TableRow>
                    {headCells?.map((headCell) => (
                      <TableCell
                        padding={headCell?.padding || "unset"}
                        width={headCell?.width || ""}
                        className="text-nowrap u-fontWeightBold"
                        key={headCell?.id}
                        align={headCell?.align}
                      >
                        {headCell?.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {isLoading ? (
                  <TableBody>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                      <TableRow style={{ height: 53 }} key={item}>
                        {headCells?.map((cell) => (
                          <TableCell key={cell?.id}>
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
                      purchaseReports?.business_items
                    )?.map((report, index) => {
                      const createdAt = new Date(report.created_at);
                      const createdAtFormattedDate = moment(
                        `${createdAt.getFullYear()}-${
                          createdAt.getMonth() + 1
                        }-${createdAt.getDate()}`,
                        "YYYY-MM-DD"
                      );
                      const jalaaliDate =
                        createdAtFormattedDate.year() +
                        "-" +
                        (createdAtFormattedDate.month() + 1) +
                        "-" +
                        createdAtFormattedDate.date();
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
                            {report.vendor_name}
                          </TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(jalaaliDate)}
                          </TableCell>
                          {purchaseReports?.items?.map((item) => (
                            <TableCell key={item.id} align="center">
                              {englishNumberToPersianNumber(
                                report?.items_count?.find((_item) =>
                                  isSuper
                                    ? _item?.super_object_id === item?._id
                                    : _item?.object_id === item?._id
                                )?.count
                              )}
                            </TableCell>
                          ))}
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
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                      {purchaseReports?.items?.map((item) => (
                        <TableCell
                          key={item.id}
                          align="center"
                          style={{ border: "none" }}
                        >
                          <div
                            style={{
                              backgroundColor: surface.neutral.default,
                              borderRadius: 4,
                            }}
                            className="px-4 py-3 u-fontWeightBold"
                          >
                            {englishNumberToPersianNumber(item.total_count)}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </div>
        ) : (
          <EmptyStateForTableReports />
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  purchaseReportsFromVendors: makeSelectPurchaseReportsFromVendors(),
  purchaseReportsFromVendorsPerBranch:
    makeSelectPurchaseReportsFromVendorsPerBranch(),
  branches: makeSelectBranches(),
  branchIngredients: makeSelectIngredients(),
  business: makeSelectBusiness(),
  vendors: makeSelectAdminVendors(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getPurchaseReportsFromVendors: (data) =>
      dispatch(getPurchaseReportsFromVendors(data)),
    _getPurchaseReportsFromVendorsPerBranch: (data) =>
      dispatch(getPurchaseReportsFromVendorsPerBranch(data)),
    _getIngredients: () => dispatch(getIngredients()),
    _getAdminVendors: () => dispatch(getAdminVendors()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminPurchaseFromVendorsReport);
