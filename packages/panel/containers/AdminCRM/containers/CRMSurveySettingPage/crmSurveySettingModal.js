import React, { memo, useEffect, useState } from "react";
import MaterialModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Input from "@saas/components/Input";
import { textTypes } from "@saas/utils/colors";

function CrmSurveySettingModal({
  showSettingModal,
  setShowSettingModal,
  submitCrmSurveyDelay,
  feedbackDelay
}) {

  const [delayAmount, setDelayAmount] = useState(isNaN(Number(feedbackDelay)) ? null : feedbackDelay);

  const onDelayActiveChange = (e) => {
    const {checked} = e.target;
    if (checked) {
      setDelayAmount(0);
    } else {
      setDelayAmount(null);
    }
  };

  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={showSettingModal}
      className={"d-flex align-items-center"}
    >
      <Fade in={showSettingModal}>
        <Paper
          elevation={3}
          style={{
            backgroundColor: "#fff",
            margin: "0 auto",
            padding: 24,
            width: "35rem",
          }}
        >
          <div
            className="d-flex align-items-center pb-4"
            style={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <CloseIcon
              style={{ color: "#000000" }}
              onClick={() => setShowSettingModal(false)}
              className="cursor-pointer"
            />
            <p style={{ fontSize: 16, fontWeight: 500, paddingRight: 13 }}>
              Survey settings
            </p>
          </div>
          <p
            style={{ fontSize: 14, fontWeight: 500, paddingTop: 24 }}
            className="pb-4"
          >
            Delay by submitting survey
          </p>
          <div>
            <div
              className="d-flex align-items-center justify-content-between mb-1"
              style={{ fontSize: 16, fontWeight: 400 }}
            >
              <p style={{ whiteSpace: "nowrap" }}> {delayAmount=== null ? "Inactive" : "active"} </p>
              <Switch
                color="primary"
                checked={delayAmount !== null}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={onDelayActiveChange}
              />
            </div>
            <div
              className="col-12 mt-3 mt-md-0"
              style={{ padding: 0 }}
            >
              <div className="position-relative">
                <p>Delay of submission</p>
                <Input
                  disabled={delayAmount === null}
                  type="number"
                  variant="outlined"
                  className="w-100"
                  numberOnly
                  onChange={(value) =>setDelayAmount(value)}
                  value={delayAmount}
                />
                <p
                  style={{
                    position: "absolute",
                    top: 40,
                    left: 16,
                    color: textTypes.text.subdued,
                  }}
                >
                  Minutes
                </p>
              </div>
            </div>
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
              onClick={() => setShowSettingModal(false)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="u-box-shadow-none u-fontMedium mr-2"
              size="large"
              style={{
                direction: "ltr",
                fontSize: 15,
                fontWeight: 500,
              }}
                onClick={() =>{
                  submitCrmSurveyDelay(delayAmount)
                  setShowSettingModal(false)
                }
              }
            >
              Confirm
            </Button>
          </div>
        </Paper>
      </Fade>
    </MaterialModal>
  );
}

export default CrmSurveySettingModal;
