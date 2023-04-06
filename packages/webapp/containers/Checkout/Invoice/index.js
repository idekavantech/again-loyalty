import React, { memo, useCallback, useEffect, useState, Fragment } from "react";

import { createStructuredSelector } from "reselect";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";

import {
  makeSelectDiscountError,
  makeSelectOrderInfo,
} from "@saas/plugins/Shopping/selectors";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";
import { coal } from "@saas/utils/colors";
import { hexToRgb } from "@saas/utils/helpers/hexToRgb";
import Input from "@saas/components/Input";
import { SHOPPING_PLUGIN, CRM_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import {
  FULFILLMENT_ON_USER_SITE,
  DISCOUNT_CODE,
  GIFT_CREDIT,
  SHOPPING_ORDER_INVOICE_DTO,
  ORDER_SUBMITTER_STORAGE,
} from "@saas/plugins/Shopping/constants";
import { CARD_PAYMENT, OFFLINE_PAYMENT } from "@saas/stores/plugins/constants";
import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessWorkingHours,
} from "@saas/stores/business/selector";
import {
  setDiscountError,
  patchOrder,
  getShoppingOrderInvoice,
  orderSubmitted,
} from "@saas/plugins/Shopping/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { orderPayment } from "@saas/stores/transaction/actions";
import { makeSelectUser } from "@saas/stores/user/selector";
import {
  PAYMENT_TYPE_CARD,
  PAYMENT_TYPE_CASH,
  PAYMENT_TYPE_ONLINE,
} from "@saas/stores/transaction/constants";
import { useDeepEffect } from "@saas/utils/hooks/useDeepEffect";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  discountMethods,
  initialCarObject,
  reducer,
} from "containers/Checkout/Invoice/constants";
import Payment from "containers/Checkout/Invoice/components/payment/Payment";
import PaymentCollapse from "containers/Checkout/Invoice/components/payment/PaymentCollapse";
import PaymentMethodsDrawer from "containers/Checkout/Invoice/components/payment/PaymentMethodsDrawer";
import DiscountCode from "containers/Checkout/Invoice/components/Discount/DiscountCode";
import DiscountCollapse from "containers/Checkout/Invoice/components/Discount/DiscountCollapse";
import DiscountMethodsDrawers from "containers/Checkout/Invoice/components/Discount/DiscountMethodsDrawer";
import GiftCredit from "containers/Checkout/Invoice/components/Discount/GiftCredit";
import WalletCredit from "containers/Checkout/Invoice/components/WalletCredit";
import AddressError from "containers/Checkout/Invoice/components/AddressError";
import Alert from "containers/Checkout/Invoice/components/Alert";
import Factor from "containers/Checkout/Invoice/components/Factor";
import MobileFooter from "containers/Checkout/Invoice/components/MobileFooter";
import SalesInvoiceDrawer from "containers/Checkout/Invoice/components/drawers/SalesInvoiceDrawer";
import { useFulfillment } from "containers/Checkout/Invoice/hooks/useFulfillment";
import { usePayment } from "containers/Checkout/Invoice/hooks/usePayment";
import { useDiscount } from "containers/Checkout/Invoice/hooks/useDiscount";
import { useDelivery } from "containers/Checkout/Invoice/hooks/useDelivery";
import { useSalesInvoiceDrawer } from "containers/Checkout/Invoice/hooks/useSalesInvoiceDrawer";
import { useCallToAction } from "containers/Checkout/Invoice/hooks/useCallToAction";
import { useWallet } from "containers/Checkout/Invoice/hooks/useWallet";

import Paper from "@material-ui/core/Paper";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import { setSnackBarMessage } from "@saas/stores/ui/actions";

