import React, { memo } from "react";

import { coal, strawberryIII } from "@saas/utils/colors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Input from "@saas/components/Input";
import {
  addressDetailsRequirementsFieldsLabels,
  addressDetailsRequirementsFieldsClasses,
  addressDetailsRequirementsFieldsMaximumLength,
} from "@saas/plugins/Shopping/constants";

function FurtherInformation({
  isAddressDetailsInvalid,
  addressDetaildFieldsElementRef,
  addressDetailsFields,
  addressDetailsFieldsError,
  setAddressDetailsFieldsError,
  setAddressDetailsFields,
  themeColor,
}) {
  return (
    <>
      <div
        className={`d-flex flex-column ${
          isAddressDetailsInvalid && "error-address-details-invalid"
        }`}
        ref={addressDetaildFieldsElementRef}
      >
        <div className="px-4 pt-3">
          <div
            className="u-fontMedium u-fontWeightBold mb-2"
            style={{ color: coal }}
          >
            اطلاعات تکمیلی
          </div>
        </div>
        <div className="d-flex flex-wrap px-2 py-3">
          {Object.entries(addressDetailsFields).map(([key, value]) => {
            if (!addressDetailsRequirementsFieldsLabels[key]) {
              return null;
            }
            return (
              <div
                key={key}
                className={`mb-3 mb-md-2 px-2 ${addressDetailsRequirementsFieldsClasses[key]}`}
              >
                <div style={{ color: coal }} className="u-font-semi-small">
                  {addressDetailsRequirementsFieldsLabels[key]}
                </div>
                <Input
                  className="mt-1"
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  onChange={(_value) => {
                    if (
                      _value.length >
                      addressDetailsRequirementsFieldsMaximumLength[key]?.max
                    ) {
                      setAddressDetailsFieldsError({
                        ...addressDetailsFieldsError,
                        [key]:
                          addressDetailsRequirementsFieldsMaximumLength[key]
                            .textError,
                      });
                    } else {
                      setAddressDetailsFieldsError({
                        ...addressDetailsFieldsError,
                        [key]: "",
                      });
                      setAddressDetailsFields({
                        ...addressDetailsFields,
                        [key]: persianToEnglishNumber(_value),
                      });
                    }
                  }}
                  themeColor={themeColor}
                  value={englishNumberToPersianNumber(value, "")}
                  size="small"
                  placeholder={addressDetailsRequirementsFieldsLabels[key]}
                  inputProps={{
                    className: "direction-ltr",
                  }}
                  onBlur={() =>
                    setAddressDetailsFieldsError({
                      ...addressDetailsFieldsError,
                      [key]: "",
                    })
                  }
                />
                {addressDetailsFieldsError[key] !== "" && (
                  <div
                    className="u-font-semi-small mt-1"
                    style={{ color: strawberryIII }}
                  >
                    {addressDetailsFieldsError[key]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default memo(FurtherInformation);
