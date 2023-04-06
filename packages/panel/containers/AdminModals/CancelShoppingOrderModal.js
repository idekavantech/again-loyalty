import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { makeSelectLoading } from "@saas/stores/global/selectors";

import { cancelShoppingOrder } from "../../store/actions";
import { makeSelectShoppingAdminOrder } from "../../store/selectors";

const CancelShoppingOrderModal = ({
  onClose,
  isOpen,
  loading,
  adminOrder,
  _cancelOrder,
}) => {
  if (adminOrder.id)
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {adminOrder.order_status === 0 ? (
              <div>
                <div className="u-textBlack">
                  If for any reason you want to cancel your order, be sure to
                  Call the customer and inform him of this.
                </div>
                <div className="u-textdark-grey">
                  Also, if it is necessary to submit a new order to him or her
                  Note.
                </div>
              </div>
            ) : (
              <div className="u-textBlack u-fontNormal">
                The order you desired was canceled, please contact the customer.
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {adminOrder.order_status === 0 ? (
            <>
              <Button
                disabled={loading}
                onClick={() => {
                  _cancelOrder({ id: adminOrder.id });
                }}
                color="primary"
              >
                Cancellation of the order
              </Button>
              <Button
                disabled={loading}
                onClick={onClose}
                color="primary"
                autoFocus
              >
                to close
              </Button>
            </>
          ) : (
            <>
              <Button
                href={`tel:${adminOrder.user_address?.phone}`}
                color="primary"
              >
                {adminOrder.user_address?.phone}
              </Button>
              <Button
                disabled={loading}
                onClick={onClose}
                color="primary"
                autoFocus
              >
                to close
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  return null;
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  adminOrder: makeSelectShoppingAdminOrder(),
});

function mapDispatchToProps(dispatch) {
  return {
    _cancelOrder: (data) => dispatch(cancelShoppingOrder(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CancelShoppingOrderModal);
