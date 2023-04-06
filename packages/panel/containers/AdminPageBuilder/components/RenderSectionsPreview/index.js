import React, { memo } from "react";

import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { sectionsDetails } from "@saas/builder/SectionRenderer/constants";

import DragIndicatorRoundedIcon from "@material-ui/icons/DragIndicatorRounded";
import Switch from "@material-ui/core/Switch";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { SECTIONS_ICONS } from "@saas/icons/SectionsIcons";

function RenderSectionsPreview({
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
  setSectionPreviewDrawerForMobile,
}) {
  return (
    <div>
      <div
        className="mt-2"
        style={{
          height: "calc(100vh - 313px)",
          boxShadow: "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
          borderRadius: "4px 4px 0 0",
          background: "#ffffff",
          overflow: "auto",
        }}
        onMouseLeave={() => clearInterval(hoverInterval)}
      >
        <div
          className="position-relative"
          onMouseEnter={() => handleHoverOnSection("navigationBar")}
          onClick={() => {
            clickedOnSection("navigationBar");
            setSectionPreviewDrawerForMobile(false);
            toggleEditSectionDrawer(true);
          }}
        >
          <div
            style={{
              fontSize: 14,
              background:
                hoveredSection === "navigationBar" ||
                clickedSection === "navigationBar"
                  ? "#f4f4f4"
                  : "unset",
              border: "unset",
              transition: "all 0.3s ease-in-out",
            }}
            className="p-3 d-flex align-items-center justify-content-between"
          >
            <div
              className="d-flex align-items-center"
              style={{ lineHeight: "initial" }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: SECTIONS_ICONS.HEADER,
                }}
                className="ml-3 d-flex"
              ></div>
              Notification bar
            </div>
            <div
              className="d-flex flex-row-reverse align-items-center"
              style={{
                transition: "all 0.3s ease-in-out",
                opacity:
                  hoveredSection === "navigationBar" ||
                  clickedSection === "navigationBar"
                    ? 1
                    : 0,
                pointerEvents:
                  hoveredSection === "navigationBar" ||
                  clickedSection === "navigationBar"
                    ? "auto"
                    : "none",
              }}
            >
              <Switch
                size="small"
                checked={navigationBarActive}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  setNavigationBarActive(e.target.checked);
                }}
                color="primary"
                inputProps={{
                  title: "active/ Inactive",
                }}
              />
            </div>
          </div>
        </div>
        <hr className="hr-normal" />
        <div
          className="position-relative"
          onMouseEnter={() => handleHoverOnSection("topPageHeader")}
          onClick={() => {
            clickedOnSection("topPageHeader");
            setSectionPreviewDrawerForMobile(false);
            toggleEditSectionDrawer(true);
          }}
        >
          <div
            style={{
              fontSize: 14,
              background:
                hoveredSection === "topPageHeader" ||
                clickedSection === "topPageHeader"
                  ? "#f4f4f4"
                  : "unset",
              border: "unset",
              transition: "all 0.3s ease-in-out",
            }}
            className="p-3 d-flex align-items-center justify-content-between"
          >
            <div
              className="d-flex align-items-center"
              style={{ lineHeight: "initial" }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: SECTIONS_ICONS.HEADER,
                }}
                className="ml-3 d-flex"
              ></div>
              The header above the page
            </div>
            <div
              className="d-flex flex-row-reverse align-items-center"
              style={{
                transition: "all 0.3s ease-in-out",
                opacity:
                  hoveredSection === "topPageHeader" ||
                  clickedSection === "topPageHeader"
                    ? 1
                    : 0,
                pointerEvents:
                  hoveredSection === "topPageHeader" ||
                  clickedSection === "topPageHeader"
                    ? "auto"
                    : "none",
              }}
            >
              <Switch
                size="small"
                checked={isTopPageHeader}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  setIsTopPageHeader(e.target.checked);
                }}
                color="primary"
                inputProps={{
                  title: "active/ Inactive",
                }}
              />
            </div>
          </div>
        </div>
        <hr className="hr-normal" />
        {HeaderComp && (
          <div
            className="position-relative"
            onMouseEnter={() => handleHoverOnSection("header")}
            onClick={() => {
              clickedOnSection("header");
              setSectionPreviewDrawerForMobile(false);
              toggleEditSectionDrawer(true);
            }}
          >
            <div
              style={{
                fontSize: 14,
                background:
                  hoveredSection === "header" || clickedSection === "header"
                    ? "#f4f4f4"
                    : "unset",
                border: "unset",
                transition: "all 0.3s ease-in-out",
              }}
              className="p-3 d-flex align-items-center justify-content-between"
            >
              <div
                className="d-flex align-items-center"
                style={{ lineHeight: "initial" }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: SECTIONS_ICONS.HEADER,
                  }}
                  className="ml-3 d-flex"
                ></div>
                Waste
              </div>
            </div>
          </div>
        )}
        <hr className="hr-normal" />
        <Menu
          id="simple-menu"
          anchorEl={moreSectionSettingsEl}
          open={Boolean(moreSectionSettingsEl) && Boolean(clickedSection)}
          onClose={() => setMoreSectionSettingsEl(null)}
        >
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setMoreSectionSettingsEl(null);
              toggleDeleteSectionPopup(true);
            }}
          >
            <div style={{ fontSize: 14 }}>Delete</div>
          </MenuItem>
          <MenuItem onClick={(e) => duplicateSection(e)}>
            <div style={{ fontSize: 14 }}>Copy</div>
          </MenuItem>
        </Menu>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {_page?.data?.sections_skeleton.map((section, index) => {
                  const id = `${section.id || "i"}-${section.name}-${index}`;
                  if (!sectionsDetails[section.name]) return null;
                  const sectionLabel = sectionsDetails[section.name].label;
                  const SectionImageIcon =
                    sectionsDetails[section.name].imageIcon;
                  return (
                    <div
                      key={section.id}
                      className="position-relative"
                      onMouseEnter={() =>
                        !snapshot.isDraggingOver
                          ? handleHoverOnSection(id)
                          : null
                      }
                      onClick={() => {
                        if (!snapshot.isDraggingOver) {
                          clickedOnSection(id);
                          toggleEditSectionDrawer(true);
                          setSectionPreviewDrawerForMobile(false);
                        }
                      }}
                    >
                      <Draggable draggableId={id} index={index} key={id}>
                        {(_provided, _snapshot) => (
                          <div
                            ref={_provided.innerRef}
                            {..._provided.draggableProps}
                          >
                            <div
                              style={{
                                fontSize: 14,
                                background: _snapshot.isDragging
                                  ? "#ffffff"
                                  : hoveredSection === id ||
                                    clickedSection === id
                                  ? "#f4f4f4"
                                  : "unset",
                                border: _snapshot.isDragging
                                  ? "1px solid #d5d9dc"
                                  : "unset",
                                transition: "all 0.3s ease-in-out",
                              }}
                              className="p-3 d-flex align-items-center justify-content-between"
                            >
                              <div
                                className="d-flex align-items-center"
                                style={{ lineHeight: "initial" }}
                              >
                                {_provided.dragHandleProps &&
                                hoveredSection === id ? (
                                  <div
                                    style={{ marginLeft: 12 }}
                                    className="dragHandle d-flex"
                                    {..._provided.dragHandleProps}
                                  >
                                    <DragIndicatorRoundedIcon
                                      style={{ maxWidth: 19, maxHeight: 19 }}
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="ml-3 d-flex"
                                    dangerouslySetInnerHTML={{
                                      __html: SectionImageIcon,
                                    }}
                                  ></div>
                                )}
                                {sectionLabel}
                              </div>
                              <div
                                className="d-flex flex-row-reverse align-items-center"
                                style={{
                                  transition: "all 0.3s ease-in-out",
                                  opacity:
                                    hoveredSection === id ||
                                    clickedSection === id
                                      ? 1
                                      : 0,
                                  pointerEvents:
                                    hoveredSection === id ||
                                    clickedSection === id
                                      ? "auto"
                                      : "none",
                                }}
                              >
                                <div>
                                  <Button
                                    color="default"
                                    style={{
                                      minWidth: "unset",
                                      padding: 0,
                                      color: "#70767c",
                                    }}
                                    className="mr-1"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      clickedOnSection(id);
                                      setMoreSectionSettingsEl(e.currentTarget);
                                      setSelectedSectionIndex(index);
                                    }}
                                  >
                                    <MoreHorizIcon />
                                  </Button>
                                </div>
                                <Switch
                                  size="small"
                                  checked={section.is_active}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  onChange={(e) => {
                                    tempPage.data.sections_skeleton[
                                      index
                                    ].is_active = e.target.checked;
                                    _setPage(tempPage);
                                  }}
                                  color="primary"
                                  inputProps={{
                                    title: "active/ Inactive",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                      <hr className="hr-normal" />
                    </div>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div
          className="position-relative"
          onMouseEnter={() => handleHoverOnSection("footer")}
          onClick={() => {
            clickedOnSection("footer");
            toggleEditSectionDrawer(true);
            setSectionPreviewDrawerForMobile(false);
          }}
        >
          <div
            style={{
              fontSize: 14,
              background:
                hoveredSection === "footer" || clickedSection === "footer"
                  ? "#f4f4f4"
                  : "unset",
              border: "unset",
              transition: "all 0.3s ease-in-out",
            }}
            className="p-3 d-flex align-items-center justify-content-between"
          >
            <div
              className="d-flex align-items-center"
              style={{ lineHeight: "initial" }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: SECTIONS_ICONS.FOOTER,
                }}
                className="ml-3 d-flex"
              ></div>
              Futury
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-5"
        style={{
          boxShadow: "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
          borderRadius: "4px 4px 0 0",
          background: "#ffffff",
        }}
      >
        <MenuItem
          style={{ fontSize: 14 }}
          className="p-3 d-flex align-items-center"
          onClick={() => {
            toggleNewSectionsDrawer(true);
          }}
        >
          <Button
            style={{
              background: hexToRGBA(theme.palette.primary.main, 0.1),
              minWidth: "unset",
            }}
            size="medium"
            color="primary"
            variant="text"
            className="p-0"
          >
            <AddRoundedIcon />
          </Button>
          <div
            className="mr-3"
            style={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
            }}
          >
            New sequel
          </div>
        </MenuItem>
      </div>
    </div>
  );
}

export default memo(RenderSectionsPreview);
