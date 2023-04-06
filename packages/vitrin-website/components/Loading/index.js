import Image from "next/image";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontWeight: 700 }}
        >{`${englishNumberToPersianNumber(
          Math.round(props.value)
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
const Loading = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState("مرحله ۱: آماده سازی دامنه شما");
  const {maxWidth768} = useResponsive()


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100
          ? 100
          : prevProgress < 10
          ? prevProgress + 5
          : prevProgress + 10
      );
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setLevel("مرحله ۱: آماده سازی دامنه شما");
    }
  }, [isLoading]);

  useEffect(() => {
    if (progress == 5) {
      setLevel("مرحله ۲: ساخت صفحات و تنظیمات ظاهری");
    } else if (progress == 10) {
      setLevel("مرحله۳: انتقال اطلاعات‌ شما به سایت");
    }
  }, [progress]);
  return (
    <div>
      <style jsx>
        {`
          @keyframes heartbeat {
            0% {
              opacity: 0.8;
              transform: scale(1);
            }

            50% {
              opacity: 1;
              transform: scale(1.1);
            }

            100% {
              opacity: 0.8;
              transform: scale(1);
            }
          }

          .loading {
            pointer-events: none;
          }

          .loading.hide {
            opacity: 0 !important;
            transition: opacity 0.5s ease-in-out !important;
          }

          .moving-loading-icon {
            animation: heartbeat 1s infinite;
          }
        `}
      </style>
      <div
        className={isLoading ? "loading" : "loading hide"}
        style={{
          background: "white",
          width: "100vw",
          height: "100vh",
          maxHeight: "unset",
          top: "0",
          left: "0",
          position: "fixed",
          transition: "opacity 0.5s ease-in-out",
          zIndex: "2000",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          opacity: 1,
        }}
      >
        <div className={level !== "Done" && "moving-loading-icon"}>
          <Image
            src="/images/vitrin-logo-blue.svg"
            width={maxWidth768 ? 96 : 305}
            height={maxWidth768 ? 32 : 101}
            alt="loading"
          />
        </div>
        {level == "Done" ? (
          <div
            style={{
              fontSize: 20,
              textAlign: "center",
              marginTop: 58,
              color: "#0050FF",
              fontWeight: 600,
            }}
          >
            تبریک!
            <br />
            ویترین شما با موفقیت ساخته شد
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: maxWidth768 ? 16 : 28,
                color: "#0050FF",
                fontWeight: 600,
                marginTop: 40,
              }}
            >
              به جمع بزرگ ویترین خوش اومدی
            </div>
            <p
              style={{
                fontSize: maxWidth768 ? 15 : 32,
                fontWeight: 600,
                marginTop: maxWidth768 ? 60 : 150,
              }}
            >
              {level}
            </p>
            <p
              style={{
                fontSize: maxWidth768 ? 10 : 20,
                marginTop: maxWidth768 ? 16 : 36,
              }}
            >
              ویترین شما به صورت اتوماتیک در حال راه‌اندازی است.
            </p>
            <Box
              sx={{
                width: maxWidth768 ? "70%" : "40%",
                direction: "ltr",
                marginTop: maxWidth768 ? 2 : 5,
              }}
            >
              <LinearProgressWithLabel value={progress} />
            </Box>
          </>
        )}
      </div>
    </div>
  );
};
export default Loading;
