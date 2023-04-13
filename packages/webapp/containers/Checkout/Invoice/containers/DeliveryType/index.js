import React, { memo, useEffect, useRef, useState } from "react";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessWorkingHours,
} from "@saas/stores/business/selector";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { getWorkingDayStart } from "@saas/utils/helpers/getWorkingDayStart";
import {
  makeSelectAddresses,
  makeSelectDefaultAddressID,
  makeSelectedAddress,
} from "@saas/stores/user/selector";
import {
  deleteAddress,
  editAddress,
  getAddressesWithAvailabilityInfo,
  setSelectedAddress,
} from "@saas/stores/user/actions";
import { getShoppingOrderInvoice } from "@saas/plugins/Shopping/actions";
import {
  DELIVERY_TYPE_FAST,
  PRE_ORDER_DELAYED,
  DELIVERY_TYPE_SCHEDULED,
  PRE_ORDER_NORMAL,
  PRE_ORDER_ACTIVE,
  FULFILLMENT_ON_USER_SITE,
  SELECT_ADDRESS_DRAWER,
  SELECT_DELIVERY_TYPE_DRAWER,
  DELETE_ADDRESS_MODAL,
  SHOPPING_ORDER_INVOICE_DTO,
} from "@saas/plugins/Shopping/constants";
import AddressDrawer from "containers/Checkout/Invoice/containers/DeliveryType/components/address/AddressDrawer";
import DeliveryTypesDrawer from "containers/Checkout/Invoice/components/drawers/DeliveryTypesDrawer";
import PreorderTimeSelectDrawer from "containers/Checkout/Invoice/components/drawers/PreorderTimeSelectDrawer";
import ScheduledTimeSelectDrawer from "containers/Checkout/Invoice/components/drawers/ScheduledTimeSelectDrawer";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import DeleteAddressModal from "containers/Checkout/Invoice/containers/DeliveryType/components/address/DeleteAddressModal";
import { useDeepEffect } from "@saas/utils/hooks/useDeepEffect";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  DELIVERY_TYPE_FAST_IN_BUSINESS_TIME_CLOSED,
  FAST_PREORDER_TIME_RANGE_SELECT_DRAWER,
  PREORDER_TYPE,
  SCHEDULED_TIME_RANGE_SELECT_DRAWER,
} from "containers/Checkout/Invoice/containers/DeliveryType/constants";
import { usePop } from "containers/Checkout/Invoice/containers/DeliveryType/hooks/usePop";
import Address from "containers/Checkout/Invoice/containers/DeliveryType/components/address/Address";
import AddressCollapse from "containers/Checkout/Invoice/containers/DeliveryType/components/address/AddressCollapse";
import Delivery from "containers/Checkout/Invoice/containers/DeliveryType/components/delivery/Delivery";
import DeliveryCollapse from "containers/Checkout/Invoice/containers/DeliveryType/components/delivery/DeliveryCollapse";
import FurtherInformation from "containers/Checkout/Invoice/containers/DeliveryType/components/delivery/FurtherInformation";
import PreOrder from "containers/Checkout/Invoice/containers/DeliveryType/components/delivery/PreOrder";
import Scheduled from "containers/Checkout/Invoice/containers/DeliveryType/components/delivery/Scheduled";
import { useDropDowns } from "containers/Checkout/Invoice/containers/DeliveryType/hooks/useDropDowns";
import { useModals } from "containers/Checkout/Invoice/containers/DeliveryType/hooks/useModals";
import { useDrawers } from "containers/Checkout/Invoice/containers/DeliveryType/hooks/useDrawers";
import { useAddress } from "containers/Checkout/Invoice/containers/DeliveryType/hooks/useAddress";
import { usePreOrder } from "containers/Checkout/Invoice/containers/DeliveryType/hooks/usePreOrder";
import { useScheduled } from "containers/Checkout/Invoice/containers/DeliveryType/hooks/useScheduled";
import { useAddressDetailsField } from "containers/Checkout/Invoice/containers/DeliveryType/hooks/useAddressDetailsField";
import { useDelivery } from "containers/Checkout/Invoice/containers/DeliveryType/hooks/useDelivery";
import Styles from "containers/Checkout/Invoice/containers/DeliveryType/components/Styles";

