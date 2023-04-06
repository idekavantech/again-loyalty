import React, { memo, useEffect, useState } from "react";
import useTheme from "@material-ui/core/styles/useTheme";

import AdminSection from "@saas/components/AdminSection";
import SectionLink from "../../../components/SectionLink";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function GalleryImagesType2({
  isEditMode,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  onClick,
  business,
  isMobile: _isMobile,
  content,
}) {
  const {
    title: { value },
    tab_content,
  } = content;

  const { items, tabs } = tab_content || {};
  const businessAddress = business.get_vitrin_absolute_url;
  const { minWidth768, maxWidth768, minWidth992, minWidth1200 } =
    useResponsive();
  const isExtraLargeDesktop =
    typeof _isMobile === "boolean" ? !_isMobile : minWidth1200;
  const isDesktop = typeof _isMobile === "boolean" ? !_isMobile : minWidth992;
  const isTablet = typeof _isMobile === "boolean" ? !_isMobile : minWidth768;
  const isMobile = typeof _isMobile === "boolean" ? _isMobile : maxWidth768;

  const theme = useTheme();
  const [selectedTab, selectTab] = useState(
    tabs && tabs?.length ? tabs[0].id : null
  );
  const selectedItems =
    (items &&
      selectedTab &&
      items?.filter((item) => item.tab === selectedTab)) ||
    [];

  useEffect(() => {
    selectTab(tabs && tabs?.length ? tabs[0].id : null);
  }, [tabs]);
  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      <div className="position-relative py-5 d-flex u-background-melo-grey">
        <div className="container text-center">
          <div
            className="d-inline-block px-5 py-3 u-font-largest u-fontWeightBold u-text-black"
            style={{
              borderBottom: `4px solid ${theme.palette.secondary.main}`,
            }}
          >
            {value}
          </div>

          <div className="d-flex flex-wrap justify-content-center mt-3">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              {!!tabs &&
                tabs?.map((tab) => {
                  if (items?.length)
                    return (
                      <div
                        onClick={() => selectTab(tab.id)}
                        className={`px-1 mx-2 mb-2 u-fontLarge u-cursor-pointer ${
                          tab.id === selectedTab ? "u-fontWeightBold" : ""
                        }`}
                        style={{
                          borderBottom:
                            tab.id === selectedTab && tab.label
                              ? `3px solid ${theme.palette.secondary.main}`
                              : "none",
                          color:
                            tab.id === selectedTab
                              ? theme.palette.secondary.main
                              : theme.palette.text.primary,
                        }}
                      >
                        {tab.label}
                      </div>
                    );
                  return null;
                })}
            </div>
            <div
              className={`container d-flex flex-wrap px-0 mt-5 ${
                (tabs?.length &&
                  selectedItems?.length < 6 &&
                  isExtraLargeDesktop) ||
                (tabs?.length && selectedItems?.length < 4 && isDesktop) ||
                (tabs?.length && selectedItems?.length < 3 && isTablet) ||
                (tabs?.length && selectedItems?.length < 2 && isMobile)
                  ? " justify-content-center "
                  : ""
              }`}
            >
              {Boolean(tabs?.length) &&
                Boolean(selectedItems?.length) &&
                selectedItems?.map((item) => (
                  <SectionLink
                    key={`image-${item.image}`}
                    href={item.link}
                    businessAddress={businessAddress}
                    style={{ minWidth: 150, minHeight: 150 }}
                    // className="col-6 col-md-4 col-lg-3 col-xl-2 mt-2 px-1 d-block"
                    className={`mt-2 px-1 d-block ${
                      isMobile ? "col-12" : "col-6 col-md-4 col-lg-3 col-xl-2"
                    }`}
                    isExternal={isUrlExternal(item.link)}
                  >
                    <div className="w-100 h-100 object-fit-cover">
                      <LazyImage
                        src={item.image}
                        alt={item.alternative || business.revised_title}
                      />
                    </div>
                  </SectionLink>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}


export default memo(GalleryImagesType2);
