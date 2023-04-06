import React, { memo } from "react";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";
function Testimonial1({
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
  customization,
}) {
  const {
    title: { value: title_value },
    description: { value: description_value },
    quotes: { items = [] },
  } = content;
  const {
    background: {
      background_type: backgroundType,
      background_image: backgroundImage,
      background_color: backgroundColor,
      opacity = 100,
    } = {},
  } = customization;
  return (
    <AdminSection
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      isActive={isActive}
      _updateSection={_updateSection}
      isEditMode={!!isEditMode}
      onClick={onClick}
    >
      {backgroundImage && backgroundType === "image" && (
        <div
          className="position-absolute left-0 u-top-0 h-100 w-100 d-block"
          style={{ opacity: opacity / 100 }}
        >
          <LazyImage src={backgroundImage} />
        </div>
      )}
      <div
        className="position-relative py-5 d-flex u-background-melo-grey"
        style={{
          backgroundColor: backgroundType === "color" && backgroundColor,
        }}
      >
        <div className="container text-center">
          <div
            className="d-inline-block px-5 py-3 u-font-largest u-fontWeightBold u-text-black"
            style={{
              borderBottom: `4px solid ${themeColor}`,
            }}
          >
            {title_value}
          </div>
          <div
            className="mt-5 u-text-black"
            dangerouslySetInnerHTML={{ __html: description_value }}
          />

          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ marginTop: 50 }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={`${isMobile ? "col-12" : "col-md-6"} p-2`}
                style={{ maxWidth: 430 }}
              >
                <div className=" p-5 u-background-white container-shadow u-border-radius-8">
                  <div
                    className="text-right mb-5"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                  <div className="d-flex align-items-center">
                    <div
                      className="u-border-radius-50-percent flex-shrink-0 d-flex justify-content-center align-items-center"
                      style={{
                        width: 80,
                        height: 80,
                      }}
                    >
                      <div className="w-100 h-100 object-fit-cover">
                        <LazyImage
                          src={item.image}
                          alt={business.revised_title}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-1 pr-3">
                      <div className="u-text-black u-fontWeightBold">
                        {item.title}
                      </div>
                      <div className="u-text-black u-fontNormal">
                        {item.subtitle}
                      </div>
                    </div>
                    <FormatQuoteRoundedIcon
                      color="secondary"
                      style={{ fontSize: 60, transform: "rotate(180deg)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(Testimonial1);
