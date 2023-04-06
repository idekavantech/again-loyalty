import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

import { createStructuredSelector } from "reselect";

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
import moment from "moment-jalaali";
import { getReceivedPurchases } from "store/actions";
import {
  makeSelectReceivedPurchases,
  makeSelectReceivedPurchasesPagination,
} from "store/selectors";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Skeleton from "@material-ui/lab/Skeleton";
import PurchaseStatusChip from "containers/AdminShopping/containers/AdminPurchase/components/PurchaseStatusChip";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import {
  PURCHASE_ORDER_STATUS_CANCELLED_BY_VENDOR,
  PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE,
  PURCHASE_ORDER_STATUS_PARTIALLY_RECEIVED,
  PURCHASE_ORDER_STATUS_PENDING_VENDOR,
} from "store/constants";
import LocationSelector from "components/LocationSelector";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { BRANCH_QUERY_KEY } from "../../../AdminOrdersList/constants";
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
    label: "Send to",
  },
  {
    id: "cost",
    align: "right",
    label: "The amount of the order($)",
  },
];

let branchesTimeoutId = null;

function AdminReceivedPurchaseSettings({
  purchases: adminPurchases,
  _getAdminReceivedPurchases,
  pagination,
  loading,
  urlPrefix,
  branches,
}) {
  const router = useRouter();
  const purchases = loading
    ? Array.from(Array(10)).map(() => ({}))
    : adminPurchases;
  const { maxWidth768 } = useResponsive();
  const page = router.query.page || 1;
  const pageSize = router.query.page_size || 10;
  const [selectedBranch, setSelectedBranch] = useState(
    router?.query?.[BRANCH_QUERY_KEY] || "all"
  );
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: moment().startOf("day"),
    to: moment().endOf("day"),
  });
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;
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
    {
      tab: 3,
      filters: { status: PURCHASE_ORDER_STATUS_PARTIALLY_RECEIVED },
      text: "Incomplete receipt",
    },
    {
      tab: 4,
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
  useEffect(() => {
    document.body.scrollIntoView();
    const defaultMomentToDate = router.query.to_date
      ? moment(router.query.to_date, "YYYY-MM-DD")
      : moment();
    const defaultMomentFromDate = router.query.from_date
      ? moment(router.query.from_date, "YYYY-MM-DD")
      : moment().add(-6, "day");
    const defaultFromDate = {
      year: defaultMomentFromDate.jYear(),
      month: defaultMomentFromDate.jMonth() + 1,
      day: defaultMomentFromDate.jDate(),
    };
    const defaultToDate = {
      year: defaultMomentToDate.jYear(),
      month: defaultMomentToDate.jMonth() + 1,
      day: defaultMomentToDate.jDate(),
    };
    setSelectedDayRange({
      from: defaultFromDate,
      to: defaultToDate,
    });
    const _query = {
      submitter_business: selectedBranch,
      ...router.query,
    };
    delete _query.site_domain;
    delete _query.branch;
    if (selectedBranch === "all") delete _query.submitter_business;
    setTimeout(() => _getAdminReceivedPurchases(_query), 0);
    handleClose();
  }, [router.query, selectedBranch]);
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
  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitButtonText={selectedBranch !== "all" ? "New purchase document" : ""}
        submitButtonHasPlus
        submitAction={() =>
          router.push(
            `${urlPrefix}${PURCHASE_ORDER_PLUGIN_URL}/out/new_for_branches?businessTitle=${selectedBranch}`
          )
        }
        isLoading={loading}
      />
      <Paper elevation={1} className="mt-3">
        {branches?.length ? (
          <LocationSelector
            value={selectedBranch}
            onChange={(site_domain) => {
              setSelectedBranch(site_domain);
              clearTimeout(branchesTimeoutId);
              const query = { ...router.query };
              delete query[BRANCH_QUERY_KEY];
              delete query.page;
              if (site_domain) {
                query[BRANCH_QUERY_KEY] = site_domain;
              }
              branchesTimeoutId = setTimeout(() => {
                router.push({
                  pathname: router.pathname,
                  query,
                });
              }, 500);
            }}
            items={[
              { title: "All branches", value: "all" },
              ...branches.map((branch) => ({
                title: branch.title,
                value: branch.site_domain,
              })),
            ]}
          />
        ) : null}
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
        >
          {statusFilters.map((statusItem) => (
            <Tab
              key={`tab-${statusItem.tab}`}
              style={{ minWidth: 0 }}
              label={statusItem.text}
            />
          ))}
        </Tabs>
        <div className="d-flex px-3 flex-wrap">
          <div className="d-flex align-items-center mt-2 mb-1 mr-2">
            <div className="ml-3">Delivery Date</div>
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
                            "jYYYY-jM-jD"
                          ).format("YYYY-M-D")
                        );
                      else delete query.from_date;
                      if (selectedDayRange.to)
                        query.to_date = persianToEnglishNumber(
                          moment(
                            formatDateObjectToNormal(selectedDayRange.to),
                            "jYYYY-jM-jD"
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
                      final_price: totalPrice,
                      created_at: createdAt,
                      expected_date_to_receive: expectedAt,
                      status,
                      draft,
                      submitter_business: { title: destination } = {},
                      supplier_business: { title: vendor } = {},
                    } = purchase;
                    const isMock = !id;
                    const purchaseStatus = draft ? null : status;

                    const createdDate = new Date(createdAt);
                    const createdTime = moment(
                      `${createdDate.getFullYear()}-${
                        createdDate.getMonth() + 1
                      }-${createdDate.getDate()}`,
                      "YYYY-MM-DD"
                    );
                    const expectedDate = new Date(expectedAt);
                    const expectedTime = moment(
                      `${expectedDate.getFullYear()}-${
                        expectedDate.getMonth() + 1
                      }-${expectedDate.getDate()}`,
                      "YYYY-MM-DD"
                    );

                    return (
                      <Link
                        href={`${urlPrefix}${PURCHASE_ORDER_PLUGIN_URL}/in/${id}`}
                        className="d-flex w-100 u-cursor-pointer overflow-hidden"
                        passHref
                        key={purchase.id}
                      >
                        <TableRow component="a" hover>
                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <>{englishNumberToPersianNumber(trackId)}</>
                            )}
                          </TableCell>
                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <>
                                <PurchaseStatusChip
                                  purchaseStatus={purchaseStatus}
                                />
                              </>
                            )}
                          </TableCell>
                          <TableCell className="text-nowrap" align="center">
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <>
                                {englishNumberToPersianNumber(
                                  createdTime.format("jYYYY/jMM/jDD")
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
                                  expectedTime.format("jYYYY/jMM/jDD")
                                )}
                                {"  "}-{"  "}
                                {englishNumberToPersianNumber(
                                  `${`0${expectedDate.getHours()}`.slice(
                                    -2
                                  )}:${`0${expectedDate.getMinutes()}`.slice(
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
              labelRowsPerPage={!maxWidth768 ? "The number of rows per page" : ""}
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
  purchases: makeSelectReceivedPurchases(),
  pagination: makeSelectReceivedPurchasesPagination(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  branches: makeSelectBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminReceivedPurchases: (params) =>
      dispatch(getReceivedPurchases(params)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminReceivedPurchaseSettings);
