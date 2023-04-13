/* eslint-disable @next/next/no-img-element */
import React, { memo, useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";
import JourneyHeader from "components/JourneyHeader";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  makeSelectPackages,
  makeSelectBusinessCRMData,
} from "stores/global/selector";
import {
  createTransaction,
  getBusinessCRMData,
  getPackages,
  getTransaction,
  updateNewVitrinForm,
} from "stores/global/actions";
import { useRouter } from "next/router";
import { priceFormatter } from "utils/helpers/priceFormatter";
import { setSnackBarMessage } from "stores/global/actions";
import { makeSelectUser } from "stores/user/selector";
import moment from "moment";

const PaymentPage = ({
  user,
  _createTransaction,
  businessCRMData,
  _getBusinessCRMData,
  _setSnackBarMessage,
  _getTransaction,
}) => {
  const router = useRouter();
  const { amount, time } = router.query;
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [packageDate, setPackageDate] = useState({});
  const [taxAmount, setTaxAmount] = useState();
  const [subscriptionRight, setSubscriptionRight] = useState("");
  const [totalAmount, setTotalAmount] = useState();
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    if (router.query.business_slug) {
      setTimeout(() => {
        _getBusinessCRMData(router.query.business_slug);
      }, 0);
    }
  }, [router.query.business_slug]);
  useEffect(() => {
    setTimeout(() => {
      _getTransaction(router.query.tid);
    }, 0);
  }, [router.query.tid]);

  const submitDiscountCode = () => {
    if (
      code ==
      businessCRMData?.vitrin_journey_state?.discount_code_data?.discount_code
    ) {
      if (
        new Date(
          businessCRMData?.vitrin_journey_state?.discount_code_data?.expiration_date
        ).getTime() -
          new Date().getTime() >
        0
      ) {
        setDiscount(
          businessCRMData?.vitrin_journey_state?.discount_code_data?.percent
        );
        setCode(
          businessCRMData?.vitrin_journey_state?.discount_code_data
            ?.discount_code
        );
        _setSnackBarMessage("کد تخفیف شما با موفقیت اعمال شد.", "success");
      } else {
        _setSnackBarMessage("کد تخفیف مورد نظر منثضی شده است!", "fail");
      }
    } else {
      _setSnackBarMessage("کد تخفیف وارد شده معتبر نیست.", "fail");
    }
  };

  useEffect(() => {
    let date = new Date();
    if (time == "oneYear") {
      date.setFullYear(date.getFullYear() + 1);
    } else {
      date.setMonth(date.getMonth() + 3);
    }
    let day = moment(date).format("DD");
    let month = moment(date).format("MMMM");
    let year = moment(date).format("YYYY");
    setPackageDate({ day, month, year });
    setTaxAmount(
      time == "oneYear"
        ? ((amount - (2.5 * amount) / 10).toFixed(2) * 1000 * 12 * 9) / 100
        : (amount * 1000 * 3 * 9) / 100
    );
    setSubscriptionRight(
      time == "oneYear"
        ? (amount - (2.5 * amount) / 10).toFixed(2) * 1000 * 12
        : amount * 1000 * 3
    );
  }, [time, amount]);

  useEffect(() => {
    if (discount) {
      setDiscountAmount(
        ((subscriptionRight + (subscriptionRight * 9) / 100) * discount) / 100
      );
      setTaxAmount((subscriptionRight * 9) / 100);
    } else {
      setTotalAmount(subscriptionRight + taxAmount);
    }
  }, [discount, subscriptionRight, taxAmount]);

  useEffect(() => {
    const total_amount = subscriptionRight + taxAmount - discountAmount;
    setTotalAmount(total_amount);
  }, [discountAmount]);
  const upgrade = () => {
    const taxAmountWithDiscount =
      (subscriptionRight * 9) / 100 -
      (((subscriptionRight * 9) / 100) * discount) / 100;
    _createTransaction(
      {
        packages: {
          support: router.query.type,
        },
        amount: totalAmount,
        plan: {
          support: {
            type: router.query.type,
            price: totalAmount - taxAmountWithDiscount,
            initial_price: amount * (time == "oneYear" ? 12 : 3) * 1000, // total price without tax amount and discount
            monthly_price: amount * 1000, // monthly price without tax amount and discount
          },
          initialize: {
            type: "0m",
            price: 0,
            initial_price: 0,
            monthly_price: 0,
          },
          type: router.query.business_type,
        },
        duration: time == "oneYear" ? 365 : 90,
      },
      router.query.business_slug,
      businessCRMData?.has_first_login_event
    );
  };
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <JourneyHeader />
      <div
        className="flex-1 d-flex justify-content-center align-items-center px-4"
        style={{ backgroundColor: "#F6F6F7" }}
      >
        <div style={{ maxWidth: 826, width: "100%" }}>
          <p className="d-flex justify-content-start align-items-center">
            <AccountCircleIcon style={{ fontSize: 32, color: "#BDBDBD" }} />
            <span className="mr-2" style={{ fontSize: 16, fontWeight: 600 }}>
              {user?.name} عزیز، سلام
            </span>
          </p>
          <p
            className="text-center mt-5"
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            فاکتور نهایی قابل پرداخت
          </p>
          <div
            className="w-100 p-3 mt-4"
            style={{ borderRadius: 8, backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between">
              <span>مهلت اعتبار بسته</span>
              <span>
                {englishNumberToPersianNumber(packageDate.day)} -{" "}
                {packageDate.month} -{" "}
                {englishNumberToPersianNumber(packageDate.year)}
              </span>
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ marginTop: 24 }}
            >
              <span> مبلغ اشتراک ماهانه</span>
              {time == "oneYear" ? (
                <p>
                  <span className="position-relative">
                    {" "}
                    <span>{priceFormatter(amount * 1000 || 0)} تومان</span>
                    <div
                      style={{
                        width: 83,
                        backgroundColor: "#000",
                        position: "absolute",
                        bottom: 0,
                        top: "55%",
                        transform: "rotate(-15deg)",
                        height: 1,
                      }}
                    ></div>
                  </span>
                  <span className="mr-3">
                    {priceFormatter(
                      (amount - (2.5 * amount) / 10).toFixed(2) * 1000
                    )}{" "}
                    تومان
                  </span>{" "}
                </p>
              ) : (
                <p>{priceFormatter(amount * 1000 || 0)} تومان</p>
              )}{" "}
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ marginTop: 24 }}
            >
              <span>
                مجموع حق اشتراک ({time == "oneYear" ? "یکساله" : "سه‌ماهه"})
              </span>
              <span>{priceFormatter(subscriptionRight)} تومان</span>
            </div>

            <div
              className="d-flex justify-content-between"
              style={{ margin: "24px 0" }}
            >
              <span>مالیات بر ارزش افزوده</span>
              <span>{priceFormatter(taxAmount)} تومان</span>
            </div>

            <hr className="hr-normal" />
            {discount ? (
              <>
                <div className="d-flex justify-content-between p-3">
                  <span>مبلغ کل</span>
                  <p>
                    {" "}
                    <span className="direction-ltr">
                      {priceFormatter(subscriptionRight + taxAmount)}
                    </span>{" "}
                    <span>تومان</span>{" "}
                  </p>
                </div>
                <div
                  className="d-flex justify-content-between p-3"
                  style={{ color: "#00A47C" }}
                >
                  <span>کد تخفیف</span>
                  <p>
                    {" "}
                    <span className="direction-ltr">
                      {priceFormatter(discountAmount)}
                      {"-"}
                    </span>{" "}
                    <span>تومان</span>{" "}
                  </p>
                </div>
              </>
            ) : null}
            <div
              className="d-flex justify-content-between p-3"
              style={{
                marginTop: discount ? 0 : 24,
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              <span>مبلغ قابل پرداخت</span>
              <span>{priceFormatter(totalAmount)} تومان</span>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginTop: 24, fontSize: 14, lineHeight: "24px" }}
            >
              <p style={{ fontWeight: 500 }}>کد تخفیف</p>
              <div
                className="mr-md-5 d-flex py-2 px-4 radius-8"
                style={{
                  backgroundColor: "#FAFBFB",
                  width: 400,
                  border: "1px solid #E4E6E7",
                }}
              >
                <input
                  className="flex-1"
                  placeholder="افزودن کد تخفیف"
                  disabled={discount}
                  value={code ? englishNumberToPersianNumber(code) : ""}
                  onChange={(event) =>
                    setCode(persianToEnglishNumber(event.target.value))
                  }
                />
                {discount ? (
                  <button
                    className="radius-8 py-2 px-4"
                    style={{ border: "1px solid #0050FF", color: "#0050FF" }}
                    onClick={() => {
                      setDiscount(null);
                      setCode("");
                    }}
                  >
                    حذف کد
                  </button>
                ) : (
                  <button
                    className="radius-8 py-2 px-4"
                    style={{ border: "1px solid #0050FF", color: "#0050FF" }}
                    onClick={submitDiscountCode}
                    disabled={discount}
                  >
                    اعمال
                  </button>
                )}
              </div>
            </div>
            <button
              className="w-100 mb-3"
              style={{
                height: 44,
                color: "#fff",
                backgroundColor: "#0050FF",
                borderRadius: 16,
                marginTop: 24,
                fontWeight: 500,
              }}
              onClick={upgrade}
            >
              پرداخت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  packages: makeSelectPackages(),
  businessCRMData: makeSelectBusinessCRMData(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getBusinessCRMData: (slug) => dispatch(getBusinessCRMData(slug)),
    _getPackages: (id) => dispatch(getPackages(id)),
    _createTransaction: (data, slug, has_first_login_event) =>
      dispatch(createTransaction(data, slug, has_first_login_event)),
    _getTransaction: (id) => dispatch(getTransaction(id)),
    _updateForm: (data) => dispatch(updateNewVitrinForm(data)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PaymentPage);
