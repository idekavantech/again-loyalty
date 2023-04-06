import React, { memo, useEffect } from "react";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_CAR,
  TABLE_NUMBER_SESSION_STORAGE,
} from "@saas/plugins/Shopping/constants";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
} from "@saas/stores/business/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  receivingInformationComponent,
  receivingInformationPart,
} from "containers/Checkout/Invoice/containers/NotDeliveryType/constants";
import { useInvoiceFields } from "containers/Checkout/Invoice/containers/NotDeliveryType/hooks/useInvoiceFields";
import InvoiceFeilds from "containers/Checkout/Invoice/containers/NotDeliveryType/components/InvoiceFeilds";
import { useCallToActionValidation } from "containers/Checkout/Invoice/containers/NotDeliveryType/hooks/useCallToActionValidation";

function NotDeliveryType({
  fulfillmentType,
  business,
  themeColor,
  shoppingPluginData,
  setCallToActionConfig,
  orderInfo,
  paymentMethod,
  tableNumber,
  setTableNumber,
  invoiceFields,
  car,
  setCar,
}) {
  const { minWidth768 } = useResponsive();

  const deliveryOnSiteDetailAccuracy =
    shoppingPluginData?.data?.map?.delivery_on_site_detail_accuracy;

  const receivingInformationPartKey =
    receivingInformationPart[fulfillmentType?.toUpperCase()];
  const ReceivingInformationPartComp =
    receivingInformationComponent[receivingInformationPartKey];

  useEffect(() => {
    setTableNumber(sessionStorage?.getItem(TABLE_NUMBER_SESSION_STORAGE));
  }, []);

  const { invoiceFieldsConstant, errors } = useInvoiceFields(
    car,
    setCar,
    tableNumber,
    setTableNumber,
    invoiceFields,
    themeColor
  );

  const { carFieldsAreNotValid, tableNumberFieldIsNotValid } =
    useCallToActionValidation(car, tableNumber, invoiceFieldsConstant);

  useEffect(() => {
    if (
      fulfillmentType?.toUpperCase() === FULFILLMENT_ON_CAR &&
      carFieldsAreNotValid
    ) {
      setCallToActionConfig({
        label: "اطلاعات مربوط به خودرو را وارد نمایید.",
        onClick: null,
        isDisabled: true,
      });
    } else if (
      orderInfo?.delivery_site_type?.toUpperCase() ===
        FULFILLMENT_ON_BUSINESS_SITE &&
      tableNumberFieldIsNotValid
    ) {
      setCallToActionConfig({
        label: minWidth768 ? "لطفا شماره میز را وارد نمایید" : "شماره میز",
        onClick: null,
        isDisabled: true,
      });
    } else {
      setCallToActionConfig({
        label: "تایید و ثبت سفارش",
        onClick: null,
        isDisabled: false,
      });
    }
  }, [fulfillmentType, car, tableNumber, paymentMethod, minWidth768]);

  return (
    <div>
      <ReceivingInformationPartComp
        deliveryOnSiteDetailAccuracy={deliveryOnSiteDetailAccuracy}
        fulfillmentType={fulfillmentType}
        business={business}
        themeColor={themeColor}
      />
      {invoiceFields?.[fulfillmentType] ? (
        <InvoiceFeilds
          invoiceFieldsConstant={invoiceFieldsConstant}
          fulfillmentType={fulfillmentType}
          errors={errors}
          car={car}
          tableNumber={tableNumber}
          themeColor={themeColor}
          invoiceFields={invoiceFields}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  themeColor: makeSelectBusinessThemeColor(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(NotDeliveryType);
