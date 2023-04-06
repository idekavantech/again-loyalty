import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import {
  makeSelectLoading,
  makeSelectUploadedFile,
} from "@saas/stores/global/selectors";
import Modal from "@saas/components/Modal";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import { updateBusiness } from "@saas/stores/business/actions";
import AboutUsImage from "./AboutUsImage";
import DeleteSectionPopup from "@saas/builder/SectionRenderer/components/DeleteSectionPopup";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { quillModules } from "store/constants";
import dynamic from "next/dynamic";
import ModalHeader from "@saas/components/Modal/ModalHeader";

function EditAboutUsModal({
  isOpen,
  onClose,
  _updateBusiness,
  business,
  loading,
  _uploadFile,
  _removeFile,
  uploadedFile,
  deleteSection,
}) {
  const myFiles = React.useRef(null);
  const [iconImage, setIconImage] = useState(business.icon_image_url);
  const [aboutUs, setAboutUs] = useState(business.about_us);
  const [isDialogOpen, openDialog] = useState(false);
  const submit = () => {
    if (uploadedFile) setIconImage(uploadedFile.url);
    _updateBusiness({
      about_us: aboutUs,
      icon_image: uploadedFile
        ? `${uploadedFile.folder_name}/${uploadedFile.file_name}`
        : business.icon_image,
    });
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <ModalHeader
          onRightClick={onClose}
          title="about us"
          LeftItem={() => (
            <IconButton>
              <DeleteIcon onClick={() => openDialog(true)} color="inherit" />
            </IconButton>
          )}
        />
      }
      body={
        <div className="px-3">
          <DeleteSectionPopup
            open={isDialogOpen}
            onClose={() => openDialog(false)}
            submit={() => {
              openDialog(false);
              onClose();
              deleteSection();
            }}
          />
          <div className="u-cursor-pointer">
            <label className="d-inline-block u-text-medium-grey u-font-semi-small-r c-input-file-label py-1 cursorPointer w-100">
              <div className="w-100 h-100 d-flex justify-content-center align-items-center p-5">
                <div className="c-profile-image-placeholder position-relative">
                  <AboutUsImage
                    uploadedFile={uploadedFile}
                    _removeFile={_removeFile}
                    iconImage={iconImage}
                    myFiles={myFiles}
                    setIconImage={setIconImage}
                  />
                </div>
              </div>
              <input
                ref={myFiles}
                className="d-none"
                type="file"
                onChange={() =>
                  _uploadFile(myFiles.current.files, "business_icons")
                }
              />
            </label>
          </div>
          <div className="u-text-dark-grey u-fontNormal-r mb-2">
            Write a description of your business
          </div>
          <div className="my-2">
            <ReactQuill
              placeholder="about us"
              className="text-left"
              value={aboutUs || ""}
              onChange={setAboutUs}
              modules={quillModules}
              theme="snow"
            />
          </div>
        </div>
      }
      cta={
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          onClick={submit}
          disabled={loading}
        >
          Store
        </Button>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  loading: makeSelectLoading(),
  uploadedFile: makeSelectUploadedFile(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data) => dispatch(updateBusiness(data)),
    _uploadFile: (files, folderName) =>
      dispatch(uploadFile({ files, folderName })),
    _removeFile: (index) => dispatch(removeFile(index)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EditAboutUsModal);
