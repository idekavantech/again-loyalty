import React, { memo, useState } from "react";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Button from "@material-ui/core/Button";
import { baseColors, border, icon, surface, text } from "@saas/utils/colors";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  createCashbackTransaction,
  validateCashbackCode,
} from "@saas/stores/plugins/actions";
import { setLoginCallBack } from "@saas/stores/user/actions";
import { createStructuredSelector } from "reselect";
import { makeSelectIsAuthenticated } from "@saas/stores/user/selector";
import { useRouter } from "next/router";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ForwardIcon from "@material-ui/icons/Forward";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import Divider from "@material-ui/core/Divider";
import { CDN_BASE_URL } from "@saas/utils/api";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { wordifyTomans } from "@saas/utils/wordify";
import CashbackCodeModal from "containers/Pages/PayContainers/OnlinePaymentContainer/CashbackCodeModal";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { CASH_BACK_PLUGIN } from "@saas/utils/constants/plugins";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { makeSelectLoading } from "@saas/stores/global/selectors";

const buttons = [
  { number: "1", alphabet: ["Q", "Z"] },
  { number: "2", alphabet: ["A", "B", "C"] },
  { number: "3", alphabet: ["D", "E", "F"] },
  { number: "4", alphabet: ["G", "H", "I"] },
  { number: "5", alphabet: ["J", "K", "L"] },
  { number: "6", alphabet: ["M", "N", "O"] },
  { number: "7", alphabet: ["P", "R", "S"] },
  { number: "8", alphabet: ["T", "U", "V"] },
  { number: "9", alphabet: ["W", "X", "Y"] },
  { number: "00" },
  { number: "0" },
  { number: "000" },
];
function PayContainer({
  _createTransaction,
  _setLoginCallBack,
  isLoggedIn,
  business: {
    title: businessTitle,
    icon_image_url: businessImage,
    theme_config: { enamad_config },
  },
  cashBackPluginData,
  _validateCashbackCode,
  loading,
}) {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [code, setCode] = useState("");
  const [modal, setModal] = useState(false);
  const theme = useTheme();
  const discount_percent = cashBackPluginData?.data?.sharing_data?.value;
  return (
    <div
      className="position-relative h-100 d-flex flex-1 align-items-center justify-content-start flex-column w-100"
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{
          maxWidth: 410,
          background: router.query.amount
            ? "white"
            : theme.palette.secondary.main,
          border: `1px solid ${border.subdued}`,
        }}
        className="d-flex flex-1 flex-column justify-content-between w-100 h-100 position-relative px-3"
      >
        <IconButton
          className="d-flex align-items-center justify-content-center my-3 position-relative z-index-2"
          onClick={router.back}
          style={{ height: 35, width: 35 }}
        >
          <ArrowForwardIosIcon
            style={{ color: router.query.amount ? icon.default : "white" }}
            fontSize="small"
          />
        </IconButton>
        {!router.query.amount ? (
          <>
            <img
              alt=""
              src={`${CDN_BASE_URL}cashback-pattern.png`}
              className="position-absolute u-top-0 w-100 right-0 left-0 m-auto"
            />
            <Paper
              className="d-flex flex-column justify-content-between"
              style={{ flex: 1, marginTop: 30, borderRadius: "16px 16px 0 0" }}
            >
              <div>
                <div style={{ borderRadius: 24 }} className="trapezoid w-100" />
                <div
                  style={{ maxWidth: "85%", height: 18, marginTop: -16 }}
                  className="overflow-hidden d-flex mx-auto align-items-center justify-content-center"
                >
                  {[...Array(28).keys()].map((i) => (
                    <div className="triangle-up" key={i} />
                  ))}
                </div>
                <div
                  className="position-relative mx-auto my-4 text-center"
                  style={{
                    width: 330,
                    height: 164,
                    maxWidth: "calc(100% - 40px)",
                  }}
                >
                  <div
                    className="u-border-radius-8 w-100 h-100 position-absolute u-top-0 left-0 right-0 m-auto"
                    style={{
                      boxShadow: "inset 0px 0px 4px rgba(0, 0, 0, 0.05)",
                      background: surface.subdued,
                    }}
                  >
                    <img alt="" src={`${CDN_BASE_URL}cashback_pattern.svg`} />
                  </div>
                  <div className="z-index-2 position-relative">
                    <img
                      alt=""
                      style={{ width: 40, height: 40 }}
                      className="u-border-radius-50-percent object-fit-contain mt-5"
                      src={businessImage}
                    />
                    <div
                      style={{ color: text.subdued }}
                      className="mt-2 u-fontSmall"
                    >
                      {businessTitle}
                    </div>
                    <div className="mt-2 pt-3 pb-1 text-center u-fontSemiLarge u-fontWeightBold">
                      {amount
                        ? priceFormatter(amount)
                        : "لطفا مبلغ را وارد کنید."}
                    </div>
                    {amount ? (
                      <div className="u-fontNormal">
                        {wordifyTomans(amount)}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap direction-ltr align-items-center justify-content-center px-4">
                <div className="d-flex flex-wrap col-9 px-0 align-items-center justify-content-center">
                  {buttons.map(({ number, alphabet }) => (
                    <div
                      className="d-flex p-1 justify-content-center col-4"
                      key={number}
                    >
                      <Button
                        fullWidth
                        variant="outlined"
                        style={{
                          height: 48,
                          width: 72,
                          border: `1px solid rgba(15, 25, 125, 0.08)`,
                        }}
                        className="p-1"
                        onClick={() => {
                          if (amount < 2 * 1000 * 1000 * 1000)
                            setAmount(parseInt(amount + number));
                        }}
                      >
                        <span className="u-fontSemiLarge">{number}</span>
                        <span
                          style={{ color: icon.default }}
                          className="ml-1 u-fontVerySmall u-fontWeightNormal"
                        >
                          {alphabet?.map((alphabet) => alphabet)}
                        </span>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-wrap col-3 px-0 align-items-center justify-content-center">
                  <div className="p-1">
                    <Button
                      fullWidth
                      variant="outlined"
                      style={{
                        height: 48,
                        width: 56,
                        border: `1px solid rgba(216, 44, 13, 0.2)`,
                        color: baseColors.critical,
                      }}
                      className="p-1"
                      onClick={() => setAmount(0)}
                    >
                      <CloseRoundedIcon />
                    </Button>
                  </div>
                  <div className="p-1">
                    <Button
                      fullWidth
                      variant="outlined"
                      style={{
                        height: 48,
                        width: 56,
                        border: `1px solid rgba(255, 196, 83, 0.2)`,
                        color: baseColors.warning,
                      }}
                      className="p-1"
                      onClick={() =>
                        setAmount(
                          parseInt(
                            amount
                              .toString()
                              .slice(0, amount.toString().length - 1)
                          ) || 0
                        )
                      }
                    >
                      <ForwardIcon style={{ transform: "rotate(180deg)" }} />
                    </Button>
                  </div>
                  <div className="p-1">
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      style={{
                        height: 106,
                        width: 56,
                        color: "white",
                        backgroundColor: baseColors.success,
                        boxShadow: "none",
                      }}
                      className="px-1 py-2 d-flex align-items-end"
                      onClick={() => {
                        if (amount)
                          router.push({
                            pathname: "/pay",
                            query: { amount },
                          });
                      }}
                    >
                      OK
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Divider className="mt-5" />
                <div className="d-flex align-items-center justify-content-center py-4">
                  <img
                    alt=""
                    className="mx-3"
                    style={{ width: 42, height: 13 }}
                    src={`${CDN_BASE_URL}zibal.png`}
                  />
                  {enamad_config ? (
                    <div
                      className="mx-3"
                      style={{ width: 24, height: 22 }}
                      dangerouslySetInnerHTML={{
                        __html: `${enamad_config}`,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </Paper>
          </>
        ) : (
          <Paper
            style={{
              height: 550,
              borderRadius: "16px 16px 0 0",
              border: "none",
            }}
            className="w-100 text-center pt-5 px-3 pb-3 d-flex flex-column"
          >
            <div className="flex-1">
              <div style={{ color: text.disabled }} className="u-fontNormal">
                مبلغ خرید شما
              </div>
              <div className="d-flex align-items-center mt-2 mb-5 w-100 justify-content-center">
                <span
                  className="u-fontWeightBold ml-1"
                  style={{ fontSize: 35 }}
                >
                  {priceFormatter(router.query.amount)}
                </span>
                <span style={{ fontSize: 22 }}>تومان</span>
              </div>
              <Divider className="my-4" />
              <div className="d-flex u-fontNormal align-items-center justify-content-between">
                <div>مبلغ کارمزد</div>
                <div>
                  {priceFormatter(Math.min(router.query.amount * 0.005, 4000))}{" "}
                  تومان{" "}
                </div>
              </div>
              <Divider className="my-4" />
              <div className="d-flex u-fontNormal align-items-center justify-content-between">
                <div>مبلغ نهایی قابل پرداخت</div>
                <div>
                  {priceFormatter(
                    Math.min(
                      parseInt(router.query.amount) +
                        router.query.amount * 0.005,
                      parseInt(router.query.amount) + 4000
                    )
                  )}{" "}
                  تومان{" "}
                </div>
              </div>
              <Divider style={{ height: 2 }} className="my-4" />
              <div className="text-right">
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="">کد پرداخت دارید؟</div>
                  {!code ? (
                    <Button
                      style={{ borderColor: border.subdued }}
                      variant="outlined"
                      color="secondary"
                      onClick={() => setModal(true)}
                    >
                      وارد کردن کد
                    </Button>
                  ) : null}
                </div>
                {code ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <span
                      style={{ color: baseColors.success }}
                      className="u-fontNormal"
                    >
                      {code} اعمال شد.{" "}
                    </span>
                    <Button color="secondary" onClick={() => setCode("")}>
                      <DeleteRoundedIcon
                        style={{ fontSize: 16 }}
                        color="secondary"
                        className="mx-1"
                      />
                      <span className="u-fontWeightNormal">حذف کد</span>
                    </Button>
                  </div>
                ) : null}
                {cashBackPluginData?.data && code ? (
                  <div
                    style={{ color: text.subdued }}
                    className="u-font-semi-small mt-2"
                  >
                    {englishNumberToPersianNumber(discount_percent)}٪ مبلغ خرید
                    معادل (
                    {priceFormatter(
                      (router.query.amount * discount_percent) / 100
                    )}{" "}
                    تومان)، پس از پرداخت به کیف پول‌ شما در بهترینو بر می‌گردد.
                  </div>
                ) : null}
              </div>
            </div>
            <Button
              onClick={() => {
                if (isLoggedIn) _createTransaction(router.query.amount, code);
                else {
                  _setLoginCallBack(() => {
                    _createTransaction(router.query.amount, code);
                  });
                  router.push(`/login?url=${router.asPath}`);
                }
              }}
              variant="contained"
              color="secondary"
              fullWidth
            >
              تایید و پرداخت
            </Button>
          </Paper>
        )}
      </div>
      <CashbackCodeModal
        code={code}
        setCode={setCode}
        open={modal}
        loading={loading}
        onClose={() => setModal(false)}
        _validateCashbackCode={(code, callback) => {
          if (isLoggedIn) _validateCashbackCode(code, callback);
          else {
            _setLoginCallBack(() => {
              _validateCashbackCode(code, callback);
            });
            router.push(`/login?url=${router.asPath}`);
          }
        }}
      />
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsAuthenticated(),
  business: makeSelectBusiness(),
  cashBackPluginData: makeSelectPlugin(CASH_BACK_PLUGIN),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _createTransaction: (amount, code) =>
      dispatch(createCashbackTransaction(amount, code)),
    _setLoginCallBack: (data) => dispatch(setLoginCallBack(data)),
    _validateCashbackCode: (code, callback) =>
      dispatch(validateCashbackCode(code, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PayContainer);
