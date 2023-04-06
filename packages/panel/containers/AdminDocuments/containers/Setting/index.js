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
              Search your desired domain address:
            </p>
            <div className="position-relative mt-2">
              <Input
                placeholder="Domain"
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
                  "Search"
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
                  In the domain selection solely allowed to use the English lowercase letters,
                  Prepared and.You're a dash
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

                        {`«${domain}» Already used. Select another domain. `}
                      </div>
                    ) : (
                      <div className="d-flex" style={{ color: text.success }}>
                        <CheckCircleRoundedIcon
                          style={{ color: baseColors.success }}
                          className="ml-2"
                          fontSize="small"
                        />
                        {`«${domain}» Free and usable. `}
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
              If you have previously purchased the domain address your domain address in
              Enter this section.
            </p>
            <Input
              label="Domain address"
              placeholder="Example: vitrin.me"
              value={availableDomain}
              onChange={(value) => {
                setAvailableDomain(value);
              }}
              size="medium"
              className="mt-2"
              helperText={
                "Please enter your domain address full with extension."
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
      "Save the information successfully performed.",
      "Save information failed!",
      () => router.push(`${adminUrlPrefix}documents/support_specialist`)
    );
  };

  const submitIrAppDomain = () => {
    _updateBusiness(
      { acception_state: 7, site_domain: domain },
      "Domain registration successfully performed",
      "Error in domain registration",
      () => router.push(`/admin/${domain}/documents/support_specialist`)
    );
  };

  return (
    <div className="container mb-5">
      <Head>
        <title>Domain settings</title>
      </Head>
      <AdminBreadCrumb />
      <div className="col-12 mt-4 px-0">
        <WarningBox text="According to the rules of the IRNIC National Base, having legal age requirements to receive domain.ir  It is essential." />

        <Paper elevation={1} className="p-2 p-md-4 mt-4">
          <p style={{ fontWeight: 600 }}>Domain settings</p>
          <p style={{ margin: "40px 0", fontSize: 12, lineHeight: "22px" }}>
            Select one of the following options:
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
                label="Domain with extension.ir I want and can enter the information of another person of the above age as a domain owner."
              />
              <FormControlLabel
                className="m-0"
                value={OWN_DOMAIN}
                control={<Radio color="primary" />}
                label="I have a domain and I want to connect it."
              />
              <FormControlLabel
                className="m-0"
                value={IR_APP_DOMAIN}
                control={<Radio color="primary" />}
                label=" Of the scope of the showcase with extensionir.ink. I use."
              />
              <FormControlLabel
                className="m-0"
                value={OTHER_DOMAIN}
                control={<Radio color="primary" />}
                label="I make another domain."
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
            Confirm and continue
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
        content={`Please re -visit your management dashboard and option"Connect to the domain"  Select and your domain after selecting the option"I have a domain and I want to connect it" enter.`}
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
