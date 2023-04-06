import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import { noOp } from "@saas/utils/helpers/noOp";
function DrawerButtons({
  goBack,
  disabled,
  submitText,
  goBackText,
  submit,
  isLoading,
  assistiveText,
  submitId,
  shake,
}) {
  return (
    <div className="c-main-cta-sec  p-2">
      {assistiveText && (
        <div className="p-2 u-font-semi-small u-text-dark-grey">
          {assistiveText}
        </div>
      )}
      <div className="d-flex">
        {goBack && (
          <Button
            color="secondary"
            className="ml-3"
            onClick={goBack}
            style={{ flex: 0.5 }}
          >
            {goBackText}
          </Button>
        )}
        <div
          tabIndex="0"
          onKeyDown={noOp}
          role="button"
          className="d-flex flex-1"
          onClick={() => {
            if (disabled && shake) shake();
          }}
        >
          <Button
            id={submitId}
            color="secondary"
            variant="contained"
            className="flex-1"
            disabled={disabled || isLoading}
            onClick={submit}
          >
            {submitText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(DrawerButtons);
