import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { makeSelectBusinessId } from "@saas/stores/business/selector";
import { createCategory } from "@saas/stores/business/actions";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import Chip from "@material-ui/core/Chip";
import ThreeDotsBounceLoading from "@saas/components/ThreeDotsBounceLoading";
import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";
import Image from "next/image";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const CustomAutocomplete = withStyles({
  root: {
    borderRadius: 8,
    height: 48,
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

function LabelsSection({
  error,
  labels = [],
  product,
  onProductLabelsChange,
  setProduct,
  _createCategory,
  businessId,
}) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [label, setLabel] = useState("");
  const [tagValues, setTagValues] = useState([]);
  const [isLoadingAddCategory, setIsLoadingAddCategory] = useState(false);

  const { labels: selectedLabels = [] } = product;
  const theme = useTheme();
  const { minWidth576: isDesktop } = useResponsive();

  const addCategory = (category, newLabels) => {
    setIsLoadingAddCategory(true);
    _createCategory(
      {
        title: category,
        seo: "",
        extra_data: {},
      },
      businessId,
      (lab) => {
        setProduct({
          ...product,
          labels: [...selectedLabels, lab.id],
        });
        setTagValues(newLabels);
        setIsLoadingAddCategory(false);
      }
    );
  };
  const onChangeLabels = (event, newLabels) => {
    if (
      newLabels.find(
        (label, index) => !label.id && index === newLabels.length - 1
      )
    ) {
      const newVal = newLabels[newLabels.length - 1];
      if (newVal && label) {
        addCategory(newVal, newLabels);
      }
      setLabel("");
    } else {
      setLabel("");
      const selectedLabel = newLabels.filter((label) => !label.id);
      const cat = selectedLabel.length
        ? labels.filter((item) => selectedLabel.includes(item.name))
        : [];
      const newValue = [...newLabels.filter((label) => label.id), ...cat];
      setTagValues(newLabels);
      onProductLabelsChange(event, newValue);
    }
  };

  const autoCompleteProps = {
    ...(product?.labels?.length &&
      labels?.length && {
        defaultValue: labels?.filter((label) =>
          selectedLabels.includes(label.id)
        ),
      }),
  };

  const handleOpenVideoDialog = () => {
    setIsOpenDialog(true);
  };

  useEffect(() => {
    if (product?.labels?.length && labels?.length && !tagValues.length)
      setTagValues(
        labels?.filter((label) => selectedLabels.includes(label.id))
      );
  }, [product]);

  if (product && labels) {
    return (
      <AdminProductInBoxWrapper id="product-labels-section">
        <style
          dangerouslySetInnerHTML={{
            __html: `
                .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"] {
                    padding: 10px;
                    border-radius: 8px;
                }
                
              `,
          }}
        ></style>
        <div className="col-12">
          <div className="position-relative u-fontMedium u-fontWeightHeavy">
            Product label
          </div>
          {labels.length && tagValues ? (
            <CustomAutocomplete
              {...autoCompleteProps}
              multiple
              freeSolo
              options={labels}
              getOptionLabel={(option) => option.title}
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
                  ? tagValues.map((option, index) =>
                      option.title || !!option?.trim()?.length ? (
                        <>
                          <Chip
                            key={option.id}
                            label={
                              option.title ||
                              (typeof option === "string" && option)
                            }
                            {...getTagProps({ index })}
                            onDelete={() => {
                              getTagProps({ index }).onDelete();
                              setTagValues((prevState) =>
                                prevState.filter((item) => item !== option)
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
                      ) : null
                    )
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
                    placeholder="Enter the right tag."
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
          <div style={{ color: theme.palette.error.main }}>{error}</div>
          <p className={"mt-4"} style={{ color: "#00000099" }}>
            For the product of the black leather bracelet of the ladies of the labels{" "}
            <span className={"u-fontWeightHeavy"}>
              Bracelet, leather, black, feminine
            </span>{" "}
            use.
          </p>
        </div>
        <div
          className={
            "w-100 h-100 d-flex justify-content-between align-items-center mt-3 flex-wrap"
          }
        >
          <div
            className={
              "col-12 col-lg-5 d-flex flex-col h-100 justify-content-center"
            }
          >
            <h2
              className={`u-fontMedium u-fontWeightHeavy mb-3 ${
                !isDesktop ? "mt-3" : ""
              }`}
              style={{ color: "#202223" }}
            >
              What is the product label and why is it very important?
            </h2>
            <p
              className={"u-font-semi-small u-fontWeightMedium"}
              style={{ color: "#00000099" }}
            >
              Label your products to have a successful store. To
              Product label assistance can be a variety of categories according to
              Make your own need
            </p>
          </div>
          <div
            className={
              "col-11 col-lg-5 u-border-radius-8 position-relative d-flex justify-content-center u-cursor-pointer"
            }
            style={{
              backgroundColor: "#fff",
              boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.12)",
              paddingTop: 12,
              paddingBottom: 50,
              margin: isDesktop ? "auto 20px" : "4px auto",
            }}
            id={"productLabelHelpVideo"}
            onClick={handleOpenVideoDialog}
          >
            <Image
              className="u-border-radius-8"
              width={273}
              height={136}
              src={"/images/label-help-video-banner.svg"}
              alt="labels tutorial"
            />
            <div
              className={"position-absolute"}
              style={{
                width: isDesktop ? 330 : "87%",
                margin: "auto",
                left: 0,
                right: 0,
                bottom: 5,
              }}
            >
              <p
                className={`d-flex justify-content-center align-items-center u-fontWeightHeavy p-1 ${
                  !isDesktop ? "u-fontNormal" : ""
                }`}
                style={{ color: "#0044D9" }}
              >
                <PlayCircleFilledWhiteIcon
                  fontSize={isDesktop ? "large" : "normal"}
                  style={{
                    color: "#0044D9",
                  }}
                  className={`ml-3`}
                />
                How to tag the best?
              </p>
            </div>
          </div>
        </div>
        <Dialog
          open={isOpenDialog}
          onClose={() => setIsOpenDialog(false)}
          className="p-0 w-100"
          PaperProps={{ className: "m-2" }}
          maxWidth="md"
          disableScrollLock
        >
          <DialogContent className="w-100 p-0">
            <video autoPlay className="w-100 d-flex" controls>
              <source
                src={
                  "https://hs3-cf.behtarino.com/static/panel/helpvideos/labels-tutorial.mp4"
                }
              />
              Your browser does not support the video tag.
            </video>
          </DialogContent>
        </Dialog>
      </AdminProductInBoxWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  businessId: makeSelectBusinessId(),
});

function mapDispatchToProps(dispatch) {
  return {
    _createCategory: (category, businessId, callback) =>
      dispatch(createCategory(category, businessId, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(LabelsSection);
