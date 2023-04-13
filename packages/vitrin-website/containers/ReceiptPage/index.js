import { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import domtoimage from "dom-to-image";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { getTransaction, getBusiness } from "stores/global/actions";
import { makeSelectTransaction } from "stores/global/selector";
import CircularProgress from "@material-ui/core/CircularProgress";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { makeSelectUser } from "stores/user/selector";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { priceFormatter } from "utils/helpers/priceFormatter";
import moment from "moment";
import { makeSelectBusiness } from "../../stores/global/selector";
import Link from "next/link";
const packages = [
  { title: "بسته پایه", type: "basic" },
  { title: "بسته حرفه ای", type: "professional" },
  { title: "بسته‌استاندارد", type: "standard" },
];

const terminalOptions = [
  { id: 1, text: "زیبال", keyword: "zibal" },
  { id: 2, text: "زرین‌پال", keyword: "zarinpal" },
];
const whats_app_link =
  "https://api.whatsapp.com/send/?phone=989981741275&text&app_absent=0";
const ReceiptPage = ({
  _getTransaction,
  transaction,
  user,
  _getBusiness,
  business,
}) => {
  const [secondsCounter, setSecondsCounter] = useState(15);
  const [packageDate, setPackageDate] = useState({});
  const [currentDate, setCurrentDate] = useState({});

  const router = useRouter();
  const receiptRef = useRef();

  useEffect(() => {
    _getTransaction(router.query.t_id);
  }, [router.query.t_id]);

  const saveReceipt = () => {
    domtoimage
      .toJpeg(receiptRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "receiptTransaction.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  useEffect(() => {
    if (!transaction) {
      const timer = setTimeout(
        () => (secondsCounter ? setSecondsCounter(secondsCounter - 1) : null),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [secondsCounter]);
  useEffect(() => {
    let date = new Date();
    setCurrentDate({
      day: moment(date).format("DD"),
      month: moment(date).format("MMMM"),
      year: moment(date).format("YYYY"),
      time: moment(date).format("h:mm a"),
    });
    if (transaction?.data?.duration == 365) {
      date.setFullYear(date.getFullYear() + 1);
    } else {
      date.setMonth(date.getMonth() + 3);
    }
    let day = moment(date).format("DD");
    let month = moment(date).format("MMMM");
    let year = moment(date).format("YYYY");
    setPackageDate({ day, month, year });
    if (transaction) {
      _getBusiness(transaction?.business?.site_domain);
    }
  }, [transaction]);
  moment.loadPersian(true);

  if (transaction) {
    return (
      <div
        className="receipt-page p-5 d-flex justify-content-center align-items-center"
        style={{
          background: `linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), ${
            transaction?.status == 0 ? "#2e7d32" : "#D32F2F"
          } `,
        }}
      >
        <div className="w-100 reciept-container">
          <div className="w-100 head-receipt d-flex justify-content-end align-items-center">
            <div className=" title"> رسید پرداخت</div>
            <div>
              <button onClick={saveReceipt}>
                <Image width={32} height={32} src="/images/SaveAltFilled.svg" />
              </button>
              <button className="mr-2" onClick={() => window.print()}>
                <Image width={32} height={32} src="/images/PrintFilled.svg" />
              </button>
            </div>
          </div>
          <div
            ref={receiptRef}
            className="body-receipt p-3 mt-4"
            style={{
              border:
                transaction?.status == 0
                  ? "1px solid #2e7d32"
                  : "1px solid #D32F2F",
            }}
          >
            <div className="mb-4 d-flex align-items-center">
              <img
                width={40}
                height={40}
                src={
                  transaction?.status == 0
                    ? "/images/CreditScoreFilled.svg"
                    : "/images/CreditScoreFilledError.svg"
                }
              />
              {transaction?.status == 1 ? (
                <p className="error-title">پرداخت ناموفق </p>
              ) : (
                <p className="success-title">پرداخت موفق</p>
              )}
            </div>
            <div className="d-flex justify-content-between py-3">
              <p>نام بسته</p>
              <p>
                {
                  packages.find(
                    (pack) => pack.type == transaction.data?.plan?.support?.type
                  )?.title
                }{" "}
                {transaction?.data?.plan?.type == "intro"
                  ? "معرفی"
                  : "فروشگاهی"}{" "}
                ({transaction?.data?.duration == 365 ? "یکساله" : "سه ماهه"})
              </p>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <p>نام پرداخت کننده</p>
              <p>{user?.name}</p>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <p>مهلت اعتبار بسته </p>
              <p>
                {" "}
                {englishNumberToPersianNumber(packageDate.day)} -{" "}
                {packageDate.month} -{" "}
                {englishNumberToPersianNumber(packageDate.year)}
              </p>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <p>مبلغ پرداخت شده </p>
              <p>{priceFormatter(transaction?.amount)} تومان</p>
            </div>
            <hr className="my-3 hr-normal" />
            <div className="d-flex justify-content-between  py-3">
              <p>تاریخ و ساعت</p>
              <p>
                {" "}
                <span className="ml-2">
                  ({englishNumberToPersianNumber(currentDate.time)})
                </span>
                {englishNumberToPersianNumber(currentDate.day)} -{" "}
                {currentDate.month} -{" "}
                {englishNumberToPersianNumber(currentDate.year)}
              </p>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <p>کد پیگیری ویترین</p>
              <p>
                {englishNumberToPersianNumber(transaction?._transaction_id)}
              </p>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <p>کد پیگیری درگاه</p>
              <p>
                {englishNumberToPersianNumber(
                  transaction?.data?.request?.trackId
                )}
              </p>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <p>نام پذیرنده/ ترمینال پرداخت</p>
              <p>
                {
                  terminalOptions.find(
                    (terminal) => terminal.keyword == transaction?.gateway
                  )?.text
                }
              </p>
            </div>
            <div className="d-flex justify-content-between  py-3">
              <p>شماره کارت</p>
              <p>
                {englishNumberToPersianNumber(
                  transaction?.data?.request?.cardNumber
                )}
              </p>
            </div>
            {transaction?.status == 1 ? (
              <p className="py-3" style={{ color: "#D32F2F" }}>
                مشکلی در عملیات پرداخت رخ داده‌است. در صورتی که مبلغ از حساب شما
                کسر شده است، طی ۷۲ ساعت به حساب شما بازمی‌گردد. در غیر این صورت
                با در دست داشتن اطلاعات رسید با پشتیبانی تماس بگیرید.
              </p>
            ) : null}

            {transaction?.status == 1 ? (
              <div className="d-flex justify-content-center flex-wrap my-3 errors-button">
                <Link
                  passHref
                  href={`https://${transaction?.business?.site_domain}.vitrin.me/admin`}
                >
                  <Button
                    size="medium"
                    color="primary"
                    className=" w-md-25 m-0 py-2 radius-8 ml-md-5 mb-4 mb-md-0"
                    variant="outlined"
                  >
                    بازگشت به پنل مدیریت
                  </Button>
                </Link>
                <Link
                  passHref
                  href={`https://vitrin.me/pay?business_slug=${
                    business?.slug
                  }&business_type=${transaction?.data?.plan?.type}&amount=${
                    transaction?.data?.plan?.support?.monthly_price / 1000
                  }&time=${
                    transaction?.data?.duration == 365
                      ? "oneYear"
                      : "threeMonths"
                  }&type=${transaction.data?.plan?.support?.type}`}
                >
                  <Button
                    size="medium"
                    color="primary"
                    className="w-md-30 m-0 py-2  radius-8"
                    variant="contained"
                  >
                    بازگشت به صفحه فاکتور پرداخت{" "}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <Link
                  passHref
                  href={`https://${transaction?.business?.site_domain}.vitrin.me/admin?upgrade=true`}
                >
                  <Button
                    size="medium"
                    color="primary"
                    className="w-100 m-0 py-2 my-3 radius-8"
                    variant="contained"
                  >
                    بازگشت به پنل مدیریت
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="receipt-page p-5 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#4b525c08" }}
      >
        <div className="w-100 reciept-container ">
          <div className="head-receipt d-flex align-items-center">
            <Image
              width={40}
              height={40}
              src="/images/WarningAmberOutlined.svg"
            />
            <p className="waiting-title">لطفا منتظر بمانید</p>
          </div>
          <div
            className="body-receipt pt-3 px-3 mt-4 d-flex flex-column align-items-center"
            style={{ paddingBottom: 60 }}
          >
            <p className="waiting-title text-center">
              در حال بررسی اطلاعات پرداخت و تعیین وضعیت پرداخت
            </p>
            <CircularProgress className="mt-5 mb-2" />
            <p className="waiting-title">
              {" "}
              {englishNumberToPersianNumber(secondsCounter)}
            </p>
            <div className="position-relative waiting-image mt-5">
              <Image layout="fill" src="/images/loading-reciept-image.svg" />
            </div>
            {secondsCounter == 0 ? (
              <div className="d-flex mt-5 error-title">
                <InfoOutlinedIcon />
                <p className="mr-2">
                  در صورتی که هنوز به صفحه اعلام وضعیت پرداخت متصل نشده اید.
                  <br /> با{" "}
                  <a href={whats_app_link} target="blank">
                    <strong> پشتیبانی ویترین</strong>
                  </a>{" "}
                  در ارتباط باشید.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  transaction: makeSelectTransaction(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getTransaction: (id) => dispatch(getTransaction(id)),
    _getBusiness: (siteDomain) => dispatch(getBusiness(siteDomain)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ReceiptPage);
