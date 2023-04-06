import React, { memo } from "react";

import PhoneIphoneRoundedIcon from "@material-ui/icons/PhoneIphoneRounded";

import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import DesktopMacRoundedIcon from "@material-ui/icons/DesktopMacRounded";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import EditSectionDrawer from "./EditSectionDrawer";
import Paper from "@material-ui/core/Paper";
import { vanilla } from "@saas/utils/colors";
import Link from "next/link";
import CloseIcon from "@material-ui/icons/Close";
import AdminBreadCrumb from "../AdminBreadCrumb";
import { DESKTOP_MODE, MOBILE_MODE, usePageBuilder } from "./usePageBuilder";
import RenderSections from "./components/RenderSections";
import RenderNewSectionsDrawer from "./components/RenderNewSectionsDrawer";
import RenderPagesDrawer from "./components/RenderPagesDrawer";
import RenderPageSettingModal from "./components/RenderPageSettingModal";
import RenderSectionsPreviewDrawerForMobile from "./components/RenderSectionsPreviewDrawerForMobile";
import RenderSectionsPreview from "./components/RenderSectionsPreview";
import dynamic from "next/dynamic";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";
import Image from "next/image";

import { ADMIN_HELP_VIDEOS } from "../AdminBreadCrumb/constants";

const Tour = dynamic(() => import("reactour"), { ssr: false });

