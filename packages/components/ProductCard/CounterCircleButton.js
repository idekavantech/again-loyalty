/**
 *
 * AddNewItemSection
 *
 */

import React, { memo } from "react";
import { handleKeyDown } from "@saas/utils/helpers/handleKeyDown";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import useTheme from "@material-ui/core/styles/useTheme";

function CounterCircleButton({ onClick, count }) {
  const theme = useTheme();
  return (
    <div
      className="add-product-icn decreasable"
      style={{
        border: `2px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
      }}
      onClick={onClick}
      onKeyDown={(e) => handleKeyDown(e, onClick)}
      role="button"
      tabIndex="0"
    >
      {englishNumberToPersianNumber(count)}
    </div>
  );
}

CounterCircleButton.defaultProps = {};

export default memo(CounterCircleButton);
