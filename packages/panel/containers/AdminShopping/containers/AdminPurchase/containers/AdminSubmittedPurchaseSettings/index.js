import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

import { createStructuredSelector } from "reselect";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import { compose } from "redux";

import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import AdminBreadCrumb from "containers/AdminBreadCrumb";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { dust } from "@saas/utils/colors";
import { PURCHASE_ORDER_PLUGIN_URL } from "@saas/utils/constants/plugins";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import { getAdminVendors, getSubmittedPurchases } from "store/actions";
import {
  makeSelectAdminVendors,
  makeSelectSubmittedPurchases,
  makeSelectSubmittedPurchasesPagination,
} from "store/selectors";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Skeleton from "@material-ui/lab/Skeleton";
import PurchaseStatusChip from "containers/AdminShopping/containers/AdminPurchase/components/PurchaseStatusChip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import {
  PURCHASE_ORDER_STATUS_CANCELLED_BY_VENDOR,
  PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE,
  PURCHASE_ORDER_STATUS_PARTIALLY_RECEIVED,
  PURCHASE_ORDER_STATUS_PENDING_VENDOR,
} from "store/constants";
import { formatDateObjectToNormal } from "../../../../../../utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";
import TableNoResultMessage from "../../../../../../components/TableNoResultMessage";

const headCells = [
  { id: "number", label: "the document number", align: "center" },
  {
    id: "status",
    label: "The status of the application",
    align: "center",
  },
  {
    id: "date",
    align: "center",
    label: "Date of Registration",
  },
  {
    id: "waiting_date",
    align: "center",
    label: "Expect to receive",
  },
  {
    id: "vendor",
    align: "center",
    label: "Supplier",
  },
  {
    id: "destination",
    align: "center",
    label: "the aim",
  },
  {
    id: "cost",
    align: "right",
    label: "The amount of the order($)",
  },
];

