/**
 *
 * PURCHASE BY INGREDIETNS REPORTS
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
import { exportPDFFromHTML } from "@saas/utils/helpers/exportPDFFromHTML";

import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import jMoment from "moment-jalaali";
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
  getPurchaseReportsByIngredients,
  getPurchaseReportsByIngredientsPerBranch,
} from "store/actions";
import {
  makeSelectAdminVendors,
  makeSelectIngredients,
  makeSelectPurchaseReportsByProducts,
  makeSelectPurchaseReportsByProductsPerBranch,
} from "store/selectors";
import { unitsDictionary } from "store/constants";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import EmptyStateForTableReports from "../components/EmptyStateForTableReports";
import {
  HIGHEST_ITEM_AMOUNT,
  HIGHEST_PURCHASE_COST,
  NEWEST,
  OLDEST,
  VENDORS,
} from "../constants";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
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
            <div style={{ flex: 1 }}>تاریخ دریافت: {jalaaliDate}</div>
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
              ش. گزارش:{" "}
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
              «گزارش انبارگردانی مواد اولیه»
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
                  شعبه‌ها:
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
      صفحه <span class="pageNumber"></span> / <span class="totalPages"></span>
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
  { id: 0, text: "جدیدترین", keyword: NEWEST },
  { id: 1, text: "قدیمی‌ترین", keyword: OLDEST },
  { id: 2, text: "بیشترین مبلغ خرید", keyword: HIGHEST_PURCHASE_COST },
  { id: 3, text: "بیشترین مقدار آیتم", keyword: HIGHEST_ITEM_AMOUNT },
  { id: 4, text: "تامین‌کننده", keyword: VENDORS },
];

const sortingFunctions = {
  [NEWEST]: (purchases) =>
    purchases?.items?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
  [OLDEST]: (purchases) =>
    purchases?.items?.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1)),
  [HIGHEST_PURCHASE_COST]: (purchases) =>
    purchases?.items?.sort((a, b) => (a.final_price < b.final_price ? 1 : -1)),
  [HIGHEST_ITEM_AMOUNT]: (purchases) =>
    purchases?.items?.sort((a, b) => (a.amount < b.amount ? 1 : -1)),
  [VENDORS]: (purchases) =>
    purchases?.items?.sort((a, b) => (a.vendor_id === b.vendor_id ? 1 : -1)),
};

const branchHeadCells = [
  {
    id: "id",
    name: "ردیف",
    label: "ردیف",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "کدکالا",
    label: "کدکالا",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "ماده اولیه",
    label: "ماده اولیه",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "واحد",
    label: "واحد",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "تامین‌کننده",
    label: "تامین‌کننده",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "ش.سند",
    label: "ش.سند",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "تاریخ",
    label: "تاریخ",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "مقدار",
    label: "مقدار",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "قیمت واحد",
    label: (
      <div className="d-flex flex-column">
        <div>قیمت واحد</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "مبلغ کل",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ کل</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
    minWidth: 100,
  },
];

let timeoutId = null;

export function AdminPurchaseByIngredientsReport({
  isLoading,
  isSuper,
  _getPurchaseReportsByIngredients,
  purchaseReportsByProducts,
  branches,
  _getIngredients,
  branchIngredients,
  _getPurchaseReportsByIngredientsPerBranch,
  purchaseReportsByProductsPerBranch,
  business,
  _getAdminVendors,
  vendors,
}) {
  const router = useRouter();
  const theme = useTheme();
  const [exportAnchor, toggleExportAnchor] = useState(null);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [openModal, setOpenModal] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );
  const documentNumberSearchInputRef = useRef(null);
  const documentNumberSearchTimeout = useRef(null);
  const [documentNumberSearch, setDocumentNumberSearch] = useState(
    router?.query?.documentNumberSearch || ""
  );
  const ingredientSearchInputRef = useRef(null);
  const ingredientSearchTimeout = useRef(null);
  const [ingredientSearch, setIngredientSearch] = useState(
    router.query.ingredientSearch || ""
  );
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = openModal ? "simple-popover" : undefined;

  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getPurchaseReportsByIngredients({
            variation_id: selectedIngredients,
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
        _getPurchaseReportsByIngredientsPerBranch({
          variation_id: selectedIngredients,
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
    handleClose();
  };
  useEffect(() => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getPurchaseReportsByIngredients({
            variation_id: selectedIngredients,
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
        _getPurchaseReportsByIngredientsPerBranch({
          variation_id: selectedIngredients,
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
  }, [selectedIngredients, isSuper, selectedBranches]);
  useEffect(() => {
    setTimeout(() => {
      _getIngredients();
    }, 0);
  }, [isSuper]);
  const ingredients = branchIngredients;
  useEffect(() => {
    setSelectedIngredients(ingredients?.map((ingredient) => ingredient.id));
  }, [ingredients]);

  const headCells = useMemo(() => {
    if (isSuper) {
      const mainBranchHeadCells = [...branchHeadCells];
      mainBranchHeadCells.splice(4, 0, {
        id: "id",
        name: "شعبه",
        label: "شعبه",
        align: "center",
      });
      return mainBranchHeadCells;
    } else {
      return branchHeadCells;
    }
  }, [isSuper]);
  const purchaseReports = useMemo(() => {
    if (isSuper) {
      return {
        ...purchaseReportsByProducts,
        items: sortingFunctions[selectedSortingType](purchaseReportsByProducts),
      };
    }
    return {
      ...purchaseReportsByProductsPerBranch,
      items: sortingFunctions[selectedSortingType](
        purchaseReportsByProductsPerBranch
      ),
    };
  }, [
    isSuper,
    purchaseReportsByProducts,
    purchaseReportsByProductsPerBranch,
    selectedSortingType,
  ]);
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
    () => headCells.map((headCell) => headCell.name),
    [headCells]
  );
  const rows = useMemo(
    () =>
      purchaseReports?.items
        ?.filter((r) => r.order_id.includes(documentNumberSearch))
        .map((report, index) => {
          const createdAt = new Date(report.created_at);
          const createdAtFormattedDate = jMoment(
            `${createdAt.getFullYear()}-${
              createdAt.getMonth() + 1
            }-${createdAt.getDate()}`,
            "YYYY-MM-DD"
          );
          const jalaaliDate =
            createdAtFormattedDate.jYear() +
            "-" +
            (createdAtFormattedDate.jMonth() + 1) +
            "-" +
            createdAtFormattedDate.jDate();

          const num = index + 1;
          const sku = report.sku;
          const ingredient = report.title;
          const unit = report.unit;
          const branch = branches?.find(
            (branch) => branch.id === report.business_id
          )?.title;
          const vendor = report?.vendor_name;
          const orderId = report.order_id;
          const amount = report.amount;
          const unitCost = report.price;
          const totalCost = report.final_price;

          if (isSuper) {
            return [
              num,
              sku,
              ingredient,
              unit,
              branch,
              vendor,
              orderId,
              jalaaliDate,
              amount,
              unitCost,
              totalCost,
            ];
          }
          return [
            num,
            sku,
            ingredient,
            unit,
            vendor,
            orderId,
            jalaaliDate,
            amount,
            unitCost,
            totalCost,
          ];
        }),
    [purchaseReports, documentNumberSearch, branches, isSuper]
  );

  const summaryRow = useMemo(
    () => [
      "جمع کل",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ,
      purchaseReports?.total_price,
    ],
    [purchaseReports]
  );
  return (
    <div className="container">
      <Head>
        <title>گزارش اسناد خرید براساس ماده اولیه</title>
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
              خروجی
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
                    `گزارش اسناد خرید براساس ماده اولیه از ${formatDateObjectToNormal(
                      selectedDayRange.from
                    )} تا  ${formatDateObjectToNormal(selectedDayRange.to)}.pdf`
                  );
                }}
              >
                PDF
              </MenuItem> */}
              <MenuItem
                onClick={() =>
                  generateCSVFile(
                    headRow,
                    rows || [],
                    summaryRow || [],
                    `گزارش اسناد خرید براساس ماده اولیه از ${formatDateObjectToNormal(
                      selectedDayRange.from
                    )} تا  ${formatDateObjectToNormal(selectedDayRange.to)}`
                  )
                }
              >
                CSV
              </MenuItem>
            </Menu>
          </div>
        }
      />

      <Paper
        elevation={2}
        className="d-flex flex-column mt-4"
        style={{ marginBottom: 50 }}
      >
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
                  setDocumentNumberSearch(documentNumberSearch);
                  clearTimeout(documentNumberSearchTimeout.current);
                  const query = { ...router.query };
                  delete query.documentNumberSearch;
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
                placeholder="جستجوی ش.‌سند"
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
            <div className="d-flex align-items-center  ml-3 mb-3">
              <Button
                style={{
                  direction: "rtl",
                }}
                aria-describedby={id}
                onClick={handleOpen}
                variant="outlined"
              >
                از{" "}
                <span className="px-2">
                  {englishNumberToPersianNumber(
                    formatDateObjectToNormal(selectedDayRange.from)
                  )}
                </span>
                تا{" "}
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
                  return "ماده اولیه انتخاب کنید";
                if (
                  selectedIngredients?.length === 1 &&
                  selectedIngredients?.[0]
                )
                  return ingredients?.find(
                    (ingredient) => ingredient.id === selectedIngredients?.[0]
                  ).title;
                if (selectedIngredients?.length === ingredients?.length)
                  return "همه مواد اولیه";
                return `${englishNumberToPersianNumber(
                  selectedIngredients?.length
                )} ماده اولیه `;
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
              <div className="p-2">
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
                  placeholder="جستجوی ماده اولیه"
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
              </div>
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
                  primary="انتخاب همه مواد اولیه"
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
                  if (selectedBranches.length === 0) return "شعبه انتخاب کنید";
                  if (selectedBranches.length === 1 && selectedBranches[0])
                    return branches.find(
                      (branch) => branch.id === selectedBranches[0]
                    ).title;
                  if (selectedBranches.length === branches.length)
                    return "همه شعب";
                  return `${englishNumberToPersianNumber(
                    selectedBranches.length
                  )} شعبه `;
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
                    primary="انتخاب همه شعب"
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
                if (selectedVendors?.length === vendors?.length)
                  return "همه تامین‌کننده‌ها";
                if (selectedVendors?.length === 0)
                  return "تامین‌کننده انتخاب کنید";
                if (selectedVendors?.length === 1 && selectedVendors[0])
                  return vendors?.find(
                    (vendor) => vendor.id === selectedVendors[0]
                  ).name;

                return `${englishNumberToPersianNumber(
                  selectedVendors?.length
                )} تامین‌کننده `;
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
                  primary="انتخاب همه تامین‌کننده‌ها"
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
                مرتب‌سازی بر اساس
              </div>
            }
            selectOption={(text) =>
              selectSortingType(
                sortingOptions.find((i) => i.text === text).keyword
              )
            }
            inputData={{
              defaultValue: "مرتب‌سازی",
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
              label="همه شعب"
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
              label="هیچ‌کدام از شعب"
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
              label="همه مواداولیه"
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
              label="هیچ‌کدام از مواداولیه"
            />
          )}
        </div>
        {(isSuper &&
          selectedBranches.length &&
          purchaseReports?.items?.length) ||
        (!isSuper && purchaseReports?.items?.length) ? (
          <div id="report">
            {PDFConfigs.headerTemplate}
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
                    {purchaseReports?.items
                      ?.filter((r) => r.order_id.includes(documentNumberSearch))
                      .map((report, index) => {
                        const createdAt = new Date(report.created_at);
                        const createdAtFormattedDate = jMoment(
                          `${createdAt.getFullYear()}-${
                            createdAt.getMonth() + 1
                          }-${createdAt.getDate()}`,
                          "YYYY-MM-DD"
                        );
                        const jalaaliDate =
                          createdAtFormattedDate.jYear() +
                          "-" +
                          (createdAtFormattedDate.jMonth() + 1) +
                          "-" +
                          createdAtFormattedDate.jDate();
                        return (
                          <TableRow key={report.id}>
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
                              {report?.vendor_name}
                            </TableCell>
                            <TableCell align="center">
                              {englishNumberToPersianNumber(report.order_id)}
                            </TableCell>
                            <TableCell align="center">
                              {englishNumberToPersianNumber(jalaaliDate)}
                            </TableCell>
                            <TableCell align="center">
                              {englishNumberToPersianNumber(report.amount)}
                            </TableCell>
                            <TableCell align="center">
                              {priceFormatter(report.price)}
                            </TableCell>
                            <TableCell align="center">
                              {priceFormatter(report.final_price)}
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
                        جمع کل
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
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
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                      <TableCell align="center" style={{ border: "none" }}>
                        <div
                          style={{
                            backgroundColor: surface.neutral.default,
                            borderRadius: 4,
                          }}
                          className="px-4 py-3 u-fontWeightBold"
                        >
                          {priceFormatter(purchaseReports?.total_price)}
                        </div>
                      </TableCell>
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
  purchaseReportsByProducts: makeSelectPurchaseReportsByProducts(),
  purchaseReportsByProductsPerBranch:
    makeSelectPurchaseReportsByProductsPerBranch(),
  branches: makeSelectBranches(),
  branchIngredients: makeSelectIngredients(),
  business: makeSelectBusiness(),
  vendors: makeSelectAdminVendors(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getPurchaseReportsByIngredients: (data) =>
      dispatch(getPurchaseReportsByIngredients(data)),
    _getPurchaseReportsByIngredientsPerBranch: (data) =>
      dispatch(getPurchaseReportsByIngredientsPerBranch(data)),
    _getIngredients: () => dispatch(getIngredients()),
    _getAdminVendors: () => dispatch(getAdminVendors()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminPurchaseByIngredientsReport);
