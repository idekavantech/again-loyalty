import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import useTheme from "@material-ui/core/styles/useTheme";
import Input from "@saas/components/Input";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { updateBusiness } from "@saas/stores/business/actions";
import { emailValidator } from "@saas/utils/helpers/emailValidator";
import { landlineValidator } from "@saas/utils/helpers/landlineValidator";
import { nationalIdValidator } from "@saas/utils/helpers/nationalIdValidator";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useRouter } from "next/router";

const BusinessOwnerInfoForm = ({ _updateBusiness, adminUrlPrefix }) => {
  const [ownerInfo, setOwnerInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [confirmInfo, setConfirmInfo] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const handleChange = (value) => {
    setOwnerInfo({ ...ownerInfo, ...value });
  };

  const blurHandleEmail = () => {
    if (ownerInfo.email && !emailValidator(ownerInfo.email)) {
      setErrors({ ...errors, email: "Email format entered is incorrect" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const blurHandleLandLine = () => {
    if (ownerInfo.landline && !landlineValidator(ownerInfo.landline)) {
      setErrors({ ...errors, landline: "The fixed number entered is wrong." });
    }
  };

  const blurHandleNationalId = () => {
    if (ownerInfo.nationalId && !nationalIdValidator(ownerInfo.nationalId)) {
      setErrors({ ...errors, nationalId: "The national code entered is wrong." });
    }
  };

  const blurHandlePostalCode = () => {
    if (ownerInfo.postalCode && ownerInfo.postalCode.length < 10) {
      setErrors({ ...errors, postalCode: "Zip code should be ten digits" });
    }
  };

  const focusHandle = (item) => {
    if (errors[item]) setErrors({ ...errors, [item]: "" });
  };

  const submitForm = () => {
    const _errors = {
      firstName: !ownerInfo.firstName?.trim() ? "Enter the name" : "",
      lastName: !ownerInfo.lastName?.trim()
        ? "Enter the last name"
        : "",
      nationalId: !ownerInfo.nationalId?.trim()
        ? " Enter the national code"
        : errors.nationalId,
      email: errors.email,
      province: !ownerInfo.province?.trim()
        ? "Enter the province"
        : errors.province,
      city: !ownerInfo.city?.trim() ? "Enter the city" : errors.city,
      address: !ownerInfo.address?.trim()
        ? "Enter the address"
        : errors.address,
      postalCode: errors.postalCode,
      landline: !ownerInfo.landline?.trim()
        ? "Enter the fixed number"
        : errors.landline,
    };

    setErrors(_errors);

    if (Object.values(_errors).every((error) => !error)) {
      const {
        email,
        firstName,
        lastName,
        nationalId,
        postalCode,
        landline,
        city,
        province,
        address,
      } = ownerInfo;
      _updateBusiness(
        {
          main_owner: {
            name: `${firstName} ${lastName}`,
            email,
            extra_data: {
              first_name: firstName,
              last_name: lastName,
              national_id: nationalId,
              postal_code: postalCode,
              landline,
              city,
              province,
              address,
            },
          },
        },
        "Save the information successfully performed.",
        "Save information failed!",
        () => router.push(`${adminUrlPrefix}`)
      );
    }
  };
  return (
    <Paper elevation={1} className="w-100 p-4 mt-5">
      <div className="p-4">
        <p style={{ fontSize: 22, fontWeight: 700, lineHeight: "44px" }}>
          Business owner profile
        </p>
        <p style={{ fonrSize: 13, lineHeight: "26px" }}>
          Filling all fields is required.
        </p>
      </div>

      <div className="p-4">
        <div className="d-flex align-items-center">
          <InfoOutlinedIcon style={{ color: theme.palette.primary.main }} />
          <p style={{ fonrSize: 13, lineHeight: "26px" }} className="mr-2">
            Enter your name and name in accordance with your birth certificate.
          </p>
        </div>
        <div className="w-100 d-flex flex-col flex-md-row mt-4">
          <div className="flex-1">
            <Input
              InputLabelProps={{ shrink: true }}
              label="name*"
              type="text"
              size="medium"
              focusedInput
              onChange={(firstName) => handleChange({ firstName })}
              error={errors.firstName}
              helperText={errors.firstName}
              onFocus={() => focusHandle("firstName")}
            />
          </div>
          <div className="px-md-4 my-5 my-md-0 flex-1">
            <Input
              InputLabelProps={{ shrink: true }}
              label="last name*"
              type="text"
              size="medium"
              focusedInput
              onChange={(lastName) => handleChange({ lastName })}
              error={errors.lastName}
              helperText={errors.lastName}
              onFocus={() => focusHandle("lastName")}
            />
          </div>
          <div className="flex-1">
            <Input
              numberOnly
              InputLabelProps={{ shrink: true }}
              label="National Code*"
              size="medium"
              value={
                ownerInfo?.nationalId
                  ? englishNumberToPersianNumber(ownerInfo?.nationalId)
                  : ""
              }
              focusedInput
              onChange={(nationalId) =>
                handleChange({
                  nationalId: persianToEnglishNumber(nationalId),
                })
              }
              onBlur={blurHandleNationalId}
              error={errors.nationalId}
              helperText={errors.nationalId}
              onFocus={() => focusHandle("nationalId")}
              inputProps={{ maxLength: 10 }}
            />
          </div>
        </div>
        <div className="d-flex align-items-center mt-4">
          <InfoOutlinedIcon style={{ color: theme.palette.primary.main }} />
          <p style={{ fonrSize: 13, lineHeight: "26px" }} className="mr-2">
            Note that the fixed number, zip code and address belong to a city.
          </p>
        </div>
        <div className="w-100 d-flex flex-col flex-md-row mt-4">
          <div className="flex-1">
            <Input
              InputLabelProps={{ shrink: true }}
              label="E-mail"
              type="text"
              size="medium"
              focusedInput
              onChange={(email) => handleChange({ email })}
              onBlur={blurHandleEmail}
              error={errors.email}
              helperText={errors.email || "Preferably Gmail."}
              onFocus={() => focusHandle("email")}
            />
          </div>
          <div className="px-md-4 my-5 my-md-0 flex-1 d-flex  justify-content-between">
            <div className="flex-1">
              <Input
                InputLabelProps={{ shrink: true }}
                label="State*"
                type="text"
                size="medium"
                focusedInput
                onChange={(province) => handleChange({ province })}
                error={errors.province}
                helperText={errors.province}
                onFocus={() => focusHandle("province")}
              />
            </div>
            <div className="flex-1 mr-4">
              <Input
                InputLabelProps={{ shrink: true }}
                label="City*"
                type="text"
                size="medium"
                focusedInput
                onChange={(city) => handleChange({ city })}
                error={errors.city}
                helperText={errors.city}
                onFocus={() => focusHandle("city")}
              />
            </div>
          </div>
          <div className="flex-1">
            <Input
              InputLabelProps={{ shrink: true }}
              label="Address*"
              type="text"
              size="medium"
              focusedInput
              onChange={(address) => handleChange({ address })}
              error={errors.address}
              helperText={
                errors.address || "Your address is not displayed on the site."
              }
              onFocus={() => focusHandle("address")}
            />
          </div>
        </div>
        <div className="w-100 d-flex flex-col flex-md-row mt-4">
          <div className="flex-1">
            <Input
              numberOnly
              InputLabelProps={{ shrink: true }}
              label="Fixed number*"
              size="medium"
              focusedInput
              value={
                ownerInfo?.landline
                  ? englishNumberToPersianNumber(ownerInfo?.landline)
                  : ""
              }
              helperText={
                errors.landline || "Enter the phone number with the city code."
              }
              onBlur={blurHandleLandLine}
              error={errors.landline}
              onChange={(landline) =>
                handleChange({
                  landline: persianToEnglishNumber(landline),
                })
              }
              onFocus={() => focusHandle("landline")}
            />
          </div>
          <div className="px-md-4 my-5 my-md-0 flex-1">
            <Input
              numberOnly
              inputProps={{ maxLength: 10 }}
              InputLabelProps={{ shrink: true }}
              label="Postal code"
              size="medium"
              focusedInput
              helperText={errors.postalCode}
              error={errors.postalCode}
              value={
                ownerInfo?.postalCode
                  ? englishNumberToPersianNumber(ownerInfo?.postalCode)
                  : ""
              }
              onChange={(postalCode) =>
                handleChange({
                  postalCode: persianToEnglishNumber(postalCode),
                })
              }
              onBlur={blurHandlePostalCode}
              onFocus={() => focusHandle("postalCode")}
            />
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="d-flex align-items-center mt-5">
          <Checkbox
            checked={confirmInfo}
            onChange={() => setConfirmInfo(!confirmInfo)}
            style={{
              color: theme.palette.primary.main,
            }}
          />
          <span style={{ fontSize: 12 }}>I confirm the accuracy of this information.</span>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            variant="contained"
            color="primary"
            onClick={submitForm}
            disabled={!confirmInfo}
          >
            Confirm and continue
          </Button>
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(BusinessOwnerInfoForm);
