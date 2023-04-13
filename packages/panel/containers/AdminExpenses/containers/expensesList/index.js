import React from "react";

import { useExpensesList } from "./useExpenseList";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CustomCalendar from "@saas/components/CustomCalendar";
import ImportExportIcon from "@mui/icons-material/ImportExport";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Popper from "@material-ui/core/Popper";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

// import Checkbox from "@material-ui/core/Checkbox";
// import ListItemText from "@material-ui/core/ListItemText";
// import Divider from "@material-ui/core/Divider";
// import MenuItem from "@material-ui/core/MenuItem";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import moment from "moment";
import { Skeleton } from "@material-ui/lab";
import { TablePagination } from "@material-ui/core";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import AdminBreadCrumb from "containers/AdminBreadCrumb";


const ExpenseList = () => {
  const {
    dateRangeFilter,
    setDateRangeFilter,
    onSubmitDateRange,
    costListFilters,
    onClearDateRange,
    // _costCategory,
    // _paymentMethods,
    _costList,
    _isCostListLoading,
    headerRefs,
    tableHeaderModals,
    isHeaderModalOpen,
    urlPrefix,
    toggleHeaderState,
    maxWidth768,
    router,
    onOrderingToggle,
    orderingColumns,
    // onClickPaymentMethodFilter,
    // onClickAllPaymentMethods,
    // onClickCostCategoryFilter,
    // onClickAllCostCategory,
    disableHeaderState,
    onPriceFilterFromChange,
    onPageChange,
    onPageSizeChange,
    costsPagination,
    onPriceFilterToChange,
    onClearPriceFilter,
    onSubmitPriceFilter,
    priceFilter,
  } = useExpensesList();

  const DateHeader = (props, ref) => {
    return (
      <div
        onClick={() => onOrderingToggle(orderingColumns.date)}
        className="d-flex justify-content-center"
      >
        <IconButton size="small">
          <ImportExportIcon />
        </IconButton>
        <div
          style={{
            background: Boolean(costListFilters?.dateRange)
              ? "rgba(0,0,0,.12)"
              : "unset",
            borderRadius: 8,
            padding: ".3rem",
          }}
          ref={(element) => (ref.current[tableHeaderModals.DATE] = element)}
          className="d-flex align-center cursor-pointer mx-2"
          onClick={() => toggleHeaderState(tableHeaderModals.DATE)}
        >
          <p className="pr-1">
          Date
          </p>
          <ArrowDropDownIcon />
        </div>
      </div>
    );
  };

  const AmountHeader = (props, ref) => {
    return (
      <div className="d-flex justify-content-center">
        <IconButton
          onClick={() => onOrderingToggle(orderingColumns.price)}
          size="small"
        >
          <ImportExportIcon />
        </IconButton>
        <div
          style={{
            background: Boolean(costListFilters?.priceRange)
              ? "rgba(0,0,0,.12)"
              : "unset",
            borderRadius: 8,
            padding: ".3rem",
          }}
          ref={(element) => (ref.current[tableHeaderModals.AMOUNT] = element)}
          className="d-flex justify-content-center align-center cursor-pointer mx-2"
          onClick={() => toggleHeaderState(tableHeaderModals.AMOUNT)}
        >
          <p className="pr-1">Amount</p>
          <ArrowDropDownIcon />
        </div>
      </div>
    );
  };

  // const paymentTypeHeader = (props, ref) => {
  //   return (
  //     <div
  //       ref={(element) => (ref.current[tableHeaderModals.PAYMENT] = element)}
  //       className="d-flex justify-content-center align-center cursor-pointer"
  //       onClick={() => toggleHeaderState(tableHeaderModals.PAYMENT)}
  //     >
  //       payment method
  //       <ArrowDropDownIcon />
  //     </div>
  //   );
  // };

  // const categoryHeader = (props, ref) => {
  //   return (
  //     <div
  //       ref={(element) => (ref.current[tableHeaderModals.CATEGORY] = element)}
  //       className="d-flex justify-content-center align-center cursor-pointer"
  //       onClick={() => toggleHeaderState(tableHeaderModals.CATEGORY)}
  //     >
  //       Grouping
  //       <ArrowDropDownIcon />
  //     </div>
  //   );
  // };

  // const PaymentHiddenHeader = () => {
  //   const isVisible = isHeaderModalOpen[tableHeaderModals.PAYMENT];
  //   if (!isVisible) return null;
  //   return (
  //     <ClickAwayListener
  //       onClickAway={() => disableHeaderState(tableHeaderModals.PAYMENT)}
  //     >
  //       <Grow in={isVisible}>
  //         <Paper style={{ width: "10rem" }} className="p-4 m-4">
  //           <MenuItem className="p-0">
  //             <Checkbox
  //               checked={
  //                 _paymentMethods.length ===
  //                 costListFilters?.paymentMethodIds?.length
  //               }
  //               indeterminate={
  //                 costListFilters?.paymentMethodIds?.length &&
  //                 _paymentMethods.length !==
  //                   costListFilters?.paymentMethodIds?.length
  //               }
  //               color="primary"
  //             />
  //             <ListItemText
  //               onClick={onClickAllPaymentMethods}
  //               className="text-right"
  //             >
  //               View all
  //             </ListItemText>
  //           </MenuItem>
  //           <Divider />
  //           {_paymentMethods.map((paymentType) => {
  //             return (
  //               <MenuItem
  //                 onClick={() => onClickPaymentMethodFilter(paymentType.id)}
  //                 key={paymentType.value}
  //                 className="p-0"
  //               >
  //                 <Checkbox
  //                   color="primary"
  //                   checked={
  //                     costListFilters?.paymentMethodIds?.includes(
  //                       paymentType.id
  //                     ) || false
  //                   }
  //                 />
  //                 <ListItemText className="text-right">
  //                   {paymentType.title}
  //                 </ListItemText>
  //               </MenuItem>
  //             );
  //           })}
  //         </Paper>
  //       </Grow>
  //     </ClickAwayListener>
  //   );
  // };

  const AmountHiddenHeader = () => {
    const isVisible = isHeaderModalOpen[tableHeaderModals.AMOUNT];
    if (!isVisible) return null;
    return (
      <ClickAwayListener
        onClickAway={() => disableHeaderState(tableHeaderModals.AMOUNT)}
      >
        <Grow in={isVisible}>
          <Paper style={{ width: "16rem" }} className="p-4 m-4">
            <h1 className="mb-4">Show costs</h1>
            <div>
              <div style={{ position: "relative" }} className="w-100 mb-4">
                <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                  Of the amount
                </p>
                <input
                  value={
                    priceFilter.from ? priceFormatter(priceFilter.from) : ""
                  }
                  style={{
                    color: "#202223",
                    border: "1px solid #E4E6E7",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 400,
                    height: 44,
                  }}
                  className="w-100 px-4"
                  onChange={onPriceFilterFromChange}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "33px",
                    left: "15px",
                    color: "rgba(0,0,0,.12)",
                  }}
                >
                  Toman
                </div>
              </div>
              <div style={{ position: "relative" }} className="w-100 mb-4">
                <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
                  Up to the amount
                </p>
                <input
                  value={priceFilter.to ? priceFormatter(priceFilter.to) : ""}
                  style={{
                    color: "#202223",
                    border: "1px solid #E4E6E7",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 400,
                    height: 44,
                  }}
                  className="w-100 px-4"
                  onChange={onPriceFilterToChange}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "33px",
                    left: "15px",
                    color: "rgba(0,0,0,.12)",
                  }}
                >
                  Toman
                </div>
              </div>
              <div className="d-flex mt-4">
                <Button
                  color="primary"
                  variant="contained"
                  className="ml-2"
                  fullWidth
                  onClick={onSubmitPriceFilter}
                >
                  actions
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  className="mr-2"
                  fullWidth
                  onClick={onClearPriceFilter}
                >
                  clean
                </Button>
              </div>
            </div>
          </Paper>
        </Grow>
      </ClickAwayListener>
    );
  };

  // const CategoryHiddenHeader = () => {
  //   const isVisible = isHeaderModalOpen[tableHeaderModals.CATEGORY];
  //   if (!isVisible) return null;
  //   return (
  //     <ClickAwayListener
  //       onClickAway={() => disableHeaderState(tableHeaderModals.CATEGORY)}
  //     >
  //       <Grow in={isVisible}>
  //         <Paper
  //           style={{ width: "10rem", maxHeight: 300, overflowY: "scroll" }}
  //           className="p-4 m-4"
  //         >
  //           <MenuItem onClick={onClickAllCostCategory} className="p-0">
  //             <Checkbox
  //               checked={
  //                 _costCategory.length ===
  //                 costListFilters?.costsCategoryIds?.length
  //               }
  //               indeterminate={
  //                 costListFilters?.costsCategoryIds?.length &&
  //                 _costCategory.length !==
  //                   costListFilters?.costsCategoryIds?.length
  //               }
  //               color="primary"
  //             />
  //             <ListItemText className="text-right">View all</ListItemText>
  //           </MenuItem>
  //           <Divider />
  //           {_costCategory.map((costCategory) => {
  //             return (
  //               <MenuItem
  //                 onClick={() => onClickCostCategoryFilter(costCategory.id)}
  //                 key={costCategory.value}
  //                 className="p-0"
  //               >
  //                 <Checkbox
  //                   checked={
  //                     costListFilters?.costsCategoryIds?.includes(
  //                       costCategory.id
  //                     ) || false
  //                   }
  //                   color="primary"
  //                 />
  //                 <ListItemText className="text-right">
  //                   {costCategory.title}
  //                 </ListItemText>
  //               </MenuItem>
  //             );
  //           })}
  //         </Paper>
  //       </Grow>
  //     </ClickAwayListener>
  //   );
  // };

  const DateHiddenHeader = () => {
    const isVisible = isHeaderModalOpen[tableHeaderModals.DATE];
    return (
      <Popover
        anchorOrigin={{
          vertical: 150,
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={isVisible}
        onClose={() => disableHeaderState(tableHeaderModals.DATE)}
      >
        <CustomCalendar
          renderFooter={false}
          selectedDayRange={dateRangeFilter}
          setSelectedDayRange={setDateRangeFilter}
        >
          <div className=" d-flex w-100 px-4 pb-4 ">
            <Button
              onClick={onSubmitDateRange}
              className="m-1"
              fullWidth
              variant="contained"
              color="primary"
            >
              Selection
            </Button>
            <Button
              onClick={onClearDateRange}
              className="m-1"
              fullWidth
              variant="outlined"
              color="primary"
            >
              clean
            </Button>
          </div>
        </CustomCalendar>
      </Popover>
    );
  };

  const tableConfig = [
    {
      id: 1,
      name: "No",
      value: "number",
      align: "right",
      headerItemMap: null,
      headerComponent: null,
      hiddenComponent: null,
      width: 50,
    },
    {
      id: 2,
      name: "Grouping",
      value: "type",
      align: "center",
      headerItemMap: tableHeaderModals.CATEGORY,
      headerComponent: null,
      hiddenComponent: null,
      width: 100,
    },
    {
      id: 3,
      name: "Date",
      value: "date",
      align: "center",
      headerItemMap: tableHeaderModals.DATE,
      headerComponent: DateHeader,
      hiddenComponent: DateHiddenHeader,
      width: 100,
    },
    {
      id: 4,
      name: "Amount",
      value: "amount",
      align: "center",
      headerItemMap: tableHeaderModals.AMOUNT,
      headerComponent: AmountHeader,
      hiddenComponent: AmountHiddenHeader,
      width: 100,
    },
    {
      id: 5,
      name: "payment method",
      value: "payment_type",
      align: "center",
      headerItemMap: tableHeaderModals.PAYMENT,
      headerComponent: null,
      hiddenComponent: null,
      width: 110,
    },
    {
      id: 6,
      name: "Rate",
      value: "description",
      align: "center",
      headerItemMap: null,
      headerComponent: null,
      hiddenComponent: null,
      width: 250,
    },
  ];

  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        responsive={false}
        submitAction={() =>
          router.push({
            pathname: `${urlPrefix}/s/settings/accounting/add_expense`,
            query: router.query.category
              ? { category: router.query.category }
              : {},
          })
        }
        submitButtonHasPlus
        submitButtonText="New fee"
      />
      <Paper className="p-4">
        <div className="mb-4 px-2" style={{ fontSize: "1.3rem" }}>
          Cost List
        </div>
        <TableContainer>
          <Table stickyHeader aria-label="customized table">
            <TableHead style={{ backgroundColor: "#1f1f25" }}>
              <TableRow>
                {tableConfig.map(
                  ({
                    headerComponent,
                    hiddenComponent,
                    headerItemMap,
                    width,
                    ...rest
                  }) => {
                    return (
                      <>
                        <TableCell
                          style={{ background: "#F6F6F7", width }}
                          align="right"
                        >
                          {headerComponent
                            ? headerComponent(rest, headerRefs)
                            : rest.name}
                        </TableCell>
                        {hiddenComponent && (
                          <Popper
                            modifiers={{
                              offset: {
                                enabled: true,
                                offset: "0  13",
                              },
                            }}
                            anchorEl={headerRefs.current[headerItemMap]}
                            placement="bottom"
                            open
                          >
                            {hiddenComponent()}
                          </Popper>
                        )}
                      </>
                    );
                  }
                )}
              </TableRow>
            </TableHead>
            {_isCostListLoading ? (
              <TableBody>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <TableRow style={{ height: 53 }} key={item}>
                    {tableConfig?.map((cell) => (
                      <TableCell width={cell.width} key={cell?.id}>
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
                {_costList?.map((costRow) => {
                  return (
                    <TableRow key={costRow.id}>
                      <TableCell style={{ width: 50 }} align="right">
                        {costRow.id}
                      </TableCell>
                      <TableCell style={{ width: 100 }} align="right">
                        {costRow.CostsCategory.title}
                      </TableCell>
                      <TableCell style={{ width: 100 }} align="center">
                        {moment(costRow.date).format("DD MMMM YYYY")}
                      </TableCell>
                      <TableCell style={{ width: 100 }} align="center">
                        {priceFormatter(costRow.price)}
                      </TableCell>
                      <TableCell style={{ width: 110 }} align="right">
                        {costRow.PaymentMethod.title}
                      </TableCell>
                      <TableCell style={{ width: 250 }} align="right">
                        {costRow.description}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
          <TablePagination
            style={{
              width: "100%",
              height: 50,
              position: "sticky",
              top: 0,
            }}
            labelRowsPerPage={!maxWidth768 ? "The number of views on a page" : ""}
            labelDisplayedRows={({ from, to, count }) =>
              `${englishNumberToPersianNumber(
                from
              )} - ${englishNumberToPersianNumber(to)} From${
                count !== -1
                  ? englishNumberToPersianNumber(count)
                  : `more than${englishNumberToPersianNumber(to)}`
              }`
            }
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={costsPagination?.totalCount}
            rowsPerPage={costListFilters?.pageSize}
            page={costListFilters?.page}
            onChangePage={onPageChange}
            onChangeRowsPerPage={onPageSizeChange}
            SelectProps={{
              renderValue: () =>
                englishNumberToPersianNumber(costListFilters?.pageSize),
              IconComponent: ArrowDropDownRoundedIcon,
            }}
            ActionsComponent={({ count, page, rowsPerPage, onChangePage }) => (
              <div className="">
                <IconButton
                  onClick={(event) => {
                    onChangePage(event, page - 1);
                  }}
                  disabled={page === 0}
                  aria-label="previous page"
                >
                  <KeyboardArrowRight />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    onChangePage(event, page + 1);
                  }}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="next page"
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </div>
            )}
          />
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ExpenseList;
