import { memo } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Router, { useRouter } from "next/router";
import { night } from "utils/colors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function Customized404Page() {
  const { minWidth576 } = useResponsive();
  const router = useRouter();
  const isAdminUrl = router.asPath.includes("/admin");
  const redirectUrl = `vitrin.reval.me${router.asPath}`;

  return (
    <Paper
      elevation={1}
      className="d-flex flex-column justify-content-center align-items-center mx-2 px-2"
      style={{
        padding: minWidth576 ? "58px 0 58px 0" : "47px 0 0 0",
      }}
    >
      <img
        alt=""
        src="/images/404.png"
        style={{ maxWidth: 109, maxHeight: 125 }}
      />
      <div
        style={{
          color: "#000000",
          marginTop: "44px",
          marginBottom: "10px",
        }}
        className="font-16 text-center bold"
      >
        !متاسفانه صفحه مورد نظر شما یافت نشد
      </div>
      <div
        style={{
          color: night,
          marginBottom: 100,
        }}
        className="font-14 text-center bold"
      >
        {isAdminUrl
          ? "ما تغییراتی در زیرساخت پنل‌های مدیریت داده‌ایم. از این به بعد می‌توانید از طریق آدرس جدید به پنل مدیریت خود دسترسی داشته باشید."
          : "!آنچه یافت می نشود ، آنم آرزوست"}
      </div>
      <div className="text-center direction-ltr">{isAdminUrl ? redirectUrl : ""}</div>
      {!isAdminUrl && minWidth576 ? (
        <Button
          style={{ width: 200 }}
          variant="contained"
          color="primary"
          onClick={() => Router.push("/")}
          className="w-75"
          id="btn-404-1"
        >
          بازگشت به صفحه اصلی
        </Button>
      ) : (
        !isAdminUrl && (
          <div
            style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)" }}
            className="fixed-bottom p-3"
          >
            <Button
              style={{ width: 200 }}
              variant="contained"
              color="primary"
              className="w-100"
              onClick={() => Router.push("/")}
              id="btn-404-2"
            >
              بازگشت به صفحه اصلی
            </Button>
          </div>
        )
      )}
    </Paper>
  );
}

export default memo(Customized404Page);
