/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {
  makeSelectBusiness,
  makeSelectBusinessId,
  makeSelectBusinessLabels,
} from "@saas/stores/business/selector";
import {
  createCategory,
  deleteCategory,
  getBusinessLabels,
  updateCategory,
} from "@saas/stores/business/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useRouter } from "next/router";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import PopUp from "@saas/components/PopUp";
import Input from "@saas/components/Input";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { slugify } from "@saas/utils/helpers/slugify";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import TextField from "@material-ui/core/TextField";
import useTheme from "@material-ui/core/styles/useTheme";
import { Collapse } from "react-collapse";
import {
  cement,
  jungleI,
  night,
  peachIII,
  pollution,
  strawberryI,
} from "@saas/utils/colors";
import ModernSwtich from "@saas/components/ModernSwitch";
import { SEOAnalyser } from "@saas/utils/SEOHelper";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import Link from "next/link";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import ImageUploader from "@saas/builder/SectionRenderer/components/ImageUploader";
import dynamic from "next/dynamic";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { quillModules } from "store/constants";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function AdminCategory({
  isLoading,
  businessId,
  business,
  urlPrefix,
  adminCategories: categories,
  _updateAdminCategory: _updateCategory,
  _uploadFile,
  _deleteAdminCategory: _deleteCategory,
  _createAdminCategory: _createCategory,
  pluginsData,
  plugin = SHOPPING_PLUGIN,
  _getBusinessLabels,
}) {
  const router = useRouter();
  const categoryId = router.query.id === "new" ? null : router.query.id;
  const [error, setError] = useState("");
  const theme = useTheme();
  const [isDesktopPreview, setDesktopPreview] = useState(false);

  const [percent, setPercent] = useState("");
  const [amount, setAmount] = useState("");
  const [isDialogBoxOpen, setDialogBox] = useState(false);
  const [category, setCategory] = useState({});

  const [seo, setSeo] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [SEOResult, setSeoResult] = useState(null);
  const [isCollapseOpen, SetCollapseOpen] = useState({
    firstCollapse: false,
    secondCollapse: false,
    thirdCollapse: false,
  });
  const pluginUrl = pluginsData[plugin].plugin_url;
  const handleCollapse = (e) => {
    SetCollapseOpen({ ...isCollapseOpen, [e]: !isCollapseOpen[e] });
  };
  const updateSEOData = (propertyName, propertyValue) => {
    const newSeo = { ...seo };
    newSeo[propertyName] = propertyValue;
    setSeo(newSeo);
  };
  const iframe_from_pos =
    router.query.iframe_from_pos || typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("iframe_from_pos")
      : false;
  useEffect(() => {
    setTimeout(() => {
      _getBusinessLabels();
    }, 0);
  }, []);
  useEffect(() => {
    if (categories.length) {
      const _category = categoryId
        ? categories.find((cat) => cat.id === +categoryId)
        : {};
      setCategory({ ..._category });
      setSeo(_category?.seo || {});
    }
  }, [categories]);
  useEffect(() => {
    if (seo && category) {
      clearTimeout(timeoutId);
      const id = setTimeout(() => {
        const result = SEOAnalyser({
          raw_body: "",
          body: "",
          ...seo,
          business_url: business.get_vitrin_absolute_url,
        });
        setSeoResult(result);
      }, 1000);
      setTimeoutId(id);
    }
  }, [seo, category.title]);
  const submit = () => {
    if (!category.title) {
      setError("Please enter the label name..");
    } else {
      setError("");
      if (categoryId) {
        _updateCategory(
          {
            ...category,
            seo,
          },
          amount,
          percent
        );
      } else {
        _createCategory(
          {
            title: category.title,
            seo,
            extra_data: { ...category.extra_data },
          },
          businessId,
          () => router.push(`${urlPrefix}s/settings/l`)
        );
      }
    }
  };
  return (
    <div className="container pb-3">
      <AdminBreadCrumb disableBreadcrumb={!!iframe_from_pos} />
      <Paper elevation={2} className="d-flex flex-wrap my-3 py-3">
        <div className="col-12 col-lg-6">
          <div className="flex-1 u-fontLarge">Basic Information</div>
          <Input
            className="my-4 ml-auto"
            label="Tagity title"
            value={category?.title}
            onChange={(title) => {
              setError("");
              setCategory({ ...category, title });
            }}
            size="medium"
            error={Boolean(error)}
            assistive={error}
          />
        </div>
        <div className="col-12 col-lg-6">
          <div className="flex-1 u-fontLarge">tag Photo</div>
          <ImageUploader
            _uploadFile={_uploadFile}
            image={category?.extra_data?.icon_image_url}
            callback={(img) => {
              setError("");
              const _category = {
                ...category,
                extra_data: { ...category.extra_data, icon_image_url: img },
              };
              setCategory(_category);
            }}
            folderName="business_category_images"
          />
        </div>
      </Paper>
      {categoryId ? (
        <Paper elevation={2} className="d-flex flex-wrap my-3 py-3">
          <div className="col-12 col-lg-6">
            <span className="">Label cost</span>
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <Input
                label="Group packaging fee on products of this label($)"
                size="medium"
                numberOnly
                value={englishNumberToPersianNumber(amount, "")}
                onChange={(value) => setAmount(persianToEnglishNumber(value))}
                placeholder="For example: ۵۰۰۰"
              />
            </div>
          </div>
          <div className="col-12 col-lg-6 mt-3 mt-lg-0">
            <span className="">group discount</span>
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <Input
                label="Group discount on products of this tag(Percent)"
                size="medium"
                numberOnly
                value={englishNumberToPersianNumber(percent, "")}
                onChange={(value) => {
                  if (
                    persianToEnglishNumber(value) <= 100 &&
                    persianToEnglishNumber(value) >= 0
                  )
                    setPercent(persianToEnglishNumber(value));
                }}
                placeholder="For example: ۵"
              />
            </div>
          </div>
          <div
            style={{ color: theme.palette.text.secondary }}
            className="d-flex col-12 mt-4"
          >
            <InfoRoundedIcon fontSize="small" className="ml-1" />
            <div className="text-justify">
              By applying these costs, changes to current products of this label do
              Become and for new products you need to reset the cost.
            </div>
          </div>
        </Paper>
      ) : null}
      {categoryId ? (
        <Paper elevation={2} className="d-flex flex-wrap my-3 py-3">
          <div className="col-12">
            <div className="flex-1 u-fontLarge mb-2">Label description</div>
            <div>
              <ReactQuill
                placeholder="Explain the product and its traits to your customers."
                className="text-left "
                value={category?.extra_data?.richtext || ""}
                onChange={(value) => {
                  const _category = {
                    ...category,
                    extra_data: { ...category.extra_data, richtext: value },
                  };
                  setCategory(_category);
                }}
                modules={quillModules}
                theme="snow"
              />
            </div>
          </div>
        </Paper>
      ) : null}
      {categoryId ? (
        <Paper
          elevation={1}
          className="d-flex justify-content-between mt-2 p-3"
        >
          <div style={{ color: theme.palette.text.secondary }}>
            To apply group additives on your labels you can go to the section
            See additives.
          </div>
          <div
            style={{ color: theme.palette.primary.main }}
            className="flex-shrink-0"
            color="primary.main"
          >
            <Link href={`${urlPrefix}${pluginUrl}/settings/modifier_sets`}>
              Additive selection
            </Link>
          </div>
        </Paper>
      ) : null}
      <Paper elevation={1} className="mt-2 px-3">
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
            value={seo.seo_title || ""}
            onChange={(value) => {
              updateSEOData("seo_title", value);
            }}
            onBlur={() => {
              if (!seo.slug) {
                setTimeout(() => {
                  updateSEOData("slug", slugify(seo.seo_title));
                }, 0);
              }
            }}
            className="my-3 mt-lg-0"
            size="medium"
          />
          <Input
            label="Key word"
            placeholder="For example, showcase"
            value={seo.keyphrase || ""}
            onChange={(value) => updateSEOData("keyphrase", value)}
            className="mt-3 mt-lg-0"
            size="medium"
          />
          <div
            className="u-font-semi-small mt-1 pr-1"
            style={{ color: theme.palette.text.secondary }}
          >
            Keywords are the same words on Google Search and related pages
            is shown.
          </div>
          <TextField
            label="Meta Description"
            placeholder="Lorem Ipsom is a fake text with an inappropriate simplicity of the printing industry, using graphic designers"
            value={seo.meta_description || ""}
            onChange={(e) => updateSEOData("meta_description", e.target.value)}
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
          <Input
            label="Dust"
            placeholder="For example making coffee"
            value={seo.slug || ""}
            onChange={(value) => updateSEOData("slug", slugify(value))}
            className="mt-3"
            size="medium"
          />
          <div
            className="u-font-semi-small mt-1 pr-1"
            style={{ color: theme.palette.text.secondary }}
          >
            Slag is a part of the website address that for convenience to read the address after
            The domain comes.
          </div>
          <TextField
            label="Arbitrary script"
            placeholder="Enter the desired script here"
            value={seo?.head_script || ""}
            onChange={(e) => updateSEOData("head_script", e.target.value)}
            className="mt-3 w-100"
            inputProps={{ maxLength: 1000 }}
            multiline
            rows={4}
            variant="outlined"
            style={{ direction: "ltr" }}
          />
          <div className="u-font-semi-small mt-1 pr-1" style={{ color: "red" }}>
            Warning: If you do not find out how to use the script change this field
            Don't.
          </div>
          <Input
            label="Ehsurgal address"
            value={
              seo.canonical ||
              `${business.get_vitrin_absolute_url}/s/l/${category?.id || ""}`
            }
            onChange={(value) => updateSEOData("canonical", value)}
            className="mt-3 mt-lg-3"
            size="medium"
          />
          <div className="form-check pt-2">
            <FormControlLabel
              className="mr-0"
              control={
                <Checkbox
                  checked={!seo.noIndex}
                  onChange={() => {
                    updateSEOData("noIndex", !seo.noIndex);
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
                    {seo.slug || "" || "slug"}
                  </span>
                </div>
                <div
                  className="mt-1 text-left u-fontNormal"
                  style={{ color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR }}
                >
                  {seo.seo_title || "" || "The title of the post"}
                </div>
                <div
                  className="mt-1 text-left"
                  style={{ color: pollution, wordBreak: "break-word" }}
                >
                  {seo.meta_description ||
                    "" ||
                    "Please enter meta description.If you leave this field blank, automatically portrait part of the main tranquility as meta description."}
                </div>
              </Paper>
            </div>
          ) : (
            <div className="mt-3 pb-3">
              <div className="p-2">
                <div className="d-flex flex-row-reverse align-items-center">
                  <span className="u-fontSmall" style={{ color: pollution }}>
                    {`${seo.slug || "" || "slug"}/domain.ir`}
                  </span>
                  <ArrowDropDownRoundedIcon style={{ color: pollution }} />
                </div>
                <div
                  className="text-left u-fontNormal"
                  style={{ color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR }}
                >
                  {seo.seo_title || "" || "The title of the post"}
                </div>
                <div
                  className="mt-1 text-left"
                  style={{
                    color: pollution,
                    overflowX: "scroll",
                    minHeight: 100,
                  }}
                >
                  {seo.meta_description ||
                    "Please enter meta description.If you leave this field blank, automatically portrait part of the main tranquility as meta description."}
                </div>
              </div>
            </div>
          )}
        </Collapse>
      </Paper>
      <Paper
        elevation={1}
        className="my-3 px-3 position-relative overflow-hidden"
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
          />
        )}
        <div
          className="d-flex align-items-center justify-content-between u-cursor-pointer"
          style={{ minHeight: 48 }}
          onClick={() => handleCollapse("thirdCollapse")}
        >
          <span>SEO analysis on this page</span>
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
                  <div key={item.id} className="px-2 mt-3">
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
                  <div key={item.id} className="px-2 mt-3">
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
          <div style={{ borderRight: `solid 4px ${jungleI}` }} className="my-3">
            {SEOResult &&
              Object.keys(SEOResult)
                .filter((item) => SEOResult[item].score === 2)
                .map((item) => (
                  <div key={item.id} className="px-2 mt-3">
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
      <PopUp
        open={isDialogBoxOpen}
        onClose={() => setDialogBox(false)}
        text="Are you willing to remove the label?"
        submitText="Remove the label"
        closeText="Cancel"
        onSubmit={() => {
          setDialogBox(false);
          _deleteCategory(category);
        }}
      />
      <Button
        color="primary"
        variant="contained"
        style={{ flex: 2 }}
        disabled={isLoading}
        onClick={submit}
        isLoading={isLoading}
      >
        Save changes
      </Button>
      {categoryId && (
        <Button
          color="primary"
          style={{ flex: 1 }}
          className="mr-2"
          disabled={isLoading}
          onClick={() => setDialogBox(true)}
        >
          Remove the label
        </Button>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  adminCategories: makeSelectBusinessLabels(),
  businessId: makeSelectBusinessId(),
  business: makeSelectBusiness(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  pluginsData: makeSelectPlugins(),
});

function mapDispatchToProps(dispatch) {
  return {
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: (index) => dispatch(removeFile(index)),
    _updateAdminCategory: (category, packagingPrice, discount) =>
      dispatch(updateCategory(category, packagingPrice, discount)),
    _deleteAdminCategory: (category) => dispatch(deleteCategory(category)),
    _createAdminCategory: (category, businessId, callback) =>
      dispatch(createCategory(category, businessId, callback)),

    _getBusinessLabels: () => dispatch(getBusinessLabels()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminCategory);
