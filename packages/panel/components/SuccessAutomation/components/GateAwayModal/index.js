import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Button} from "@material-ui/core";
import LazyImage from "@saas/components/LazyImage";


const GateAwayModal = ({isOpen, onClose}) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");

  return (
      <Dialog
          open={isOpen}
          onClose={onClose}
          className="w-100 "
          PaperProps={{
            style: {
              maxWidth: desktopMatches ? 520 : 320,
              margin: 0,
              borderRadius: 8,
            },
          }}
      >
        <DialogContent className="p-3 p-md-4 w-100 u-border-radius-8">
          <h1 style={{fontSize: 20, fontWeight: 500}}>
            درگاه‌های قابل اتصال به ویترین
          </h1>
          <div
              className="mt-5"
              style={{
                fontSize: desktopMatches ? 16 : 14,
                lineHeight: desktopMatches ? "24px" : "20px",
                color: "rgba(0, 0, 0, 0.87)",
              }}
          >
            <div className="pb-2" style={{borderBottom: "1px solid #DADADA"}}>
              <div>
                <p style={{fontSize: 16, lineHeight: "28px"}}>
                  درگاه‌های مستقیم
                </p>
                <p className="mt-2">
                  کارمزدی از تراکنش نمی‌گیرند و تسویه حساب به‌صورت آنی است و
                  نیازمند اخذ اینماد هستند. فرآیند دریافت درگاه مستقیم زمان‌بر است
                  و با شرط تکمیل مدارک گاهی تا یک ماه طول می‌کشد.
                </p>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <div>
                  <p>
                    ۱-{" "}
                    <a
                        target="_blank"
                        href="http://www.behpardakht.com/resources/TerminalRegistration.html#"
                        style={{color: "#0050FF"}}
                        rel="noreferrer"
                    >
                      درگاه پرداخت ملت
                    </a>
                  </p>
                  <p className="mt-2">
                    ۲-{" "}
                    <a
                        target="_blank"
                        href="https://www.sb24.ir/"
                        style={{color: "#0050FF"}}
                        rel="noreferrer"
                    >
                      درگاه سامان کیش{" "}
                    </a>
                  </p>
                </div>
                <div className="d-flex">
                  <LazyImage
                      className="ml-2"
                      width={desktopMatches ? 60 : 48}
                      height={desktopMatches ? 60 : 48}
                      src={`/images/behpardakht.svg`}
                  />
                  <LazyImage
                      width={desktopMatches ? 60 : 48}
                      height={desktopMatches ? 60 : 48}
                      src={`/images/samankish.svg`}
                  />
                </div>
              </div>
            </div>
            <div
                className=" pt-2"
                style={{
                  fontSize: desktopMatches ? 16 : 14,
                  lineHeight: desktopMatches ? "24px" : "20px",
                  color: "rgba(0, 0, 0, 0.87)",
                }}
            >
              <div>
                <p style={{fontSize: 16, lineHeight: "28px"}}>
                  درگاه‌های واسط{" "}
                </p>
                <p className="mt-2">
                  درصدی کارمزد از هر تراکنش تا سقف مشخص دریافت می‌کنند و حداکثر پس
                  از ۲۴ ساعت با حساب شما تسویه خواهد شد. فرآیند اخذ این درگاه‌ها
                  ساده‌تر است، اغلب نیازمند اخذ اینماد هستند و ۳ الی ۷ روز کاری به
                  طول می‌انجامد.
                </p>
              </div>
              <div className="w-100 d-flex mt-2 justify-content-between">
                <div>
                  <p>
                    ۱-{" "}
                    <a
                        href="https://zibal.ir/"
                        target="_blank"
                        rel="noreferrer"
                        style={{color: "#0050FF"}}
                    >
                      درگاه زیبال
                    </a>
                  </p>
                  <p className="mt-1">
                    ۲-{" "}
                    <a
                        href="https://www.zarinpal.com/payment-gateway.html"
                        target="_blank"
                        rel="noreferrer"
                        style={{color: "#0050FF"}}
                    >
                      درگاه زرین پال
                    </a>
                    (بسته نقره‌ای به اینماد نیاز ندارد)
                  </p>
                  <p className="mt-1">
                    ۳-{" "}
                    <a
                        href="https://idpay.ir/user/auth"
                        target="_blank"
                        rel="noreferrer"
                        style={{color: "#0050FF"}}
                    >
                      {" "}
                      درگاه آیدی پی
                    </a>
                  </p>
                  <p className="mt-1">
                    ۴-{" "}
                    <a
                        href="https://www.sizpay.ir/"
                        target="_blank"
                        rel="noreferrer"
                        style={{color: "#0050FF"}}
                    >
                      {" "}
                      درگاه سیزپی
                    </a>
                  </p>
                </div>
                <div className=" d-flex flex-col">
                  <div className="d-flex">
                    <LazyImage
                        className="ml-2"
                        width={desktopMatches ? 60 : 48}
                        height={desktopMatches ? 60 : 48}
                        src={`/images/zibal.svg`}
                    />
                    <LazyImage
                        width={desktopMatches ? 60 : 48}
                        height={desktopMatches ? 60 : 48}
                        src={`/images/idPay.svg`}
                    />
                  </div>
                  <div className="d-flex">
                    <LazyImage
                        className="ml-2"
                        width={desktopMatches ? 60 : 48}
                        height={desktopMatches ? 60 : 48}
                        src={`/images/sp.svg`}
                    />
                    <LazyImage
                        width={desktopMatches ? 60 : 48}
                        height={desktopMatches ? 60 : 48}
                        src={`/images/zarinpal.svg`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center mt-4">
            <Button
                className="u-border-radius-8 dashboard_buttons"
                color="primary"
                variant="contained"
                onClick={onClose}
                size={desktopMatches ? "large" : "small"}
            >
              بازگشت
            </Button>
          </div>
        </DialogContent>
      </Dialog>
  );
};
export default GateAwayModal;