import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import useTheme from "@material-ui/core/styles/useTheme";
import PreOrderForm from "./components/delivery/PreOrderForm";

function DeliveryType({
  themeColor,
  urlPrefix,
  addresses,
  getUserAddressesList,
  defaultAddressId,
  orderInfo,
  workingHours,
  setCallToActionConfig,
  pluginData,
  finalSubmit,
  isLoading,
  setAlertConfig,
  setPriceDetails,
  _patchAddress,
  selectAddressIdByUser,
  selectedAddressIdByUser,
  _deleteAddress,
  _getShoppingOrderInvoice,
  deliveryOptions,
  setUseGift,
}) {
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  const { UIDropDowns, toggleDropDown } = useDropDowns();
  const { UIModals, toggleModal } = useModals();
  const { UIDrawers, toggleDrawer } = useDrawers();
  const nextDay = getWorkingDayStart(workingHours);
  const { popupHTML } = usePop(nextDay);
  const _today = moment();
  const _tomorrow = moment().add(1, "day");
  const today = _today.format("YYYY/jM/jD");
  const tomorrow = _tomorrow.format("YYYY/jM/jD");

  const deliveryTimingElementRef = useRef();

  const {
    addressDetaildFieldsElementRef,
    sendTo,
    selectedAddressIdToDelete,
    selectAddressIdToDelete,
  } = useAddress(
    orderInfo,
    getUserAddressesList,
    addresses,
    selectedAddressIdByUser,
    defaultAddressId,
    setUseGift,
    _getShoppingOrderInvoice
  );
  const {
    selectedDeliveryMethod,
    setDeliveryMethod,
    freeDeliveryCostCopyRight,
    isDeliveryTypeCollapseOpen,
  } = useDelivery(
    deliveryOptions,
    sendTo,
    pluginData,
    UIDropDowns,
    orderInfo,
    _getShoppingOrderInvoice
  );
  const {
    addressDetailsFields,
    setAddressDetailsFields,
    addressDetailsFieldsError,
    setAddressDetailsFieldsError,
    isAddressDetailsInvalid,
  } = useAddressDetailsField(selectedDeliveryMethod, sendTo);
  const {
    selectedPreOrderTimingMethod,
    selectPreOrderTimingMethod,
    selectedDayForDeliveryPreOrder,
    setDayForDeliveryPreOrder,
    selectedTimeForDeliveryPreOrder,
    selectTimeForDeliveryPreOrder,
    availableTimeRangeForTodayDeliveryPreOrder,
    availableTimeRangeForTomorrowDeliveryPreOrder,
    timesRange,
    fastPreorderChosenDeliveryTime,
    isPreOrderComponentActivated,
    selectedDeliveryMethodIsNotAvailableRightNow,
  } = usePreOrder(
    workingHours,
    today,
    tomorrow,
    moment,
    selectedDeliveryMethod
  );

  const {
    selectedDayForDeliveryScheduled,
    setDayForDeliveryScheduled,
    selectedTimeForDeliveryScheduled,
    setTimeForDeliveryScheduled,
    availableDeliveryTimes,
    scheduledChosenDeliveryTime,
    isScheduledComponentActivated,
  } = useScheduled(selectedDeliveryMethod, _today, moment);

  const [isTimeSelected, setIsTimeSelect] = useState({
    day: false,
    time: false,
  });

  const isDateAndHourSelected = Object.values(isTimeSelected).every(
    (item) => item === true
  );

  useDeepEffect(() => {
    if (
      (fastPreorderChosenDeliveryTime && isPreOrderComponentActivated) ||
      (scheduledChosenDeliveryTime && isScheduledComponentActivated)
    ) {
      let dto = sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
        ? JSON.parse(sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO))
        : null;
      const newDTO = {
        ...dto,
        delivery: {
          ...dto?.delivery,
          interval:
            scheduledChosenDeliveryTime || fastPreorderChosenDeliveryTime,
        },
      };
      sessionStorage.setItem(
        SHOPPING_ORDER_INVOICE_DTO,
        JSON.stringify(newDTO)
      );
      setTimeout(() => {
        _getShoppingOrderInvoice(orderInfo?.id, newDTO);
      }, 0);
    }
  }, [scheduledChosenDeliveryTime, fastPreorderChosenDeliveryTime]);

  const submit = () => {
    _patchAddress(
      {
        id: sendTo?.id,
        detail: { ...addressDetailsFields, combination: "" },
      },
      () => finalSubmit()
    );
  };
  useEffect(() => {
    if (selectedDeliveryMethod) {
      const isFinalPriceUnderTheMinimumOrderPrice =
        orderInfo.final_items_price <
        selectedDeliveryMethod.minimum_order_price;
      if (isAddressDetailsInvalid) {
        setCallToActionConfig({
          label: `${
            minWidth768 ? "لطفا اطلاعات تکمیلی را وارد نمایید" : "تکمیل اطلاعات"
          }`,
          onClick: () =>
            addressDetaildFieldsElementRef.current.scrollIntoView({
              behavior: "smooth",
            }),
          isDisabled:
            isFinalPriceUnderTheMinimumOrderPrice ||
            selectedDeliveryMethodIsNotAvailableRightNow,
        });
      } else if (
        (selectedPreOrderTimingMethod === PRE_ORDER_DELAYED &&
          selectedDeliveryMethod.timing.type === DELIVERY_TYPE_FAST &&
          selectedDeliveryMethod.timing.pre_order?.type ===
            PRE_ORDER_DELAYED) ||
        selectedDeliveryMethod.timing.type === DELIVERY_TYPE_SCHEDULED
      ) {
        if (!minWidth768) {
          const _submit = () => {
            if (
              selectedDeliveryMethod.timing.type === DELIVERY_TYPE_SCHEDULED
            ) {
              toggleDrawer(SCHEDULED_TIME_RANGE_SELECT_DRAWER, true);
            }
            if (
              selectedPreOrderTimingMethod === PRE_ORDER_DELAYED &&
              selectedDeliveryMethod.timing.type === DELIVERY_TYPE_FAST &&
              selectedDeliveryMethod.timing.pre_order?.type ===
                PRE_ORDER_DELAYED
            ) {
              toggleDrawer(FAST_PREORDER_TIME_RANGE_SELECT_DRAWER, true);
            }
          };
          setCallToActionConfig({
            label: "تعیین زمان ارسال",
            onClick: _submit,
            isDisabled:
              isFinalPriceUnderTheMinimumOrderPrice ||
              selectedDeliveryMethodIsNotAvailableRightNow,
          });
        } else if (!isDateAndHourSelected) {
          setCallToActionConfig({
            label: "زمان ارسال را تعیین نمایید",
            onClick: () =>
              deliveryTimingElementRef.current.scrollIntoView({
                behavior: "smooth",
              }),
            isDisabled:
              isFinalPriceUnderTheMinimumOrderPrice ||
              selectedDeliveryMethodIsNotAvailableRightNow,
          });
        } else {
          setCallToActionConfig({
            label: "تایید و ثبت سفارش",
            onClick: () => submit(),
            isDisabled:
              isFinalPriceUnderTheMinimumOrderPrice ||
              selectedDeliveryMethodIsNotAvailableRightNow,
          });
        }
      } else {
        setCallToActionConfig({
          label: "تایید و ثبت سفارش",
          onClick: () =>
            _patchAddress(
              {
                id: sendTo?.id,
                detail: { ...addressDetailsFields, combination: "" },
              },
              () => finalSubmit()
            ),
          isDisabled:
            isFinalPriceUnderTheMinimumOrderPrice ||
            selectedDeliveryMethodIsNotAvailableRightNow,
        });
      }
    } else {
      setCallToActionConfig({
        label: "تایید و ثبت سفارش",
        onClick: null,
        isDisabled: true,
      });
    }
  }, [
    orderInfo,
    selectedDeliveryMethod,
    selectedPreOrderTimingMethod,
    finalSubmit,
    deliveryOptions,
    addressDetailsFields,
    isAddressDetailsInvalid,
    selectedDayForDeliveryScheduled,
    selectedTimeForDeliveryScheduled,
    isTimeSelected,
  ]);
  useEffect(() => {
    if (
      selectedDeliveryMethod &&
      orderInfo.delivery_site_type?.toUpperCase() ===
        FULFILLMENT_ON_USER_SITE &&
      orderInfo?.final_items_price < selectedDeliveryMethod?.minimum_order_price
    ) {
      setPriceDetails([
        {
          html: (
            <div
              style={{ color: theme.palette.error.main }}
              className="u-text-red my-1 u-font-semi-small text-justify"
            >
              حداقل مجموع قیمت محصولات نمی‌تواند از{" "}
              {priceFormatter(selectedDeliveryMethod.minimum_order_price)}{" "}
              <Icon
                icon={$}
                width={21}
                height={21}
                color={theme.palette.error.main}
              />
              &nbsp; کمتر باشد.
            </div>
          ),
        },
      ]);
    } else {
      setPriceDetails([]);
    }
  }, [selectedDeliveryMethod, orderInfo]);

  useEffect(() => {
    setIsTimeSelect({ day: false, time: false });
    if (selectedDeliveryMethod) {
      if (selectedDeliveryMethodIsNotAvailableRightNow) {
        setAlertConfig({
          isOpen: true,
          label: popupHTML[DELIVERY_TYPE_FAST_IN_BUSINESS_TIME_CLOSED],
        });
      } else if (
        selectedDeliveryMethod.timing.type === DELIVERY_TYPE_FAST &&
        selectedDeliveryMethod.timing.pre_order?.status === PRE_ORDER_ACTIVE &&
        selectedDeliveryMethod?.timing?.pre_order?.type === PRE_ORDER_NORMAL &&
        !isBusinessOpenNow(workingHours)
      ) {
        setAlertConfig({
          isOpen: true,
          label: popupHTML[PREORDER_TYPE],
        });
      } else {
        setAlertConfig({
          isOpen: false,
          label: null,
        });
      }
    } else {
      setAlertConfig({
        isOpen: false,
        label: null,
      });
    }
  }, [selectedDeliveryMethod]);

  useDeepEffect(() => {
    if (deliveryOptions && deliveryOptions[0])
      setDeliveryMethod(deliveryOptions[0]);
  }, [deliveryOptions[0]?.rule_id]);

  if (!nextDay) {
    return null;
  }

  return (
    <div>
      <Styles themeColor={themeColor} />
      <Paper elevation={1}>
        <Address
          toggleDropDown={toggleDropDown}
          UIDropDowns={UIDropDowns}
          toggleDrawer={toggleDrawer}
          UIDrawers={UIDrawers}
          sendTo={sendTo}
        />
        <DeleteAddressModal
          isOpen={UIModals[DELETE_ADDRESS_MODAL]}
          onClose={() => toggleModal(DELETE_ADDRESS_MODAL, false)}
          deleteAddress={_deleteAddress}
          orderInfo={orderInfo}
          addressId={selectedAddressIdToDelete}
          toggleDropDown={toggleDropDown}
          UIDropDowns={UIDropDowns}
          toggleDrawer={toggleDrawer}
        />
        {minWidth768 ? (
          <AddressCollapse
            UIDropDowns={UIDropDowns}
            urlPrefix={urlPrefix}
            addresses={addresses}
            selectAddressIdByUser={selectAddressIdByUser}
            toggleDropDown={toggleDropDown}
            sendTo={sendTo}
            selectAddressIdToDelete={selectAddressIdToDelete}
            toggleModal={toggleModal}
          />
        ) : (
          <AddressDrawer
            isOpen={UIDrawers[SELECT_ADDRESS_DRAWER]}
            toggleDrawer={toggleDrawer}
            orderInfo={orderInfo}
            selectAddressId={selectAddressIdByUser}
            selectedAddress={sendTo}
            addresses={addresses}
            urlPrefix={urlPrefix}
            selectAddressIdToDelete={selectAddressIdToDelete}
            toggleModal={toggleModal}
          />
        )}
      </Paper>
      {deliveryOptions?.length ? (
        <Paper elevation={1} className="mt-4">
          <div className="d-flex flex-column">
            <Delivery
              deliveryOptions={deliveryOptions}
              toggleDropDown={toggleDropDown}
              UIDropDowns={UIDropDowns}
              toggleDrawer={toggleDrawer}
              UIDrawers={UIDrawers}
              isDeliveryTypeCollapseOpen={isDeliveryTypeCollapseOpen}
              selectedDeliveryMethod={selectedDeliveryMethod}
              freeDeliveryCostCopyRight={freeDeliveryCostCopyRight}
              orderInfo={orderInfo}
            />
            {Object.keys(addressDetailsFields).length > 2 ? <Divider /> : null}
            {minWidth768 ? (
              <DeliveryCollapse
                isDeliveryTypeCollapseOpen={isDeliveryTypeCollapseOpen}
                deliveryOptions={deliveryOptions}
                setDeliveryMethod={setDeliveryMethod}
                toggleDropDown={toggleDropDown}
                UIDropDowns={UIDropDowns}
                selectedDeliveryMethod={selectedDeliveryMethod}
                freeDeliveryCostCopyRight={freeDeliveryCostCopyRight}
                orderInfo={orderInfo}
              />
            ) : (
              <DeliveryTypesDrawer
                isOpen={UIDrawers[SELECT_DELIVERY_TYPE_DRAWER]}
                orderInfo={orderInfo}
                selectedDeliveryMethod={selectedDeliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                deliveryOptions={deliveryOptions}
                toggleDrawer={toggleDrawer}
              />
            )}
            {Object.keys(addressDetailsFields).length ? (
              <>
                <FurtherInformation
                  isAddressDetailsInvalid={isAddressDetailsInvalid}
                  addressDetaildFieldsElementRef={
                    addressDetaildFieldsElementRef
                  }
                  addressDetailsFields={addressDetailsFields}
                  addressDetailsFieldsError={addressDetailsFieldsError}
                  setAddressDetailsFieldsError={setAddressDetailsFieldsError}
                  setAddressDetailsFields={setAddressDetailsFields}
                  themeColor={themeColor}
                />
              </>
            ) : null}
            {isPreOrderComponentActivated ? (
              <>
                <Divider />
                <div className="d-flex align-items-center px-4 py-3">
                  <PreOrder
                    workingHours={workingHours}
                    selectedPreOrderTimingMethod={selectedPreOrderTimingMethod}
                    selectPreOrderTimingMethod={selectPreOrderTimingMethod}
                    isAddressDetailsInvalid={isAddressDetailsInvalid}
                    toggleDrawer={toggleDrawer}
                  />
                  {selectedPreOrderTimingMethod === PRE_ORDER_DELAYED ? (
                    minWidth768 ? (
                      <PreOrderForm
                        isAddressDetailsInvalid={isAddressDetailsInvalid}
                        deliveryTimingElementRef={deliveryTimingElementRef}
                        isTimeSelected={isTimeSelected}
                        selectedDayForDeliveryPreOrder={
                          selectedDayForDeliveryPreOrder
                        }
                        setDayForDeliveryPreOrder={setDayForDeliveryPreOrder}
                        setIsTimeSelect={setIsTimeSelect}
                        availableTimeRangeForTodayDeliveryPreOrder={
                          availableTimeRangeForTodayDeliveryPreOrder
                        }
                        availableTimeRangeForTomorrowDeliveryPreOrder={
                          availableTimeRangeForTomorrowDeliveryPreOrder
                        }
                        selectedTimeForDeliveryPreOrder={
                          selectedTimeForDeliveryPreOrder
                        }
                        selectTimeForDeliveryPreOrder={
                          selectTimeForDeliveryPreOrder
                        }
                        timesRange={timesRange}
                        today={today}
                        tomorrow={tomorrow}
                      />
                    ) : (
                      <PreorderTimeSelectDrawer
                        isOpen={
                          UIDrawers[FAST_PREORDER_TIME_RANGE_SELECT_DRAWER]
                        }
                        onClose={() =>
                          toggleDrawer(
                            FAST_PREORDER_TIME_RANGE_SELECT_DRAWER,
                            false
                          )
                        }
                        selectedDayForDeliveryPreOrder={
                          selectedDayForDeliveryPreOrder
                        }
                        setDayForDeliveryPreOrder={setDayForDeliveryPreOrder}
                        selectedTimeForDeliveryPreOrder={
                          selectedTimeForDeliveryPreOrder
                        }
                        selectTimeForDeliveryPreOrder={
                          selectTimeForDeliveryPreOrder
                        }
                        todayPreOrder={today}
                        tomorrowPreOrder={tomorrow}
                        timesRange={timesRange}
                        submit={submit}
                        isLoading={isLoading}
                        isTimeSelected={isTimeSelected}
                        setIsTimeSelect={setIsTimeSelect}
                        isDateAndHourSelected={isDateAndHourSelected}
                        isAddressDetailsInvalid={isAddressDetailsInvalid}
                        availableTimeRangeForTodayDeliveryPreOrder={
                          availableTimeRangeForTodayDeliveryPreOrder
                        }
                        availableTimeRangeForTomorrowDeliveryPreOrder={
                          availableTimeRangeForTomorrowDeliveryPreOrder
                        }
                        themeColor={themeColor}
                      />
                    )
                  ) : null}
                </div>
              </>
            ) : null}
            {isScheduledComponentActivated ? (
              minWidth768 ? (
                <Scheduled
                  deliveryTimingElementRef={deliveryTimingElementRef}
                  isAddressDetailsInvalid={isAddressDetailsInvalid}
                  isDateAndHourSelected={isDateAndHourSelected}
                  availableDeliveryTimes={availableDeliveryTimes}
                  _today={_today}
                  selectedTimeForDeliveryScheduled={
                    selectedTimeForDeliveryScheduled
                  }
                  selectedDayForDeliveryScheduled={
                    selectedDayForDeliveryScheduled
                  }
                  themeColor={themeColor}
                  setDayForDeliveryScheduled={setDayForDeliveryScheduled}
                  setTimeForDeliveryScheduled={setTimeForDeliveryScheduled}
                  setIsTimeSelect={setIsTimeSelect}
                />
              ) : (
                <ScheduledTimeSelectDrawer
                  isOpen={UIDrawers[SCHEDULED_TIME_RANGE_SELECT_DRAWER]}
                  onClose={() =>
                    toggleDrawer(SCHEDULED_TIME_RANGE_SELECT_DRAWER, false)
                  }
                  selectedDayForDeliveryScheduled={
                    selectedDayForDeliveryScheduled
                  }
                  setDayForDeliveryScheduled={setDayForDeliveryScheduled}
                  selectedTimeForDeliveryScheduled={
                    selectedTimeForDeliveryScheduled
                  }
                  setTimeForDeliveryScheduled={setTimeForDeliveryScheduled}
                  availableDeliveryTimes={availableDeliveryTimes}
                  today={_today}
                  submit={submit}
                  isLoading={isLoading}
                  isTimeSelected={isTimeSelected}
                  setIsTimeSelect={setIsTimeSelect}
                  isDateAndHourSelected={isDateAndHourSelected}
                  isAddressDetailsInvalid={isAddressDetailsInvalid}
                  themeColor={themeColor}
                />
              )
            ) : null}
          </div>
        </Paper>
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  urlPrefix: makeSelectUrlPrefix(),
  addresses: makeSelectAddresses(),
  defaultAddressId: makeSelectDefaultAddressID(),
  workingHours: makeSelectBusinessWorkingHours(),
  isLoading: makeSelectLoading(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  selectedAddressIdByUser: makeSelectedAddress(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserAddressesList: (order_id) =>
      dispatch(getAddressesWithAvailabilityInfo(order_id)),
    _patchAddress: (address, callback) =>
      dispatch(editAddress(address, callback)),
    selectAddressIdByUser: (selectedAddress) =>
      dispatch(setSelectedAddress(selectedAddress)),
    _deleteAddress: (addressId, orderId) =>
      dispatch(deleteAddress(addressId, orderId)),
    _getShoppingOrderInvoice: (id, data) =>
      dispatch(getShoppingOrderInvoice(id, data)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(DeliveryType);
