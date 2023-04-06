import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import {
  makeSelectPOSDevices,
  makeSelectShoppingAdminOrders,
  makeSelectShoppingAdminOrdersPagination,
} from "store/selectors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { exportPDFFromHTML } from "@saas/utils/helpers/exportPDFFromHTML";

import { downloaderRequest } from "@saas/utils/helpers/downloaderRequest";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Popover from "@material-ui/core/Popover";
import CloseIcon from "@material-ui/icons/Close";

import {
  makeSelectBranches,
  makeSelectBusiness,
  makeSelectBusinessSiteDomain,
} from "@saas/stores/business/selector";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
  makeSelectAdminUrlPrefix,
  makeSelectDeliveryTypesWithoutPagination,
  makeSelectPlugin,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  addShopingNote,
  assignDeliveryMan,
  getPosDevices,
  getShoppingAdminOrders,
} from "store/actions";
import AdminOrdersTable from "./AdminOrdersTable";

import {
  BASE_PLUGIN,
  BRANCHES_PLUGIN_URL,
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import LocationSelector from "components/LocationSelector";
import useTheme from "@material-ui/core/styles/useTheme";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Input from "@saas/components/Input";
import MaterialSelect from "@saas/components/Select/MaterialSelect";
import Chip from "@material-ui/core/Chip";
import { useRouter } from "next/router";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import moment from "moment-jalaali";
import DateRangePickerWrapper from "@saas/components/DateRangePickerWrapper";
import { paymentTypeOptions } from "store/constants";
import "react-dates/initialize";
import { mockOrder } from "containers/AdminShopping/constants";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { BASE_URL_V2 } from "@saas/utils/api";
import { makeSelectUser } from "@saas/stores/user/selector";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import uniqueId from "lodash/uniqueId";
import {
  BRANCH_QUERY_KEY,
  COLUMNS_QUERY_KEY,
  deliverer_companies_dict,
  DELIVERY_COMPANY_QUERY_KEY,
  DELIVERY_TYPE,
  DOMAIN_QUERY_KEY,
  FROM_DATE_QUERY_KEY,
  FROM_DELIVERY_QUERY_KEY,
  HAS_PAGINATE_QUERY_KEY,
  headCells,
  IS_EDITED_ORDER_QUERY_KEY,
  ORDER_STATUS_QUERY_KEY,
  ORDERING_QUERY_KEY,
  orderStatus,
  PAGE_QUERY_KEY,
  PAGE_SIZE_QUERY_KEY,
  PAYMENT_STATE_QUERY_KEY,
  PAYMENT_TYPE_QUERY_KEY,
  paymentStatusOptions,
  pdf,
  SALES_CHANNEL_QUERY_KEY,
  SEARCH_QUERY_KEY,
  SITE_DOMAIN_QUERY_KEY,
  sortingOptions,
  TO_DATE_QUERY_KEY,
  TO_DELIVERY_QUERY_KEY,
  SUBMITTER_DEVICE,
} from "./constants";
import { submitOrderAdmin } from "@saas/plugins/Shopping/actions";
import { makeSelectOrderInfo } from "@saas/plugins/Shopping/selectors";
import { FULFILLMENT_ON_BUSINESS_SITE } from "@saas/plugins/Shopping/constants";
import { getDeliveryTypesWithoutPagination } from "@saas/stores/plugins/actions";
import SubmitFactor from "./submitFactor";
import { DOBARE_WEBAPP_CONSTANT } from "@saas/utils/constants";
import { formatDateObjectToNormal } from "../../../../utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";

moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const StyledMenu = withStyles({
  paper: {
    width: 110,
  },
})((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    style={{ width: "100%" }}
    {...props}
  />
));
let searchTimeoutId = null;
let branchesTimeoutId = null;
let getAdminOrderTimeoutId = null;
let columnsTimeoutId = null;
let orderStatusTimeoutId = null;
let paymentStatusTimeoutId = null;
let courierTimeoutId = null;
let salesChannelTimeoutId = null;
let deliveryTypeTimeoutId = null;
let isEditedOrdersTimeoutId = null;

export function AdminOrders({
  adminOrders: orders,
  _getAdminOrders,
  pagination,
  loading,
  _getDevices,
  devices,
  business,
  pluginsData,
  urlPrefix,
  plugin = SHOPPING_PLUGIN,
  branches: businessBranches,
  isSuper = false,
  user,
  siteDomain,
  pluginData,
  dispatch,
  _assignDeliveryMan,
  _addNote,
  _submitOrderAdmin,
  BasePluginData,
  _getDeliveryTypesWithoutPagination,
  deliveryTypesWithoutPagination,
}) {
  const salesChannels = BasePluginData?.salesChannels;
  const salesChannelOptions = useMemo(() => {
    if (salesChannels) {
      return Object.entries(salesChannels).map(([key, value]) => ({
        id: key,
        keyword: key,
        text: value?.name,
      }));
    } else {
      return [];
    }
  }, [salesChannels]);
  const { maxWidth768 } = useResponsive();
  const router = useRouter();
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });
  const [selectedDeliveryDayRange, setSelectedDeliveryDayRange] = useState({
    from: null,
    to: null,
  });
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelivery, setOpenModalDelivery] = useState(false);
  const handleCloseModalDelivery = () => setOpenModalDelivery(false);
  const handleOpenModalDelivery = () => setOpenModalDelivery(true);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;
  const [mockOrderStatus, setMockOrderStatus] = useState(null);
  const pluginUrl = pluginsData[plugin].plugin_url;
  const branches = businessBranches.filter((b) => b.site_domain);
  const [isEditedOrders, setIsEditedOrders] = useState(
    router?.query[IS_EDITED_ORDER_QUERY_KEY]
  );

  const [selectedOrderStatus, selectOrderStatus] = useState(
    typeof router?.query[ORDER_STATUS_QUERY_KEY] === "undefined"
      ? orderStatus.map((status) => +status.status)
      : Array.isArray(router?.query[ORDER_STATUS_QUERY_KEY])
      ? router?.query[ORDER_STATUS_QUERY_KEY]?.map((status) => +status)
      : [+router?.query[ORDER_STATUS_QUERY_KEY]]
  );

  const [selectedSubmittedDevice, setSelectedSubmitterDevice] = useState(
    typeof router?.query[SUBMITTER_DEVICE] === "undefined"
      ? []
      : Array.isArray(router?.query[SUBMITTER_DEVICE])
      ? router?.query[SUBMITTER_DEVICE]?.map((status) => +status)
      : [+router?.query[SUBMITTER_DEVICE]]
  );

  const [selectedPaymentStatus, selectPaymentStatus] = useState(
    typeof router?.query[PAYMENT_STATE_QUERY_KEY] === "undefined"
      ? paymentStatusOptions.map((status) => +status.value)
      : Array.isArray(router?.query[PAYMENT_STATE_QUERY_KEY])
      ? router?.query[PAYMENT_STATE_QUERY_KEY]?.map((status) => +status)
      : [+router?.query[PAYMENT_STATE_QUERY_KEY]]
  );

  const [selectedColumns, selectColumns] = useState(
    typeof router?.query[COLUMNS_QUERY_KEY] === "undefined"
      ? headCells
          .filter((column) => column.defaultVisibility)
          .map((column) => column.id)
      : Array.isArray(router?.query[COLUMNS_QUERY_KEY])
      ? router?.query[COLUMNS_QUERY_KEY]?.map((column) => column)
      : [router?.query[COLUMNS_QUERY_KEY]]
  );
  const [selectedBranchCouriers, setSelectedBranchCouriers] = useState(null);

  const _couriers = selectedBranchCouriers
    ? Object.entries(selectedBranchCouriers)?.map(([courier_id, courier]) => {
        return { id: uniqueId(), text: courier.name, value: courier_id };
      })
    : [];

  const _deliverer_companies =
    Object.keys(
      pluginsData[plugin]?.deliverer_companies || {
        alopeyk_api_token: true,
        miare_api_token: true,
        personal_api_token: true,
      }
    ).map((deliverer, index) => ({
      id: index + 1,
      text: deliverer_companies_dict[deliverer]?.label,
      value: deliverer_companies_dict[deliverer]?.value,
    })) || [];
  const deliveryManOptions = [
    ..._couriers,
    ..._deliverer_companies,
    { text: "No courier", id: 100, value: "null" },
  ];

  const [selectedCourierCompany, selectCourierCompany] = useState(
    typeof router?.query[DELIVERY_COMPANY_QUERY_KEY] === "undefined"
      ? deliveryManOptions.map((courier) => courier.value)
      : Array.isArray(router?.query[DELIVERY_COMPANY_QUERY_KEY])
      ? router?.query[DELIVERY_COMPANY_QUERY_KEY]?.map((courier) => courier)
      : [router?.query[DELIVERY_COMPANY_QUERY_KEY]]
  );
  const [selectedSalesChannel, selectSalesChannel] = useState(
    typeof router?.query[SALES_CHANNEL_QUERY_KEY] === "undefined"
      ? salesChannelOptions.map((option) => option.keyword)
      : Array.isArray(router?.query[SALES_CHANNEL_QUERY_KEY])
      ? router?.query[SALES_CHANNEL_QUERY_KEY]?.map((channel) => channel)
      : [+router?.query[SALES_CHANNEL_QUERY_KEY]]
  );
  const [selectedDeliveryType, selectDelvieryType] = useState(
    typeof router?.query[DELIVERY_TYPE] === "undefined"
      ? deliveryTypesWithoutPagination?.map((deliveryType) => +deliveryType.id)
      : Array.isArray(router?.query[DELIVERY_TYPE])
      ? router?.query[DELIVERY_TYPE]?.map((deliveryType) => +deliveryType)
      : [router?.query[DELIVERY_TYPE]]
  );

  useEffect(() => {
    selectDelvieryType(
      deliveryTypesWithoutPagination?.map((deliveryType) => +deliveryType.id)
    );
  }, [deliveryTypesWithoutPagination]);

  const [selectedBranch, setSelectedBranch] = useState(
    isSuper
      ? router?.query?.[BRANCH_QUERY_KEY] || branches?.[0]?.site_domain || ""
      : ""
  );
  const theme = useTheme();
  const [page, setPage] = useState(+router.query.page || 0);
  const [pageSize, setPageSize] = useState(+router.query.page_size || 25);

  const getAdminOrdersQuery = useMemo(() => {
    const query = { ...router.query };
    delete query[COLUMNS_QUERY_KEY];
    return query;
  }, [JSON.stringify(router.query)]);

  const actionForShouldUpdateListInAssignDelivery = useMemo(() => {
    return {
      data: { ...getAdminOrdersQuery, page: page + 1, page_size: pageSize },
      domain: selectedBranch,
    };
  }, [page, pageSize, JSON.stringify(getAdminOrdersQuery), selectedBranch]);

  useEffect(() => {
    if (loading) {
      const orderListWrapper = document.getElementById(`admin-order-table`);
      orderListWrapper.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [page, loading]);

  useEffect(() => {
    const defaultMomentToDate = router.query[TO_DATE_QUERY_KEY]
      ? moment(router.query[TO_DATE_QUERY_KEY], "YYYY-MM-DD")
      : null;
    const defaultMomentFromDate = router.query[FROM_DATE_QUERY_KEY]
      ? moment(router.query[FROM_DATE_QUERY_KEY], "YYYY-MM-DD")
      : null;
    if (defaultMomentFromDate && defaultMomentToDate) {
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
    }
    const defaultDeliveryMomentToDate = router.query[TO_DELIVERY_QUERY_KEY]
      ? moment(router.query[TO_DELIVERY_QUERY_KEY], "YYYY-MM-DD")
      : null;
    const defaultDeliveryMomentFromDate = router.query[FROM_DELIVERY_QUERY_KEY]
      ? moment(router.query[FROM_DELIVERY_QUERY_KEY], "YYYY-MM-DD")
      : null;
    if (defaultDeliveryMomentToDate && defaultDeliveryMomentFromDate) {
      const defaultDeliveryFromDate = {
        year: defaultDeliveryMomentFromDate.jYear(),
        month: defaultDeliveryMomentFromDate.jMonth() + 1,
        day: defaultDeliveryMomentFromDate.jDate(),
      };
      const defaultDeliveryToDate = {
        year: defaultDeliveryMomentToDate.jYear(),
        month: defaultDeliveryMomentToDate.jMonth() + 1,
        day: defaultDeliveryMomentToDate.jDate(),
      };
      setSelectedDeliveryDayRange({
        from: defaultDeliveryFromDate,
        to: defaultDeliveryToDate,
      });
    }
    clearTimeout(getAdminOrderTimeoutId);
    document.body.scrollIntoView({
      behavior: "smooth",
    });
    const query = {};
    const allowedKeys = [
      HAS_PAGINATE_QUERY_KEY,
      DOMAIN_QUERY_KEY,
      FROM_DELIVERY_QUERY_KEY,
      TO_DELIVERY_QUERY_KEY,
      SITE_DOMAIN_QUERY_KEY,
      FROM_DATE_QUERY_KEY,
      TO_DATE_QUERY_KEY,
      ORDER_STATUS_QUERY_KEY,
      SEARCH_QUERY_KEY,
      SALES_CHANNEL_QUERY_KEY,
      ORDERING_QUERY_KEY,
      DELIVERY_COMPANY_QUERY_KEY,
      DELIVERY_TYPE,
      PAYMENT_TYPE_QUERY_KEY,
      IS_EDITED_ORDER_QUERY_KEY,
      PAGE_QUERY_KEY,
      PAGE_SIZE_QUERY_KEY,
      PAYMENT_STATE_QUERY_KEY,
      SUBMITTER_DEVICE,
    ];
    allowedKeys.forEach((queryKey) => {
      if (getAdminOrdersQuery[queryKey])
        query[queryKey] = getAdminOrdersQuery[queryKey];
    });
    getAdminOrderTimeoutId = setTimeout(() => {
      _getAdminOrders(
        {
          ...query,
          [PAGE_QUERY_KEY]: Number(query[PAGE_QUERY_KEY] || 0) + 1,
        },
        selectedBranch
      );
    }, 500);
  }, [page, pageSize, JSON.stringify(getAdminOrdersQuery)]);
  useEffect(() => {
    setMockOrderStatus(null);
    setTimeout(() => {
      setMockOrderStatus(
        parseInt(localStorage.getItem("mockOrderStatus") || 0)
      );
    }, 100);
  }, [selectedOrderStatus]);

  useEffect(() => {
    const selectedBranchBusinessData = business?.branches?.find(
      (business) => business.site_domain === selectedBranch
    );
    setSelectedBranchCouriers(
      isSuper
        ? selectedBranchBusinessData.plugins_config.shopping.data.couriers
        : pluginData?.data?.couriers
    );
  }, [selectedBranch, isSuper, pluginData]);

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
  const inputRef = useRef(null);
  const [search, setSearch] = useState(router.query.search);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      _getDevices();
    }, 0);
  }, []);

  useEffect(() => {
    const businessSlug = isSuper
      ? businessBranches?.find((branch) => branch.id === selectedBranch)?.slug
      : null;
    setTimeout(() => {
      _getDeliveryTypesWithoutPagination(SHOPPING_PLUGIN, businessSlug);
    }, 0);
  }, [selectedBranch]);

  const queries = { ...router.query };
  delete queries[DELIVERY_COMPANY_QUERY_KEY];
  delete queries[ORDER_STATUS_QUERY_KEY];
  delete queries[PAYMENT_STATE_QUERY_KEY];
  delete queries[SALES_CHANNEL_QUERY_KEY];
  const params = new URLSearchParams(queries);

  const PDFConfigs = useMemo(() => {
    return typeof pdf === "function"
      ? pdf({
          business,
          branches: [business.revised_title],
          from_date: null,
          to_date: null,
        })
      : {};
  }, [business]);

  const exportSimpleCSVEndpoint = useMemo(
    () =>
      `${BASE_URL_V2}shopping-orders/export/?page=${
        page + 1
      }&page_size=${pageSize}&domain=${
        isSuper ? selectedBranch : siteDomain
      }&${params.toString()}&${selectedSalesChannel
        .map((sl) => `sales_channel=${sl}`)
        .join("&")}&${selectedOrderStatus
        .map((os) => `status=${os}`)
        .join("&")}&${selectedCourierCompany
        .map((c) => `delivery_company=${c}`)
        .join("&")}&${selectedPaymentStatus
        .map((ps) => `payment_status=${ps}`)
        .join("&")}`,
    [
      page,
      pageSize,
      selectedBranch,
      params,
      selectedSalesChannel,
      selectedOrderStatus,
      selectedCourierCompany,
      selectedPaymentStatus,
    ]
  );
  const exportSimpleExcelEndpoint = useMemo(
    () =>
      `${BASE_URL_V2}shopping-orders/export/?export_format=excel&page=${
        page + 1
      }&page_size=${pageSize}&domain=${
        isSuper ? selectedBranch : siteDomain
      }&${params.toString()}&${selectedSalesChannel
        .map((sl) => `sales_channel=${sl}`)
        .join("&")}&${selectedOrderStatus
        .map((os) => `status=${os}`)
        .join("&")}&${selectedCourierCompany
        .map((c) => `delivery_company=${c}`)
        .join("&")}&${selectedPaymentStatus
        .map((ps) => `payment_status=${ps}`)
        .join("&")}`,
    [
      page,
      pageSize,
      selectedBranch,
      params,
      selectedSalesChannel,
      selectedOrderStatus,
      selectedCourierCompany,
      selectedPaymentStatus,
    ]
  );
  const exportFullCSVEndpoint = useMemo(
    () =>
      `${BASE_URL_V2}shopping-orders/details/export/?page=${
        page + 1
      }&page_size=${pageSize}&domain=${
        isSuper ? selectedBranch : siteDomain
      }&${params.toString()}&${selectedSalesChannel
        .map((sl) => `sales_channel=${sl}`)
        .join("&")}&${selectedOrderStatus
        .map((os) => `status=${os}`)
        .join("&")}&${selectedCourierCompany
        .map((c) => `delivery_company=${c}`)
        .join("&")}&${selectedPaymentStatus
        .map((ps) => `payment_status=${ps}`)
        .join("&")}`,
    [
      page,
      pageSize,
      selectedBranch,
      params,
      selectedSalesChannel,
      selectedOrderStatus,
      selectedCourierCompany,
      selectedPaymentStatus,
    ]
  );
  const exportFullExelEndpoint = useMemo(
    () =>
      `${BASE_URL_V2}shopping-orders/details/export/?export_format=excel&page=${
        page + 1
      }&page_size=${pageSize}&domain=${
        isSuper ? selectedBranch : siteDomain
      }&${params.toString()}&${selectedSalesChannel
        .map((sl) => `sales_channel=${sl}`)
        .join("&")}&${selectedOrderStatus
        .map((os) => `status=${os}`)
        .join("&")}&${selectedCourierCompany
        .map((c) => `delivery_company=${c}`)
        .join("&")}&${selectedPaymentStatus
        .map((ps) => `payment_status=${ps}`)
        .join("&")}`,
    [
      page,
      pageSize,
      selectedBranch,
      params,
      selectedSalesChannel,
      selectedOrderStatus,
      selectedCourierCompany,
      selectedPaymentStatus,
    ]
  );

  return (
    <div className="container pb-3">
      <div
        className={
          process.env.NEXT_PUBLIC_APP_NAME === DOBARE_WEBAPP_CONSTANT
            ? `d-flex justify-content-between align-items-center`
            : ""
        }
      >
        <div
          style={{
            width: `${
              process.env.NEXT_PUBLIC_APP_NAME === DOBARE_WEBAPP_CONSTANT
                ? "100%"
                : null
            }`,
          }}
        >
          {process.env.NEXT_PUBLIC_APP_NAME === DOBARE_WEBAPP_CONSTANT ? (
            <AdminBreadCrumb
              submitButtonText="Quick order registration"
              size="large"
              style={{ direction: "ltr", whiteSpace: "nowrap", height: 36 }}
              submitAction={() => {
                router.push(`${urlPrefix}s/orders?submit_factor=true`);
              }}
            />
          ) : (
            <AdminBreadCrumb
              submitButtonText="Register a new order"
              submitButtonHasPlus
              submitAction={() => {
                const callback = (orderId) => {
                  router.push(
                    `${urlPrefix}${pluginUrl}/orders/${orderId}/edit?business=${
                      isSuper ? selectedBranch : siteDomain
                    }`
                  );
                };
                _submitOrderAdmin(
                  {
                    business_id: isSuper
                      ? branches?.find(
                          (branch) => branch.site_domain === selectedBranch
                        ).id
                      : business?.id,
                    order_items: [],
                    delivery_site_type:
                      FULFILLMENT_ON_BUSINESS_SITE.toLowerCase(),
                  },
                  callback
                );
              }}
              helpVideo={{
                url: ADMIN_HELP_VIDEOS.orders.url,
                title: "Orders",
              }}
            />
          )}
        </div>
      </div>
      <Paper elevation={1} className="mt-3">
        {isSuper && branches?.length ? (
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
            items={branches.map((branch) => ({
              title: branch.title,
              value: branch.site_domain,
            }))}
          />
        ) : null}
        <div className="d-flex align-items-center justify-content-between px-3">
          <Input
            size="small"
            inputRef={inputRef}
            value={search}
            fullWidth={false}
            onChange={(search) => {
              setSearch(search);
              clearTimeout(searchTimeoutId);
              const query = { ...router.query };
              delete query[SEARCH_QUERY_KEY];
              delete query.page;
              if (search) {
                query[SEARCH_QUERY_KEY] = search;
              }
              searchTimeoutId = setTimeout(() => {
                router.push({
                  pathname: router.pathname,
                  query,
                });
              }, 500);
            }}
            className="mt-3"
            placeholder="Customer Search"
            inputProps={{
              className: "pr-5 mr-2",
            }}
            InputProps={{
              startAdornment: (
                <>
                  {router.query.search ? (
                    <InputAdornment
                      style={{ position: "absolute", left: 3 }}
                      className="u-cursor-pointer"
                      position="start"
                      onClick={() => {
                        setSearch("");
                        const query = { ...router.query };
                        delete query.search;
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
          <div style={{ marginInlineStart: "auto" }} className="mt-3">
            <Button
              variant="contained"
              color="primary"
              className="u-box-shadow-none u-fontMedium"
              size="large"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              startIcon={<KeyboardArrowDownRoundedIcon />}
              style={{ direction: "ltr" }}
            >
              Output
            </Button>
            <StyledMenu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                className="px-2 "
                onClick={() => {
                  setAnchorEl(null);
                  downloaderRequest(
                    "Recommendations",
                    exportSimpleCSVEndpoint,
                    user.token
                  );
                }}
              >
                <ListItemText
                  primary="DownloadCSV Simple"
                  className="text-center "
                />
              </MenuItem>
              <MenuItem
                className="px-2 "
                onClick={() => {
                  setAnchorEl(null);
                  downloaderRequest(
                    "Recommendations",
                    exportSimpleExcelEndpoint,
                    user.token
                  );
                }}
              >
                <ListItemText
                  primary="DownloadExcel Simple"
                  className="text-center "
                />
              </MenuItem>
              <MenuItem
                className="px-2"
                onClick={() => {
                  setAnchorEl(null);
                  downloaderRequest(
                    "Recommendations",
                    exportFullCSVEndpoint,
                    user.token
                  );
                }}
              >
                <ListItemText
                  primary="DownloadCSV Full"
                  className="text-center "
                />
              </MenuItem>
              <MenuItem
                className="px-2"
                onClick={() => {
                  setAnchorEl(null);
                  downloaderRequest(
                    "Recommendations",
                    exportFullExelEndpoint,
                    user.token
                  );
                }}
              >
                <ListItemText
                  primary="DownloadExcel Full"
                  className="text-center "
                />
              </MenuItem>
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
                        landscape: true,
                      },
                    },
                    "report.pdf"
                  );
                }}
              >
                PDF
              </MenuItem>
            </StyledMenu>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-between px-3 mt-3">
          <div className="d-flex align-items-center mb-3">
            <Select
              className=" ml-2"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedColumns}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (selectedColumns.length === 0)
                  return "Select the table columns";
                if (selectedColumns.length === 1 && selectedColumns[0])
                  return headCells.find(
                    (column) => column.id == selectedColumns[0]
                  ).title;
                if (selectedColumns.length === headCells.length)
                  return "All columns";
                return `${englishNumberToPersianNumber(
                  selectedColumns.length
                )} column`;
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
              <MenuItem
                className="px-2"
                onClick={() => {
                  if (selectedColumns.length) {
                    selectColumns([]);
                    clearTimeout(columnsTimeoutId);
                    const query = { ...router.query };
                    delete query[COLUMNS_QUERY_KEY];
                    columnsTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  } else {
                    selectColumns(headCells.map((b) => b.id));
                    clearTimeout(columnsTimeoutId);
                    const query = { ...router.query };
                    delete query[COLUMNS_QUERY_KEY];
                    query[COLUMNS_QUERY_KEY] = headCells.map((b) => b.id);
                    columnsTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }
                }}
              >
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedColumns.length !== headCells.length &&
                    selectedColumns.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  color="primary"
                  checked={selectedColumns.length === headCells.length}
                />
                <ListItemText
                  primary="Choosing all columns"
                  className="text-right"
                />
              </MenuItem>
              {headCells.map((column) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${column.id}-${selectedColumns.includes(column.id)}`}
                    value={column.id}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedColumns.includes(column.id)) {
                        selectColumns([...selectedColumns, column.id]);
                        clearTimeout(columnsTimeoutId);
                        const query = { ...router.query };
                        delete query[COLUMNS_QUERY_KEY];
                        query[COLUMNS_QUERY_KEY] = [
                          ...selectedColumns,
                          column.id,
                        ];
                        columnsTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      } else {
                        selectColumns(
                          selectedColumns.filter((id) => id !== column.id)
                        );
                        clearTimeout(columnsTimeoutId);
                        const query = { ...router.query };
                        delete query[COLUMNS_QUERY_KEY];
                        query[COLUMNS_QUERY_KEY] = selectedColumns.filter(
                          (id) => id !== column.id
                        );
                        columnsTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      }
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      color="primary"
                      checked={selectedColumns.includes(column.id)}
                    />
                    <ListItemText
                      primary={column.label}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            <MaterialSelect
              FormControlProps={{
                style: {
                  width: 80,
                  flexShrink: 0,
                },
              }}
              className="small pr-0  direction-ltr"
              inputProps={{
                className: "text-center ml-minus-2",
              }}
              IconComponent={() => null}
              options={sortingOptions}
              menuHeader={
                <div
                  style={{ width: 200, paddingRight: 16 }}
                  className="px-3 u-fontWeightBold u-fontNormal my-1"
                >
                  order by
                </div>
              }
              inputData={{
                defaultValue: "Ordering",
              }}
              selectOption={(text) => {
                const query = { ...router.query };
                const keyword = sortingOptions.find(
                  (i) => i.text === text
                )?.keyword;
                if (keyword) query[ORDERING_QUERY_KEY] = keyword;
                else delete query[ORDERING_QUERY_KEY];
                router.push({
                  pathname: router.pathname,
                  query,
                });
              }}
              selected={sortingOptions.find((i) => {
                return (
                  i.keyword ===
                  (router.query[ORDERING_QUERY_KEY]
                    ? router.query[ORDERING_QUERY_KEY]
                    : sortingOptions[0].keyword)
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
          <div className="d-flex align-items-center mb-3">
            {Object.keys(router.query).length ? (
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
                onClick={() =>
                  (window.location = `${urlPrefix}${
                    isSuper ? BRANCHES_PLUGIN_URL : SHOPPING_PLUGIN_URL
                  }/orders`)
                }
                label="Remove all filters"
              />
            ) : null}
          </div>
        </div>
        <div
          className="px-3 pb-3"
          style={{ overflow: maxWidth768 ? "scroll" : "" }}
        >
          <div
            className={`d-flex align-items-center ${
              maxWidth768 ? "" : "flex-wrap"
            }`}
            style={{ width: maxWidth768 ? "max-content" : "" }}
          >
            <Select
              className=" ml-2 mt-2"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedSubmittedDevice}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (selectedSubmittedDevice.length === 0)
                  return "Select the device";
                if (
                  selectedSubmittedDevice.length === 1 &&
                  selectedSubmittedDevice[0]
                )
                  return devices?.find(
                    (device) => device.id == selectedSubmittedDevice[0]
                  )?.name;
                if (selectedSubmittedDevice.length === devices?.length)
                  return "All devices";
                return `${englishNumberToPersianNumber(
                  selectedSubmittedDevice.length
                )} The device`;
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
              <MenuItem
                className="px-2"
                onClick={() => {
                  if (selectedSubmittedDevice.length) {
                    setSelectedSubmitterDevice([]);
                    clearTimeout(orderStatusTimeoutId);
                    const query = { ...router.query };
                    delete query[SUBMITTER_DEVICE];
                    orderStatusTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  } else {
                    setSelectedSubmitterDevice(devices?.map((b) => b.id));
                    clearTimeout(orderStatusTimeoutId);
                    const query = { ...router.query };
                    delete query[SUBMITTER_DEVICE];
                    query[SUBMITTER_DEVICE] = devices?.map((b) => b.id);
                    orderStatusTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }
                }}
              >
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedSubmittedDevice.length !== devices?.length &&
                    selectedSubmittedDevice.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  color="primary"
                  checked={selectedSubmittedDevice.length === devices?.length}
                />
                <ListItemText
                  primary="The choice of all devices"
                  className="text-right"
                />
              </MenuItem>
              {devices?.map((device) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${device.id}`}
                    value={device.id}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedSubmittedDevice.includes(device.id)) {
                        setSelectedSubmitterDevice([
                          ...selectedSubmittedDevice,
                          device.id,
                        ]);
                        clearTimeout(orderStatusTimeoutId); // check this out
                        const query = { ...router.query };
                        delete query[SUBMITTER_DEVICE];
                        query[SUBMITTER_DEVICE] = [
                          ...selectedSubmittedDevice,
                          device.id,
                        ];
                        orderStatusTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      } else {
                        setSelectedSubmitterDevice(
                          selectedSubmittedDevice.filter(
                            (id) => id !== device.id
                          )
                        );
                        clearTimeout(orderStatusTimeoutId);
                        const query = { ...router.query };
                        delete query[SUBMITTER_DEVICE];
                        query[SUBMITTER_DEVICE] =
                          selectedSubmittedDevice.filter(
                            (id) => id !== device.id
                          );
                        orderStatusTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      }
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      color="primary"
                      checked={selectedSubmittedDevice.includes(device.id)}
                    />
                    <ListItemText
                      primary={device?.name}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            <Select
              className=" ml-2 mt-2"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedOrderStatus}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (selectedOrderStatus.length === 0)
                  return "Select the status of order";
                if (selectedOrderStatus.length === 1 && selectedOrderStatus[0])
                  return orderStatus.find(
                    (status) => status.status == selectedOrderStatus[0]
                  ).title;
                if (selectedOrderStatus.length === orderStatus.length)
                  return "All order status";
                return `${englishNumberToPersianNumber(
                  selectedOrderStatus.length
                )} Order status`;
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
              <MenuItem
                className="px-2"
                onClick={() => {
                  if (selectedOrderStatus.length) {
                    selectOrderStatus([]);
                    clearTimeout(orderStatusTimeoutId);
                    const query = { ...router.query };
                    delete query[ORDER_STATUS_QUERY_KEY];
                    orderStatusTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  } else {
                    selectOrderStatus(orderStatus.map((b) => b.status));
                    clearTimeout(orderStatusTimeoutId);
                    const query = { ...router.query };
                    delete query[ORDER_STATUS_QUERY_KEY];
                    query[ORDER_STATUS_QUERY_KEY] = orderStatus.map(
                      (b) => b.status
                    );
                    orderStatusTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }
                }}
              >
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedOrderStatus.length !== orderStatus.length &&
                    selectedOrderStatus.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  color="primary"
                  checked={selectedOrderStatus.length === orderStatus.length}
                />
                <ListItemText
                  primary="Select all order situations"
                  className="text-right"
                />
              </MenuItem>
              {orderStatus.map((status) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${status.status}-${selectedOrderStatus.includes(
                      status.status
                    )}`}
                    value={status.status}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedOrderStatus.includes(status.status)) {
                        selectOrderStatus([
                          ...selectedOrderStatus,
                          status.status,
                        ]);
                        clearTimeout(orderStatusTimeoutId);
                        const query = { ...router.query };
                        delete query[ORDER_STATUS_QUERY_KEY];
                        query[ORDER_STATUS_QUERY_KEY] = [
                          ...selectedOrderStatus,
                          status.status,
                        ];
                        orderStatusTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      } else {
                        selectOrderStatus(
                          selectedOrderStatus.filter(
                            (id) => id !== status.status
                          )
                        );
                        clearTimeout(orderStatusTimeoutId);
                        const query = { ...router.query };
                        delete query[ORDER_STATUS_QUERY_KEY];
                        query[ORDER_STATUS_QUERY_KEY] =
                          selectedOrderStatus.filter(
                            (id) => id !== status.status
                          );
                        orderStatusTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      }
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      color="primary"
                      checked={selectedOrderStatus.includes(status.status)}
                    />
                    <ListItemText
                      primary={status.title}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            <Select
              className=" ml-2 mt-2"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedPaymentStatus}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (selectedPaymentStatus.length === 0)
                  return "Select the payment status";
                if (
                  selectedPaymentStatus.length === 1 &&
                  selectedPaymentStatus[0]
                )
                  return paymentStatusOptions.find(
                    (status) => status.value == selectedPaymentStatus[0]
                  ).text;
                if (
                  selectedPaymentStatus.length === paymentStatusOptions.length
                )
                  return "All payment status";
                return `${englishNumberToPersianNumber(
                  selectedPaymentStatus.length
                )} Payment status`;
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
              <MenuItem
                className="px-2"
                onClick={() => {
                  if (selectedPaymentStatus.length) {
                    selectPaymentStatus([]);
                    clearTimeout(paymentStatusTimeoutId);
                    const query = { ...router.query };
                    delete query[PAYMENT_STATE_QUERY_KEY];
                    paymentStatusTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  } else {
                    selectPaymentStatus(
                      paymentStatusOptions.map((b) => b.value)
                    );
                    clearTimeout(paymentStatusTimeoutId);
                    const query = { ...router.query };
                    delete query[PAYMENT_STATE_QUERY_KEY];
                    query[PAYMENT_STATE_QUERY_KEY] = paymentStatusOptions.map(
                      (b) => b.value
                    );
                    paymentStatusTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }
                }}
              >
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedPaymentStatus.length !==
                      paymentStatusOptions.length &&
                    selectedPaymentStatus.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  color="primary"
                  checked={
                    selectedPaymentStatus.length === paymentStatusOptions.length
                  }
                />
                <ListItemText
                  primary="Select all payment status"
                  className="text-right"
                />
              </MenuItem>
              {paymentStatusOptions.map((status) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${status.value}-${selectedPaymentStatus.includes(
                      status.value
                    )}`}
                    value={status.value}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedPaymentStatus.includes(status.value)) {
                        selectPaymentStatus([
                          ...selectedPaymentStatus,
                          status.value,
                        ]);
                        clearTimeout(paymentStatusTimeoutId);
                        const query = { ...router.query };
                        delete query[PAYMENT_STATE_QUERY_KEY];
                        query[PAYMENT_STATE_QUERY_KEY] = [
                          ...selectedPaymentStatus,
                          status.value,
                        ];
                        paymentStatusTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      } else {
                        selectPaymentStatus(
                          selectedPaymentStatus.filter(
                            (id) => id !== status.value
                          )
                        );
                        clearTimeout(paymentStatusTimeoutId);
                        const query = { ...router.query };
                        delete query[PAYMENT_STATE_QUERY_KEY];
                        query[PAYMENT_STATE_QUERY_KEY] =
                          selectedPaymentStatus.filter(
                            (id) => id !== status.value
                          );
                        paymentStatusTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      }
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      color="primary"
                      checked={selectedPaymentStatus.includes(status.value)}
                    />
                    <ListItemText
                      primary={status.text}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            <Select
              className=" ml-2 mt-2"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedSalesChannel}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (selectedSalesChannel.length === 0)
                  return "Select the channel";
                if (
                  selectedSalesChannel.length === 1 &&
                  selectedSalesChannel[0]
                )
                  return salesChannelOptions.find(
                    (option) => option.keyword == selectedSalesChannel[0]
                  ).text;
                if (selectedSalesChannel.length === salesChannelOptions.length)
                  return "All channels";
                return `${englishNumberToPersianNumber(
                  selectedSalesChannel.length
                )} Channel`;
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
              <MenuItem
                className="px-2"
                onClick={() => {
                  if (selectedSalesChannel.length) {
                    selectSalesChannel([]);
                    clearTimeout(salesChannelTimeoutId);
                    const query = { ...router.query };
                    delete query[SALES_CHANNEL_QUERY_KEY];
                    salesChannelTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  } else {
                    selectSalesChannel(
                      salesChannelOptions.map((b) => b.keyword)
                    );
                    clearTimeout(salesChannelTimeoutId);
                    const query = { ...router.query };
                    delete query[SALES_CHANNEL_QUERY_KEY];
                    query[SALES_CHANNEL_QUERY_KEY] = salesChannelOptions.map(
                      (b) => b.keyword
                    );
                    salesChannelTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }
                }}
              >
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedSalesChannel.length !==
                      salesChannelOptions.length && selectedSalesChannel.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  color="primary"
                  checked={
                    selectedSalesChannel.length === salesChannelOptions.length
                  }
                />
                <ListItemText
                  primary="Choosing all channels"
                  className="text-right"
                />
              </MenuItem>
              {salesChannelOptions.map((option) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${option.keyword}-${selectedSalesChannel.includes(
                      option.keyword
                    )}`}
                    value={option.keyword}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedSalesChannel.includes(option.keyword)) {
                        selectSalesChannel([
                          ...selectedSalesChannel,
                          option.keyword,
                        ]);
                        clearTimeout(salesChannelTimeoutId);
                        const query = { ...router.query };
                        delete query[SALES_CHANNEL_QUERY_KEY];
                        query[SALES_CHANNEL_QUERY_KEY] = [
                          ...selectedSalesChannel,
                          option.keyword,
                        ];
                        salesChannelTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      } else {
                        selectSalesChannel(
                          selectedSalesChannel.filter(
                            (id) => id !== option.keyword
                          )
                        );
                        clearTimeout(salesChannelTimeoutId);
                        const query = { ...router.query };
                        delete query[SALES_CHANNEL_QUERY_KEY];
                        query[SALES_CHANNEL_QUERY_KEY] =
                          selectedSalesChannel.filter(
                            (id) => id !== option.keyword
                          );
                        salesChannelTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      }
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      color="primary"
                      checked={selectedSalesChannel.includes(option.keyword)}
                    />
                    <ListItemText
                      primary={option.text}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            <Select
              className=" ml-2 mt-2"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedCourierCompany}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (selectedCourierCompany.length === 0)
                  return "Select the courier";
                if (
                  selectedCourierCompany.length === 1 &&
                  selectedCourierCompany[0]
                )
                  return deliveryManOptions.find(
                    (status) => status.value == selectedCourierCompany[0]
                  )?.text;
                if (selectedCourierCompany.length == deliveryManOptions.length)
                  return "All the couriers";
                return `${englishNumberToPersianNumber(
                  selectedCourierCompany.length
                )} Pack`;
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
              <MenuItem
                className="px-2"
                onClick={() => {
                  if (selectedCourierCompany.length) {
                    selectCourierCompany([]);
                    clearTimeout(courierTimeoutId);
                    const query = { ...router.query };
                    delete query[DELIVERY_COMPANY_QUERY_KEY];
                    courierTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  } else {
                    selectCourierCompany(
                      deliveryManOptions.map((b) => b.value)
                    );
                    clearTimeout(courierTimeoutId);
                    const query = { ...router.query };
                    delete query[DELIVERY_COMPANY_QUERY_KEY];
                    query[DELIVERY_COMPANY_QUERY_KEY] = deliveryManOptions.map(
                      (b) => b.value
                    );
                    courierTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }
                }}
              >
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedCourierCompany.length !==
                      deliveryManOptions.length && selectedCourierCompany.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  color="primary"
                  checked={
                    selectedCourierCompany.length === deliveryManOptions.length
                  }
                />
                <ListItemText
                  primary="Choosing all couriers"
                  className="text-right"
                />
              </MenuItem>
              {deliveryManOptions.map((courier) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${courier.value}-${selectedCourierCompany.includes(
                      courier.value
                    )}`}
                    value={courier.value}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedCourierCompany.includes(courier.value)) {
                        selectCourierCompany([
                          ...selectedCourierCompany,
                          courier.value,
                        ]);
                        clearTimeout(courierTimeoutId);
                        const query = { ...router.query };
                        delete query[DELIVERY_COMPANY_QUERY_KEY];
                        query[DELIVERY_COMPANY_QUERY_KEY] = [
                          ...selectedCourierCompany,
                          courier.value,
                        ];
                        courierTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      } else {
                        selectCourierCompany(
                          selectedCourierCompany.filter(
                            (id) => id !== courier.value
                          )
                        );
                        clearTimeout(courierTimeoutId);
                        const query = { ...router.query };
                        delete query[DELIVERY_COMPANY_QUERY_KEY];
                        query[DELIVERY_COMPANY_QUERY_KEY] =
                          selectedCourierCompany.filter(
                            (id) => id !== courier.value
                          );
                        courierTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      }
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      color="primary"
                      checked={selectedCourierCompany.includes(courier.value)}
                    />
                    <ListItemText
                      primary={courier.text}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            <Select
              className=" ml-2 mt-2"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedDeliveryType || []}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (selectedDeliveryType?.length === 0)
                  return "Select Method";
                if (
                  selectedDeliveryType?.length === 1 &&
                  selectedDeliveryType[0]
                )
                  return deliveryTypesWithoutPagination?.find(
                    (deliveryType) => deliveryType.id == selectedDeliveryType[0]
                  )?.title;
                if (
                  selectedDeliveryType?.length ==
                  deliveryTypesWithoutPagination?.length
                )
                  return "All the methods of submission";
                return `${englishNumberToPersianNumber(
                  selectedDeliveryType?.length
                )} Method of sending`;
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
              <MenuItem
                className="px-2"
                onClick={() => {
                  if (selectedDeliveryType?.length) {
                    selectDelvieryType([]);
                    clearTimeout(deliveryTypeTimeoutId);
                    const query = { ...router.query };
                    delete query[DELIVERY_TYPE];
                    deliveryTypeTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  } else {
                    selectDelvieryType(
                      deliveryTypesWithoutPagination?.map((b) => b.id)
                    );
                    clearTimeout(deliveryTypeTimeoutId);
                    const query = { ...router.query };
                    delete query[DELIVERY_TYPE];
                    query[DELIVERY_TYPE] = deliveryTypesWithoutPagination?.map(
                      (b) => b.id
                    );
                    deliveryTypeTimeoutId = setTimeout(() => {
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }, 500);
                  }
                }}
              >
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedDeliveryType?.length !==
                      deliveryTypesWithoutPagination?.length &&
                    selectedDeliveryType?.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  color="primary"
                  checked={
                    selectedDeliveryType?.length ===
                    deliveryTypesWithoutPagination?.length
                  }
                />
                <ListItemText
                  primary="Select all the methods of submission"
                  className="text-right"
                />
              </MenuItem>
              {deliveryTypesWithoutPagination?.map((deliveryType) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${deliveryType.id}-${selectedDeliveryType?.includes(
                      deliveryType.id
                    )}`}
                    value={deliveryType.id}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedDeliveryType?.includes(deliveryType.id)) {
                        selectDelvieryType([
                          ...selectedDeliveryType,
                          deliveryType.id,
                        ]);
                        clearTimeout(deliveryTypeTimeoutId);
                        const query = { ...router.query };
                        delete query[DELIVERY_TYPE];
                        query[DELIVERY_TYPE] = [
                          ...selectedDeliveryType,
                          deliveryType.id,
                        ];
                        deliveryTypeTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      } else {
                        selectDelvieryType(
                          selectedDeliveryType?.filter(
                            (id) => id !== deliveryType.id
                          )
                        );
                        clearTimeout(deliveryTypeTimeoutId);
                        const query = { ...router.query };
                        delete query[DELIVERY_TYPE];
                        query[DELIVERY_TYPE] = selectedDeliveryType?.filter(
                          (id) => id !== deliveryType.id
                        );
                        deliveryTypeTimeoutId = setTimeout(() => {
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }, 500);
                      }
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      color="primary"
                      checked={selectedDeliveryType?.includes(deliveryType.id)}
                    />
                    <ListItemText
                      primary={deliveryType.title}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            <MaterialSelect
              FormControlProps={{
                style: {
                  width: 80,
                  flexShrink: 0,
                },
              }}
              className="small ml-2 pr-0 mt-2 direction-ltr"
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
            <div className={"d-flex mt-2 align-items-center"}>
              <div className="mt-2 mx-2">Order registration time:</div>
              <div className="d-flex flex-wrap align-items-center ml-5 mb-4 mb-lg-0">
                <Button
                  style={{
                    direction: "rtl",
                  }}
                  aria-describedby={id}
                  onClick={handleOpen}
                  variant="outlined"
                >
                  {selectedDayRange.from ? (
                    <>
                      <span className="px-1">
                        {englishNumberToPersianNumber(
                          formatDateObjectToNormal(selectedDayRange.from)
                        )}
                      </span>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <span
                        style={{ color: "rgb(147 160 165)", fontWeight: 300 }}
                        className="px-2"
                      >
                        start date
                      </span>{" "}
                    </>
                  )}
                  {selectedDayRange.from && selectedDayRange.to ? "until the" : "-"}
                  {selectedDayRange.to ? (
                    <>
                      <span className="px-1">
                        {englishNumberToPersianNumber(
                          formatDateObjectToNormal(selectedDayRange.to)
                        )}
                      </span>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <span
                        style={{ color: "rgb(147 160 165)", fontWeight: 300 }}
                        className="px-2"
                      >
                        The end date
                      </span>{" "}
                    </>
                  )}
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
                      submitDate={() => {
                        const query = { ...router.query };
                        if (selectedDayRange.from)
                          query[FROM_DATE_QUERY_KEY] = persianToEnglishNumber(
                            moment(
                              formatDateObjectToNormal(selectedDayRange.from),
                              "jYYYY-jM-jD"
                            ).format("YYYY-M-D")
                          );
                        else delete query[FROM_DATE_QUERY_KEY];
                        if (selectedDayRange.to)
                          query[TO_DATE_QUERY_KEY] = persianToEnglishNumber(
                            moment(
                              formatDateObjectToNormal(selectedDayRange.to),
                              "jYYYY-jM-jD"
                            ).format("YYYY-M-D")
                          );
                        else delete query[TO_DATE_QUERY_KEY];
                        handleClose();
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
            <div className="mt-2 mx-2">The date of submission of the order:</div>
            <div className="d-flex flex-wrap align-items-center ml-5 mb-4 mb-lg-0">
              <Button
                style={{
                  direction: "rtl",
                }}
                aria-describedby={id}
                onClick={handleOpenModalDelivery}
                variant="outlined"
              >
                {selectedDeliveryDayRange.from ? (
                  <>
                    <span className="px-1">
                      {englishNumberToPersianNumber(
                        formatDateObjectToNormal(selectedDeliveryDayRange.from)
                      )}
                    </span>{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <span
                      style={{ color: "rgb(147 160 165)", fontWeight: 300 }}
                      className="px-2"
                    >
                      start date
                    </span>{" "}
                  </>
                )}
                {selectedDeliveryDayRange.from && selectedDeliveryDayRange.to
                  ? "until the"
                  : "-"}
                {selectedDeliveryDayRange.to ? (
                  <>
                    <span className="px-1">
                      {englishNumberToPersianNumber(
                        formatDateObjectToNormal(selectedDeliveryDayRange.to)
                      )}
                    </span>{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <span
                      style={{ color: "rgb(147 160 165)", fontWeight: 300 }}
                      className="px-2"
                    >
                      The end date
                    </span>{" "}
                  </>
                )}
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
                open={openModalDelivery}
                onClose={handleCloseModalDelivery}
              >
                <div style={{ backgroundColor: "#fff", position: "relative" }}>
                  <CloseIcon
                    onClick={handleCloseModalDelivery}
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
                    selectedDayRange={selectedDeliveryDayRange}
                    setSelectedDayRange={setSelectedDeliveryDayRange}
                    submitDate={() => {
                      const query = { ...router.query };
                      if (selectedDayRange.from)
                        query[FROM_DELIVERY_QUERY_KEY] = persianToEnglishNumber(
                          moment(
                            formatDateObjectToNormal(
                              selectedDeliveryDayRange.from
                            ),
                            "jYYYY-jM-jD"
                          ).format("YYYY-M-D")
                        );
                      else delete query[FROM_DELIVERY_QUERY_KEY];
                      if (selectedDayRange.to)
                        query[TO_DELIVERY_QUERY_KEY] = persianToEnglishNumber(
                          moment(
                            formatDateObjectToNormal(
                              selectedDeliveryDayRange.to
                            ),
                            "jYYYY-jM-jD"
                          ).format("YYYY-M-D")
                        );
                      else delete query[TO_DELIVERY_QUERY_KEY];
                      handleCloseModalDelivery();
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }}
                  />
                </div>
              </Popover>
            </div>
            <div className="mt-2 mx-2">Only edited orders:</div>
            <div className="ml-2 mt-2 d-flex">
              <Checkbox
                onClick={() => {
                  const query = { ...router.query };
                  setIsEditedOrders(!isEditedOrders);
                  if (query[IS_EDITED_ORDER_QUERY_KEY]) {
                    delete query[IS_EDITED_ORDER_QUERY_KEY];
                  } else {
                    query[IS_EDITED_ORDER_QUERY_KEY] = true;
                  }
                  clearTimeout(isEditedOrdersTimeoutId);
                  isEditedOrdersTimeoutId = setTimeout(() => {
                    router.push({
                      pathname: router.pathname,
                      query,
                    });
                  }, 500);
                }}
                color="primary"
                style={{ marginRight: -10 }}
                checked={isEditedOrders}
              />
            </div>
          </div>
        </div>
        <div id="report">
          <AdminOrdersTable
            BasePluginData={BasePluginData}
            actionForShouldUpdateListInAssignDelivery={
              actionForShouldUpdateListInAssignDelivery
            }
            columns={selectedColumns}
            orders={
              !loading &&
              orders &&
              mockOrderStatus !== null &&
              !Object.keys(router.query)?.length &&
              !orders?.length
                ? [mockOrder(mockOrderStatus)]
                : orders
            }
            urlPrefix={urlPrefix}
            business={
              selectedBranch
                ? branches?.find(
                    (branch) => branch.site_domain === selectedBranch
                  )
                : business
            }
            pluginUrl={pluginUrl}
            isLoading={loading}
            pluginData={pluginData}
            dispatch={dispatch}
            _assignDeliveryMan={_assignDeliveryMan}
            _addNote={_addNote}
          />
        </div>
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
      </Paper>

      {router?.query?.submit_factor ? <SubmitFactor /> : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  adminOrders: makeSelectShoppingAdminOrders(),
  pagination: makeSelectShoppingAdminOrdersPagination(),
  business: makeSelectBusiness(),
  pluginsData: makeSelectPlugins(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  branches: makeSelectBranches(),
  user: makeSelectUser(),
  siteDomain: makeSelectBusinessSiteDomain(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  orderInfo: makeSelectOrderInfo(),
  BasePluginData: makeSelectPlugin(BASE_PLUGIN),
  devices: makeSelectPOSDevices(),
  deliveryTypesWithoutPagination:
    makeSelectDeliveryTypesWithoutPagination(SHOPPING_PLUGIN),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminOrders: (params, siteDomain) =>
      dispatch(getShoppingAdminOrders(params, siteDomain)),
    _getDevices: () => dispatch(getPosDevices()),
    _assignDeliveryMan: (
      order_id,
      courier,
      updateList,
      domain,
      actionForShouldUpdateListInAssignDelivery
    ) =>
      dispatch(
        assignDeliveryMan(
          order_id,
          courier,
          updateList,
          domain,
          actionForShouldUpdateListInAssignDelivery
        )
      ),
    _addNote: (data) => dispatch(addShopingNote(data)),
    _submitOrderAdmin: (order, callback) =>
      dispatch(submitOrderAdmin(order, callback)),
    _getDeliveryTypesWithoutPagination: (pluginName, selectedBranch) =>
      dispatch(getDeliveryTypesWithoutPagination(pluginName, selectedBranch)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminOrders);
