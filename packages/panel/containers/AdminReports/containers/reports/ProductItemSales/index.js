/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import jMoment from "moment-jalaali";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
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
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useRouter } from "next/router";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const branches = [
  { id: 1, title: "شعبه ۱" },
  { id: 2, title: "شعبه ۲" },
  { id: 3, title: "شعبه ۳" },
  { id: 4, title: "شعبه ۴" },
];

const sortOptions = [
  { id: 0, text: "جدیدترین", keyword: "newest" },
  { id: 1, text: "قدیمی‌ترین", keyword: "oldest" },
  { id: 2, text: "بیشترین مقدار آیتم", keyword: "highest_item_amount" },
  { id: 3, text: "کانال فروش", keyword: "salesChannel" },
];

const branchHeadCells = [
  {
    id: "id",
    label: "ردیف",
    align: "center",
  },
  {
    id: "id",
    label: "کالا",
    align: "right",
    width: 180,
  },
  {
    id: "id",
    label: "واحد",
    align: "center",
  },
  {
    id: "id",
    label: "تعداد فروش",
    align: "center",
  },
  {
    id: "id",
    label: "تعداد بازگشت",
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ بازگشت</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ تخفیف</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مالیات</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ فروش ناخالص</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ فروش خالص</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
];

const products = [
  { id: 1, title: "نان باگت ۳۲ سانتی" },
  { id: 2, title: "کاهو" },
  { id: 3, title: "دیس 1500" },
  { id: 4, title: "دیس 2500" },
];

export function AdminDiscountCodeReport({ isLoading, isSuper }) {
  const router = useRouter();
  const theme = useTheme();

  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedSortingType, selectSortingType] = useState(
    sortOptions[0].keyword
  );
  const [selectedProducts, setSelectedProducts] = useState(
    products.map((product) => product.id)
  );

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  const [productSearch, setProductSearch] = useState(
    router.query.productSearchSearch
  );
  const productSearchInputRef = useRef(null);
  const productSearchTimeout = useRef(null);

  const headCells = useMemo(() => {
    // if (isSuper) {
    //   const mainBranchHeadCells = [...branchHeadCells];
    //   mainBranchHeadCells.splice(1, 0, {
    //     id: "id",
    //     label: "شعبه",
    //     align: "center",
    //   });
    //   return mainBranchHeadCells;
    // } else {
    //   return branchHeadCells;
    // }
    return branchHeadCells;
  }, [isSuper]);
  const chartOption = useMemo(
    () => ({
      yAxis: {
        title: {
          text: "مبلغ خرید به تومان",
          style: {
            fontSize: "14px",
            fontFamily: "IranSans",
          },
        },
        labels: {
          formatter: function () {
            return priceFormatter(this.value);
          },
          style: {
            color: "#636363",
            fontFamily: "IranSans",
            fontSize: "12px",
          },
        },
      },
      colors: [process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR],
      legend: {
        rtl: true,
        itemStyle: {
          font: "12px IranSans",
          color: "#c9c8c8",
        },
        itemHoverStyle: {
          color: "#fff",
        },
        itemHiddenStyle: {
          color: "red",
        },
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: [
          "الویه مرغ",
          "الویه کالباس",
          "الویه مرغ",
          "سالاد مرغ",
          "کشک بادمجان",
          "کشک بادمجان",
          "سالاد مرغ",
          "بندری قارچ",
          "کباب گوشت",
          "الویه کالباس",
        ],
      },
      series: [
        {
          type: "column",
          data: [
            1000000, 5000000, 3200000, 857000, 555000, 987000, 7500000, 8700000,
            3800000, 285000,
          ],
        },
      ],
      tooltip: {
        useHTML: true,
        style: {
          fontSize: "10px",
          textAlign: "right",
          fontFamily: "inherit",
          color: "rgba(218, 217, 217, 0.994)",
          direction: "rtl",
        },
        formatter: function () {
          const labelText =
            "<p>" + this.x + ": " + priceFormatter(this.y) + "</p>";
          return labelText;
        },
      },
    }),
    [isSuper]
  );
  return (
    <div className="container">
      <Head>
        <title>گزارش مالی فروش محصولات</title>
      </Head>

      <AdminBreadCrumb />
      <style
        dangerouslySetInnerHTML={{
          __html: `
       .highcharts-background {
         fill : #FFFFFF;
       }
       `,
        }}
      />

      <Paper
        elevation={2}
        className="d-flex flex-column mt-4"
        style={{ marginBottom: 50 }}
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4 mb-5">
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
                      submitDate={handleClose}
                    />
                  </div>
                </Popover>
              </div>
            </div>
            <Select
              className=" ml-3 mb-3"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedProducts}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              // IconComponent={() => null}
              renderValue={() => {
                if (selectedProducts.length === 0) return "کالا انتخاب کنید";
                if (selectedProducts.length === 1 && selectedProducts[0])
                  return products.find(
                    (product) => product.id === selectedProducts[0]
                  ).title;
                if (selectedProducts.length === products.length)
                  return "همه کالاها";
                return `${englishNumberToPersianNumber(
                  selectedProducts.length
                )} کالا `;
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
                  inputRef={productSearchInputRef}
                  value={productSearch}
                  fullWidth={false}
                  onChange={(productSearch) => {
                    setProductSearch(productSearch);
                    clearTimeout(productSearchTimeout.current);
                    const query = { ...router.query };
                    delete query.productSearch;
                    delete query.page;
                    if (productSearch) {
                      query.productSearch = productSearch;
                    }
                    productSearchTimeout.current = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }}
                  placeholder="جستجوی کالا"
                  inputProps={{
                    className: "pr-5 mr-2",
                  }}
                  InputProps={{
                    startAdornment: (
                      <>
                        {router.query.productSearch ? (
                          <InputAdornment
                            style={{ position: "absolute", left: 3 }}
                            className="u-cursor-pointer"
                            position="start"
                            onClick={() => {
                              setProductSearch("");
                              const query = { ...router.query };
                              delete query.productSearch;
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
                    selectedProducts.length !== products.length &&
                    selectedProducts.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedProducts.length) setSelectedProducts([]);
                    else
                      setSelectedProducts(
                        products.map((product) => product.id)
                      );
                  }}
                  color="primary"
                  checked={selectedProducts.length === products.length}
                />
                <ListItemText
                  primary="انتخاب همه کالاها"
                  className="text-right"
                />
              </MenuItem>
              {products.map((product) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={product.id}
                    value={product.id}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!selectedProducts.includes(product.id)) {
                          setSelectedProducts([
                            ...selectedProducts,
                            product.id,
                          ]);
                        } else {
                          setSelectedProducts(
                            selectedProducts.filter((pr) => pr !== product.id)
                          );
                        }
                      }}
                      color="primary"
                      checked={selectedProducts.includes(product.id)}
                    />
                    <ListItemText
                      primary={product.title}
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
            options={sortOptions}
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
                sortOptions.find((i) => i.text === text).keyword
              )
            }
            inputData={{
              defaultValue: "مرتب‌سازی",
            }}
            selected={sortOptions.find(
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
        <HighchartsReact
          className="mt-auto"
          highcharts={Highcharts}
          options={chartOption}
        />
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
                {headCells.map((headCell, index) => (
                  <TableCell
                    padding={headCell.padding || "unset"}
                    style={{
                      minWidth: headCell.width || 0,
                      position:
                        index === headCells.length - 1 ||
                        index === headCells.length - 2
                          ? "sticky"
                          : "",
                      left:
                        index === headCells.length - 1
                          ? 0
                          : index === headCells.length - 2
                          ? 130
                          : "",
                      top: 0,
                      backgroundColor: "#F1F2F3",
                    }}
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                  (report, index) => {
                    return (
                      <TableRow key={report.id}>
                        {isSuper && (index % 4 === 0 || index === 0) && (
                          <TableCell align="center" rowSpan={4}>
                            {englishNumberToPersianNumber(
                              index === 0 ? index + 1 : index / 4 + 1
                            )}
                          </TableCell>
                        )}
                        {!isSuper && (
                          <TableCell align="center">
                            {englishNumberToPersianNumber(index + 1)}
                          </TableCell>
                        )}
                        <TableCell align="right">اسم کالا</TableCell>
                        <TableCell align="center">1234</TableCell>
                        <TableCell align="center">1234</TableCell>
                        <TableCell align="center">12345</TableCell>
                        <TableCell align="center">12345</TableCell>
                        <TableCell align="center">12345</TableCell>
                        <TableCell align="center">12345</TableCell>
                        <TableCell
                          align="center"
                          style={{
                            position: "sticky",
                            left: 126,
                            background: "#F1F2F3",
                            width: 130,
                          }}
                        >
                          123123
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            position: "sticky",
                            left: 0,
                            background: "#F1F2F3",
                            width: 130,
                          }}
                        >
                          123123
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
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
                      {priceFormatter(123123)}
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
                      {priceFormatter(123123)}
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
                      {priceFormatter(123123)}
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
                      {priceFormatter(123123)}
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      border: "none",
                      position: "sticky",
                      left: 126,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {priceFormatter(123123)}
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      border: "none",
                      position: "sticky",
                      left: 0,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {priceFormatter(123123)}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {/* <div
             style={{ backgroundColor: "#F1F2F3" }}
             className="d-flex align-items-center justify-content-between px-4 py-5"
           >
             <div>جمع کل:</div>
             <div
               style={{
                 backgroundColor: surface.neutral.default,
                 borderRadius: 4,
               }}
               className="px-4 py-3 u-fontWeightBold"
             >
               {priceFormatter(123123123)}
             </div>
           </div> */}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminDiscountCodeReport);
