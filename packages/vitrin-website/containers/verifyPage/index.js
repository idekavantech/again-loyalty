import { memo, useEffect, useState } from "react";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  sendNewVerificationCode,
  sendNewVerificationCodeByCall,
  verify,
} from "stores/user/actions";
import { useRouter } from "next/router";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { useTimer } from "react-timer-hook";
import { makeSelectVerifyCodeError } from "stores/user/selector";
import Stepper from "components/Stepper";
import uniqueId from "lodash/uniqueId";
import Link from "next/link";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import { createVitrin } from "stores/global/actions";

const confirmDefaultValues = [
  { id: uniqueId(), value: "" },
  { id: uniqueId(), value: "" },
  { id: uniqueId(), value: "" },
  { id: uniqueId(), value: "" },
];
const VerifyPage = ({
  _verify,
  _sendNewVerificationCode,
  _sendNewVerificationCodeByCall,
  verifyCodeError,
  _createVitrin,
}) => {
  const [confirmCode, setConfirmCode] = useState(confirmDefaultValues);
  const router = useRouter();
  const phone = router.query.phone;

  const submitCode = () => {
    const confirmCodeValue = persianToEnglishNumber(
      confirmCode.map((item) => item.value).join("")
    );

    _verify(phone, confirmCodeValue, () =>
      _createVitrin({}, () =>
        router.push({
          pathname: "/cr~main-info",
          query: { ...router.query },
        })
      )
    );
  };

  useEffect(() => {
    const tempCodes = confirmCode.filter((item) => !!item.value);
    if (tempCodes.length == 4) submitCode();
  }, [confirmCode]);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);

  const { seconds, minutes, restart, isRunning } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="login d-flex flex-column flex-md-row justify-content-md-center align-items-md-center">
      <div className="header d-flex align-items-center d-md-none py-4 px-2 text-center">
        <button className="d-inline-block px-2" onClick={() => router.back()}>
          <Image
            src={"/images/arrow-right-blue.svg"}
            width="8px"
            height="12px"
            priority
            alt="back to index"
          />
        </button>

        <div
          style={{
            flexGrow: 1,
            position: "absolute",
            right: "50%",
            transform: "translate(50%,0%)",
          }}
        >
          <Image
            height={21}
            width={64}
            src={"/images/vitrin-logo-blue.svg"}
            alt="logo"
            priority
          />
        </div>
      </div>
      <form
        onSubmit={submitCode}
        className="login-form d-flex flex-column justify-content-between justify-content-md-start"
      >
        <div>
          <div className=" d-none d-md-flex align-items-center py-4 px-2 text-center">
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
          <Stepper step={2} />
        </div>
        <div>
          {" "}
          <div className="confirm d-flex justify-content-center flex-row-reverse">
            {confirmCode.map((item, index) => {
              const tempValue = confirmCode.find((code) => code.id === item.id);
              const isLast = index + 1 === confirmCode.length;
              return (
                <div
                  key={item.id}
                  className="confirm-field"
                  style={{
                    borderColor: verifyCodeError
                      ? "#D32F2F"
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
                        const nextInput = document.getElementById(
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
            ) : (
              `کد ارسال شده برای ${englishNumberToPersianNumber(
                phone
              )} را وارد کنید.`
            )}
          </div>
          {/* links to back to prev step and get code with call */}
          <div className="links d-flex justify-content-around">
            <a
              onClick={() => {
                router.back();
              }}
            >
              تغییر شماره موبایل
            </a>
            <a onClick={() => _sendNewVerificationCodeByCall(phone)}>
              دریافت کد با تماس
            </a>
          </div>
        </div>
        <div className="w-100 login-btn mt-md-auto">
          <Button
            variant="contained"
            color="primary"
            disabled={minutes !== 0 || seconds !== 0}
            type="button"
            className="w-100"
            onClick={() => {
              _sendNewVerificationCode(phone);
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  verifyCodeError: makeSelectVerifyCodeError(),
});

function mapDispatchToProps(dispatch) {
  return {
    _verify: (phone, code, callback) => dispatch(verify(phone, code, callback)),
    _sendNewVerificationCode: (phone) =>
      dispatch(sendNewVerificationCode(phone)),
    _sendNewVerificationCodeByCall: (phone) =>
      dispatch(sendNewVerificationCodeByCall(phone)),
    _createVitrin: (data, callback) => dispatch(createVitrin(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(VerifyPage);
