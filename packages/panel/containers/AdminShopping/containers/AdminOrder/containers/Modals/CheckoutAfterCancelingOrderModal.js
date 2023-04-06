import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { graphite, night } from "@saas/utils/colors";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {
  RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL,
  RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL,
} from "../../constants";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";

import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";


const CHECKOUT_NOW = "CHECKOUT_NOW";
const CHECKOUT_LATER = "CHECKOUT_LATER";

export function CheckoutAfterCancelingOrderModal({
  isOpen,
  onClose,
  submit,
  loading,
  order,
}) {
  const [checkoutTime, setCheckoutTime] = useState(CHECKOUT_NOW);
  const [checkoutMethod, setCheckoutMethod] = useState(
    RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL
  );
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="p-0">
        <div className="px-4 pt-2">
          <div className="d-flex align-items-center justify-content-between">
            <div style={{ color: night, fontWeight: 500 }}>Checkout</div>
            <IconButton
              aria-label="close"
              onClick={onClose}
              style={{ marginLeft: -13 }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="my-3">
            <div className="col-12 px-0" key={order?.id}>
              <div
                className="d-flex p-3 align-items-center justify-content-between"
                style={{
                  border: `1px solid #ffaa00`,
                  borderRadius: 8,
                  backgroundColor: hexToRGBA("#ffaa00", 0.05),
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <ErrorRoundedIcon
                    fontSize="small"
                    style={{ color: "#ffaa00" }}
                    className="ml-2"
                  />
                  <div
                    className="u-font-semi-small"
                    style={{ color: graphite, lineHeight: "12px" }}
                  >
                    {`You${priceFormatter(
                      order?.paid_price
                    )} You have to return to the customer.`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FormControl
            variant="outlined"
            className="w-100"
            style={{ marginRight: -28 }}
          >
            <RadioGroup
              value={checkoutTime}
              onChange={(event) => setCheckoutTime(event.target.value)}
            >
              <FormControlLabel
                value={CHECKOUT_LATER}
                control={<Radio color="primary" />}
                label="I will settle later.."
              />
              <FormControlLabel
                value={CHECKOUT_NOW}
                control={<Radio color="primary" />}
                label="I am settling right now.."
              />
            </RadioGroup>
          </FormControl>
          {checkoutTime === CHECKOUT_NOW ? (
            <FormControl
              variant="outlined"
              className="mt-2"
              style={{ marginRight: 56, width: 228 }}
            >
              <Select
                value={checkoutMethod}
                onChange={(event) => setCheckoutMethod(event.target.value)}
                className="medium"
              >
                <MenuItem
                  value={RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL}
                  disabled={loading}
                >
                  <img
                    alt=""
                    src={`/images/recieve-money-in-cash.svg`}
                    style={{ width: 20, height: 20 }}
                    className="ml-5"
                  />
                  Payment of cash or card to card
                </MenuItem>
                <MenuItem
                  value={RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL}
                  disabled={loading}
                >
                  <img
                    alt=""
                    src={`/images/recieve-money-by-credit.svg`}
                    style={{ width: 20, height: 20 }}
                    className="ml-5"
                  />
                  Transfer to the wallet
                </MenuItem>
              </Select>
            </FormControl>
          ) : null}
        </div>
        <hr
          style={{
            border: "none",
            borderBottom: "1px solid #EDEDED",
          }}
          className="mt-5"
        />
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <Button
          onClick={() => {
            submit(checkoutMethod);
          }}
          variant="contained"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          disabled={loading}
        >
          Confirm and continue
        </Button>
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

export default memo(CheckoutAfterCancelingOrderModal);
