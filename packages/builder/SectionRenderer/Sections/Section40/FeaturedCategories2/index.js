import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AdminSection from "@saas/components/AdminSection";
import SectionLink from "../../../components/SectionLink";
import LazyImage from "@saas/components/LazyImage";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function FeaturedCategories2({
  isDragging,
  dragHandleProps,
  isActive,
  _updateSection,
  isEditMode,
  onClick,
  business,
  content,
  isMobile,
}) {
  const {
    title: { value: title_value },
    buttons: { value: buttons_value },
    categories: { items = [] },
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
      <div className="w-100 container py-4">
        <h2
          className="text-right py-3"
          style={{ fontSize: 20, fontWeight: 900 }}
        >
          {title_value}
        </h2>
        <div className="d-flex flex-wrap">
          {items.map(
            ({
              image,
              title,
              subtitle,
              link,
              id,
              texts_color,
              alternative,
            }) => (
              <div
                key={id}
                className={`${isMobile ? "col-12" : "col-md-4"} p-3`}
              >
                <Paper elevation={2} key={id} className="d-flex rtl flex-wrap">
                  <div className="col-6 d-flex align-items-center p-0 overflow-hidden">
                    <div className="w-100">
                      <LazyImage
                        src={image}
                        objectFit="contain"
                        alt={alternative || business.revised_title}
                      />
                    </div>
                  </div>
                  <div className="col-6 text-right direction-rtl inner-item">
                    <h3
                      className="my-4"
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: texts_color || "",
                      }}
                    >
                      {title}
                    </h3>
                    <div className="my-4" style={{ color: texts_color || "" }}>
                      {subtitle}
                    </div>
                    <SectionLink
                      href={link}
                      businessAddress={businessAddress}
                      isExternal={isUrlExternal(link)}
                    >
                      <Button
                        className="my-4 cursor-pointer"
                        size="small"
                        style={{ color: texts_color || "" }}
                      >
                        {buttons_value || "بیشتر"}
                      </Button>
                    </SectionLink>
                  </div>
                </Paper>
              </div>
            )
          )}
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(FeaturedCategories2);
