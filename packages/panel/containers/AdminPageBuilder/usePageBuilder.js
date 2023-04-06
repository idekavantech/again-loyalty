import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
import PhoneIphoneRoundedIcon from "@material-ui/icons/PhoneIphoneRounded";
import DesktopMacRoundedIcon from "@material-ui/icons/DesktopMacRounded";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BLOG_PAGE_TYPE,
  NORMAL_PAGE_TYPE,
} from "@saas/builder/SectionRenderer/constants";
import { sectionsConfigTabs } from "./constants/configTabs";
import { SEOAnalyser } from "@saas/utils/SEOHelper";
import { useDispatch, useSelector } from "react-redux";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import {
  getAllPages,
  getBusinessPage,
  setBusinessPage,
  updateBusiness,
} from "@saas/stores/business/actions";
import {
  getJourneyState,
  updateBusinessPage,
  updateJourneyState,
} from "store/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectAllPages,
  makeSelectBusiness,
  makeSelectBusinessPage,
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import {
  makeSelectAdminUrlPrefix,
  makeSelectCallToActions,
  makeSelectPluginPages,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { headerComponents } from "@saas/builder/HeaderRenderer/constants";
import { footerComponents } from "@saas/builder/FooterRenderer/constants";
import NavigationBar from "@saas/builder/NavigationBarRenderer";
import { TopPageHeaderComponent } from "@saas/builder/TopPageHeaderRenderer";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import Header from "@saas/builder/HeaderRenderer/HeaderTypes/Header";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { makeSelectJourneyState } from "store/selectors";
import { ONBOARDED_PAGE_BUILDER } from "store/constants";

export const MOBILE_MODE = "MOBILE_MODE";
export const DESKTOP_MODE = "DESKTOP_MODE";
const VIEW_MODES_ICONS = {
  [MOBILE_MODE]: PhoneIphoneRoundedIcon,
  [DESKTOP_MODE]: DesktopMacRoundedIcon,
};

export function usePageBuilder() {
  const dispatch = useDispatch();
  const _uploadFile = (files, folderName, callback) =>
    dispatch(uploadFile({ files, folderName }, callback));
  const _removeFile = (index) => dispatch(removeFile(index));
  const _getBusinessPage = (id, plugin) =>
    dispatch(getBusinessPage(id, plugin));
  const _updateBusiness = (
    data,
    successMessage,
    failMessage,
    callback = null
  ) => dispatch(updateBusiness(data, successMessage, failMessage, callback));
  const _updatePage = (data, callback) => {
    dispatch(updateBusinessPage(data, callback));
  };
  const _setPage = (data) => dispatch(setBusinessPage(data));
  const _getAllPages = (slug, is_blog) => dispatch(getAllPages(slug, is_blog));
  const _getJourneyState = () => dispatch(getJourneyState());
  const _updateJourneyState = (data, callback) =>
    dispatch(updateJourneyState(data, callback));
  const loading = useSelector(makeSelectLoading());
  const themeConfig = useSelector(makeSelectBusinessThemeConfig());
  const themeColor = useSelector(makeSelectBusinessThemeColor());
  const urlPrefix = useSelector(makeSelectUrlPrefix());
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const business = useSelector(makeSelectBusiness());
  const _page = useSelector(makeSelectBusinessPage());
  const callToActions = useSelector(makeSelectCallToActions());
  const pluginPages = useSelector(makeSelectPluginPages());
  const allPages = useSelector(makeSelectAllPages());
  const journeyData = useSelector(makeSelectJourneyState());
  const entityPersianCopyRight = _page?.data?.is_blog ? "Post" : "Page";
  const tempPage = JSON.parse(JSON.stringify(_page));
  const theme = useTheme();
  const router = useRouter();
  const { maxWidth768 } = useResponsive();
  const [viewMode, setViewMode] = useState(
    maxWidth768 ? MOBILE_MODE : DESKTOP_MODE
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const pageRef = useRef(null);
  const [SEOResult, setSeoResult] = useState(null);
  const [pageSettingData, setPageSettingData] = useState({});
  const [isCollapseOpen, setCollapseOpen] = useState({
    firstCollapse: false,
    secondCollapse: false,
    thirdCollapse: false,
  });
  const [
    confirmationExitPageBuilderModal,
    setConfirmationExitPageBuilderModal,
  ] = useState({
    is_open: false,
    link: "",
    text: "",
    failMessage: "",
    successMessage: "",
  });
  const [hoveredSection, hoveredOnSection] = useState(null);
  const [clickedSection, clickedOnSection] = useState(null);
  const [hoverInterval, setHoverInterval] = useState(null);
  const [isDeleteSectionPopupShowing, toggleDeleteSectionPopup] =
    useState(false);
  const [moreSectionSettingsEl, setMoreSectionSettingsEl] = useState(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [isDesktopPreview, setDesktopPreview] = useState(true);
  const [selectedItemIndex, changeSelectedItemIndex] = useState(null);
  const [isPagesDrawerOpen, togglePagesDrawer] = useState(false);
  const [isPageSettingModalOpen, togglePageSettingModal] = useState(false);
  const [isEditSectionDrawerOpen, toggleEditSectionDrawer] = useState(false);
  const [isNewSectionsDrawerOpen, toggleNewSectionsDrawer] = useState(false);
  const [headerConfig, setHeaderConfig] = useState(themeConfig.header_config);
  const [footerConfig, setFooterConfig] = useState(themeConfig.footer_config);
  const [navigationBarActive, setNavigationBarActive] = useState(
    themeConfig.is_active_navigation
  );
  const [navigationBarConfig, setNavigationBarConfig] = useState(
    themeConfig.navigationBar_config
  );
  const [tempSectionData, setTempSectionData] = useState(null);
  const [topPageHeaderConfig, setTopPageHeaderConfig] = useState(
    themeConfig.top_page_header_config
  );

  const [isTopPageHeader, setIsTopPageHeader] = useState(
    themeConfig.is_top_page_header
  );
  const [isOpenOnboarding, setIsOpenOnboarding] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const pageSetting =
    pluginPages &&
    router.query.plugin &&
    pluginPages[router.query.plugin] &&
    pluginPages[router.query.plugin].pageSetting
      ? pluginPages[router.query.plugin]["pageSetting"][router.query.id] || {}
      : {};

  const pageType = router.query.plugin
    ? router.query.id
    : _page?.data?.is_blog
    ? BLOG_PAGE_TYPE
    : NORMAL_PAGE_TYPE;
  const sectionsConfig =
    sectionsConfigTabs[pageType] || sectionsConfigTabs[NORMAL_PAGE_TYPE];
  const dashboardState = journeyData?.vitrin_journey_state?.dashboard_state;

  const updateDashboardState = () => {
    if (!dashboardState?.page_step) {
      _updateJourneyState(
        {
          dashboard_state: {
            ...dashboardState,
            page_step: 1,
          },
        },
        () => {
          _getJourneyState();
          setIsOpenSuccessModal(true);
        }
      );
    }
  };

  useEffect(() => {
    if (pageSettingData) {
      setTimeout(() => {
        const result = SEOAnalyser({
          raw_body: pageRef.current ? pageRef.current.innerHTML : "",
          body: pageRef.current ? pageRef.current.innerText : "",
          ...pageSettingData,
          business_url: business.get_vitrin_absolute_url,
        });
        setSeoResult(result);
      }, 0);
    }
  }, [pageSettingData]);
  useEffect(() => {
    if (_page) {
      const {
        keyphrase,
        main_image_url,
        meta_description,
        head_script,
        name,
        seo_title,
        slug,
      } = _page.data;

      setPageSettingData({
        keyphrase,
        main_image_url,
        meta_description,
        head_script,
        name,
        seo_title,
        slug,
      });
    }
  }, [_page?.id, router.query.id]);

  useEffect(() => {
    _getAllPages(business.slug, _page?.data?.is_blog);
  }, [_page?.data?.is_blog]);

  useEffect(() => {
    if (!localStorage.getItem(ONBOARDED_PAGE_BUILDER)) {
      setIsOpenOnboarding(true);
      localStorage.setItem(ONBOARDED_PAGE_BUILDER, true);
    }
    setTimeout(() => {
      _getJourneyState();
    }, 0);
  }, []);

  useEffect(() => {
    if (themeConfig) {
      if (themeConfig.header_config) {
        setHeaderConfig(themeConfig.header_config);
      } else {
        const obj = {};
        if (sectionsConfig["header"]) {
          sectionsConfig["header"].forEach((tab) => {
            obj[tab.key] = {};
            if (tab.items) {
              tab.items.forEach((item) => {
                if (item.has_multiple_items) {
                  obj[tab.key][item.key] = {
                    items: item.default_items || [],
                  };
                  item.fields.forEach((field) => {
                    obj[tab.key][item.key][field.key] =
                      typeof field.default_value === "undefined"
                        ? null
                        : field.default_value;
                  });
                } else if (item.fields) {
                  obj[tab.key][item.key] = {};
                  item.fields.forEach((field) => {
                    obj[tab.key][item.key][field.key] =
                      typeof field.default_value === "undefined"
                        ? null
                        : field.default_value;
                  });
                }
              });
            }
          });
        }
        setHeaderConfig(obj);
      }
      if (themeConfig.footer_config) {
        setFooterConfig(themeConfig.footer_config);
      } else {
        const obj = {};
        if (sectionsConfig["footer"]) {
          sectionsConfig["footer"].forEach((tab) => {
            obj[tab.key] = {};
            if (tab.items) {
              tab.items.forEach((item) => {
                if (item.has_multiple_items) {
                  obj[tab.key][item.key] = {
                    items: item.default_items || [],
                  };
                  item.fields.forEach((field) => {
                    obj[tab.key][item.key][field.key] =
                      typeof field.default_value === "undefined"
                        ? null
                        : field.default_value;
                  });
                } else if (item.fields) {
                  obj[tab.key][item.key] = {};
                  item.fields.forEach((field) => {
                    obj[tab.key][item.key][field.key] =
                      typeof field.default_value === "undefined"
                        ? null
                        : field.default_value;
                  });
                }
              });
            }
          });
        }
        setFooterConfig(obj);
      }

      if (themeConfig.navigationBar_config) {
        setNavigationBarConfig(themeConfig.navigationBar_config);
      } else {
        const obj = {};
        if (sectionsConfig["navigationBar"]) {
          sectionsConfig["navigationBar"].forEach((tab) => {
            obj[tab.key] = {};
            if (tab.items) {
              tab.items.forEach((item) => {
                if (item.has_multiple_items) {
                  obj[tab.key][item.key] = {
                    items: item.default_items || [],
                  };
                  item.fields.forEach((field) => {
                    obj[tab.key][item.key][field.key] =
                      typeof field.default_value === "undefined"
                        ? null
                        : field.default_value;
                  });
                } else if (item.fields) {
                  obj[tab.key][item.key] = {};
                  item.fields.forEach((field) => {
                    obj[tab.key][item.key][field.key] =
                      typeof field.default_value === "undefined"
                        ? null
                        : field.default_value;
                  });
                }
              });
            }
          });
        }
        setNavigationBarConfig(obj);
      }

      if (themeConfig.top_page_header_config) {
        setTopPageHeaderConfig(themeConfig.top_page_header_config);
      } else {
        const obj = {};
        if (sectionsConfig["topPageHeader"]) {
          sectionsConfig["topPageHeader"].forEach((tab) => {
            obj[tab.key] = {};
            if (tab.items) {
              tab.items.forEach((item) => {
                if (item.has_multiple_items) {
                  obj[tab.key][item.key] = {
                    items: item.default_items || [],
                  };
                  item.fields.forEach((field) => {
                    obj[tab.key][item.key][field.key] =
                      typeof field.default_value === "undefined"
                        ? null
                        : field.default_value;
                  });
                } else if (item.fields) {
                  obj[tab.key][item.key] = {};
                  item.fields.forEach((field) => {
                    obj[tab.key][item.key][field.key] =
                      typeof field.default_value === "undefined"
                        ? null
                        : field.default_value;
                  });
                }
              });
            }
          });
        }
        setTopPageHeaderConfig(obj);
      }
    }
  }, [themeConfig]);
  const handleCollapse = (e) => {
    setCollapseOpen({ ...isCollapseOpen, [e]: !isCollapseOpen[e] });
  };
  const savePageSettingChanges = () => {
    _updatePage(
      { ..._page, data: { ..._page.data, ...pageSettingData } },
      updateDashboardState
    );
    togglePageSettingModal(false);
  };

  useEffect(() => {
    if (isNewSectionsDrawerOpen) {
      clickedOnSection(null);
      setTimeout(() => {
        const myElement = document.getElementById("new-section-placeholder");
        const topPos = myElement?.offsetTop;
        if (typeof topPos == "number") {
          document.getElementById("sections_container").scrollTop =
            topPos - 100;
        }
      }, 300);
    }
  }, [isNewSectionsDrawerOpen]);
  useEffect(() => {
    setTimeout(() => {
      _getBusinessPage(router.query.id, router.query.plugin);
      togglePagesDrawer(false);
      toggleEditSectionDrawer(false);
      toggleNewSectionsDrawer(false);
    }, 0);
  }, [router.query.id, router.query.plugin]);
  useEffect(() => {
    return () => {
      _setPage(null);
    };
  }, []);
  const handleHoverOnSection = useCallback(
    (id, noScroll = false) => {
      if (!isNewSectionsDrawerOpen && id !== hoveredSection) {
        hoveredOnSection(id);
        if (!noScroll) {
          clearInterval(hoverInterval);
          const timeoutId = setTimeout(() => {
            const myElement = document.getElementById(id);
            const topPos = myElement && myElement.offsetTop;
            if (typeof topPos == "number") {
              document.getElementById("sections_container").scrollTop =
                topPos - 100;
            }
          }, 300);
          setHoverInterval(timeoutId);
        }
      }
    },
    [hoverInterval, isNewSectionsDrawerOpen]
  );
  const previewLink = _page
    ? _page.isStatic
      ? _page?.data
        ? `${business.get_vitrin_absolute_url}${urlPrefix}${_page.data.previewLink}`
        : ""
      : `${business.get_vitrin_absolute_url}${urlPrefix}/${router.query.id}${
          _page.data.slug ? `-${_page.data.slug}` : ""
        }`
    : "";
  const ViewIcon = VIEW_MODES_ICONS[viewMode];
  const handleViewModeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleViewModeItemClick = (mode) => {
    setAnchorEl(null);
    setViewMode(mode);
  };
  const onDragEnd = (e) => {
    const draggbleItem = tempPage.data.sections_skeleton[e.source.index];
    tempPage.data.sections_skeleton.splice(e.source.index, 1);
    tempPage.data.sections_skeleton.splice(
      e.destination.index,
      0,
      draggbleItem
    );
    _setPage(tempPage);
  };
  const deleteSection = (id) => {
    const index = tempPage.data.sections_skeleton.findIndex(
      (_s, i) => id === `${_s.id || "i"}-${_s.name}-${i}`
    );
    if (index !== -1) {
      tempPage.data.sections_skeleton.splice(index, 1);
      _setPage(tempPage);
    }
  };
  const addSection = (section, layout_value) => {
    const _id = uniqueid();
    const newProps = {};
    if (sectionsConfig[section]) {
      sectionsConfig[section].forEach((tab) => {
        if (tab.is_not_prop) {
          return null;
        }
        newProps[tab.key] = {};
        if (tab.items) {
          tab.items.forEach((item) => {
            if (item.is_not_prop) {
              return null;
            }
            if (item.has_multiple_items) {
              newProps[tab.key][item.key] = { items: item.default_items || [] };
              item.fields.forEach((field) => {
                if (field.is_not_prop) {
                  return null;
                }
                newProps[tab.key][item.key][field.key] =
                  typeof field.default_value === "undefined"
                    ? null
                    : field.default_value;
              });
            } else if (item.fields) {
              newProps[tab.key][item.key] = {};
              item.fields.forEach((field) => {
                if (field.is_not_prop) {
                  return null;
                }
                if (
                  layout_value &&
                  tab.key === "customization" &&
                  item.key === "layout" &&
                  field.key === "type"
                ) {
                  newProps[tab.key][item.key][field.key] = layout_value;
                } else {
                  newProps[tab.key][item.key][field.key] =
                    typeof field.default_value === "undefined"
                      ? null
                      : field.default_value;
                }
              });
            }
          });
        }
      });
    }

    const tempSectionIndex = tempPage.data.sections_skeleton.findIndex(
      (section) => section.temp
    );
    if (tempSectionIndex !== -1) {
      tempPage.data.sections_skeleton.splice(tempSectionIndex, 1);
    }
    tempPage.data.sections_skeleton.push({
      ...newProps,
      name: section,
      is_active: true,
      temp: true,
      id: _id,
    });

    _setPage(tempPage);
    setTimeout(() => {
      const id = `${_id}-${section}-${
        tempPage.data.sections_skeleton.length - 1
      }`;
      clickedOnSection(id);
    }, 0);
  };
  const saveNewSectionAdded = () => {
    const tempSectionIndex = tempPage.data.sections_skeleton.findIndex(
      (section) => section.temp
    );
    delete tempPage.data.sections_skeleton[tempSectionIndex].temp;
    _setPage(tempPage);
    toggleNewSectionsDrawer(false);
    const section = tempPage.data.sections_skeleton[tempSectionIndex];
    const id = `${section.id || "i"}-${section.name}-${tempSectionIndex}`;
    clickedOnSection(id);
    setSectionPreviewDrawerForMobile(false);
    toggleEditSectionDrawer(true);
  };
  const duplicateSection = (e) => {
    e.stopPropagation();
    setMoreSectionSettingsEl(null);
    const _id = uniqueid();
    const tempSections = JSON.parse(
      JSON.stringify(_page.data.sections_skeleton)
    );
    const tempSection = JSON.parse(
      JSON.stringify(_page.data.sections_skeleton[selectedSectionIndex])
    );
    tempSection.id = _id;
    tempSections.splice(selectedSectionIndex, 0, tempSection);
    tempPage.data.sections_skeleton = tempSections;
    _setPage(tempPage);
  };

  const welcomeTips = [
    {
      content: ({ goTo }) => (
        <div
          className="d-flex flex-column align-items-center"
          onClick={() => goTo(1)}
        >
          <h1>Know the showcase maker</h1>
          <p className="mt-3">
            This page shows the default of your template. You can click by clicking
            On the part you would like to change the content of that section
            Customize it or characterize it to your taste.
          </p>
          <button
            className="mt-2"
            style={{ color: theme.palette.primary.main, fontWeight: 500 }}
          >
            Is it good
          </button>
        </div>
      ),
      position: "center",
    },
    {
      selector: '[data-tour="save"]',
      content: ({ goTo }) => (
        <div
          className="d-flex flex-column align-items-center"
          onClick={() => setIsOpenOnboarding(false)}
        >
          <p>
            After any change by pressing the save button, record the changes and with the help of ahead
            View it..
          </p>
          <button
            className="d-flex align-items-center mt-4"
            style={{ color: theme.palette.primary.main, fontWeight: 500 }}
            onClick={() => goTo(2)}
          >
            <span>Is it good</span>
          </button>
        </div>
      ),
    },
  ];
  const HeaderComp = headerConfig
    ? headerComponents[headerConfig.customization?.layout?.type || "type_1"]
    : Header;
  const FooterComp = footerConfig
    ? footerComponents[footerConfig.customization.layout.type]
    : null;

  const NavigationComp = navigationBarConfig ? NavigationBar : null;
  const TopPageHeaderComp = topPageHeaderConfig ? TopPageHeaderComponent : null;
  const [headerHeight, setHeaderHeight] = useState(null);
  useEffect(() => {
    if (headerConfig) {
      setTimeout(() => {
        if (
          document.getElementById(
            headerConfig.customization?.layout?.type || "type_1"
          )
        ) {
          setHeaderHeight(
            document.getElementById(
              headerConfig.customization?.layout?.type || "type_1"
            ).clientHeight
          );
        } else {
          setHeaderHeight(null);
        }
      }, 0);
    }
  }, [headerConfig]);
  useEffect(() => {
    setTempSectionData(
      _page?.data?.sections_skeleton.find((section) => section.temp)
    );
  }, [_page?.data?.sections_skeleton]);
  const [newSectionLayoutsCollapse, setNewSectionLayoutsCollapse] = useState(
    {}
  );

  const [pageSettingTabValue, changePageSettingTabValue] = useState(0);

  const [
    isSectionPreviewDrawerForMobileOpen,
    setSectionPreviewDrawerForMobile,
  ] = useState(false);
  return {
    entityPersianCopyRight,
    tempPage,
    theme,
    router,
    maxWidth768,
    viewMode,
    pageRef,
    SEOResult,
    pageSettingData,
    setPageSettingData,
    confirmationExitPageBuilderModal,
    setConfirmationExitPageBuilderModal,
    pageSetting,
    pageType,
    isCollapseOpen,
    handleCollapse,

    hoveredSection,
    clickedSection,
    clickedOnSection,
    hoverInterval,
    isDeleteSectionPopupShowing,
    toggleDeleteSectionPopup,
    moreSectionSettingsEl,
    setMoreSectionSettingsEl,
    setSelectedSectionIndex,
    isDesktopPreview,
    setDesktopPreview,
    selectedItemIndex,
    changeSelectedItemIndex,
    isPagesDrawerOpen,
    togglePagesDrawer,
    isPageSettingModalOpen,
    togglePageSettingModal,
    isEditSectionDrawerOpen,
    toggleEditSectionDrawer,
    isNewSectionsDrawerOpen,
    toggleNewSectionsDrawer,

    headerConfig,
    setHeaderConfig,
    footerConfig,
    setFooterConfig,
    navigationBarActive,
    setNavigationBarActive,
    navigationBarConfig,
    setNavigationBarConfig,
    tempSectionData,
    topPageHeaderConfig,
    setTopPageHeaderConfig,
    isTopPageHeader,
    setIsTopPageHeader,

    _uploadFile,
    _removeFile,
    _updateBusiness,
    _updatePage,
    _setPage,

    loading,
    themeConfig,
    themeColor,
    urlPrefix,
    adminUrlPrefix,
    business,
    _page,
    callToActions,
    pluginPages,
    allPages,

    savePageSettingChanges,
    previewLink,
    handleHoverOnSection,

    ViewIcon,

    anchorEl,
    setAnchorEl,
    handleViewModeClick,
    handleViewModeItemClick,
    onDragEnd,
    deleteSection,
    addSection,
    saveNewSectionAdded,
    duplicateSection,

    HeaderComp,
    FooterComp,
    NavigationComp,
    TopPageHeaderComp,
    headerHeight,

    newSectionLayoutsCollapse,
    setNewSectionLayoutsCollapse,
    pageSettingTabValue,
    changePageSettingTabValue,
    isSectionPreviewDrawerForMobileOpen,
    setSectionPreviewDrawerForMobile,
    isOpenOnboarding,
    setIsOpenOnboarding,
    welcomeTips,
    updateDashboardState,
    isOpenSuccessModal,
    setIsOpenSuccessModal,
    isShoppingPage:
      router.query.plugin === "shopping" && router.query.id === "main",
    isProductPage:
      router.query.plugin === "shopping" && router.query.id === "pdp",
  };
}
