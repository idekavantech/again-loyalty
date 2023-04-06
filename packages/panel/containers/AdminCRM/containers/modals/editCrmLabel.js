/**
 *
 * Modal
 *
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MaterialModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import { changeCRMLabel } from "store/actions";

export default function EditCrmLabel({
  setLabels,
  labels,
  labelIndex,
  _updateCrmLabel,
}) {
  const router = useRouter();
  const theme = useTheme();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [labelValue, setLabelValue] = useState(false);

  useEffect(() => {
    if (router?.query?.edit_modal) {
      setIsOpenModal(true);
    }
  }, [router?.query?.edit_modal]);

  const handleClose = () => {
    const _query = { ...router.query };
    delete _query.edit_modal;
    router.push({
      pathname: router.pathname,
      query: {
        ..._query,
      },
    });
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (labels) {
      setLabelValue(labels[labelIndex]?.title);
    }
  }, []);

  const submit = () => {
    const _query = { ...router.query };
    delete _query.edit_modal;
    router.push({
      pathname: router.pathname,
      query: {
        ..._query,
      },
    });
    const newCrmLabel = JSON.parse(JSON.stringify(labels));
    newCrmLabel[labelIndex].title = labelValue;
    _updateCrmLabel(labels[labelIndex].id, { title: labelValue });
    setLabelValue("");
    setLabels(newCrmLabel);
    setIsOpenModal(false);
  };

  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenModal}
      className={"d-flex align-items-center"}
    >
      <div className="walletChargeModalContainer">
        <Fade in={isOpenModal}>
          <Paper
            elevation={3}
            className={`mx-auto  overflow-hidden c-modal-box d-flex flex-column col-md-5 p-5 col-11 py-5`}
            style={{ backgroundColor: "#fff", height: "auto" }}
          >
            <div
              style={{ cursor: "pointer", lineHeight: 0.5, marginBottom: 24 }}
              className="d-flex justify-content-between align-items-center position-relative mb-5"
              onClick={handleClose}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Label editing</p>
              <CloseIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            </div>
            <div style={{ marginBottom: 80 }}>
              <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-2">
                Tagity title
              </p>
              <input
                onChange={(e) => {
                  setLabelValue(e.target.value);
                }}
                value={labelValue}
                style={{
                  width: "100%",
                  border: "1px solid #E4E6E7",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#6D717",
                  padding: "8px 6px",
                }}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button
                style={{
                  border: "1px solid #8C9196",
                  borderRadius: 8,
                  color: "#6D7175",
                }}
                className="py-2 px-4 ml-4"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancellation
              </Button>
              <Button
                style={{
                  borderRadius: 8,
                  background: theme.palette.primary.main,
                  color: "#FFFFFF",
                }}
                className="py-2 px-4"
                onClick={submit}
              >
                Confirm{" "}
              </Button>
            </div>
          </Paper>
        </Fade>
      </div>
    </MaterialModal>
  );
}
