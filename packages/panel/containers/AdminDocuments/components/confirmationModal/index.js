import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { night } from "@saas/utils/colors";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const ConfirmationModal = ({ isOpen, onClose, submit, isLoading }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="w-100"
      PaperProps={{ className: "w-100" }}
    >
      <DialogContent className="p-4 w-100">
        <div className="d-flex justify-content-between align-items-center">
          {/* <div style={{ color: night }} className="u-fontLarge">
            Warehouse Inventory Update
          </div> */}
          <div>
            <IconButton
              className="p-0"
              onClick={onClose}
              style={{ color: night }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
        <div className="mt-4" style={{ color: night }}>
          Due to the change of the domain of the test to the new address, the information of the previously received orders
          You will be erased in case of existence. If you would like the information you need
          Note and take action again from this section.
        </div>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <Button
          onClick={() => {
            submit();
            onClose();
          }}
          variant="contained"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="large"
          disabled={isLoading}
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          className="mr-2 ml-0 u-box-shadow-none u-fontMedium"
          size="large"
        >
          coming back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
