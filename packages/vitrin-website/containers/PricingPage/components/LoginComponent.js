import React, { memo, useState, useEffect } from "react";
import Input from "components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  login,
  verify,
  sendNewVerificationCode,
  sendNewVerificationCodeByCall,
} from "stores/user/actions";
import { useTimer } from "react-timer-hook";
import uniqueId from "lodash/uniqueId";
import { makeSelectLoading } from "stores/global/selector";
import { updateNewVitrinForm } from "stores/global/actions";
import { makeSelectVerifyCodeError } from "stores/user/selector";
import { createVitrin } from "stores/global/actions";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { phoneValidator } from "@saas/utils/helpers/phoneValidator";

const confirmDefaultValues = [
  { id: uniqueId(), value: "" },
  { id: uniqueId(), value: "" },
  { id: uniqueId(), value: "" },
  { id: uniqueId(), value: "" },
];

const LoginComponent = ({
  _login,
  _updateVitrin,
  verifyCodeError,
  _sendNewVerificationCodeByCall,
  _sendNewVerificationCode,
  _createVitrin,
  _verify,
  onClose,
  isLoading,
  selectedOpp,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [confirmCode, setConfirmCode] = useState(confirmDefaultValues);
  const router = useRouter();
  const desktopMatches = useMediaQuery("(min-width:1200px)");
  const phone = router.query.phone;

  useEffect(() => {
    if (phoneError && mobileNumber) {
      setPhoneError(phoneVaildator(mobileNumber).error);
    } else {
      setPhoneError("");
    }
  }, [mobileNumber]);

  useEffect(() => {
    let tempCodes = confirmCode.filter((item) => !!item.value);
    if (tempCodes.length == 4) submitCode();
  }, [confirmCode]);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);

  const { seconds, minutes, restart, isRunning } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  const submit = (e) => {
    e.preventDefault();
    if (phoneValidator(mobileNumber).valid) {
      _login(mobileNumber, router.query.url);
      _updateVitrin({ mobileNumber });
      restart(time);
      setConfirmCode([...confirmDefaultValues]);
    } else {
      setPhoneError(phoneValidator(mobileNumber).error);
    }
  };

  const submitCode = () => {
    const confirmCodeValue = persianToEnglishNumber(
      confirmCode.map((item) => item.value).join("")
    );
    _verify(phone, confirmCodeValue, () => {
      localStorage.setItem("Login", true);
      _createVitrin({ preferred_services: selectedOpp });
      onClose();
    });
  };

  return (
    <>
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
      {!phone ? (
        <>
          <p style={{ marginTop: desktopMatches ? 250 : 0 }}>
            برای ثبت اطلاعات و دریافت اطلاعات بیشتر شماره تلفن خود را وارد کنید.
          </p>
          <div style={{ marginTop: desktopMatches ? 27 : 7 }}>
            <Input
              type="tel"
              dir="rtl"
              id="phoneNumber"
              noModal
              label="شماره همراه"
              error={phoneError}
              disabled={phone}
              value={
                mobileNumber ? englishNumberToPersianNumber(mobileNumber) : ""
              }
              style={{ paddingLeft: 0 }}
              onChange={(value) =>
                setMobileNumber(persianToEnglishNumber(value))
              }
              className={` mt-4 p u-fontMedium ${
                mobileNumber ? "notEmpty" : null
              } d-flex align-items-center opacity-1`}
              inputProps={{
                maxLength: 11,
                style: { paddingLeft: 0 },
              }}
              placeholder={"مثال : ۰۹۱۲۱۲۳۴۵۶۷"}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    style={{
                      position: "absolute",
                      left: 10,
                      backgroundColor: "#F6F6F7",
                    }}
                    position="start"
                  >
                    <PhoneIphoneOutlinedIcon style={{ color: "gray" }} />
                  </InputAdornment>
                ),
              }}
              helperText={
                !phoneError
                  ? "با وارد کردن شماره موبایل، کد تاییدی برای شما ارسال می‌شود."
                  : phoneError
              }
            />
          </div>
        </>
      ) : (
        <div style={{ height: desktopMatches ? "auto" : 350 }}>
          <form
            className="  d-flex flex-column w-100 .login-modal"
            style={{
              marginTop: desktopMatches ? 250 : 115,
            }}
          >
            <div className="w-100 d-flex justify-content-center flex-row-reverse login-modal">
              {confirmCode.map((item, index) => {
                let tempValue = confirmCode.find((code) => code.id === item.id);
                let isLast = index + 1 === confirmCode.length;
                return (
                  <div
                    key={item.id}
                    className="d-flex justify-content-center align-items-center confirm-code"
                    style={{
                      border: !phone
                        ? "solid 1px #00000030"
                        : "solid 1px #0050FF",
                    }}
                  >
                    <input
                      type="tel"
                      id={`code-${index}`}
                      autoFocus={index === 0}
                      disabled={!phone}
                      value={
                        tempValue.value
                          ? englishNumberToPersianNumber(tempValue.value)
                          : ""
                      }
                      onChange={(e) => {
                        setConfirmCode((codes) =>
                          codes.map((code) => {
                            if (code.id === item.id)
                              return { ...code, value: e.target.value };
                            return code;
                          })
                        );
                        if (!isLast && !!e.target.value) {
                          let nextInput = document.getElementById(
                            `code-${index + 1}`
                          );
                          nextInput.focus();
                        }
                      }}
                      maxLength={1}
                      className="text-center w-100"
                    />
                  </div>
                );
              })}
            </div>
          </form>
          <p
            className="text-center"
            style={{
              marginTop: 24,
              color: !phone ? "#00000030" : "#00000080",
              fontSize: desktopMatches ? 14 : 11,
            }}
          >
            {verifyCodeError ? (
              <span style={{ color: "#D32F2F" }}>
                {verifyCodeError?.message}
              </span>
            ) : (
              `کد ارسال شده برای
          ${englishNumberToPersianNumber(phone) || "XXXXXXXXXXX"} را وارد کنید.`
            )}
          </p>
          <div
            className="w-100 d-flex justify-content-between"
            style={{
              marginTop: 32,
              pointerEvents: !phone ? "none" : "auto",
              color: !phone ? "#00000030" : "#0050FF",
              padding: desktopMatches ? "0 60px" : "0 40px",
              fontSize: desktopMatches ? 14 : 11,
            }}
          >
            <button
              onClick={() => {
                let query = router.query;
                delete query.phone;
                router.push({
                  pathname: router.pathname,
                  query,
                });
              }}
            >
              تغییر شماره موبایل
            </button>
            <button
              onClick={() => _sendNewVerificationCodeByCall(mobileNumber)}
            >
              دریافت کد با تماس
            </button>
          </div>
          <div className="d-md-none">
            <Button
              style={{
                width: "100%",
                height: 42,
                boxShadow: "none",
                marginTop: 39,
                fontSize: desktopMatches ? 14 : 11,
                borderRadius: 8,
              }}
              disabled={minutes !== 0 || seconds !== 0}
              type="button"
              variant="text"
              color="primary"
              onClick={() => {
                _sendNewVerificationCode(mobileNumber);
                restart(time);
                setConfirmCode([...confirmDefaultValues]);
              }}
            >
              دریافت مجدد کد{" "}
              {isRunning && (
                <span className="mr-1">
                  ({englishNumberToPersianNumber(minutes)}:
                  {englishNumberToPersianNumber(seconds)})
                </span>
              )}
            </Button>
          </div>
        </div>
      )}

      <Button
        className="w-100 mt-4 mt-xl-auto"
        variant="contained"
        color="primary"
        size="large"
        style={{ borderRadius: 8 }}
        onClick={phone ? submitCode : submit}
        disabled={isLoading}
      >
        شروع کسب درآمد با ویترین
      </Button>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  verifyCodeError: makeSelectVerifyCodeError(),
});

function mapDispatchToProps(dispatch) {
  return {
    _login: (phone, url) => dispatch(login(phone, url)),
    _updateVitrin: (data) => dispatch(updateNewVitrinForm(data)),
    _verify: (phone, code, callback) => dispatch(verify(phone, code, callback)),
    _sendNewVerificationCode: (phone) =>
      dispatch(sendNewVerificationCode(phone)),
    _sendNewVerificationCodeByCall: (phone) =>
      dispatch(sendNewVerificationCodeByCall(phone)),
    _createVitrin: (data) => dispatch(createVitrin(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(LoginComponent);
