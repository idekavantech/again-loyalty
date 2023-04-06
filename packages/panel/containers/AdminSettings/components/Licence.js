import React, { memo } from "react";
import Input from "@saas/components/Input";
import Paper from "@material-ui/core/Paper";
import { night } from "@saas/utils/colors";
import Switch from "@saas/components/Switch";
import useTheme from "@material-ui/core/styles/useTheme";
function Licence({
  Enamad,
  changeEnamad,
  samandehi,
  changeSamandehi,
  virtualBusinessAssociation,
  changeVirtualBusinessAssociation,
  showLicence,
  setShowLicence,
}) {
  const theme = useTheme();
  return (
    <Paper elevation={1} className="d-flex mt-3 py-3 flex-wrap">
      <div className="d-flex col-12">
        <span className="u-fontLarge" style={{ color: night }}>
          مجوزهای کسب‌وکار
        </span>
        <Switch
          onColor={theme.palette.primary.main}
          isSwitchOn={showLicence}
          toggleSwitch={() => {
            setShowLicence(!showLicence);
          }}
        />
      </div>
      <p className="mt-3 col-12">
        می توانید در صورتی که تمایل دارید اطلاعات مجوزهای کسب‌وکار اینترنتی خود
        از جمله اینماد،ساماندهی و اتحادیه کسب و کارهای مجازی را در این قسمت وارد
        کنید. در ادامه می‌توانید در ویرایش صفحات سایت خود آن‌ها را نمایش دهید.
      </p>
      {showLicence ? (
        <>
          {" "}
          <div className="d-flex flex-wrap w-100 mt-5">
            <div className="col-12 col-lg-6 mb-3">
              <div className="u-fontLarge" style={{ color: night }}>
                اینماد
              </div>
              <Input
                className="mt-3"
                label="اینماد"
                value={Enamad}
                onChange={changeEnamad}
                multiline
                inputProps={{ style: { textAlign: "left" } }}
              />
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <div className="u-fontLarge" style={{ color: night }}>
                ساماندهی
              </div>
              <Input
                className="mt-3"
                label="ساماندهی"
                value={samandehi}
                onChange={changeSamandehi}
                multiline
                inputProps={{ style: { textAlign: "left" } }}
              />
            </div>
          </div>
          <div className="d-flex flex-wrap w-100">
            <div className="col-12 col-lg-6 mb-3">
              <div className="u-fontLarge" style={{ color: night }}>
                اتحادیه کسب‌وکارهای مجازی
              </div>
              <Input
                className="mt-3"
                label="اتحادیه کسب‌و‌کارهای مجازی"
                value={virtualBusinessAssociation}
                onChange={changeVirtualBusinessAssociation}
                multiline
                inputProps={{ style: { textAlign: "left" } }}
              />
            </div>
          </div>
        </>
      ) : null}
    </Paper>
  );
}

export default memo(Licence);
