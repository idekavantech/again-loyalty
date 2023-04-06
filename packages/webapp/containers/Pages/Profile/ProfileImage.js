/* eslint-disable no-nested-ternary */

import React, { memo } from "react";
import LazyImage from "@saas/components/LazyImage";
import AddIcon from "@material-ui/icons/Add";

function ProfileImage({ uploadedFile, user, themeColor }) {
  return (
    <>
      {uploadedFile ? (
        <LazyImage
          alt="uploaded-profile"
          src={uploadedFile.url}
          className="profile-image"
          style={{
            border: `2px dashed ${themeColor}`,
            backgroundColor: `${themeColor}21`,
          }}
        />
      ) : user && user.image_url ? (
        <LazyImage
          alt="profile"
          src={user.image_url}
          className="profile-image"
          style={{
            border: `2px dashed ${themeColor}`,
            backgroundColor: `${themeColor}21`,
          }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center profile-image"
          style={{
            border: `2px dashed ${themeColor}`,
            backgroundColor: `${themeColor}21`,
          }}
        >
          <AddIcon style={{ color: themeColor }} />
          <span style={{ color: themeColor }}>افزودن تصویر</span>
        </div>
      )}
    </>
  );
}

export default memo(ProfileImage);
