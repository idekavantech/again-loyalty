/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { useState, memo, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import {
  makeSelectBusiness,
  makeSelectBusinessId,
  makeSelectBusinessLabels,
  makeSelectHierarchy,
} from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useRouter } from "next/router";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import PopUp from "@saas/components/PopUp";
import Input from "@saas/components/Input";
import ImageUploader from "@saas/builder/SectionRenderer/components/ImageUploader";
import Chip from "@material-ui/core/Chip";
import { findKey } from "@saas/utils/helpers/findKey";
import { slugify } from "@saas/utils/helpers/slugify";

import { removeFile, uploadFile } from "@saas/stores/global/actions";
import {
  updateBusiness,
  getBusinessLabels,
} from "@saas/stores/business/actions";
import ModernSwtich from "@saas/components/ModernSwitch";
import { SEOAnalyser } from "@saas/utils/SEOHelper";
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
import dynamic from "next/dynamic";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { quillModules } from "store/constants";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import ThreeDotsBounceLoading from "@saas/components/ThreeDotsBounceLoading";
import { createCategory } from "@saas/stores/business/actions";
import Switch from "@saas/components/Switch";

const CustomAutocomplete = withStyles({
  root: {
    borderRadius: 8,
  },
  inputRoot: {
    paddingLeft: "2px !important",
  },
  tag: {
    marginBottom: 4,
    backgroundColor: "#DFE9FF",
    height: 24,
    position: "relative",
    zIndex: 0,
    direction: "ltr",
    padding: 4,
    "& .MuiChip-label": {
      paddingLeft: 8,
      paddingRight: 0,
    },
    "& .MuiChip-deleteIcon": {
      color: "#0050FF",
      margin: "0 4px",
    },
  },
})(Autocomplete);

