/* eslint-disable indent */

import React, { memo } from "react";

import AdminSection from "@saas/components/AdminSection";
import WorkingHour from "./WorkingHour";
import LocationSection from "./Location";
import ContactUs from "./ContactUs";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

function Footer3({
  isEditMode,
  onClick,
  themeColor,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  business,
  isMobile,
}) {
  return (
    <AdminSection
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      isEditMode={Boolean(isEditMode)}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
    >
      <div className="d-flex flex-wrap">
        <div
          className={`${
            isMobile ? "col-12" : "col-md-4"
          } u-background-melo-grey-remove`}
        >
          <ContactUs business={business} themeColor={themeColor} />
        </div>
        <div
          className={`${
            isMobile ? "col-12" : "col-md-4"
          } u-background-melo-grey-remove z-index-2`}
        >
          <WorkingHour isEditMode={isEditMode} business={business} />
        </div>
        <div
          className={`map-wrapper position-relative overflow-hidden ${
            isMobile ? "col-12" : "col-md-4"
          } order-md-first px-0 py-0 z-index-1`}
        >
          <div className="w-100 map-fade position-absolute u-pointer-events-none" />
          <LocationSection themeColor={themeColor} business={business} />
        </div>
      </div>
    </AdminSection>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  themeConfig: makeSelectBusinessThemeConfig(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Footer3);
