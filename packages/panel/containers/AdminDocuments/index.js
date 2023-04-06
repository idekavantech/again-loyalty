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
      "Selected domain registration failed!",
      () => router.push(`${adminUrlPrefix}documents/birthdate`)
    );
  };
  const submit = () => {
    const _errors = {
      availableDomain: !availableDomain
        ? "Enter the domain you have."
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
        "Save the information successfully performed.",
        "Save information failed!",
        () => router.push(`${adminUrlPrefix}documents/support_specialist`)
      );
    }
  };
  return (
    <div className="container mb-5">
      <Head>
        <title>Dashboard</title>
      </Head>
      <AdminBreadCrumb />
      <div className="col-12 mt-4 px-0">
        <Paper elevation={1} className="p-2">
          <p style={{ fontWeight: 600 }}>Domain settings</p>
          <p style={{ marginTop: 40, fontSize: 12 }}>
            Select one of the two options below.
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
                label="Wishing out free domain.ir use."
              />
              <FormControlLabel
                className="m-0"
                value="own-domain"
                control={<Radio color="primary" />}
                label="I have a domain and I want to connect it."
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
                        Your desired domain is still available. If desired.
                        Can confirm or change it.
                      </p>
                    ) : isDomainFree == false ? (
                      <p style={{ marginTop: 40, color: "#D72C0D" }}>
                        The domain you want is no longer on the right. Another domain
                        Select.
                      </p>
                    ) : null
                  ) : null}

                  <div className="col-12 col-md-5 position-relative mt-3">
                    <Input
                      placeholder="Domain"
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
                        "Search"
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
                        In the domain selection only allowed to use lowercase letters
                        English, numbers and.You're a dash
                      </div>
                    )}
                    {isDisabled && (
                      <div
                        className="d-flex"
                        style={{ color: actions.critical.default }}
                      >
                        <CancelRoundedIcon className="ml-2" fontSize="small" />
                        At the interval of 1:1 to 1:۰ ۰Irnik system capable of presenting
                        The service is not to take action in another interval.
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

                        {`«${domain}» Already used. Select another domain. `}
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
                        {`«${domain}» Free and usable. `}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="col-12 col-lg-5">
                  <p style={{ fontSize: 12, marginTop: 40 }}>
                    If you have already purchased the domain your domain address
                    Enter in this section.
                  </p>
                  <Input
                    label="Domain address"
                    placeholder="Example: vitrin.me"
                    size="medium"
                    className="mt-2"
                    value={availableDomain}
                    onChange={(availableDomain) =>
                      setAvailableDomain(availableDomain)
                    }
                    error={errors.availableDomain}
                    helperText={
                      errors?.availableDomain ||
                      "Please enter your domain address full with extension."
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
              Final confirmation and completion of the documents
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
              Confirm
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
