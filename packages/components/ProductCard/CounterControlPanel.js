/**
 *
 * AddNewItemSection
 *
 */

import React, { memo, useRef } from "react";
import Add from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { handleKeyDown } from "@saas/utils/helpers/handleKeyDown";
import { useOutsideAlerter } from "@saas/utils/hooks/useOutsideAlerter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

function CounterControlPanel({
  count,
  increment,
  decrement,
  toggleControlMode,
  className,
  style,
  product,
  selectedOrderInventory,
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => toggleControlMode(false));
  return (
    <Paper
      className={`deal-card-control-mode ${className}`}
      style={style}
      ref={wrapperRef}
    >
      <Add
        color="secondary"
        className="d-flex flex-1 justify-content-center u-cursor-pointer"
        fontSize="small"
        onClick={(e) => {
          increment(e);
        }}
        style={{
          visibility:
            !product.default_variation.available ||
            (!product.default_variation.keep_selling &&
              product.default_variation.inventory_count <=
                selectedOrderInventory)
              ? "hidden"
              : "",
        }}
      />
      <div>{englishNumberToPersianNumber(count)}</div>
      <div
        className="d-flex justify-content-center u-cursor-pointer"
        onClick={decrement}
        onKeyDown={(e) => handleKeyDown(e, decrement)}
        role="button"
        tabIndex="0"
      >
        {count > 1 ? (
          <RemoveRoundedIcon fontSize="small" color="secondary" />
        ) : (
          <DeleteIcon fontSize="small" color="secondary" />
        )}
      </div>
    </Paper>
  );
}

export default memo(CounterControlPanel);
