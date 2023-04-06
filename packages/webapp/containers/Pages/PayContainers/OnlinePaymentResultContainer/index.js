import React from "react";
import { baseColors, border, icon, surface } from "@saas/utils/colors";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "@material-ui/core/Button";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

function OnlinePaymentResultContainer({}) {
  const router = useRouter();
  return (
    <div
      className="position-relative h-100 d-flex flex-1 align-items-center justify-content-start flex-column w-100"
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{
          maxWidth: 410,
          maxHeight: 720,
          background: "white",
          border: `1px solid ${border.subdued}`,
        }}
        className="w-100 h-100 position-relative p-3 u-border-radius-8"
      >
        <IconButton
          className="mb-3 d-flex align-items-center justify-content-center position-relative z-index-2"
          onClick={() => router.push("/")}
          style={{ height: 35, width: 35 }}
        >
          <CloseRoundedIcon style={{ color: icon.default }} fontSize="small" />
        </IconButton>
        <Paper
          className="d-flex flex-column"
          style={{ height: 550, border: "none" }}
        >
          {router.query.status === "0" ? (
            <div className="u-mt-80 flex-1 d-flex flex-column align-items-center">
              <div
                style={{
                  width: 47,
                  height: 47,
                  background: surface.success.subdued,
                }}
                className="d-flex u-border-radius-50-percent align-items-center justify-content-center"
              >
                <CheckRoundedIcon style={{ color: icon.success }} />
              </div>
              <div className="u-fontSemiLarge mt-5 pt-2">
                پرداخت شما با موفقیت انجام شد.
              </div>
            </div>
          ) : (
            <div className="u-mt-80 flex-1 d-flex flex-column align-items-center">
              <div
                style={{
                  width: 47,
                  height: 47,
                  background: surface.critical.default,
                }}
                className="d-flex u-border-radius-50-percent align-items-center justify-content-center"
              >
                <CloseRoundedIcon style={{ color: baseColors.critical }} />
              </div>
              <div className="u-fontSemiLarge mt-5 pt-2">
                پرداخت شما ناموفق بود.
              </div>
              <div className="u-fontMedium u-text-darkest-grey text-right mt-5 text-center ">
                چنانچه مبلغی از حساب شما کسر شد، حداکثر تا ۷۲ ساعت به حساب شما
                بازگشت داده خواهد شد.
              </div>
            </div>
          )}
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={() => {
              if (router.query.has_cashback)
                window.location.href = "https://behtarino.com/profile/wallet";
              else router.push("/");
            }}
          >
            بازگشت به سایت
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default OnlinePaymentResultContainer;
