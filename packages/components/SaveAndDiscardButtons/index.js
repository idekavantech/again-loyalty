import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
function SaveAndDiscardButtons({
  saveAction,
  secondButtonAction,
  saveText,
  secondButtonText,
  disabled,
  secondButton,
}) {
  const {minWidth576} = useResponsive()
  return (
    <>
      {minWidth576 ? (
        <div className="mt-3 mb-5">
          <Button
            style={{ width: 108 }}
            variant="contained"
            color="primary"
            onClick={saveAction}
            className="u-fontMedium px-0 ml-1"
            disabled={disabled}
          >
            {saveText}
          </Button>

          {secondButton && (
            <Button
              color="primary"
              style={{ width: 108 }}
              onClick={secondButtonAction}
            >
              {secondButtonText}
            </Button>
          )}
        </div>
      ) : (
        <div
          style={{ boxShadow: "0px 0px 20px rgba(0, 40, 60, 0.16)" }}
          className="fixed-bottom p-3 bg-white d-flex align-items-center w-100"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={saveAction}
            className={
              "u-fontMedium px-0 ml-1 " + (secondButton ? "w-75" : "w-100")
            }
            disabled={disabled}
          >
            {saveText}
          </Button>

          {secondButton && (
            <Button
              color="primary"
              className="w-25"
              onClick={secondButtonAction}
            >
              {secondButtonText}
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default memo(SaveAndDiscardButtons);
