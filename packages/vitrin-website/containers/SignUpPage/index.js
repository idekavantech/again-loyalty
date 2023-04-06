import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Stepper from "components/Stepper";
import { memo, useState } from "react";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import dynamic from "next/dynamic";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import Link from "next/link";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import { makeSelectLoading } from "stores/global/selector";
import { login } from "stores/user/actions";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";
import { phoneValidator } from "utils/helpers/phoneValidator";
import { updateNewVitrinForm } from "stores/global/actions";
import { useRouter } from "next/router";

const Input = dynamic(() => import("components/Input"), { ssr: false });
const SignUpPage = ({ _login, updateVitrin, isLoading }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const router = useRouter();
  const submit = (e) => {
    e.preventDefault();
    if (phoneValidator(phoneNumber).valid) {
      _login(phoneNumber, router.query.url, "/cr~signup-verify");
      updateVitrin({ phoneNumber });
    } else {
      setPhoneError(phoneValidator(phoneNumber).error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submit(event);
    }
  };

  return (
    <div className="login d-flex flex-column flex-md-row justify-content-md-center align-items-md-center">
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
      {/* Logo (mobile) */}
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
        onSubmit={submit}
        className="login-form d-flex flex-column justify-content-between justify-content-md-start"
      >
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
          <Stepper step={2} />
        </div>

        <div>
          <Input
            type="tel"
            dir="rtl"
            id="phoneNumber"
            autoFocus
            noModal
            label="شماره همراه"
            error={phoneError}
            value={phoneNumber ? englishNumberToPersianNumber(phoneNumber) : ""}
            onChange={(value) => setPhoneNumber(persianToEnglishNumber(value))}
            className={`text-center mt-4 p u-fontMedium ${
              phoneNumber ? "notEmpty" : null
            } d-flex align-items-center opacity-1`}
            inputProps={{ maxLength: 11 }}
            placeholder={"مثال : ۰۹۱۲۱۲۳۴۵۶۷"}
            onKeyPress={handleKeyPress}
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
        <div className="login-btn mt-md-auto">
          <Button
            type="submit"
            disabled={!phoneNumber || isLoading}
            color="primary"
            variant="contained"
            fullWidth
          >
            ادامه
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _login: (phone, url, pathname) => dispatch(login(phone, url, pathname)),
    updateVitrin: (data) => dispatch(updateNewVitrinForm(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SignUpPage);
