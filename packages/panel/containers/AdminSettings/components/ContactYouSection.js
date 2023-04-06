import React, { memo, useRef, useMemo } from "react";
import Input from "@saas/components/Input";
import Paper from "@material-ui/core/Paper";
import { graphite, night, white } from "@saas/utils/colors";
import PhoneNumberSection from "./PhoneNumberSection";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function ContactUsSection({
  phone,
  changePhone,
  address,
  changeAddress,
  morePhoneNumbers,
  addMorePhoneNumbers,
  latitude,
  changeLatitude,
  longitude,
  changeLongitude,
}) {
  const {minWidth768} = useResponsive()
  const widthOfTheModal = minWidth768 ? 667 : 300;
  const [open, setOpen] = React.useState(false);
  const mapRef = useRef(null);
  const previewMapRef = useRef(null);
  const position = { latitude, longitude, singleMarker: true };
  const mapOptionsPreview = useMemo(() => {
    return {
      height: "185px",
      width: "100%",
      center: position,
      markers: [position],
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
      dragging: false,
      zoom: 14,
      ref: previewMapRef,
    };
  }, [position, previewMapRef]);
  const mapOptions = useMemo(() => {
    return {
      height: "320px",
      width: "100%",
      center: position,
      markers: [position],
      ref: mapRef,
      editMode: true,
      zoom: 14,
      dragging: minWidth768,
    };
  }, [position, mapRef]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitMap = () => {
    const crd = mapRef.current.getCenter();
    const { lat, lng } = crd;
    changeLatitude(`${lat.toFixed(7)}`);
    changeLongitude(`${lng.toFixed(7)}`);
    setOpen(false);
  };

  return (
    <Paper elevation={1} className="d-flex mt-3 py-3 flex-wrap">
      <div className="col-12 col-lg-6">
        <div className="u-fontLarge mb-3" style={{ color: night }}>
          Connecting with you
        </div>
        <div>
          <span className="anchor" id="business-address" />
          <div className="d-flex align-items-center">
            <Input
              label="Business Address"
              value={address}
              onChange={changeAddress}
              size="medium"
              inputProps={{ maxLength: 200 }}
            />
            <div
              style={{
                visibility: morePhoneNumbers.length === 0 ? "" : "hidden",
                display: morePhoneNumbers.length === 0 ? "none" : "inherit",
              }}
            >
              <IconButton>
                <DeleteRoundedIcon color="primary" />
              </IconButton>
            </div>
          </div>
          <div className="mt-4">
            <PhoneNumberSection
              phone={phone}
              changePhone={changePhone}
              morePhoneNumbers={morePhoneNumbers}
              addMorePhoneNumbers={addMorePhoneNumbers}
              size="medium"
            />
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div
          className="u-fontLarge mb-3"
          style={{ color: night, visibility: "hidden" }}
        >
          Basic Information
        </div>
        <Map options={mapOptionsPreview} />
        <div className="d-flex align-items-center mt-4">
          <IconButton style={{ marginRight: -14 }} onClick={handleOpen}>
            <AddCircleOutlineIcon color="primary" />
          </IconButton>

          <span
            className="u-fontMedium u-cursor-pointer"
            style={{ color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR }}
            onClick={handleOpen}
          >
            {latitude && longitude
              ? "Change location"
              : "Adding location"}
          </span>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} style={{ width: widthOfTheModal }}>
          <div
            style={{
              backgroundColor: white,
              boxShadow: "0px 11px 15px -7px rgba(0, 0, 0, 0.2)",
              direction: "rtl",
              borderRadius: 8,
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <IconButton onClick={handleClose}>
                <CloseIcon className="u-cursor-pointer" />
              </IconButton>
              <span
                id="transition-modal-title"
                className="u-fontMedium"
                style={{ color: graphite }}
              >
                Location
              </span>
              <IconButton style={{ visibility: "hidden" }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Map options={mapOptions} />
            <div
              style={{ boxShadow: "0px 0px 20px rgba(0, 40, 60, 0.16)" }}
              className="p-3 bg-white d-flex flex-row-reverse align-items-center w-100"
            >
              <Button
                variant="contained"
                color="primary"
                className={
                  "u-fontMedium px-0 ml-1  " +
                  (minWidth768 ? "w-25" : "w-50")
                }
                onClick={submitMap}
              >
                Confirm and save
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </Paper>
  );
}
export default memo(ContactUsSection);
