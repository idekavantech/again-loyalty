/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 *
 * CategoryHeader
 *
 */

import React, { memo } from "react";

const pen = `/images/pen.svg`;
import LazyImage from "../LazyImage";

function CategoryHeader({
  categoryName,
  onCategoryEditButtonClick,
  isEditMode,
}) {
  return (
    <div className="d-flex py-2 justify-content-between u-textBlack">
      <span className="u-fontWeightBold u-fontSemiLarge">
        <h1 className="d-inline-block">{categoryName}</h1>
        {isEditMode && (
          <LazyImage
            alt=""
            className="mx-2 cursorPointer"
            src={pen}
            onClick={onCategoryEditButtonClick}
          />
        )}
      </span>
    </div>
  );
}

export default memo(CategoryHeader);
