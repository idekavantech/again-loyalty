import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import useTheme from "@material-ui/core/styles/useTheme";
import Input from "@saas/components/Input";
import ModernSwtich from "@saas/components/ModernSwitch";
import React, { useState } from "react";
import { cement, night, pollution } from "@saas/utils/colors";
import { slugify } from "@saas/utils/helpers/slugify";
import { skyI } from "@saas/utils/colors";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import Checkbox from "@material-ui/core/Checkbox";
import PriorityHighRoundedIcon from "@material-ui/icons/PriorityHighRounded";
import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
export default function SeoSettingsSection({
  seo,
  setSeo,
  product,
  business,
  productCategoriesName,
}) {
  const [isDesktopPreview, setDesktopPreview] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const updateSEOData = (propertyName, propertyValue) => {
    let defaultValue;
    switch (propertyName) {
      case "seo_title":
        defaultValue = `${product?.title} | Online shopping with the highest% Discounts from${business.revised_title}`;
        break;
      case "meta_description":
        defaultValue = `online shopping${
          product?.title
        }View details and discounts and send fast. ${
          productCategoriesName?.length
            ? "Buy the types," + productCategoriesName.join(" And")
            : ""
        } With the best price of${business.revised_title}`;
        break;
      case "keyphrase":
      case "slug":
        defaultValue = product?.title;
        break;
    }
    setSeo((seoData) => {
      if (!product.seo[propertyName] && propertyValue == defaultValue) {
        let resultData = {};
        for (const [key, value] of Object.entries(seoData)) {
          if (key != propertyName) resultData[key] = value;
        }
        return resultData;
      }
      return { ...seoData, [propertyName]: propertyValue };
    });
  };
  const theme = useTheme();

  const { minWidth768 } = useResponsive();

  return (
    <AdminProductInBoxWrapper padding={`0px ${minWidth768 ? "48px" : ""}`}>
      <div className={"col-12"}>
        <div className="my-3 position-relative overflow-hidden">
          <div
            className="d-flex align-items-center justify-content-between u-cursor-pointer"
            style={{ minHeight: 48 }}
            onClick={() => setCollapse(!collapse)}
          >
            <span className="u-fontLarge u-fontWeightBold">SEO settings</span>
            {collapse ? (
              <ArrowDropUpRoundedIcon fontSize="large" />
            ) : (
              <ArrowDropDownRoundedIcon fontSize="large" />
            )}
          </div>
          <Collapse in={collapse}>
            <div className="px-3">
              {product?.id && (
                <div
                  className="py-3 px-2 d-flex align-items-center mt-3"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(0, 190, 240, 0.08), rgba(0, 190, 240, 0.08)), #FFFFFF",
                    border: "1px solid rgba(0, 190, 240, 0.5)",
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: skyI,
                      width: 24,
                      height: 24,
                      minWidth: 24,
                      minHeight: 24,
                      borderRadius: "50%",
                    }}
                    className="d-flex justify-content-center align-items-center ml-2"
                  >
                    <PriorityHighRoundedIcon style={{ color: "white" }} />
                  </div>
                  <div className="w-100">
                    <div className="w-100 mt-3">
                      If you change the SEO items and press the Save button, then
                      Content of this section based on the product name automatically up -to -date
                      Will not be and it is necessary to update it manually.
                    </div>
                  </div>
                </div>
              )}
              <Input
                label="SEO title"
                placeholder="For example about us"
                value={seo.seo_title}
                onChange={(value) => {
                  updateSEOData("seo_title", value);
                }}
                onBlur={() => {
                  if (!seo?.slug) {
                    setTimeout(() => {
                      updateSEOData("slug", slugify(seo?.seo_title));
                    }, 0);
                  }
                }}
                className="mt-4"
                size="medium"
              />
              <Input
                label="Key word"
                placeholder="For example, showcase"
                value={seo.keyphrase}
                onChange={(value) => updateSEOData("keyphrase", value)}
                className="mt-4"
                size="medium"
              />
              <div
                className="u-font-semi-small mt-1 pr-1"
                style={{ color: theme.palette.text.secondary }}
              >
                Keywords are the same words on Google search and pages associated with
                It is displayed.
              </div>
              <TextField
                label="Meta Description"
                placeholder="Lorem Ipsom is a fake text with an inappropriate simplicity of the printing industry, using graphic designers"
                value={seo.meta_description}
                onChange={(e) =>
                  updateSEOData("meta_description", e.target.value)
                }
                className="mt-4 w-100"
                inputProps={{ maxLength: 320 }}
                multiline
                rows={4}
                variant="outlined"
              />
              <div
                className="u-font-semi-small mt-1 pr-1"
                style={{ color: theme.palette.text.secondary }}
              >
                Meta's description is the same short text that on Google below the title of each link
                is shown.
              </div>
              <Input
                label="Dust"
                placeholder="For example making coffee"
                value={seo.slug}
                onChange={(value) => updateSEOData("slug", slugify(value))}
                className="mt-4"
                size="medium"
              />
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
                value={seo?.head_script || ""}
                onChange={(e) => updateSEOData("head_script", e.target.value)}
                className="mt-3 w-100"
                inputProps={{ maxLength: 1000 }}
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

              <div className="u-fontLarge mt-4 mb-3" style={{ color: night }}>
                How to display in Google Results
              </div>
              <ModernSwtich
                texts={["Mobile", "desktop"]}
                toggleSwitch={() => setDesktopPreview(!isDesktopPreview)}
                isSwitchOn={isDesktopPreview}
              />
              {!isDesktopPreview ? (
                <div className="mt-4 pb-4">
                  <Paper elevation={1} className="p-2">
                    <div
                      style={{ color: cement }}
                      className="d-flex flex-row-reverse align-items-center"
                    >
                      <PublicRoundedIcon fontSize="small" />
                      <span className="ml-1 u-fontSmall">domain.ir</span>
                      <KeyboardArrowRightRoundedIcon fontSize="small" />
                      <span className="u-fontSmall">
                        {seo?.slug || "" || "slug"}
                      </span>
                    </div>
                    <div
                      className="mt-1 text-left u-fontNormal"
                      style={{
                        color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                      }}
                    >
                      {seo?.seo_title || "" || "The title of the post"}
                    </div>
                    <div
                      className="mt-1 text-left"
                      style={{ color: pollution, wordBreak: "break-word" }}
                    >
                      {seo?.meta_description ||
                        "" ||
                        "Please enter meta description.If you leave this field blank, automatically portrait part of the main tranquility as meta description."}
                    </div>
                  </Paper>
                </div>
              ) : (
                <div className="mt-4 pb-4">
                  <div className="d-flex flex-row-reverse align-items-center">
                    <span className="u-fontSmall" style={{ color: pollution }}>
                      {`${seo?.slug || "" || "slug"}/domain.ir`}
                    </span>
                    <ArrowDropDownRoundedIcon style={{ color: pollution }} />
                  </div>
                  <div
                    className="text-left u-fontNormal"
                    style={{ color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR }}
                  >
                    {seo?.seo_title || "" || "The title of the post"}
                  </div>
                  <div
                    className="mt-1 text-left"
                    style={{
                      color: pollution,
                      minHeight: 100,
                    }}
                  >
                    {seo?.meta_description ||
                      "Please enter meta description.If you leave this field blank, automatically portrait part of the main tranquility as meta description."}
                  </div>
                </div>
              )}
            </div>
          </Collapse>
        </div>
      </div>
    </AdminProductInBoxWrapper>
  );
}
