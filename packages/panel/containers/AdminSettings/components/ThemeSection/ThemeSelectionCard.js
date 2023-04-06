import React from "react";
import LazyImage from "@saas/components/LazyImage";
const ThemeSelectionCard = (props) => {
  const { image, onSelect, onClick } = props;
  return (
    <div style={{ width: "145px" }}>
      <div
        role="button"
        tabIndex="0"
        onKeyDown={() => {}}
        className="theme--selection--card u-cursor-pointer"
        onClick={onClick}
      >
        <LazyImage
          alt={image}
          className="w-100 h-100 object-fit-cover"
          src={image}
        />
      </div>
      {onSelect && (
        <div className="mt-1 d-flex justify-content-between align-items-center">
          <button
            className="u-text-primary-blue-remove u-fontNormal p-1"
            onClick={onClick}
          >
            Preview
          </button>

          <button
            className="u-text-primary-blue-remove u-fontNormal u-border-primary-blue u-border-radius-4 p-1"
            onClick={onSelect}
          >
            Selection
          </button>
        </div>
      )}
    </div>
  );
};
export default ThemeSelectionCard;
