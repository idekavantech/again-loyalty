import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Divider from "@material-ui/core/Divider";
import { useDropzone } from "react-dropzone";
import Cloud from "@saas/icons/Cloud";
import FileIcon from "@saas/icons/FileIcon";
import SuccessCloud from "@saas/icons/SuccessCloud";
import UnSuccessCloud from "@saas/icons/UnSuccessCloud";
import Right from "@saas/icons/Right";
import ErorrIcon from "@saas/icons/ErorrIcon";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #FFFFFF",
    boxShadow: theme.shadows[5],
    borderRadius: "8px",
    margin: "0 auto",
    padding: "24px",
  },
}));

export default function ImportModal({
  open,
  onClose,
  _uploadFile,
  hasError,
  _getHasError,
}) {
  const classes = useStyles();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [showStateOne, setShowStateOne] = useState(false);
  const [uplodedfile, setUplodedfile] = useState(null);

  useEffect(() => {
    if (acceptedFiles) {
      _uploadFile(acceptedFiles);
      setUplodedfile(acceptedFiles);
    }
  }, [acceptedFiles]);

  const handleReupload = () => {
    setUplodedfile(null);
    setShowStateOne(true);
    _getHasError(null);
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className="import-modal-wrapper">
        <div className={`${classes.paper} import-modal-container`}>
          <div className="import-modal-content">
            <h2 className="pb-2">Adding products</h2>
            <p className="pb-5 import-description">
              To import products on the site must from the default Excel file
              To accept the system.. Changes such as cleansing the columns, being empty
              Mandatory cells(Such as the title and price of products) And enter the price with
              The letters, in the automatic import operation of the products.
              Therefore maintaining the structure of the Excel file is essential.
            </p>
            <div>
              <Link
                className="d-flex align-items-center mb-5"
                href="https://hs3-cdn-saas.behtarino.com/ui-assets/import_template.xlsx"
              >
                <p className="pl-2 blue-text">
                  Download the ready -made Excel file template in the system
                </p>
                <Right />
              </Link>
            </div>
          </div>
          {hasError === null ||
          hasError === undefined ||
          (showStateOne && !uplodedfile) ? (
            <div>
              <section>
                <div
                  className="uploadContainer"
                  {...getRootProps({
                    className: "dropzone uploadContainer",
                  })}
                >
                  <input {...getInputProps()} />
                  <Cloud />
                  <div className="import-btns mt-5">Add file</div>
                </div>
              </section>
            </div>
          ) : (
            <div>
              {hasError ? (
                <>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between py-5">
                    <div className="d-flex align-items-center">
                      <FileIcon />
                      <span className="pr-3">{acceptedFiles[0]?.name}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center pl-4">
                        <UnSuccessCloud />
                        <span className="pr-3">File load error</span>
                      </div>
                      <p className="blue-text" onClick={handleReupload}>
                        Re -load
                      </p>
                    </div>
                  </div>
                  <Divider className="m" />
                  <div className="d-felx align-items-center mb-4 pt-5">
                    <ErorrIcon />
                    <span className="pr-2">
                      The information entered is not correct..
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between py-5">
                    <div className="d-flex align-items-center">
                      <FileIcon />
                      <span className="pr-3">{acceptedFiles[0]?.name}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <SuccessCloud />
                      <span className="pr-3">
                        File loading successfully performed.
                      </span>
                    </div>
                  </div>
                  <Divider />
                </>
              )}
            </div>
          )}
          <div className="pt-5  import-close-btn-container">
            <div className="import-btns import-close-btn" onClick={onClose}>
              to close
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
