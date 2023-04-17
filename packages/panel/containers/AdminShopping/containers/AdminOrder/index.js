/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-danger */
/* eslint-disable indent */

/**
 *
 * AdminOrder
 *
 */

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Head from "next/head";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { connect, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import dynamic from "next/dynamic";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { getCountDown } from "@saas/utils/helpers/getCountDown";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { deliveryIntervalFormatter } from "@saas/utils/helpers/deliveryIntervalFormatter";
import { deliveryTimeFormatter } from "@saas/utils/helpers/deliveryTimeFormatter";
import { formatDate } from "@saas/utils/helpers/formatDate";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { getWeekDay } from "@saas/utils/helpers/getWeekDay";

import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectDealsByIds,
  makeSelectJourneyState,
  makeSelectOrderCRM,
  makeSelectOrderDetail,
  makeSelectSearchedCRMMembership,
  makeSelectShoppingAdminOrder,
} from "../../../../store/selectors";
import {
  addShopingNote,
  assignDeliveryMan,
  changeOrderStatus,
  editShoppingAdminOrder,
  getAdminProductsByIds,
  getShoppingAdminOrder,
  getShoppingAdminOrderCRM,
  markAsPaidShoppingAdminOrder,
  returnExtraPaidShoppingAdminOrder,
  searchCRMMembership,
  sendReceiptShoppingAdminOrder,
  updateJourneyState,
} from "../../../../store/actions";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";

import {
  makeSelectBusiness,
  makeSelectBusinessLocation,
  makeSelectBusinessThemeColor,
} from "@saas/stores/business/selector";
import { PLUGIN_INACTIVE_STATUS } from "@saas/stores/plugins/constants";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import {
  makeSelectAdminUrlPrefix,
  makeSelectCustomerAddresses,
  makeSelectPlugin,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import Divider from "@material-ui/core/Divider";
import PrintButton from "./PrintButton";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";

import {
  cement,
  coal,
  graphite,
  night,
  pollution,
  smoke,
  strawberryI,
} from "@saas/utils/colors";

import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next/link";
import AcceptOrderModal from "./containers/Modals/AcceptOrderModal";
import CancelOrderModalComp from "./containers/Modals/CancelOrderModal";
import ChangeAddressModal from "./containers/Modals/ChangeAddressModal";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import NavigationModal from "./containers/Modals/NavigationModal";
import AddDescriptionModal from "./containers/Modals/AddDescriptionModal";
import AddNoteModal from "./containers/Modals/AddNoteModal";
import AssignCustomerModal from "./containers/Modals/AssignCustomerModal";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import IconButton from "@material-ui/core/IconButton";
import {
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_CAR,
  FULFILLMENT_ON_USER_SITE,
  NEW_ORDER_STATUS_ACCEPTED,
  NEW_ORDER_STATUS_COMP,
  NEW_ORDER_STATUS_NEW,
  NEW_ORDER_STATUS_VOID,
  orderStatus,
} from "@saas/plugins/Shopping/constants";
import { EDIT_ORDER, $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import { mockOrder } from "containers/AdminShopping/constants";
import AssignCourierModal from "./containers/Modals/AssignCourierModal";
import { makeSelectUser } from "@saas/stores/user/selector";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import CopyToClipboard from "react-copy-to-clipboard";
import ReturnMoneyToCustomerByCashOrCartModal from "./containers/Modals/ReturnMoneyToCustomerByCashOrCartModal";
import ReturnMoneyToCustomerWalletModal from "./containers/Modals/ReturnMoneyToCustomerWalletModal";
import RecieveMoneyFromCustomerByWalletModal from "./containers/Modals/RecieveMoneyFromCustomerByWalletModal";
import RecieveMoneyFromCustomerByCartModal from "./containers/Modals/RecieveMoneyFromCustomerByCartModal";
import RecieveMoneyFromCustomerByCashModal from "./containers/Modals/RecieveMoneyFromCustomerByCashModal";
import RecieveMoneyFromCustomerBySMSModal from "./containers/Modals/RecieveMoneyFromCustomerBySMSModal";
import {
  GET_SHOPPING_ADMIN_ORDER,
  paymentTypeOptionsDictionary,
} from "store/constants";

import {
  ACCEPT_ORDER_MODAL,
  ADD_CUSTOMER_DESCRIPTION_MODAL,
  ADD_NOTE_MODAL,
  ASSIGN_COURIER_MODAL,
  ASSIGN_CUSTOMER_MODAL,
  CANCEL_ORDER_MODAL_COMP,
  CANCEL_ORDER_MODAL_VOID,
  CHANGE_ADDRESS_MODAL,
  CHECKOUT_AFTER_CANCELING_ORDER_MODAL,
  deliverer_companies_dict,
  deliverersClickEvents,
  deliverersIcon,
  DELIVERY_INTERVAL,
  DELIVERY_TIME,
  EDIT_DELIVERY_TIME_MODAL,
  EDIT_USER_IN_ORDER_MODAL,
  NAVIGATION_MODAL,
  notificationByOrderHistoryType,
  orderHistorySerializer,
  orderTimeLineComponentsByType,
  RECEIVE_ORDER_MODAL,
  RECIEVE_MONEY_FROM_CUSTOMER_BY_CART_MODAL,
  RECIEVE_MONEY_FROM_CUSTOMER_BY_CASH_MODAL,
  RECIEVE_MONEY_FROM_CUSTOMER_BY_SMS_MODAL,
  RECIEVE_MONEY_FROM_CUSTOMER_BY_WALLET_MODAL,
  RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL,
  RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL,
} from "./constants";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import SyncRoundedIcon from "@material-ui/icons/SyncRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { ReceiveOrderModal } from "./containers/Modals/ReceiveOrderModal";
import { CheckoutAfterCancelingOrderModal } from "./containers/Modals/CheckoutAfterCancelingOrderModal";
import { getCustomerAddresses } from "@saas/stores/plugins/actions";
import EditUserInOrder from "./containers/Modals/EditUserInOrder";
import ModernSwtich from "@saas/components/ModernSwitch";
import DateRangePickerWrapper from "@saas/components/DateRangePickerWrapper";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import JalaliUtils from "@date-io/jalaali";
import EditDeliveryTimeModal from "./containers/Modals/EditDeliveryTimeModal";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import { CancelOrderModalVoid } from "./containers/Modals/CancelOrderModalVoid";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { paymentStates } from "@saas/utils/constants/paymentStates";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";
import LazyImage from "@saas/components/LazyImage";
import FullscreenOutlinedIcon from "@material-ui/icons/FullscreenOutlined";
import OrderReceiptImageModal from "./OrderReceiptImageModal";

const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });

const utmItems = [
  { key: "source", label: "UTM Source" },
  { key: "medium", label: "UTM Medium" },
  { key: "referrer", label: "Site Referrer" },
];

const CustomChip = ({
  backgroundColor,
  color,
  progress,
  label,
  noProgress,
}) => (
  <div
    style={{
      background: backgroundColor,
      borderRadius: 100,
      width: "fit-content",
      padding: "3px 8px",
      color: color,
    }}
    className="d-flex align-items-center mx-auto"
  >
    {!noProgress && (
      <div
        className="ml-1 d-flex justify-content-center align-items-end"
        style={{
          width: 8,
          height: 8,
          borderRadius: "100%",
          border: `2px solid ${color}`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: progress,
            backgroundColor: color,
          }}
        ></div>
      </div>
    )}
    <div className="mx-1" style={{ fontSize: 12 }}>{label}</div>
  </div>
);

