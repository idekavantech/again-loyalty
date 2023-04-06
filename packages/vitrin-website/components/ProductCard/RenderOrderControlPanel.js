/**
 *
 * AddNewItemSection
 *
 */

import React, { memo } from "react";
import CounterCircleButton from "./CounterCircleButton";
import PlusCircleButton from "./PlusCircleButton";
import useTheme from "@material-ui/core/styles/useTheme";
function RenderOrderControlPanel({
  count,
  openOrderControlPanel,
  initialIncrement,
  isProductAvailable,
  isEditMode,
  product,
  selectedOrderInventory,
}) {
  const theme = useTheme();
  if (!product.available || (!isProductAvailable && !selectedOrderInventory)) {
    return (
      <div
        style={{ border: `2px solid`, color: theme.palette.text.disabled }}
        className="product-not-available u-font-small-r"
      >
        ناموجود
      </div>
    );
  }
  if (isEditMode) {
    return <div />;
  }
  if (count) {
    return (
      <CounterCircleButton onClick={openOrderControlPanel} count={count} />
    );
  }

  return <PlusCircleButton onClick={initialIncrement} />;
}

RenderOrderControlPanel.defaultProps = {};

export default memo(RenderOrderControlPanel);
