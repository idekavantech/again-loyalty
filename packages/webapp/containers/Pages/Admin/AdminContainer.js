import { memo } from "react";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { compose } from "redux";
import { getAdminUrl } from "@saas/utils/helpers/getAdminUrl";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import ArrowForwardIcon from "@material-ui/icons/ArrowBack";

function AdminContainer({ business }) {
  const { minWidth992 } = useResponsive();

  return (
    <div
      className={`d-flex align-items-center h-100-vh ${
        minWidth992
          ? "justify-content-between pr-5 flex-row-reverse"
          : "flex-column"
      }`}
    >
      <img
        style={!minWidth992 ? { maxHeight: 400 } : {}}
        className={minWidth992 ? "h-100 min-width-0" : "w-100"}
        src={
          minWidth992
            ? "/images/migration-desktop.png"
            : "/images/migration-mobile.png"
        }
      />
      <div className="flex-1 d-flex justify-content-center">
        <div
          style={{ gap: 12, maxWidth: 447 }}
          className={`d-flex flex-column justify-content-center ${
            !minWidth992 ? "align-items-center p-5" : "h-100"
          }`}
        >
          <img
            style={{ width: 100 }}
            className="object-fit-contain"
            src="/images/vitrin-logo.png"
          />

          <div className="u-font-42-24 u-fontWeightHeavy">
            تغییر آدرس پنل مدیریت
          </div>
          <div
            className={`mt-3 u-font-16-20 ${!minWidth992 ? "text-center" : ""}`}
          >
            برای ورود به پنل مدیریت وب‌سایت خود با آدرس جدید روی لینک زیر بزنید.
          </div>
          <a
            href={getAdminUrl(business)}
            target="_blank"
            rel="nofollow noreferrer"
            className="w-100 u-mt-50"
            style={{ maxWidth: 300 }}
          >
            <Button fullWidth variant="contained" color="primary">
              برو به پنل
              <ArrowForwardIcon className="mr-3" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(AdminContainer);
