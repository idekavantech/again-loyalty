import React, { memo, useEffect, useMemo, useState } from "react";
import Button from "@material-ui/core/Button";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Drawer from "@material-ui/core/Drawer";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { sectionsConfigTabs } from "./constants/configTabs";
import FieldRenderer from "./FieldRenderer";
import useTheme from "@material-ui/core/styles/useTheme";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { Collapse } from "react-collapse";
import {
  BLOG_PAGE_TYPE,
  NORMAL_PAGE_TYPE,
  sectionsDetails,
} from "@saas/builder/SectionRenderer/constants";
import { useRouter } from "next/router";

const dependencyChecker = (
  { section, tab, item, field, item_index, sectionConfigTabs },
  is_item = false,
  is_tab = false
) => {
  if (is_tab) {
    return (
      !tab.dependencies ||
      tab.dependencies.every((dependency) =>
        Object.entries(dependency.fields).every(([key, value]) => {
          const dependencyValueInSection =
            section[dependency.tab || tab.key]?.[dependency.item || item.key]?.[
              key
            ];
          const dependencyDefaultValue = sectionConfigTabs
            .find((_tab) => _tab.key === (dependency.tab || tab.key))
            ?.items.find((_item) => _item.key === (dependency.item || item.key))
            ?.fields.find((_field) => _field.key === key)?.default_value;
          const dependencyValue =
            typeof dependencyValueInSection === "undefined"
              ? dependencyDefaultValue
              : dependencyValueInSection;

          return typeof value === "object"
            ? value.includes(dependencyValue)
            : dependencyValue === value;
        })
      )
    );
  }
  if (is_item) {
    return (
      !item.dependencies ||
      item.dependencies.every((dependency) =>
        Object.entries(dependency.fields).every(([key, value]) => {
          const dependencyValueInSection =
            section[dependency.tab || tab.key]?.[dependency.item || item.key]?.[
              key
            ];
          const dependencyDefaultValue = sectionConfigTabs
            .find((_tab) => _tab.key === (dependency.tab || tab.key))
            ?.items.find((_item) => _item.key === (dependency.item || item.key))
            ?.fields.find((_field) => _field.key === key)?.default_value;
          const dependencyValue =
            typeof dependencyValueInSection === "undefined"
              ? dependencyDefaultValue
              : dependencyValueInSection;

          return typeof value === "object"
            ? value.includes(dependencyValue)
            : dependencyValue === value;
        })
      )
    );
  }

  if (typeof item_index === "number") {
    return (
      !field.dependencies ||
      field.dependencies.every((dependency, index) =>
        Object.entries(dependency.fields).every(([key, value]) => {
          let dependencyValueInSection =
            section[dependency.tab || tab.key]?.[dependency.item || item.key]
              ?.items?.[item_index]?.[key];
          let dependencyDefaultValue = sectionConfigTabs
            .find((_tab) => _tab.key === (dependency.tab || tab.key))
            ?.items.find((_item) => _item.key === (dependency.item || item.key))
            ?.default_items?.[item_index]?.[key];
          let dependencyValue =
            typeof dependencyValueInSection === "undefined"
              ? dependencyDefaultValue
              : dependencyValueInSection;

          if (typeof dependencyValue === "undefined") {
            dependencyValueInSection =
              section[field.dependencies[index].tab || tab.key]?.[
                field.dependencies[index].item || item.key
              ]?.[key];
            dependencyDefaultValue = sectionConfigTabs
              .find(
                (_tab) =>
                  _tab.key === (field.dependencies[index].tab || tab.key)
              )
              ?.items.find(
                (_item) =>
                  _item.key === (field.dependencies[index].item || item.key)
              )
              ?.fields.find((_field) => _field.key === key)?.default_value;

            dependencyValue =
              typeof dependencyValueInSection === "undefined"
                ? dependencyDefaultValue
                : dependencyValueInSection;
          }

          return typeof value === "object"
            ? value.includes(dependencyValue)
            : dependencyValue === value;
        })
      )
    );
  }
  return (
    !field.dependencies ||
    field.dependencies.every((dependency, index) =>
      Object.entries(dependency.fields).every(([key, value]) => {
        const dependencyValueInSection =
          section[field.dependencies[index].tab || tab.key]?.[
            field.dependencies[index].item || item.key
          ]?.[key];
        const dependencyDefaultValue = sectionConfigTabs
          .find(
            (_tab) => _tab.key === (field.dependencies[index].tab || tab.key)
          )
          ?.items.find(
            (_item) =>
              _item.key === (field.dependencies[index].item || item.key)
          )
          ?.fields.find((_field) => _field.key === key)?.default_value;

        const dependencyValue =
          typeof dependencyValueInSection === "undefined"
            ? dependencyDefaultValue
            : dependencyValueInSection;
        return typeof value === "object"
          ? value.includes(dependencyValue)
          : dependencyValue === value;
      })
    )
  );
};
const EditSectionDrawer = ({
  page,
  isEditSectionDrawerOpen,
  toggleEditSectionDrawer,
  clickedSection,
  saveChanges,
  setPage,
  deleteSection,
  headerConfig,
  setHeaderConfig,
  footerConfig,
  setFooterConfig,
  saveHeaderChanges,
  saveFooterChanges,
  navigationBarConfig,
  setNavigationBarConfig,
  topPageHeaderConfig,
  setTopPageHeaderConfig,
  saveTopPageHeaderChanges,
  saveNavigationBarChanges,
  isMobile,
  changeSelectedItemIndex,
  clickedOnSection,
  confirmExitPageBuilder,
}) => {
  const [isDisable, setDisable] = useState(false);
  const [expandedTab, expandTab] = useState(null);
  const [expandedItem, expandItem] = useState(null);
  const [expandedItemsId, expandItemsId] = useState(null);
  const [isDeleteSectionOpen, toggleDeleteSection] = useState(false);
  const router = useRouter();
  const pageType = router.query.plugin
    ? router.query.id
    : page?.data?.is_blog
    ? BLOG_PAGE_TYPE
    : NORMAL_PAGE_TYPE;
  const sectionsConfig =
    sectionsConfigTabs[pageType] || sectionsConfigTabs[NORMAL_PAGE_TYPE];
  const theme = useTheme();

  const isHeader = clickedSection === "header";
  const isFooter = clickedSection === "footer";
  const isNavigationBar = clickedSection === "navigationBar";
  const isTopPageHeader = clickedSection === "topPageHeader";
  const isSectionAllowedToDelete =
    clickedSection &&
    !clickedSection.includes("shopping_products") &&
    !clickedSection.includes("shopping_product_detail");
  const sectionIndex =
    !isHeader &&
    !isFooter &&
    !isNavigationBar &&
    !isTopPageHeader &&
    page?.data?.sections_skeleton.findIndex(
      (_s, i) => clickedSection === `${_s.id || "i"}-${_s.name}-${i}`
    );
  const section = useMemo(
    () =>
      typeof sectionIndex === "number" && sectionIndex > -1
        ? page.data.sections_skeleton[sectionIndex]
        : isHeader
        ? headerConfig
        : isFooter
        ? footerConfig
        : isNavigationBar
        ? navigationBarConfig
        : isTopPageHeader
        ? topPageHeaderConfig
        : null,
    [
      sectionIndex,
      page?.data?.sections_skeleton,
      isHeader,
      headerConfig,
      isFooter,
      footerConfig,
      isNavigationBar,
      navigationBarConfig,
      isTopPageHeader,
      topPageHeaderConfig,
    ]
  );

  const updateSection = ({ tab, item, field, value, items_index }) => {
    let config;
    let setConfig;
    if (isHeader) {
      config = headerConfig;
      setConfig = setHeaderConfig;
    } else if (isFooter) {
      config = footerConfig;
      setConfig = setFooterConfig;
    } else if (isNavigationBar) {
      config = navigationBarConfig;
      setConfig = setNavigationBarConfig;
    } else if (isTopPageHeader) {
      config = topPageHeaderConfig;
      setConfig = setTopPageHeaderConfig;
    } else {
      const tempPage = JSON.parse(JSON.stringify(page));
      if (!tempPage.data.sections_skeleton[sectionIndex][tab]) {
        tempPage.data.sections_skeleton[sectionIndex][tab] = {};
      }
      if (tab && item && field) {
        if (typeof items_index === "number" && items_index !== -1) {
          if (!tempPage.data.sections_skeleton[sectionIndex][tab][item]) {
            tempPage.data.sections_skeleton[sectionIndex][tab][item] = {
              items: {},
            };
          }
          tempPage.data.sections_skeleton[sectionIndex][tab][item].items[
            items_index
          ][field] = value;
        } else {
          if (!tempPage.data.sections_skeleton[sectionIndex][tab][item]) {
            tempPage.data.sections_skeleton[sectionIndex][tab][item] = {};
          }
          tempPage.data.sections_skeleton[sectionIndex][tab][item][field] =
            value;
        }
        setPage(tempPage);
      }
    }
    if (config && setConfig) {
      const _config = JSON.parse(JSON.stringify(config));
      if (!_config[tab]) {
        _config[tab] = {};
      }
      if (tab && item && field) {
        if (typeof items_index === "number" && items_index !== -1) {
          if (!_config[tab][item]) {
            _config[tab][item] = { items: {} };
          }
          _config[tab][item].items[items_index][field] = value;
        } else {
          if (!_config[tab][item]) {
            _config[tab][item] = {};
          }
          _config[tab][item][field] = value;
        }
        setConfig(_config);
      }
    }
  };
  const addNewItem = (_tab, _item, fields) => {
    let config;
    let setConfig;
    if (isHeader) {
      config = headerConfig;
      setConfig = setHeaderConfig;
    } else if (isFooter) {
      config = footerConfig;
      setConfig = setFooterConfig;
    } else if (isNavigationBar) {
      config = navigationBarConfig;
      setConfig = setNavigationBarConfig;
    } else if (isTopPageHeader) {
      config = topPageHeaderConfig;
      setConfig = setTopPageHeaderConfig;
    } else {
      const tempPage = JSON.parse(JSON.stringify(page));
      if (_tab && _item) {
        if (!tempPage.data.sections_skeleton[sectionIndex][_tab][_item].items)
          tempPage.data.sections_skeleton[sectionIndex][_tab][_item].items = [];

        tempPage.data.sections_skeleton[sectionIndex][_tab][_item].items?.push(
          {}
        );
        const itemsLength =
          tempPage.data.sections_skeleton[sectionIndex][_tab][_item].items
            .length;
        fields.forEach((field) => {
          tempPage.data.sections_skeleton[sectionIndex][_tab][_item].items[
            itemsLength - 1
          ][field.key] = field.default_value || null;
        });
        setPage(tempPage);
      }
    }

    if (config && setConfig) {
      const _config = JSON.parse(JSON.stringify(config));
      if (_tab && _item) {
        _config[_tab][_item].items.push({});
        const itemsLength = _config[_tab][_item].items.length;
        fields.forEach((field) => {
          _config[_tab][_item].items[itemsLength - 1][field.key] =
            field.default_value || null;
        });
        setConfig(_config);
      }
    }
  };
  const removeItem = (_tab, _item, index) => {
    let config;
    let setConfig;
    if (isHeader) {
      config = headerConfig;
      setConfig = setHeaderConfig;
    } else if (isFooter) {
      config = footerConfig;
      setConfig = setFooterConfig;
    } else if (isNavigationBar) {
      config = navigationBarConfig;
      setConfig = setNavigationBarConfig;
    } else if (isTopPageHeader) {
      config = topPageHeaderConfig;
      setConfig = setTopPageHeaderConfig;
    } else {
      const tempPage = JSON.parse(JSON.stringify(page));
      if (_tab && _item) {
        tempPage.data.sections_skeleton[sectionIndex][_tab][_item].items.splice(
          index,
          1
        );
        setPage(tempPage);
      }
    }

    if (config && setConfig) {
      const _config = JSON.parse(JSON.stringify(config));
      if (_tab && _item) {
        _config[_tab][_item].items.splice(index, 1);
        setConfig(_config);
      }
    }
  };
  const sectionLabel = useMemo(
    () =>
      isHeader
        ? "Waste"
        : isFooter
        ? "Futury"
        : isNavigationBar
        ? "Notification bar"
        : isTopPageHeader
        ? "The header above the page"
        : section && sectionsDetails[section.name].label,
    [isHeader, isFooter, section, isNavigationBar, isTopPageHeader]
  );
  const sectionName = useMemo(
    () =>
      isHeader
        ? "header"
        : isFooter
        ? "footer"
        : isNavigationBar
        ? "navigationBar"
        : isTopPageHeader
        ? "topPageHeader"
        : section && section.name,
    [isHeader, isFooter, section, isNavigationBar, isTopPageHeader]
  );

  useEffect(() => {
    if (typeof expandedItemsId === "number") {
      changeSelectedItemIndex(expandedItemsId - 1);
    } else {
      changeSelectedItemIndex(null);
    }
  }, [expandedItemsId]);

  useEffect(() => {
    if (expandedTab) {
      expandTab(null);
    }
  }, [isEditSectionDrawerOpen]);

  return (
    <Drawer
      id="edit-section-drawer"
      anchor={isMobile ? "bottom" : "right"}
      PaperProps={{
        className: "col-md-3 col-12 px-0",
        style: {
          pointerEvents: "auto",
          boxShadow: "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
          height: isMobile ? "60vh" : "",
        },
      }}
      BackdropProps={{
        style: { background: "transparent" },
      }}
      style={{ pointerEvents: "none" }}
      open={isEditSectionDrawerOpen}
      onClose={() => toggleEditSectionDrawer(false)}
    >
      {section || isHeader || isFooter || isNavigationBar || isTopPageHeader ? (
        <div
          className="w-100 position-relative h-100 d-flex flex-column"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div
            className="d-flex justify-content-between align-items-center p-2"
            style={{
              position: "sticky",
              top: "0",
              background: "#ffffff",
              zIndex: 1,
            }}
          >
            <div style={{ fontWeight: "bold", maxWidth: "50%" }}>
              {sectionLabel}
            </div>
            <div>
              <Button
                color="default"
                className="close-btn"
                onClick={() => {
                  toggleEditSectionDrawer(false);
                  clickedOnSection(null);
                }}
              >
                to close
              </Button>
              <Button
                style={{
                  background: hexToRGBA(theme.palette.primary.main, 0.1),
                }}
                size="medium"
                color="primary"
                variant="text"
                className="mr-2"
                disabled={isDisable}
                onClick={() => {
                  if (isHeader) {
                    saveHeaderChanges();
                  } else if (isFooter) {
                    saveFooterChanges();
                  } else if (isNavigationBar) {
                    saveNavigationBarChanges();
                  } else if (isTopPageHeader) {
                    saveTopPageHeaderChanges();
                  } else {
                    saveChanges();
                  }
                  toggleEditSectionDrawer(false);
                }}
              >
                Store
              </Button>
            </div>
          </div>
          <div className="p-3 flex-1">
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .section-config-tab:hover{
                    background: #ffffff !important;
                    box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px, rgb(0 0 0 / 10%) 0px 4px 8px;
                  }
                  .MuiAccordionSummary-content.Mui-expanded{
                    margin:0;
                  }
                  .MuiAccordionSummary-root.Mui-expanded{
                    min-height: 48px;
                  }
                  .MuiAccordion-root.Mui-expanded{
                    margin: 12px 0;
                  }
                  .MuiAccordionSummary-expandIcon{
                    padding: 0
                  }
                  .MuiAccordion-root:before{
                    background-color: unset;
                  }
                  .child-accordion{
                    border-right: 2px solid white;
                  }
                  .MuiAccordion-root.Mui-expanded.child-accordion{
                    border-right: 2px solid ${theme.palette.primary.main};
                  }
                  `,
              }}
            ></style>
            {sectionsConfig[sectionName] &&
              sectionsConfig[sectionName].map((tab) =>
                dependencyChecker(
                  {
                    tab,
                    section,
                    sectionConfigTabs: sectionsConfig[sectionName],
                  },
                  false,
                  true
                ) ? (
                  <Accordion
                    elevation={0}
                    id={tab.id}
                    key={tab.id}
                    className="my-3 section-config-tab"
                    square
                    expanded={expandedTab === tab.id}
                    onClick={() =>
                      expandTab(
                        expandedTab && expandedTab === tab.id ? null : tab.id
                      )
                    }
                    style={{
                      borderRadius: 4,
                      transition: "all 0.3s ease-in-out",
                      minHeight: "unset",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      className="px-3"
                      style={{ fontWeight: "bold" }}
                    >
                      {tab.label}
                    </AccordionSummary>
                    <AccordionDetails className="p-0 d-block">
                      {tab.items &&
                        tab.items.map((item) =>
                          dependencyChecker(
                            {
                              tab,
                              section,
                              item,
                              sectionConfigTabs: sectionsConfig[sectionName],
                            },
                            true
                          ) ? (
                            <div
                              key={item.id}
                              style={{
                                borderTop: "1px solid #eeeeee",
                              }}
                            >
                              <Accordion
                                elevation={0}
                                id={item.id}
                                className="child-accordion"
                                square
                                expanded={expandedItem === item.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  expandItem(
                                    expandedItem && expandedItem === item.id
                                      ? null
                                      : item.id
                                  );
                                }}
                                style={{
                                  boxShadow: "none",
                                  minHeight: "unset",
                                  color: "#323b43",
                                  borderRadius: 0,
                                  transition: "all 0.3s ease-in-out",
                                }}
                              >
                                <AccordionSummary
                                  className="px-3"
                                  expandIcon={<ExpandMoreIcon />}
                                >
                                  {item.label}
                                </AccordionSummary>
                                <AccordionDetails
                                  className="px-3 py-0 d-block"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {item.fields &&
                                    (item.has_multiple_items ? (
                                      <div className="pb-3">
                                        {item.fields.map((field) => {
                                          if (
                                            dependencyChecker({
                                              field,
                                              section,
                                              tab,
                                              item,
                                              sectionConfigTabs:
                                                sectionsConfig[sectionName],
                                            })
                                          ) {
                                            const dependencyDefaultValue =
                                              sectionsConfig[sectionName]
                                                .find(
                                                  (_tab) => _tab.key === tab.key
                                                )
                                                ?.items.find(
                                                  (_item) =>
                                                    _item.key === item.key
                                                )
                                                ?.fields.find(
                                                  (_field) =>
                                                    _field.key === field.key
                                                )?.default_value;

                                            const fieldValue =
                                              typeof section[tab.key]?.[
                                                item.key
                                              ]?.[field.key] === "undefined"
                                                ? dependencyDefaultValue
                                                : section[tab.key]?.[
                                                    item.key
                                                  ]?.[field.key];
                                            return (
                                              <div
                                                className="mb-3 mt-2"
                                                key={field.id}
                                              >
                                                <div>
                                                  <FieldRenderer
                                                    sectionIndex={sectionIndex}
                                                    value={fieldValue}
                                                    confirmExitPageBuilder={
                                                      confirmExitPageBuilder
                                                    }
                                                    setValue={(value) =>
                                                      updateSection({
                                                        tab: tab.key,
                                                        item: item.key,
                                                        field: field.key,
                                                        value,
                                                      })
                                                    }
                                                    customOptions={
                                                      field.custom_options_config &&
                                                      section[
                                                        field
                                                          .custom_options_config
                                                          .tab_key
                                                      ]?.[
                                                        field
                                                          .custom_options_config
                                                          .item_key
                                                      ] &&
                                                      (typeof field
                                                        .custom_options_config
                                                        .items_index ===
                                                      "number"
                                                        ? section[
                                                            field
                                                              .custom_options_config
                                                              .tab_key
                                                          ][
                                                            field
                                                              .custom_options_config
                                                              .item_key
                                                          ].items[
                                                            field
                                                              .custom_options_config
                                                              .items_index
                                                          ][
                                                            field
                                                              .custom_options_config
                                                              .field_key
                                                          ]
                                                        : section[
                                                            field
                                                              .custom_options_config
                                                              .tab_key
                                                          ][
                                                            field
                                                              .custom_options_config
                                                              .item_key
                                                          ][
                                                            field
                                                              .custom_options_config
                                                              .field_key
                                                          ])
                                                    }
                                                    field={field}
                                                    setDisable={setDisable}
                                                  />
                                                </div>
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}
                                        {section?.[tab.key]?.[
                                          item.key
                                        ]?.items?.map((_item, index) => (
                                          <Accordion
                                            elevation={0}
                                            id={_item.id}
                                            key={_item.id}
                                            className="child-accordion"
                                            square
                                            expanded={
                                              expandedItemsId === index + 1
                                            }
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              expandItemsId(
                                                expandedItemsId &&
                                                  expandedItemsId === index + 1
                                                  ? null
                                                  : index + 1
                                              );
                                            }}
                                            style={{
                                              boxShadow: "none",
                                              minHeight: "unset",
                                              color: "#323b43",
                                              borderRadius: 0,
                                              transition:
                                                "all 0.3s ease-in-out",
                                            }}
                                          >
                                            <AccordionSummary
                                              className="px-3"
                                              expandIcon={<ExpandMoreIcon />}
                                            >
                                              item{" "}
                                              {englishNumberToPersianNumber(
                                                index + 1
                                              )}
                                            </AccordionSummary>
                                            <AccordionDetails
                                              className="px-3 py-0 d-block"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <div
                                                key={_item.id}
                                                className="py-2"
                                                style={{
                                                  borderTop:
                                                    index > 0
                                                      ? "1px solid #eeeeee"
                                                      : "",
                                                }}
                                              >
                                                {item.items_fields.map(
                                                  (field) => {
                                                    if (
                                                      dependencyChecker({
                                                        item_index: index,
                                                        field,
                                                        tab,
                                                        section,
                                                        item,
                                                        sectionConfigTabs:
                                                          sectionsConfig[
                                                            sectionName
                                                          ],
                                                      })
                                                    ) {
                                                      const dependencyDefaultValue =
                                                        sectionsConfig[
                                                          sectionName
                                                        ]
                                                          .find(
                                                            (_tab) =>
                                                              _tab.key ===
                                                              tab.key
                                                          )
                                                          ?.items.find(
                                                            (_item) =>
                                                              _item.key ===
                                                              item.key
                                                          )?.default_items?.[
                                                          index
                                                        ]?.[field.key];
                                                      const fieldValue =
                                                        typeof section[
                                                          tab.key
                                                        ]?.[item.key].items[
                                                          index
                                                        ]?.[field.key] ===
                                                        "undefined"
                                                          ? dependencyDefaultValue
                                                          : section[tab.key]?.[
                                                              item.key
                                                            ].items[index]?.[
                                                              field.key
                                                            ];
                                                      return (
                                                        <div
                                                          className="mb-3 mt-2"
                                                          key={field.id}
                                                        >
                                                          <div>
                                                            <FieldRenderer
                                                              confirmExitPageBuilder={
                                                                confirmExitPageBuilder
                                                              }
                                                              sectionIndex={
                                                                sectionIndex
                                                              }
                                                              value={fieldValue}
                                                              setValue={(
                                                                value
                                                              ) =>
                                                                updateSection({
                                                                  tab: tab.key,
                                                                  item: item.key,
                                                                  items_index:
                                                                    index,
                                                                  field:
                                                                    field.key,
                                                                  value,
                                                                })
                                                              }
                                                              customOptions={
                                                                field.custom_options_config &&
                                                                section[
                                                                  field
                                                                    .custom_options_config
                                                                    .tab_key
                                                                ] &&
                                                                section[
                                                                  field
                                                                    .custom_options_config
                                                                    .tab_key
                                                                ][
                                                                  field
                                                                    .custom_options_config
                                                                    .item_key
                                                                ] &&
                                                                (typeof field
                                                                  .custom_options_config
                                                                  .items_index ===
                                                                "number"
                                                                  ? section[
                                                                      field
                                                                        .custom_options_config
                                                                        .tab_key
                                                                    ][
                                                                      field
                                                                        .custom_options_config
                                                                        .item_key
                                                                    ].items[
                                                                      field
                                                                        .custom_options_config
                                                                        .items_index
                                                                    ][
                                                                      field
                                                                        .custom_options_config
                                                                        .field_key
                                                                    ]
                                                                  : section[
                                                                      field
                                                                        .custom_options_config
                                                                        .tab_key
                                                                    ][
                                                                      field
                                                                        .custom_options_config
                                                                        .item_key
                                                                    ][
                                                                      field
                                                                        .custom_options_config
                                                                        .field_key
                                                                    ])
                                                              }
                                                              field={field}
                                                              setDisable={
                                                                setDisable
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                      );
                                                    }
                                                    return null;
                                                  }
                                                )}
                                                {section?.[tab.key]?.[item.key]
                                                  ?.items.length > 1 &&
                                                section[tab.key] &&
                                                section[tab.key][item.key] &&
                                                (typeof item.min_item ===
                                                  "undefined" ||
                                                  item.min_item <
                                                    section[tab.key][item.key]
                                                      .length) ? (
                                                  <Button
                                                    style={{
                                                      color:
                                                        theme.palette.error
                                                          .main,
                                                      borderColor:
                                                        theme.palette.error
                                                          .main,
                                                    }}
                                                    variant="outlined"
                                                    className="w-100"
                                                    size="small"
                                                    onClick={() => {
                                                      removeItem(
                                                        tab.key,
                                                        item.key,
                                                        index
                                                      );
                                                    }}
                                                  >
                                                    Delete
                                                  </Button>
                                                ) : null}
                                              </div>
                                            </AccordionDetails>
                                          </Accordion>
                                        ))}
                                        {section[tab.key] &&
                                        section[tab.key][item.key] &&
                                        (typeof item.max_items ===
                                          "undefined" ||
                                          item.max_items >
                                            section[tab.key][item.key].items
                                              .length) &&
                                        item.extendable_items ? (
                                          <Button
                                            color="primary"
                                            variant="contained"
                                            className="w-100"
                                            size="small"
                                            onClick={() =>
                                              addNewItem(
                                                tab.key,
                                                item.key,
                                                item.items_fields
                                              )
                                            }
                                          >
                                            {item.add_new_item_text}
                                          </Button>
                                        ) : null}
                                      </div>
                                    ) : (
                                      item.fields.map((field) => {
                                        if (
                                          dependencyChecker({
                                            field,
                                            section,
                                            tab,
                                            item,
                                            sectionConfigTabs:
                                              sectionsConfig[sectionName],
                                          })
                                        ) {
                                          const dependencyDefaultValue =
                                            sectionsConfig[sectionName]
                                              .find(
                                                (_tab) => _tab.key === tab.key
                                              )
                                              ?.items.find(
                                                (_item) =>
                                                  _item.key === item.key
                                              )
                                              ?.fields.find(
                                                (_field) =>
                                                  _field.key === field.key
                                              )?.default_value;

                                          const fieldValue =
                                            typeof section[tab.key]?.[
                                              item.key
                                            ]?.[field.key] === "undefined"
                                              ? dependencyDefaultValue
                                              : section[tab.key]?.[item.key]?.[
                                                  field.key
                                                ];

                                          return (
                                            <div
                                              className="mb-3 mt-2"
                                              key={field.id}
                                            >
                                              <div>
                                                <FieldRenderer
                                                  confirmExitPageBuilder={
                                                    confirmExitPageBuilder
                                                  }
                                                  sectionIndex={sectionIndex}
                                                  value={fieldValue}
                                                  setValue={(value) => {
                                                    updateSection({
                                                      tab: tab.key,
                                                      item: item.key,
                                                      field: field.key,
                                                      value,
                                                    });
                                                  }}
                                                  customOptions={
                                                    field.custom_options_config &&
                                                    section[
                                                      field
                                                        .custom_options_config
                                                        .tab_key
                                                    ] &&
                                                    section[
                                                      field
                                                        .custom_options_config
                                                        .tab_key
                                                    ][
                                                      field
                                                        .custom_options_config
                                                        .item_key
                                                    ] &&
                                                    (typeof field
                                                      .custom_options_config
                                                      .items_index === "number"
                                                      ? section[
                                                          field
                                                            .custom_options_config
                                                            .tab_key
                                                        ][
                                                          field
                                                            .custom_options_config
                                                            .item_key
                                                        ].items[
                                                          field
                                                            .custom_options_config
                                                            .items_index
                                                        ][
                                                          field
                                                            .custom_options_config
                                                            .field_key
                                                        ]
                                                      : section[
                                                          field
                                                            .custom_options_config
                                                            .tab_key
                                                        ][
                                                          field
                                                            .custom_options_config
                                                            .item_key
                                                        ][
                                                          field
                                                            .custom_options_config
                                                            .field_key
                                                        ])
                                                  }
                                                  field={field}
                                                  setDisable={setDisable}
                                                />
                                              </div>
                                            </div>
                                          );
                                        }
                                        return null;
                                      })
                                    ))}
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          ) : null
                        )}
                    </AccordionDetails>
                  </Accordion>
                ) : null
              )}
          </div>
          {!isHeader && !isFooter && !isNavigationBar && !isTopPageHeader && (
            <div
              className="p-2 w-100"
              style={{
                position: "sticky",
                background: "#ffffff",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <style
                dangerouslySetInnerHTML={{
                  __html: `
              .delete-section-card:hover{
                color: ${theme.palette.error.main} !important;
              }
            `,
                }}
              ></style>
              <Collapse isOpened={isDeleteSectionOpen}>
                <div
                  className="d-flex justify-content-between align-items-center p-3 w-100"
                  style={{
                    borderRadius: 4,
                    color: "#70767c",
                    backgroundColor: "#f5f6f7",
                    transition: "all 0.3s ease-in-out",
                    cursor: "pointer",
                  }}
                >
                  Are you sure you want to delete this sequel?
                </div>
              </Collapse>
              {isSectionAllowedToDelete && (
                <div
                  className="p-3 delete-section-card w-100"
                  style={{
                    borderRadius: 4,
                    color: "#70767c",
                    backgroundColor: "#f5f6f7",
                    transition: "all 0.3s ease-in-out",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleDeleteSection(true)}
                >
                  {isDeleteSectionOpen ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        variant="text"
                        style={{
                          color: theme.palette.error.main,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSection(
                            `${section.id || "i"}-${
                              section.name
                            }-${sectionIndex}`
                          );
                          toggleDeleteSection(false);
                          toggleEditSectionDrawer(false);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="text"
                        style={{ color: "#70767c" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDeleteSection(false);
                        }}
                      >
                        Candifying
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Remove the sequel
                      </div>
                      <DeleteOutlineRoundedIcon />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </Drawer>
  );
};

export default memo(EditSectionDrawer);
