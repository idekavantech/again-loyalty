import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import MaterialModal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

function CRMMembershipLabelModal(props) {
  const {
    labels,
    selectedMembershipIds,
    submitLabel,
    isLabelsModalOpen,
    handleLableModalClose,
  } = props;

  const [selectedLabel, setSelectedLabel] = useState(null);

  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isLabelsModalOpen}
      className={"d-flex align-items-center"}
    >
      <Fade in={isLabelsModalOpen}>
        <Paper
          elevation={3}
          style={{
            backgroundColor: "#fff",
            width: "20rem",
            margin: "0 auto",
            padding: 24,
          }}
        >
          <div
            className="d-flex align-items-center pb-4 mb-4"
            style={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <CloseIcon
              style={{ color: "#000000" }}
              onClick={handleLableModalClose}
              className="cursor-pointer"
            />
            <p style={{ fontSize: 16, fontWeight: 500, paddingRight: 13 }}>
              Apply a group label
            </p>
          </div>
          <div className="mb-4">
            <p> <span style={{fontWeight:"500"}}>{selectedMembershipIds.length}</span> Selected customer</p>
          </div>
          <div>
            <p style={{fontWeight:"500"}}>Label</p>
            <Select
              className="w-100 mb-3"
              style={{
                minWidth: 150,
                flex: 1,
                borderRadius: 8,
                height: 44,
              }}
              value={selectedLabel || ""}
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (!selectedLabel) return "Select the label";
                return labels.find((label) => label.id === selectedLabel).title;
              }}
              MenuProps={{
                getContentAnchorEl: null,
                style: { maxHeight: 500 },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                variant: "menu",
              }}
            >
              {labels?.map((label) => {
                return (
                  <MenuItem
                    onClick={() => setSelectedLabel(label.id)}
                    className="px-2"
                    key={label?.title}
                    value={label?.id}
                  >
                    <div className="w-100 d-flex align-items-center">
                      <ListItemText
                        primary={label?.title}
                        className="text-right"
                      />
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div
            className="d-flex justify-content-end align-center"
            style={{ paddingTop: 24 }}
          >
            <Button
              variant="contained"
              color="primary"
              className="u-box-shadow-none u-fontMedium mr-2"
              size="large"
              style={{
                direction: "ltr",
                background: "#E0E0E0",
                color: "#000000DE",
                fontSize: 15,
                fontWeight: 500,
              }}
              onClick={handleLableModalClose}
            >
              back
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="u-box-shadow-none u-fontMedium mr-2"
              size="large"
              disabled={!selectedLabel}
              style={{
                direction: "ltr",
                fontSize: 15,
                fontWeight: 500,
              }}
              onClick={() => {
                setSelectedLabel(null);
                handleLableModalClose();
                submitLabel(selectedLabel);
              }}
            >
              Confirm
            </Button>
          </div>
        </Paper>
      </Fade>
    </MaterialModal>
  );
}

export default CRMMembershipLabelModal;
