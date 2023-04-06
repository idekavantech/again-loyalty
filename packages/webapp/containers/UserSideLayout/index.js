/**
 *
 * UserSideLayout
 *
 */

import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import {
  PLUGIN_ACTIVE_STATUS,
  PLUGIN_TRIAL_STATUS,
} from "@saas/stores/plugins/constants";
import { PWA_PLUGIN } from "@saas/utils/constants/plugins";

import A2HSComponent from "@saas/components/A2HS";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
function UserSideLayout({ children, business, PWAPlugin }) {
  const theme = useTheme();
  const [A2HS, setA2HS] = useState(false);
  const router = useRouter();
  const needsToSeePrompt = () => {
    if (navigator.standalone) {
      return false;
    }
    if (
      business &&
      PWAPlugin &&
      (PWAPlugin.status === PLUGIN_ACTIVE_STATUS ||
        PWAPlugin.status === PLUGIN_TRIAL_STATUS) &&
      router.asPath.search("/admin") === -1 &&
      (["iPhone", "iPad", "iPod"].includes(navigator.platform) ||
        Boolean(window.deferredPrompt))
    ) {
      const now = new Date().getTime();

      if (localStorage.getItem("CLICKED_ON_INSTALL")) {
        const lastTime = new Date(
          Number(localStorage.getItem("CLICKED_ON_INSTALL"))
        );
        if (now - lastTime > 7 * 24 * 60 * 60 * 1000) {
          return true;
        }
      }
      if (localStorage.getItem("A2HS")) {
        const lastTime = new Date(Number(localStorage.getItem("A2HS")));
        return now - lastTime > 4 * 60 * 60 * 1000;
      }
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (business) {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.deferredPrompt = e;
        window.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            // _setSnackBarMessage('اپلیکیشن با موفقیت نصب شد.', 'success');
          } else {
            // _setSnackBarMessage('اپلیکیشن با موفقیت نصب شد.', 'success');
          }
          window.deferredPrompt = null;
        });
        const now = new Date().getTime();
        if (needsToSeePrompt()) {
          setA2HS(true);
          localStorage.setItem("A2HS", now);
        }
      });
      const now = new Date().getTime();
      if (needsToSeePrompt()) {
        setA2HS(true);
        localStorage.setItem("A2HS", now);
      }
    }
  }, [business]);
  return (
    <div>
      <A2HSComponent
        APK_URL={PWAPlugin.data.apk_url}
        title={business.revised_title}
        icon={business.icon_image_url}
        isOpen={A2HS}
        themeColor={theme.palette.primary.main}
        onClose={() => setA2HS(false)}
        pwaPlugin={PWAPlugin}
      />
      {children}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  PWAPlugin: makeSelectPlugin(PWA_PLUGIN),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(UserSideLayout);
