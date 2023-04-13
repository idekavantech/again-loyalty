/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo, useState, useRef, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { exportPDFFromHTML } from "@saas/utils/helpers/exportPDFFromHTML";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

 
 
import { pollution, surface } from "@saas/utils/colors";
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
import Button from "@material-ui/core/Button";
import ConfirmationModal from "./ConfirmationModal";
import {
  getIngredientsRecountingReport,
  updateSystemByNewInventoryCounts,
} from "store/actions";
import { makeSelectIngredientsRecountingReport } from "store/selectors";
import { unitsDictionary } from "store/constants";
import {
  HIGHEST_PRICE,
  LOWEST_PRICE,
} from "containers/AdminReports/containers/reports/constants";
import {
  makeSelectBranches,
  makeSelectBusiness,
  makeSelectBusinessTitle,
} from "@saas/stores/business/selector";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

const sortingOptions = [
  { id: 2, text: "The highest amount", keyword: HIGHEST_PRICE },
  { id: 3, text: "The least amount", keyword: LOWEST_PRICE },
];

const pdf = ({ business }) => {
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
            <div></div>
            <div
              style={{
                width: 300,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                flex: 1,
              }}
            >
              «Report of warehousing raw materials based on goods»
            </div>
            <div></div>
          </div>
        </div>
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
    .ml-1{
      margin-left: 4px
    }
    .d-flex {
      display:flex
    }
    .align-items-center{
      align-items: center
    }
    .justify-content-between{
      justify-content: space-between
    }
    .px-4{
      padding-left: 16px;
      padding-right: 16px;
    }
    .py-5{
      padding-top: 24px;
      padding-bottom: 24px;

    }
    .py-3 {
      padding-top: 12px;
      padding-bottom: 12px;
    }
    .u-fontWeightBold{
      font-weight: bold
    }
  `,
  };
};
const sortingFunctions = {
  [HIGHEST_PRICE]: (reports) =>
    reports?.sort((a, b) =>
      Math.abs(a.diff_price) < Math.abs(b.diff_price) ? 1 : -1
    ),
  [LOWEST_PRICE]: (reports) =>
    reports?.sort((a, b) =>
      Math.abs(a.diff_price) > Math.abs(b.diff_price) ? 1 : -1
    ),
};

const headCells = [
  {
    id: "id",
    label: "Row",
    align: "center",
  },
  {
    id: "id",
    label: "ID of the product",
    align: "center",
  },
  {
    id: "id",
    label: "commodity",
    align: "center",
  },
  {
    id: "id",
    label: "One",
    align: "center",
  },
  {
    id: "id",
    label: "Count",
    align: "center",
  },
  {
    id: "id",
    label: "Available in the system",
    align: "center",
  },
  {
    id: "id",
    label: "Result",
    align: "center",
  },
  {
    id: "id",
    label: "The amount of difference(Toman)",
    align: "center",
  },
];

export function AdminIngredientsStorageUpdatingReport({
  isLoading,
  isSuper,
  _getIngredientsRecountingReport,
  ingredientsRecountingReport,
  businessTitle,
  _updateSystemByNewInventoryCounts,
  business,
  branches,
}) {
  const router = useRouter();
  const reportId = router.query.id === "new" ? null : router.query.id;

  const theme = useTheme();
  const [exportAnchor, toggleExportAnchor] = useState(null);

  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );
  const [confirmationModalIsOpen, toggleConfirmationModal] = useState(false);
  const documentNumberSearchInputRef = useRef(null);
  const documentNumberSearchTimeout = useRef(null);
  const [documentNumberSearch, setDocumentNumberSearch] = useState(
    router.query.documentNumberSearch || ""
  );

  useEffect(() => {
    setTimeout(() => {
      _getIngredientsRecountingReport({
        id: reportId,
      });
    }, 0);
  }, []);
  const recountingResult = (amount_diff) => {
    switch (Math.sign(amount_diff)) {
      case 1:
        return (
          <div
            className="d-flex align-items-center u-font-semi-small"
            style={{ color: theme.palette.success.main }}
          >
            <ArrowUpwardIcon
              style={{ fontSize: 14 }}
              className="ml-1 pdf-display-none"
            />
            <span className="ml-1">
              {englishNumberToPersianNumber(Math.abs(amount_diff))}
            </span>
            <span>More than the system</span>
          </div>
        );
      case -1:
        return (
          <div
            className="d-flex align-items-center u-font-semi-small"
            style={{ color: theme.palette.error.main }}
          >
            <ArrowDownwardIcon
              style={{ fontSize: 14 }}
              className="ml-1 pdf-display-none"
            />
            <span className="ml-1">
              {englishNumberToPersianNumber(Math.abs(amount_diff))}
            </span>
            <span>Less than the system</span>
          </div>
        );
      default:
        return (
          <div className="d-flex align-items-center u-font-semi-small">
            <FiberManualRecordIcon
              style={{ fontSize: 14 }}
              className="ml-1 pdf-display-none"
            />
            <div>In accordance with the warehouse</div>
          </div>
        );
    }
  };
  const createdAt = new Date(ingredientsRecountingReport?.submitted_at);
  const createdAtFormattedDate = moment(
    `${createdAt?.getFullYear()}-${
      createdAt?.getMonth() + 1
    }-${createdAt?.getDate()}`,
    "YYYY-MM-DD"
  );
  const jalaaliTime = createdAt.getHours() + ":" + createdAt.getMinutes();
  const jalaaliDate =
    createdAtFormattedDate?.year() +
    "-" +
    (createdAtFormattedDate?.month() + 1) +
    "-" +
    createdAtFormattedDate?.date();
  const PDFConfigs = useMemo(() => {
    return typeof pdf === "function"
      ? pdf({
          business,
          branches: [businessTitle],
          from_date: null,
          to_date: null,
        })
      : {};
  }, [businessTitle, business, pdf]);
  const branch =
    isSuper && ingredientsRecountingReport
      ? branches.find(
          (branch) => branch.id === ingredientsRecountingReport?.business_id
        )
      : null;

  const rows = useMemo(
    () =>
      sortingFunctions[selectedSortingType](ingredientsRecountingReport?.items)
        ?.filter((item) => item.sku.toString().includes(documentNumberSearch))
        ?.map((report, _index) => {
          const index = _index + 1;
          const sku = report.sku;
          const title = report.title;
          const unit = unitsDictionary[report.unit];
          const shelfMan = report.shelf_amount;
          const inventory = report.inventory_amount;
          const amountdiff =
            Math.sign(report.amount_diff) === 1
              ? "+" + report.amount_diff
              : "-" + report.amount_diff;
          const diffPrice = report.diff_price;
          return [
            index,
            sku,
            title,
            unit,
            shelfMan,
            inventory,
            amountdiff,
            diffPrice,
          ];
        }),
    [ingredientsRecountingReport, selectedSortingType, documentNumberSearch]
  );
  const headRow = useMemo(
    () => headCells.map((headCell) => headCell.label),
    [headCells]
  );
  if (isLoading && !ingredientsRecountingReport) {
    return <LoadingIndicator />;
  }
  return (
    <div className="container">
      <Head>
        <title>Report of warehousing raw materials based on goods</title>
      </Head>

      <AdminBreadCrumb
        buttons={
          <div className="d-inline-block mr-auto">
            {!isSuper && (
              <Button
                size="medium"
                color="primary"
                variant="outlined"
                onClick={() => toggleConfirmationModal(true)}
              >
                System update with new inventory
              </Button>
            )}
            <Button
              className="mr-2"
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
                    `Report of warehousing raw materials based on goods-Date- ${jalaaliDate} - the watch- ${jalaaliTime}`
                  );
                }}
              >
                PDF
              </MenuItem>
              <MenuItem
                onClick={() =>
                  generateCSVFile(
                    headRow,
                    rows,
                    [],
                    `Report of warehousing raw materials based on goods-Date- ${jalaaliDate} - the watch- ${jalaaliTime}`
                  )
                }
              >
                CSV
              </MenuItem>
            </Menu>
          </div>
        }
      />

      <ConfirmationModal
        isOpen={confirmationModalIsOpen}
        onClose={() => toggleConfirmationModal(false)}
        submit={() => _updateSystemByNewInventoryCounts({ id: reportId })}
      />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex flex-wrap flex-column p-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
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
                    setDocumentNumberSearch(documentNumberSearch);
                    clearTimeout(documentNumberSearchTimeout.current);
                    const query = { ...router.query };
                    delete query.documentNumberSearch;
                    delete query.page;
                    if (documentNumberSearch) {
                      query.documentNumberSearch = documentNumberSearch;
                    }
                    documentNumberSearchTimeout.current = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }}
                  placeholder="Search of the product ID"
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
              <div
                className="d-flex align-items-center  ml-3 mb-3 p-2"
                style={{
                  opacity: 0.7,
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: 4,
                }}
              >
                <div className="ml-1">Date</div>
                <div className="ml-1">
                  {englishNumberToPersianNumber(jalaaliDate)}
                </div>
                -<div className="mx-1">the watch</div>
                <div>{englishNumberToPersianNumber(jalaaliTime)}</div>
              </div>
              {isSuper && (
                <div
                  className="p-2 mb-3"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: 4,
                    opacity: 0.7,
                  }}
                >
                  Branch: {branch?.title}
                </div>
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
          <div
            style={{
              border: "0.5px solid #E4E6E7",
              borderRadius: 4,
              color: pollution,
            }}
            className="px-3 py-2"
          >
            {ingredientsRecountingReport?.description}
          </div>
        </div>
        <div id="report">
          {PDFConfigs.headerTemplate}
          <TableContainer className="mt-3 purchase-by-order-table">
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
                  {sortingFunctions[selectedSortingType](
                    ingredientsRecountingReport?.items
                  )
                    ?.filter((item) =>
                      item.sku.toString().includes(documentNumberSearch)
                    )
                    ?.map((report, index) => {
                      return (
                        <TableRow key={report.sku}>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(index + 1)}
                          </TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(report.sku)}
                          </TableCell>
                          <TableCell align="center">{report.title}</TableCell>
                          <TableCell align="center">
                            {unitsDictionary[report.unit]}
                          </TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(report.shelf_amount)}
                          </TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(
                              report.inventory_amount
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {recountingResult(report.amount_diff)}
                          </TableCell>
                          <TableCell align="center">
                            {priceFormatter(report.diff_price)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <div
            style={{ backgroundColor: "#F1F2F3" }}
            className="d-flex align-items-center justify-content-between px-4 py-5"
          >
            <div>Collect additions:</div>
            <div
              style={{
                backgroundColor: surface.neutral.default,
                borderRadius: 4,
              }}
              className="px-4 py-3 u-fontWeightBold"
            >
              {priceFormatter(
                ingredientsRecountingReport?.total_positive_price
              )}
            </div>
          </div>
          <div
            style={{ backgroundColor: "#F1F2F3" }}
            className="d-flex align-items-center justify-content-between px-4 py-5"
          >
            <div>The sum of the deductions:</div>
            <div
              style={{
                backgroundColor: surface.neutral.default,
                borderRadius: 4,
              }}
              className="px-4 py-3 u-fontWeightBold"
            >
              {priceFormatter(
                ingredientsRecountingReport?.total_negative_price
              )}
            </div>
          </div>
          <div
            style={{ backgroundColor: "#F1F2F3" }}
            className="d-flex align-items-center justify-content-between px-4 py-5"
          >
            <div>total:</div>
            <div
              style={{
                backgroundColor: surface.neutral.default,
                borderRadius: 4,
              }}
              className="px-4 py-3 u-fontWeightBold"
            >
              {priceFormatter(ingredientsRecountingReport?.total_diff_price)}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  ingredientsRecountingReport: makeSelectIngredientsRecountingReport(),
  businessTitle: makeSelectBusinessTitle(),
  business: makeSelectBusiness(),
  branches: makeSelectBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getIngredientsRecountingReport: (data) =>
      dispatch(getIngredientsRecountingReport(data)),
    _updateSystemByNewInventoryCounts: (data) =>
      dispatch(updateSystemByNewInventoryCounts(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(AdminIngredientsStorageUpdatingReport);
