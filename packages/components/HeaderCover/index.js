import React, { memo } from "react";
import AddNewItemSection from "../AddNewItemSection";
import LazyImage from "../LazyImage";

function HeaderCover({
  coverImage,
  className,
  overleyBgColor,
  isEditMode,
  onEditClick,
  parallax,
  altImage,
  opacity,
}) {
  const isIos =
    typeof navigator !== "undefined" &&
    ["iPhone", "iPad", "iPod"].includes(navigator.platform);
  return (
    <div
      className="align-items-center d-flex overflow-hidden"
      style={{
        backgroundImage: parallax && !isIos ? `url(${coverImage})` : "none",
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        opacity,
      }}
    >
      {coverImage && (!parallax || isIos) ? (
        <LazyImage src={coverImage} alt={altImage} style={{ opacity }} />
      ) : null}
      {className && (
        <div
          className={`bg--overly overflow-hidden ${className}`}
          style={{ backgroundColor: overleyBgColor }}
        />
      )}
      {isEditMode ? (
        <AddNewItemSection
          onClick={onEditClick}
          AddDescription="Add the original business image"
          title=".A showcase in which the images used is more likely to be selected by visitors"
        />
      ) : null}
    </div>
  );
}

export default memo(HeaderCover);
