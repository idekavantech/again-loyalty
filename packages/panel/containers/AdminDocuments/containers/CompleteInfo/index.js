import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { updateBusiness } from "@saas/stores/business/actions";
import { phoneValidator } from "@saas/utils/helpers/phoneValidator";
import { useRouter } from "next/router";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Paper from "@material-ui/core/Paper";
import Input from "@saas/components/Input";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";
import { gmailValidator } from "@saas/utils/helpers/gmailValidator";
import WarningBox from "containers/AdminDocuments/components/WarningBox";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Checkbox from "@material-ui/core/Checkbox";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import Link from "next/link";

const CompleteInfo = ({ loading, _updateBusiness, adminUrlPrefix }) => {
  const [errors, setErrors] = useState({
    phone: "",
    address: "",
    postal: "",
    email: "",
    image_url: "",
  });
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [postalCode, setPostalCode] = useState();
  const [email, setEmail] = useState();
  const [nationalCode, setNationalCode] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [mobileError, setMobileError] = useState();
  const [fullName, setFullName] = useState();
  const [isOpenSuccessMessageModal, setIsOpenSuccessMessageModal] =
    useState(false);
  const [confirmInfo, setConfirmInfo] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const { type } = router.query;

  const blurHandlePhoneNumber = () => {
    if (phoneValidator(mobileNumber).valid) {
      setMobileError("");
    } else {
      setMobileError(phoneValidator(mobileNumber).error);
    }
  };

  const blurHandleEmail = () => {
    if (email && !gmailValidator(email)) {
      setErrors({ ...errors, email: "فرمت ایمیل وارد شده اشتباه است" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const submitMainData = () => {
    const _errors = {
      nationalCode: !nationalCode
        ? "کدملی را وارد کنید."
        : nationalCode.length < 10
        ? "کد ملی باید ده رقم باشد"
        : "",
      mobileNumber: !mobileNumber ? "شماره موبایل را وارد کنید." : "",
      phone: !phone ? "شماره ثابت را وارد کنید." : errors.phone,
      address: !address ? "آدرس را وارد کنید." : "",
      postal: !postalCode ? "کد پستی را وارد کنید." : errors.postal,
      email: !email ? "ایمیل را وارد کنید." : "",
      fullName: !fullName ? "نام و نام خانوادگی را وارد کنید." : "",
    };
    setErrors(_errors);
    if (Object.values(_errors).every((error) => !error)) {
      _updateBusiness(
        {
          extra_data: {
            domain_owner_info: {
              name: fullName,
              national_id: nationalCode,
              email,
              landline: phone,
              postal_code: postalCode,
              phone: mobileNumber,
              address,
            },
          },
        },
        "اطلاعات  با موفقیت ذخیره شد.",
        "ذخیره اطلاعات  ناموفق بود!",
        () => router.push(`${adminUrlPrefix}documents/support_specialist`)
      );
    }
  };

  return (
    <div className="container mb-5">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        
        .MuiOutlinedInput-adornedStart {
          padding-left: 0;
          border-radius:8px
        },
      `,
        }}
      />
      <AdminBreadCrumb />
      <div className="col-12 mt-4 px-0">
        <WarningBox text="ورود کامل و صحیح اطلاعات معتبر برای اتصال فنی و تهیه دامنه رایگان ضروری است." />
        <Paper elevation={1} className="p-5 mt-4">
          <div className="u-fontWeightHeavy u-fontLarge">مشخصات صاحب دامنه</div>
          <p className="mt-4" style={{ fontSize: 15 }}>
            در ورود اطلاعات دقت کنید. برای اتصال و ثبت دامنه به نام شخص حقیقی ،
            سامانه ایرنیک (IRNIC) صحت اطلاعات را از طریق ثبت احوال ارزیابی می
            کند.
          </p>
          <div
            className="d-flex flex-column flex-md-row "
            style={{ marginTop: 40, fontSize: 14 }}
          >
            <div className="flex-1">
              <div className="d-flex flex-wrap w-100 justify-content-between">
                <div className="col-md-6 col-12 px-0 pl-md-3">
                  <Input
                    type="tel"
                    dir="rtl"
                    id="phoneNumber"
                    noModal
                    size="medium"
                    placeholder="مثال: مریم طاهری"
                    label="نام و نام‌خانوادگی"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(fullName) => {
                      setErrors({ ...errors, fullName: "" });
                      setFullName(fullName);
                    }}
                    value={fullName || ""}
                    error={errors.fullName}
                    helperText={
                      errors?.fullName ||
                      "نام و نام خانوادگی خود را مطابق شناسنامه خود وارد کنید."
                    }
                  />
                </div>
                <div className="col-md-6 col-12 px-0 pr-md-3 mt-3 mt-md-0">
                  <Input
                    numberOnly
                    size="medium"
                    placeholder="مثال : ۰۱۲۳۴۵۶۷۸۹"
                    label="کد ملی"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ maxLength: 10 }}
                    onChange={(nationalCode) => {
                      setErrors({ ...errors, nationalCode: "" });
                      setNationalCode(persianToEnglishNumber(nationalCode));
                    }}
                    value={
                      nationalCode
                        ? englishNumberToPersianNumber(nationalCode)
                        : ""
                    }
                  />
                  <div
                    className="u-font-semi-small mr-1 mt-1 direction-rtl"
                    style={{ color: theme.palette.error.main }}
                  >
                    {errors.nationalCode}
                  </div>
                </div>
                <div className="col-md-6 col-12 px-0 pl-md-3 mt-3 mt-md-5">
                  <Input
                    size="medium"
                    label="آدرس ایمیل"
                    placeholder="مثال: usertest@gmail.com"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(email) => {
                      setErrors({ ...errors, email: "" });
                      setEmail(persianToEnglishNumber(email));
                    }}
                    value={email ? englishNumberToPersianNumber(email) : ""}
                    onBlur={blurHandleEmail}
                    error={errors.email}
                    helperText={
                      errors?.email ||
                      "تنها آدرس با پسوند gmail.com وارد شود. به ایمیل شما یک پیام فعالسازی ارسال می شود."
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center mt-4">
            <InfoOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            <span style={{ fontSize: 12, lineHeight: "20px" }} className="mr-1">
              در صورتی که سابقه ثبت نام با ایمیل خود در کارگزاری‌های دامنه را
              دارید. یک آدرس ایمیل جدید وارد کنید.{" "}
            </span>
          </div>
          <div className="d-flex flex-wrap w-100 justify-content-between">
            <div className="col-md-4 col-12 px-0 pl-md-3 mt-4 mt-md-5">
              <Input
                numberOnly
                size="medium"
                label="شماره ثابت"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="مثال : ۰۲۱۱۲۳۴۵۶۷۸"
                onChange={(phone) => {
                  setErrors({ ...errors, phone: "" });
                  setPhone(persianToEnglishNumber(phone));
                }}
                inputProps={{ maxLength: 11 }}
                value={phone ? englishNumberToPersianNumber(phone) : ""}
                onBlur={() => {
                  if (phone && phone.length < 11)
                    setErrors({
                      ...errors,
                      phone: "شماره ثابت  باید یازده رقم باشد",
                    });
                }}
                error={errors.phone}
                helperText={
                  errors?.phone || "شماره تلفن را به همراه کد شهر وارد کنید."
                }
              />
            </div>
            <div className="col-md-4 col-12 px-0 px-md-3 mt-4 mt-md-5">
              <Input
                label="شماره موبایل"
                placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
                size="medium"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ maxLength: 11 }}
                onBlur={blurHandlePhoneNumber}
                error={mobileError}
                value={
                  mobileNumber ? englishNumberToPersianNumber(mobileNumber) : ""
                }
                onChange={(mobileNumber) => {
                  setErrors({ ...errors, mobileNumber: "" });
                  setMobileNumber(persianToEnglishNumber(mobileNumber));
                }}
              />
              {(mobileError || errors.mobileNumber) && (
                <div
                  style={{ color: theme.palette.error.main }}
                  className="u-font-semi-small text-right my-1 mx-2"
                >
                  {mobileError || errors.mobileNumber}
                </div>
              )}
            </div>

            <div className="col-md-4 col-12 px-0 pr-md-3 mt-4 mt-md-5">
              <Input
                numberOnly
                size="medium"
                label="کد پستی"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="مثال : ۰۱۲۳۴۵۶۷۸۹"
                onChange={(code) => {
                  setErrors({ ...errors, postal: "" });
                  setPostalCode(persianToEnglishNumber(code));
                }}
                inputProps={{ maxLength: 10 }}
                value={
                  postalCode ? englishNumberToPersianNumber(postalCode) : ""
                }
                onBlur={() => {
                  if (postalCode && postalCode.length < 10)
                    setErrors({
                      ...errors,
                      postal: "کد پستی باید ده رقم باشد",
                    });
                }}
                error={errors.postal}
                helperText={errors.postal}
              />
            </div>
            <div className="col-md-4 -12 px-0 pl-md-4 mt-4 mt-md-5">
              <Input
                size="medium"
                placeholder="مثال : تهران"
                label="آدرس"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(address) => {
                  setErrors({ ...errors, address: "" });
                  setAddress(address);
                }}
                value={address}
                helperText={
                  errors?.address || "آدرس شما در سایت نمایش داده نمی‌شود."
                }
              />
            </div>
          </div>
          <div className="d-flex align-items-center mt-4">
            <InfoOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            <span style={{ fontSize: 12, lineHeight: "20px" }} className="mr-1">
              توجه کنید که شماره ثابت ، کد پستی و آدرس متعلق به یک شهر باشند.
            </span>
          </div>
          <div className="d-flex align-items-center" style={{ marginTop: 30 }}>
            <Checkbox
              checked={confirmInfo}
              onChange={() => setConfirmInfo(!confirmInfo)}
              style={{ color: confirmInfo ? "#0050ff" : "rgba(0, 0, 0, 0.54)" }}
            />
            <span style={{ fontSize: 12 }}>
              صحت این اطلاعات را تایید می‌کنم.
            </span>
          </div>
        </Paper>
        <div className="w-100 d-flex flex-col flex-md-row justify-content-between mt-4 align-items-md-center">
          <Link href={`${adminUrlPrefix}documents/birthdate`}>
            <div className="d-flex align-items-center">
              <ContactSupportIcon color="primary" />
              <span
                className="mr-3"
                style={{
                  fontSize: 12,
                  lineHeight: "20px",
                  color: "#0050FF",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                اصلاح تاریخ تولد
              </span>
            </div>
          </Link>
          <Button
            className="col-12 col-md-auto mt-5 mt-md-0"
            variant="contained"
            style={{
              height: 40,
              borderRadius: 8,
            }}
            color="primary"
            disabled={loading || !confirmInfo}
            onClick={submitMainData}
          >
            تایید
          </Button>
        </div>
        <SuccessMessageModal
          isOpen={isOpenSuccessMessageModal}
          onClose={() => setIsOpenSuccessMessageModal(false)}
          returnToDashboard={() => router.push(adminUrlPrefix)}
          next={() =>
            (window.location =
              "https://help.vitrin.me/?_gl=1*jd36rr*_ga*MTg4OTAzOTIwNS4xNjUyNzEzNDQ0*_ga_S6SJXQYHNZ*MTY1NTExNDk4Ny40MS4xLjE2NTUxMTU1ODEuNjA.")
          }
          content="کارشناس پشتیبانی ویترین برای هماهنگی نهایی جهت اتصال دامنه، تا سه روز کاری دیگر با شما در ارتباط خواهد بود. هم اکنون می‌توانید راه اندازی سایر بخشهای سایت را آغاز کنید."
          image="/images/Approve.svg"
          nextTitle="آموزش"
          title="ثبت اطلاعات با موفقیت انجام شد"
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(CompleteInfo);
