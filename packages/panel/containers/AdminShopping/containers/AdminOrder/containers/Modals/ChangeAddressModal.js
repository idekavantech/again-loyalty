import React, { memo, useState, useMemo, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { night, coal, pollution, graphite } from "@saas/utils/colors";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import { isPhoneNumber } from "@saas/utils/helpers/isPhoneNumber";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { getAddressFromCoordinates } from "@saas/utils/services/getAddressFromCoordinates";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import { Collapse } from "react-collapse";

import Divider from "@material-ui/core/Divider";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import AppBar from "@material-ui/core/AppBar";
import dynamic from "next/dynamic";
import LocationAccessPopup from "@saas/components/LocationAccessPopup";
import { GPS } from "@saas/icons";
import Icon from "@saas/components/Icon";
import AddressPlaceMakerIcon from "@saas/icons/AddressPlaceMakerIcon";
import Input from "@saas/components/Input";
const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
import DialogTitle from "@material-ui/core/DialogTitle";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export function ChangeAddressModal({
  isOpen,
  onClose,
  submit,
  isLoading,
  selectedAddress,
  addresses,
  selectAddress,
  order,
  businessLocation,
  themeColor,
  business,
}) {
  const {minWidth768} = useResponsive()
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [isCollapseOpen, toggleCollapse] = useState(false);
  const [mapEditMode, setMapEditMode] = useState(false);
  const [addressObj, setAddressObj] = useState({});
  const [access, setAccess] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const mapRef = useRef(null);
  const position = {
    latitude: addressObj?.latitude || +businessLocation?.latitude,
    longitude: addressObj?.longitude || +businessLocation?.longitude,
    singleMarker: true,
  };
  const mapOptions = useMemo(() => {
    return {
      height: 180,
      width: "100%",
      center: position,
      markers: [position],
      editMode: mapEditMode,
      zoomControl: mapEditMode && minWidth768,
      touchZoom: mapEditMode,
      doubleClickZoom: mapEditMode,
      scrollWheelZoom: false,
      boxZoom: mapEditMode,
      keyboard: mapEditMode,
      dragging: mapEditMode && minWidth768,
      zoom: 14,
      ref: mapRef,
      borderRadius: 8,
      zoomControlPosition: "bottomright",
    };
  }, [position, mapRef, mapEditMode, minWidth768]);
  useEffect(() => {
    if (selectedAddress && tabValue === 0) {
      setMapEditMode(false);
      setAddressObj({
        address: selectedAddress?.full_address,
        city: selectedAddress?.detail?.city,
        number: selectedAddress?.detail?.number,
        unit: selectedAddress?.detail?.unit,
        postal_code: selectedAddress?.detail?.postal_code,
        latitude: selectedAddress?.latitude,
        longitude: selectedAddress?.longitude,
        name: order?.user_address?.name,
        phone: selectedAddress?.phone?.replace("+98", "0"),
      });
    } else if (tabValue === 1) {
      setMapEditMode(tabValue === 1);
      setAddressObj({
        number: selectedAddress?.detail?.number,
        unit: selectedAddress?.detail?.unit,
        postal_code: selectedAddress?.detail?.postal_code,
        latitude: selectedAddress?.latitude,
        longitude: selectedAddress?.longitude,
        name: order?.user_address?.name,
        phone: selectedAddress?.phone?.replace("+98", "0"),
      });
    }
  }, [tabValue, selectedAddress]);
  const getPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, options);
    }).catch();
  };
  const accessLocation = async () => {
    const pos = await getPosition();
    if (pos) {
      const crd = pos.coords;
      const latitude = +crd.latitude.toFixed(7);
      const longitude = +crd.longitude.toFixed(7);
      return { latitude, longitude };
    }
    return null;
  };
  const getAccess = async () => {
    setAccess(true);
    setDialogOpen(false);
    const _location = await accessLocation();
    if (_location) {
      mapRef.current.setView({
        lat: _location.latitude,
        lng: _location.longitude,
      });
    }
  };
  const submitMapLocation = () => {
    setMapEditMode(false);
    const crd = mapRef.current.getCenter();
    getAddressFromCoordinates(crd.lat, crd.lng).then((result) => {
      setAddressObj({
        ...addressObj,
        address: result?.address_compact,
        latitude: crd.lat.toFixed(7),
        longitude: crd.lng.toFixed(7),
      });
    });
  };
  useEffect(() => {
    if (selectedAddress) {
      setAddressObj({
        address: selectedAddress?.full_address,
        city: selectedAddress?.detail?.city,
        number: selectedAddress?.detail?.number,
        unit: selectedAddress?.detail?.unit,
        postal_code: selectedAddress?.detail?.postal_code,
        latitude: selectedAddress?.latitude,
        longitude: selectedAddress?.longitude,
        name: order?.user_address?.name,
        phone: selectedAddress?.phone?.replace("+98", "0"),
      });
    }
  }, [selectedAddress]);
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogTitle id="alert-dialog-title">
        <div
          className="d-flex justify-content-between align-items-center py-4"
          style={{ borderBottom: "1px solid #EDEDED" }}
        >
          <div style={{ color: night, fontWeight: "bold", fontSize: 16 }}>
            Select or add address
          </div>
          <div>
            <IconButton onClick={onClose} style={{ color: night }}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
        <AppBar
          position="static"
          color="default"
          className="w-100"
          style={{ boxShadow: "none" }}
        >
          <Tabs
            className="w-100"
            indicatorColor="primary"
            variant="fullWidth"
            textColor="primary"
            value={tabValue}
            onChange={(e, value) => setTabValue(value)}
          >
            <Tab
              className="w-100"
              label="Current User Addresses"
              value={0}
              disabled={!addresses?.addresses?.length}
            />
            <Tab className="w-100" label="Record the new address" value={1} />
          </Tabs>
        </AppBar>
      </DialogTitle>
      <DialogContent className="p-0">
        {tabValue === 0 ? (
          <div className="px-5 pt-4">
            <Paper elevation={1}>
              <style
                dangerouslySetInnerHTML={{
                  __html: `

                  .checkout-collapse:hover {
                    background-color : ${hexToRGBA(
                      theme.palette.primary.main,
                      0.05
                    )} ;
                  }
                `,
                }}
              />
              <div
                className="px-5 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
                onClick={() => toggleCollapse(!isCollapseOpen)}
              >
                <div className="d-flex align-items-center">
                  <LocationOnRoundedIcon className="ml-2" />
                  <div>
                    <div className="d-flex align-items-center">
                      <div style={{ color: coal }} className="u-fontMedium">
                        Send to:
                      </div>
                      <div
                        className="u-fontMedium u-fontWeightBold"
                        style={{ color: coal }}
                      >
                        &nbsp;{selectedAddress?.title}
                      </div>
                    </div>
                    <div
                      className="u-font-semi-small mt-1"
                      style={{ color: pollution }}
                    >
                      {selectedAddress?.full_address}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div
                    className="u-fontMedium ml-1"
                    style={{ color: theme.palette.primary.main }}
                  >
                    Change
                  </div>
                  <ChevronLeftRoundedIcon color="primary" />
                </div>
              </div>
              <Collapse isOpened={isCollapseOpen}>
                <Divider />
                {addresses?.addresses?.map((address) => (
                  <>
                    <div
                      className="px-5 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
                      onClick={() => {
                        selectAddress(address);
                        toggleCollapse(false);
                      }}
                      style={{ minHeight: 69 }}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          style={{
                            visibility:
                              selectedAddress?.id === address.id
                                ? "visible"
                                : "hidden",
                          }}
                          className="ml-2"
                        >
                          <CheckRoundedIcon color="primary" />
                        </div>
                        <div>
                          <div
                            className="u-fontMedium u-fontWeightBold mb-2"
                            style={{ color: coal }}
                          >
                            {address.title || ""}
                          </div>
                          <div
                            className="u-font-semi-small"
                            style={{ color: pollution }}
                          >
                            {address.full_address}
                          </div>
                        </div>
                      </div>
                      {/* <div className="d-flex flex-column">
                        <div className="mb-1 d-flex justify-content-end">
                          <IconButton
                            style={{ width: 35, height: 35 }}
                            onClick={(event) => {
                              event.stopPropagation();
                              selectAddressIdToDelete(address.id);
                              toggleModal(DELETE_ADDRESS_MODAL, true);
                            }}
                          >
                            <DeleteRoundedIcon
                              color="primary"
                              fontSize="small"
                            />
                          </IconButton>
                          <IconButton style={{ width: 35, height: 35 }}>
                            <CreateRoundedIcon
                              color="primary"
                              onClick={(event) => {
                                event.stopPropagation();
                                router.push(
                                  `${urlPrefix}/profile/address-map?address=${address.id}&url=${currentRout}`
                                );
                              }}
                              fontSize="small"
                            />
                          </IconButton>
                        </div>
                        <div
                          className="px-2 py-1 u-font-semi-small"
                          style={{
                            borderRadius: 50,
                            color: address.is_available ? jungleI : strawberryI,
                            backgroundColor: address.is_available
                              ? hexToRGBA(jungleIII, 0.2)
                              : hexToRGBA(strawberryIII, 0.2),
                            minWidth: address.is_available ? 72 : 97,
                          }}
                        >
                          {address.is_available
                            ? "In the range"
                            : "out of range"}
                        </div>
                      </div> */}
                    </div>
                    <Divider />
                  </>
                ))}
              </Collapse>
            </Paper>
          </div>
        ) : null}
        <div
          style={{
            opacity: !selectedAddress && tabValue === 0 && 0.5,
            pointerEvents: !selectedAddress && tabValue === 0 && "none",
          }}
        >
          <div className="px-5 my-4 position-relative">
            {dialogOpen && !minWidth768 && (
              <LocationAccessPopup
                themeColor={themeColor}
                business={business}
                onClose={() => setDialogOpen(false)}
                getAccess={getAccess}
              />
            )}
            {!minWidth768 && mapEditMode && (
              <Button
                style={{
                  bottom: 10,
                  minWidth: "unset",
                  right: 26,
                  zIndex: 1000,
                  borderRadius: "50%",
                  background: theme.palette.background.default,
                }}
                className="p-2 c-btn-open-map position-absolute"
                onClick={() => {
                  if (access) getAccess();
                  else setDialogOpen(true);
                }}
                variant="contained"
              >
                <Icon color={pollution} icon={GPS} width={25} height={25} />
              </Button>
            )}
            <Map options={mapOptions} />
            {mapEditMode ? (
              <div
                className="d-flex align-items-center justify-content-end position-absolute w-100 px-2"
                style={{ bottom: 10, left: 16 }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: theme.palette.success.main,
                    borderRadius: 8,
                    color: "white",
                  }}
                  className="ml-1 w-25"
                  onClick={submitMapLocation}
                >
                  <CheckRoundedIcon fontSize="small" />
                  <span
                    className="mr-2 u-fontNormal"
                    style={{ color: "white" }}
                  >
                    Store
                  </span>
                </Button>
                {addressObj?.address && (
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: theme.palette.error.main,
                      borderRadius: 8,
                      color: "white",
                    }}
                    onClick={() => {
                      setMapEditMode(false);
                    }}
                    className="w-25"
                  >
                    <CloseRoundedIcon fontSize="small" />
                    <span className="mr-2 u-fontNormal">Cancel</span>
                  </Button>
                )}
              </div>
            ) : (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  color: theme.palette.primary.main,
                  left: 26,
                  bottom: 10,
                }}
                className="position-absolute"
                onClick={() => setMapEditMode(true)}
              >
                <AddressPlaceMakerIcon color={themeColor} />
                <span
                  className="mr-2 u-fontNormal"
                  style={{ color: themeColor }}
                >
                  Editing the area
                </span>
              </Button>
            )}
          </div>
          <div className="my-4">
            <div className="px-5">
              <div style={{ color: coal }} className="u-font-semi-small">
                Address
              </div>
              <Input
                className="w-100 mt-1"
                InputLabelProps={{ shrink: true }}
                value={
                  tabValue === 1 || (tabValue === 0 && selectedAddress)
                    ? addressObj?.address
                    : ""
                }
                color="secondary"
                onChange={(value) =>
                  setAddressObj({ ...addressObj, address: value })
                }
                themeColor={themeColor}
                size="small"
              />
              <div className="u-fontVerySmall mt-1" style={{ color: graphite }}>
                You must use the map editing to change the neighborhood.
              </div>
            </div>
            <div className="d-flex flex-wrap align-items-center">
              <div className="px-5 mt-3" style={{ width: "25%" }}>
                <div style={{ color: coal }} className="u-font-semi-small">
                  City
                </div>
                <Input
                  className="mt-1"
                  InputLabelProps={{ shrink: true }}
                  value={addressObj?.city || ""}
                  color="secondary"
                  onChange={(value) =>
                    setAddressObj({ ...addressObj, city: value })
                  }
                  themeColor={themeColor}
                  size="small"
                />
              </div>
              <div className="px-5 mt-3" style={{ width: "25%" }}>
                <div style={{ color: coal }} className="u-font-semi-small">
                  Plaque
                </div>
                <Input
                  style={{ direction: "ltr" }}
                  className="mt-1"
                  InputLabelProps={{ shrink: true }}
                  value={
                    englishNumberToPersianNumber(addressObj?.number, "") || ""
                  }
                  color="secondary"
                  onChange={(value) =>
                    setAddressObj({
                      ...addressObj,
                      number: persianToEnglishNumber(value),
                    })
                  }
                  themeColor={themeColor}
                  size="small"
                />
              </div>
              <div className="px-5 mt-3" style={{ width: "25%" }}>
                <div style={{ color: coal }} className="u-font-semi-small">
                  One
                </div>
                <Input
                  style={{ direction: "ltr" }}
                  className="mt-1"
                  InputLabelProps={{ shrink: true }}
                  value={
                    englishNumberToPersianNumber(addressObj?.unit, "") || ""
                  }
                  color="secondary"
                  onChange={(value) =>
                    setAddressObj({
                      ...addressObj,
                      unit: persianToEnglishNumber(value),
                    })
                  }
                  themeColor={themeColor}
                  size="small"
                />
              </div>
              <div className="px-5 mt-3" style={{ width: "25%" }}>
                <div style={{ color: coal }} className="u-font-semi-small">
                  Postal code
                </div>
                <Input
                  style={{ direction: "ltr" }}
                  className="mt-1"
                  InputLabelProps={{ shrink: true }}
                  value={
                    englishNumberToPersianNumber(addressObj?.postal_code, "") ||
                    ""
                  }
                  color="secondary"
                  onChange={(value) =>
                    setAddressObj({
                      ...addressObj,
                      postal_code: persianToEnglishNumber(value),
                    })
                  }
                  themeColor={themeColor}
                  size="small"
                />
              </div>
              <div className="px-5 mt-3" style={{ width: "25%" }}>
                <div style={{ color: coal }} className="u-font-semi-small">
                  The name of the recipient
                </div>
                <Input
                  className="mt-1"
                  InputLabelProps={{ shrink: true }}
                  value={addressObj?.name || ""}
                  color="secondary"
                  onChange={(value) =>
                    setAddressObj({ ...addressObj, name: value })
                  }
                  themeColor={themeColor}
                  size="small"
                />
              </div>
              <div className="px-5 mt-3" style={{ width: "25%" }}>
                <div style={{ color: coal }} className="u-font-semi-small">
                  phone number
                </div>
                <Input
                  className="mt-1"
                  style={{ direction: "ltr" }}
                  InputLabelProps={{ shrink: true }}
                  value={
                    englishNumberToPersianNumber(addressObj?.phone, "") || ""
                  }
                  color="secondary"
                  onChange={(value) => {
                    setAddressObj({
                      ...addressObj,
                      phone: persianToEnglishNumber(value),
                    });

                    if (isPhoneNumber(persianToEnglishNumber(value))) {
                      setError("");
                    } else {
                      setError("The wrong contact number has entered.");
                    }
                  }}
                  themeColor={themeColor}
                  size="small"
                />
                <div className="u-text-red mt-2 u-fontVerySmall">{error}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between py-4 px-5"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <Button
          onClick={() => {
            submit(addressObj);
            onClose();
          }}
          variant="contained"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          disabled={
            isLoading ||
            (tabValue === 0 && !selectedAddress) ||
            (tabValue === 1 &&
              !addressObj?.address &&
              !addressObj?.address?.name)
          }
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          style={{
            marginLeft: 0,
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(ChangeAddressModal);
