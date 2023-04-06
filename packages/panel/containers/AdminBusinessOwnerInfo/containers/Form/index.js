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
      setErrors({ ...errors, email: "فرمت ایمیل وارد شده اشتباه است" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const blurHandleLandLine = () => {
    if (ownerInfo.landline && !landlineValidator(ownerInfo.landline)) {
      setErrors({ ...errors, landline: "شماره ثابت وارد شده اشتباه است" });
    }
  };

  const blurHandleNationalId = () => {
    if (ownerInfo.nationalId && !nationalIdValidator(ownerInfo.nationalId)) {
      setErrors({ ...errors, nationalId: "کد ملی واد شده اشتباه است" });
    }
  };

  const blurHandlePostalCode = () => {
    if (ownerInfo.postalCode && ownerInfo.postalCode.length < 10) {
      setErrors({ ...errors, postalCode: "کد پستی باید ده رقم باشد" });
    }
  };

  const focusHandle = (item) => {
    if (errors[item]) setErrors({ ...errors, [item]: "" });
  };

  const submitForm = () => {
    const _errors = {
      firstName: !ownerInfo.firstName?.trim() ? "نام را وارد نمایید" : "",
      lastName: !ownerInfo.lastName?.trim()
        ? "نام خانوادگی را وارد نمایید"
        : "",
      nationalId: !ownerInfo.nationalId?.trim()
        ? " کد ملی را وارد نمایید"
        : errors.nationalId,
      email: errors.email,
      province: !ownerInfo.province?.trim()
        ? "استان را وارد نمایید"
        : errors.province,
      city: !ownerInfo.city?.trim() ? "شهر را وارد نمایید" : errors.city,
      address: !ownerInfo.address?.trim()
        ? "آدرس را وارد نمایید"
        : errors.address,
      postalCode: errors.postalCode,
      landline: !ownerInfo.landline?.trim()
        ? "شماره ثابت را وارد نمایید"
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
        "ذخیره اطلاعات با موفقیت انجام شد.",
        "ذخیره اطلاعات ناموفق بود!",
        () => router.push(`${adminUrlPrefix}`)
      );
    }
  };
  return (
    <Paper elevation={1} className="w-100 p-4 mt-5">
      <div className="p-4">
        <p style={{ fontSize: 22, fontWeight: 700, lineHeight: "44px" }}>
          مشخصات صاحب کسب‌وکار
        </p>
        <p style={{ fonrSize: 13, lineHeight: "26px" }}>
          پر کردن تمامی فیلد‌ها الزامی است.
        </p>
      </div>

      <div className="p-4">
        <div className="d-flex align-items-center">
          <InfoOutlinedIcon style={{ color: theme.palette.primary.main }} />
          <p style={{ fonrSize: 13, lineHeight: "26px" }} className="mr-2">
            نام و نام‌خانوادگی خود را مطابق شناسنامه خود وارد کنید.
          </p>
        </div>
        <div className="w-100 d-flex flex-col flex-md-row mt-4">
          <div className="flex-1">
            <Input
              InputLabelProps={{ shrink: true }}
              label="نام*"
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
              label="نام خانوادگی*"
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
              label="کد ملی*"
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
            توجه کنید که شماره ثابت ، کد پستی و آدرس متعلق به یک شهر باشند.
          </p>
        </div>
        <div className="w-100 d-flex flex-col flex-md-row mt-4">
          <div className="flex-1">
            <Input
              InputLabelProps={{ shrink: true }}
              label="آدرس ایمیل"
              type="text"
              size="medium"
              focusedInput
              onChange={(email) => handleChange({ email })}
              onBlur={blurHandleEmail}
              error={errors.email}
              helperText={errors.email || "ترجیحا جیمیل وارد کنید"}
              onFocus={() => focusHandle("email")}
            />
          </div>
          <div className="px-md-4 my-5 my-md-0 flex-1 d-flex  justify-content-between">
            <div className="flex-1">
              <Input
                InputLabelProps={{ shrink: true }}
                label="استان *"
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
                label="شهر *"
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
              label="آدرس*"
              type="text"
              size="medium"
              focusedInput
              onChange={(address) => handleChange({ address })}
              error={errors.address}
              helperText={
                errors.address || "آدرس شما در سایت نمایش داده نمی‌شود."
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
              label="شماره ثابت *"
              size="medium"
              focusedInput
              value={
                ownerInfo?.landline
                  ? englishNumberToPersianNumber(ownerInfo?.landline)
                  : ""
              }
              helperText={
                errors.landline || "شماره تلفن را به همراه کد شهر وارد کنید."
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
              label="کد پستی"
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
          <span style={{ fontSize: 12 }}>صحت این اطلاعات را تایید می‌کنم.</span>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            variant="contained"
            color="primary"
            onClick={submitForm}
            disabled={!confirmInfo}
          >
            تایید و ادامه
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