function AdminSubmittedPurchaseSettings({
  purchases: adminPurchases,
  _getSubmittedPurchases,
  pagination,
  loading,
  urlPrefix,
  adminVendors,
  _getAdminVendors,
}) {
  const vendors = adminVendors || [];
  const router = useRouter();
  const purchases = loading
    ? Array.from(Array(10)).map(() => ({}))
    : adminPurchases;
  const [selectedBusinesses, setSelectedBusinesses] = useState(
    vendors.map((vendor) => vendor.id)
  );
  const page = router.query.page || 1;
  const pageSize = router.query.page_size || 10;
  const statusFilters = [
    { tab: 0, filters: {}, text: "All" },
    {
      tab: 1,
      filters: {
        status: PURCHASE_ORDER_STATUS_PENDING_VENDOR,
      },
      text: "Awaiting review",
    },
    {
      tab: 2,
      filters: {
        status: PURCHASE_ORDER_STATUS_CANCELLED_BY_VENDOR,
      },
      text: "Canceled",
    },
    { tab: 3, filters: { draft: "true" }, text: "draft" },
    {
      tab: 4,
      filters: { status: PURCHASE_ORDER_STATUS_PARTIALLY_RECEIVED },
      text: "Incomplete receipt",
    },
    {
      tab: 5,
      filters: { status: PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE },
      text: "Archive",
    },
  ];

  const tab = useMemo(
    () =>
      [...statusFilters].reverse().find((statusItem) => {
        return (
          JSON.stringify(router.query) ===
          JSON.stringify({ ...router.query, ...statusItem.filters })
        );
      })?.tab || 0,
    [router.query.status, router.query.draft]
  );
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: moment().startOf("day"),
    to: moment().endOf("day"),
  });
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;
  const { maxWidth768 } = useResponsive();
  useEffect(() => {
    setTimeout(() => {
      _getAdminVendors();
    }, []);
  }, []);
  useEffect(() => {
    document.body.scrollIntoView();
    const defaultMomentToDate = router.query.to_date
      ? moment(router.query.to_date, "YYYY-MM-DD")
      : moment();
    const defaultMomentFromDate = router.query.from_date
      ? moment(router.query.from_date, "YYYY-MM-DD")
      : moment().add(-6, "day");
    const defaultFromDate = {
      year: defaultMomentFromDate.year(),
      month: defaultMomentFromDate.month() + 1,
      day: defaultMomentFromDate.date(),
    };
    const defaultToDate = {
      year: defaultMomentToDate.year(),
      month: defaultMomentToDate.month() + 1,
      day: defaultMomentToDate.date(),
    };
    setSelectedDayRange({
      from: defaultFromDate,
      to: defaultToDate,
    });
    const _query = {
      ...router.query,
      page,
      page_size: pageSize,
    };

    setTimeout(() => {
      _getSubmittedPurchases({
        business: _query.business,
        from_date: _query.from_date,
        to_date: _query.to_date,
        site_domain: _query.site_domain,
        ...(selectedBusinesses.length !== vendors.length && {
          vendor: selectedBusinesses,
        }),
      });
    }, 0);
    handleClose();
  }, [router.query, JSON.stringify(selectedBusinesses)]);
  const handleChangePage = (event, page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: parseInt(page) + 1 },
    });
  };
  const handleChangeRowsPerPage = (event) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, page_size: event.target.value },
    });
  };
  const allSelected = vendors.length === selectedBusinesses.length;
  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitButtonText="New purchase document"
        submitButtonHasPlus
        submitAction={() =>
          router.push(`${urlPrefix}${PURCHASE_ORDER_PLUGIN_URL}/out/new`)
        }
        isLoading={loading}
      />
      <Paper elevation={1} className="mt-3">
        <Tabs
          style={{ borderBottom: `1px solid ${dust}` }}
          indicatorColor="primary"
          textColor="primary"
          value={tab}
          onChange={(event, newTabValue) => {
            const statusItem = statusFilters.find(
              (item) => item.tab === newTabValue
            );
            let { query: _query } = router;
            delete _query.status;
            delete _query.draft;
            _query = { ..._query, ...statusItem.filters };
            router.push({
              pathname: router.pathname,
              query: _query,
            });
          }}
          aria-label="simple tabs example"
        >
          {statusFilters.map((statusItem) => (
            <Tab
              key={`tab-${statusItem.tab}`}
              style={{ minWidth: 0 }}
              label={statusItem.text}
            />
          ))}
        </Tabs>
        <div className="px-3 d-flex flex-wrap">
          {vendors.length ? (
            <Autocomplete
              multiple
              style={{ width: 200 }}
              options={[{ name: "All", value: "select-all" }, ...vendors]}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              ListboxProps={{
                className: "py-0 overflow-auto",
                style: { maxHeight: 300 },
              }}
              renderOption={(option, { selected }) => {
                const selectAllProps =
                  vendors.length > 0 && option.value === "select-all" // To control the state of 'select-all' checkbox
                    ? { checked: allSelected }
                    : {};
                return (
                  <>
                    <Checkbox
                      color="primary"
                      size="small"
                      className="mr-0 p-1"
                      style={{ marginRight: 8 }}
                      checked={selected}
                      {...selectAllProps}
                    />
                    <div className="u-font-semi-small">{option.name}</div>
                  </>
                );
              }}
              onChange={(event, selectedOptions, reason) => {
                if (reason === "select-option" || reason === "remove-option") {
                  if (
                    selectedOptions.find(
                      (option) => option.value === "select-all"
                    )
                  ) {
                    if (!allSelected)
                      setSelectedBusinesses(vendors.map((vendor) => vendor.id));
                    else setSelectedBusinesses([]);
                  } else
                    setSelectedBusinesses(
                      selectedOptions.map((vendor) => vendor.id)
                    );
                } else if (reason === "clear") setSelectedBusinesses([]);
              }}
              value={vendors.filter((business) =>
                selectedBusinesses.includes(business.id)
              )}
              size="small"
              noOptionsText="There was no branch"
              disableClearable
              ChipProps={{ className: "d-none" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  size="small"
                  variant="outlined"
                  placeholder="Supplier search"
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    className: `small ${params.InputLabelProps.className}`,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    className: `${params.InputProps.className} small pr-2 pl-3`,
                  }}
                />
              )}
            />
          ) : null}
          <div className="d-flex align-items-center mt-2 mb-1 mr-2">
            <div className="ml-2 mr-3">Delivery Date:</div>
            <div className="d-flex flex-wrap align-items-center ml-5 mb-4 mb-lg-0">
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
                    submitDate={() => {
                      const query = { ...router.query };
                      if (selectedDayRange.from)
                        query.from_date = persianToEnglishNumber(
                          moment(
                            formatDateObjectToNormal(selectedDayRange.from),
                            "YYYY-jM-jD"
                          ).format("YYYY-M-D")
                        );
                      else delete query.from_date;
                      if (selectedDayRange.to)
                        query.to_date = persianToEnglishNumber(
                          moment(
                            formatDateObjectToNormal(selectedDayRange.to),
                            "YYYY-jM-jD"
                          ).format("YYYY-M-D")
                        );
                      else delete query.to_date;
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }}
                  />
                </div>
              </Popover>
            </div>
          </div>
        </div>
        {!purchases || purchases.length ? (
          <>
            <TableContainer className="mt-3">
              <Table
                aria-labelledby="tableTitle"
                size="small"
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell
                        padding={headCell.padding || "unset"}
                        className="text-nowrap u-fontWeightBold"
                        key={headCell.id}
                        align={headCell.align}
                        color="text.primary"
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases?.map((purchase) => {
                    const {
                      id,
                      order_id: trackId,
                      total_items_price: totalPrice,
                      created_at: createdAt,
                      status,
                      expected_date_to_receive: expectedAt,
                      vendor: { name: vendor } = {},
                      submitter_business: { title: destination } = {},
                      draft,
                    } = purchase;
                    const purchaseStatus = draft ? -1 : status;
                    const isMock = !id;

                    const createdDate = new Date(createdAt);
                    const createdTime = moment(
                      `${createdDate.getFullYear()}-${
                        createdDate.getMonth() + 1
                      }-${createdDate.getDate()}`,
                      "YYYY-MM-DD"
                    );
                    const submittedDate = new Date(expectedAt);
                    const submittedTime = moment(
                      `${submittedDate.getFullYear()}-${
                        submittedDate.getMonth() + 1
                      }-${submittedDate.getDate()}`,
                      "YYYY-MM-DD"
                    );

                    return (
                      <Link
                        key={purchase.id}
                        href={`${urlPrefix}${PURCHASE_ORDER_PLUGIN_URL}/out/${id}${
                          draft ? "/edit" : ""
                        }${
                          purchaseStatus === 3 ||
                          purchaseStatus === 4 ||
                          purchaseStatus === 5
                            ? "/receive"
                            : ""
                        }`}
                        className="d-flex w-100 u-cursor-pointer overflow-hidden"
                        passHref
                      >
                        <TableRow component="a" hover>
                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <div>{englishNumberToPersianNumber(trackId)}</div>
                            )}
                          </TableCell>
                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <PurchaseStatusChip
                                purchaseStatus={purchaseStatus}
                              />
                            )}
                          </TableCell>
                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <>
                                {englishNumberToPersianNumber(
                                  createdTime.format("YYYY/MM/DD")
                                )}
                                {"  "}-{"  "}
                                {englishNumberToPersianNumber(
                                  `${`0${createdDate.getHours()}`.slice(
                                    -2
                                  )}:${`0${createdDate.getMinutes()}`.slice(
                                    -2
                                  )}`
                                )}
                              </>
                            )}
                          </TableCell>
                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <>
                                {englishNumberToPersianNumber(
                                  submittedTime.format("YYYY/MM/DD")
                                )}
                                {"  "}-{"  "}
                                {englishNumberToPersianNumber(
                                  `${`0${submittedDate.getHours()}`.slice(
                                    -2
                                  )}:${`0${submittedDate.getMinutes()}`.slice(
                                    -2
                                  )}`
                                )}
                              </>
                            )}
                          </TableCell>
                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <>{vendor}</>
                            )}
                          </TableCell>
                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <>{destination}</>
                            )}
                          </TableCell>

                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <>{priceFormatter(totalPrice)}</>
                            )}
                          </TableCell>
                        </TableRow>
                      </Link>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage={!maxWidth768 ? "Rows count per page" : ""}
              labelDisplayedRows={({ from, to, count }) =>
                `${englishNumberToPersianNumber(
                  from
                )} - ${englishNumberToPersianNumber(to)} From${
                  count !== -1
                    ? englishNumberToPersianNumber(count)
                    : `more than${englishNumberToPersianNumber(to)}`
                }`
              }
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={pagination.count}
              rowsPerPage={pageSize}
              page={page - 1}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              SelectProps={{
                renderValue: () => englishNumberToPersianNumber(pageSize),
                IconComponent: ArrowDropDownRoundedIcon,
              }}
              ActionsComponent={({
                count,
                page,
                rowsPerPage,
                onChangePage,
              }) => (
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
          </>
        ) : (
          <TableNoResultMessage title={"The purchase document was not found.!"} />
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  purchases: makeSelectSubmittedPurchases(),
  pagination: makeSelectSubmittedPurchasesPagination(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  adminVendors: makeSelectAdminVendors(),
});

function mapDispatchToProps(dispatch) {
    return {
        _getSubmittedPurchases: (params) => dispatch(getSubmittedPurchases(params)),
        _getAdminVendors: () => dispatch(getAdminVendors()),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminSubmittedPurchaseSettings);
