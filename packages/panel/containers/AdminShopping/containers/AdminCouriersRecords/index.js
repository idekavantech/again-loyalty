/* eslint-disable react/no-danger */
/* eslint-disable indent */

/**
 *
 * AdminCouriers
 *
 */

import React, { memo, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import useTheme from "@material-ui/core/styles/useTheme";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import { setPluginData } from "@saas/stores/plugins/actions";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { downloaderRequest } from "@saas/utils/helpers/downloaderRequest";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { useRouter } from "next/router";
import moment from "moment-jalaali";
import MaterialSelect from "@saas/components/Select/MaterialSelect";
import TablePagination from "@material-ui/core/TablePagination";
import { paymentStatusOptions, paymentTypeOptions } from "store/constants";
import Chip from "@material-ui/core/Chip";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  getShopingOrderAggregate,
  getShoppingAdminOrders,
} from "store/actions";
import {
  makeSelectOrderAggregate,
  makeSelectShoppingAdminOrders,
  makeSelectShoppingAdminOrdersPagination,
} from "store/selectors";
import {
  makeSelectBranches,
  makeSelectBusiness,
  makeSelectSiteDomain,
} from "@saas/stores/business/selector";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import {
  ALL_PEYK,
  ALO_PEYK,
  MIARE,
  PERSONAL_PEYK,
} from "@saas/plugins/Shopping/constants";
import uniqueId from "lodash/uniqueId";
import TimeField from "react-simple-timefield";
import Button from "@material-ui/core/Button";
import { makeSelectUser } from "@saas/stores/user/selector";
import { BASE_URL_V2 } from "@saas/utils/api";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { formatDateObjectToNormal } from "../../../../utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";

moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const PAYMENT_TYPE_QUERY_KEY = "payment_type";
const PAYMENT_STATE_QUERY_KEY = "paid_status";
const REMINDING_QUERY_KEY = "reminding";
const DESCRIPTION_QUERY_KEY = "description";
const FROM_DATE_QUERY_KEY = "from_date";
const TO_DATE_QUERY_KEY = "to_date";
const SEARCH_QUERY_KEY = "search";
const DELIVERY_COMPANY_QUERY_KEY = "delivery_company";
const COURIER_ID_KEY = "courier";
const DELIVERY_FROM_DATE = "from_delivery";
const DELIVERY_TO_DATE = "to_delivery";
const START_TIME = "start_time";
const END_TIME = "end_time";

const headCells = [
  {
    id: "id",
    label: "Row",
    align: "center",
  },
  {
    id: "name",
    align: "center",
    label: "Recipient Name",
  },
  {
    id: "phone",
    align: "center",
    label: "Phone number",
  },
  {
    id: "user_address",
    align: "center",
    label: "Submit address",
  },
  {
    id: "time",
    label: "shipping time",
    align: "center",
  },
  {
    id: "delivery_name",
    align: "center",
    label: "Courier name",
  },

  {
    id: "payment_number",
    align: "center",
    label: "Order number",
  },
  {
    id: "total_price",
    align: "center",
    label: "The amount of the order($)",
  },
  {
    id: "payment_price",
    align: "center",
    label: "The amount paid($)",
  },
];

