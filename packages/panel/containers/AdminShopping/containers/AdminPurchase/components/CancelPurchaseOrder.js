import React, { memo, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { rejectReceivedPurchase } from "store/actions";
import useTheme from "@material-ui/core/styles/useTheme";

function CancelPurchaseOrder({
  purchaseId,
  _rejectReceivedPurchase,
  onClose,
}) {
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();

  return (
    <>
      <ListItem
        onClick={() => {
          onClose();
          setDialog(true);
        }}
        button
      >
        <ListItemText
          style={{ color: theme.palette.primary.main }}
          className="text-right"
        >
          Cancellation order
        </ListItemText>
      </ListItem>
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this purchase document?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialog(false);
              _rejectReceivedPurchase(purchaseId);
            }}
            color="primary"
          >
            Cancellation of the purchase document
          </Button>
          <Button onClick={() => setDialog(false)} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    _rejectReceivedPurchase: (id) => dispatch(rejectReceivedPurchase(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CancelPurchaseOrder);
