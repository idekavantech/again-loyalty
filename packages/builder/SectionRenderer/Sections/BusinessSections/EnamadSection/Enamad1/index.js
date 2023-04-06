/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { memo } from "react";
import Section from "@saas/components/Section";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";

function Enamad1({
  isEditMode,
  onClick,
  themeColor,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  business,
  mock,
  customization = {},
}) {
  const {
    theme_config: {
      enamad_config,
      samandehi_config,
      virtual_business_association_config,
    },
  } = business;
  const {
    background: {
      background_type = "color",
      background_color,
      opacity = 100,
      background_image,
    } = {},
  } = customization;
  if (
    !enamad_config &&
    !samandehi_config &&
    !virtual_business_association_config &&
    !isEditMode &&
    !mock
  ) {
    return null;
  }
  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      <div
        style={{
          height: "100%",
          backgroundColor:
            background_type === "color" ? background_color : "transparent",
        }}
        className="position-absolute left-0 u-top-0 w-100 d-block"
      >
        {background_image && background_type === "image" && (
          <LazyImage
            src={background_image}
            style={{ opacity: opacity / 100 }}
          />
        )}
      </div>
      <Section
        themeColor={themeColor}
        title="مجوزها"
        className={`position-relative ${isEditMode ? "py-5" : "py-3"}`}
      >
        <div className="d-flex justify-content-center">
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .parent-section a img {
                  width : 150px ;
                  height : 150px ;
                  object-fit : contain;
                }
                .virtual-section img {
                  width : 150px ;
                  height : 150px ;
                  object-fit : contain;
                }
              `,
            }}
          ></style>
          {enamad_config && (
            <div
              className={`${
                (samandehi_config || virtual_business_association_config) &&
                " ml-2 "
              }`}
            >
              <div
                className="w-100 h-100 parent-section"
                dangerouslySetInnerHTML={{
                  __html: `${enamad_config}`,
                }}
              ></div>
            </div>
          )}
          {samandehi_config && (
            <div
              className={`${virtual_business_association_config && " ml-2 "}`}
            >
              <div
                className="w-100 h-100 virtual-section"
                dangerouslySetInnerHTML={{
                  __html: `${samandehi_config}`,
                }}
              ></div>
            </div>
          )}
          {virtual_business_association_config && (
            <div>
              <div
                className="w-100 h-100 virtual-section"
                dangerouslySetInnerHTML={{
                  __html: `${virtual_business_association_config}`,
                }}
              ></div>
            </div>
          )}
        </div>
      </Section>
    </AdminSection>
  );
}

export default memo(Enamad1);
