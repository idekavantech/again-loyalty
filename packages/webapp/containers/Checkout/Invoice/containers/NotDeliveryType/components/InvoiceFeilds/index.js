import React, { memo } from "react";

import { coal } from "@saas/utils/colors";
import { useInvalidFieldsCss } from "containers/Checkout/Invoice/containers/NotDeliveryType/hooks/useInvalidFieldsCss";
import Styles from "containers/Checkout/Invoice/containers/NotDeliveryType/components/InvoiceFeilds/Styles";

import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";

function InvoiceFields({
  invoiceFieldsConstant,
  fulfillmentType,
  car,
  tableNumber,
  themeColor,
  invoiceFields,
  errors,
}) {
  const { invalidFieldsCss } = useInvalidFieldsCss(
    invoiceFieldsConstant,
    fulfillmentType,
    car,
    tableNumber
  );

  const theme = useTheme();

  return (
    <>
      <Styles themeColor={themeColor} />
      <div
        className="u-fontLarge u-fontWeightBold mt-5 mb-2"
        style={{ color: coal }}
      >
        {invoiceFieldsConstant[fulfillmentType?.toUpperCase()]?.title}
      </div>
      <Paper
        elevation={1}
        className={`pr-4 pl-4 pt-4 pb-sm-0 pb-lg-4 d-flex justify-content-between ${invalidFieldsCss} flex-column flex-lg-row`}
      >
        <div className={"d-flex flex-column"}>
          {Object?.keys?.(invoiceFields?.[fulfillmentType]).map(
            (item) =>
              invoiceFieldsConstant[fulfillmentType?.toUpperCase()]?.[item]
                .fieldRenderer
          )}
          {errors &&
            errors.map((error) => {
              if (error?.type === fulfillmentType?.toUpperCase())
                return (
                  <div
                    style={{ color: theme.palette.error.main }}
                    className="mt-2 u-font-semi-small"
                    color="error.main"
                  >
                    {error.text}
                  </div>
                );
            })}
        </div>
      </Paper>
    </>
  );
}

export default memo(InvoiceFields);
