import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { isNumber } from "@saas/utils/helpers/isNumber";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

import { handleKeyDown } from "@saas/utils/helpers/handleKeyDown";

import Input from "@saas/components/Input";
import Icon from "@saas/components/Icon";
import { VERIFY } from "@saas/icons";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { login, sendViaPhone, verify } from "@saas/stores/user/actions";
import { makeSelectBusinessThemeColor } from "@saas/stores/business/selector";
import { useRouter } from "next/router";
import Head from "next/head";

function Verify({ _verify, isLoading, resend, themeColor, _sendViaPhone }) {
  const router = useRouter();
  const phoneNumber = router.query.phone;
  const callback = router.query.callback;
  const [verificationCode, setVerificationCode] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, []);
  useEffect(() => {
    document.getElementById("verificationCode").focus();
  }, []);

  const handleKeyPress = (event) => {
    setError(null);
    if (event.key === "Enter") {
      submit();
    }
  };

  const submit = () => {
    if (
      verificationCode &&
      verificationCode.toString().length === 4 &&
      isNumber(verificationCode)
    ) {
      _verify(phoneNumber, verificationCode, callback || "/login");
      setError(null);
    } else {
      setError("Please enter the confirmation code correctly..");
    }
  };
  useEffect(() => {
    if (verificationCode && verificationCode.toString().length === 4) {
      submit();
    }
  }, [verificationCode]);

  return (
    <Paper
      className="d-flex flex-1 w-100 flex-column my-4"
      style={{ minHeight: "72vh" }}
    >
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ flex: 1 }} className="d-flex flex-column">
        <div className="flex-1 text-center px-3">
          <div className="mt-5 d-flex justify-content-center align-items-center">
            <Icon icon={VERIFY} width={64} height={53} color={themeColor} />
          </div>
          <div className="mt-3 u-fontMedium">
            Enter the confirmation code sent
          </div>
          <div className="mt-3 u-u-fontNormal u-text-dark-grey">
            Four -digit confirmation code to number<span>{phoneNumber}</span> Sent
          </div>
          <div className="mt-5 position-relative">
            <Input
              type="tel"
              label="Verification code"
              dir="ltr"
              id="verificationCode"
              themeColor={themeColor}
              value={verificationCode}
              onKeyPress={handleKeyPress}
              noModal
              onChange={(value) =>
                setVerificationCode(persianToEnglishNumber(value))
              }
              className={`text-center u-fontMedium ${
                verificationCode ? "notEmpty" : null
              } d-flex align-items-center opacity-1`}
              color="secondary"
            />
          </div>
          {error && (
            <div className="u-text-red u-font-semi-small text-right my-1 mx-2">
              {error}
            </div>
          )}

          <div className="d-flex flex-column mt-4">
            <div className="u-text-dark-grey u-font-semi-small">
              Didn't get code?
            </div>
            <div className="mt-1 d-flex align-items-center justify-content-center">
              <Button
                color="secondary"
                onClick={() => resend(phoneNumber, callback)}
              >
                Code SMS
              </Button>
              <span style={{ color: themeColor }} className="mx-2">
                |
              </span>
              <Button
                color="secondary"
                onClick={() => _sendViaPhone(phoneNumber)}
              >
                Send code by call
              </Button>
            </div>
            <Button
              color="secondary"
              className="mt-1"
              onClick={() => router.back()}
              noShadow
              onKeyDown={(e) => handleKeyDown(e, () => router.back())}
            >
              <span className="u-fontNormal">Correction of the mobile number</span>
            </Button>
            {/* <div className="mt-1" onClick={correctEnteredPhoneNumber}><a className="u-fontNormal u-text-primary-light-blue">Correction of the mobile number</a></div> */}
          </div>
        </div>
        <Paper className="sticky-bottom p-3 d-flex">
          <Button
            color="secondary"
            onClick={() => router.back()}
            style={{ flex: "1", height: 48 }}
            className="ml-2"
          >
            Back
          </Button>
          <Button
            id="SubmitVerificationCode"
            disabled={isLoading || error}
            color="secondary"
            style={{ flex: "2", height: 48 }}
            variant="contained"
            onClick={() => submit(phoneNumber, verificationCode)}
          >
            Confirm
          </Button>
        </Paper>
      </div>
    </Paper>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  themeColor: makeSelectBusinessThemeColor(),
});
function mapDispatchToProps(dispatch) {
  return {
    _verify: (phone, code, callback) => dispatch(verify(phone, code, callback)),
    _sendViaPhone: (phone) => dispatch(sendViaPhone(phone)),
    resend: (phone, callback) => dispatch(login(phone, true, callback)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(Verify);
