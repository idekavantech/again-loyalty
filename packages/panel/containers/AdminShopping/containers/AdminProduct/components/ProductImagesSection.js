import React, { useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { GridContextProvider, GridDropZone, GridItem } from "react-grid-dnd";
import { borderColor, jungleI } from "@saas/utils/colors";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import AddNewItemSection from "@saas/components/AddNewItemSection";
import LazyImage from "@saas/components/LazyImage";
import useTheme from "@material-ui/core/styles/useTheme";
import Input from "@saas/components/Input";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { makeStyles } from "@material-ui/core/styles";
import { skyI } from "@saas/utils/colors";
import PriorityHighRoundedIcon from "@material-ui/icons/PriorityHighRounded";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { useDispatch } from "react-redux";
import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";
import { handleKeyDown } from "@saas/utils/helpers/handleKeyDown";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import dynamic from "next/dynamic";
import { quillModules } from "store/constants";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const useStyle = makeStyles(() => ({
  tooltip: {
    backgroundColor: "#0050FF",
    color: "#fff",
    maxWidth: 220,
    lineHeight: "20px",
    fontSize: 11,
    borderRadius: 8,
    margin: "5px 0px",
    padding: 8,
  },
  arrow: {
    color: "#0050FF",
  },
}));
export default function ProductImagesSection({
  imagesArray,
  imagesAlt,
  isLoading,
  onProductImageDeleteClick,
  onChangeAltText,
  handleProductImagesOnDragEnd,
  onProductImagesChange,
  onProductDescriptionChange,
  product,
}) {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const myFiles = useRef(null);
  const { minWidth768 } = useResponsive();
  const theme = useTheme();
  const classes = useStyle();
  const dispatch = useDispatch();
  const _setSnackBarMessage = (message, type) =>
    dispatch(setSnackBarMessage(message, type));

  const { description = "" } = product;

  return (
    <div>
      <input
        className="d-none"
        ref={myFiles}
        type="file"
        multiple
        accept={"image/*"}
        onChange={() => {
          if (!myFiles.current.files[0].type.includes("image"))
            _setSnackBarMessage("The file format is not correct.", "fail");
          else onProductImagesChange(myFiles.current.files);
        }}
      />
      <div
        style={{
          padding: `20px ${minWidth768 ? "50px" : "20px"}`,
          fontWeight: 600,
          borderBottom: "1px solid #EEEEEE",
        }}
        className="u-fontVeryLarge"
      >
        Product Description and Pictures
      </div>

      <AdminProductInBoxWrapper>
        <div className="col-12">
          {isLoading ? (
            <LoadingIndicator isLocal isOpen={isLoading} />
          ) : (
            <GridContextProvider onChange={handleProductImagesOnDragEnd}>
              <div className="mb-2 mt-4">Pictures</div>
              <GridDropZone
                id="items"
                boxesPerRow={minWidth768 ? 7 : 2}
                dir="ltr"
                rowHeight={150}
                style={{
                  height: minWidth768
                    ? Math.ceil((imagesArray?.length + 1) / 7) * 150
                    : Math.ceil((imagesArray?.length + 1) / 2) * 150,
                  width: "100%",
                }}
              >
                {imagesArray?.map((item, index) => (
                  <GridItem
                    key={item.id}
                    style={{
                      border: index === 0 ? `2px solid ${jungleI}` : "",
                      padding: "4px",
                    }}
                  >
                    <div
                      className="position-relative"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <LazyImage
                        alt=""
                        className="u-border-radius-4 w-100 h-100"
                        wrapperClassName="w-100 h-100"
                        src={item.image_url || item.url}
                        style={{ objectFit: "cover" }}
                      />
                      <div className="liner-gradiant-card u-border-radius-4" />
                      <div className="u-cursor-pointer position-absolute left-0 bottom-0 p-1 z-index-2 d-flex">
                        <IconButton
                          className="p-0"
                          onClick={onProductImageDeleteClick(item)}
                        >
                          <DeleteIcon className="u-text-white" />
                        </IconButton>
                      </div>
                    </div>
                  </GridItem>
                ))}
                <GridItem key={0} className={"px-2"}>
                  <Button
                    className={`d-flex w-100 justify-content-center cursorPointer u-font-semi-small h-100 u-border-radius-8`}
                    style={{
                      border: `1px dashed ${theme.palette.primary.main}`,
                      color: theme.palette.primary.main,
                      minHeight: 150,
                    }}
                    onClick={() => myFiles.current.click()}
                    onKeyDown={(e) => handleKeyDown(e, onClick)}
                    tabIndex="0"
                  >
                    <div className="d-flex align-items-center flex-column u-fontWeightHeavy">
                      <span
                        className={"u-font-semi-small u-fontWeightNormal"}
                        style={{ color: theme.palette.primary.main }}
                      >
                        JPG،JPEG،PNG Acceptable formats
                      </span>
                      <ImageSearchIcon fontSize="small" className="ml-1 my-2" />
                      {"Product image"}
                    </div>
                  </Button>
                </GridItem>
              </GridDropZone>
              {imagesArray?.length ? (
                <>
                  <Input
                    labelPlacement="top"
                    label={
                      <>
                        <span>Replace the photo(Alt Text)</span>
                        <ClickAwayListener
                          onClickAway={() => setIsOpenTooltip(false)}
                        >
                          <Tooltip
                            placement="top"
                            PopperProps={{
                              disablePortal: true,
                            }}
                            arrow
                            classes={classes}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            onClose={() => setIsOpenTooltip(false)}
                            open={isOpenTooltip}
                            title={
                              <>
                                Alternative text that is effective on your site's SEO, to the code
                                HTML The product image is added and to the search engine
                                Helps to better understand the pictures of your products better
                                And make it available to the customer. Also when
                                The image is not properly loaded, alternative tag in
                                Will be displayed next to the image icon.
                              </>
                            }
                          >
                            <Button
                              style={{ minWidth: 30 }}
                              onClick={() => setIsOpenTooltip(!isOpenTooltip)}
                            >
                              <HelpOutlineRoundedIcon
                                style={{
                                  width: 20,
                                  height: 20,
                                  color: "#8C9196",
                                }}
                              />
                            </Button>
                          </Tooltip>
                        </ClickAwayListener>
                      </>
                    }
                    selectOnFocus
                    value={imagesAlt}
                    size="medium"
                    className="u-fontNormal"
                    onChange={onChangeAltText}
                  />
                  <div
                    className="u-font-semi-small mt-1 pr-1"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    In this section write a phrase to describe the photo. For example, the:
                    Women's sunglasses2045
                  </div>
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
                        {`In case of change of content"Replace the photo" And pressing the save button, then the content of this section will not be automatically updated according to the product name and you need to update it manually..`}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </GridContextProvider>
          )}
          <div className="mb-2 mt-5">Product Description</div>
          <ReactQuill
            placeholder="Explain the product and its traits to your customers."
            className="text-left"
            value={description || ""}
            onChange={onProductDescriptionChange}
            modules={quillModules}
            theme="snow"
          />
        </div>
      </AdminProductInBoxWrapper>
    </div>
  );
}
