import React, { memo } from "react";

import SwipeableViews from "react-swipeable-views";

import ModernSwtich from "@saas/components/ModernSwitch";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { slugify } from "@saas/utils/helpers/slugify";

import { Collapse } from "react-collapse";
import TextField from "@material-ui/core/TextField";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";

import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import CustomModal from "@saas/components/Modal";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import Paper from "@material-ui/core/Paper";
import Input from "@saas/components/Input";
import ImageUploader from "@saas/builder/SectionRenderer/components/ImageUploader";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import {
  cement,
  jungleI,
  night,
  peachIII,
  pollution,
  strawberryI,
} from "@saas/utils/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function RenderPageSettingModal({
  entityPersianCopyRight,
  theme,
  SEOResult,
  pageSettingData,
  setPageSettingData,
  pageSetting: { hasGeneralTab, hasSeoTab, hasSocialTab, hasSlug },
  isCollapseOpen,
  handleCollapse,
  isDesktopPreview,
  setDesktopPreview,
  isPageSettingModalOpen,
  togglePageSettingModal,
  _uploadFile,
  _removeFile,
  loading,
  themeColor,
  _page,
  savePageSettingChanges,
  pageSettingTabValue,
  changePageSettingTabValue,
}) {
  if (!_page) {
    return (
      <CustomModal
        onClose={() => togglePageSettingModal(false)}
        isOpen={isPageSettingModalOpen}
        header={
          <ModalHeader
            onRightClick={() => togglePageSettingModal(false)}
            title="Page Settings"
            LeftItem={() => (
              <IconButton>
                <DeleteOutlineRoundedIcon
                  onClick={() => openDialog(true)}
                  color="inherit"
                />
              </IconButton>
            )}
          />
        }
        body={<LoadingIndicator />}
      />
    );
  }
  const tabPanels = [];
  if (hasGeneralTab !== false)
    tabPanels.push(
      <TabPanel
        value={pageSettingTabValue}
        index={0}
        dir="rtl"
        style={{ padding: 0 }}
      >
        <Paper elevation={1} className="mt-3 p-3 direction-rtl">
          <div
            className="d-flex align-items-center justify-content-between u-cursor-pointer"
            style={{ minHeight: 48 }}
            onClick={() => handleCollapse("firstCollapse")}
          >
            <span>Title{entityPersianCopyRight}</span>
          </div>

          <Input
            label={`Title${entityPersianCopyRight}`}
            placeholder="For example about us"
            value={pageSettingData ? pageSettingData.name : ""}
            onChange={(value) => {
              setPageSettingData({
                ...pageSettingData,
                name: value,
              });
            }}
            className="my-3 mt-lg-0"
            size="medium"
          />
        </Paper>
      </TabPanel>
    );
  if (hasSeoTab !== false)
    tabPanels.push(
      <TabPanel
        value={pageSettingTabValue}
        index={1 - (hasGeneralTab === false ? 1 : 0)}
        dir="rtl"
        style={{ padding: 0 }}
      >
        <Paper elevation={1} className="mt-3 px-3">
          <div
            className="d-flex align-items-center justify-content-between u-cursor-pointer"
            style={{ minHeight: 48 }}
            onClick={() => handleCollapse("secondCollapse")}
          >
            <span>SEO settings</span>
            {isCollapseOpen.secondCollapse ? (
              <ArrowDropUpRoundedIcon />
            ) : (
              <ArrowDropDownRoundedIcon />
            )}
          </div>
          <Collapse
            theme={{
              collapse: "w-100 ReactCollapse--collapse",
              content: "ReactCollapse--content",
            }}
            isOpened={isCollapseOpen.secondCollapse}
          >
            <Input
              label="SEO title"
              placeholder="For example about us"
              value={pageSettingData ? pageSettingData.seo_title : ""}
              onChange={(value) => {
                setPageSettingData({
                  ...pageSettingData,
                  seo_title: value,
                });
              }}
              onBlur={() => {
                if (!pageSettingData.slug) {
                  setPageSettingData({
                    ...pageSettingData,
                    slug:
                      hasSlug !== false
                        ? slugify(pageSettingData.seo_title)
                        : _page.data.slug,
                  });
                }
              }}
              className="my-3 mt-lg-0"
              size="medium"
            />
            <Input
              label="Key word"
              placeholder="For example, showcase"
              value={pageSettingData ? pageSettingData.keyphrase : ""}
              onChange={(value) => {
                setPageSettingData({
                  ...pageSettingData,
                  keyphrase: value,
                });
              }}
              className="mt-3 mt-lg-0"
              size="medium"
            />
            <div
              className="u-font-semi-small mt-1 pr-1"
              style={{ color: theme.palette.text.secondary }}
            >
              Keywords are the same words that search Google and{" "}
              {entityPersianCopyRight}‌Relevant to it is displayed.
            </div>
            <TextField
              label="Meta Description"
              placeholder="Lorem Ipsom is a fake text with an inappropriate simplicity of the printing industry, using graphic designers"
              value={pageSettingData ? pageSettingData.meta_description : ""}
              onChange={(e) =>
                setPageSettingData({
                  ...pageSettingData,
                  meta_description: e.target.value,
                })
              }
              className="mt-3 w-100"
              inputProps={{ maxLength: 320 }}
              multiline
              rows={4}
              variant="outlined"
            />
            <div
              className="u-font-semi-small mt-1 pr-1"
              style={{ color: theme.palette.text.secondary }}
            >
              Meta's description is the same short text that is on Google below the title of each display link
              It will be given.
            </div>
            {hasSlug !== false ? (
              <Input
                label="Dust"
                placeholder="For example making coffee"
                value={pageSettingData ? pageSettingData.slug : ""}
                onChange={(value) =>
                  setPageSettingData({
                    ...pageSettingData,
                    slug: slugify(value),
                  })
                }
                className="mt-3"
                size="medium"
              />
            ) : null}
            <div
              className="u-font-semi-small mt-1 pr-1"
              style={{ color: theme.palette.text.secondary }}
            >
              Slag is a part of the website address that is easy to read, then
              It comes from the domain.
            </div>

            <TextField
              label="Arbitrary script"
              placeholder="Enter the desired script here"
              value={pageSettingData ? pageSettingData?.head_script : ""}
              onChange={(e) =>
                setPageSettingData({
                  ...pageSettingData,
                  head_script: e.target.value,
                })
              }
              className="mt-3 w-100"
              inputProps={{ maxLength: 10000 }}
              multiline
              rows={4}
              variant="outlined"
              style={{ direction: "ltr" }}
            />

            <div
              className="u-font-semi-small mt-1 pr-1"
              style={{ color: "red" }}
            >
              Warning: If you do not know how to use the script this field
              Don't change.
            </div>
            <div className="form-check pt-2">
              <FormControlLabel
                className="mr-0"
                control={
                  <Checkbox
                    checked={!pageSettingData?.noIndex}
                    onChange={() => {
                      setPageSettingData({
                        ...pageSettingData,
                        noIndex: !pageSettingData?.noIndex,
                      });
                    }}
                    color="primary"
                  />
                }
                label="index"
              />
            </div>
            <div className="u-fontLarge mt-4 mb-2" style={{ color: night }}>
              How to display in Google Results
            </div>
            <ModernSwtich
              texts={["Mobile", "desktop"]}
              toggleSwitch={() => setDesktopPreview(!isDesktopPreview)}
              isSwitchOn={isDesktopPreview}
            />
            {!isDesktopPreview ? (
              <div className="mt-3 pb-3">
                <Paper elevation={1} className="p-2">
                  <div
                    style={{ color: cement }}
                    className="d-flex flex-row-reverse align-items-center"
                  >
                    <PublicRoundedIcon fontSize="small" />
                    <span className="ml-1 u-fontSmall">domain.ir</span>
                    <KeyboardArrowRightRoundedIcon fontSize="small" />
                    <span className="u-fontSmall">
                      {(pageSettingData ? pageSettingData.slug : "") || "slug"}
                    </span>
                  </div>
                  <div
                    className="mt-1 text-left u-fontNormal"
                    style={{
                      color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                    }}
                  >
                    {(pageSettingData ? pageSettingData.seo_title : "") ||
                      "The title of the post"}
                  </div>
                  <div
                    className="mt-1 text-left"
                    style={{
                      color: pollution,
                      wordBreak: "break-word",
                    }}
                  >
                    {(pageSettingData
                      ? pageSettingData.meta_description
                      : "") ||
                      "Please enter meta description.If you leave this field blank, automatically portrait part of the main tranquility as meta description."}
                  </div>
                </Paper>
              </div>
            ) : (
              <div className="mt-3 pb-3">
                <div className="p-2">
                  <div className="d-flex flex-row-reverse align-items-center">
                    <span
                      className="u-fontSmall direction-ltr"
                      style={{ color: pollution }}
                    >
                      domain.ir/
                      {`${
                        (pageSettingData ? pageSettingData.slug : "") || "slug"
                      }`}
                    </span>
                    <ArrowDropDownRoundedIcon style={{ color: pollution }} />
                  </div>
                  <div
                    className="text-left u-fontNormal"
                    style={{
                      color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                    }}
                  >
                    {(pageSettingData ? pageSettingData.seo_title : "") ||
                      "The title of the post"}
                  </div>
                  <div
                    className="mt-1 text-left"
                    style={{
                      color: pollution,
                      overflowX: "scroll",
                      minHeight: 100,
                    }}
                  >
                    {pageSettingData.meta_description !== ""
                      ? pageSettingData.meta_description
                      : "Please enter meta description.If you leave this field blank, it automatically displays part of the main tranquility as meta description."}
                  </div>
                </div>
              </div>
            )}
          </Collapse>
        </Paper>
        <Paper
          elevation={1}
          className="mt-3 px-3 position-relative overflow-hidden"
        >
          {!isCollapseOpen.thirdCollapse && (
            <div
              className="position-absolute"
              style={{
                backgroundColor: "red",
                width: 8,
                height: 48,
                right: 0,
                transition: "all ease-in-out 0.3s",
              }}
            ></div>
          )}
          <div
            className="d-flex align-items-center justify-content-between u-cursor-pointer"
            style={{ minHeight: 48 }}
            onClick={() => handleCollapse("thirdCollapse")}
          >
            <span>SEO analysis in this{entityPersianCopyRight}</span>
            {isCollapseOpen.thirdCollapse ? (
              <ArrowDropUpRoundedIcon />
            ) : (
              <ArrowDropDownRoundedIcon />
            )}
          </div>
          <Collapse
            theme={{
              collapse: "w-100 ReactCollapse--collapse",
              content: "ReactCollapse--content",
            }}
            isOpened={isCollapseOpen.thirdCollapse}
          >
            <div
              style={{ borderRight: `solid 4px ${strawberryI}` }}
              className="my-3"
            >
              {SEOResult &&
                Object.keys(SEOResult)
                  .filter((item) => SEOResult[item].score === 0)
                  .map((item) => (
                    <div className="px-2 mt-3" key={item}>
                      <div
                        style={{
                          color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                        }}
                      >
                        {SEOResult[item].title}
                      </div>
                      <div className="mt-1" style={{ color: pollution }}>
                        {SEOResult[item].description}
                      </div>
                    </div>
                  ))}
            </div>
            <div
              style={{ borderRight: `solid 4px ${peachIII}` }}
              className="my-3"
            >
              {SEOResult &&
                Object.keys(SEOResult)
                  .filter((item) => SEOResult[item].score === 1)
                  .map((item) => (
                    <div className="px-2 mt-3" key={item}>
                      <div
                        style={{
                          color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                        }}
                      >
                        {SEOResult[item].title}
                      </div>
                      <div className="mt-1" style={{ color: pollution }}>
                        {SEOResult[item].description}
                      </div>
                    </div>
                  ))}
            </div>
            <div
              style={{ borderRight: `solid 4px ${jungleI}` }}
              className="my-3"
            >
              {SEOResult &&
                Object.keys(SEOResult)
                  .filter((item) => SEOResult[item].score === 2)
                  .map((item) => (
                    <div className="px-2 mt-3" key={item}>
                      <div
                        style={{
                          color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                        }}
                      >
                        {SEOResult[item].title}
                      </div>
                      <div className="mt-1" style={{ color: pollution }}>
                        {SEOResult[item].description}
                      </div>
                    </div>
                  ))}
            </div>
          </Collapse>
        </Paper>
      </TabPanel>
    );
  if (hasSocialTab !== false)
    tabPanels.push(
      <TabPanel
        value={pageSettingTabValue}
        index={
          2 - (hasGeneralTab === false ? 1 : 0) - (hasSeoTab === false ? 1 : 0)
        }
        dir="rtl"
        style={{ padding: 0 }}
      >
        <Paper elevation={1} className="p-3 mt-3 direction-rtl">
          <div
            className="px-3 d-flex justify-content-between flex-wrap"
            style={{
              color: theme.palette.text.tertiary,
              fontSize: 16,
            }}
          >
            <div>
              <div>Preview image</div>
              <div
                className="mt-2"
                style={{
                  color: "#667E8A",
                  fontSize: 14,
                }}
              >
                This image only on the time of sharing the link{" "}
                {entityPersianCopyRight} In social network posts to the user
                is shown.
              </div>
              <div className="mt-3">
                <ImageUploader
                  themeColor={themeColor}
                  _uploadFile={_uploadFile}
                  image={
                    (pageSettingData ? pageSettingData.main_image_url : "") ||
                    ""
                  }
                  callback={(image) => {
                    setPageSettingData({
                      ...pageSettingData,
                      main_image_url: image,
                    });
                    _removeFile();
                  }}
                />
              </div>
            </div>
          </div>
        </Paper>
      </TabPanel>
    );
  return (
    <CustomModal
      isBig
      onClose={() => togglePageSettingModal(false)}
      isOpen={isPageSettingModalOpen}
      header={
        <ModalHeader
          onRightClick={() => togglePageSettingModal(false)}
          title="Page Settings"
        />
      }
      body={
        <div style={{ height: "calc(100% - 112px)" }}>
          <TabContext value={pageSettingTabValue} className="h-100">
            <div
              style={{ borderBottom: "1px solid #d5d9dc" }}
              className="w-100"
            >
              <Tabs
                value={pageSettingTabValue}
                onChange={(event, newValue) => {
                  changePageSettingTabValue(newValue);
                }}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                {hasGeneralTab !== false ? <Tab label="General settings" /> : null}
                {hasSeoTab !== false ? <Tab label="The article" /> : null}
                {hasSocialTab !== false ? (
                  <Tab label="Social Networks" />
                ) : null}
              </Tabs>
            </div>
            <div className="p-3 h-100">
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={pageSettingTabValue}
                onChangeIndex={changePageSettingTabValue}
                className="h-100"
              >
                {tabPanels}
              </SwipeableViews>
              <div className="d-flex flex-row-reverse justify-content-end p-4">
                <Button
                  color="primary"
                  style={{ boxShadow: "none" }}
                  size="medium"
                  variant="contained"
                  className="mr-2"
                  disabled={loading}
                  onClick={savePageSettingChanges}
                >
                  Store
                </Button>
                <Button
                  color="default"
                  className="close-btn"
                  size="medium"
                  variant="contained"
                  onClick={() => togglePageSettingModal(false)}
                >
                  to close
                </Button>
              </div>
            </div>
          </TabContext>
        </div>
      }
    />
  );
}

export default memo(RenderPageSettingModal);
