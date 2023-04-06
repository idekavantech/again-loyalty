import Paper from "@material-ui/core/Paper";
import LazyImage from "@saas/components/LazyImage";
import LoadingSVGs from "configs/loadingSVGs";

const HeaderAdminBusinessOwner = () => {
  const LOGO = LoadingSVGs[process.env.NEXT_PUBLIC_APP_NAME];

  return (
    <Paper elevation={1} className="w-100 p-4">
      <div className="p-4 d-flex flex-col align-items-center">
        {LOGO ? <LOGO style={{ height: 26 }} /> : null}
        <p
          className="mt-4"
          style={{ fontSize: 22, fontWeight: 700, lineHeight: "44px" }}
        >
          به {process.env.NEXT_PUBLIC_APP_NAME_PERSIAN} خوش آمدید
        </p>
        <p className="mt-4 text-center" style={{ lineHeight: "26px" }}>
          متشکریم که به «{process.env.NEXT_PUBLIC_APP_NAME_PERSIAN}» اعتماد
          کردید. لطفا قبل از ورود به پنل مدیریت، ابتدا فرم زیر را با مشخصات صاحب
          سایت پر کنید.
          {process.env.NEXT_PUBLIC_APP_NAME_PERSIAN == "ویترین"
            ? ` با وارد کردن این اطلاعات، مراحل راه‌اندازی فروش آنلاین
          شما مثل ثبت دامنه، درگاه پرداخت و اینماد، ساده‌تر می‌شود. (ویدئوهای
          آموزشی در پنل شما قرار گرفته است.)`
            : null}
        </p>
        <LazyImage
          width={336}
          src="/images/b-info.svg"
          className="mt-4 px-5 px-md-0"
        />
      </div>
    </Paper>
  );
};

export default HeaderAdminBusinessOwner;
