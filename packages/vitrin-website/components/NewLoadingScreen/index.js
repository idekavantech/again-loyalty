import Image from "next/image";
import { useState, useEffect } from "react";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeSelectUser } from "../../stores/user/selector";
import { useSelector } from "react-redux";
import { getAdminUrl } from "@saas/utils/helpers/getAdminUrl";

let timeoutRedirect = null;
let timeoutNewValues = null;
const NewLoadingScreen = ({ business }) => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("/images/vitrin-integrate-1.png");
  const [texts, setTexts] = useState([
    "سایت بدون بازدید، فروش ندارد.",
    "روش‌های ایجاد بازدید در ویترین: ",
    "اتصال به پلتفرم‌های جذب مشتری مانند گوگل، بهترینو، ترب، ایمالز و قیمت ",
  ]);
  const { maxWidth768 } = useResponsive();
  const user = useSelector(makeSelectUser());
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, 333);

    timeoutNewValues = setTimeout(() => {
      setImage("/images/vitrin-integrate-2.png");
      setTexts([
        "افزایش مشتریان، فروش بیشتر",
        "روش‌های افزایش مشتری در ویترین:",
        "اتصال به باشگاه مشتریان و تنظیم کد تخفیف و اعتبار هدیه مشتریان",
      ]);
    }, 20000);

    timeoutRedirect = setTimeout(() => {
      if (business && user)
        window.location = `${getAdminUrl(business)}?token=${user.token}`;
    }, 30000);
    return () => {
      clearInterval(timer);
      clearTimeout(timeoutNewValues);
      clearTimeout(timeoutRedirect);
    };
  }, [business, user]);

  return (
    <div>
      <div
        style={{
          background: "white",
          width: "100vw",
          height: "100vh",
          maxHeight: "unset",
          position: "fixed",
          top: "0",
          left: "0",
          transition: "opacity 0.5s ease-in-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
          opacity: 1,
          padding: maxWidth768 ? 56 : 48,
          ...(maxWidth768 && { paddingRight: 20 }),
          ...(maxWidth768 && { paddingLeft: 20 }),
        }}
      >
        <Image
          src="/images/vitrin-logo-blue.svg"
          width={maxWidth768 ? 130 : 105}
          height={maxWidth768 ? 70 : 45}
          alt="لوگو ویترین"
        />
        <div className={`d-flex mt-4 align-items-center`}>
          <strong
            style={{
              color: "#0050FF",
              fontSize: 20,
              fontWeight: 600,
              marginLeft: 8,
              width: 40,
            }}
          >
            {englishNumberToPersianNumber(progress)}%
          </strong>
          <p style={{ color: "#333333", fontSize: maxWidth768 ? 13 : 12 }}>
            {progress === 100
              ? "تبریک! ویترین شما با موفقیت ساخته شد"
              : "ما در حال ساخت سایت و پنل مدیریتی شما هستیم."}
          </p>
        </div>
        <div
          style={{ minWidth: 320 }}
          className={
            "d-flex position-relative justify-content-center align-items-center h-100 mt-5"
          }
        >
          <div
            className={
              "d-flex flex-col justify-content-around mt-5 align-items-start p-5 u-border-radius-8 position-absolute"
            }
            style={{
              boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.12)",
              minHeight: 440,
              width: "90%",
              minWidth: 320,
              top: 0,
              zIndex: 1,
              transition: "all 0.3s ease",
              backgroundColor: "white",
            }}
          >
            <div className={"d-flex w-100 justify-content-center"}>
              <Image src={image} width={250} height={200} alt="لوگو ویترین" />
            </div>

            <h2 style={{ fontSize: 18, color: "#333333" }}>{texts[0]}</h2>
            <p style={{ fontSize: 16, color: "#333333" }}>{texts[1]}</p>
            <p style={{ fontSize: 16, color: "#333333", lineHeight: 1.5 }}>
              {texts[2]}
            </p>
          </div>
          <LoadingCircle progress={progress} />
        </div>
      </div>
    </div>
  );
};

const LoadingCircle = ({ progress }) => {
  const SCALE = 10;
  return (
    <>
      <div
        style={{
          transform: `scale(${SCALE})`,
          position: "absolute",
          width: 40,
          height: 40,
          top: 223,
          zIndex: 0,
        }}
      >
        <svg className="MuiCircularProgress-svg" viewBox="22 22 44 44">
          <circle
            className="MuiCircularProgress-circle MuiCircularProgress-circleDeterminate"
            cx="44"
            cy="44"
            r="21.65"
            fill={"none"}
            strokeWidth="0.3"
            style={{
              strokeDasharray: "1.5",
              strokeDashoffset: 0,
              strokeOpacity: 0.7,
              color: "rgba(0, 0, 0, 0.45)",
            }}
          ></circle>
        </svg>
      </div>
      <CircularProgress
        style={{
          transform: `scale(${SCALE})`,
          position: "absolute",
          zIndex: 0,
          top: 200,
        }}
        thickness={0.7}
        variant="determinate"
        className="mt-5 mb-2"
        value={progress}
      />
    </>
  );
};
export default NewLoadingScreen;