export function AdminPageBuilder() {
  const {
    entityPersianCopyRight,
    tempPage,
    theme,
    router,
    maxWidth768: isMobile,
    viewMode,
    pageRef,
    SEOResult,
    pageSettingData,
    setPageSettingData,
    confirmationExitPageBuilderModal,
    setConfirmationExitPageBuilderModal,
    pageSetting: { hasGeneralTab, hasSeoTab, hasSocialTab, hasSlug },
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
    isShoppingPage,
    isProductPage,
  } = usePageBuilder();

  const getPageTypeForHelpVideos = () => {
    if (isShoppingPage) return "shop";
    if (isProductPage) return "pdp";
    return "main";
  };
  const helpVideos = {
    pdp: {
      url: ADMIN_HELP_VIDEOS.productPageBuilder.url,
      title: "ویرایش صفحه محصول",
    },
    shop: {
      url: ADMIN_HELP_VIDEOS.shopPageBuilder.url,
      title: "ویرایش صفحه سفارش آنلاین",
    },
    main: {
      url: ADMIN_HELP_VIDEOS.mainPageBuilder.url,
      title: "ویرایش صفحه",
    },
  };
  return (
    <div>
      <EditSectionDrawer
        changeSelectedItemIndex={changeSelectedItemIndex}
        headerConfig={headerConfig}
        setHeaderConfig={setHeaderConfig}
        footerConfig={footerConfig}
        navigationBarConfig={navigationBarConfig}
        topPageHeaderConfig={topPageHeaderConfig}
        setTopPageHeaderConfig={setTopPageHeaderConfig}
        setNavigationBarConfig={setNavigationBarConfig}
        setFooterConfig={setFooterConfig}
        page={_page}
        setPage={_setPage}
        isMobile={isMobile}
        clickedSection={clickedSection}
        isEditSectionDrawerOpen={isEditSectionDrawerOpen}
        toggleEditSectionDrawer={toggleEditSectionDrawer}
        clickedOnSection={clickedOnSection}
        deleteSection={deleteSection}
        saveChanges={() => _updatePage(_page, updateDashboardState)}
        confirmExitPageBuilder={(link, text, successMessage, failMessage) =>
          setConfirmationExitPageBuilderModal({
            is_open: true,
            link: link,
            text: text,
            successMessage: successMessage,
            failMessage: failMessage,
          })
        }
        saveHeaderChanges={() =>
          _updateBusiness(
            { theme_config: { ...themeConfig, header_config: headerConfig } },
            "هدر سایت شما با موفقیت به روز رسانی شد.",
            "بروزرسانی هدر سایت شما موفقیت آمیز نبود!"
          )
        }
        saveFooterChanges={() =>
          _updateBusiness(
            { theme_config: { ...themeConfig, footer_config: footerConfig } },
            "فوتر سایت شما با موفقیت به روز رسانی شد.",
            "بروزرسانی فوتر سایت شما موفقیت آمیز نبود!"
          )
        }
        saveNavigationBarChanges={() => {
          _updateBusiness(
            {
              theme_config: {
                ...themeConfig,
                navigationBar_config: navigationBarConfig,
              },
            },
            "نوار اعلانات سایت شما با موفقیت به روز رسانی شد.",
            "بروزرسانی نوار اعلانات سایت شما موفقیت آمیز نبود!"
          );
        }}
        saveTopPageHeaderChanges={() => {
          _updateBusiness(
            {
              theme_config: {
                ...themeConfig,
                top_page_header_config: topPageHeaderConfig,
              },
            },
            " هدر بالای صفحه سایت شما با موفقیت به روز رسانی شد.",
            "بروزرسانی هدر بالای صفحه سایت شما موفقیت آمیز نبود!"
          );
        }}
      />
      <RenderPageSettingModal
        entityPersianCopyRight={entityPersianCopyRight}
        theme={theme}
        SEOResult={SEOResult}
        pageSettingData={pageSettingData}
        setPageSettingData={setPageSettingData}
        pageSetting={{ hasGeneralTab, hasSeoTab, hasSocialTab, hasSlug }}
        isCollapseOpen={isCollapseOpen}
        handleCollapse={handleCollapse}
        isDesktopPreview={isDesktopPreview}
        setDesktopPreview={setDesktopPreview}
        isPageSettingModalOpen={isPageSettingModalOpen}
        togglePageSettingModal={togglePageSettingModal}
        _uploadFile={_uploadFile}
        _removeFile={_removeFile}
        loading={loading}
        themeColor={themeColor}
        _page={_page}
        savePageSettingChanges={savePageSettingChanges}
        pageSettingTabValue={pageSettingTabValue}
        changePageSettingTabValue={changePageSettingTabValue}
      />
      <RenderNewSectionsDrawer
        tempPage={tempPage}
        theme={theme}
        pageType={pageType}
        isNewSectionsDrawerOpen={isNewSectionsDrawerOpen}
        toggleNewSectionsDrawer={toggleNewSectionsDrawer}
        tempSectionData={tempSectionData}
        _setPage={_setPage}
        _page={_page}
        addSection={addSection}
        saveNewSectionAdded={saveNewSectionAdded}
        newSectionLayoutsCollapse={newSectionLayoutsCollapse}
        setNewSectionLayoutsCollapse={setNewSectionLayoutsCollapse}
      />
      <RenderPagesDrawer
        entityPersianCopyRight={entityPersianCopyRight}
        theme={theme}
        router={router}
        isPagesDrawerOpen={isPagesDrawerOpen}
        togglePagesDrawer={togglePagesDrawer}
        loading={loading}
        adminUrlPrefix={adminUrlPrefix}
        _page={_page}
        pluginPages={pluginPages}
        allPages={allPages}
      />
      <RenderSectionsPreviewDrawerForMobile
        pageSetting={{ hasGeneralTab, hasSeoTab, hasSocialTab }}
        isSectionPreviewDrawerForMobileOpen={
          isSectionPreviewDrawerForMobileOpen
        }
        setSectionPreviewDrawerForMobile={setSectionPreviewDrawerForMobile}
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
      />
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={isDeleteSectionPopupShowing}
        onClose={() => toggleDeleteSectionPopup(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isDeleteSectionPopupShowing}>
          <div
            style={{
              borderRadius: 4,
              backgroundColor: vanilla,
              padding: "16px 32px 24px 32px",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 16, color: "#323b43" }}>
              آیا از حذف این سکشن مطمئن هستید؟
            </div>
            <div className="mt-3 d-flex flex-row-reverse">
              <Button
                color="default"
                className="mr-2"
                style={{
                  boxShadow: "none",
                  color: theme.palette.error.main,
                  backgroundColor: hexToRGBA(theme.palette.error.main, 0.1),
                }}
                onClick={() => {
                  toggleDeleteSectionPopup(false);
                  deleteSection(clickedSection);
                  clickedOnSection(null);
                }}
              >
                حذف
              </Button>
              <Button
                color="default"
                style={{
                  boxShadow: "none",
                  color: "#70767c",
                  backgroundColor: "#f5f6f7",
                }}
                onClick={() => {
                  toggleDeleteSectionPopup(false);
                  clickedOnSection(null);
                }}
              >
                انصراف
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <AppBar
        elevation={0}
        position="sticky"
        style={{
          borderBottom: "1px solid #ebedef",
          color: "#70767c",
          backgroundColor: "#ffffff",
        }}
      >
        <Toolbar variant="dense" className="px-3 d-flex flex-wrap">
          <div className="d-flex justify-content-between col-12 col-md-3 pr-md-0 pl-md-2 px-0">
            <div className="d-flex align-items-center ml-3">
              <IconButton color="default" size="small" onClick={router.back}>
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </div>
            <div className="d-flex flex-row-reverse flex-1">
              {!isMobile && (
                <Button
                  style={{
                    background: hexToRGBA(theme.palette.primary.main, 0.1),
                  }}
                  size="medium"
                  color="primary"
                  variant="text"
                  className="mr-2"
                  onClick={() => {
                    toggleNewSectionsDrawer(true);
                  }}
                >
                  <AddRoundedIcon />
                  افزودن
                </Button>
              )}
              {isMobile && (
                <Button
                  color="primary"
                  style={{ boxShadow: "none" }}
                  data-tour="save"
                  size="medium"
                  variant="contained"
                  className="mr-2"
                  disabled={loading}
                  onClick={() => {
                    _updatePage(_page, updateDashboardState);
                  }}
                >
                  ذخیره
                </Button>
              )}
              <Button
                color="default"
                style={{
                  boxShadow: "none",
                  color: "#70767c",
                  backgroundColor: "#f5f6f7",
                }}
                className="d-flex flex-1 justify-content-between"
                size="medium"
                variant="contained"
                onClick={() => togglePagesDrawer(!isPagesDrawerOpen)}
              >
                <div>
                  {_page?.data?.name.length > 12
                    ? _page?.data?.name.slice(0, 10) + "..."
                    : _page?.data?.name}
                </div>

                <KeyboardArrowDownRoundedIcon
                  style={{
                    transform: `rotate(${isPagesDrawerOpen ? 180 : 0}deg)`,
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              </Button>
            </div>
          </div>
          {!isMobile && (
            <div className="d-flex justify-content-between col-12 col-md-9 px-0">
              <div>
                <Button
                  color="default"
                  style={{
                    boxShadow: "none",
                    color: "#70767c",
                    backgroundColor: "#f5f6f7",
                  }}
                  size="medium"
                  variant="contained"
                  onClick={handleViewModeClick}
                >
                  <ViewIcon style={{ color: "#70767c" }} />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    onClick={() => handleViewModeItemClick(MOBILE_MODE)}
                  >
                    <IconButton color="default" size="small">
                      <PhoneIphoneRoundedIcon />
                    </IconButton>
                    <div style={{ fontSize: 14 }}>موبایل</div>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleViewModeItemClick(DESKTOP_MODE)}
                  >
                    <IconButton color="default" size="small">
                      <DesktopMacRoundedIcon />
                    </IconButton>
                    <div style={{ fontSize: 14 }}>دسکتاپ</div>
                  </MenuItem>
                </Menu>
              </div>
              <div className="d-flex flex-row-reverse">
                <Button
                  color="primary"
                  style={{ boxShadow: "none" }}
                  size="medium"
                  data-tour="save"
                  variant="contained"
                  className="mr-2"
                  disabled={loading}
                  onClick={() => {
                    _updatePage(_page, updateDashboardState);
                    _updateBusiness({
                      theme_config: {
                        ...themeConfig,
                        footer_config: footerConfig,
                        header_config: headerConfig,
                        is_active_navigation: navigationBarActive,
                        is_top_page_header: isTopPageHeader,
                      },
                    });
                  }}
                >
                  ذخیره
                </Button>
                {_page && previewLink && (
                  <Link target="_blank" href={previewLink} passHref>
                    <Button
                      color="default"
                      style={{
                        boxShadow: "none",
                        color: "#70767c",
                        backgroundColor: "#f5f6f7",
                      }}
                      size="medium"
                      variant="contained"
                    >
                      پیش‌نمایش
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div
        className="container-fluid d-flex flex-wrap"
        style={{ backgroundColor: "#f5f6f7", height: "calc(100vh - 48px)" }}
      >
        {!isMobile && (
          <div
            className="col-12 col-md-3 mt-5 pr-md-0"
            style={{ padding: isMobile ? 0 : "" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div
                style={{ fontSize: 22, fontWeight: "bold", color: "#323b43" }}
              >
                {_page?.data?.name.length > 20
                  ? _page?.data?.name.slice(0, 19) + "..."
                  : _page?.data?.name}
              </div>
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
                    boxShadow:
                      "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
                  }}
                  onClick={() => togglePageSettingModal(true)}
                >
                  <SettingsRoundedIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            <div className="mt-3">
              <div style={{ color: "#adb1b5", fontWeight: "bold" }}>
                سکشن‌ها
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
                setSectionPreviewDrawerForMobile={
                  setSectionPreviewDrawerForMobile
                }
              />
            </div>
          </div>
        )}
        <div className="col-12 col-md-9 px-0">
          <AdminBreadCrumb helpVideo={helpVideos[getPageTypeForHelpVideos()]} />
          <p
            className="mb-4"
            style={{
              color: "#8C9196",
              fontSize: 16,
              marginTop: 12,
              textAlign: isMobile ? "right" : "center",
            }}
          >
            با <strong>کلیک</strong> بر بخشهای مختلف صفحه خودتان می توانید{" "}
            <strong>محتوا </strong>و <strong>قالب</strong> هر بخش را به سلیقه
            خودتان شخصی‌سازی کنید.{" "}
          </p>
          <div
            style={{ fontFamily: business?.theme_config?.font?.url || "dana" }}
          >
            {viewMode === DESKTOP_MODE ? (
              isMobile ? (
                <div
                  className="mt-2 text-center position-relative"
                  style={{
                    height: "80vh",
                    borderRadius: "8px 8px 0 0",
                    overflow: "hidden",
                    maxWidth: 380,
                    margin: "auto",
                  }}
                >
                  <div
                    className="position-absolute"
                    style={{
                      bottom: 0,
                      height: "80vh",
                      width: "100%",
                    }}
                  >
                    <Image
                      alt=""
                      width={380}
                      height={715}
                      src={`/images/page-mobile.svg`}
                    />
                  </div>

                  <div
                    className="d-flex justify-content-center position-absolute"
                    style={{
                      boxShadow:
                        "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
                      background: "#ffffff",
                      overflow: "hidden",
                      right: 25,
                      left: 25,
                      top: 76,
                      bottom: 1,
                    }}
                  >
                    <div className="w-100">
                      <RenderSections
                        tempPage={tempPage}
                        theme={theme}
                        isMobile={isMobile}
                        viewMode={viewMode}
                        pageRef={pageRef}
                        hoveredSection={hoveredSection}
                        clickedSection={clickedSection}
                        clickedOnSection={clickedOnSection}
                        selectedItemIndex={selectedItemIndex}
                        toggleEditSectionDrawer={toggleEditSectionDrawer}
                        isNewSectionsDrawerOpen={isNewSectionsDrawerOpen}
                        toggleNewSectionsDrawer={toggleNewSectionsDrawer}
                        headerConfig={headerConfig}
                        footerConfig={footerConfig}
                        navigationBarActive={navigationBarActive}
                        navigationBarConfig={navigationBarConfig}
                        topPageHeaderConfig={topPageHeaderConfig}
                        isTopPageHeader={isTopPageHeader}
                        _setPage={_setPage}
                        themeColor={themeColor}
                        urlPrefix={urlPrefix}
                        business={business}
                        _page={_page}
                        callToActions={callToActions}
                        handleHoverOnSection={handleHoverOnSection}
                        HeaderComp={HeaderComp}
                        FooterComp={FooterComp}
                        NavigationComp={NavigationComp}
                        TopPageHeaderComp={TopPageHeaderComp}
                        headerHeight={headerHeight}
                        setSectionPreviewDrawerForMobile={
                          setSectionPreviewDrawerForMobile
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="mt-4"
                  style={{
                    height: "calc(100vh - 250px)",
                    boxShadow:
                      "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
                    borderRadius: "8px 8px 0 0",
                    background: "#ffffff",
                    overflow: "hidden",
                  }}
                >
                  <RenderSections
                    tempPage={tempPage}
                    theme={theme}
                    isMobile={isMobile}
                    viewMode={viewMode}
                    pageRef={pageRef}
                    hoveredSection={hoveredSection}
                    clickedSection={clickedSection}
                    clickedOnSection={clickedOnSection}
                    selectedItemIndex={selectedItemIndex}
                    toggleEditSectionDrawer={toggleEditSectionDrawer}
                    isNewSectionsDrawerOpen={isNewSectionsDrawerOpen}
                    toggleNewSectionsDrawer={toggleNewSectionsDrawer}
                    headerConfig={headerConfig}
                    footerConfig={footerConfig}
                    navigationBarActive={navigationBarActive}
                    navigationBarConfig={navigationBarConfig}
                    topPageHeaderConfig={topPageHeaderConfig}
                    isTopPageHeader={isTopPageHeader}
                    _setPage={_setPage}
                    themeColor={themeColor}
                    urlPrefix={urlPrefix}
                    business={business}
                    _page={_page}
                    callToActions={callToActions}
                    handleHoverOnSection={handleHoverOnSection}
                    HeaderComp={HeaderComp}
                    FooterComp={FooterComp}
                    NavigationComp={NavigationComp}
                    TopPageHeaderComp={TopPageHeaderComp}
                    headerHeight={headerHeight}
                    setSectionPreviewDrawerForMobile={
                      setSectionPreviewDrawerForMobile
                    }
                  />
                </div>
              )
            ) : (
              <div
                className="mt-2 text-center position-relative"
                style={{
                  height: "calc(100vh - 78px)",
                  borderRadius: "8px 8px 0 0",
                  overflow: "scroll",
                  paddingTop: 20,
                }}
              >
                <svg
                  data-v-83a9de38=""
                  width="440"
                  height="1000"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mobile-view__device"
                >
                  <g filter="url(#filter0_dd)">
                    <path
                      opacity=".7"
                      d="M73.517 4h292.966C404.876 4 436 35.124 436 73.517v740.966C436 852.876 404.876 884 366.483 884H73.517C35.124 884 4 852.876 4 814.483V73.517C4 35.124 35.124 4 73.517 4z"
                      fill="#F5F6F7"
                    ></path>
                    <path
                      opacity=".7"
                      d="M73.517 4h292.966C404.876 4 436 35.124 436 73.517v740.966C436 852.876 404.876 884 366.483 884H73.517C35.124 884 4 852.876 4 814.483V73.517C4 35.124 35.124 4 73.517 4z"
                      fill="#fff"
                    ></path>
                    <path
                      d="M169 40a6 6 0 100-12 6 6 0 000 12zM245 31h-49a3 3 0 100 6h49a3 3 0 100-6z"
                      fill="#D5D9DC"
                    ></path>
                  </g>
                  <defs>
                    <filter
                      id="filter0_dd"
                      x="0"
                      y="0"
                      width="440"
                      height="2061"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset></feOffset>
                      <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
                      <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      ></feBlend>
                      <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset dy="1"></feOffset>
                      <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
                      <feBlend
                        in2="effect1_dropShadow"
                        result="effect2_dropShadow"
                      ></feBlend>
                      <feBlend
                        in="SourceGraphic"
                        in2="effect2_dropShadow"
                        result="shape"
                      ></feBlend>
                    </filter>
                  </defs>
                </svg>
                <div
                  className="position-absolute"
                  style={{
                    right: "50%",
                    transform: "translateX(50%)",
                    zIndex: 4,
                    top: 100,
                    width: 380,
                    height: 706,
                    background: "#ffffff",
                  }}
                >
                  <RenderSections
                    tempPage={tempPage}
                    theme={theme}
                    isMobile={isMobile}
                    viewMode={viewMode}
                    pageRef={pageRef}
                    hoveredSection={hoveredSection}
                    clickedSection={clickedSection}
                    clickedOnSection={clickedOnSection}
                    selectedItemIndex={selectedItemIndex}
                    toggleEditSectionDrawer={toggleEditSectionDrawer}
                    isNewSectionsDrawerOpen={isNewSectionsDrawerOpen}
                    toggleNewSectionsDrawer={toggleNewSectionsDrawer}
                    headerConfig={headerConfig}
                    footerConfig={footerConfig}
                    navigationBarActive={navigationBarActive}
                    navigationBarConfig={navigationBarConfig}
                    topPageHeaderConfig={topPageHeaderConfig}
                    isTopPageHeader={isTopPageHeader}
                    _setPage={_setPage}
                    themeColor={themeColor}
                    urlPrefix={urlPrefix}
                    business={business}
                    _page={_page}
                    callToActions={callToActions}
                    handleHoverOnSection={handleHoverOnSection}
                    HeaderComp={HeaderComp}
                    FooterComp={FooterComp}
                    NavigationComp={NavigationComp}
                    TopPageHeaderComp={TopPageHeaderComp}
                    headerHeight={headerHeight}
                    setSectionPreviewDrawerForMobile={
                      setSectionPreviewDrawerForMobile
                    }
                  />
                </div>
              </div>
            )}
          </div>
          {isMobile && (
            <div
              style={{
                position: "sticky",
                bottom: 0,
                width: "100%",
                backgroundColor: "white",
                zIndex: 10000,
              }}
            >
              <div className="py-3 d-flex justify-content-between align-items-center">
                <Button
                  color="default"
                  style={{
                    color: "#70767c",
                    background: "#ffffff",
                    borderRadius: 4,
                    boxShadow:
                      "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
                  }}
                  size="medium"
                  variant="contained"
                  className="p-2"
                  onClick={() => setSectionPreviewDrawerForMobile(true)}
                >
                  سکشن‌‌‌ها
                </Button>
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
                  onClick={() => togglePageSettingModal(true)}
                >
                  <SettingsRoundedIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      </div>
      <Tour
        steps={welcomeTips}
        isOpen={isOpenOnboarding}
        className="tour"
        showCloseButton={false}
        showNumber={false}
        onRequestClose={() => setIsOpenOnboarding(false)}
        rounded={5}
        showButtons={false}
        showNavigationNumber={false}
        showNavigation={false}
        disableInteraction
        disableDotsNavigation
        onAfterOpen={(target) => disableBodyScroll(target)}
        onBeforeClose={(target) => enableBodyScroll(target)}
      />
      <SuccessMessageModal
        isOpen={isOpenSuccessModal}
        title="تغییر شما با موفقیت ثبت شد!"
        content="شما می‌توانید در ادامه صفحات مختلفی برای سایت خودتان بسازید و بخش‌های موردنیاز را به صفحه اضافه کنید."
        onClose={() => setIsOpenSuccessModal(false)}
        next={() => setIsOpenSuccessModal(false)}
        returnToDashboard={() => router.back()}
        image="/images/success-page-builder.svg"
      />
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={confirmationExitPageBuilderModal.is_open}
        onClose={() =>
          setConfirmationExitPageBuilderModal({
            ...confirmationExitPageBuilderModal,
            is_open: false,
          })
        }
      >
        <Paper
          elevation={3}
          className={`mx-auto position-relative overflow-hidden c-modal-box`}
          style={{
            height: 200,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="d-flex align-items-center">
            <CloseIcon
              style={{ color: "#202223", fontSize: 24, cursor: "pointer" }}
              onClick={() =>
                setConfirmationExitPageBuilderModal({
                  ...confirmationExitPageBuilderModal,
                  is_open: false,
                })
              }
            />
            <span
              style={{
                color: "#202223",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "24px",
                paddingRight: 16,
              }}
            >
              اخطار
            </span>
          </div>
          <span style={{ fontSize: 14 }}>
            {confirmationExitPageBuilderModal.text}
          </span>
          <div style={{ alignSelf: "end", justifySelf: "end" }}>
            <Button
              onClick={() =>
                setConfirmationExitPageBuilderModal({
                  ...confirmationExitPageBuilderModal,
                  is_open: false,
                })
              }
              color="primary"
              variant="outlined"
              style={{ height: 40, width: 64 }}
            >
              خیر
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{ height: 40, width: 64, marginRight: 20 }}
              onClick={() =>
                _updateBusiness(
                  {
                    theme_config: {
                      ...themeConfig,
                      top_page_header_config: topPageHeaderConfig,
                    },
                  },
                  confirmationExitPageBuilderModal.successMessage,
                  confirmationExitPageBuilderModal.failMessage,
                  () => router.push(confirmationExitPageBuilderModal.link)
                )
              }
            >
              بلی
            </Button>
          </div>
        </Paper>
      </Modal>
    </div>
  );
}

export default memo(AdminPageBuilder);
