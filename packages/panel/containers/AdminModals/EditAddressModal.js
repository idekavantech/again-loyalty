/* eslint-disable no-underscore-dangle */
import React, { memo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@saas/components/Modal";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Input from "@saas/components/Input";
import MapModal from "./MapModal";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";

import { updateBusiness } from "@saas/stores/business/actions";
import DeleteSectionPopup from "@saas/builder/SectionRenderer/components/DeleteSectionPopup";
import ModalHeader from "@saas/components/Modal/ModalHeader";

function EditAddressModal({
  isOpen,
  onClose,
  _updateBusiness,
  isLoading,
  themeConfig,
  business,
  deleteSection,
}) {
  const [address, setAddress] = useState(business.address);
  const [mapOpen, setMapOpen] = useState(true);
  const [location, setLocation] = useState({
    latitude: +business.latitude,
    longitude: +business.longitude,
  });
  const [zoom, setZoom] = useState(11);
  const [isDialogOpen, openDialog] = useState(false);
  const submit = () => {
    _updateBusiness({
      address,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <ModalHeader
          onRightClick={onClose}
          title="Address"
          LeftItem={() => (
            <IconButton>
              <DeleteIcon onClick={() => openDialog(true)} color="inherit" />
            </IconButton>
          )}
        />
      }
      body={
        mapOpen ? (
          <>
            <MapModal
              openEditAddressModal={() => setMapOpen(false)}
              themeConfig={themeConfig}
              position={{ ...location }}
              zoom={zoom}
              updateLocation={(e) => {
                const { lat, lng } = e.target.getCenter();
                setLocation({
                  latitude: lat.toFixed(7),
                  longitude: lng.toFixed(7),
                });
              }}
              onzoomend={(e) => setZoom(e.target._zoom)}
            />
            <DeleteSectionPopup
              open={isDialogOpen}
              onClose={() => openDialog(false)}
              submit={() => {
                openDialog(false);
                onClose();
                deleteSection();
              }}
            />
          </>
        ) : (
          <div className="px-3 mt-2 -doubleBtn">
            <div>
              <Input
                multiline
                value={address}
                name="address"
                onChange={setAddress}
                placeholder="Address"
              />
            </div>
            <DeleteSectionPopup
              open={isDialogOpen}
              onClose={() => openDialog(false)}
              submit={() => {
                openDialog(false);
                onClose();
                deleteSection();
              }}
            />
          </div>
        )
      }
      cta={
        <>
          <Button
            color="primary"
            className="w-100"
            onClick={() => setMapOpen(true)}
          >
            Back to the map
          </Button>
          <Button
            className="w-100 mt-2"
            color="primary"
            variant="contained"
            onClick={submit}
            disabled={isLoading}
          >
            Store
          </Button>
        </>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  business: makeSelectBusiness(),
  themeConfig: makeSelectBusinessThemeConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data) => dispatch(updateBusiness(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EditAddressModal);
