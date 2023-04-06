/**
 *
 * AdminThemeSettings
 *
 */

import React, { memo, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SaveAndDiscardButtons from "@saas/components/SaveAndDiscardButtons";
import FontSection from "./components/FontSection";
import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import { updateBusiness } from "@saas/stores/business/actions";
import ColorSection from "./components/ColorSection";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";

export function AdminSettingsTheme({
  loading,
  themeConfig,
  _updateBusiness,
  themeColor,
}) {
  const [themeConfigFont, setThemeConfigFont] = useState(themeConfig.font);
  const [themeColorConfig, setThemeColorConfog] = useState(themeColor);

  const submit = () => {
    const editedBusiness = {
      theme_config: {
        ...themeConfig,
        font: themeConfigFont,
        theme_color: themeColorConfig,
      },
    };
    _updateBusiness(
      editedBusiness,
      "تنظیمات اصلی با موفقیت ذخیره شد.",
      "ذخیره تغییرات تنظیمات اصلی ناموفق بود!"
    );
  };

  return (
    <div className="container">
      <Head>
        <title>تنظیمات تم</title>
      </Head>

      <AdminBreadCrumb
        helpVideo={{ url: ADMIN_HELP_VIDEOS.fontAndColor.url }}
      />

      <FontSection
        _themeConfigFont={themeConfigFont}
        changeThemeConfigFont={setThemeConfigFont}
      />

      <ColorSection
        _themeColorConfig={themeColorConfig}
        changeThemeColorConfig={setThemeColorConfog}
      />

      <SaveAndDiscardButtons
        saveAction={submit}
        saveText="ذخیره تغییرات"
        disabled={loading}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeConfig: makeSelectBusinessThemeConfig(),
  themeColor: makeSelectBusinessThemeColor(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminSettingsTheme);