function Invoice({
  orders,
  pluginData,
  themeColor,
  user,
  orderInfo,
  _setDiscountError,
  discountError,
  _patchOrder,
  _orderPayment,
  isLoading,
  visitCardPluginData,
  _getShoppingOrderInvoice,
  _uploadFile,
  _removeFile,
  _orderSubmitted,
}) {
  const { minWidth768 } = useResponsive();
  const businessCardInfo = pluginData.payment_data.accounts_info?.[0];
  const {
    fulfillmentType,
    isOnUserSiteFulfillmentTypeSelected,
    FulfillmentComponent,
    fulfillmentTitle,
  } = useFulfillment(orderInfo);
  const { deliveryCostCopyRight, deliveryOptions } = useDelivery(
    pluginData,
    orderInfo
  );
  const {
    paymentTypes,
    isPaymentDropDownOpen,
    setPaymentDropDownOpen,
    selectedPaymentMethod,
    setPaymentMethod,
    isPaymentMethodsDrawerOpen,
    setPaymentMethodsDrawerOpen,
  } = usePayment(pluginData);
  const giftCredit = user?.giftCredit;
  const walletCredit = user?.walletCredit;
  const payableAmount =
    typeof orderInfo?.total_price === "number"
      ? orderInfo?.total_price
      : orderInfo?.final_items_price || 0;
  const { isUsingWallet, setIsUsingWallet, deductedAmountFromWallet } =
    useWallet(walletCredit, payableAmount);
  const {
    isDiscountDropDownOpen,
    setDiscountDropDownOpen,
    selectedDiscountMethod,
    setDiscountMethod,
    isDiscountMethodsDrawerOpen,
    setDiscountMethodsDrawerOpen,
    maxUsableCreditAmount,
    code,
    changeCode,
    useGift,
    setUseGift,
  } = useDiscount(giftCredit, visitCardPluginData);
  const {
    isSalesInvoiceDrawerOpen,
    toggleSalesInvoiceDrawer,
    handleSalesInvoiceDrawerClose,
  } = useSalesInvoiceDrawer();
  const { callToActionConfig, setCallToActionConfig, isSubmitButtonDisabled } =
    useCallToAction(isLoading, orders, orderInfo);
  const rgbThemeColor = hexToRgb(themeColor);
  const allItemsCount = orders?.map((order) => order.count).reduce(reducer, 0);
  const [description, setDescription] = useState("");
  const [priceDetails, setPriceDetails] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    label: "",
    isOpen: false,
  });
  const [isPriceDetailesCollapseOpen, setPriceDetailsCollapseOpen] =
    useState(false);
  const [tableNumber, setTableNumber] = useState(null);
  const [receiptImage, setReceiptImage] = useState({ url: "", img: "" });
  const [receiptImageError, setReceiptImageError] = useState(null);
  const [car, setCar] = useState(initialCarObject);
  const dispatch = useDispatch();

  const _setSnackBarMessage = (message, type) =>
    dispatch(setSnackBarMessage(message, type));
  useEffect(() => {
    _setDiscountError("");
    if (!orderInfo?.order_id) {
      setTimeout(() => {
        const orderDataFromLocalStorage = localStorage.getItem(
          ORDER_SUBMITTER_STORAGE
        )
          ? JSON.parse(localStorage.getItem(ORDER_SUBMITTER_STORAGE))
          : null;
        if (orderDataFromLocalStorage) {
          _orderSubmitted(orderDataFromLocalStorage);
        }
      }, 100);
    }
  }, []);

  useDeepEffect(() => {
    const dto = sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
      ? JSON.parse(sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO))
      : {};
    if (
      ((isOnUserSiteFulfillmentTypeSelected && deliveryOptions?.length) ||
        !isOnUserSiteFulfillmentTypeSelected) &&
      orderInfo?.id
    ) {
      _setDiscountError("");
      changeCode("");
      if (giftCredit) {
        if (useGift && selectedDiscountMethod.name === GIFT_CREDIT) {
          dto.use_gift_credit = true;
          sessionStorage.setItem(
            SHOPPING_ORDER_INVOICE_DTO,
            JSON.stringify(dto)
          );
          setTimeout(() => {
            _getShoppingOrderInvoice(orderInfo?.id, dto);
          }, 0);
        } else {
          dto.use_gift_credit = false;
          sessionStorage.setItem(
            SHOPPING_ORDER_INVOICE_DTO,
            JSON.stringify(dto)
          );
          setTimeout(() => {
            _getShoppingOrderInvoice(orderInfo?.id, dto);
          }, 0);
        }
      }
    }
  }, [
    isOnUserSiteFulfillmentTypeSelected,
    deliveryOptions,
    giftCredit,
    useGift,
    selectedDiscountMethod,
    orderInfo?.id,
  ]);

  const submitPayment = useCallback(() => {
    const dto = { use_wallet: isUsingWallet, data: {} };
    if (
      selectedPaymentMethod.name === OFFLINE_PAYMENT ||
      (useGift && giftCredit > 0 && orderInfo?.total_price === 0) ||
      orderInfo?.final_items_price === 0
    ) {
      dto.payment_type = PAYMENT_TYPE_CASH;
    } else if (selectedPaymentMethod.name === CARD_PAYMENT) {
      dto.payment_type = PAYMENT_TYPE_CARD;
      dto.data.image = receiptImage.url;
    } else {
      dto.payment_type = PAYMENT_TYPE_ONLINE;
    }
    _orderPayment(orderInfo?.id, SHOPPING_PLUGIN, dto);
  }, [orderInfo, selectedPaymentMethod, useGift, isUsingWallet, receiptImage]);

  const finalSubmit = useCallback(() => {
    if (selectedPaymentMethod.name === CARD_PAYMENT && !receiptImage.url) {
      _setSnackBarMessage("تصویر رسید را آپلود نمایید.", "fail");
      return setReceiptImageError("تصویر رسید را آپلود نمایید.");
    }

    let dto = sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
      ? JSON.parse(sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO))
      : {};
    const newDTO = {
      ...dto,
      ...(description && { description }),
      user_address: {
        ...(dto?.user_address || {}),
        ...(((car?.firstPartOfTag &&
          car?.letterOfTag &&
          car?.seccondPartOfTag &&
          car?.cityOfTag) ||
          car?.color ||
          car?.model ||
          tableNumber) && {
          extra_data: {
            ...(car?.firstPartOfTag &&
              car?.letterOfTag &&
              car?.seccondPartOfTag &&
              car?.cityOfTag && {
                plate_number:
                  car?.firstPartOfTag +
                  car?.letterOfTag +
                  car?.seccondPartOfTag +
                  car?.cityOfTag,
              }),
            ...(car?.color && { color: car?.color }),
            ...(car?.model && { model_name: car?.model }),
            ...(tableNumber && { table_number: tableNumber }),
          },
        }),
      },
    };
    if (!Object.keys(newDTO?.user_address)?.length) {
      delete newDTO?.user_address;
    }
    _patchOrder(orderInfo?.id, newDTO, submitPayment);
  }, [
    description,
    submitPayment,
    orderInfo,
    orderInfo?.id,
    car,
    tableNumber,
    receiptImage,
    selectedPaymentMethod,
  ]);

  const discountMethodsHTML = {
    [DISCOUNT_CODE]: (
      <DiscountCode
        selectedDiscountMethod={selectedDiscountMethod}
        giftCredit={giftCredit}
        setDiscountDropDownOpen={setDiscountDropDownOpen}
        isDiscountDropDownOpen={isDiscountDropDownOpen}
        setDiscountMethodsDrawerOpen={setDiscountMethodsDrawerOpen}
        isDiscountMethodsDrawerOpen={isDiscountMethodsDrawerOpen}
        changeCode={changeCode}
        code={code}
        _setDiscountError={_setDiscountError}
        _getShoppingOrderInvoice={_getShoppingOrderInvoice}
        discountError={discountError}
        orderInfo={orderInfo}
      />
    ),
    [GIFT_CREDIT]: (
      <GiftCredit
        selectedDiscountMethod={selectedDiscountMethod}
        setDiscountDropDownOpen={setDiscountDropDownOpen}
        isDiscountDropDownOpen={isDiscountDropDownOpen}
        setDiscountMethodsDrawerOpen={setDiscountMethodsDrawerOpen}
        isDiscountMethodsDrawerOpen={isDiscountMethodsDrawerOpen}
        giftCredit={giftCredit}
        useGift={useGift}
        setUseGift={setUseGift}
        visitCardPluginData={visitCardPluginData}
        maxUsableCreditAmount={maxUsableCreditAmount}
      />
    ),
  };

  if (!orderInfo) {
    return null;
  }

  return (
    <div
      className={`pt-2 pt-md-4 ${minWidth768 && " container "}`}
      style={{ paddingBottom: minWidth768 ? 70 : 40 }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `

                  .checkout-collapse:hover {
                    background-color : rgba(${rgbThemeColor.r}, ${rgbThemeColor.g}, ${rgbThemeColor.b}, 0.05) ;
                  }
                `,
        }}
      />
      {!isLoading &&
      deliveryOptions &&
      !deliveryOptions.length &&
      fulfillmentType?.toUpperCase() === FULFILLMENT_ON_USER_SITE ? (
        <AddressError themeColor={themeColor} rgbThemeColor={rgbThemeColor} />
      ) : null}
      {alertConfig.isOpen ? (
        <Alert
          themeColor={themeColor}
          rgbThemeColor={rgbThemeColor}
          alertConfig={alertConfig}
        />
      ) : null}
      <div
        className="col-12 u-fontLarge u-fontWeightBold mb-2"
        style={{ color: coal }}
      >
        {fulfillmentTitle}
      </div>
      <div className="d-flex">
        <div
          className="col-12 col-md-8"
          style={{ marginBottom: minWidth768 ? "" : 100 }}
        >
          {FulfillmentComponent && (
            <FulfillmentComponent
              fulfillmentType={fulfillmentType}
              orderInfo={orderInfo}
              setCallToActionConfig={setCallToActionConfig}
              callToActionConfig={callToActionConfig}
              finalSubmit={finalSubmit}
              setAlertConfig={setAlertConfig}
              setPriceDetails={setPriceDetails}
              shoppingPluginData={pluginData}
              paymentMethod={selectedPaymentMethod.name}
              car={car}
              setCar={setCar}
              tableNumber={tableNumber}
              setTableNumber={setTableNumber}
              invoiceFields={pluginData?.data?.invoice_fields}
              deliveryOptions={deliveryOptions}
              setUseGift={setUseGift}
              _getShoppingOrderInvoice={_getShoppingOrderInvoice}
            />
          )}

          <style
            dangerouslySetInnerHTML={{
              __html: `

                  .pickup-option:hover {
                    background-color : rgba(${rgbThemeColor.r}, ${rgbThemeColor.g}, ${rgbThemeColor.b}, 0.05) ;
                  }
                `,
            }}
          ></style>
          <Paper elevation={1} className={"mt-4 px-4 py-3"}>
            <div
              className="u-fontLarge u-fontWeightBold"
              style={{ color: coal }}
            >
              توضیحات سفارش
            </div>
            <Input
              className="mt-4 bg-white"
              color="secondary"
              onChange={setDescription}
              value={description}
              placeholder="توضیحات خاصی برای آماده‌سازی و ارسال سفارش مد نظرتان است؟ اینجا بنویسید."
              multiline
            />
          </Paper>

          <div
            className="u-fontLarge u-fontWeightBold mt-4 mb-2"
            style={{ color: coal }}
          >
            اطلاعات پرداخت
          </div>

          <Paper elevation={1}>
            <Payment
              paymentTypes={paymentTypes}
              setPaymentDropDownOpen={setPaymentDropDownOpen}
              isPaymentDropDownOpen={isPaymentDropDownOpen}
              setPaymentMethodsDrawerOpen={setPaymentMethodsDrawerOpen}
              isPaymentMethodsDrawerOpen={isPaymentMethodsDrawerOpen}
              selectedPaymentMethod={selectedPaymentMethod}
              _uploadFile={_uploadFile}
              _removeFile={_removeFile}
              setPaymentMethod={setPaymentMethod}
              setReceiptImage={setReceiptImage}
              receiptImage={receiptImage}
              receiptImageError={receiptImageError}
              setReceiptImageError={setReceiptImageError}
              payableAmount={payableAmount}
              cardInfo={businessCardInfo}
            />
            {minWidth768 ? (
              <PaymentCollapse
                cardInfo={businessCardInfo}
                paymentTypes={paymentTypes}
                setPaymentDropDownOpen={setPaymentDropDownOpen}
                _uploadFile={_uploadFile}
                _removeFile={_removeFile}
                isPaymentDropDownOpen={isPaymentDropDownOpen}
                selectedPaymentMethod={selectedPaymentMethod}
                setPaymentMethod={setPaymentMethod}
                setReceiptImage={setReceiptImage}
                receiptImage={receiptImage}
                receiptImageError={receiptImageError}
                setReceiptImageError={setReceiptImageError}
                payableAmount={payableAmount}
              />
            ) : (
              <PaymentMethodsDrawer
                isPaymentMethodsDrawerOpen={isPaymentMethodsDrawerOpen}
                selectedPaymentMethod={selectedPaymentMethod}
                setPaymentMethod={setPaymentMethod}
                setPaymentMethodsDrawerOpen={setPaymentMethodsDrawerOpen}
              />
            )}
          </Paper>

          {walletCredit ? (
            <WalletCredit
              walletCredit={walletCredit}
              isUsingWallet={isUsingWallet}
              setIsUsingWallet={setIsUsingWallet}
            />
          ) : null}

          <Paper elevation={1} className="mt-4">
            {discountMethodsHTML[selectedDiscountMethod.name]}
            {minWidth768 ? (
              <DiscountCollapse
                discountMethodsHTML={discountMethodsHTML}
                selectedDiscountMethod={selectedDiscountMethod}
                isDiscountDropDownOpen={isDiscountDropDownOpen}
                discountMethods={discountMethods}
                changeCode={changeCode}
                setDiscountMethod={setDiscountMethod}
                setDiscountDropDownOpen={setDiscountDropDownOpen}
              />
            ) : (
              <DiscountMethodsDrawers
                isDiscountMethodsDrawerOpen={isDiscountMethodsDrawerOpen}
                discountMethods={discountMethods}
                selectedDiscountMethod={selectedDiscountMethod}
                setDiscountMethod={setDiscountMethod}
                setDiscountMethodsDrawerOpen={setDiscountMethodsDrawerOpen}
                changeCode={changeCode}
              />
            )}
          </Paper>
        </div>

        {orders?.length !== 0 ? (
          minWidth768 ? (
            <Factor
              setPriceDetailsCollapseOpen={setPriceDetailsCollapseOpen}
              isPriceDetailesCollapseOpen={isPriceDetailesCollapseOpen}
              allItemsCount={allItemsCount}
              orderInfo={orderInfo}
              priceDetails={priceDetails}
              orders={orders}
              themeColor={themeColor}
              deliveryCostCopyRight={deliveryCostCopyRight}
              payableAmount={payableAmount}
              isUsingWallet={isUsingWallet}
              walletCredit={walletCredit}
              deductedAmountFromWallet={deductedAmountFromWallet}
              isLoading={isLoading}
              callToActionConfig={callToActionConfig}
              finalSubmit={finalSubmit}
              isSubmitButtonDisabled={isSubmitButtonDisabled}
            />
          ) : (
            <Fragment>
              <MobileFooter
                toggleSalesInvoiceDrawer={toggleSalesInvoiceDrawer}
                isSalesInvoiceDrawerOpen={isSalesInvoiceDrawerOpen}
                themeColor={themeColor}
                orderInfo={orderInfo}
                isLoading={isLoading}
                callToActionConfig={callToActionConfig}
                finalSubmit={finalSubmit}
                isSubmitButtonDisabled={isSubmitButtonDisabled}
              />
              <SalesInvoiceDrawer
                isSalesInvoiceDrawerOpen={isSalesInvoiceDrawerOpen}
                toggleSalesInvoiceDrawer={toggleSalesInvoiceDrawer}
                handleSalesInvoiceDrawerClose={handleSalesInvoiceDrawerClose}
                isPriceDetailesCollapseOpen={isPriceDetailesCollapseOpen}
                setPriceDetailsCollapseOpen={setPriceDetailsCollapseOpen}
                allItemsCount={allItemsCount}
                orderInfo={orderInfo}
                priceDetails={priceDetails}
                orders={orders}
                themeColor={themeColor}
                deliveryCostCopyRight={deliveryCostCopyRight}
                payableAmount={payableAmount}
                walletCredit={walletCredit}
                deductedAmountFromWallet={deductedAmountFromWallet}
              />
            </Fragment>
          )
        ) : null}
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrdersBySiteDomain(),
  workingHours: makeSelectBusinessWorkingHours(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  themeColor: makeSelectBusinessThemeColor(),
  user: makeSelectUser(),
  orderInfo: makeSelectOrderInfo(),
  isLoading: makeSelectLoading(),
  discountError: makeSelectDiscountError(),
  visitCardPluginData: makeSelectPlugin(CRM_PLUGIN),
});

function mapDispatchToProps(dispatch) {
  return {
    _setDiscountError: (err) => dispatch(setDiscountError(err)),
    _patchOrder: (id, data, callback) =>
      dispatch(patchOrder(id, data, callback)),
    _orderPayment: (id, plugin, data) =>
      dispatch(orderPayment(id, plugin, data)),
    _getShoppingOrderInvoice: (id, data, callback) =>
      dispatch(getShoppingOrderInvoice(id, data, callback)),
    _orderSubmitted: (orderInfo) => dispatch(orderSubmitted(orderInfo)),
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: () => dispatch(removeFile()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(Invoice);
