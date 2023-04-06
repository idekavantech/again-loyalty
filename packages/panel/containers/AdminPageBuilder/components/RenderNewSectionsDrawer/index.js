import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";

import { Collapse } from "react-collapse";
import {
  PAGES_TYPES_SECTIONS,
  sectionsDetails,
} from "@saas/builder/SectionRenderer/constants";

import Drawer from "@material-ui/core/Drawer";
import { sectionsLayout } from "../../constants/sectionsLayout";

function RenderNewSectionsDrawer({
  tempPage,
  theme,
  pageType,
  isNewSectionsDrawerOpen,
  toggleNewSectionsDrawer,
  tempSectionData,
  _setPage,
  _page,
  addSection,
  saveNewSectionAdded,
  newSectionLayoutsCollapse,
  setNewSectionLayoutsCollapse,
}) {
  return (
    <Drawer
      anchor="right"
      PaperProps={{
        className: "col-md-3 col-12 px-0",
        style: {
          pointerEvents: "auto",
          boxShadow: "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
        },
      }}
      BackdropProps={{
        style: { background: "transparent" },
      }}
      style={{ pointerEvents: "none" }}
      open={isNewSectionsDrawerOpen}
      onClose={() => toggleNewSectionsDrawer(false)}
    >
      <div className="w-100">
        <div
          className="d-flex justify-content-between align-items-center p-2"
          style={{
            position: "sticky",
            top: "0",
            background: "#ffffff",
            zIndex: 1,
          }}
        >
          <div style={{ fontWeight: "bold" }}>سکشن جدید</div>
          <div className="d-flex flex-row-reverse">
            <Button
              style={{
                background: hexToRGBA(theme.palette.primary.main, 0.1),
              }}
              size="medium"
              color="primary"
              variant="text"
              className="mr-2"
              onClick={saveNewSectionAdded}
            >
              افزودن
            </Button>
            <Button
              color="default"
              className="close-btn"
              onClick={() => {
                toggleNewSectionsDrawer(false);

                const tempSectionIndex = _page.data.sections_skeleton.findIndex(
                  (section) => section.temp
                );
                if (tempSectionIndex > -1) {
                  tempPage.data.sections_skeleton.splice(tempSectionIndex, 1);
                  _setPage(tempPage);
                }
              }}
            >
              بستن
            </Button>
          </div>
        </div>
        <div className="p-3">
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .new-section-card-hover:hover{
                background: #ffffff !important;
                box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px, rgb(0 0 0 / 10%) 0px 4px 8px;
              }
              `,
            }}
          ></style>
          {PAGES_TYPES_SECTIONS[pageType].map((sectionsGroup) => (
            <div className="py-3" key={sectionsGroup.name}>
              <div style={{ color: "#70767c" }}>{sectionsGroup.name}</div>
              {sectionsGroup.sections.map((section) => {
                const SectionImageIcon = sectionsDetails[section].imageIcon;
                return (
                  <div
                    key={section}
                    style={{
                      background: "#f5f6f7",
                      borderRadius: 4,
                      transition: "all 0.3s ease-in-out",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (sectionsLayout[section]) {
                        setNewSectionLayoutsCollapse({
                          [section]: Boolean(
                            !newSectionLayoutsCollapse[section]
                          ),
                        });
                      } else {
                        addSection(section);
                      }
                    }}
                    className="new-section-card-hover p-3 my-2 d-flex flex-column align-items-start justify-content-between"
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ lineHeight: "initial" }}
                    >
                      <div
                        className="ml-3 d-flex"
                        dangerouslySetInnerHTML={{ __html: SectionImageIcon }}
                      ></div>
                      <div>{sectionsDetails[section].label}</div>
                    </div>
                    <Collapse
                      theme={{
                        collapse: "w-100 ReactCollapse--collapse",
                        content: "ReactCollapse--content",
                      }}
                      isOpened={
                        sectionsLayout[section] &&
                        newSectionLayoutsCollapse[section]
                      }
                    >
                      <style
                        dangerouslySetInnerHTML={{
                          __html: `
                        .layout-card{
                          border: 1px solid rgb(224,224,224);
                          border-radius : 8px ;
                          transition: all 0.3s ease-in-out; 
                        }
                        .layout-card:hover{
                          border: 1px solid rgb(96,96,96);
                        }
                        .layout-selected {
                          border: 1px solid ${process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}; 
                          border-radius : 8px ;
                        }
                      `,
                        }}
                      ></style>
                      <div
                        className="pt-4 d-flex flex-wrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {sectionsLayout[section]?.map((layout) => {
                          return (
                            <div
                              key={layout.value}
                              style={{ width: "33%" }}
                              className="p-1"
                              onClick={() => addSection(section, layout.value)}
                            >
                              <img
                                alt=""
                                className={`w-100 ${
                                  layout.value ===
                                    tempSectionData?.customization?.layout
                                      ?.type &&
                                  newSectionLayoutsCollapse[
                                    tempSectionData?.name
                                  ] === true
                                    ? "layout-selected"
                                    : "layout-card"
                                }`}
                                src={layout.image}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Collapse>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}

export default memo(RenderNewSectionsDrawer);
