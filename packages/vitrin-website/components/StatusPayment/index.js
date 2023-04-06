import Image from "next/image";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const SuccessPayment = ({ success }) => {
  const {maxWidth768} = useResponsive()

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "93vh" }}
      >
        <div
          className="col-12 col-md-7 radius-16 p-5 "
          style={{
            boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.08)",
            color: " #202223",
            backgroundColor: "#fff",
          }}
        >
          {success ? (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Image
                width={104}
                height={104}
                src="/images/Tick Circle2.svg"
                alt="payment"
              />
              <p style={{ color: "#008060", fontSize: 20, marginTop: 24 }}>
                پرداخت با موفقیت انجام شد.
              </p>
              <p className="mt-4 font-weight-600 pb-1" style={{ fontSize: 16 }}>
                با تشکر از خرید شما
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Image
                width={104}
                height={104}
                src="/images/Close Circle.svg"
                alt="پرداخت ناموفق"
              />
              <p style={{ color: "#D72C0D", fontSize: 20, marginTop: 24 }}>
                پرداخت ناموفق
              </p>
              <p className="mt-4 font-weight-600 pb-1" style={{ fontSize: 16 }}>
                لطفا مجددا تلاش کنید.
              </p>
            </div>
          )}

          <hr className="w-100 hr-normal my-5" />
          <p
            className="py-1 w-100"
            style={{ textAlign: "right", fontSize: 20, lineHeight: "28px" }}
          >
            <span style={{ color: "#6D7175" }}>بسته خریداری شده:</span>{" "}
            <span> بسته‌ استاندارد</span>
          </p>
          <hr className="w-100 hr-normal my-5" />
          <div className="w-100 d-flex justify-content-between pt-1">
            <div className="d-flex">
              <Image
                width={24}
                height={24}
                src="/images/Tick Circle.svg"
                alt="هزینه اولیه"
              />
              <span
                className="font-weight-600 mr-2"
                style={{ color: "#6D7175", fontSize: 16 }}
              >
                هزینه اولیه
              </span>
            </div>
            <div className="font-weight-600" style={{ fontSize: 16 }}>
              ۲/۷ میلیون تومان
            </div>
          </div>
          <div className="w-100 d-flex justify-content-between mt-4">
            <div className="d-flex">
              <Image
                width={24}
                height={24}
                src="/images/Tick Circle.svg"
                alt="هزینه ماهیانه"
              />
              <span
                className="font-weight-600 mr-2"
                style={{ color: "#6D7175", fontSize: 16 }}
              >
                هزینه ماهیانه
              </span>
            </div>
            <div className="font-weight-600" style={{ fontSize: 16 }}>
              ۱۸۳ هزار تومان
            </div>
          </div>
          <div className="w-100 d-flex justify-content-between mt-4 pb-1">
            <div className="d-flex">
              <Image
                width={24}
                height={24}
                src="/images/Tick Circle.svg"
                alt="کارمزد هر سفارش"
              />
              <span
                className="font-weight-600 mr-2"
                style={{ color: "#6D7175", fontSize: 16 }}
              >
                کارمزد از هر سفارش
              </span>
            </div>
            <div className="font-weight-600" style={{ fontSize: 16 }}>
              ۲٪ کارمزد
            </div>
          </div>
          <hr className="w-100 hr-normal my-5" />
          {success ? (
            <div className="d-flex justify-content-end">
              <button
                className="radius-16 p-4"
                style={{
                  backgroundColor: "#0050FF",
                  color: "#fff",
                  height: 52,
                  width: maxWidth768 ? "100%" : 163,
                }}
              >
                بازگشت به پنل مدیریت
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end flex-wrap">
              <button
                className="radius-16"
                style={{
                  backgroundColor: "#fff",
                  color: "#0050FF",
                  height: 52,
                  border: "1px solid #0050FF",
                  width: maxWidth768 ? "100%" : 163,
                }}
              >
                بازگشت به پنل مدیریت
              </button>
              <button
                className="radius-16 p-4 mr-0 mr-md-4 mt-md-0 mt-4"
                style={{
                  backgroundColor: "#0050FF",
                  color: "#fff",
                  height: 52,
                  width: maxWidth768 ? "100%" : 163,
                }}
              >
                پرداخت مجدد
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
