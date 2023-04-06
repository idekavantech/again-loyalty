import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import moment from "moment-jalaali";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
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
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectBranches } from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import EmptyStateForTableReports from "../components/EmptyStateForTableReports";
import { HIGHEST_RATE, LOWEST_RATE } from "../constants";
import { getCustomersSatisfactionReviewsReports } from "store/actions";
import { makeSelectCustomersSatisfactionReviewsReports } from "store/selectors";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";

moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const sortingOptions = [
  { id: 0, text: "بیشترین رتبه", keyword: HIGHEST_RATE },
  { id: 1, text: "کمترین رتبه", keyword: LOWEST_RATE },
];

const branchHeadCells = [
  {
    id: "id",
    name: "ردیف",
    label: "ردیف",
    align: "center",
  },
  {
    id: "id",
    name: "فروش شعبه",
    label: (
      <div className="d-flex flex-column">
        <div>فروش شعبه</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "تعداد فاکتور",
    label: "تعداد فاکتور",
    align: "center",
  },
  {
    id: "id",
    name: "میانگین فاکتور",
    label: (
      <div className="d-flex flex-column">
        <div>میانگین فاکتور</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "رتبه",
    label: "رتبه",
    align: "center",
  },
  {
    id: "id",
    name: "تعداد نظرات",
    label: "تعداد نظرات",
    align: "center",
  },
  {
    id: "id",
    name: "راضی",
    label: "راضی",
    align: "center",
  },
  {
    id: "id",
    name: "ناراضی",
    label: "ناراضی",
    align: "center",
  },
];

let timeoutId = null;

export function AdminCustomersSatisfactionReport({
  isLoading,
  isSuper,
  branches,
  _getCustomersSatisfactionReviewsReports,
  customersSatisfactionReviewsReports,
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
          _getCustomersSatisfactionReviewsReports({
            business_id: selectedBranches,
            from_date: persianToEnglishNumber(
              moment(
                formatDateObjectToNormal(selectedDayRange.from),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              moment(
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
        _getCustomersSatisfactionReviewsReports({
          from_date: persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
    handleClose();
  };

  const headCells = useMemo(() => {
    if (isSuper) {
      let mainBranchHeadCells = [...branchHeadCells];
      mainBranchHeadCells.splice(1, 0, {
        id: "id",
        label: "نام شعبه",
        name: "نام شعبه",
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
          _getCustomersSatisfactionReviewsReports({
            business_id: selectedBranches,
            from_date: persianToEnglishNumber(
              moment(
                formatDateObjectToNormal(selectedDayRange.from),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              moment(
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
        _getCustomersSatisfactionReviewsReports({
          from_date: persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
  }, [isSuper, selectedBranches]);

  const headRow = useMemo(
    () => headCells.map((headCell) => headCell.name),
    [headCells]
  );
  const rows = useMemo(() => {
    return (
      customersSatisfactionReviewsReports &&
      Object.values(customersSatisfactionReviewsReports?.businesses)?.map(
        (report, index) => {
          const num = index + 1;
          const branchName = isSuper
            ? branches?.find((branch) => branch.id === report._id)?.title
            : "";
          const branchSale = isSuper ? report.total_order_price : null;
          const factorNum = report.total_order_count;
          const factorAvg = report.total_order_price / report.total_order_count;
          const level = report.total_review_score;
          const commentsNum = report.total_review_count;
          const satisfactionPercent = report.qualified_percent;
          const dissatisfactionPercent = report.disqualified_percent;

          if (isSuper) {
            return [
              num,
              branchName,
              branchSale,
              factorNum,
              factorAvg,
              level,
              commentsNum,
              `${satisfactionPercent}%`,
              `${dissatisfactionPercent}%`,
            ];
          }
          return [
            num,
            branchSale,
            factorNum,
            factorAvg,
            level,
            commentsNum,
            `${satisfactionPercent}%`,
            `${dissatisfactionPercent}%`,
          ];
        }
      )
    );
  });
  const summaryRow = useMemo(() => {
    const num = "جمع کل";
    const branchName = "";
    const branchSale =
      customersSatisfactionReviewsReports?.totals?.[0]?.total_order_price;
    const factorNum =
      customersSatisfactionReviewsReports?.totals?.[0]?.total_order_count;
    const factorAvg =
      customersSatisfactionReviewsReports?.totals?.[0]?.average_order_percent;
    const level = "";
    const commentsNum =
      customersSatisfactionReviewsReports?.totals?.[0]?.total_review_count;
    const satisfactionPercent =
      customersSatisfactionReviewsReports?.totals?.[0]?.qualified_percent;
    const dissatisfactionPercent =
      customersSatisfactionReviewsReports?.totals?.[0]?.disqualified_percent;
    if (isSuper) {
      return [
        num,
        branchName,
        branchSale,
        factorNum,
        factorAvg,
        level,
        commentsNum,
        `${satisfactionPercent}%`,
        `${dissatisfactionPercent}%`,
      ];
    }
    return [
      num,
      branchSale,
      factorNum,
      factorAvg,
      level,
      commentsNum,
      `${satisfactionPercent}%`,
      `${dissatisfactionPercent}%`,
    ];
  });
  return (
    <div className="container">
      <Head>
        <title>میزان رضایت مشتریان</title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="خروجی گرفتن"
        submitAction={() =>
          generateCSVFile(
            headRow,
            rows,
            summaryRow,
            "گزارش میزان رضایت مشتریان"
          )
        }
      />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex align-items-center  ml-3 mb-3">
              <div className="d-flex flex-wrap align-items-center ml-5 mb-4 mb-lg-0">
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
                      selectedDayRange={selectedDayRange}
                      setSelectedDayRange={setSelectedDayRange}
                      submitDate={submitDate}
                    />
                  </div>
                </Popover>
              </div>
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
        )}
        {true ? (
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
                  {customersSatisfactionReviewsReports &&
                    Object.values(
                      customersSatisfactionReviewsReports?.businesses
                    )?.map((report, index) => {
                      return (
                        <TableRow key={report.id}>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(index + 1)}
                          </TableCell>
                          {isSuper && (
                            <TableCell align="center">
                              {
                                branches?.find(
                                  (branch) => branch.id === report._id
                                )?.title
                              }
                            </TableCell>
                          )}
                          <TableCell align="center">
                            {priceFormatter(report.total_order_price)}
                          </TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(
                              report.total_order_count
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {priceFormatter(
                              report.total_order_price /
                                report.total_order_count
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(
                              report.total_review_score
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(
                              report.total_review_count
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(
                              report.qualified_percent
                            )}
                            ٪
                          </TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(
                              report.disqualified_percent
                            )}
                            ٪
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
                          customersSatisfactionReviewsReports?.totals?.[0]
                            ?.total_order_price
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
                        {englishNumberToPersianNumber(
                          customersSatisfactionReviewsReports?.totals?.[0]
                            ?.total_order_count
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
                          customersSatisfactionReviewsReports?.totals?.[0]
                            ?.average_order_percent
                        )}
                      </div>
                    </TableCell>
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
                        {englishNumberToPersianNumber(
                          customersSatisfactionReviewsReports?.totals?.[0]
                            ?.total_review_count
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
                        {englishNumberToPersianNumber(
                          customersSatisfactionReviewsReports?.totals?.[0]
                            ?.qualified_percent
                        )}
                        ٪
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
                        {englishNumberToPersianNumber(
                          customersSatisfactionReviewsReports?.totals?.[0]
                            ?.disqualified_percent
                        )}
                        ٪
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        ) : (
          <EmptyStateForTableReports />
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
  customersSatisfactionReviewsReports:
    makeSelectCustomersSatisfactionReviewsReports(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCustomersSatisfactionReviewsReports: (data) =>
      dispatch(getCustomersSatisfactionReviewsReports(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminCustomersSatisfactionReport);
