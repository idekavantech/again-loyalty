import React, { useRef, useState } from "react";
import { noOp } from "@saas/utils/helpers/noOp";
import LazyImage from "@saas/components/LazyImage";
import AddNewItemSection from "@saas/components/AddNewItemSection";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Button from "@material-ui/core/Button";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

export default function ImageUploader({
  image,
  _uploadFile,
  callback,
  required,
  themeColor,
  size = 75,
  title = "Picture",
  width,
  formTheme,
  folderName = "business_page_images",
  tooltip,
  errorMessage,
  noAddButton = false,
}) {
  const titleWithRequired = (
    <div>
      {title}
      {required && <span className="mr-1">*</span>}
    </div>
  );
  const myFiles = useRef(null);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const dispatch = useDispatch();
  const _setSnackBarMessage = (message, type) =>
    dispatch(setSnackBarMessage(message, type));
  return (
    <div className="mt-2 d-flex align-items-end">
      <div
        role="button"
        tabIndex="0"
        onKeyDown={noOp}
        className="position-relative image-preview u-cursor-pointer"
        onClick={() => (image ? noOp() : myFiles.current.click())}
        style={
          image
            ? { width: size, height: size, backgroundColor: themeColor }
            : { width: width || "auto", height: size, display: "inline-block" }
        }
      >
        {image ? (
          <LazyImage
            style={{ width: size, height: size }}
            className="image-preview"
            alt=""
            src={image}
            onClick={() => myFiles.current.click()}
          />
        ) : (
          <AddNewItemSection
            className="py-2 px-3 h-100"
            align="center"
            hasError={!!errorMessage}
            title={errorMessage || titleWithRequired}
            color={formTheme}
          />
        )}
        {noAddButton ? null : (
          <div className="position-absolute bottom-0 left-0 u-cursor-pointer">
            <Button
              variant="contained"
              color="primary"
              style={{
                minWidth: "unset",
                padding: 2,
                marginRight: 2,
                ...(formTheme && { backgroundColor: formTheme }),
              }}
              onClick={() => myFiles.current.click()}
            >
              <AddRoundedIcon fontSize="small" className="u-text-white" />
            </Button>
          </div>
        )}
      </div>
      <label className="d-inline-block u-text-medium-grey u-font-semi-small-r c-input-file-label py-1 cursorPointer">
        <input
          ref={myFiles}
          className="d-none"
          type="file"
          onChange={() => {
            if (!myFiles.current.files[0].type.includes("image"))
              _setSnackBarMessage("The file format is not correct.", "fail");
            else _uploadFile(myFiles.current.files, folderName, callback);
          }}
          accept={"image/*"}
        />
      </label>
      {tooltip ? (
        <Tooltip
          placement="top"
          arrow
          title={
            <div className={"d-flex flex-col align-items-center"}>
              <p className="my-2">Size appropriate to upload photos</p>
              <p>{englishNumberToPersianNumber(tooltip)}</p>
            </div>
          }
          PopperProps={{
            disablePortal: true,
            className: "direction-ltr",
          }}
          disableHoverListener
          open={isOpenTooltip}
          onClose={() => setIsOpenTooltip(false)}
        >
          <Button
            style={{ minWidth: 30 }}
            onClick={() => setIsOpenTooltip(!isOpenTooltip)}
          >
            <InfoOutlinedIcon style={{ width: 20, height: 20 }} />
          </Button>
        </Tooltip>
      ) : null}
    </div>
  );
}