export function AdminCouriersRecords({
  isLoading,
  pluginData,
  pagination,
  adminOrders: orders,
  _getAdminOrders,
  plugin = SHOPPING_PLUGIN,
  pluginsData,
  _getOrderAggregate,
  orderAggregate,
  urlPrefix,
  user,
  siteDomain,
}) {
  const theme = useTheme();
  useState(false);
  const router = useRouter();
  const couriers = pluginData.data?.couriers;
  const [page, setPage] = useState(+router.query.page || 0);
  const [pageSize, setPageSize] = useState(+router.query.page_size || 25);
  const [startTime, setStartTime] = useState(
    router?.query?.from_delivery?.slice(
      11,
      router?.query?.from_delivery?.length
    ) || null
  );
  const [endTime, setEndTime] = useState(
    router?.query?.to_delivery?.slice(11, router?.query.to_delivery?.length) ||
      null
  );
  const [selectedDeliveryRange, setSelectedDeliveryRange] = useState({
    from: moment().startOf("day"),
    to: moment().endOf("day"),
  });
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;
  const { maxWidth768 } = useResponsive();
  const QUERY_KEYS_LABELS = {
    [PAYMENT_TYPE_QUERY_KEY]: (value) => `payment type: ${value}`,
    [PAYMENT_STATE_QUERY_KEY]: (value) => `Payment status: ${value}`,
    [FROM_DATE_QUERY_KEY]: (value) =>
      `Date of registration from${moment(value).format("jYYYY/jMM/jDD")}`,
    [TO_DATE_QUERY_KEY]: (value) =>
      `Registration date${moment(value).format("jYYYY/jMM/jDD")}`,
    [DELIVERY_FROM_DATE]: (value) =>
      `Date of submission from${moment(value).format("jYYYY/jMM/jDD")}`,
    [DELIVERY_TO_DATE]: (value) =>
      `Post date up${moment(value).format("jYYYY/jMM/jDD")}`,
    [DELIVERY_COMPANY_QUERY_KEY]: (value) => value,
    [COURIER_ID_KEY]: (value) => value,
    [START_TIME]: (value) => `The time of submission from${value}`,
    [END_TIME]: (value) => `Time to send up${value}`,
  };

  const deliverer_companies_dict = {
    all_api_token: { label: "All", value: "" },
    alopeyk_api_token: { label: "Alopic", value: "alopeyk" },
    miare_api_token: { label: "Come", value: "miare" },
    personal_api_token: { label: "Personal peaks", value: "self" },
  };
  const deliveryCompaniesType = {
    [MIARE]: { label: "Come" },
    [ALO_PEYK]: { label: "Alopic" },
    [PERSONAL_PEYK]: { label: "Personal Peak" },
    [ALL_PEYK]: { label: "All" },
  };
  const _couriers = couriers
    ? Object.entries(couriers)?.map(([courier_id, courier]) => {
        return { id: uniqueId(), text: courier.name, value: courier_id };
      })
    : [];

  const _deliverer_companies =
    Object.keys(
      pluginsData[plugin]?.deliverer_companies || {
        all_api_token: false,
        alopeyk_api_token: true,
        miare_api_token: true,
        personal_api_token: true,
      }
    ).map((deliverer, index) => ({
      id: index + 1,
      text: deliverer_companies_dict[deliverer].label,
      value: deliverer_companies_dict[deliverer].value,
    })) || [];

  const deliveryManOptions = [..._deliverer_companies, ..._couriers];

  const QUERY_KEYS_LABELS_CONVERTER = useMemo(
    () => ({
      [PAYMENT_TYPE_QUERY_KEY]: (value) =>
        paymentTypeOptions.find((item) => item.keyword === value)?.text,
      [PAYMENT_STATE_QUERY_KEY]: (value) =>
        paymentStatusOptions.find((item) => item.value === value)?.text,
      [SEARCH_QUERY_KEY]: (value) => value,
      [REMINDING_QUERY_KEY]: (value) => value,
      [DESCRIPTION_QUERY_KEY]: (value) => value,
      [FROM_DATE_QUERY_KEY]: (value) => value,
      [TO_DATE_QUERY_KEY]: (value) => value,
      [DELIVERY_FROM_DATE]: (value) => value,
      [DELIVERY_TO_DATE]: (value) => value,
      [START_TIME]: (value) => value,
      [END_TIME]: (value) => value,
      [DELIVERY_COMPANY_QUERY_KEY]: (value) =>
        value
          ? deliveryManOptions.find((item) => item.value === value)?.text ||
            null
          : "No courier",
      [COURIER_ID_KEY]: (value) =>
        value
          ? deliveryManOptions.find((item) => item.value === value)?.text ||
            null
          : "No courier",
    }),

    [deliveryManOptions]
  );

  useEffect(() => {
    document.body.scrollIntoView();
    const defaultMomentToDate = router.query.to_delivery
      ? moment(router.query.to_delivery, "YYYY-MM-DD")
      : moment();
    const defaultMomentFromDate = router.query.from_delivery
      ? moment(router.query.from_delivery, "YYYY-MM-DD")
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
    setSelectedDeliveryRange({
      from: defaultFromDate,
      to: defaultToDate,
    });
    setTimeout(() => {
      _getAdminOrders(
        {
          ...router.query,
          page: page + 1,
          page_size: pageSize,
          delivery_company: router?.query?.delivery_company || "all",
        },
        ""
      );
      _getOrderAggregate({
        ...router.query,
        delivery_company: router?.query?.delivery_company || "all",
      });
    }, 0);
  }, [page, pageSize, JSON.stringify(router.query)]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(0);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 0, page_size: event.target.value },
    });
  };
  const params = new URLSearchParams(router.query);
  const exportCSVEndpoint = useMemo(
    () =>
      `${BASE_URL_V2}shopping-orders/delivery/export/csv/?page=${
        page + 1
      }&page_size=${pageSize}&domain=${siteDomain}&${params.toString()}`,
    [page, pageSize, siteDomain, params]
  );
  return (
    <div>
      <Head>
        <title>Courier records</title>
      </Head>

      <div className="container">
        <AdminBreadCrumb isLoading={isLoading} responsive={false} />
      </div>
      <div className="container mt-3">
        <Paper>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="ml-2  d-flex align-items-center">
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
                      formatDateObjectToNormal(selectedDeliveryRange.from)
                    )}
                  </span>
                  until the{" "}
                  <span className="px-2">
                    {englishNumberToPersianNumber(
                      formatDateObjectToNormal(selectedDeliveryRange.to)
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
                      selectedDayRange={selectedDeliveryRange}
                      setSelectedDayRange={setSelectedDeliveryRange}
                      submitDate={() => {
                        const query = { ...router.query };
                        if (selectedDeliveryRange.from)
                          query[DELIVERY_FROM_DATE] = persianToEnglishNumber(
                            moment(
                              formatDateObjectToNormal(
                                selectedDeliveryRange.from
                              ),
                              "jYYYY-jM-jD"
                            ).format("YYYY-M-D")
                          );
                        else delete query[DELIVERY_FROM_DATE];
                        if (selectedDeliveryRange.to)
                          query[DELIVERY_TO_DATE] = persianToEnglishNumber(
                            moment(
                              formatDateObjectToNormal(
                                selectedDeliveryRange.to
                              ),
                              "jYYYY-jM-jD"
                            ).format("YYYY-M-D")
                          );
                        else delete query[DELIVERY_TO_DATE];
                        router.push({
                          pathname: router.pathname,
                          query,
                        });
                      }}
                    />
                  </div>
                </Popover>
              </div>

              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: 4,
                  textAlign: "center",
                  padding: "6px 0",
                  width: 120,
                }}
                className="mx-2"
              >
                <span style={{ color: "#d4d6d7" }} className="ml-2">
                  start time
                </span>
                <TimeField
                  value={startTime || "00:00"}
                  onChange={(e) => {
                    const newStartTime = e.target.value;
                    setStartTime(newStartTime);
                  }}
                />
              </div>
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: 4,
                  textAlign: "center",
                  padding: "6px 0",
                  width: 120,
                }}
              >
                <span style={{ color: "#d4d6d7" }} className="ml-2">
                  The end time
                </span>
                <TimeField
                  value={endTime || "00:00"}
                  onChange={(e) => {
                    const newEndTime = e.target.value;
                    setEndTime(newEndTime);
                  }}
                />
              </div>
              <MaterialSelect
                FormControlProps={{
                  style: {
                    width: 80,
                    flexShrink: 0,
                    marginRight: 10,
                  },
                }}
                className="small ml-2 pr-0 direction-ltr"
                inputProps={{
                  className: "text-center ml-minus-2",
                }}
                IconComponent={() => null}
                options={paymentTypeOptions}
                selectOption={(text) => {
                  const query = { ...router.query };
                  const keyword = paymentTypeOptions.find(
                    (i) => i.text === text
                  ).keyword;
                  if (keyword) query[PAYMENT_TYPE_QUERY_KEY] = keyword;
                  else delete query[PAYMENT_TYPE_QUERY_KEY];
                  router.push({
                    pathname: router.pathname,
                    query,
                  });
                }}
                inputData={{
                  defaultValue: "payment type",
                }}
                selected={paymentTypeOptions.find((i) => {
                  return (
                    i.keyword ===
                    (router.query[PAYMENT_TYPE_QUERY_KEY]
                      ? router.query[PAYMENT_TYPE_QUERY_KEY]
                      : paymentTypeOptions[0].keyword)
                  );
                })}
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
              <MaterialSelect
                FormControlProps={{
                  style: {
                    width: 80,
                    flexShrink: 0,
                  },
                }}
                className="small ml-2 pr-0 direction-ltr"
                inputProps={{
                  className: "text-center ml-minus-2",
                }}
                IconComponent={() => null}
                options={deliveryManOptions}
                selectOption={(text) => {
                  const query = { ...router.query };
                  const value = deliveryManOptions.find(
                    (i) => i.text === text
                  ).value;
                  if (value || value === "null") {
                    if (deliveryCompaniesType[value]) {
                      query.delivery_company = value;
                      delete query.courier;
                    } else {
                      query.courier = value;
                      delete query.delivery_company;
                    }
                  } else {
                    delete query.delivery_company;

                    delete query.courier;
                  }

                  router.push({
                    pathname: router.pathname,
                    query,
                  });
                }}
                inputData={{
                  defaultValue: "Courier type",
                }}
                selected={deliveryManOptions?.find((i) => {
                  return (
                    i.value ===
                    (router.query.delivery_company
                      ? router.query.delivery_company
                      : router.query.courier
                      ? router.query.courier
                      : deliveryManOptions[0].value)
                  );
                })}
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
            <Button
              variant="contained"
              color="primary"
              className="u-box-shadow-none u-fontMedium"
              size="large"
              onClick={() =>
                downloaderRequest("Peaks", exportCSVEndpoint, user.token)
              }
              style={{ direction: "ltr" }}
            >
              Output
            </Button>
          </div>
          <div className=" d-flex flex-wrap px-4">
            {Object.entries(router.query).map(([key, value]) => {
              if (key in QUERY_KEYS_LABELS && value?.length)
                return (
                  <Chip
                    deleteIcon={
                      <ClearRoundedIcon
                        style={{ color: theme.palette.text.disabled }}
                      />
                    }
                    style={{
                      borderRadius: 4,
                      background: theme.palette.background.secondary,
                    }}
                    className="ml-2 mb-2"
                    onDelete={() => {
                      const query = { ...router.query };
                      delete query[key];
                      delete query.page;
                      router.push({ pathname: router.pathname, query });
                    }}
                    label={QUERY_KEYS_LABELS[key](
                      QUERY_KEYS_LABELS_CONVERTER[key](value)
                    )}
                  />
                );
            })}

            {startTime?.length ? (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                }}
                className="ml-2 mb-2"
                onDelete={() => {
                  setStartTime(null);
                }}
                label={QUERY_KEYS_LABELS[START_TIME](startTime)}
              />
            ) : null}

            {endTime?.length ? (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                }}
                className="ml-2 mb-2"
                onDelete={() => {
                  setEndTime(null);
                }}
                label={QUERY_KEYS_LABELS[END_TIME](endTime)}
              />
            ) : null}
          </div>
          <TableContainer
            className="mt-3 purchase-by-order-table"
            style={{ maxHeight: 500, backgroundColor: "#E4E6E7" }}
          >
            <Table
              aria-labelledby="tableTitle"
              size="small"
              aria-label="enhanced table"
              style={{
                borderCollapse: "separate",
                borderSpacing: 1,
              }}
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
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableBody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <TableRow style={{ height: 53 }} key={item}>
                      {headCells.map((cell, index) => (
                        <TableCell
                          style={{ minWidth: index === 1 ? 150 : "unset" }}
                          key={cell.id}
                        >
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
                <TableBody style={{ backgroundColor: "#fff" }}>
                  {orders?.map((order, index) => (
                    <TableRow key={order.id}>
                      <TableCell align="center">
                        {" "}
                        {englishNumberToPersianNumber(index + 1)}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {order?.user_address?.name}
                      </TableCell>
                      <TableCell align="center">
                        {englishNumberToPersianNumber(
                          order?.user_address?.phone
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {order?.user_address?.address}
                      </TableCell>
                      <TableCell align="center">
                        {moment(order?.first_delivery_time).format(
                          "jYYYY/jMM/jDD | HH:mm"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {order?.deliverer_name ||
                          order?.courier ||
                          deliveryCompaniesType[
                            order?.delivery_companies_data?.company_type
                          ]?.label}
                      </TableCell>
                      {/* <TableCell
                        align="center"
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: 45 }}
                      >
                        {order?.payment_type &&
                        Object.keys(order?.payment_type).length !== 0
                          ? order?.payment_type?.map((payment) => (
                              <div
                                className="mx-1"
                                style={{
                                  borderRadius: 20,
                                  fontWeight: 400,
                                  backgroundColor: "#E4E5E7",
                                  padding: "4px 12px",
                                  width: "fit-content",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {
                                  paymentTypeOptions.find(
                                    (option) => option.keyword == payment
                                  )?.text
                                }
                              </div>
                            ))
                          : "unpaid"}
                      </TableCell> */}
                      <TableCell
                        align="center"
                        style={{
                          color: theme.palette.primary.main,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          router.push(
                            `${urlPrefix}${SHOPPING_PLUGIN_URL}/orders/${order.id}`
                          )
                        }
                      >
                        {englishNumberToPersianNumber(order?.order_id)}
                      </TableCell>
                      <TableCell align="center">
                        {priceFormatter(order?.total_price)}
                      </TableCell>
                      <TableCell align="center">
                        {priceFormatter(order?.paid_price)}
                      </TableCell>
                      {/* <TableCell align="center">
                        {priceFormatter(order?._
                          delivery_price)}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              )}
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
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={pagination.count}
            rowsPerPage={pageSize}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            SelectProps={{
              renderValue: () => englishNumberToPersianNumber(pageSize),
              IconComponent: ArrowDropDownRoundedIcon,
            }}
            ActionsComponent={({ count, page, rowsPerPage, onChangePage }) => (
              <div className="">
                <IconButton
                  onClick={(event) => {
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, page: page - 1 },
                    });
                    onChangePage(event, page - 1);
                  }}
                  disabled={page === 0}
                  aria-label="previous page"
                >
                  <KeyboardArrowRight />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, page: page + 1 },
                    });
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
          <div
            className="w-100 mt-4 p-4 d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#F1F2F3", borderRadius: 4 }}
          >
            <span style={{ fontWeight: 500, color: "#202223", fontSize: 14 }}>
              total:
            </span>
            <div className="d-flex">
              <div
                style={{
                  minWidth: 89,
                  height: 40,
                  borderRadius: 4,
                  backgroundColor: "#E4E5E7",
                  margin: "0 40px",
                }}
                className="d-flex align-items-center justify-content-center px-4 "
              >
                {priceFormatter(orderAggregate?.total_final_price || 0)}
              </div>
              <div
                style={{
                  minWidth: 89,
                  height: 40,
                  borderRadius: 4,
                  backgroundColor: "#E4E5E7",
                  margin: "0 40px",
                }}
                className="d-flex align-items-center justify-content-center px-4"
              >
                {priceFormatter(orderAggregate?.total_delivery_price || 0)}
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
  pagination: makeSelectShoppingAdminOrdersPagination(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  adminOrders: makeSelectShoppingAdminOrders(),
  branches: makeSelectBranches(),
  pluginsData: makeSelectPlugins(),
  orderAggregate: makeSelectOrderAggregate(),
  user: makeSelectUser(),
  siteDomain: makeSelectSiteDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setPluginData: (plugin, data) => dispatch(setPluginData(plugin, data)),
    _getAdminOrders: (params, siteDomain) =>
      dispatch(getShoppingAdminOrders(params, siteDomain)),
    _getOrderAggregate: (data) => dispatch(getShopingOrderAggregate(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminCouriersRecords);
