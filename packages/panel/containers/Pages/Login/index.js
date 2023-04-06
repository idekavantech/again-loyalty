import React, { memo, useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { phoneValidator } from "@saas/utils/helpers/phoneValidator";

import Input from "@saas/components/Input";
import { LOCK } from "@saas/icons";
import Icon from "@saas/components/Icon";
import { login } from "@saas/stores/user/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectBusinessThemeColor } from "@saas/stores/business/selector";
import { useRouter } from "next/router";
import Head from "next/head";
import useTheme from "@material-ui/core/styles/useTheme";
import LoadingIndicator from "@saas/components/LoadingIndicator";

function Login({ _login, isLoading, themeColor }) {
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const theme = useTheme();
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);
    }, []);
    useEffect(() => {
        document.getElementById("phoneNumber").focus();
    }, []);
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            submit();
        }
    };
    useEffect(() => {
        setPhoneNumber(localStorage.getItem("phoneNumber"));
    }, [router.asPath]);

    const submit = () => {
        if (phoneValidator(phoneNumber?.toString().trim()).valid) {
            _login(phoneNumber?.toString().trim(), router.query.url);
            setError(null);
        } else {
            setError(phoneValidator(phoneNumber).error);
        }
    };
    return (
        <div className="d-flex flex-1 flex-column w-100 ">
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <Paper
                elevation={2}
                style={{ flex: 1, minHeight: "72vh" }}
                className="d-flex flex-column flex-1 my-4"
            >
                <div
                    className={`flex-1 text-center px-3 mb-5`}
                >
                    <div className="mt-5 d-flex justify-content-center align-items-center">
                        <Icon
                            icon={LOCK}
                            width={45}
                            height={79}
                            color={themeColor}
                        />
                    </div>
                    <div className="mt-5 u-text-darkest-grey u-fontMedium">
                        شماره همراه خود را وارد کنید.
                    </div>
                    <div className="mt-1 u-text-dark-grey u-fontMedium">
                        با وارد کردن شماره موبایل کد تاییدی برای شما ارسال خواهد
                        شد
                    </div>
                    <Input
                        type="tel"
                        dir="ltr"
                        id="phoneNumber"
                        value={phoneNumber}
                        noModal
                        label="شماره همراه"
                        onKeyPress={handleKeyPress}
                        themeColor={themeColor}
                        onChange={(value) =>
                            setPhoneNumber(persianToEnglishNumber(value))
                        }
                        className={`text-center mt-5 u-fontMedium mt-5 ${
                            phoneNumber ? "notEmpty" : null
                        } d-flex align-items-center opacity-1`}
                        color="secondary"
                    />
                    {error && (
                        <div
                            style={{ color: theme.palette.error.main }}
                            className="u-font-semi-small text-right my-1 mx-2"
                        >
                            {error}
                        </div>
                    )}
                </div>
                <Paper elevation={2} className="sticky-bottom d-flex p-3">
                    <Button
                        onClick={() => router.back()}
                        color="secondary"
                        style={{
                            flex: "1",
                            height: 48,
                        }}
                        className="ml-2"
                        disabled={isLoading}
                    >
                        بازگشت
                    </Button>
                    <Button
                        disabled={isLoading}
                        color="secondary"
                        style={{
                            flex: "2",
                            height: 48,
                        }}
                        variant="contained"
                        onClick={submit}
                    >
                        {isLoading ? <LoadingIndicator /> : "تایید و ادامه"}
                    </Button>
                </Paper>
            </Paper>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    isLoading: makeSelectLoading(),
    themeColor: makeSelectBusinessThemeColor(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        _login: (phone, callback) => dispatch(login(phone, null, callback)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Login);