export function AdminOrder({
  adminOrder,
  loading,
  _getAdminOrder,
  urlPrefix,
  business,
  pluginData,
  plugin = SHOPPING_PLUGIN,
  pluginsData,
  _editOrder,
  _changeOrderStatus,
  _getAdminOrderCRM,
  orderCRM,
  _assignDeliveryMan,
  _setSnackBarMessage,
  _sendReceipt,
  _returnExtraPaid,
  _markAsPaid,
  _addNote,
  user,
  _getAdminProductsByIds,
  adminDealsByIds,
  businessLocation,
  themeColor,
  customerAddresses,
  _getCustomerAddresses,
  _searchCRMMembership,
  searchedCRMMembership,
  _updateJourneyState,
  journeyData,
}) {
  const [mockOrderStatus, setMockOrderStatus] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setMockOrderStatus(parseInt(localStorage.getItem("mockOrderStatus") || 0));
  }, []);
  const router = useRouter();
  const order =
    router.query.id === "mock" ? mockOrder(mockOrderStatus) : adminOrder || {};
  const dashboardState =
    journeyData?.vitrin_journey_state?.dashboard_state || {};
  const userGiftCredit = useMemo(() => {
    return user?.giftCredit;
  }, [user]);
  const {
    user_address: userAddress,
    submitted_at: submittedAt = moment.now(),
    order_status,
    transactions,
  } = order;

  let receiptImageUrl;
  if (transactions?.[0]) receiptImageUrl = transactions?.[0]?.image_url;

  const orderHistoryByDate = useMemo(
    () => orderHistorySerializer(order?.history),
    [order?.history]
  );

  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  const dispatch = useDispatch();
  const [selectedAddress, selectAddress] = useState(null);
  const [notificationsData, setNotifications] = useState([]);

  const [isAbsoluteDeliveryTime, setIsAbsoluteDeliveryTime] = useState(false);
  const [startTimeOfDelivery, setStartTimeOfDelivery] = useState(null);
  const [endTimeOfDelivery, setEndTimeOfDelivery] = useState(null);
  const [startDateOfDelivery, setStartDateOfDelivery] = useState(null);
  const [endDateOfDelivery, setEndDateOfDelivery] = useState(null);

  const [absoluteDeliveryTime, setAbsoluteDeliveryTime] = useState(null);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (order?.membership_id) {
        _getAdminOrderCRM(order?.membership_id);
      }
    }, 0);
    const lastEvent = order?.history?.[order?.history?.length - 1];
    if (lastEvent && notificationByOrderHistoryType[lastEvent.log_type]) {
      setNotifications([
        {
          id: lastEvent.timestamp,
          ...notificationByOrderHistoryType[lastEvent.log_type]({
            order,
            orderHistory: lastEvent,
            index: order?.history?.length - 1,
            orderHistoryItems: order._lastEvent,
          }),
        },
      ]);
    }
  }, [JSON.stringify(order), order?.order_status]);

  const mapRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (router?.query?.id) {
        _getAdminOrder(router.query.id);
      }
    }, 0);
  }, [router?.query?.id]);
  useEffect(() => {
    const printButton = document.getElementById("print");

    if (order?.id && router.query.print && Boolean(printButton)) {
      printButton.click();
    }
  }, [order, router.query.print]);
  const removeNotification = (index) => {
    const _notificationsData = [...notificationsData];
    const notification = _notificationsData.splice(index, 1)[0];
    localStorage.setItem(notification.id, "true");
    setNotifications(_notificationsData);
  };

  const mapOptions = {
    height: 96,
    width: "100%",
    zoom: 13,
    scrollWheelZoom: true,
    center: {
      longitude: userAddress ? userAddress.longitude : null,
      latitude: userAddress ? userAddress.latitude : null,
    },
    markers: userAddress
      ? [
          {
            longitude: userAddress.longitude,
            latitude: userAddress.latitude,
            singleMarker: true,
          },
        ]
      : [],
    fullscreenControl: true,
    ref: mapRef,
    dragging: minWidth768,
  };

  const orderDate = new Date(submittedAt);
  const orderTime = moment(
    `${orderDate.getFullYear()}-${
      orderDate.getMonth() + 1
    }-${orderDate.getDate()}`,
    "YYYY-MM-DD"
  );
  const [UIModals, toggleUIModals] = useState({
    [NAVIGATION_MODAL]: false,
    [ACCEPT_ORDER_MODAL]: false,
    [CANCEL_ORDER_MODAL_COMP]: false,
    [CANCEL_ORDER_MODAL_VOID]: false,
    [CHANGE_ADDRESS_MODAL]: false,
    [ASSIGN_CUSTOMER_MODAL]: false,
    [ADD_CUSTOMER_DESCRIPTION_MODAL]: false,
    [ADD_NOTE_MODAL]: false,
    [RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL]: false,
    [RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL]: false,
    [RECIEVE_MONEY_FROM_CUSTOMER_BY_WALLET_MODAL]: false,
    [RECIEVE_MONEY_FROM_CUSTOMER_BY_SMS_MODAL]: false,
    [RECIEVE_MONEY_FROM_CUSTOMER_BY_CASH_MODAL]: false,
    [RECIEVE_MONEY_FROM_CUSTOMER_BY_CART_MODAL]: false,
    [RECEIVE_ORDER_MODAL]: false,
    [CHECKOUT_AFTER_CANCELING_ORDER_MODAL]: false,
    [ASSIGN_COURIER_MODAL]: false,
    [EDIT_USER_IN_ORDER_MODAL]: false,
    [EDIT_DELIVERY_TIME_MODAL]: false,
  });
  const toggleModal = useCallback(
    (name, open) => {
      toggleUIModals({ ...UIModals, [name]: open });
    },
    [UIModals]
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [peykMenuAnchorEl, setPeykMenuAnchorEl] = useState(null);
  const [recieveMoneyAnchorEl, setRecieveMoneyAnchorEl] = useState(null);
  const [returnMoneyAnchorEl, setReturnMoneyAnchorEl] = useState(null);
  const itemsCount = order?.items?.reduce((a, b) => a + b.amount, 0);
  const pluginUrl = pluginsData[plugin].plugin_url;
  const toggleAssignPeykMenu = (isOpen, e) => {
    if (isOpen) {
      setPeykMenuAnchorEl(e.currentTarget);
    } else {
      setPeykMenuAnchorEl(null);
    }
  };
  const toggleRecieveMoneyMenu = (isOpen, e) => {
    if (isOpen) {
      setRecieveMoneyAnchorEl(e.currentTarget);
    } else {
      setRecieveMoneyAnchorEl(null);
    }
  };
  const toggleReturnMoneyMenu = (isOpen, e) => {
    if (isOpen) {
      setReturnMoneyAnchorEl(e.currentTarget);
    } else {
      setReturnMoneyAnchorEl(null);
    }
  };
  const selected_business =
    business.site_domain === order?.business_site_domain
      ? business
      : business.branches?.find(
          (_business) => _business.site_domain === order?.business_site_domain
        );
  const shoppingPluginData =
    selected_business?.plugins_config?.[SHOPPING_PLUGIN]?.status !==
    PLUGIN_INACTIVE_STATUS
      ? selected_business?.plugins_config?.[SHOPPING_PLUGIN]?.data
      : null;
  const _deliverers =
    shoppingPluginData?.couriers &&
    Object.keys(shoppingPluginData?.couriers).length
      ? [
          {
            id: uniqueid(),
            value: "",
            text: `Selection from existing couriers`,
            onClick: () => toggleModal(ASSIGN_COURIER_MODAL, true),
          },
        ]
      : [];
  const _deliverer_companies =
    (shoppingPluginData?.deliverer_companies &&
      Object.keys(shoppingPluginData.deliverer_companies).map(
        (deliverer, index) => ({
          id: index + 1,
          text: deliverer_companies_dict[deliverer]?.label,
          value: deliverer_companies_dict[deliverer]?.value,
          onClick: () =>
            dispatch(
              deliverersClickEvents[deliverer_companies_dict[deliverer]?.value](
                order?.id
              )
            ),
        })
      )) ||
    [];

  const couriers = shoppingPluginData?.couriers;

  const deliveryManOptions = [..._deliverers, ..._deliverer_companies];
  const deliveryTimeOptions = {
    [DELIVERY_TIME]: order?.delivery_interval?.from_time
      ? `${deliveryTimeFormatter(
          order?.delivery_interval?.from_time
        )} (${englishNumberToPersianNumber(
          getCountDown(order?.delivery_time)
        )})`
      : null,
    [DELIVERY_INTERVAL]: order?.delivery_interval?.to_time
      ? deliveryIntervalFormatter(order?.delivery_interval)
      : null,
  };

  const finalDeliveryTime =
    deliveryTimeOptions[DELIVERY_INTERVAL] ||
    deliveryTimeOptions[DELIVERY_TIME];

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const hami_integrated =
    router.query.hami_integrated || typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("hami_integrated")
      : false;
  const iframe_from_pos =
    router.query.iframe_from_pos || typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("iframe_from_pos")
      : false;
  if (router.query.print) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          position: "fixed",
          background: "white",
          zIndex: 100000,
        }}
      >
        <div style={{ display: "none" }}>
          <PrintButton
            order={order}
            business={business}
            pluginData={pluginData}
            hasButton={false}
            color={graphite}
          />
        </div>
      </div>
    );
  }
  const pelateChar = order?.user_address?.extra_data?.plate_number?.replace(
    /[0-9]/g,
    ""
  );
  const plateNums = order?.user_address?.extra_data?.plate_number?.replace(
    pelateChar,
    ""
  );

  const onAcceptOrder = (deliveryTime) => {
    if (router.query.id === "mock") {
      setMockOrderStatus(1);
      localStorage.setItem("mockOrderStatus", "1");
    } else
      _changeOrderStatus(
        order?.id,
        {
          status: NEW_ORDER_STATUS_ACCEPTED,
        },
        () => {
          if (!dashboardState?.order_step) {
            _updateJourneyState(
              {
                dashboard_state: {
                  ...dashboardState,
                  order_step: 1,
                },
              },
              () => setIsOpenSuccessModal(true)
            );
          }
        },
        deliveryTime
      );
  };

  return (
    <div>
      <Head>
        <title>Store order</title>
      </Head>
      <AcceptOrderModal
        order={order}
        isOpen={UIModals[ACCEPT_ORDER_MODAL]}
        onClose={() => toggleModal(ACCEPT_ORDER_MODAL, false)}
        submit={onAcceptOrder}
        iframeFromPos={iframe_from_pos}
        isCardToCardPayment={!!receiptImageUrl}
        description={order?.description}
      />

      <CancelOrderModalVoid
        isOpen={UIModals[CANCEL_ORDER_MODAL_VOID]}
        onClose={() => toggleModal(CANCEL_ORDER_MODAL_VOID, false)}
        submit={() => {
          if (router.query.id === "mock") {
            setMockOrderStatus(2);
            localStorage.setItem("mockOrderStatus", "2");
          } else {
            const callback = () => {
              toggleUIModals({
                ...UIModals,
                [CHECKOUT_AFTER_CANCELING_ORDER_MODAL]: Boolean(
                  order?.paid_price
                ),
                [CANCEL_ORDER_MODAL_VOID]: false,
              });
            };
            _changeOrderStatus(
              order?.id,
              {
                status: NEW_ORDER_STATUS_VOID,
                refund: false,
              },
              callback
            );
          }
        }}
        loading={loading}
        urlPrefix={urlPrefix}
        pluginUrl={pluginUrl}
      />
      <CancelOrderModalComp
        isOpen={UIModals[CANCEL_ORDER_MODAL_COMP]}
        onClose={() => toggleModal(CANCEL_ORDER_MODAL_COMP, false)}
        submit={(restock_items) => {
          if (router.query.id === "mock") {
            setMockOrderStatus(2);
            localStorage.setItem("mockOrderStatus", "2");
          } else {
            const callback = () => {
              toggleUIModals({
                ...UIModals,
                [CHECKOUT_AFTER_CANCELING_ORDER_MODAL]: Boolean(
                  order?.paid_price
                ),
                [CANCEL_ORDER_MODAL_COMP]: false,
              });
              if (!dashboardState?.order_step) {
                _updateJourneyState(
                  {
                    dashboard_state: {
                      ...dashboardState,
                      order_step: 1,
                    },
                  },
                  () => setIsOpenSuccessModal(true)
                );
              }
            };
            _changeOrderStatus(
              order?.id,
              {
                status: NEW_ORDER_STATUS_COMP,
                refund: false,
                restock_items,
              },
              callback
            );
          }
        }}
        loading={loading}
        order={order}
        urlPrefix={urlPrefix}
        pluginUrl={pluginUrl}
        _getAdminProductsByIds={_getAdminProductsByIds}
        adminDealsByIds={adminDealsByIds}
        business={business}
      />
      <CheckoutAfterCancelingOrderModal
        isOpen={UIModals[CHECKOUT_AFTER_CANCELING_ORDER_MODAL]}
        onClose={() => {
          toggleModal(CHECKOUT_AFTER_CANCELING_ORDER_MODAL, false);
        }}
        loading={loading}
        submit={(checkoutMethod) => {
          toggleUIModals({
            ...UIModals,
            [checkoutMethod]: true,
            [CHECKOUT_AFTER_CANCELING_ORDER_MODAL]: false,
          });
        }}
        order={order}
      />
      <EditDeliveryTimeModal
        isLoading={loading}
        isOpen={UIModals[EDIT_DELIVERY_TIME_MODAL]}
        onClose={() => toggleModal(EDIT_DELIVERY_TIME_MODAL, false)}
        submit={() => {
          if (isAbsoluteDeliveryTime) {
            _editOrder({
              id: order?.id,
              delivery: {
                interval: {
                  from_time: Date.parse(absoluteDeliveryTime) / 1000,
                  to_time: null,
                },
              },
            });
          } else {
            _editOrder({
              id: order?.id,
              delivery: {
                interval: {
                  from_time:
                    Date.parse(
                      `${startDateOfDelivery} ${startTimeOfDelivery}`
                    ) / 1000,
                  to_time:
                    Date.parse(`${endDateOfDelivery} ${endTimeOfDelivery}`) /
                    1000,
                },
              },
            });
          }
        }}
      />
      <ReceiveOrderModal
        isOpen={UIModals[RECEIVE_ORDER_MODAL]}
        onClose={() => toggleModal(RECEIVE_ORDER_MODAL, false)}
        isLoading={loading}
        submit={() =>
          _changeOrderStatus(order?.id, {
            status: NEW_ORDER_STATUS_NEW,
          })
        }
      />
      <AssignCustomerModal
        isOpen={UIModals[ASSIGN_CUSTOMER_MODAL]}
        isLoading={loading}
        onClose={() => toggleModal(ASSIGN_CUSTOMER_MODAL, false)}
        searchMembership={_searchCRMMembership}
        searchedMembership={searchedCRMMembership}
        submit={(selectedUser) =>
          _editOrder({ id: order?.id, user_id: +selectedUser })
        }
      />
      <AssignCourierModal
        isOpen={UIModals[ASSIGN_COURIER_MODAL]}
        onClose={() => toggleModal(ASSIGN_COURIER_MODAL, false)}
        couriers={couriers}
        isLoading={loading}
        submit={(_courier) => _assignDeliveryMan(order?.id, _courier)}
        assignedCourierPhone={order?.deliverer_phone}
      />
      <ChangeAddressModal
        isOpen={UIModals[CHANGE_ADDRESS_MODAL]}
        onClose={() => {
          toggleModal(CHANGE_ADDRESS_MODAL, false);
          selectAddress(null);
        }}
        addresses={customerAddresses}
        selectAddress={selectAddress}
        selectedAddress={selectedAddress}
        order={order}
        businessLocation={businessLocation}
        themeColor={themeColor}
        business={business}
        submit={(addressObj) =>
          _editOrder(
            {
              id: order?.id,
              user_address: addressObj,
            },
            () => _getAdminOrder(order?.id)
          )
        }
      />

      <NavigationModal
        isOpen={UIModals[NAVIGATION_MODAL]}
        onClose={() => toggleModal(NAVIGATION_MODAL, false)}
        mapOptions={mapOptions}
      />
      <AddDescriptionModal
        order={order}
        isOpen={UIModals[ADD_CUSTOMER_DESCRIPTION_MODAL]}
        onClose={() => toggleModal(ADD_CUSTOMER_DESCRIPTION_MODAL, false)}
        submit={(description) =>
          _editOrder(
            {
              id: order?.id,
              description,
            },
            () => _getAdminOrder(order?.id)
          )
        }
      />
      <AddNoteModal
        isOpen={UIModals[ADD_NOTE_MODAL]}
        onClose={() => toggleModal(ADD_NOTE_MODAL, false)}
        submit={(note) => _addNote({ id: order?.id, comment: note })}
      />
      <ReturnMoneyToCustomerByCashOrCartModal
        order={order}
        isOpen={UIModals[RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL]}
        onClose={() =>
          toggleModal(RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL, false)
        }
        submit={() =>
          _returnExtraPaid(router.query.id, {
            payment_type: paymentTypeOptionsDictionary.cash,
          })
        }
      />
      <ReturnMoneyToCustomerWalletModal
        order={order}
        isOpen={UIModals[RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL]}
        onClose={() =>
          toggleModal(RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL, false)
        }
        submit={() =>
          _returnExtraPaid(router.query.id, {
            payment_type: paymentTypeOptionsDictionary.wallet,
          })
        }
      />
      <RecieveMoneyFromCustomerByWalletModal
        isOpen={UIModals[RECIEVE_MONEY_FROM_CUSTOMER_BY_WALLET_MODAL]}
        onClose={() =>
          toggleModal(RECIEVE_MONEY_FROM_CUSTOMER_BY_WALLET_MODAL, false)
        }
        submit={() =>
          _markAsPaid(router.query.id, {
            payment_type: paymentTypeOptionsDictionary.wallet,
          })
        }
        userGiftCredit={userGiftCredit}
        order={order}
      />
      <RecieveMoneyFromCustomerByCartModal
        isOpen={UIModals[RECIEVE_MONEY_FROM_CUSTOMER_BY_CART_MODAL]}
        onClose={() =>
          toggleModal(RECIEVE_MONEY_FROM_CUSTOMER_BY_CART_MODAL, false)
        }
        submit={() =>
          _markAsPaid(router.query.id, {
            payment_type: paymentTypeOptionsDictionary.cartToCart,
          })
        }
      />
      <RecieveMoneyFromCustomerByCashModal
        isOpen={UIModals[RECIEVE_MONEY_FROM_CUSTOMER_BY_CASH_MODAL]}
        onClose={() =>
          toggleModal(RECIEVE_MONEY_FROM_CUSTOMER_BY_CASH_MODAL, false)
        }
        submit={() =>
          _markAsPaid(router.query.id, {
            payment_type: paymentTypeOptionsDictionary.cash,
          })
        }
      />
      <RecieveMoneyFromCustomerBySMSModal
        isOpen={UIModals[RECIEVE_MONEY_FROM_CUSTOMER_BY_SMS_MODAL]}
        onClose={() =>
          toggleModal(RECIEVE_MONEY_FROM_CUSTOMER_BY_SMS_MODAL, false)
        }
        submit={() => _sendReceipt(router.query.id)}
      />
      <EditUserInOrder
        order={order}
        isOpen={UIModals[EDIT_USER_IN_ORDER_MODAL]}
        onClose={() => toggleModal(EDIT_USER_IN_ORDER_MODAL, false)}
        submit={(name, phone) =>
          _editOrder({
            id: order?.id,
            user_address: { name, phone, action: "update" },
          })
        }
      />
      <div className="container pb-3">
        <AdminBreadCrumb />

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <div className="position-relative">
              <div> Order{englishNumberToPersianNumber(order?.order_id)}</div>

              {minWidth768 && (
                <div
                  className="position-absolute d-flex"
                  style={{ color: smoke, bottom: -30 }}
                >
                  {englishNumberToPersianNumber(
                    orderTime.format("YYYY/MM/DD")
                  )}
                  <span className="mx-1">|</span>
                  {englishNumberToPersianNumber(
                    `${`0${orderDate.getHours()}`.slice(
                      -2
                    )}:${`0${orderDate.getMinutes()}`.slice(-2)}`
                  )}
                </div>
              )}
              {!minWidth768 && (
                <div
                  className="position-absolute d-flex align-items-center"
                  style={{
                    color: smoke,
                    bottom: -30,
                    width: "max-content",
                  }}
                >
                  <div>
                    <CustomChip
                      label={paymentStates[order?.payment_status]?.label}
                      backgroundColor={
                        paymentStates[order?.payment_status]?.backgroundColor
                      }
                      color={paymentStates[order?.payment_status]?.color}
                      progress={paymentStates[order?.payment_status]?.progress}
                    />
                  </div>
                  <div className="mr-3">
                    <CustomChip
                      color={orderStatus[order_status]?.color}
                      label={orderStatus[order_status]?.label}
                      backgroundColor={
                        orderStatus[order_status]?.backgroundColor
                      }
                      progress={orderStatus[order_status]?.progress}
                    />
                  </div>
                </div>
              )}
            </div>
            {minWidth768 && (
              <>
                <div className="mr-3">
                  <CustomChip
                    label={paymentStates[order?.payment_status]?.label}
                    backgroundColor={
                      paymentStates[order?.payment_status]?.backgroundColor
                    }
                    color={paymentStates[order?.payment_status]?.color}
                    progress={paymentStates[order?.payment_status]?.progress}
                  />
                </div>
                <div className="mr-3">
                  <CustomChip
                    color={pollution}
                    label={`Sales Channel: ${order?.sales_channel_name}`}
                    backgroundColor="rgba(152, 169, 177, 0.16)"
                    progress="100%"
                  />
                </div>
                <div className="mr-3">
                  <CustomChip
                    color={orderStatus[order_status]?.color}
                    label={orderStatus[order_status]?.label}
                    backgroundColor={orderStatus[order_status]?.backgroundColor}
                    progress={orderStatus[order_status]?.progress}
                  />
                </div>
              </>
            )}
          </div>

          <div className="d-flex align-items">
            {!minWidth768 && (
              <div
                className="d-flex justify-content-center align-items-center px-2"
                style={{ color: smoke, fontSize: 12 }}
              >
                {englishNumberToPersianNumber(
                  orderTime.format("YYYY/MM/DD")
                )}
                <span className="mx-1">|</span>
                {englishNumberToPersianNumber(
                  `${`0${orderDate.getHours()}`.slice(
                    -2
                  )}:${`0${orderDate.getMinutes()}`.slice(-2)}`
                )}
              </div>
            )}{" "}
            {!minWidth768 && (
              <div>
                <div
                  className="d-flex justify-content-center align-items-center p-2"
                  style={{
                    border: `1px solid ${cement}`,
                    borderRadius: 4,
                  }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <MoreHorizRoundedIcon
                    fontSize="medium"
                    style={{ color: smoke }}
                  />
                </div>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {(order.order_status !== NEW_ORDER_STATUS_VOID ||
                    order.order_status !== NEW_ORDER_STATUS_COMP) && (
                    <>
                      {!iframe_from_pos &&
                        order.order_status !== NEW_ORDER_STATUS_ACCEPTED && (
                          <>
                            <MenuItem
                              onClick={() => {
                                router.push(
                                  `${urlPrefix}${pluginUrl}/orders/${order?.id}/edit?business=${order?.business_site_domain}`
                                );
                                handleCloseMenu();
                              }}
                              button
                              className="d-flex align-items-center"
                              style={{
                                color: graphite,
                              }}
                            >
                              <Icon
                                icon={EDIT_ORDER}
                                className="ml-3"
                                width={20}
                                height={20}
                                color={graphite}
                              />
                              <div> Edit the order</div>
                            </MenuItem>
                          </>
                        )}
                      <MenuItem
                        button
                        onClick={() => {
                          toggleModal(CANCEL_ORDER_MODAL_VOID, true);
                          handleCloseMenu();
                        }}
                        className="d-flex align-items-center"
                        style={{ color: graphite }}
                      >
                        <CancelRoundedIcon fontSize="small" className="ml-3" />
                        <div>Change to the word by returning to the warehouse</div>
                      </MenuItem>
                      <MenuItem
                        button
                        onClick={() => {
                          toggleModal(CANCEL_ORDER_MODAL_COMP, true);
                          handleCloseMenu();
                        }}
                        className="d-flex align-items-center"
                        style={{ color: graphite }}
                      >
                        <CancelRoundedIcon fontSize="small" className="ml-3" />
                        <div>Change to the word without returning to the warehouse</div>
                      </MenuItem>
                    </>
                  )}
                  {order?.order_status !== NEW_ORDER_STATUS_NEW && (
                    <MenuItem
                      onClick={() => {
                        toggleModal(RECEIVE_ORDER_MODAL, true);
                        handleCloseMenu();
                      }}
                      button
                      className="d-flex align-items-center"
                      style={{ color: graphite }}
                    >
                      <SyncRoundedIcon fontSize="small" className="ml-3" />
                      <div>Change</div>
                    </MenuItem>
                  )}
                  <MenuItem
                    button
                    onClick={() => {
                      _addNote({
                        id: order?.id,
                        type: "print",
                      });
                      handleCloseMenu();
                    }}
                  >
                    <PrintButton
                      order={order}
                      business={business}
                      pluginData={pluginData}
                      hasButton={false}
                      color={graphite}
                    />
                  </MenuItem>
                </Menu>
              </div>
            )}{" "}
            {minWidth768 && (
              <div className="d-flex">
                {iframe_from_pos && (
                  <div>
                    {(order?.delivery_site_type?.toUpperCase() ===
                      FULFILLMENT_ON_USER_SITE) &
                      (order.order_status !== NEW_ORDER_STATUS_VOID ||
                        order.order_status !== NEW_ORDER_STATUS_COMP) &&
                    minWidth768 &&
                    deliveryManOptions.length ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={
                            order?.order_status !== NEW_ORDER_STATUS_ACCEPTED ||
                            loading ||
                            (order?.delivery_companies_data &&
                              order?.delivery_companies_data?.company_type !==
                                "personal" &&
                              order?.delivery_companies_data?.company_type !==
                                null)
                          }
                          className="mr-3"
                          style={{ direction: "ltr" }}
                          startIcon={<KeyboardArrowUpRoundedIcon />}
                          onClick={(e) => toggleAssignPeykMenu(true, e)}
                        >
                          Courry allocation
                        </Button>
                        <Menu
                          elevation={1}
                          anchorEl={peykMenuAnchorEl}
                          keepMounted
                          open={Boolean(peykMenuAnchorEl)}
                          onClose={() => toggleAssignPeykMenu(false)}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                        >
                          {deliveryManOptions.map((deliveryMan) => (
                            <MenuItem
                              key={deliveryMan.id}
                              onClick={() => {
                                deliveryMan.onClick(order?.id);
                                toggleAssignPeykMenu(false);
                              }}
                              disabled={loading}
                            >
                              <img
                                src={
                                  deliverersIcon[
                                    deliveryMan.value || "personal_peyk"
                                  ]
                                }
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                                className="ml-5"
                              />

                              {deliveryMan.text}
                            </MenuItem>
                          ))}
                        </Menu>
                      </>
                    ) : null}
                  </div>
                )}
                {!iframe_from_pos &&
                  (order.order_status !== NEW_ORDER_STATUS_VOID ||
                    order.order_status !== NEW_ORDER_STATUS_COMP) &&
                  order.order_status !== NEW_ORDER_STATUS_ACCEPTED && (
                    <>
                      <Button
                        onClick={() =>
                          router.push(
                            `${urlPrefix}${pluginUrl}/orders/${order?.id}/edit?business=${order?.business_site_domain}`
                          )
                        }
                        disabled={loading}
                        style={{ minWidth: 110 }}
                      >
                        Edit the order{" "}
                      </Button>
                    </>
                  )}
                <div>
                  <div className="d-flex justify-content-center align-items-center u-cursor-pointer">
                    <Button
                      style={{ minWidth: 110 }}
                      disabled={loading}
                      button
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      More settings
                      {anchorEl === null ? (
                        <ArrowDropDownRoundedIcon fontSize="medium" />
                      ) : (
                        <ArrowDropUpRoundedIcon fontSize="medium" />
                      )}
                    </Button>
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    {order?.order_status !== NEW_ORDER_STATUS_NEW && (
                      <MenuItem
                        onClick={() => {
                          toggleModal(RECEIVE_ORDER_MODAL, true);
                          handleCloseMenu();
                        }}
                        button
                        className="d-flex align-items-center"
                        style={{ color: graphite }}
                      >
                        <SyncRoundedIcon fontSize="small" className="ml-3" />
                        <div>Change</div>
                      </MenuItem>
                    )}
                    {order.order_status !== NEW_ORDER_STATUS_VOID &&
                      order.order_status !== NEW_ORDER_STATUS_COMP && (
                        <>
                          <MenuItem
                            button
                            onClick={() => {
                              toggleModal(CANCEL_ORDER_MODAL_VOID, true);
                              handleCloseMenu();
                            }}
                            className="d-flex align-items-center"
                            style={{
                              color: graphite,
                            }}
                          >
                            <CancelRoundedIcon
                              fontSize="small"
                              className="ml-3"
                            />
                            <div>Change to the word by returning to the warehouse</div>
                          </MenuItem>
                          <MenuItem
                            button
                            onClick={() => {
                              toggleModal(CANCEL_ORDER_MODAL_COMP, true);
                              handleCloseMenu();
                            }}
                            className="d-flex align-items-center"
                            style={{
                              color: graphite,
                            }}
                          >
                            <CancelRoundedIcon
                              fontSize="small"
                              className="ml-3"
                            />
                            <div>Change to the word without returning to the warehouse</div>
                          </MenuItem>
                        </>
                      )}
                    <MenuItem
                      button
                      onClick={() => {
                        _addNote({
                          id: order?.id,
                          type: "print",
                        });
                        handleCloseMenu();
                      }}
                    >
                      <PrintButton
                        order={order}
                        business={business}
                        pluginData={pluginData}
                        hasButton={false}
                        color={graphite}
                      />
                    </MenuItem>
                    {hami_integrated ? (
                      <MenuItem
                        button
                        onClick={() => {
                          window.parent.postMessage(
                            JSON.stringify({
                              type: "addToHami",
                              order,
                            }),
                            "*"
                          );
                          handleCloseMenu();
                        }}
                      >
                        Transfer to the sponsor
                      </MenuItem>
                    ) : null}
                  </Menu>
                </div>
              </div>
            )}
          </div>
        </div>

        {notificationsData?.length ? (
          <div className="mt-5 pt-3">
            {notificationsData.map((notification, index) => (
              <div className="col-12 px-0" key={notification.id}>
                <div
                  className="d-flex px-3 py-1 align-items-center justify-content-between"
                  style={{
                    marginTop: index !== 0 ? 16 : 0,
                    border: `1px solid ${notification.color}`,
                    borderRadius: 8,
                    backgroundColor: hexToRGBA(notification.color, 0.05),
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <notification.icon
                      fontSize="small"
                      style={{
                        color: notification.color,
                      }}
                      className="ml-2"
                    />
                    <div
                      className="u-font-semi-small"
                      style={{
                        color: graphite,
                        lineHeight: "12px",
                      }}
                    >
                      {notification.content}
                    </div>
                  </div>
                  <div
                    className="d-flex"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeNotification(index)}
                  >
                    <IconButton>
                      <CloseRoundedIcon
                        fontSize="small"
                        style={{ color: pollution }}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className="d-flex flex-wrap row-rev mt-4" style={{ color: night }}>
          <div
            className={`${
              minWidth768 ? "pr-2 pl-0 col-7" : "px-0 col-12"
            } pt-4`}
          >
            {itemsCount === 0 ? null : (
              <Paper
                elevation={2}
                className="mb-3 d-flex flex-1 flex-column"
                style={{
                  backgroundColor:
                    (order.order_status === NEW_ORDER_STATUS_VOID ||
                      order.order_status === NEW_ORDER_STATUS_COMP) &&
                    hexToRGBA(strawberryI, 0.05),
                }}
              >
                <div className="px-5 pt-5 pb-4" style={{ fontWeight: 500 }}>
                  {`number ofitems${
                    order.order_status === NEW_ORDER_STATUS_VOID ||
                    order.order_status === NEW_ORDER_STATUS_COMP
                      ? "Canceled"
                      : ""
                  }`}{" "}
                  ({englishNumberToPersianNumber(itemsCount)})
                </div>

                <div className="px-5 pb-5">
                  {order?.items?.map((item, index) => {
                    const itemFinalPrice =
                      item.discounted_price +
                      item.modifiers.reduce(
                        (sum, modifier) =>
                          sum +
                          +modifier.discounted_price * (modifier.amount || 1),
                        0
                      );

                    return (
                      <div
                        key={item.product_id}
                        className={`d-flex justify-content-between align-items-start ${
                          index === 0 ? "" : "mt-5"
                        }`}
                      >
                        <div
                          className="pl-3"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              width: 64,
                              height: 64,
                              borderRadius: 8,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={
                                item.product_main_image_thumbnail_url ||
                                item.main_image_thumbnail_url
                              }
                              alt=""
                              className="w-100 h-100"
                            />
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="d-flex justify-content-between align-items-start pb-3">
                            <div
                              style={{
                                flex: 3,
                                color: theme.palette.primary.main,
                              }}
                            >
                              <Link
                                href={`${urlPrefix}${pluginUrl}/settings/products/${
                                  item.super_product_id || item.product_id
                                }`}
                              >
                                {item.product_title}
                              </Link>{" "}
                              {item.has_variations && (
                                <>
                                  /{" "}
                                  <Link
                                    href={`${urlPrefix}${pluginUrl}/settings/products/${
                                      item.super_product_id || item.product_id
                                    }/variations/${item.variation_id}`}
                                  >
                                    {item.variation_title || ""}
                                  </Link>
                                </>
                              )}
                            </div>
                            <div>
                              {item.initial_price !== item.discounted_price && (
                                <div
                                  className="d-flex"
                                  style={{
                                    color: smoke,
                                  }}
                                >
                                  <div className="u-text-line-through ">
                                    {priceFormatter(item.initial_price)}
                                  </div>
                                  <div
                                    style={{
                                      color: theme.palette.primary.main,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {englishNumberToPersianNumber(
                                      calculateDiscountPercent(
                                        item.initial_price,
                                        item.discounted_price
                                      )
                                    )}
                                    <span className="mr-1">٪</span>
                                  </div>
                                </div>
                              )}
                              <div
                                style={{
                                  flex: 2,
                                }}
                                className="text-right"
                              >
                                {priceFormatter(item.discounted_price)}
                                <Icon
                                  icon={$}
                                  width={21}
                                  height={21}
                                  color={graphite}
                                  className="mr-1"
                                />
                              </div>
                            </div>
                          </div>
                          {item.modifiers.map((modifier) => (
                            <div
                              className="d-flex justify-content-between align-items-center pb-3"
                              key={modifier.id}
                            >
                              <div
                                style={{
                                  flex: 3,
                                  color: smoke,
                                  fontSize: 12,
                                }}
                              >
                                <Link
                                  passHref
                                  href={`${urlPrefix}${pluginUrl}/settings/products/${item.product_id}`}
                                >
                                  <div>
                                    {englishNumberToPersianNumber(
                                      modifier.amount || 1
                                    )}{" "}
                                    x {modifier.modifier_title}
                                  </div>
                                </Link>{" "}
                              </div>
                              <div
                                style={{
                                  flex: 2,
                                  color: graphite,
                                  fontWeight: 400,
                                }}
                                className="text-right"
                              >
                                {priceFormatter(
                                  modifier.discounted_price *
                                    (modifier.amount || 1)
                                )}
                                <Icon
                                  icon={$}
                                  width={21}
                                  height={21}
                                  color={graphite}
                                  className="mr-1"
                                />
                              </div>
                            </div>
                          ))}
                          <div className="d-flex justify-content-between align-items-center">
                            <div
                              style={{
                                flex: 3,
                                color: night,
                                direction: "ltr",
                              }}
                            >
                              <span>
                                <Icon
                                  icon={$}
                                  width={21}
                                  height={21}
                                  color={graphite}
                                  className="mr-1"
                                />
                                <span>{priceFormatter(itemFinalPrice)} </span>
                              </span>
                              <span> X </span>
                              <span>
                                {englishNumberToPersianNumber(item.amount)}
                              </span>
                            </div>
                            <div style={{ flex: 2 }} className="text-right">
                              {priceFormatter(itemFinalPrice * item.amount)}
                              <Icon
                                icon={$}
                                width={21}
                                height={21}
                                color={graphite}
                                className="mr-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Paper>
            )}
            {/* <Paper
              elevation={2}
              className="mb-3 d-flex flex-1 flex-column"
              style={{ background: "#F0F2F3" }}
            >
              <div className="px-5 pt-5 pb-4" style={{ fontWeight: 500 }}>
                Item deducted({englishNumberToPersianNumber(itemsCount)})
              </div>

              <div className="px-5 pb-5">
                {order?.items?.map((item, index) => {
                  const itemFinalPrice =
                    item.discounted_price +
                    item.modifiers.reduce(
                      (sum, modifier) => sum + modifier.discounted_price,
                      0
                    );

                  return (
                    <div
                      key={item.product_id}
                      className={`d-flex justify-content-between align-items-start ${
                        index === 0 ? "" : "mt-5"
                      }`}
                    >
                      <div className="pl-3" style={{ cursor: "pointer" }}>
                        <div
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 8,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={item.main_image_thumbnail_url}
                            alt=""
                            className="w-100 h-100"
                          />
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="d-flex justify-content-between align-items-start pb-3">
                          <div
                            style={{
                              flex: 3,
                              color: theme.palette.primary.main,
                            }}
                          >
                            <Link
                              href={`${urlPrefix}${pluginUrl}/settings/products/${
                                item.super_product_id || item.product_id
                              }`}
                            >
                              {item.product_title}
                            </Link>{" "}
                            {item.variation_title && (
                              <>
                                /{" "}
                                <Link
                                  href={`${urlPrefix}${pluginUrl}/settings/products/${
                                    item.super_product_id || item.product_id
                                  }/variations/${item.variation_id}`}
                                >
                                  {item.variation_title || ""}
                                </Link>
                              </>
                            )}
                          </div>
                          <div>
                            {item.initial_price !==
                              item.discounted_price && (
                              <div className="d-flex" style={{ color: smoke }}>
                                <div className="u-text-line-through ">
                                  {priceFormatter(item.initial_price)}
                                </div>
                                <div
                                  style={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 500,
                                  }}
                                >
                                  {englishNumberToPersianNumber(
                                    calculateDiscountPercent(
                                      item.initial_price,
                                      item.discounted_price
                                    )
                                  )}
                                  <span className="mr-1">٪</span>
                                </div>
                              </div>
                            )}
                            <div style={{ flex: 2 }} className="text-right">
                              {priceFormatter(item.discounted_price)}
                              <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                              className="mr-1"
                            />
                            </div>
                          </div>
                        </div>
                        {item.modifiers.map((modifier) => (
                          <div
                            className="d-flex justify-content-between align-items-center pb-3"
                            key={modifier.id}
                          >
                            <div
                              style={{
                                flex: 3,
                                color: smoke,
                                fontSize: 12,
                              }}
                            >
                              <Link
                                href={`${urlPrefix}${pluginUrl}/settings/products/${item.product_id}`}
                              >
                                {modifier.title}
                              </Link>{" "}
                            </div>
                            <div
                              style={{
                                flex: 2,
                                color: graphite,
                                fontWeight: 400,
                              }}
                              className="text-right"
                            >
                              {priceFormatter(
                                modifier.discounted_price * (modifier.amount || 1)
                              )}
                              <img src={$} className="mr-1" />
                            </div>
                          </div>
                        ))}
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            style={{
                              flex: 3,
                              color: night,
                              direction: "ltr",
                            }}
                          >
                            <span>
                              <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                              className="mr-1"
                            />
                              <span>{priceFormatter(itemFinalPrice)} </span>
                            </span>
                            <span> X </span>
                            <span>
                              {englishNumberToPersianNumber(item.amount)}
                            </span>
                          </div>
                          <div style={{ flex: 2 }} className="text-right">
                            {priceFormatter(itemFinalPrice * item.amount)}
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                              className="mr-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Paper> */}
            {!iframe_from_pos && (
              <Paper color={theme.palette.text.tertiary} elevation={2}>
                <div
                  className="pt-5 px-5 d-flex align-items-center justify-content-between"
                  style={{ fontWeight: 500 }}
                >
                  <div>
                    Final Factor{" "}
                    {minWidth768 && (
                      <span
                        style={{
                          fontSize: 12,
                          color: graphite,
                        }}
                      >
                        (Tracking order:{" "}
                        {englishNumberToPersianNumber(order?.order_id)})
                      </span>
                    )}
                    {!minWidth768 && (
                      <div
                        className="position-absolute mt-2"
                        style={{
                          fontSize: 12,
                          color: smoke,
                        }}
                      >
                        (Tracking order:{" "}
                        {englishNumberToPersianNumber(order?.order_id)})
                      </div>
                    )}
                  </div>

                  {!loading && order?.id ? (
                    <div className="d-flex align-items-center">
                      <div>
                        <CustomChip
                          label={paymentStates[order?.payment_status]?.label}
                          backgroundColor={
                            paymentStates[order?.payment_status]
                              ?.backgroundColor
                          }
                          color={paymentStates[order?.payment_status]?.color}
                          progress={
                            paymentStates[order?.payment_status]?.progress
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <div
                    style={{ color: night }}
                    className={minWidth768 ? "py-4 px-5" : "mt-3 py-4 px-5"}
                  >
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div>
                        price of products({englishNumberToPersianNumber(itemsCount)}
                        )
                      </div>
                      <div style={{ flex: 2 }} className="text-right">
                        {priceFormatter(order?.total_items_initial_price)}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div>Discount Products</div>
                      <div style={{ flex: 2 }} className="text-right">
                        {priceFormatter(order?.discount_from_items)}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center py-2"
                      style={{
                        color: coal,
                        fontWeight: 500,
                      }}
                    >
                      <div>Total</div>
                      <div style={{ flex: 2 }} className="text-right">
                        {priceFormatter(order?.final_items_price)}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div>Tax</div>
                      <div style={{ flex: 2 }} className="text-right">
                        {priceFormatter(order?.taxing_price)}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div>shipping cost</div>
                      <div style={{ flex: 2 }} className="text-right">
                        {priceFormatter(order?.delivery_price)}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div>Packaging cost</div>
                      <div style={{ flex: 2 }} className="text-right">
                        {priceFormatter(order?.total_packaging_price)}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                    {shoppingPluginData?.taxing_percent ? (
                      <div className="d-flex justify-content-between align-items-center py-2">
                        <div>
                          Tax( ٪
                          {englishNumberToPersianNumber(
                            shoppingPluginData?.taxing_percent
                          )}
                          )
                        </div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.taxing_price)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div>Gift credit</div>
                      <div style={{ flex: 2 }} className="text-right">
                        {order?.gift_credit_used ? "-" : ""}
                        {priceFormatter(order?.gift_credit_used)}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                    {order?.discount_code_amount ? (
                      <div className="d-flex justify-content-between align-items-center pt-2">
                        <div>Discount(discount code)</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.discount_code_amount)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    {order?.coupon_discount_amount ? (
                      <div className="d-flex justify-content-between align-items-center pt-2">
                        <div>Discounts by coupon</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.coupon_discount_amount)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    {order?.custom_discount_amount ? (
                      <div className="d-flex justify-content-between align-items-center pt-2">
                        <div>Discounts of desire</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.custom_discount_amount)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    {order?.total_discount_amount ? (
                      <div className="d-flex justify-content-between align-items-center pt-2">
                        <div>The total discount</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.total_discount_amount)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <hr
                    style={{
                      border: "none",
                      borderBottom: "1px solid #EDEDED",
                    }}
                  />
                  <div>
                    <div
                      className="d-flex justify-content-between align-items-center pb-5 pt-4 px-5 flex-column"
                      style={{
                        color: coal,
                        fontWeight: 500,
                      }}
                    >
                      <div className="d-flex justify-content-between w-100 pb-2">
                        <span>The amount payable</span>
                        <span>
                          {priceFormatter(order?.total_price)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </span>
                      </div>
                      <div className="d-flex justify-content-between w-100 pb-2">
                        <div className="d-flex align-items-center">
                          <span className="ml-1">The amount paid</span>
                          <Link
                            passHref
                            href={`${urlPrefix}${pluginUrl}/settings/transactions?order_id=${
                              order?.id || 0
                            }`}
                            disabled={loading}
                          >
                            <div
                              className="mr-2 d-flex align-items-center"
                              style={{
                                color: loading
                                  ? smoke
                                  : theme.palette.primary.main,
                                cursor: "pointer",
                                lineHeight: "initial",
                              }}
                            >
                              Transactions
                              <ChevronLeftRoundedIcon
                                fontSize="small"
                                style={{
                                  color: loading
                                    ? smoke
                                    : theme.palette.primary.main,
                                }}
                              />
                            </div>
                          </Link>
                        </div>
                        <span>
                          {priceFormatter(order?.paid_price)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </span>
                      </div>
                      <div className="d-flex justify-content-between w-100 pb-2">
                        <span>Remaining</span>
                        <span>
                          {priceFormatter(order?.should_pay)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </span>
                      </div>
                      {receiptImageUrl ? (
                        <div
                          className={`d-flex flex-wrap justify-content-between align-items-start w-100 pb-2 mt-3`}
                        >
                          <span className={"mb-3"}>
                            Card Receipt Picture
                          </span>
                          <div
                            tabIndex="0"
                            className="position-relative image-preview u-cursor-pointer"
                            onClick={() => setIsOpenModal(true)}
                            style={{
                              width: 160,
                              height: "auto",
                            }}
                          >
                            <LazyImage
                              style={{ width: 160, height: "auto" }}
                              className="image-preview"
                              alt=""
                              src={receiptImageUrl}
                            />
                            <div className="position-absolute bottom-0 right-8 u-cursor-pointer">
                              <FullscreenOutlinedIcon
                                fontSize="small"
                                color="primary"
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {Boolean(order?.should_pay) ? (
                      <div
                        className="pb-5 px-5"
                        style={{
                          fontSize: 13,
                          color: theme.palette.error.main,
                        }}
                      >
                        {order.order_status !== NEW_ORDER_STATUS_VOID &&
                        order.order_status !== NEW_ORDER_STATUS_COMP
                          ? Math.sign(order?.should_pay) === 1
                            ? `Customer to you${priceFormatter(
                                order?.should_pay
                              )} $ owes.`
                            : `You${priceFormatter(
                                order?.should_pay * -1
                              )} $ owed to the customer.`
                          : null}
                      </div>
                    ) : null}
                  </div>
                  <hr
                    style={{
                      border: "none",
                      borderBottom: "1px solid #EDEDED",
                    }}
                  />
                  {(Boolean(order?.should_pay) ||
                    order.order_status === NEW_ORDER_STATUS_VOID ||
                    order.order_status === NEW_ORDER_STATUS_COMP) && (
                    <div
                      className={minWidth768 ? "py-4 px-5" : "mt-3 py-4 px-5"}
                    >
                      {order.order_status !== NEW_ORDER_STATUS_VOID &&
                      order.order_status !== NEW_ORDER_STATUS_COMP ? (
                        Math.sign(order?.should_pay) === 1 ? (
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{
                                direction: "ltr",
                              }}
                              startIcon={<KeyboardArrowUpRoundedIcon />}
                              onClick={(e) => toggleRecieveMoneyMenu(true, e)}
                            >
                              Get money from the customer
                            </Button>
                            <Menu
                              elevation={1}
                              anchorEl={recieveMoneyAnchorEl}
                              keepMounted
                              open={Boolean(recieveMoneyAnchorEl)}
                              onClose={() => toggleRecieveMoneyMenu(false)}
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
                                onClick={() => {
                                  toggleModal(
                                    RECIEVE_MONEY_FROM_CUSTOMER_BY_CASH_MODAL,
                                    true
                                  );
                                  toggleRecieveMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-in-cash.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Cash paid
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  toggleModal(
                                    RECIEVE_MONEY_FROM_CUSTOMER_BY_CART_MODAL,
                                    true
                                  );
                                  toggleRecieveMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-by-cart.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Paid by card to card
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  toggleModal(
                                    RECIEVE_MONEY_FROM_CUSTOMER_BY_SMS_MODAL,
                                    true
                                  );
                                  toggleRecieveMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-by-sms.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Payment link SMS
                              </MenuItem>
                              {Boolean(userGiftCredit) ? (
                                <MenuItem
                                  onClick={() => {
                                    toggleModal(
                                      RECIEVE_MONEY_FROM_CUSTOMER_BY_WALLET_MODAL,
                                      true
                                    );
                                    toggleRecieveMoneyMenu(false);
                                  }}
                                  disabled={loading}
                                >
                                  <img
                                    src={`/images/recieve-money-by-credit.svg`}
                                    style={{
                                      width: 20,
                                      height: 20,
                                    }}
                                    className="ml-5"
                                  />
                                  Receive from the wallet
                                </MenuItem>
                              ) : null}
                            </Menu>
                          </div>
                        ) : (
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{
                                direction: "ltr",
                              }}
                              startIcon={<KeyboardArrowUpRoundedIcon />}
                              onClick={(e) => toggleReturnMoneyMenu(true, e)}
                            >
                              Return money to the customer
                            </Button>
                            <Menu
                              elevation={1}
                              anchorEl={returnMoneyAnchorEl}
                              keepMounted
                              open={Boolean(returnMoneyAnchorEl)}
                              onClose={() => toggleReturnMoneyMenu(false)}
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
                                onClick={() => {
                                  toggleModal(
                                    RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL,
                                    true
                                  );
                                  toggleReturnMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-in-cash.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Payment of cash or card to card
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  toggleModal(
                                    RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL,
                                    true
                                  );
                                  toggleReturnMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-by-credit.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Transfer to the wallet
                              </MenuItem>
                            </Menu>
                          </div>
                        )
                      ) : null}
                    </div>
                  )}
                </div>
              </Paper>
            )}
            {order?.delivery_site_type?.toUpperCase() === FULFILLMENT_ON_CAR &&
              (order?.user_address?.extra_data?.model_name ||
                order?.user_address?.extra_data?.color ||
                order?.user_address?.extra_data?.plate_number) && (
                <Paper className="mt-3 py-5 px-5">
                  <div style={{ fontWeight: 500 }}>The recipient's profile</div>
                  <div className="py-2">
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 400,
                        color: "#98A9B1",
                      }}
                      className="pb-1"
                    >
                      Car information
                    </div>
                  </div>
                  <div className="row d-flex align-items-center">
                    {order?.user_address?.extra_data?.model_name && (
                      <div className="col-sm-3">
                        Model: {order?.user_address?.extra_data?.model_name}
                      </div>
                    )}
                    {order?.user_address?.extra_data?.color && (
                      <div className="col-sm-4">
                        Color:
                        {order?.user_address?.extra_data?.color}
                      </div>
                    )}
                    {order?.user_address?.extra_data?.plate_number && (
                      <div className="d-flex align-items-center col-sm-5 mb-3">
                        <span>Plaque: </span>
                        <div
                          className="d-flex"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <div
                            className="d-flex justify-content-center py-1 px-3 position-relative"
                            style={{
                              border: "1px solid gray",
                            }}
                          >
                            <span
                              className="position-absolute"
                              style={{ top: 0 }}
                            >
                              Iran
                            </span>
                            <span className="ml-2 pt-3">
                              {plateNums?.slice(5)}
                            </span>
                          </div>
                          <div
                            className="py-1 pt-3 px-3"
                            style={{
                              border: "1px solid gray",
                            }}
                          >
                            <span className="ml-2">
                              {plateNums?.slice(2, 5)}
                            </span>
                            <span className="ml-2">{pelateChar}</span>
                            <span>{plateNums?.slice(0, 2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Paper>
              )}
            {!iframe_from_pos &&
              order?.delivery_site_type?.toUpperCase() ===
                FULFILLMENT_ON_BUSINESS_SITE && (
                <Paper
                  elevation={2}
                  className="my-3 d-flex flex-1 flex-column p-5"
                  style={{
                    backgroundColor:
                      (order.order_status === NEW_ORDER_STATUS_VOID ||
                        order.order_status === NEW_ORDER_STATUS_COMP) &&
                      hexToRGBA(strawberryI, 0.05),
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#98A9B1",
                    }}
                  >
                    The table number
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: hexToRGBA(night, 0.8),
                    }}
                  >
                    {order?.user_address?.extra_data?.table_number || "-"}
                  </div>
                </Paper>
              )}
            {!iframe_from_pos && !!order.utm_data && (
              <Paper
                elevation={2}
                className="my-3 d-flex flex-1 flex-column p-5 text-right"
                style={{ direction: "ltr" }}
              >
                {utmItems.map((item) => (
                  <div key={item.label}>
                    {item.label}: {order.utm_data[item.key] || "-"}
                  </div>
                ))}
              </Paper>
            )}
            {!iframe_from_pos && (
              <Paper
                color={theme.palette.text.tertiary}
                elevation={2}
                className="mt-3"
              >
                {order?.delivery_site_type?.toUpperCase() ===
                  FULFILLMENT_ON_USER_SITE && (
                  <>
                    <div className="d-flex align-items-center justify-content-between px-5 pt-4 pb-2">
                      <div style={{ fontWeight: 500 }}>Send profile</div>
                    </div>
                    <div className="px-5 pt-2 pb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>How to send</div>
                        <div className="ml-1">
                          {order?.delivery_title || "-"}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div>shipping time</div>
                        <div className="ml-1">{finalDeliveryTime}</div>
                      </div>
                      {(order?.deliverer_name ||
                        order?.delivery_companies_data) && (
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div> Send by</div>
                          <div className="ml-1">
                            <a
                              style={{
                                color: theme.palette.primary.main,
                              }}
                              href={`tel:${
                                order?.deliverer_phone ||
                                order?.delivery_companies_data?.courier?.phone
                              }`}
                            >
                              {order?.deliverer_name ||
                                order?.delivery_companies_data?.courier?.name}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <Divider />
                  </>
                )}
                {!iframe_from_pos &&
                  order.order_status !== NEW_ORDER_STATUS_VOID &&
                  order.order_status !== NEW_ORDER_STATUS_COMP && (
                    <div className="px-5 py-3 d-flex justify-content-between">
                      <div>
                        {order?.order_status === NEW_ORDER_STATUS_ACCEPTED ? (
                          <Button variant="outlined" color="primary" disabled>
                            Accepted
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            onClick={() => {
                              toggleModal(ACCEPT_ORDER_MODAL, true);
                            }}
                          >
                            Confirm the order
                          </Button>
                        )}
                        {(order?.delivery_site_type?.toUpperCase() ===
                          FULFILLMENT_ON_USER_SITE) &
                          (order.order_status !== NEW_ORDER_STATUS_VOID ||
                            order.order_status !== NEW_ORDER_STATUS_COMP) &&
                        minWidth768 &&
                        deliveryManOptions.length ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={
                                order?.order_status !==
                                  NEW_ORDER_STATUS_ACCEPTED ||
                                loading ||
                                (order?.delivery_companies_data &&
                                  order?.delivery_companies_data
                                    ?.company_type !== "personal" &&
                                  order?.delivery_companies_data
                                    ?.company_type !== null)
                              }
                              className="mr-3"
                              style={{
                                direction: "ltr",
                              }}
                              startIcon={<KeyboardArrowUpRoundedIcon />}
                              onClick={(e) => toggleAssignPeykMenu(true, e)}
                            >
                              Determine the method of sending
                            </Button>
                            <Menu
                              elevation={1}
                              anchorEl={peykMenuAnchorEl}
                              keepMounted
                              open={Boolean(peykMenuAnchorEl)}
                              onClose={() => toggleAssignPeykMenu(false)}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              transformOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                            >
                              {deliveryManOptions.map((deliveryMan) => (
                                <MenuItem
                                  key={deliveryMan.id}
                                  onClick={() => {
                                    deliveryMan.onClick(order?.id);
                                    toggleAssignPeykMenu(false);
                                  }}
                                  disabled={loading}
                                >
                                  <img
                                    src={
                                      deliverersIcon[
                                        deliveryMan.value || "personal_peyk"
                                      ]
                                    }
                                    style={{
                                      width: 20,
                                      height: 20,
                                    }}
                                    className="ml-5"
                                  />

                                  {deliveryMan.text}
                                </MenuItem>
                              ))}
                            </Menu>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}
                {!iframe_from_pos &&
                (order.order_status !== NEW_ORDER_STATUS_VOID ||
                  order.order_status !== NEW_ORDER_STATUS_COMP) &&
                !minWidth768 &&
                deliveryManOptions.length ? (
                  <div className="px-5 pb-5">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={
                        order?.order_status !== NEW_ORDER_STATUS_ACCEPTED ||
                        loading ||
                        (order?.delivery_companies_data &&
                          order?.delivery_companies_data?.company_type !==
                            "personal" &&
                          order?.delivery_companies_data?.company_type !== null)
                      }
                      style={{ direction: "ltr" }}
                      startIcon={<KeyboardArrowUpRoundedIcon />}
                      onClick={(e) => toggleAssignPeykMenu(true, e)}
                    >
                      Determine the method of sending
                    </Button>
                    <Menu
                      elevation={1}
                      anchorEl={peykMenuAnchorEl}
                      keepMounted
                      open={Boolean(peykMenuAnchorEl)}
                      onClose={() => toggleAssignPeykMenu(false)}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      {deliveryManOptions?.map((deliveryMan) => (
                        <MenuItem
                          key={deliveryMan.id}
                          onClick={() => {
                            deliveryMan.onClick(order?.id);
                            toggleAssignPeykMenu(false);
                          }}
                          disabled={loading}
                        >
                          <img
                            src={
                              deliverersIcon[
                                deliveryMan.value || "personal_peyk"
                              ]
                            }
                            style={{
                              width: 20,
                              height: 20,
                            }}
                            className="ml-5"
                          />

                          {deliveryMan.text}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                ) : null}
                {(order.order_status === NEW_ORDER_STATUS_VOID ||
                  order.order_status === NEW_ORDER_STATUS_COMP) && (
                  <div className="px-5 pt-4 pb-3 mb-2 d-flex justify-content-end">
                    <Button variant="outlined" disabled>
                      Canceled
                    </Button>
                  </div>
                )}
              </Paper>
            )}
            {!iframe_from_pos &&
              order?.delivery_site_type?.toUpperCase() ===
                FULFILLMENT_ON_USER_SITE && (
                <Paper
                  color={theme.palette.text.tertiary}
                  elevation={2}
                  className="mt-3"
                >
                  <div className="d-flex flex-column justify-content-between px-5 pt-4 pb-4">
                    <div style={{ fontWeight: 500 }} className="mb-3">
                      Edit the time of submission
                    </div>
                    <ModernSwtich
                      texts={["Post time", "The time of precise submission"]}
                      toggleSwitch={() =>
                        setIsAbsoluteDeliveryTime(!isAbsoluteDeliveryTime)
                      }
                      isSwitchOn={isAbsoluteDeliveryTime}
                      className="mb-3"
                    />
                    {!isAbsoluteDeliveryTime && (
                      <DateRangePickerWrapper
                        passStartTimeToparent={(startTime) =>
                          setStartTimeOfDelivery(startTime)
                        }
                        passEndTimeToparent={(endTime) =>
                          setEndTimeOfDelivery(endTime)
                        }
                        startTime={startTimeOfDelivery}
                        endTime={endTimeOfDelivery}
                        hasTime="true"
                        keepOpenOnDateSelect
                        stateDateWrapper={moment}
                        maxDate={moment()}
                        startDatePlaceholderText="Date first"
                        endDatePlaceholderText="End date"
                        onDatesChange={({ startDate, endDate }) => {
                          if (startDate) {
                            const newStartDateOfDelivery =
                              persianToEnglishNumber(
                                startDate?.format("YYYY-MM-DD")
                              );
                            setStartDateOfDelivery(newStartDateOfDelivery);
                          }
                          if (endDate) {
                            const newEndDateOfDelivery = persianToEnglishNumber(
                              endDate?.format("YYYY-MM-DD")
                            );
                            setEndDateOfDelivery(newEndDateOfDelivery);
                          }
                        }}
                        numberOfMonths={1}
                        renderMonthText={(month) =>
                          moment(month).format("MMMM YYYY")
                        }
                        renderDayContents={(day) => moment(day).format("jD")}
                      />
                    )}
                    {isAbsoluteDeliveryTime && (
                      <MuiPickersUtilsProvider
                        utils={JalaliUtils}
                        locale={"fa"}
                      >
                        <DateTimePicker
                          inputVariant="outlined"
                          fullWidth={true}
                          okLabel="Confirmation"
                          cancelLabel="Cancellation"
                          disablePast={true}
                          ampm={false}
                          required
                          invalidDateMessage="The selected time is not correct."
                          minDateMessage="Date of the past days is not allowed"
                          label="shipping time"
                          minTime={new Date(0, 0, 0, 9)}
                          labelFunc={(date) =>
                            date ? date.format("YYYY/MM/DD hh:mm:ss a") : ""
                          }
                          value={absoluteDeliveryTime}
                          onChange={(date) => setAbsoluteDeliveryTime(date)}
                        />
                      </MuiPickersUtilsProvider>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      className="mt-3"
                      disabled={loading}
                      style={{
                        direction: "ltr",
                        width: 150,
                      }}
                      onClick={() =>
                        toggleModal(EDIT_DELIVERY_TIME_MODAL, true)
                      }
                    >
                      Edit the time of submission
                    </Button>
                  </div>
                </Paper>
              )}
            {!iframe_from_pos &&
              order?.delivery_site_type?.toUpperCase() ===
                FULFILLMENT_ON_USER_SITE && (
                <div
                  className="mt-3 d-flex align-items-center"
                  style={{ fontSize: 12, color: smoke }}
                >
                  <ErrorRoundedIcon style={{ color: smoke }} />
                  <span className="mr-1">
                    If you select the courier by determining the method of sending your desired courier
                    Your request will be sent in the moment.
                  </span>
                </div>
              )}
            {!iframe_from_pos &&
            Object.entries(orderHistoryByDate || {}).length ? (
              <Paper
                color={theme.palette.text.tertiary}
                elevation={2}
                className="mt-3"
              >
                <div className="d-flex align-items-center justify-content-between px-5 pt-4 pb-2">
                  <div style={{ fontWeight: 500 }}>History</div>
                </div>
                <div className="mt-2 pb-4 px-5">
                  {Object.entries(orderHistoryByDate || {})
                    .sort(
                      (a, b) =>
                        new Date(moment(b[0], "jYYYY_jMM_jDD")).getTime() -
                        new Date(moment(a[0], "jYYYY_jMM_jDD")).getTime()
                    )
                    .map(([date, order_histories]) => {
                      const _date = new Date(moment(date, "YYYY/M/D"));
                      const momentTime = moment(
                        `${_date.getFullYear()}-${
                          _date.getMonth() + 1
                        }-${_date.getDate()}`,
                        "YYYY-MM-DD"
                      );
                      const weekday =
                        _date.getDate() === new Date().getDate() &&
                        _date.getMonth() === new Date().getMonth() &&
                        _date.getFullYear() === new Date().getFullYear()
                          ? "Today"
                          : getWeekDay(momentTime?.isoWeekday());
                      const formattedTime =
                        weekday === "Today" ? weekday : formatDate(date);
                      return (
                        <div className="mt-5" key={date}>
                          <div
                            style={{
                              color: "#6D7175",
                            }}
                          >
                            {formattedTime}
                          </div>
                          <div className="position-relative mt-2">
                            {order_histories.length > 1 ? (
                              <div
                                className="w-100 position-absolute mr-1 mt-2"
                                style={{
                                  height: "calc(100% - 16px)",
                                  borderRight: `1px dashed ${theme.palette.primary.main}`,
                                }}
                              ></div>
                            ) : null}
                            {order_histories
                              .sort(
                                (a, b) =>
                                  new Date(b.timestamp).getTime() -
                                  new Date(a.timestamp).getTime()
                              )
                              .map((order_history) => {
                                const _momentTime = moment(
                                  order_history?.timestamp
                                );
                                return (
                                  <div
                                    className="timeline-item position-relative pr-4 mb-5"
                                    style={{
                                      color: "#575959",
                                    }}
                                    key={order_history?.timestamp}
                                  >
                                    <div
                                      className="position-absolute"
                                      style={{
                                        right: 0,
                                        top: 4,

                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        backgroundColor:
                                          process.env
                                            .NEXT_PUBLIC_ADMIN_THEME_COLOR,
                                      }}
                                    ></div>
                                    <div className="pr-3 d-flex justify-content-between align-items-center">
                                      <div>
                                        {orderTimeLineComponentsByType[
                                          order_history?.reason_string
                                        ]?.(order_history?.modifier_user_name)}
                                      </div>
                                      <div>
                                        {englishNumberToPersianNumber(
                                          _momentTime.format("HH:mm")
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Paper>
            ) : null}{" "}
            {iframe_from_pos && (
              <Paper
                color={theme.palette.text.tertiary}
                elevation={2}
                className="mt-3"
              >
                <div className="d-flex align-items-center justify-content-between px-5 pt-5 pb-3">
                  <div style={{ fontWeight: 500 }}>Customer</div>
                  {order?.user_id ? null : (
                    <div>
                      <Button
                        color="primary"
                        size="small"
                        disabled={loading}
                        style={{ direction: "ltr" }}
                        endIcon={<AddRoundedIcon fontSize="small" />}
                        onClick={() => toggleModal(ASSIGN_CUSTOMER_MODAL, true)}
                      >
                        Customer Selection
                      </Button>
                    </div>
                  )}
                </div>
                {orderCRM ? (
                  <div>
                    <div className="d-flex justify-content-between align-items-center px-5">
                      <div
                        style={{
                          cursor: "pointer",
                          color: theme.palette.primary.main,
                          textDecoration: "underline",
                        }}
                        onClick={() =>
                          toggleModal(EDIT_USER_IN_ORDER_MODAL, true)
                        }
                      >
                        {order?.user_address?.name || "-"}
                      </div>
                      <CopyToClipboard
                        text={order?.user_address?.phone}
                        onCopy={() =>
                          _setSnackBarMessage(
                            "The number was stored in your device's memory.",
                            "success"
                          )
                        }
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{
                            color: pollution,
                            cursor: "pointer",
                          }}
                        >
                          <div className="ml-2">
                            <FileCopyOutlinedIcon fontSize="small" />
                          </div>
                          <div>
                            {englishNumberToPersianNumber(
                              order?.user_address?.phone || "-"
                            )}
                          </div>
                        </div>
                      </CopyToClipboard>
                    </div>

                    <div
                      className="d-flex justify-content-between align-items-center px-5 py-4"
                      style={{ color: night }}
                    >
                      <div>Customer address</div>
                      <div>
                        <Button
                          color="primary"
                          size="small"
                          disabled={loading}
                          style={{ direction: "ltr" }}
                          endIcon={<EditRoundedIcon fontSize="small" />}
                          onClick={() => {
                            toggleModal(CHANGE_ADDRESS_MODAL, true);
                            _getCustomerAddresses({
                              id: order.user_id,
                            });
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div style={{ color: pollution }} className="px-5 pb-4">
                      {order?.user_address?.address || "-"}
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      {order?.user_address?.number ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">Plaque</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.number
                            )}
                          </span>
                        </div>
                      ) : null}
                      {order?.user_address?.unit ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">One</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.unit
                            )}
                          </span>
                        </div>
                      ) : null}
                      {order?.user_address?.postal_code ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">Postal code</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.postal_code
                            )}
                          </span>
                        </div>
                      ) : null}
                      {order?.user_address?.city ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">Destination city</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.city
                            )}
                          </span>
                        </div>
                      ) : null}
                      {order?.user_address?.national_id ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">National Code</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.national_id
                            )}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div className="px-5 py-5">
                      <div onClick={() => toggleModal(NAVIGATION_MODAL, true)}>
                        <Map options={mapOptions} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="px-5 pb-5"
                    style={{
                      color: pollution,
                      fontSize: 13,
                    }}
                  >
                    No customer selected{" "}
                  </div>
                )}
              </Paper>
            )}
          </div>
          <div
            className={`${
              minWidth768 ? "pr-2 pl-0 col-5" : "px-0 col-12"
            } pt-4`}
          >
            <Paper color={theme.palette.text.tertiary} elevation={2}>
              <div className="d-flex align-items-center justify-content-between px-5 py-4">
                <div style={{ fontWeight: 500, fontSize: 16 }}>
                  Customer description
                </div>
                <div>
                  <Button
                    color="primary"
                    size="small"
                    disabled={loading}
                    style={{ direction: "ltr" }}
                    endIcon={
                      order?.description ? (
                        <EditRoundedIcon fontSize="small" />
                      ) : (
                        <AddRoundedIcon fontSize="small" />
                      )
                    }
                    onClick={() =>
                      toggleModal(ADD_CUSTOMER_DESCRIPTION_MODAL, true)
                    }
                  >
                    {order?.description ? "Edit" : "Add"}
                  </Button>
                </div>
              </div>
              {order?.description ? (
                <div
                  className="px-5 pb-4"
                  style={{ color: pollution, fontSize: 13 }}
                >
                  {order?.description}
                </div>
              ) : (
                <div
                  className="px-5 pb-4"
                  style={{ color: pollution, fontSize: 13 }}
                >
                  Not recorded explanations.
                </div>
              )}
            </Paper>
            {iframe_from_pos && (
              <Paper
                color={theme.palette.text.tertiary}
                elevation={2}
                className="mt-3"
              >
                <div
                  className="pt-5 px-5 d-flex align-items-center justify-content-between"
                  style={{ fontWeight: 500 }}
                >
                  <div>
                    Final Factor{" "}
                    {minWidth768 && (
                      <span
                        style={{
                          fontSize: 12,
                          color: graphite,
                        }}
                      >
                        (Tracking order:{" "}
                        {englishNumberToPersianNumber(order?.order_id)})
                      </span>
                    )}
                    {!minWidth768 && (
                      <div
                        className="position-absolute mt-2"
                        style={{
                          fontSize: 12,
                          color: smoke,
                        }}
                      >
                        (Tracking order:{" "}
                        {englishNumberToPersianNumber(order?.order_id)})
                      </div>
                    )}
                  </div>

                  {!loading && order?.id ? (
                    <div className="d-flex align-items-center">
                      <div>
                        <CustomChip
                          label={paymentStates[order?.payment_status]?.label}
                          backgroundColor={
                            paymentStates[order?.payment_status]
                              ?.backgroundColor
                          }
                          color={paymentStates[order?.payment_status]?.color}
                          progress={
                            paymentStates[order?.payment_status]?.progress
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <div
                    style={{ color: night }}
                    className={minWidth768 ? "py-4 px-5" : "mt-3 py-4 px-5"}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center py-2"
                      style={{
                        color: coal,
                        fontWeight: 500,
                      }}
                    >
                      <div>Initial price</div>
                      <div style={{ flex: 2 }} className="text-right">
                        {priceFormatter(order?.total_items_inital_price)}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                          className="mr-1"
                        />
                      </div>
                    </div>
                    {order?.total_discount_amount ? (
                      <div className="d-flex justify-content-between align-items-center pt-2">
                        <div>The sum of the discounts and the credit of the gift</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.total_discount_amount)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    {order?.gift_credit_used ? (
                      <div className="d-flex justify-content-between align-items-center py-2">
                        <div>Gift credit</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {order?.gift_credit_used ? "-" : ""}
                          {priceFormatter(order?.gift_credit_used)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    {order?.discount_code_amount ? (
                      <div className="d-flex justify-content-between align-items-center pt-2">
                        <div>Discount(discount code)</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.discount_code_amount)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    {order?.total_packaging_price ? (
                      <div className="d-flex justify-content-between align-items-center py-2">
                        <div>Packaging cost</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.total_packaging_price)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    {order?.delivery_price ? (
                      <div className="d-flex justify-content-between align-items-center py-2">
                        <div>shipping cost</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.delivery_price)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    {order?.taxing_price ? (
                      <div className="d-flex justify-content-between align-items-center py-2">
                        <div>Tax</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.taxing_price)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}

                    {shoppingPluginData?.taxing_percent ? (
                      <div className="d-flex justify-content-between align-items-center py-2">
                        <div>
                          Tax( ٪
                          {englishNumberToPersianNumber(
                            shoppingPluginData?.taxing_percent
                          )}
                          )
                        </div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.taxing_price)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}

                    {order?.coupon_discount_amount ? (
                      <div className="d-flex justify-content-between align-items-center pt-2">
                        <div>Discounts by coupon</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.coupon_discount_amount)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                    {order?.custom_discount_amount ? (
                      <div className="d-flex justify-content-between align-items-center pt-2">
                        <div>Discounts of desire</div>
                        <div style={{ flex: 2 }} className="text-right">
                          {priceFormatter(order?.custom_discount_amount)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <hr
                    style={{
                      border: "none",
                      borderBottom: "1px solid #EDEDED",
                    }}
                  />
                  <div>
                    <div
                      className="d-flex justify-content-between align-items-center pb-5 pt-4 px-5 flex-column"
                      style={{
                        color: coal,
                        fontWeight: 500,
                      }}
                    >
                      <div className="d-flex justify-content-between w-100 pb-2">
                        <span>The amount payable</span>
                        <span>
                          {priceFormatter(order?.total_price)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </span>
                      </div>
                      <div className="d-flex justify-content-between w-100 pb-2">
                        <div className="d-flex align-items-center">
                          <span className="ml-1">The amount paid</span>
                          <Link
                            passHref
                            href={`${urlPrefix}${pluginUrl}/settings/transactions?order_id=${
                              order?.id || 0
                            }`}
                            disabled={loading}
                          >
                            <div
                              className="mr-2 d-flex align-items-center"
                              style={{
                                color: loading
                                  ? smoke
                                  : theme.palette.primary.main,
                                cursor: "pointer",
                                lineHeight: "initial",
                              }}
                            >
                              Transactions
                              <ChevronLeftRoundedIcon
                                fontSize="small"
                                style={{
                                  color: loading
                                    ? smoke
                                    : theme.palette.primary.main,
                                }}
                              />
                            </div>
                          </Link>
                        </div>
                        <span>
                          {priceFormatter(order?.paid_price)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </span>
                      </div>
                      <div className="d-flex justify-content-between w-100 pb-2">
                        <span>Remaining</span>
                        <span>
                          {priceFormatter(order?.should_pay)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </span>
                      </div>
                    </div>
                    {Boolean(order?.should_pay) ? (
                      <div
                        className="pb-5 px-5"
                        style={{
                          fontSize: 13,
                          color: theme.palette.error.main,
                        }}
                      >
                        {order.order_status !== NEW_ORDER_STATUS_VOID &&
                        order.order_status !== NEW_ORDER_STATUS_COMP
                          ? Math.sign(order?.should_pay) === 1
                            ? `Customer to you${priceFormatter(
                                order?.should_pay
                              )} $ owes.`
                            : `You${priceFormatter(
                                order?.should_pay * -1
                              )} $ owed to the customer.`
                          : null}
                      </div>
                    ) : null}
                  </div>
                  <hr
                    style={{
                      border: "none",
                      borderBottom: "1px solid #EDEDED",
                    }}
                  />
                  {(Boolean(order?.should_pay) ||
                    order.order_status === NEW_ORDER_STATUS_VOID ||
                    order.order_status === NEW_ORDER_STATUS_COMP) && (
                    <div
                      className={minWidth768 ? "py-4 px-5" : "mt-3 py-4 px-5"}
                    >
                      {order.order_status !== NEW_ORDER_STATUS_VOID &&
                      order.order_status !== NEW_ORDER_STATUS_COMP ? (
                        Math.sign(order?.should_pay) === 1 ? (
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{
                                direction: "ltr",
                              }}
                              startIcon={<KeyboardArrowUpRoundedIcon />}
                              onClick={(e) => toggleRecieveMoneyMenu(true, e)}
                            >
                              Get money from the customer
                            </Button>
                            <Menu
                              elevation={1}
                              anchorEl={recieveMoneyAnchorEl}
                              keepMounted
                              open={Boolean(recieveMoneyAnchorEl)}
                              onClose={() => toggleRecieveMoneyMenu(false)}
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
                                onClick={() => {
                                  toggleModal(
                                    RECIEVE_MONEY_FROM_CUSTOMER_BY_CASH_MODAL,
                                    true
                                  );
                                  toggleRecieveMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-in-cash.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Cash paid
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  toggleModal(
                                    RECIEVE_MONEY_FROM_CUSTOMER_BY_CART_MODAL,
                                    true
                                  );
                                  toggleRecieveMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-by-cart.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Paid by card to card
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  toggleModal(
                                    RECIEVE_MONEY_FROM_CUSTOMER_BY_SMS_MODAL,
                                    true
                                  );
                                  toggleRecieveMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-by-sms.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Payment link SMS
                              </MenuItem>
                              {Boolean(userGiftCredit) ? (
                                <MenuItem
                                  onClick={() => {
                                    toggleModal(
                                      RECIEVE_MONEY_FROM_CUSTOMER_BY_WALLET_MODAL,
                                      true
                                    );
                                    toggleRecieveMoneyMenu(false);
                                  }}
                                  disabled={loading}
                                >
                                  <img
                                    src={`/images/recieve-money-by-credit.svg`}
                                    style={{
                                      width: 20,
                                      height: 20,
                                    }}
                                    className="ml-5"
                                  />
                                  Receive from the wallet
                                </MenuItem>
                              ) : null}
                            </Menu>
                          </div>
                        ) : (
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{
                                direction: "ltr",
                              }}
                              startIcon={<KeyboardArrowUpRoundedIcon />}
                              onClick={(e) => toggleReturnMoneyMenu(true, e)}
                            >
                              Return money to the customer
                            </Button>
                            <Menu
                              elevation={1}
                              anchorEl={returnMoneyAnchorEl}
                              keepMounted
                              open={Boolean(returnMoneyAnchorEl)}
                              onClose={() => toggleReturnMoneyMenu(false)}
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
                                onClick={() => {
                                  toggleModal(
                                    RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL,
                                    true
                                  );
                                  toggleReturnMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-in-cash.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Payment of cash or card to card
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  toggleModal(
                                    RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL,
                                    true
                                  );
                                  toggleReturnMoneyMenu(false);
                                }}
                                disabled={loading}
                              >
                                <img
                                  src={`/images/recieve-money-by-credit.svg`}
                                  style={{
                                    width: 20,
                                    height: 20,
                                  }}
                                  className="ml-5"
                                />
                                Transfer to the wallet
                              </MenuItem>
                            </Menu>
                          </div>
                        )
                      ) : null}
                    </div>
                  )}
                </div>
              </Paper>
            )}

            {!iframe_from_pos && (
              <Paper
                color={theme.palette.text.tertiary}
                className="mt-3"
                elevation={2}
              >
                <div className="d-flex align-items-center justify-content-between px-5 py-4">
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    Note
                  </div>
                  <div>
                    <Button
                      color="primary"
                      size="small"
                      disabled={loading}
                      style={{ direction: "ltr" }}
                      endIcon={<AddRoundedIcon fontSize="small" />}
                      onClick={() => toggleModal(ADD_NOTE_MODAL, true)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                {order?.comments?.length ? (
                  <div
                    className="px-5"
                    style={{
                      color: pollution,
                      fontSize: 13,
                    }}
                  >
                    {order?.comments?.map((note) => (
                      <div
                        key={note.id}
                        className=" pt-4 pb-4"
                        style={{
                          borderTop: "1px solid #E4E6E7",
                        }}
                      >
                        <p className="d-flex justify-content-between">
                          <span
                            style={{
                              color: theme.palette.text.tertiary,
                              fontWeight: 500,
                              fontSize: 12,
                            }}
                          >
                            {note.modifier_user_name
                              ? note.modifier_user_name
                              : "User without name"}
                          </span>
                          <span style={{ fontSize: 12 }}>
                            {englishNumberToPersianNumber(
                              moment(note.timestamp).format("YYYY/MM/DD")
                            )}
                          </span>
                        </p>

                        <p className=" pt-4" style={{ fontSize: 14 }}>
                          {note.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="px-5 pb-4"
                    style={{
                      color: pollution,
                      fontSize: 13,
                    }}
                  >
                    Not recorded.
                  </div>
                )}
              </Paper>
            )}
            {!iframe_from_pos && (
              <Paper
                color={theme.palette.text.tertiary}
                elevation={2}
                className="mt-3"
              >
                <div className="d-flex align-items-center justify-content-between px-5 pt-5 pb-3">
                  <div style={{ fontWeight: 500 }}>Customer</div>
                  {order?.membership_id && (
                    <Link
                      href={`${urlPrefix}/crm/customers/${order.membership_id}`}
                    >
                      <span
                        style={{
                          cursor: "pointer",
                          color: theme.palette.primary.main,
                          textDecoration: "underline",
                        }}
                      >
                        customer information
                      </span>
                    </Link>
                  )}
                  {order?.user_id ? null : (
                    <div>
                      <Button
                        color="primary"
                        size="small"
                        disabled={loading}
                        style={{ direction: "ltr" }}
                        endIcon={<AddRoundedIcon fontSize="small" />}
                        onClick={() => toggleModal(ASSIGN_CUSTOMER_MODAL, true)}
                      >
                        Customer Selection
                      </Button>
                    </div>
                  )}
                </div>
                {orderCRM ? (
                  <div>
                    <div className="d-flex justify-content-between align-items-center px-5">
                      <div
                        style={{
                          cursor: "pointer",
                          color: theme.palette.primary.main,
                          textDecoration: "underline",
                        }}
                        onClick={() =>
                          toggleModal(EDIT_USER_IN_ORDER_MODAL, true)
                        }
                      >
                        {order?.user_address?.name || "-"}
                      </div>
                      <CopyToClipboard
                        text={order?.user_address?.phone}
                        onCopy={() =>
                          _setSnackBarMessage(
                            "The number was stored in your device's memory.",
                            "success"
                          )
                        }
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{
                            color: pollution,
                            cursor: "pointer",
                          }}
                        >
                          <div className="ml-2">
                            <FileCopyOutlinedIcon fontSize="small" />
                          </div>
                          <div>
                            {englishNumberToPersianNumber(
                              order?.user_address?.phone || "-"
                            )}
                          </div>
                        </div>
                      </CopyToClipboard>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      {orderCRM.orders_report?.first_date ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">The date of the first order</span>
                          <span className="mb-1">
                            {englishNumberToPersianNumber(
                              moment(
                                new Date(
                                  orderCRM?.orders_report?.first_date * 1000
                                )
                              ).format("YYYY/MM/DD")
                            )}
                          </span>
                        </div>
                      ) : null}
                      {order?.user_address?.national_id ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">She.‌National</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.national_id
                            )}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <hr
                      className="mt-4"
                      style={{
                        border: "none",
                        borderBottom: "1px solid #F0F2F3",
                      }}
                    />
                    <div
                      className="d-flex justify-content-between align-items-center px-5 pt-4 pb-3"
                      style={{ color: night }}
                    >
                      <div>last order</div>
                      <div>Number of orders</div>
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center px-5 pb-3"
                      style={{ color: pollution }}
                    >
                      <div>
                        {orderCRM.orders_report?.last_date
                          ? englishNumberToPersianNumber(
                              moment(
                                new Date(
                                  orderCRM?.orders_report?.last_date * 1000
                                )
                              ).format("YYYY/MM/DD")
                            )
                          : "-"}
                      </div>
                      <div>
                        {englishNumberToPersianNumber(
                          orderCRM.orders_report?.count
                        )}
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center px-5 mt-3"
                      style={{ color: night }}
                    >
                      <div>Average purchase sums</div>
                      <div>Purchase sums</div>
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center px-5 pt-3 pb-4"
                      style={{ color: pollution }}
                    >
                      <div className="d-flex" style={{ alignItems: "end" }}>
                        <span
                          className="mx-1"
                          style={{
                            lineHeight: "initial",
                          }}
                        >
                          {orderCRM.orders_report?.total
                            ? priceFormatter(
                                Math.floor(
                                  orderCRM.orders_report?.total /
                                    orderCRM.orders_report?.count
                                )
                              )
                            : englishNumberToPersianNumber(0)}{" "}
                        </span>
                        <Icon
                          icon={$}
                          width={21}
                          height={19}
                          color={pollution}
                        />
                      </div>
                      <div className="d-flex" style={{ alignItems: "end" }}>
                        <span
                          className="mx-1"
                          style={{
                            lineHeight: "initial",
                          }}
                        >
                          {priceFormatter(orderCRM.orders_report?.total)}{" "}
                        </span>
                        <Icon
                          icon={$}
                          width={21}
                          height={19}
                          color={pollution}
                        />
                      </div>
                    </div>
                    <hr
                      // className="my-3"
                      style={{
                        border: "none",
                        borderBottom: "1px solid #F0F2F3",
                      }}
                    />
                    <div
                      className="d-flex justify-content-between align-items-center px-5 py-4"
                      style={{ color: night }}
                    >
                      <div>Customer address</div>
                      <div>
                        <Button
                          color="primary"
                          size="small"
                          disabled={loading}
                          style={{ direction: "ltr" }}
                          endIcon={<EditRoundedIcon fontSize="small" />}
                          onClick={() => {
                            toggleModal(CHANGE_ADDRESS_MODAL, true);
                            _getCustomerAddresses({
                              id: order.user_id,
                            });
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div style={{ color: pollution }} className="px-5 pb-4">
                      {order?.user_address?.address || "-"}
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      {order?.user_address?.number ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">Plaque</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.number
                            )}
                          </span>
                        </div>
                      ) : null}
                      {order?.user_address?.unit ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">One</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.unit
                            )}
                          </span>
                        </div>
                      ) : null}
                      {order?.user_address?.postal_code ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">Postal code</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.postal_code
                            )}
                          </span>
                        </div>
                      ) : null}
                      {order?.user_address?.city ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">Destination city</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.city
                            )}
                          </span>
                        </div>
                      ) : null}
                      {order?.user_address?.national_id ? (
                        <div
                          className="mt-2 px-5 d-flex flex-column"
                          style={{ color: pollution }}
                        >
                          <span className="mb-2">National Code</span>
                          <span className="mx-1">
                            {englishNumberToPersianNumber(
                              order?.user_address?.national_id
                            )}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div className="px-5 py-5">
                      <div onClick={() => toggleModal(NAVIGATION_MODAL, true)}>
                        <Map options={mapOptions} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="px-5 pb-5"
                    style={{
                      color: pollution,
                      fontSize: 13,
                    }}
                  >
                    No customer selected{" "}
                  </div>
                )}
              </Paper>
            )}
          </div>
        </div>
      </div>
      {iframe_from_pos && (
        <div
          style={{
            position: "sticky",
            bottom: 0,
            left: 0,
            background: "white",
          }}
          className="w-100 p-2 d-flex flex-wrap"
        >
          <div className="p-3" style={{ flex: 1 }}>
            {order?.order_status === NEW_ORDER_STATUS_ACCEPTED ? (
              <Button
                variant="outlined"
                color="primary"
                disabled
                className="w-100"
              >
                Accepted
              </Button>
            ) : order?.order_status === NEW_ORDER_STATUS_COMP ||
              order?.order_status === NEW_ORDER_STATUS_VOID ? (
              <Button
                variant="outlined"
                color="primary"
                disabled
                className="w-100"
              >
                Canceled
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                className="w-100"
                onClick={() => {
                  toggleModal(ACCEPT_ORDER_MODAL, true);
                }}
                disabled={loading}
                style={{ minWidth: 110 }}
              >
                Confirm the order
              </Button>
            )}
          </div>
          {order?.order_status === NEW_ORDER_STATUS_ACCEPTED ||
          order?.order_status === NEW_ORDER_STATUS_COMP ||
          order?.order_status === NEW_ORDER_STATUS_VOID ? null : (
            <div
              className="p-3 d-flex justify-content-between"
              style={{ flex: 1 }}
            >
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  toggleModal(CANCEL_ORDER_MODAL_VOID, true);
                  handleCloseMenu();
                }}
                className="d-flex align-items-center w-100"
                style={{
                  borderColor: theme.palette.error.main,
                  color: theme.palette.error.main,
                }}
              >
                <div>Cancellation</div>
              </Button>
            </div>
          )}

          <div className="p-3" style={{ flex: 1 }}>
            <Button
              color="primary"
              variant="outlined"
              className="w-100"
              onClick={() =>
                window.parent.postMessage(
                  JSON.stringify({ type: "order", order }),
                  "*"
                )
              }
              disabled={loading}
              style={{ minWidth: 110 }}
            >
              Order printing
            </Button>
          </div>
          {hami_integrated && (
            <div className="p-3" style={{ flex: 1 }}>
              <Button
                color="default"
                variant="outlined"
                className="w-100"
                onClick={() =>
                  window.parent.postMessage(
                    JSON.stringify({
                      type: "addToHami",
                      order,
                    }),
                    "*"
                  )
                }
                disabled={loading}
                style={{ minWidth: 110 }}
              >
                Transfer to the sponsor
              </Button>
            </div>
          )}
        </div>
      )}
      <SuccessMessageModal
        isOpen={isOpenSuccessModal}
        title="done successfully!"
        content="What if you not notice the new order?
              Smart robot“Showcase” Can contact you automatically and let you know new orders.
              This possibility is active in the professional and golden package."
        onClose={() => setIsOpenSuccessModal(false)}
        next={() => {
          setIsOpenSuccessModal(false);
          router.push(urlPrefix);
        }}
        image="/images/success-order.svg"
      />
      <OrderReceiptImageModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        image={receiptImageUrl}
        price={order?.total_price}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  adminOrder: makeSelectShoppingAdminOrder(),
  loading: makeSelectLoading(GET_SHOPPING_ADMIN_ORDER),
  urlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  pluginsData: makeSelectPlugins(),
  orderCRM: makeSelectOrderCRM(),
  orderDetail: makeSelectOrderDetail(),
  user: makeSelectUser(),
  adminDealsByIds: makeSelectDealsByIds(),
  businessLocation: makeSelectBusinessLocation(),
  themeColor: makeSelectBusinessThemeColor(),
  customerAddresses: makeSelectCustomerAddresses(),
  searchedCRMMembership: makeSelectSearchedCRMMembership(),
  journeyData: makeSelectJourneyState(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCustomerAddresses: (data) => dispatch(getCustomerAddresses(data)),
    _getAdminOrder: (id) => dispatch(getShoppingAdminOrder(id)),
    _getAdminOrderCRM: (id) => dispatch(getShoppingAdminOrderCRM(id)),
    _changeOrderStatus: (id, data, callback, deliveryTime) =>
      dispatch(changeOrderStatus(id, data, callback, deliveryTime)),
    _editOrder: (data, callback) =>
      dispatch(editShoppingAdminOrder(data, callback)),
    _assignDeliveryMan: (order_id, courier) =>
      dispatch(assignDeliveryMan(order_id, courier)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _returnExtraPaid: (id, data) =>
      dispatch(returnExtraPaidShoppingAdminOrder(id, data)),
    _sendReceipt: (id) => dispatch(sendReceiptShoppingAdminOrder(id)),
    _markAsPaid: (id, data) => dispatch(markAsPaidShoppingAdminOrder(id, data)),
    _getAdminProductsByIds: (slug, ids) =>
      dispatch(getAdminProductsByIds(slug, ids)),
    _searchCRMMembership: (data) => dispatch(searchCRMMembership(data)),
    _addNote: (data) => dispatch(addShopingNote(data)),
    _updateJourneyState: (data, callback) =>
      dispatch(updateJourneyState(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminOrder);
