import React, { memo } from "react";

import LazyImage from "@saas/components/LazyImage";
import { coal, pollution } from "@saas/utils/colors";
import { SHOPPING_ORDER_INVOICE_DTO } from "@saas/plugins/Shopping/constants";

import { Collapse } from "react-collapse";
import Divider from "@material-ui/core/Divider";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

function DiscountCollapse({
  selectedDiscountMethod,
  isDiscountDropDownOpen,
  discountMethods,
  changeCode,
  setDiscountMethod,
  setDiscountDropDownOpen,
}) {
  return (
    <Collapse isOpened={isDiscountDropDownOpen}>
      {Object.entries(discountMethods).map(([key, value]) => {
        return (
          <>
            <Divider />
            <div
              className="px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
              onClick={() => {
                const dto = sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
                  ? JSON.parse(
                      sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
                    )
                  : null;
                if (dto) {
                  delete dto.use_gift_credit;
                  delete dto.discount_code;
                }
                sessionStorage.setItem(
                  SHOPPING_ORDER_INVOICE_DTO,
                  JSON.stringify(dto)
                );
                changeCode("");
                setDiscountMethod(value);
                setDiscountDropDownOpen(!isDiscountDropDownOpen);
              }}
            >
              <div className="d-flex align-items-center">
                <LazyImage
                  src={value.Icon}
                  width={24}
                  height={24}
                  className="ml-2"
                />
                <div>
                  <div
                    className="u-fontMedium u-fontWeightBold"
                    style={{ color: coal }}
                  >
                    {value.selectableOptionTitle}
                  </div>
                  <div
                    className="u-font-semi-small"
                    style={{ color: pollution }}
                  >
                    {value.selectableOptionDescription}
                  </div>
                </div>
              </div>
              {selectedDiscountMethod.name === key && (
                <CheckRoundedIcon color="secondary" />
              )}
            </div>
          </>
        );
      })}
    </Collapse>
  );
}

export default memo(DiscountCollapse);
