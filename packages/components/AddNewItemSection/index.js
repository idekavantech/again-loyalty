/**
 *
 * AddNewItemSection
 *
 */

import React, { memo } from "react";
import Add from "@material-ui/icons/Add";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import { handleKeyDown } from "@saas/utils/helpers/handleKeyDown";
function AddNewItemSection({
  className = "py-2 px-3",
  title,
  description,
  onClick,
  newVersion,
  color,
  hasError = false,
  ...props
}) {
  const theme = useTheme();
  return (
    <>
      {newVersion ? (
        <Button
          className={`d-flex w-100 flex-column justify-content-center cursorPointer u-font-semi-small u-border-radius-4 ${className}`}
          style={{
            border: `1px dashed ${color || theme.palette.primary.main}`,
            color: color || theme.palette.primary.main,
          }}
          onClick={onClick}
          onKeyDown={(e) => handleKeyDown(e, onClick)}
          role="button"
          tabIndex="0"
          {...props}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Add fontSize="small" />
            {title}
          </div>
        </Button>
      ) : (
        <Button
          className={`d-flex w-100 flex-column justify-content-center cursorPointer u-font-semi-small u-border-radius-4 ${className}`}
          style={{
            border: `1px dashed ${
              hasError ? "red" : color || theme.palette.primary.main
            }`,
            color: color || theme.palette.primary.main,
          }}
          onClick={onClick}
          onKeyDown={(e) => handleKeyDown(e, onClick)}
          role="button"
          tabIndex="0"
          {...props}
        >
          <div
            className={`d-flex align-items-center ${
              hasError ? "u-text-red" : ""
            }`}
          >
            <div style={{ color }}>{description}</div>
            <Add fontSize="small" className="ml-1" />
            {title}
          </div>
        </Button>
      )}
    </>
  );
}

export default memo(AddNewItemSection);
