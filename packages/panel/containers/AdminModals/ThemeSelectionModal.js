import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectBusinessThemeConfig } from "@saas/stores/business/selector";
import Modal from "@saas/components/Modal";
import { themeSections } from "@saas/utils/themeConfig/constants";
import ThemeSelectionCard from "../AdminSettings/components/ThemeSection/ThemeSelectionCard";
import { CDN_BASE_URL } from "@saas/utils/api";
import ThemePreview from "../AdminSettings/components/ThemeSection/ThemePreview";
import { updateBusiness } from "@saas/stores/business/actions";
import ModalHeader from "@saas/components/Modal/ModalHeader";
const ThemeSelectionModal = ({
  isOpen,
  onClose,
  _updateBusiness,
  themeConfig,
}) => {
  const [preview, setPreview] = useState(null);
  const submit = (theme) => {
    _updateBusiness(
      {
        theme_config: { ...themeConfig, above_the_fold: theme },
      },
      "Changed the theme of the site successfully.",
      "Changed the theme of the site!"
    );
    setPreview(null);
    onClose();
  };
  return (
    <Modal
      onClose={() => {
        if (preview) setPreview(null);
        else onClose();
      }}
      isOpen={isOpen}
      header={
        <ModalHeader
          onRightClick={() => {
            if (preview) setPreview(null);
            else onClose();
          }}
          title="Election"
        />
      }
      body={
        preview ? (
          <ThemePreview
            theme={preview}
            selectTheme={(e) => {
              e.preventDefault();
              submit(preview);
            }}
          />
        ) : (
          <>
            <div className="u-textBlack u-font-medium-r pb-2 text-center ">
              Select your site's favorite template.
            </div>
            {themeSections.map((ts) => (
              <div
                className="py-2 mb-1  px-3"
                key={`theme-section-${ts.title}`}
              >
                <div className="text-right mb-2">
                  <div className="u-textBlack u-fontWeightBold u-fontMedium">
                    {ts.title}
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-around">
                  {ts.themes.map((t) => (
                    <ThemeSelectionCard
                      key={`theme-card-${t}`}
                      onSelect={(e) => {
                        e.preventDefault();
                        submit(t);
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setPreview(t);
                      }}
                      image={`${CDN_BASE_URL}${t}Mobile.png`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeConfig: makeSelectBusinessThemeConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThemeSelectionModal);
