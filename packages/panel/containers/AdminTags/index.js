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
import jwt from "jsonwebtoken";
import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import { updateBusiness } from "@saas/stores/business/actions";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";

export function AdminForms({ loading, themeConfig, _updateBusiness }) {
  const theme = useTheme();
  const [headConfigTags, setHeadConfigTags] = useState(themeConfig.head_tags);
  const [bodyConfigScript, setBodyConfigScript] = useState(
    themeConfig.body_scripts
  );
  const submit = () => {
    const decodedScripts = {
      body: bodyConfigScript
        ? jwt.decode(bodyConfigScript, process.env.jwt_key)
        : null,
      head: headConfigTags
        ? jwt.decode(headConfigTags, process.env.jwt_key)
        : null,
    };
    const isBodyScriptValid =
      typeof decodedScripts.body === "string" || decodedScripts.body === null;
    const isHeadScriptValid =
      typeof decodedScripts.head === "string" || decodedScripts.head === null;
    const editedBusiness = {
      theme_config: {
        ...themeConfig,
        ...(isHeadScriptValid && { head_tags: headConfigTags }),
        ...(isBodyScriptValid && { body_scripts: bodyConfigScript }),
      },
    };
    _updateBusiness(
      editedBusiness,
      "تنظیمات اصلی با موفقیت ذخیره شد.",
      "ذخیره تغییرات تنظیمات اصلی ناموفق بود!"
    );
  };
  const headValue = jwt.decode(headConfigTags, process.env.jwt_key);
  const bodyValue = jwt.decode(bodyConfigScript, process.env.jwt_key);
  return (
    <div className="container">
      <Head>
        <title>ویرایش تگ‌ها</title>
      </Head>
      <AdminBreadCrumb />
      <Paper elevation={1} className="p-3 mt-3">
        <div
          className="px-3"
          style={{ color: theme.palette.text.tertiary, fontSize: 16 }}
        >
          <div className="text-left">Head Tags</div>
          <textarea
            value={headValue}
            onChange={(e) =>
              setHeadConfigTags(jwt.sign(e.target.value, process.env.jwt_key))
            }
            className="w-100 mt-3 p-3"
            placeholder="Head Tags"
            style={{
              height: 400,
              borderRadius: 4,
              border: "1px solid #eeeeee",
              direction: "ltr",
            }}
          ></textarea>
        </div>
      </Paper>
      <Paper elevation={1} className="p-3 mt-3">
        <div
          className="px-3"
          style={{ color: theme.palette.text.tertiary, fontSize: 16 }}
        >
          <div className="text-left">Body Scripts</div>
          <textarea
            value={bodyValue}
            onChange={(e) =>
              setBodyConfigScript(jwt.sign(e.target.value, process.env.jwt_key))
            }
            className="w-100 mt-3 p-3"
            placeholder="Body Scripts"
            style={{
              height: 400,
              borderRadius: 4,
              border: "1px solid #eeeeee",
              direction: "ltr",
            }}
          ></textarea>
        </div>
      </Paper>
      <SaveAndDiscardButtons
        saveAction={submit}
        saveText="ذخیره"
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

export default compose(withConnect, memo)(AdminForms);
