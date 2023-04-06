/**
 *
 * Settings
 *
 */

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useRouter } from "next/router";
import {
  createLegalDocument,
  getJourneyState,
  updateLegalDocument,
} from "store/actions";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import { updateBusiness } from "@saas/stores/business/actions";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { sendEmail } from "@saas/stores/global/actions";
import { validateDomain } from "@saas/utils/helpers/validateDomain";
import {
  makeSelectIsDomainFree,
  makeSelectNikTimeoutError,
} from "store/selectors";
import { checkDomainFree, setDomainFree } from "store/actions";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { text, actions, icon, baseColors } from "@saas/utils/colors";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@saas/components/Input";
import AdminBreadCrumb from "containers/AdminBreadCrumb";

function AdminDocuments({
  loading,
  adminUrlPrefix,
  _updateBusiness,
  business,
  _searchDomain,
  _setDomainFree,
  isDomainFree,
  nikTimeoutError,
}) {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domain, setDomain] = useState(
    business.extra_data?.requested_root_domain?.split(".ir")[0] || ""
  );
  const [isValid, setIsValid] = useState(true);
  const [availableDomain, setAvailableDomain] = useState(
    business?.extra_data?.selected_domain
  );
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const now = new Date();
  const isDisabled = now.getHours() >= 0 && now.getHours() < 2;
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      _searchDomain(domain);
    }
  };
  useEffect(() => {
    if (domain == business.extra_data?.requested_root_domain?.split(".ir")[0]) {
      _searchDomain(domain);
    }
  }, [domain]);

  const submitDomain = () => {
    _updateBusiness(
      {
        extra_data: {
          ...business.extra_data,
          requested_root_domain: domain,
        },
      },
      "",
      "ثبت دامنه انتخابی ناموفق بود!",
      () => router.push(`${adminUrlPrefix}documents/birthdate`)
    );
  };
  const submit = () => {
    const _errors = {
      availableDomain: !availableDomain
        ? "دامنه‌ای که در اختیار دارید را وارد کنید."
        : "",
    };
    setErrors(_errors);
    if (Object.values(_errors).every((error) => !error)) {
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
    }
  };
  return (
    <div className="container mb-5">
      <Head>
        <title>داشبورد</title>
      </Head>
      <AdminBreadCrumb />
      <div className="col-12 mt-4 px-0">
        <Paper elevation={1} className="p-2">
          <p style={{ fontWeight: 600 }}>تنظیمات دامنه</p>
          <p style={{ marginTop: 40, fontSize: 12 }}>
            یکی از دو گزینه زیر را انتخاب کنید.
          </p>
          <FormControl component="fieldset" style={{ marginTop: 20 }}>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              className="p-0"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <FormControlLabel
                className="m-0"
                value="free_domain"
                control={<Radio color="primary" />}
                label="می خواهم از دامنه رایگان .ir استفاده کنم."
              />
              <FormControlLabel
                className="m-0"
                value="own-domain"
                control={<Radio color="primary" />}
                label="دامنه دارم و می خواهم آن را متصل کنم."
              />
            </RadioGroup>
          </FormControl>

          {selectedDomain ? (
            <div style={{ marginTop: 40 }}>
              {selectedDomain == "free_domain" ? (
                <div>
                  {!nikTimeoutError &&
                  domain ==
                    business?.extra_data?.requested_root_domain?.split(
                      ".ir"
                    )[0] ? (
                    isDomainFree ? (
                      <p style={{ marginTop: 40, color: "#00A47C" }}>
                        دامنه مورد نظر شما همچنان در دسترس است. در صورت تمایل می
                        توانید آن را تایید کرده یا تغییر دهید.
                      </p>
                    ) : isDomainFree == false ? (
                      <p style={{ marginTop: 40, color: "#D72C0D" }}>
                        دامنه مورد نظر شما دیگر در درسترس نیست. دامنه دیگری را
                        انتخاب کنید.
                      </p>
                    ) : null
                  ) : null}

                  <div className="col-12 col-md-5 position-relative mt-3">
                    <Input
                      placeholder="دامنه"
                      value={domain ? domain : ""}
                      onChange={(value) => {
                        _setDomainFree(null);
                        const _isValid =
                          validateDomain(value) || value?.length < 3;
                        setIsValid(_isValid);
                        if (_isValid) setDomain(value);
                      }}
                      onKeyPress={handleKeyPress}
                      size="medium"
                      className="w-100 direction-ltr"
                      inputProps={{
                        style: { paddingRight: 145 },
                      }}
                      error={domain && isDomainFree === false}
                    />
                    <div
                      style={{
                        top: 0,
                        bottom: 0,
                        height: 38,
                        right: 145,
                        color: text.subdued,
                      }}
                      className="d-flex align-items-center my-auto position-absolute"
                    >
                      ir.
                    </div>

                    <Button
                      style={{
                        height: 38,
                        right: 21,
                        top: 1,
                        width: 113,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      disabled={
                        domain ==
                        business?.extra_data?.requested_root_domain?.split(
                          ".ir"
                        )[0]
                      }
                      color="primary"
                      className="position-absolute u-box-shadow-none px-1"
                      variant="contained"
                      onClick={() => {
                        _searchDomain(domain);
                      }}
                    >
                      {loading || typeof isDomainFree == "undefined" ? (
                        <div className="stage">
                          <div className="dot-flashing" />
                        </div>
                      ) : (
                        "جستجو"
                      )}
                    </Button>
                  </div>
                  <div style={{ minHeight: 36 }} className="pt-4 u-fontMedium">
                    {!isValid && (
                      <div
                        className="d-flex"
                        style={{ color: actions.critical.default }}
                      >
                        <CancelRoundedIcon className="ml-2" fontSize="small" />
                        در انتخاب دامنه تنها مجاز به استفاده از حروف کوچک
                        انگلیسی، اعداد و .خط تیره هستید
                      </div>
                    )}
                    {isDisabled && (
                      <div
                        className="d-flex"
                        style={{ color: actions.critical.default }}
                      >
                        <CancelRoundedIcon className="ml-2" fontSize="small" />
                        در بازه زمانی ۲۴:۰۰ تا ۰۲:۰۰ سامانه ایرنیک قادر به ارائه
                        سرویس نمی‌باشد لطفا در بازه‌ای دیگر اقدام کنید.
                      </div>
                    )}
                    {nikTimeoutError ? (
                      <p style={{ color: "#D72C0D" }}>{nikTimeoutError}</p>
                    ) : !loading &&
                      domain &&
                      isDomainFree === false &&
                      domain !==
                        business.extra_data?.requested_root_domain?.split(
                          ".ir"
                        )[0] ? (
                      <div className="d-flex" style={{ color: text.subdued }}>
                        <CancelRoundedIcon
                          style={{ color: icon.subdued }}
                          className="ml-2"
                          fontSize="small"
                        />

                        {`«${domain}» قبلا استفاده شده است. دامنه‌ی دیگری انتخاب کنید. `}
                      </div>
                    ) : null}
                    {!loading &&
                    isDomainFree &&
                    isValid &&
                    domain &&
                    domain !==
                      business.extra_data?.requested_root_domain?.split(
                        ".ir"
                      )[0] ? (
                      <div className="d-flex" style={{ color: text.success }}>
                        <CheckCircleRoundedIcon
                          style={{ color: baseColors.success }}
                          className="ml-2"
                          fontSize="small"
                        />
                        {`«${domain}» آزاد و قابل استفاده است. `}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="col-12 col-lg-5">
                  <p style={{ fontSize: 12, marginTop: 40 }}>
                    در صورتی که دامنه ای را قبلا خریداری کرده اید آدرس دامنه خود
                    را در این بخش وارد کنید.
                  </p>
                  <Input
                    label="آدرس دامنه"
                    placeholder="مثال: vitrin.me"
                    size="medium"
                    className="mt-2"
                    value={availableDomain}
                    onChange={(availableDomain) =>
                      setAvailableDomain(availableDomain)
                    }
                    error={errors.availableDomain}
                    helperText={
                      errors?.availableDomain ||
                      "لطفا آدرس دامنه خود را به‌صورت کامل با پسوند وارد کنید."
                    }
                  />
                </div>
              )}
            </div>
          ) : null}
        </Paper>
        {selectedDomain == "free_domain" ? (
          <div className=" w-100 d-flex justify-content-end">
            <Button
              className="col-12 col-md-auto  mt-5"
              variant="contained"
              color="primary"
              disabled={!domain || !isDomainFree}
              onClick={submitDomain}
            >
              تایید نهایی و تکمیل مدارک
            </Button>
          </div>
        ) : (
          <div className=" w-100 d-flex justify-content-end">
            <Button
              className="col-12 col-md-auto mt-5"
              variant="contained"
              color="primary"
              disabled={!availableDomain}
              onClick={submit}
            >
              تایید
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  business: makeSelectBusiness(),
  isDomainFree: makeSelectIsDomainFree(),
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  nikTimeoutError: makeSelectNikTimeoutError(),
});

function mapDispatchToProps(dispatch) {
  return {
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: (index) => dispatch(removeFile(index)),
    _getJourneyState: () => dispatch(getJourneyState()),
    _createDocument: (data, filters) =>
      dispatch(createLegalDocument(data, filters)),
    _updateDocument: (id, data, filters) =>
      dispatch(updateLegalDocument(id, data, filters)),
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
    _sendEmail: (data) => dispatch(sendEmail(data)),
    _searchDomain: (data) => dispatch(checkDomainFree(data)),
    _setDomainFree: (data) => dispatch(setDomainFree(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminDocuments);
