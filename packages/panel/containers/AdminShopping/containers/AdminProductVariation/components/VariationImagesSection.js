import React, { useRef, useState } from "react";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
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
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { useDispatch } from "react-redux";
import { handleKeyDown } from "@saas/utils/helpers/handleKeyDown";

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
export default function VariationImagesSection({
  imagesArray,
  imagesAlt,
  isLoading,
  onVariationImageDeleteClick,
  onChangeAltText,
  handleVariationImagesOnDragEnd,
  onVariationImagesChange,
}) {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const myFiles = useRef(null);
  const { minWidth768 } = useResponsive();
  const theme = useTheme();
  const classes = useStyle();
  const dispatch = useDispatch();
  const _setSnackBarMessage = (message, type) =>
    dispatch(setSnackBarMessage(message, type));

  return (
    <div className="my-4">
      <input
        className="d-none"
        ref={myFiles}
        type="file"
        multiple
        accept={"image/*"}
        onChange={() => {
          if (!myFiles.current.files[0].type.includes("image"))
            _setSnackBarMessage("The file format is not correct.", "fail");
          else onVariationImagesChange(myFiles.current.files);
        }}
      />
      <div
        style={{
          padding: `16px ${minWidth768 ? "50px" : "20px"} 0px`,
          fontWeight: 600,
        }}
        className="u-fontVeryLarge"
      >
        Pictures
      </div>
      <div className="p-4 w-100">
        {isLoading ? (
          <LoadingIndicator isLocal isOpen={isLoading} />
        ) : (
          <GridContextProvider onChange={handleVariationImagesOnDragEnd}>
            <GridDropZone
              id="items"
              boxesPerRow={minWidth768 ? 5 : 2}
              dir="ltr"
              rowHeight={150}
              style={{
                height: minWidth768
                  ? Math.ceil((imagesArray?.length + 1) / 5) * 150
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
                        onClick={onVariationImageDeleteClick(item)}
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
                              Helps to better understand the pictures of your products and
                              To make it available to the customer. Also when
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
                  In this section write a phrase to describe the photo. For example, the: Glasses
                  Women's sunny model2045
                </div>
              </>
            ) : null}
          </GridContextProvider>
        )}
      </div>
    </div>
  );
}
