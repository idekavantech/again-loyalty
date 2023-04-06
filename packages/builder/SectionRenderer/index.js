/* eslint-disable camelcase */
/*
 * SectionRenderer
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import {
  makeSelectCallToActions,
  makeSelectHasActivePlugin,
} from "@saas/stores/plugins/selector";
import VitrinPromotionSection from "./Sections/BusinessSections/VitrinPromotionSection";
import { sectionsDetails, sectionWithNoHydration } from "./constants";
import Head from "next/head";

function extractImageURL(_string) {
  const rx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g;
  return _string.match(rx) || [""];
}

export function SectionRenderer({
  business,
  themeColor,
  hasActivePlugin,
  callToActions,
  sections_skeleton,
  sectionsSSRData,
  ...props
}) {
  return (
    <div className="w-100 text-center">
      {sections_skeleton
        ?.filter((section) => section.is_active)
        .map((section, index) => {
          const id = `${section.id || "i"}-${section.name}-${index}`;
          if (index === 1 && !hasActivePlugin)
            return <VitrinPromotionSection key={20} />;
          if (!sectionsDetails[section.name]) return null;

          const SectionComponent = sectionsDetails[section.name].component;
          const preloadImages =
            section.content && extractImageURL(JSON.stringify(section.content));
          const sectionSSRProps = sectionsSSRData?.find(
            (item) => item.id === section.id
          ) || { data: {} };
          return (
            <div className="position-relative" key={id}>
              {index < 2 && section.content && (
                <Head>
                  {!!preloadImages.length &&
                    preloadImages.map((image) => (
                      <link key={image} href={image} rel="preload" as="image" />
                    ))}
                </Head>
              )}
              {index === 1 && !hasActivePlugin ? (
                <VitrinPromotionSection key={19} />
              ) : null}
              {sectionWithNoHydration.includes(section.name) ? (
                <div id={`section_${index + 1}`}>
                  <SectionComponent
                    {...props}
                    {...section}
                    business={business}
                    themeColor={themeColor}
                    callToActions={callToActions}
                    {...sectionSSRProps.data}
                  />
                </div>
              ) : (
                <div id={`section_${index + 1}`}>
                  <SectionComponent
                    {...props}
                    {...section}
                    business={business}
                    themeColor={themeColor}
                    callToActions={callToActions}
                    {...sectionSSRProps.data}
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  callToActions: makeSelectCallToActions(),
  business: makeSelectBusiness(),
  themeColor: makeSelectBusinessThemeColor(),
  hasActivePlugin: makeSelectHasActivePlugin(),
  themeConfig: makeSelectBusinessThemeConfig(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SectionRenderer);
