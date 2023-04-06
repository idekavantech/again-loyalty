import React, { memo } from "react";

import IconButton from "@material-ui/core/IconButton";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import Drawer from "@material-ui/core/Drawer";
import RenderSectionsPreview from "../RenderSectionsPreview";

function RenderSectionsPreviewDrawerForMobile({
  pageSetting: { hasGeneralTab, hasSeoTab, hasSocialTab },
  isSectionPreviewDrawerForMobileOpen,
  setSectionPreviewDrawerForMobile,
  tempPage,
  theme,
  hoveredSection,
  clickedSection,
  clickedOnSection,
  hoverInterval,
  toggleDeleteSectionPopup,
  moreSectionSettingsEl,
  setMoreSectionSettingsEl,
  setSelectedSectionIndex,
  toggleEditSectionDrawer,
  toggleNewSectionsDrawer,
  navigationBarActive,
  setNavigationBarActive,
  isTopPageHeader,
  setIsTopPageHeader,
  _setPage,
  _page,
  handleHoverOnSection,
  onDragEnd,
  duplicateSection,
  HeaderComp,
}) {
  return (
    <Drawer
      anchor="right"
      PaperProps={{
        className: "col-md-3 col-10 px-0",
        style: {
          pointerEvents: "auto",
          boxShadow: "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
        },
      }}
      BackdropProps={{
        style: { background: hexToRGBA("#ffffff", 0.8) },
      }}
      style={{ pointerEvents: "none" }}
      open={isSectionPreviewDrawerForMobileOpen}
      onClose={() => setSectionPreviewDrawerForMobile(false)}
    >
      <div
        className="w-100 position-relative h-100 d-flex flex-column"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="p-3">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              position: "sticky",
              top: "0",
              background: "#ffffff",
              zIndex: 1,
            }}
          >
            <div style={{ color: "#adb1b5", fontWeight: "bold" }}>سکشن‌ها</div>
            <div>
              <IconButton
                disabled={
                  hasGeneralTab === false &&
                  hasSeoTab === false &&
                  hasSocialTab === false
                }
                color="default"
                style={{
                  background: "#ffffff",
                  borderRadius: 4,
                  boxShadow:
                    "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
                }}
                onClick={() => setSectionPreviewDrawerForMobile(false)}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            </div>
          </div>

          <RenderSectionsPreview
            tempPage={tempPage}
            theme={theme}
            hoveredSection={hoveredSection}
            clickedSection={clickedSection}
            clickedOnSection={clickedOnSection}
            hoverInterval={hoverInterval}
            toggleDeleteSectionPopup={toggleDeleteSectionPopup}
            moreSectionSettingsEl={moreSectionSettingsEl}
            setMoreSectionSettingsEl={setMoreSectionSettingsEl}
            setSelectedSectionIndex={setSelectedSectionIndex}
            toggleEditSectionDrawer={toggleEditSectionDrawer}
            toggleNewSectionsDrawer={toggleNewSectionsDrawer}
            navigationBarActive={navigationBarActive}
            setNavigationBarActive={setNavigationBarActive}
            isTopPageHeader={isTopPageHeader}
            setIsTopPageHeader={setIsTopPageHeader}
            _setPage={_setPage}
            _page={_page}
            handleHoverOnSection={handleHoverOnSection}
            onDragEnd={onDragEnd}
            duplicateSection={duplicateSection}
            HeaderComp={HeaderComp}
            setSectionPreviewDrawerForMobile={setSectionPreviewDrawerForMobile}
          />
        </div>
      </div>
    </Drawer>
  );
}

export default memo(RenderSectionsPreviewDrawerForMobile);
