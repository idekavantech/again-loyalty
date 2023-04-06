/* eslint-disable @next/next/no-img-element */
import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";
import { phoneValidator } from "utils/helpers/phoneValidator";
import { removeParamsFromUrl } from "utils/helpers/removeParamsFromUrl";
import { useRouter } from "next/router";
import {
  login,
  sendNewVerificationCode,
  sendNewVerificationCodeByCall,
  verify,
} from "stores/user/actions";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import {
  makeSelectLoading,
  makeSelectVitrinFormInformation,
} from "stores/global/selector";
import { updateNewVitrinForm } from "stores/global/actions";
import Image from "next/image";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import uniqueId from "lodash/uniqueId";
import { useTimer } from "react-timer-hook";
import {
  makeSelectIsAuthenticated,
  makeSelectVerifyCodeError,
} from "stores/user/selector";
import Link from "next/link";
import LoadingIndicator from "../../components/LoadingIndicator";

const Input = dynamic(() => import("components/Input"), { ssr: false });

const confirmDefaultValues = [
  { id: uniqueId(), value: "" },
  { id: uniqueId(), value: "" },
  { id: uniqueId(), value: "" },
  { id: uniqueId(), value: "" },
];
const LoginPage = ({
  _login,
  updateVitrin,
  _verify,
  _sendNewVerificationCode,
  _sendNewVerificationCodeByCall,
  verifyCodeError,
  isAuthenticated,
  isLoadingUserInfo,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmCode, setConfirmCode] = useState(confirmDefaultValues);
  const [phoneError, setPhoneError] = useState("");
  const router = useRouter();
  const phone = router.query.phone;

  // time to timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);
  // config timer
  const { seconds, minutes, restart, isRunning } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    if (isAuthenticated) router.push(router.query?.url || "/profile");
  }, [isAuthenticated]);

  function loginRef(element) {
    if (element) {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }

  const submit = (e) => {
    e.preventDefault();
    if (phoneValidator(mobileNumber).valid) {
      _login(mobileNumber, router.query.url);
      updateVitrin({ mobileNumber });
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

    const callback = () => {
      if (router.query.url) {
        let [url, pathname] = router.query.url.split("?");
        function getParams(pathname) {
          let params = {};
          if (pathname) {
            new URLSearchParams(`?${pathname}`)?.forEach(function (val, key) {
              params[key] = val;
            });
          }
          return params;
        }
        router.push({
          pathname: url,
          query: getParams(pathname),
        });
      } else {
        router.push({
          pathname: "/profile",
        });
      }
    };
    _verify(phone, confirmCodeValue, callback);
  };

  useEffect(() => {
    if (phone) {
      setMobileNumber(phone);
    }
  }, [phone]);

  useEffect(() => {
    if (phoneError && mobileNumber) {
      setPhoneError(phoneValidator(mobileNumber).error);
    } else {
      setPhoneError("");
    }
  }, [mobileNumber]);

  useEffect(() => {
    let tempCodes = confirmCode.filter((item) => !!item.value);
    if (tempCodes.length == 4) submitCode();
  }, [confirmCode]);
  return (
    <div
      ref={loginRef}
      className="login d-flex flex-column flex-md-row justify-content-md-center align-items-md-center"
    >
      {/* Logo (mobile) */}
      <div className="d-flex align-items-center d-md-none py-4 px-2 text-center">
        <Link className="d-inline-block px-2" href={"/"}>
          <Image
            src={"/images/arrow-right-blue.svg"}
            width="8px"
            height="12px"
            priority
            alt="back to index"
          />
        </Link>
        <div style={{ flexGrow: 1 }}>
          <Image
            height={21}
            width={64}
            src={"/images/vitrin-logo-blue.svg"}
            alt="logo"
            priority
          />
        </div>
      </div>
      {isLoadingUserInfo || (isAuthenticated && !phone) ? (
        <LoadingIndicator />
      ) : !phone ? (
        <form
          onSubmit={submit}
          className="login-form d-flex flex-column justify-content-between justify-content-md-start"
        >
          {/* Title and Logo (Desktop) */}
          <div>
            <div className="d-none d-md-flex align-items-center py-4 px-2 text-center">
              <Link className="d-inline-block px-2" href={"/"}>
                <Image
                  src={"/images/arrow-right-desktop-blue.svg"}
                  width="12px"
                  height="20px"
                  priority
                  alt="back to index"
                />
              </Link>
              <div style={{ flexGrow: 1 }}>
                <Image
                  height={36}
                  width={108}
                  src={"/images/logo-desktop-blue.svg"}
                  alt="logo"
                  priority
                />
              </div>
            </div>
            <h1 className="text-center mb-4">ورود به حساب کاربری</h1>
          </div>
          {/* Phone field */}
          <div>
            <Input
              type="tel"
              dir="rtl"
              id="phoneNumber"
              autoFocus
              noModal
              label="شماره همراه"
              error={phoneError}
              value={
                mobileNumber ? englishNumberToPersianNumber(mobileNumber) : ""
              }
              onChange={(value) =>
                setMobileNumber(persianToEnglishNumber(value))
              }
              className={`text-center mt-4 p u-fontMedium ${
                mobileNumber ? "notEmpty" : null
              } d-flex align-items-center opacity-1`}
              inputProps={{ maxLength: 11 }}
              placeholder={"مثال : ۰۹۱۲۱۲۳۴۵۶۷"}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    style={{ position: "absolute", left: 10 }}
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
          {/* Button */}
          <div className="login-btn mt-md-auto">
            <Button
              type="submit"
              disabled={!mobileNumber || isLoadingUserInfo}
              color="primary"
              variant="contained"
              fullWidth
            >
              ادامه
            </Button>
          </div>
          {router.query.type ? (
            <div className="w-100 d-flex justify-content-center no-account">
              <p>حساب کاربری ندارید؟ </p>
              <Link href="/cr~templates" className="mr-4 register">
                ثبت نام کنید
              </Link>
            </div>
          ) : null}
        </form>
      ) : (
        <form onSubmit={submitCode} className="login-form d-flex flex-column">
          {/* Title and Logo (Desktop) */}
          <div>
            <div className="d-none d-md-flex align-items-center py-4 px-2 text-center">
              <Link className="d-inline-block px-2" href={"/"}>
                <Image
                  src={"/images/arrow-right-desktop-blue.svg"}
                  width="12px"
                  height="20px"
                  priority
                  alt="back to index"
                />
              </Link>
              <div style={{ flexGrow: 1 }}>
                <Image
                  height={36}
                  width={108}
                  src={"/images/logo-desktop-blue.svg"}
                  alt="logo"
                  priority
                />
              </div>
            </div>
            <h1 className="text-center mb-4">ورود به حساب کاربری</h1>
          </div>
          {/* Confirm code field */}
          <div className="confirm d-flex justify-content-center flex-row-reverse">
            {confirmCode.map((item, index) => {
              let tempValue = confirmCode.find((code) => code.id === item.id);
              let isLast = index + 1 === confirmCode.length;
              return (
                <div
                  key={item.id}
                  className="confirm-field"
                  style={{
                    borderColor: verifyCodeError
                      ? "#D32F2F"
                      : isAuthenticated
                      ? "#4CAF50"
                      : "rgba(0, 0, 0, 0.23)",
                  }}
                >
                  <input
                    type="tel"
                    id={`code-${index}`}
                    autoFocus={index === 0}
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
                    className="text-center"
                  />
                </div>
              );
            })}
          </div>
          {/* phone info and error message */}
          <div className="phone-info text-center">
            {verifyCodeError ? (
              <span style={{ color: "#D32F2F" }}>
                {verifyCodeError?.message}
              </span>
            ) : isAuthenticated ? (
              <>
                <p style={{ color: "#4CAF50" }}>ورود موفقیت‌آمیز بود.</p>
                <p style={{ color: "#4CAF50" }}>
                  شما در حال انتقال به پنل مدیریت خود هستید.
                </p>
              </>
            ) : (
              `کد ارسال شده برای ${englishNumberToPersianNumber(
                mobileNumber
              )} را وارد کنید.`
            )}
          </div>
          {/* links to back to prev step and get code with call */}
          <div className="links d-flex justify-content-around">
            <a
              onClick={() => {
                phone ? removeParamsFromUrl() : router.back();
              }}
            >
              تغییر شماره موبایل
            </a>
            <a onClick={() => _sendNewVerificationCodeByCall(mobileNumber)}>
              دریافت کد با تماس
            </a>
          </div>
          {/* links to resend code */}
          <div className="d-flex justify-content-center">
            <Button
              variant="outlined"
              color="primary"
              disabled={minutes !== 0 || seconds !== 0}
              type="button"
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
        </form>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  isLoadingUserInfo: makeSelectLoading("getUserInfo"),
  phone: makeSelectVitrinFormInformation("phone"),
  verifyCodeError: makeSelectVerifyCodeError(),
  isAuthenticated: makeSelectIsAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    _login: (phone, url) => dispatch(login(phone, url)),
    updateVitrin: (data) => dispatch(updateNewVitrinForm(data)),
    _verify: (phone, code, callback) => dispatch(verify(phone, code, callback)),
    _sendNewVerificationCode: (phone) =>
      dispatch(sendNewVerificationCode(phone)),
    _sendNewVerificationCodeByCall: (phone) =>
      dispatch(sendNewVerificationCodeByCall(phone)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(LoginPage);
