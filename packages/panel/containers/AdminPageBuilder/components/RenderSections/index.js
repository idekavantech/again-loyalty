import React, { memo } from "react";

import { sectionsDetails } from "@saas/builder/SectionRenderer/constants";

import AspectRatioRoundedIcon from "@material-ui/icons/AspectRatioRounded";
import { FOOTER_VISIBILITY } from "@saas/utils/constants/footerConstants";
import { MOBILE_MODE } from "../../usePageBuilder";

function RenderSections({
  tempPage,
  theme,
  isMobile,
  viewMode,
  pageRef,
  hoveredSection,
  clickedSection,
  clickedOnSection,
  selectedItemIndex,
  toggleEditSectionDrawer,
  isNewSectionsDrawerOpen,
  toggleNewSectionsDrawer,
  headerConfig,
  footerConfig,
  navigationBarActive,
  navigationBarConfig,
  topPageHeaderConfig,
  isTopPageHeader,
  _setPage,
  themeColor,
  urlPrefix,
  business,
  _page,
  callToActions,
  handleHoverOnSection,
  HeaderComp,
  FooterComp,
  NavigationComp,
  TopPageHeaderComp,
  headerHeight,
  setSectionPreviewDrawerForMobile,
}) {
  const _FOOTER_VISIBILITY =
    footerConfig &&
    footerConfig.customization &&
    footerConfig.customization.presentation[FOOTER_VISIBILITY];

  return (
    <div
      className="w-100 h-100 text-center"
      style={{ overflow: "auto", scrollBehavior: "smooth" }}
      ref={pageRef}
      id="sections_container"
    >
      {NavigationComp && navigationBarActive && (
        <div className="position-relative">
          <NavigationComp
            {...navigationBarConfig}
            navigationBarActive
            business={business}
            urlPrefix={urlPrefix}
            isMobile={isMobile || viewMode === MOBILE_MODE}
            isEditMode
          />
          <SectionPreviewBorderWrapper
            clickedSection={clickedSection}
            renderSection={"نوار اعلانات"}
            id={"navigationBar"}
            theme={theme}
            style={{ minHeight: 40, top: 0, zIndex: 1001 }}
            hoveredSection={hoveredSection}
            onMouseEnter={() => handleHoverOnSection("navigationBar", true)}
            onMouseLeave={() => handleHoverOnSection(null, true)}
            onClick={() => {
              clickedOnSection("navigationBar");
              handleHoverOnSection("navigationBar");
              setSectionPreviewDrawerForMobile(false);
              toggleEditSectionDrawer(true);
            }}
          />
        </div>
      )}
      {TopPageHeaderComp && isTopPageHeader && (
        <div className="position-relative">
          <TopPageHeaderComp
            {...topPageHeaderConfig}
            business={business}
            isMobile={isMobile || viewMode === MOBILE_MODE}
            isEditMode
          />
          <SectionPreviewBorderWrapper
            clickedSection={clickedSection}
            renderSection={"هدر بالای صفحه"}
            id={"topPageHeader"}
            theme={theme}
            style={{ minHeight: 40, top: 0, zIndex: 1001 }}
            hoveredSection={hoveredSection}
            onMouseEnter={() => handleHoverOnSection("topPageHeader", true)}
            onMouseLeave={() => handleHoverOnSection(null, true)}
            onClick={() => {
              clickedOnSection("topPageHeader");
              handleHoverOnSection("topPageHeader");
              setSectionPreviewDrawerForMobile(false);
              toggleEditSectionDrawer(true);
            }}
          />
        </div>
      )}
      {HeaderComp && (
        <div className="position-relative">
          <HeaderComp
            {...headerConfig}
            selectedItemIndex={selectedItemIndex}
            isMobile={isMobile || viewMode === MOBILE_MODE}
            isEditMode
          />
          <SectionPreviewBorderWrapper
            clickedSection={clickedSection}
            renderSection={"هدر"}
            id={"header"}
            theme={theme}
            style={{ minHeight: headerHeight, top: 0 }}
            hoveredSection={hoveredSection}
            onMouseEnter={() => handleHoverOnSection("header", true)}
            onMouseLeave={() => handleHoverOnSection(null, true)}
            onClick={() => {
              clickedOnSection("header");
              handleHoverOnSection("header");
              setSectionPreviewDrawerForMobile(false);
              toggleEditSectionDrawer(true);
            }}
          />
        </div>
      )}
      {_page?.data?.sections_skeleton.map((section, index) => {
        const id = `${section.id || "i"}-${section.name}-${index}`;
        if (!sectionsDetails[section.name] || !section.is_active) return null;
        const SectionComponent = sectionsDetails[section.name].component;
        return (
          <div
            key={id}
            className="position-relative"
            id={id}
            onMouseEnter={() => handleHoverOnSection(id, true)}
            onMouseLeave={() => handleHoverOnSection(null, true)}
            onClick={() => {
              if (section.temp) {
                delete tempPage.data.sections_skeleton[index].temp;
                _setPage(tempPage);
                toggleNewSectionsDrawer(false);
              }
              clickedOnSection(id);
              handleHoverOnSection(id);
              setSectionPreviewDrawerForMobile(false);
              toggleEditSectionDrawer(true);
            }}
          >
            <SectionPreviewBorderWrapper
              clickedSection={clickedSection}
              renderSection={sectionsDetails[section.name].label}
              id={id}
              theme={theme}
              hoveredSection={hoveredSection}
            />
            <SectionComponent
              business={business}
              themeColor={themeColor}
              {...section}
              selectedItemIndex={selectedItemIndex}
              isActive={section.is_active}
              isEditMode
              isMobile={isMobile || viewMode === MOBILE_MODE}
              callToActions={callToActions}
            />
          </div>
        );
      })}
      {isNewSectionsDrawerOpen &&
      _page &&
      _page.data &&
      (!_page.data.sections_skeleton.length ||
        !_page.data.sections_skeleton[_page.data.sections_skeleton.length - 1]
          .temp) ? (
        <div className="position-relative" id="new-section-placeholder">
          <div
            className="w-100 h-100 position-absolute"
            style={{
              border: `3px solid ${theme.palette.primary.main}`,
              opacity: 1,
              transition: "all 0.3s ease-in-out",
              zIndex: 1000,
            }}
          ></div>
          <div
            style={{
              height: 430,
              fontSize: 12,
              color: "#adb1b5",
              fontWeight: "bold",
              background: "#f5f6f7",
            }}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <div>
              <AspectRatioRoundedIcon fontSize="large" />
            </div>
            <div className="mt-3">
              لطفا یک سکشن از لیست سکشن‌ها انتخاب کنید.
            </div>
          </div>
        </div>
      ) : null}
      {FooterComp && _FOOTER_VISIBILITY && (
        <div
          className="position-relative"
          id="footer"
          onMouseEnter={() => handleHoverOnSection("footer", true)}
          onMouseLeave={() => handleHoverOnSection(null, true)}
          onClick={() => {
            clickedOnSection("footer");
            handleHoverOnSection("footer");
            setSectionPreviewDrawerForMobile(false);
            toggleEditSectionDrawer(true);
          }}
        >
          <FooterComp
            {...footerConfig}
            selectedItemIndex={selectedItemIndex}
            isMobile={isMobile || viewMode === MOBILE_MODE}
          />
          <SectionPreviewBorderWrapper
            clickedSection={clickedSection}
            renderSection={"فوتر"}
            id={"footer"}
            theme={theme}
            style={{ minHeight: 40, top: 0, zIndex: 1000 }}
            hoveredSection={hoveredSection}
          />
        </div>
      )}
    </div>
  );
}

const SectionPreviewBorderWrapper = ({
  wrapperProps,
  id,
  theme,
  clickedSection,
  hoveredSection,
  renderSection,
  style,
  ...rest
}) => {
  return (
    <div
      className="w-100 h-100 position-absolute"
      style={{
        border: `3px solid ${theme.palette.primary.main}`,
        opacity: hoveredSection === id || clickedSection === id ? 1 : 0,
        transition: "all 0.3s ease-in-out",
        zIndex: 1000,
        ...style,
      }}
      {...rest}
    >
      <div className="position-relative w-100 h-100">
        <div
          style={{
            background: theme.palette.primary.main,
            color: "#ffffff",
            display: "inline-block",
            top: 0,
            right: 0,
            transition: "all 0.3s ease-in-out",
            opacity: clickedSection === id ? 0 : 1,
          }}
          className="p-1 position-absolute"
          {...wrapperProps}
        >
          {renderSection}
        </div>
      </div>
    </div>
  );
};

export default memo(RenderSections);
