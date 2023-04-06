import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { graphite, night, strawberryI } from "@saas/utils/colors";
import Divider from "@material-ui/core/Divider";
import Input from "@saas/components/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Alert from "@material-ui/lab/Alert";

import { DAY, HOUR, MINUTE } from "@saas/plugins/Shopping/constants";
const FAST_PREORDER = "fast-preorder";
const FAST = "fast";
const SCHEDULED = "scheduled";
const CUSTOM = "custom";

const delivery_timing_types_has_timer_component = {
  [FAST_PREORDER]: false,
  [FAST]: true,
  [SCHEDULED]: false,
  [CUSTOM]: false,
};
const time_units = {
  [MINUTE]: 1 * 60,
  [HOUR]: 60 * 60,
  [DAY]: 24 * 60 * 60,
};
export function AcceptOrderModal({
  order,
  isOpen,
  onClose,
  submit,
  isLoading,
  description,
  iframeFromPos,
  isCardToCardPayment,
}) {
  const [valueOfTime, setValueOfTime] = useState(45);
  const [timeMethod, setTimeMethod] = useState(MINUTE);
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="mb-2 w-100">
        <div style={{ color: night, fontWeight: 500 }}>Confirm the order</div>
        {!isCardToCardPayment ? (
          <div className="mt-4" style={{ color: graphite }}>
            Are you sure you want to confirm this order?
          </div>
        ) : <Alert severity="warning" className={"mt-2"}>
          Paying this order is through card card. Do you confirm the validity of the receipt according to the bank's deposit text?
        </Alert>}
        {description && (
          <div
            className="p-5 mt-4"
            style={{
              background: "rgba(255, 0, 56, 0.08)",
              border: "1px solid rgba(255, 0, 56, 0.5)",
              borderRadius: "8px",
              color: strawberryI,
            }}
          >
            {description}
          </div>
        )}
        {(delivery_timing_types_has_timer_component[
          order?.delivery_timing_type
        ] ||
          iframeFromPos) && (
          <div>
            <Divider className="mt-5 mb-4" />
            <div>The time of receiving the order by the customer</div>
            <div className="mt-4" style={{ color: graphite }}>
              This time is displayed to the customer and the equivalent of the time it is after
              The order reaches the customer's hand.
            </div>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <Input
                type="number"
                value={valueOfTime}
                onChange={(value) => setValueOfTime(value)}
                size="medium"
                InputProps={{
                  className: "small",
                }}
                InputLabelProps={{
                  className: "small",
                }}
              />
              <div className="w-100 mr-5">
                <FormControl variant="outlined" className="w-100">
                  <Select
                    value={timeMethod}
                    onChange={(event) => setTimeMethod(event.target.value)}
                    className="medium"
                    style={{ height: 36 }}
                  >
                    <MenuItem value={MINUTE}>Minutes</MenuItem>
                    <MenuItem value={HOUR}>the watch</MenuItem>
                    <MenuItem value={DAY}>Day</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        {iframeFromPos ? (
          <div className="d-flex">
            <Button
              onClick={() => {
                if (
                  delivery_timing_types_has_timer_component[
                    order?.delivery_timing_type
                  ]
                ) {
                  submit(valueOfTime * time_units[timeMethod]);
                } else {
                  submit();
                }
                window.parent.postMessage(
                  JSON.stringify({ type: "order", order }),
                  "*"
                );
                onClose();
              }}
              variant="contained"
              color="primary"
              className="u-box-shadow-none u-fontMedium"
              size="medium"
              disabled={isLoading}
            >
              Confirm the order(With printing){" "}
            </Button>
            <Button
              onClick={() => {
                if (
                  delivery_timing_types_has_timer_component[
                    order?.delivery_timing_type
                  ]
                ) {
                  submit(valueOfTime * time_units[timeMethod]);
                } else {
                  submit();
                }
                onClose();
              }}
              variant="outlined"
              color="primary"
              className="u-box-shadow-none u-fontMedium mr-3"
              size="medium"
              disabled={isLoading}
            >
              Confirm the order(Without printing)
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              if (
                delivery_timing_types_has_timer_component[
                  order?.delivery_timing_type
                ]
              ) {
                submit(valueOfTime * time_units[timeMethod]);
              } else {
                submit();
              }
              onClose();
            }}
            variant="contained"
            color="primary"
            className="u-box-shadow-none u-fontMedium"
            size="medium"
            disabled={isLoading}
          >
            Confirm the order
          </Button>
        )}
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(AcceptOrderModal);
