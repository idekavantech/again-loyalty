/**
 *
 * AddNewItemSection
 *
 */

import React, { memo } from "react";
import Add from "@material-ui/icons/Add";
import useTheme from "@material-ui/core/styles/useTheme";

function AddNewProductCard({ onClick, className }) {
  const theme = useTheme();
  return (
    <div
      color="primary.main"
      style={{
        minHeight: 281,
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      }}
      className={`u-dashed-border u-border-radius-4 cursorPointer d-flex flex-column m-1 u-relative u-background-light-grey ${className}`}
      onClick={onClick}
    >
      <div className="u-text-primary-blue-remove d-flex justify-content-center align-items-center m-auto">
        <Add color="primary" className="ml-1" />
        new product
      </div>
    </div>
  );
}

AddNewProductCard.defaultProps = {
  className: "",
};

export default memo(AddNewProductCard);
