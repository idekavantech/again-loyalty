import {
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_CAR,
} from "@saas/plugins/Shopping/constants";

export const useCallToActionValidation = (
  car,
  tableNumber,
  invoiceFieldsConstant
) => {
  const carFieldsAreNotValid =
    (invoiceFieldsConstant?.[FULFILLMENT_ON_CAR]?.plate_number?.is_required &&
      (!car?.firstPartOfTag ||
        car?.firstPartOfTag?.length < 2 ||
        !car?.letterOfTag ||
        !car?.seccondPartOfTag ||
        car?.seccondPartOfTag?.length < 3 ||
        !car?.cityOfTag ||
        car?.cityOfTag?.length < 2)) ||
    (invoiceFieldsConstant?.[FULFILLMENT_ON_CAR]?.car_model?.is_required &&
      !car?.model) ||
    (invoiceFieldsConstant?.[FULFILLMENT_ON_CAR]?.car_color?.is_required &&
      !car?.color);

  const tableNumberFieldIsNotValid =
    invoiceFieldsConstant?.[FULFILLMENT_ON_BUSINESS_SITE]?.table_number
      ?.is_required && !tableNumber;
  return {
    carFieldsAreNotValid,
    tableNumberFieldIsNotValid,
  };
};
