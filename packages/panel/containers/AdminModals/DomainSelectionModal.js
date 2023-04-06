import React, { memo, useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Input from "@saas/components/Input";
import { text, border, actions, baseColors } from "@saas/utils/colors";
import { validateDomain } from "@saas/utils/helpers/validateDomain";
import { createStructuredSelector } from "reselect";
import {
  makeSelectIsDomainFree,
  makeSelectNikTimeoutError,
} from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectUser } from "@saas/stores/user/selector";
import { makeSelectBusinessSlug } from "@saas/stores/business/selector";
import { checkDomainFree, setDomainFree } from "store/actions";
import { sendEmail } from "@saas/stores/global/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { updateBusiness } from "@saas/stores/business/actions";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { getJourneyState, updateJourneyState } from "store/actions";
import { makeSelectJourneyState } from "store/selectors";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";
import {
  checkSiteDomainAvailability,
  setAvaliabilityDomain,
} from "store/actions";
import { makeSelectAvailabilityDomain } from "store/selectors";
import { useRouter } from "next/router";

function DomainSelectionModal({
  isOpen,
  onClose,
  loading,
  user,
  //isDomainFree,
  nikTimeoutError,
  _sendEmail,
  journeyData,
  _getJourneyState,
  _updateJourneyState,
  _updateBusiness,
  business,
  _checkSiteDomainAvailability,
  availability_domain,
  _setDomainFree,
}) {
  const [domain, setDomain] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const { is_available } = availability_domain || {};
  const router = useRouter();

  const dashboardState =
    journeyData?.vitrin_journey_state?.dashboard_state || {};
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      _checkSiteDomainAvailability(domain);
    }
  };
  const inputRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current && isOpen) inputRef.current.focus();
    }, 100);
  }, [isOpen]);

  const desktopMatches = useMediaQuery("(min-width:768px)");
  const now = new Date();
  const isDisabled = now.getHours() >= 0 && now.getHours() < 2;

  const submitDomain = () => {
    _updateBusiness(
      { acception_state: 7, site_domain: domain },
      "Domain registration successfully performed",
      "Error in domain registration",
      () => {
        if (!dashboardState?.free_domain_state) {
          _updateJourneyState(
            {
              dashboard_state: {
                ...dashboardState,
                free_domain_state: 1,
              },
            },
            () => setIsOpenSuccessModal(true)
          );
        } else {
          setIsOpenSuccessModal(true);
        }
      }
    );
  };

  const searchDomain = () => {
    if (domain.length < 5) {
      setError("Your selected domain must have at least 2 characters.");
    } else {
      _checkSiteDomainAvailability(domain);
    }
  };

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        style={{
          borderRadius: 8,
          margin: 0,
          maxWidth: desktopMatches ? 520 : 320,
          height: "fit-content",
        }}
        header={
          <ModalHeader
            onRightClick={onClose}
            style={{
              fontSize: 20,
              fontWeight: 500,
              lineHeight: "32px",
              color: "#202223",
            }}
            title="Select Gift Domain Address"
          />
        }
        body={
          <div
            className=" text-right u-fontLarge"
            style={{
              backgroundColor: "#F6F6F7",
              padding: desktopMatches ? 20 : 16,
            }}
          >
            <div>
              Enter your desired domain address. This address related to the gift domain
              You are and changes or add other domains below
              Is.{" "}
            </div>
            <div className="position-relative mt-3">
              <Input
                inputRef={inputRef}
                disabled={isDisabled}
                placeholder="Domain"
                value={domain}
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
                  // readOnly: business.extra_data?.requested_root_domain,
                }}
                onFocus={() => setError("")}
                error={domain && (is_available === false || error)}
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
                ir.ink
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
                disabled={!domain || isDisabled}
                color="primary"
                className="position-absolute u-box-shadow-none px-1"
                variant="contained"
                onClick={searchDomain}
              >
                {loading ? (
                  <div className="stage">
                    <div className="dot-flashing" />
                  </div>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
            <p
              className="mt-1"
              style={{ fontSize: 12, color: border.depressed }}
            >
              You can from your business name or similar ID of your Instagram
              use(For examplevitrin.ir.ink)
            </p>
            <div style={{ minHeight: 36 }} className="pt-2 pb-4 u-fontMedium">
              {!isValid && (
                <div
                  className="d-flex"
                  style={{ color: actions.critical.default }}
                >
                  <CancelRoundedIcon className="ml-2" fontSize="small" />
                  In the domain selection solely allowed to use the English lowercase letters,
                  Prepared and.You're a dash
                </div>
              )}
              {error && (
                <div
                  className="d-flex"
                  style={{ color: actions.critical.default }}
                >
                  <CancelRoundedIcon className="ml-2" fontSize="small" />
                  {error}
                </div>
              )}
              {isDisabled && (
                <div
                  className="d-flex"
                  style={{ color: actions.critical.default }}
                >
                  <CancelRoundedIcon className="ml-2" fontSize="small" />
                  At the interval of 1:1 to 1:۰Irnik system capable of providing service
                  Can't take action in another interval.
                </div>
              )}
              {nikTimeoutError ? (
                <p style={{ color: "#D72C0D" }}>{nikTimeoutError}</p>
              ) : !loading && domain && is_available === false ? (
                <div
                  className="d-flex align-items-center"
                  style={{ color: actions.critical.default }}
                >
                  <CancelRoundedIcon
                    style={{ color: actions.critical.default }}
                    className="ml-2"
                    fontSize="small"
                  />

                  {`«${domain}» Already used. Select another domain. `}
                </div>
              ) : null}
              {!loading && is_available && isValid && domain ? (
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

            <div className="w-100 d-flex justify-content-center  mt-5">
              <Button
                variant="contained"
                style={{
                  height: 40,
                  color: "#FFFFFF",
                }}
                className="dashboard_buttons"
                color="primary"
                disabled={!is_available || !isValid || !domain || loading}
                onClick={() => {
                  submitDomain(`${domain}.ir`);
                }}
              >
                I want the same domain
              </Button>
            </div>
            <SuccessMessageModal
              isOpen={isOpenSuccessModal}
              title={`Your request for free domain registration${domain} received!`}
              content={`
Domain to address${domain}.ir.ink Registered for you successfully.
You can now introduce your site and increase your visit by sending your domain address to your friends.`}
              next={() => {
                _getJourneyState();
                onClose();
                router.push(`/admin/${domain}`);
              }}
              onClose={onClose}
              image="/images/success-domain.svg"
            />
          </div>
        }
      />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  // isDomainFree: makeSelectIsDomainFree(),
  business: makeSelectBusiness(),
  loading: makeSelectLoading(),
  user: makeSelectUser(),
  businessSlug: makeSelectBusinessSlug(),
  nikTimeoutError: makeSelectNikTimeoutError(),
  journeyData: makeSelectJourneyState(),
  availability_domain: makeSelectAvailabilityDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    _searchDomain: (data) => dispatch(checkDomainFree(data)),
    // _setDomainFree: (data) => dispatch(setDomainFree(data)),
    _sendEmail: (data) => dispatch(sendEmail(data)),
    _getJourneyState: () => dispatch(getJourneyState()),
    _updateJourneyState: (data, callback) =>
      dispatch(updateJourneyState(data, callback)),
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
    _checkSiteDomainAvailability: (data) =>
      dispatch(checkSiteDomainAvailability(data)),
    _setDomainFree: (data) => dispatch(setAvaliabilityDomain(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(DomainSelectionModal);
