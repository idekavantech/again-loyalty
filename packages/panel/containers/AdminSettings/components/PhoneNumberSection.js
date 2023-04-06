import React, { memo, useState } from "react";
import Input from "@saas/components/Input";
import { isPhoneNumber } from "@saas/utils/helpers/isPhoneNumber";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { DARAMAD_WEBAPP_CONSTANT } from "@saas/utils/constants";

function PhoneNumberSection({
  phone,
  changePhone,
  morePhoneNumbers,
  addMorePhoneNumbers,
}) {
  const [error, setError] = useState("");
  const blur = () => {
    if (!isPhoneNumber(phone)) {
      setError("Incorrect contact number entered.");
    } else {
      setError("");
    }
  };
  const helpText =
    process.env.NEXT_PUBLIC_APP_NAME === DARAMAD_WEBAPP_CONSTANT
      ? "This contact number is printed on the invoice."
      : "This contact number is for users to communicate with you and is displayed to users.";
  return (
    <>
      <div className="d-flex align-items-center">
        <Input
          dir="rtl"
          className="mt-1"
          label="Business Contact Number"
          helperText={error}
          error={error}
          type="tel"
          value={phone}
          onBlur={blur}
          onChange={(value) => changePhone(persianToEnglishNumber(value))}
          size="medium"
        />
        <div
          style={{
            visibility: morePhoneNumbers.length === 0 ? "" : "hidden",
            display: morePhoneNumbers.length === 0 ? "none" : "inherit",
          }}
        >
          <IconButton>
            <DeleteRoundedIcon color="primary" />
          </IconButton>
        </div>
      </div>
      {morePhoneNumbers.map((mpn, index) => (
        <div key={mpn.id} className="d-flex align-items-center">
          <Input
            dir="rtl"
            size="medium"
            helperText={error}
            type="tel"
            className="mt-4"
            value={mpn}
            onBlur={blur}
            label="More contact number"
            onChange={(value) => {
              const newArray = [...morePhoneNumbers];
              newArray[index] = persianToEnglishNumber(value);
              addMorePhoneNumbers(newArray);
            }}
          />

          <IconButton
            onClick={() => {
              const newArray = [...morePhoneNumbers];
              newArray.splice(index, 1);
              addMorePhoneNumbers(newArray);
            }}
          >
            <DeleteRoundedIcon color="primary" />
          </IconButton>
        </div>
      ))}
      <div className="d-flex align-items-center">
        <div
          className={
            "u-font-semi-small u-text-secondary-grey " +
            (error === "" ? "mt-1" : "mt-5")
          }
        >
          {helpText}
        </div>
        <div style={{ visibility: "hidden" }}>
          <IconButton>
            <DeleteRoundedIcon color="primary" />
          </IconButton>
        </div>
      </div>
      {morePhoneNumbers.length < 5 ? (
        <div className="d-flex align-items-center mt-2">
          <IconButton
            style={{ marginRight: -14 }}
            onClick={() => {
              addMorePhoneNumbers([...morePhoneNumbers, ""]);
            }}
          >
            <AddCircleOutlineIcon color="primary" />
          </IconButton>

          <span
            className="u-fontMedium u-cursor-pointer"
            style={{ color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR }}
            onClick={() => {
              addMorePhoneNumbers([...morePhoneNumbers, ""]);
            }}
          >
            Add more contact number
          </span>
        </div>
      ) : null}
    </>
  );
}
export default memo(PhoneNumberSection);
