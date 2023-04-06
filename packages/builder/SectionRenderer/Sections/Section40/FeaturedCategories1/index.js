import React, { memo } from "react";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import Paper from "@material-ui/core/Paper";
import AdminSection from "@saas/components/AdminSection";
import SectionLink from "../../../components/SectionLink";
import LazyImage from "@saas/components/LazyImage";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function FeaturedCategories1({
  isDragging,
  dragHandleProps,
  isActive,
  _updateSection,
  isEditMode,
  onClick,
  themeColor,
  business,
  content,
  isMobile,
}) {
  const {
    title: { value: title_value, color: title_color },
    image: { value: image_url, alternative: alternative_image },
    background: { value: background_color },
    cards: { items = [] },
  } = content;
  const businessAddress = business.get_vitrin_absolute_url;
  return (
    <AdminSection
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      isActive={isActive}
      _updateSection={_updateSection}
      isEditMode={!!isEditMode}
      onClick={onClick}
    >
      <div
        className="position-relative pb-5 d-flex"
        style={{ backgroundColor: background_color, minHeight: "80vh" }}
      >
        <div className="container text-center">
          <div
            style={{ marginTop: 50 }}
            className="logo-image position-relative mx-auto"
          >
            <LazyImage
              src={image_url}
              alt={alternative_image || business.revised_title}
            />
          </div>
          <h1
            style={{ color: title_color || "white" }}
            className="header--info--title u-fontWeightBold mt-5"
          >
            {title_value || "عنوان"}
          </h1>
          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ marginTop: 50 }}
          >
            {items.map((item) => {
              return (
                <SectionLink
                  key={item.id}
                  href={item.link}
                  isExternal={isUrlExternal(item.link)}
                  businessAddress={businessAddress}
                  className={`${isMobile ? "col-12" : "col-md-6"} p-2`}
                  style={{ maxWidth: 430 }}
                >
                  <Paper className="d-flex align-items-center px-4 py-2 u-border-radius-4">
                    <div
                      className="p-1 u-border-radius-50-percent p-1 d-flex justify-content-center align-items-center position-relative"
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: themeColor,
                      }}
                    >
                      <LazyImage
                        src={item.image}
                        alt={business.revised_title}
                      />
                    </div>
                    <div className="text-right flex-1 pr-3">
                      <div className="u-text-black u-fontWeightBold">
                        {item.title}
                      </div>
                      <div className="u-text-dark-grey u-fontNormal">
                        {item.subtitle}
                      </div>
                    </div>
                    <KeyboardArrowLeftRoundedIcon fontSize="small" />
                  </Paper>
                </SectionLink>
              );
            })}
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(FeaturedCategories1);
