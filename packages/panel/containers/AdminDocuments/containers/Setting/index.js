import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import WarningBox from "containers/AdminDocuments/components/WarningBox";
import ConfirmationModal from "containers/AdminDocuments/components/confirmationModal";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@saas/components/Input";
import { text, actions, icon, baseColors } from "@saas/utils/colors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  checkSiteDomainAvailability,
  setAvaliabilityDomain,
} from "store/actions";
import { makeSelectAvailabilityDomain } from "store/selectors";
import { validateDomain } from "@saas/utils/helpers/validateDomain";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { useRouter } from "next/router";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { updateBusiness } from "@saas/stores/business/actions";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";

const IR_APP_DOMAIN = "ir_app_domain";
const OWN_DOMAIN = "own_domain";
const OTHER_INFO = "other_info";
const OTHER_DOMAIN = "other_domain";

const Setting = ({
  is_loading,
  _checkSiteDomainAvailability,
  availability_domain,
  _setDomainFree,
  adminUrlPrefix,
  _updateBusiness,
}) => {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [domain, setDomain] = useState("");
  const [availableDomain, setAvailableDomain] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenSuccessMessageModal, setIsOpenSuccessMessageModal] =
    useState(false);

  const router = useRouter();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      _checkSiteDomainAvailability(domain);
    }
  };

  const handleSectionDomain = () => {
    switch (selectedDomain) {
      case IR_APP_DOMAIN:
        return (
          <div className="col-12 col-lg-5" style={{ marginTop: 35 }}>
            <p style={{ fontSize: 12 }}>
              آدرس دامنه مورد نظر خود را جست‌و‌جو کنید:
            </p>
            <div className="position-relative mt-2">
              <Input
                placeholder="دامنه"
                value={domain ? domain : ""}
                onChange={(value) => {
                  _setDomainFree(null);
                  const _isValid = validateDomain(value) || value?.length < 3;
                  setIsValid(_isValid);
                  if (_isValid) setDomain(value);
                }}
                onKeyPress={handleKeyPress}
                size="medium"
                className="w-100 direction-ltr"
                inputProps={{
                  style: { paddingRight: 145 },
                }}
                error={domain && availability_domain?.is_available === false}
              />
              <div
                style={{
                  top: 0,
                  bottom: 0,
                  height: 38,
                  right: 125,
                  color: text.subdued,
                }}
                className="d-flex align-items-center my-auto position-absolute"
              >
                ir.ink.
              </div>

              <Button
                style={{
                  height: 38,
                  right: 1,
                  top: 1,
                  width: 113,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                color="primary"
                className="position-absolute u-box-shadow-none px-1"
                variant="contained"
                onClick={() => {
                  _checkSiteDomainAvailability(domain);
                }}
              >
                {is_loading ? (
                  <div className="stage">
                    <div className="dot-flashing" />
                  </div>
                ) : (
                  "جستجو"
                )}
              </Button>
            </div>
            <div style={{ minHeight: 36 }} className="pt-4 u-fontMedium">
              {!isValid ? (
                <div
                  className="d-flex"
                  style={{ color: actions.critical.default }}
                >
                  <CancelRoundedIcon className="ml-2" fontSize="small" />
                  در انتخاب دامنه تنها مجاز به استفاده از حروف کوچک انگلیسی،
                  اعداد و .خط تیره هستید
                </div>
              ) : (
                <>
                  {domain && !is_loading && availability_domain ? (
                    !availability_domain.is_available ? (
                      <div className="d-flex" style={{ color: text.subdued }}>
                        <CancelRoundedIcon
                          style={{ color: icon.subdued }}
                          className="ml-2"
                          fontSize="small"
                        />

                        {`«${domain}» قبلا استفاده شده است. دامنه‌ی دیگری انتخاب کنید. `}
                      </div>
                    ) : (
                      <div className="d-flex" style={{ color: text.success }}>
                        <CheckCircleRoundedIcon
                          style={{ color: baseColors.success }}
                          className="ml-2"
                          fontSize="small"
                        />
                        {`«${domain}» آزاد و قابل استفاده است. `}
                      </div>
                    )
                  ) : null}
                </>
              )}
            </div>
          </div>
        );
      case OWN_DOMAIN:
        return (
          <div className="col-12 col-lg-5" style={{ marginTop: 35 }}>
            <p style={{ fontSize: 12 }}>
              در صورتی که دامنه ای را قبلا خریداری کرده اید آدرس دامنه خود را در
              این بخش وارد کنید.
            </p>
            <Input
              label="آدرس دامنه"
              placeholder="مثال: vitrin.me"
              value={availableDomain}
              onChange={(value) => {
                setAvailableDomain(value);
              }}
              size="medium"
              className="mt-2"
              helperText={
                "لطفا آدرس دامنه خود را به‌صورت کامل با پسوند وارد کنید."
              }
            />
          </div>
        );

      default:
        return;
    }
  };

  useEffect(() => {
    handleDisableSubmitButton();
  }, [
    selectedDomain,
    availability_domain,
    isValid,
    is_loading,
    availableDomain,
  ]);

  const handleDisableSubmitButton = () => {
    switch (selectedDomain) {
      case IR_APP_DOMAIN:
        setDisabled(
          !domain ||
            !availability_domain?.is_available ||
            !isValid ||
            is_loading
        );
        break;

      case OWN_DOMAIN:
        setDisabled(!availableDomain || is_loading);
        break;

      default:
        setDisabled(false);
    }
  };

  const submit = () => {
    switch (selectedDomain) {
      case OTHER_INFO:
        router.push(`${adminUrlPrefix}documents/info?type=other`);
        break;
      case OWN_DOMAIN:
        submitOwnDomain();
        break;
      case IR_APP_DOMAIN:
        setIsOpenConfirmModal(true);
        break;
      default:
        setIsOpenSuccessMessageModal(true);
    }
  };

  const submitOwnDomain = () => {
    _updateBusiness(
      {
        extra_data: {
          selected_domain: availableDomain,
        },
      },
      "ذخیره اطلاعات با موفقیت انجام شد.",
      "ذخیره اطلاعات ناموفق بود!",
      () => router.push(`${adminUrlPrefix}documents/support_specialist`)
    );
  };

  const submitIrAppDomain = () => {
    _updateBusiness(
      { acception_state: 7, site_domain: domain },
      "ثبت دامنه با موفقیت انجام شد",
      "خطا در ثبت دامنه",
      () => router.push(`/admin/${domain}/documents/support_specialist`)
    );
  };

  return (
    <div className="container mb-5">
      <Head>
        <title>تنظیمات دامنه</title>
      </Head>
      <AdminBreadCrumb />
      <div className="col-12 mt-4 px-0">
        <WarningBox text="طبق قوانین پایگاه ملی ایرنیک،   داشتن شرایط سن قانونی  برای دریافت دامنه .ir  ضروری است." />

        <Paper elevation={1} className="p-2 p-md-4 mt-4">
          <p style={{ fontWeight: 600 }}>تنظیمات دامنه</p>
          <p style={{ margin: "40px 0", fontSize: 12, lineHeight: "22px" }}>
            یکی از گزینه‌های زیر را انتخاب کنید:
          </p>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              className="p-0"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <FormControlLabel
                className="m-0"
                value={OTHER_INFO}
                control={<Radio color="primary" />}
                label="دامنه با پسوند .ir می‌خواهم و می‌توانم اطلاعات فرد دیگری دارای شرایط سنی فوق را به عنوان صاحب دامنه وارد کنم."
              />
              <FormControlLabel
                className="m-0"
                value={OWN_DOMAIN}
                control={<Radio color="primary" />}
                label="دامنه دارم و می خواهم آن را متصل کنم."
              />
              <FormControlLabel
                className="m-0"
                value={IR_APP_DOMAIN}
                control={<Radio color="primary" />}
                label=" از دامنه ویترین با پسوند ir.ink. استفاده می‌کنم."
              />
              <FormControlLabel
                className="m-0"
                value={OTHER_DOMAIN}
                control={<Radio color="primary" />}
                label="دامنه دیگری تهیه می‌کنم."
              />
            </RadioGroup>
          </FormControl>

          {selectedDomain ? handleSectionDomain() : null}
        </Paper>
        <div className=" w-100 d-flex justify-content-end">
          <Button
            className="col-12 col-md-auto mt-5"
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={submit}
          >
            تایید و ادامه
          </Button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpenConfirmModal}
        onClose={() => setIsOpenConfirmModal(false)}
        submit={submitIrAppDomain}
        isLoading={is_loading}
      />
      <SuccessMessageModal
        isOpen={isOpenSuccessMessageModal}
        onClose={() => setIsOpenSuccessMessageModal(false)}
        next={() => router.push(adminUrlPrefix)}
        content={`لطفا پس از تهیه دامنه مجددا به داشبورد مدیریتی خود مراجعه کنید و گزینه "اتصال به دامنه"  را انتخاب کنید و دامنه خود را پس از انتخاب گزینه "دامنه دارم و می خواهم آن را متصل کنم" وارد کنید.`}
        image="/images/Approve.svg"
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  is_loading: makeSelectLoading(),
  availability_domain: makeSelectAvailabilityDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    _checkSiteDomainAvailability: (data) =>
      dispatch(checkSiteDomainAvailability(data)),
    _setDomainFree: (data) => dispatch(setAvaliabilityDomain(data)),
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(Setting);
