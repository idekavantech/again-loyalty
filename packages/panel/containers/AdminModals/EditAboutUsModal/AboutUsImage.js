/* eslint-disable no-param-reassign */

import React, { memo } from "react";
import Add from "@material-ui/icons/Add";
import DeleteIcon from "@saas/components/Icon/DeleteIcon";
import LazyImage from "@saas/components/LazyImage";

function AboutUsImage({
  uploadedFile,
  myFiles,
  _removeFile,
  iconImage,
  setIconImage,
}) {
  if (uploadedFile) {
    return (
      <>
        <div
          onKeyDown={() => {}}
          role="button"
          tabIndex="0"
          onClick={(e) => {
            e.preventDefault();
            _removeFile();
            myFiles.current.value = "";
          }}
          className="removeImage"
        >
          <DeleteIcon />
        </div>
        <div className="c-profile-sec-modal mx-auto position-relative overflow-hidden">
          <LazyImage
            alt="uploaded-icon"
            src={uploadedFile.url}
            wrapperClassName="object-fit w-100 h-100"
            className="object-fit w-100 h-100"
          />
        </div>
      </>
    );
  }
  if (iconImage) {
    return (
      <>
        <div
          onKeyDown={() => {}}
          role="button"
          tabIndex="0"
          onClick={(e) => {
            e.preventDefault();
            setIconImage(null);
            myFiles.current.value = "";
          }}
          className="removeProfileImage"
        >
          <DeleteIcon />
        </div>
        <div className="c-profile-sec-modal mx-auto position-relative overflow-hidden">
          <LazyImage
            alt=""
            src={iconImage}
            className="object-fit w-100 h-100"
            wrapperClassName="object-fit w-100 h-100"
          />
        </div>
      </>
    );
  }
  return (
    <div className="d-flex flex-col justify-content-center align-items-center overflow-hidden">
      <Add fontSize="small" color="primary" className="w-20 h-20 m-1" />

      <div className="u-text-primary-blue-remove">Profile picture</div>
    </div>
  );
}

export default memo(AboutUsImage);
