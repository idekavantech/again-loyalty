/* eslint-disable camelcase */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "@saas/stores/injectReducer";
import { useInjectSaga } from "@saas/stores/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import {
  makeSelectPluginSEO,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import { LANDING_PLUGIN } from "@saas/utils/constants/plugins";
import SectionRenderer from "@saas/builder/SectionRenderer";

const key = "home";

export function HomePage({ business, themeConfig, mainPluginSEO }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return (
    <main className="w-100">
      <Head>
        <title>
          {(mainPluginSEO && mainPluginSEO.title) || business.revised_title}
        </title>
      </Head>
      <div className="w-100 text-center">
        {themeConfig && themeConfig.sections_skeleton && (
          <SectionRenderer sections_skeleton={themeConfig.sections_skeleton} />
        )}
      </div>
    </main>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  themeConfig: makeSelectBusinessThemeConfig(),
  mainPluginSEO: makeSelectPluginSEO(),
  landingPluginData: makeSelectPlugin(LANDING_PLUGIN),
});

function mapDispatchToProps() {
  return {};
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
