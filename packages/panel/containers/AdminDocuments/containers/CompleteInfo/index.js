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
      setErrors({ ...errors, email: "Email format entered is incorrect" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const submitMainData = () => {
    const _errors = {
      nationalCode: !nationalCode
        ? "Enter the code."
        : nationalCode.length < 10
        ? "The national code must be ten digits"
        : "",
      mobileNumber: !mobileNumber ? "Enter the mobile number.." : "",
      phone: !phone ? "Enter the fixed number.." : errors.phone,
      address: !address ? "Enter the address." : "",
      postal: !postalCode ? "Enter the zip code.." : errors.postal,
      email: !email ? "Enter the email.." : "",
      fullName: !fullName ? "Enter the last name and surname.." : "",
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
        "Information was successfully stored.",
        "Save information failed!",
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
        <WarningBox text="Full and correct login valid information is essential for technical connectivity and free domain provision." />
        <Paper elevation={1} className="p-5 mt-4">
          <div className="u-fontWeightHeavy u-fontLarge">Domain owner profile</div>
          <p className="mt-4" style={{ fontSize: 15 }}>
            Be careful in login information.. To connect and register a domain in the name of the natural person,
            Irnik System(IRNIC) Evaluates the accuracy of the information through registration
            Slow.
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
                    placeholder="Example: Maryam Taheri"
                    label="first name and last name"
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
                      "Enter your first and last name in accordance with your birth certificate."
                    }
                  />
                </div>
                <div className="col-md-6 col-12 px-0 pr-md-3 mt-3 mt-md-0">
                  <Input
                    numberOnly
                    size="medium"
                    placeholder="Example: ۰۱۲۳۴۵۶۷۸۹"
                    label="National Code"
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
                    label="E-mail"
                    placeholder="Example: usertest@gmail.com"
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
                      "Only address with extensiongmail.com Enter. To your email a activation message will be sent."
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center mt-4">
            <InfoOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            <span style={{ fontSize: 12, lineHeight: "20px" }} className="mr-1">
              If the registration record with your email in domain brokerage
              you have. Enter a new email address..{" "}
            </span>
          </div>
          <div className="d-flex flex-wrap w-100 justify-content-between">
            <div className="col-md-4 col-12 px-0 pl-md-3 mt-4 mt-md-5">
              <Input
                numberOnly
                size="medium"
                label="Fixed number"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Example: ۰۲۱۱۲۳۴۵۶۷۸"
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
                      phone: "The fixed number must be eleven digits",
                    });
                }}
                error={errors.phone}
                helperText={
                  errors?.phone || "Enter the phone number with the city code."
                }
              />
            </div>
            <div className="col-md-4 col-12 px-0 px-md-3 mt-4 mt-md-5">
              <Input
                label="phone number"
                placeholder="Example: ۰۹۱۲۱۲۳۴۵۶۷"
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
                label="Postal code"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Example: ۰۱۲۳۴۵۶۷۸۹"
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
                      postal: "Zip code should be ten digits",
                    });
                }}
                error={errors.postal}
                helperText={errors.postal}
              />
            </div>
            <div className="col-md-4 -12 px-0 pl-md-4 mt-4 mt-md-5">
              <Input
                size="medium"
                placeholder="Example: Tehran"
                label="Address"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(address) => {
                  setErrors({ ...errors, address: "" });
                  setAddress(address);
                }}
                value={address}
                helperText={
                  errors?.address || "Your address is not displayed on the site."
                }
              />
            </div>
          </div>
          <div className="d-flex align-items-center mt-4">
            <InfoOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            <span style={{ fontSize: 12, lineHeight: "20px" }} className="mr-1">
              Note that the fixed number, zip code and address belong to a city.
            </span>
          </div>
          <div className="d-flex align-items-center" style={{ marginTop: 30 }}>
            <Checkbox
              checked={confirmInfo}
              onChange={() => setConfirmInfo(!confirmInfo)}
              style={{ color: confirmInfo ? "#0050ff" : "rgba(0, 0, 0, 0.54)" }}
            />
            <span style={{ fontSize: 12 }}>
              I confirm the accuracy of this information.
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
                Correction of the date of birth
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
            Confirm
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
          content="Showcase Support Expert for final coordination for domain connection will be in touch with you for up to three more business days. You can start launching other parts of the site now."
          image="/images/Approve.svg"
          nextTitle="Education"
          title="Registration information completed successfully"
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