function AdminNavigation({
  isLoading,
  categories,
  _uploadFile,
  _removeFile,
  hierarchy,
  _updateBusiness,
  business,
  _getBusinessLabels,
  urlPrefix,
}) {
  const router = useRouter();
  const itemId = router.query.id === "new" ? null : router.query.id;
  const parentId = router.query.parent;
  const [SEOResult, setSeoResult] = useState(null);
  const theme = useTheme();
  const [selectedCategories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const _createCategory = (category, businessId, callback) =>
    dispatch(createCategory(category, businessId, callback));

  const [isCollapseOpen, SetCollapseOpen] = useState({
    firstCollapse: false,
    secondCollapse: false,
    thirdCollapse: false,
  });
  const handleCollapse = (e) => {
    SetCollapseOpen({ ...isCollapseOpen, [e]: !isCollapseOpen[e] });
  };
  const updateSEOData = (propertyName, propertyValue) => {
    const newSEO = { ...seo };
    newSEO[propertyName] = propertyValue;
    setSeo(newSEO);
  };
  const labels = useSelector(makeSelectBusinessLabels());
  const businessId = useSelector(makeSelectBusinessId());

  const [errors, setErrors] = useState(["", ""]);
  const [name, setName] = useState("");
  const [richtext, setRichtext] = useState("");
  const [seo, setSeo] = useState({});
  const [image, setImage] = useState("");
  const [dialog, setDialog] = useState(false);
  const [label, setLabel] = useState("");
  const [tagValues, setTagValues] = useState([]);
  const [isLoadingAddCategory, setIsLoadingAddCategory] = useState(false);
  const [conjoined, setConjoined] = useState(false);
  const [isActive, toggleActivity] = useState(false);

  useEffect(() => {
    _getBusinessLabels();
    const object = findKey(hierarchy, itemId);
    if (!itemId) {
      setSeo({});
    } else if (object) {
      setName(object.name || "");
      setRichtext(object?.extra_data?.richtext || "");
      setImage(object.image || "");
      setCategories(object.categories || []);
      setTagValues(object.categories);
      if (object.seo && Object.keys(object.seo).length === 0) {
        // setSeo({});
      } else {
        setSeo(object.seo || {});
      }
      setConjoined(object.conjoined === undefined ? false : object.conjoined);
    }
  }, [itemId]);

  const [isDesktopPreview, setDesktopPreview] = useState(false);
  useEffect(() => {
    if (seo) {
      setTimeout(() => {
        const result = SEOAnalyser({
          ...seo,
          business_url: business.get_vitrin_absolute_url,
        });
        setSeoResult(result);
      }, 0);
    }
  }, [seo]);

  const submit = () => {
    setErrors([
      !name ? "Please enter the category name.." : "",
      !selectedCategories.length ? "Please select category" : "",
    ]);
    if (name && selectedCategories.length) {
      if (itemId) {
        const object = findKey(hierarchy, itemId);
        if (object) {
          object.categories = selectedCategories;
          object.name = name;
          object.image = image;
          object.conjoined = conjoined;
          object.seo = seo;
          object.extra_data = { richtext };
          _updateBusiness({ menu: hierarchy }, undefined, undefined, () =>
            router.push(`${urlPrefix}s/settings/c`)
          );
        }
      } else if (parentId) {
        const object = findKey(hierarchy, parentId);
        if (object)
          object.children = [
            ...object.children,
            {
              id: hierarchy.currentId,
              name,
              parent: +parentId,
              children: [],
              categories: selectedCategories,
              conjoined,
              seo,
              extra_data: {
                richtext: richtext,
              },
            },
          ];
        _updateBusiness(
          {
            menu: {
              ...hierarchy,
              currentId: hierarchy.currentId + 1,
            },
          },
          undefined,
          undefined,
          () => router.push(`${urlPrefix}s/settings/c`)
        );
      }
    }
  };

  useEffect(() => {
    if (!parentId) router.replace(router.asPath + "?parent=0");
  }, [parentId]);

  const addCategoryRequest = (category) => {
    setIsLoadingAddCategory(true);
    _createCategory(
      {
        title: category,
        seo: "",
        extra_data: {},
      },
      businessId,
      (createdLabel) => {
        setCategories([...selectedCategories, createdLabel?.id]);
        setTagValues([...tagValues, createdLabel?.id]);
        setIsLoadingAddCategory(false);
      }
    );
  };

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const onChangeLabels = (event, newLabels) => {
    // newLabels array includes either only id or the whole object of label
    if (
      newLabels.find(
        (label, index) => !label?.id && index === newLabels.length - 1
      )
    ) {
      const newVal = newLabels[newLabels.length - 1];
      if (newVal && label) {
        addCategoryRequest(newVal, newLabels);
      }
      setLabel("");
    } else {
      setLabel("");
      const newValue = [
        ...removeDuplicates(newLabels.map((label) => label?.id || label)),
      ];
      setTagValues(newValue);
      setCategories(newValue);
    }
  };
  return (
    <div className="container pb-3">
      <AdminBreadCrumb />
      <Paper elevation={2} className="d-flex flex-wrap my-3 py-3">
        <div className="col-12 col-lg-6">
          <div className="flex-1 u-fontLarge">Basic Information</div>
          <Input
            className="mt-4"
            label="Category title"
            value={name}
            onChange={setName}
            size="medium"
            assistive={errors[0]}
          />
        </div>
        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <div className="u-fontLarge">Category image</div>
          <ImageUploader
            _uploadFile={_uploadFile}
            image={image}
            callback={(img) => {
              setImage(img);
              _removeFile();
            }}
            folderName="business_category_images"
          />
        </div>
      </Paper>
      <Paper elevation={2} className="d-flex flex-wrap my-3 py-3">
        <div className="col-12 col-lg-6">
          <div className="flex-1 u-fontLarge">Select the label</div>
          <div style={{ color: theme.palette.text.disabled }} className="mt-1">
            What tags do you display in this category?
          </div>
          {labels.length && tagValues ? (
            <CustomAutocomplete
              multiple
              freeSolo
              value={tagValues}
              options={labels}
              getOptionLabel={(option) => option.title || option}
              onChange={(e, newLabels) => {
                onChangeLabels(
                  e,
                  newLabels.filter((n) => {
                    return typeof n !== "string" || !!n.trim().length;
                  })
                );
              }}
              filterSelectedOptions
              size="small"
              disableClearable
              ChipProps={{ size: "small", variant: "outlined" }}
              renderTags={(_, getTagProps) => {
                return tagValues.length
                  ? tagValues.map((labelId, index) => {
                      const foundLabel = categories.find(
                        (cat) => labelId === cat.id
                      );

                      return foundLabel?.title ||
                        !!foundLabel?.trim()?.length ? (
                        <>
                          <Chip
                            key={foundLabel?.id}
                            label={
                              foundLabel.title ||
                              (typeof foundLabel === "string" && foundLabel)
                            }
                            {...getTagProps({ index })}
                            onDelete={() => {
                              getTagProps({ index }).onDelete();
                              setTagValues((prevState) =>
                                prevState.filter(
                                  (item) => item !== foundLabel.id
                                )
                              );
                              setCategories((prevState) =>
                                prevState.filter(
                                  (item) => item !== foundLabel.id
                                )
                              );
                            }}
                          />
                          {isLoadingAddCategory &&
                            index === tagValues.length - 1 && (
                              <ThreeDotsBounceLoading
                                color={"#0050FF"}
                                size={8}
                                className="ml-1"
                                nameOfComponent="newFinalPriceThreeDots"
                              />
                            )}
                        </>
                      ) : null;
                    })
                  : isLoadingAddCategory && (
                      <ThreeDotsBounceLoading
                        color={"#0050FF"}
                        size={8}
                        className="ml-1"
                        nameOfComponent="newFinalPriceThreeDots"
                      />
                    );
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    margin="dense"
                    onChange={(e) => {
                      setLabel(e.target.value.trim());
                    }}
                    size="small"
                    variant="outlined"
                    className={"a888"}
                    placeholder="add"
                    value={label}
                    InputProps={{
                      ...params.InputProps,
                      className: `${params.InputProps.className} pr-2 pl-3 b888`,
                      endAdornment: (
                        <>
                          {label ? (
                            <Button
                              color="primary"
                              onClick={(e) => {
                                e.preventDefault();
                                const newLabels = [...tagValues, label];
                                onChangeLabels(
                                  e,
                                  newLabels.filter((n) => {
                                    return (
                                      typeof n !== "string" || !!n.trim().length
                                    );
                                  })
                                );
                              }}
                              style={{
                                width: 35,
                                height: 35,
                                color: "#0050FF",
                                cursor: "pointer",
                                fontSize: "13px",
                              }}
                            >
                              Confirm
                            </Button>
                          ) : null}
                        </>
                      ),
                    }}
                  />
                );
              }}
            />
          ) : (
            <div className={"mt-3"}>
              <ThreeDotsBounceLoading
                color={"#0050FF"}
                size={8}
                className="ml-1"
                nameOfComponent="newFinalPriceThreeDots"
              />
            </div>
          )}

          <div
            style={{ color: theme.palette.error.main }}
            className="u-font-semi-small mt-1"
          >
            {errors[1]}
          </div>
        </div>
        <div className="col-12 col-lg-6 mt-lg-0 mt-3">
          <div className={"d-flex"}>
            <div className="u-fontLarge ml-2">advanced settings</div>
            <Switch
              id="product-availability"
              onColor={theme.palette.primary.main}
              isSwitchOn={isActive}
              toggleSwitch={() => toggleActivity(!isActive)}
            />
          </div>
          <Collapse isOpened={isActive}>
            <>
              <div
                style={{ color: theme.palette.text.disabled }}
                className="mt-1"
              >
                In case of gathering labels, all your selected labels are displayed together
                They are given.
              </div>
              <ModernSwtich
                width={300}
                className="mt-3"
                isSwitchOn={conjoined}
                toggleSwitch={setConjoined}
                texts={["Tags community", "Tags Share"]}
              />
            </>
          </Collapse>
        </div>
      </Paper>
      <Paper elevation={2} className="d-flex flex-wrap my-3 py-3">
        <div className="col-12">
          <div className="flex-1 u-fontLarge mb-2">Category Description</div>
          <div>
            <ReactQuill
              placeholder="Explain the product and its traits to your customers."
              className="text-left "
              value={richtext || ""}
              onChange={(value) => {
                setRichtext(value);
              }}
              modules={quillModules}
              theme="snow"
            />
          </div>
        </div>
      </Paper>
      <Paper elevation={1} className="my-3 px-3">
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
                updateSEOData("slug", slugify(seo.seo_title));
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
            className="u-font-semi-small"
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
            className="u-font-semi-small mt-1"
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
            className="u-font-semi-small"
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
              `${business.get_vitrin_absolute_url}/s/c/${itemId || ""}`
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
          ></div>
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
        open={dialog}
        onClose={() => setDialog(false)}
        text="Would you like to remove the category?"
        submitText="Classification Remove"
        closeText="Cancel"
        onSubmit={() => {
          setDialog(false);
          const object = findKey(hierarchy, itemId);
          if (object) {
            const parent = findKey(hierarchy, object.parent);
            const objectIndex = parent.children.findIndex(
              (c) => c.id === parseInt(itemId)
            );
            parent.children.splice(objectIndex, 1);
            parent.children = [...parent.children];
          }
          _updateBusiness({
            menu: {
              ...hierarchy,
              currentId: hierarchy.currentId,
            },
          });
          router.back();
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
      {itemId && (
        <Button
          color="primary"
          style={{ flex: 1 }}
          className="mr-2"
          disabled={isLoading}
          onClick={() => setDialog(true)}
        >
          Classification Remove
        </Button>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  categories: makeSelectBusinessLabels(),
  hierarchy: makeSelectHierarchy(),
  business: makeSelectBusiness(),
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: (index) => dispatch(removeFile(index)),
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
    _getBusinessLabels: () => dispatch(getBusinessLabels()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminNavigation);
