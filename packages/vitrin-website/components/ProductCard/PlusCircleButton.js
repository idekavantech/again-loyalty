/**
 *
 * AddNewItemSection
 *
 */

import React, { memo } from "react";
import Add from "@material-ui/icons/Add";
import { hexToRGBA } from "utils/helpers/hexToRGBA";
import { handleKeyDown } from "utils/helpers/handleKeyDown";
import useTheme from "@material-ui/core/styles/useTheme";
function PlusCircleButton({ onClick }) {
  const theme = useTheme();
  return (
    <div
      id="productPageAddProduct"
      style={{ border: `2px solid ${theme.palette.secondary.main}` }}
      className="addProduct add-product-icn position-absolute"
      onClick={onClick}
      color={hexToRGBA(theme.palette.secondary.main, 0.3)}
      onKeyDown={(e) => handleKeyDown(e, onClick)}
      role="button"
      tabIndex="0"
    >
      <Add fontSize="small" color="secondary" />
    </div>
  );
}

PlusCircleButton.defaultProps = {};

export default memo(PlusCircleButton);
