import React, { memo, useEffect, useMemo, useState, useRef } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import { cement, coal, pollution } from "@saas/utils/colors";
import Button from "@material-ui/core/Button";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
import {
  makeSelectBusiness,
  makeSelectBusinessLocation,
  makeSelectBusinessThemeColor,
} from "@saas/stores/business/selector";
import { useRouter } from "next/router";
import {
  makeSelectAddressCallbackFunction,
  makeSelectAddresses,
  makeSelectUser,
} from "@saas/stores/user/selector";
import useTheme from "@material-ui/core/styles/useTheme";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { isPhoneNumber } from "@saas/utils/helpers/isPhoneNumber";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { getAddressFromCoordinates } from "@saas/utils/services/getAddressFromCoordinates";
import { getLatAndLngFromAddress } from "@saas/utils/services/getLatAndLngFromAddress";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Input from "@saas/components/Input";
import {
  createAddress,
  editAddress,
  setSelectedAddress,
} from "@saas/stores/user/actions";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { GPS } from "@saas/icons";
import Icon from "@saas/components/Icon";
import LocationAccessPopup from "@saas/components/LocationAccessPopup";
import AddressPlaceMakerIcon from "@saas/icons/AddressPlaceMakerIcon";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const ADDRESS_CONFIG_IN_BACKEND_IS_NULL = null;
const ADDRESS_CONFIG_IN_BACKEND_IS_FULL = "full";
const ADDRESS_CONFIG_IN_BACKEND_IS_PROVINCE = "province";
const ADDRESS_CONFIG_IN_BACKEND_IS_CITY = "city";
const ADDRESS_CONFIG_IN_BACKEND_IS_NEIGHBORHOOD = "neighborhood";

const addressConfig = {
  [ADDRESS_CONFIG_IN_BACKEND_IS_NULL]: { keywords: null, substrNumber: 0 },
  [ADDRESS_CONFIG_IN_BACKEND_IS_FULL]: {
    keywords: ["address_compact"],
    substrNumber: 2,
  },
  [ADDRESS_CONFIG_IN_BACKEND_IS_PROVINCE]: {
    keywords: ["province"],
    substrNumber: 1,
  },
  [ADDRESS_CONFIG_IN_BACKEND_IS_CITY]: {
    keywords: ["province", "city"],
    substrNumber: 2,
  },
  [ADDRESS_CONFIG_IN_BACKEND_IS_NEIGHBORHOOD]: {
    keywords: ["province", "city", "neighbourhood"],
    substrNumber: 3,
  },
};

const getIndex = (string, subString, index) => {
  return string ? string.split(subString, index).join(subString)?.length : null;
};
function Address({
  themeColor,
  submitAddress,
  _setSnackBarMessage,
  _patchAddress,
  addressCallbackFunction,
  selectAddressIdByUser,
  business,
  businessLocation,
  addresses,
  user,
  shoppingPluginData,
}) {
  const {minWidth768  } = useResponsive();
  const router = useRouter();
  const theme = useTheme();
  const addressId = router?.query.address;
  const callbackURL = router?.query.url;
  const [address, setAddress] = useState("");
  const [addressObj, setAddressObj] = useState({});
  const [fixedAddressValue, setFixedAddressValue] = useState(null);
  const [editableAddressValue, setEditableAddressValue] = useState(null);
  const [mapEditMode, setMapEditMode] = useState(!addressId);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [access, setAccess] = useState(false);
  const [error, setError] = useState("");
  const [searchedAddress, searchAddress] = useState(null);
  const [searchedResultOptions, setSearchedResultOptions] = useState([
    { address: "" },
  ]);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const mapRef = useRef(null);
  const position = {
    latitude: addressObj.latitude || +businessLocation.latitude,
    longitude: addressObj.longitude || +businessLocation.longitude,
    singleMarker: true,
  };
  const mapHeight = useMemo(() => {
    if (minWidth768) {
      if (mapEditMode) {
        return 400;
      } else {
        return 250;
      }
    } else {
      if (mapEditMode) {
        return 300;
      } else {
        return 150;
      }
    }
  }, [minWidth768, mapEditMode]);
  const mapOptions = useMemo(() => {
    return {
      height: mapHeight,
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
      themeColor,
      zoom: 14,
      ref: mapRef,
      borderRadius: 8,
      zoomControlPosition: "bottomright",
    };
  }, [position, mapHeight, mapRef, mapEditMode, minWidth768]);
  useEffect(() => {
    const obj =
      (addressId && addresses?.find((adrs) => adrs.id === +addressId)) || {};
    obj.phone =
      obj?.phone?.replace("+98", "0") || user?.phone_zero_starts || "";
    obj.name = obj?.name || user?.name || "";
    setAddressObj(obj);
    setAddress(obj.address_detail);
    getAddressFromCoordinates(obj.latitude, obj.longitude).then((result) => {
      setAddressObj({
        ...obj,
        fixedAddress: shoppingPluginData?.data?.map?.reverse_accuracy
          ? addressConfig[
              shoppingPluginData?.data?.map?.reverse_accuracy
            ]?.keywords
              ?.map((item) => result?.[item])
              .join("،")
          : "",
      });
    });
  }, [addressId]);
  useEffect(() => {
    if (Object.keys(addressObj)?.length) {
      const index = getIndex(
        addressObj.fixedAddress,
        "،",
        shoppingPluginData?.data?.map?.reverse_accuracy
          ? addressConfig[shoppingPluginData?.data?.map?.reverse_accuracy]
              ?.substrNumber
          : 2
      );
      const selectedString =
        addressObj.fixedAddress && addressObj.fixedAddress.substr(0, index);
      setFixedAddressValue(selectedString);
      setEditableAddressValue(
        addressObj.fixedAddress?.replace(selectedString, "")
      );
    }
  }, [addressObj?.fixedAddress]);

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
  const submitMapLocation = () => {
    setMapEditMode(false);
    setHasError(false);
    const crd = mapRef.current.getCenter();
    getAddressFromCoordinates(crd.lat, crd.lng).then((result) => {
      setAddressObj({
        ...addressObj,
        fixedAddress: shoppingPluginData?.data?.map?.reverse_accuracy
          ? addressConfig[
              shoppingPluginData?.data?.map?.reverse_accuracy
            ]?.keywords
              ?.map((item) => result?.[item])
              .join("،")
          : "",
        latitude: crd.lat.toFixed(7),
        longitude: crd.lng.toFixed(7),
      });
    });
  };
  const submit = () => {
    const patchAddressCallback = () => {
      _setSnackBarMessage("آدرس با موفقیت ویرایش شد.", "success");
      router.push(callbackURL);
    };
    const submitAddressCallback = (submittedAddress) => {
      _setSnackBarMessage("آدرس با موفقیت اضافه شد.", "success");
      if (typeof addressCallbackFunction === "function") {
        addressCallbackFunction(submittedAddress.id);
      } else {
        selectAddressIdByUser(submittedAddress.id);
        router.push(callbackURL);
      }
    };
    if (isPhoneNumber(addressObj.phone)) {
      if (addressId && address && editableAddressValue) {
        _patchAddress(
          {
            ...addressObj,
            id: addressId,
            address: fixedAddressValue + editableAddressValue,
            address_detail: address,
            title: addressObj.title,
          },
          patchAddressCallback
        );
      } else {
        if (address && editableAddressValue) {
          submitAddress(
            {
              ...addressObj,
              address: fixedAddressValue + editableAddressValue,
              address_detail: address,
              title: addressObj.title,
            },
            submitAddressCallback
          );
        } else {
          _setSnackBarMessage("لطفا آدرس و جزئیات آدرس را وارد کنید.", "fail");
        }
      }
    } else {
      setError("شماره تماس اشتباه وارد شده است.");
    }
  };

  const toggleErrorTextForLocationNotHasBeenSelected = () => {
    setHasError(true);
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (searchedAddress) {
      setAddressObj({
        ...addressObj,
        latitude: searchedAddress?.geom?.coordinates[1].toString(),
        longitude: searchedAddress?.geom?.coordinates[0].toString(),
      });
    }
  }, [searchedAddress]);
  return (
    <div
      className={`d-flex flex-column py-2 py-md-4 ${
        minWidth768 ? " container " : ""
      }`}
    >
      <div className="col-12 mb-3 mt-2 mt-md-0">
        <div style={{ color: coal }} className="u-fontLarge u-fontWeightBold">
          {addressId ? "ویرایش آدرس" : "ساخت آدرس"}
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .leaflet-bottom {
            bottom : 45px
          }
          .leaflet-touch .leaflet-control-layers, .leaflet-touch .leaflet-bar {
            border : none ;
            box-shadow : 0 1px 3px rgb(0 0 0 / 65%) ;
          }
        `,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
                  .error-step-1-animation {
                    color: white;
                    animation-name: step-1-animation;
                    animation-duration: 0.75s;
                    animation-iteration-count : infinite ;
                  }
                  @keyframes step-1-animation {
                    0% {color: ${theme.palette.error.main}}
                    50% {color: ${hexToRGBA(theme.palette.error.main, 0.7)}}}
                    100% {color: ${theme.palette.error.main}}
                  }
                  `,
        }}
      />
      <div
        className={`col-12 mb-2 ${
          hasError && "error-step-1-animation u-fontLarge"
        }`}
      >
        مرحله اول:&nbsp;
        {hasError
          ? "ابتدا موقعیت خود را بر روی نقشه تعیین نمایید."
          : "انتخاب موقعیت مکانی"}
      </div>
      <div className="col-12 mb-3">
        <div className="position-relative w-100" ref={containerRef}>
          {dialogOpen && !minWidth768 && (
            <LocationAccessPopup
              themeColor={themeColor}
              business={business}
              onClose={() => setDialogOpen(false)}
              getAccess={getAccess}
            />
          )}
          <Map options={mapOptions} />
          {mapEditMode && (
            <Autocomplete
              freeSolo
              options={searchedResultOptions || [{ address: "" }]}
              getOptionLabel={(option) => option.address}
              onInputChange={(event) =>
                getLatAndLngFromAddress(event?.target?.value).then((result) => {
                  setSearchedResultOptions(result.value);
                })
              }
              onChange={(event, newValue) => searchAddress(newValue)}
              value={searchedAddress}
              renderInput={(params) => (
                <div
                  ref={params.InputProps.ref}
                  className="d-flex align-items-center w-100"
                >
                  <div className="d-flex">
                    <SearchRoundedIcon
                      className="mr-3"
                      style={{ color: cement }}
                      fontSize="medium"
                    />
                  </div>
                  <input
                    style={{
                      height: minWidth768 ? 56 : 40,
                      borderRadius: 8,
                    }}
                    type="text"
                    placeholder="جستجوی شهر یا محله"
                    {...params.inputProps}
                    className="p-2 w-100"
                  />
                </div>
              )}
              className="position-absolute  mx-2 px-0 bg-white"
              style={{
                top: 10,
                borderRadius: 8,
                width: containerRef?.current?.offsetWidth - 16,
              }}
              classes={{
                inputRoot: "search-address-input",
              }}
              ref={autoCompleteRef}
            />
          )}
          {!minWidth768 && mapEditMode && (
            <Button
              style={{
                bottom: 55,
                minWidth: "unset",
                right: 10,
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
          {mapEditMode ? (
            <div
              className="d-flex align-items-center position-absolute w-100 px-2"
              style={{ bottom: 10 }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: theme.palette.success.main,
                  borderRadius: 8,
                  color: "white",
                }}
                className={`ml-1 ${addressObj.fixedAddress ? "w-75" : "w-100"}`}
                onClick={submitMapLocation}
              >
                <CheckRoundedIcon fontSize="small" />
                <span className="mr-2 u-fontNormal" style={{ color: "white" }}>
                  ذخیره
                </span>
              </Button>
              {addressObj.fixedAddress && (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: theme.palette.error.main,
                    borderRadius: 8,
                    color: "white",
                  }}
                  onClick={() => {
                    setMapEditMode(false);
                    setHasError(false);
                  }}
                  className="w-25"
                >
                  <CloseRoundedIcon fontSize="small" />
                  <span className="mr-2 u-fontNormal">انصراف</span>
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
                left: 10,
                bottom: 10,
              }}
              className="position-absolute"
              onClick={() => setMapEditMode(true)}
            >
              <AddressPlaceMakerIcon color={themeColor} />
              <span className="mr-2 u-fontNormal" style={{ color: themeColor }}>
                ویرایش ناحیه
              </span>
            </Button>
          )}
        </div>
      </div>
      <div className="col-12 mb-2" style={{ opacity: mapEditMode && 0 }}>
        مرحله دوم:&nbsp; واردکردن جزییات آدرس
      </div>
      <div
        className="col-12"
        style={{
          marginBottom: 80,
          opacity: mapEditMode && 0,
        }}
        onClick={() =>
          mapEditMode && toggleErrorTextForLocationNotHasBeenSelected()
        }
      >
        <Paper
          elevation={1}
          className="py-3 p-md-3 d-flex flex-column justify-content-between"
          style={{
            pointerEvents: mapEditMode && "none",
          }}
        >
          <div className="d-flex flex-column justify-content-between py-md-3">
            <div className="d-flex flex-wrap">
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <div style={{ color: coal }} className="u-font-semi-small">
                  عنوان آدرس (اختیاری)
                </div>
                <Input
                  className="mt-1"
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  onChange={(title) => {
                    setAddressObj({ ...addressObj, title });
                  }}
                  themeColor={themeColor}
                  value={addressObj.title}
                  size="small"
                  placeholder="خونه"
                />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <div style={{ color: coal }} className="u-font-semi-small">
                  آدرس : {fixedAddressValue}
                </div>
                <Input
                  className="w-100 mt-1"
                  InputLabelProps={{ shrink: true }}
                  value={editableAddressValue}
                  color="secondary"
                  onChange={(value) => setEditableAddressValue(value)}
                  themeColor={themeColor}
                  size="small"
                />
              </div>
              <div className="col-12 col-md-3 mt-3 mt-md-0">
                <div style={{ color: coal }} className="u-font-semi-small">
                  جزییات آدرس
                </div>
                <Input
                  multiline
                  InputLabelProps={{ shrink: true }}
                  color="secondary"
                  className="mt-1"
                  placeholder="پلاک ۲"
                  onChange={setAddress}
                  themeColor={themeColor}
                  value={address}
                  size="small"
                />
              </div>
            </div>
            <div className="d-flex flex-wrap mt-0 mt-md-3">
              <div className="mt-3 mt-md-0 col-12 col-md-3">
                <div style={{ color: coal }} className="u-font-semi-small">
                  نام و نام‌خانوادگی
                </div>
                <Input
                  className="mt-1"
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  onChange={(name) => {
                    setAddressObj({ ...addressObj, name });
                  }}
                  themeColor={themeColor}
                  value={addressObj.name}
                  size="small"
                />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <div style={{ color: coal }} className="u-font-semi-small">
                  شماره تماس گیرنده
                </div>
                <Input
                  style={{ direction: "ltr" }}
                  className="mt-1"
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  onChange={(value) => {
                    setAddressObj({
                      ...addressObj,
                      phone: persianToEnglishNumber(value),
                    });

                    if (isPhoneNumber(persianToEnglishNumber(value))) {
                      setError("");
                    } else {
                      setError("شماره تماس اشتباه وارد شده است.");
                    }
                  }}
                  themeColor={themeColor}
                  value={englishNumberToPersianNumber(addressObj.phone, "")}
                  size="small"
                />
                <div className="u-text-red mt-2">{error}</div>
              </div>
              {minWidth768 && (
                <div className="mt-3 mt-md-0 col-12 col-md-3">
                  <div
                    style={{ color: coal, visibility: "hidden" }}
                    className="u-font-semi-small"
                  >
                    تایید
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="w-100 d-flex justify-content-between"
                    onClick={submit}
                    size="large"
                  >
                    تایید آدرس
                    <ArrowBackIosRoundedIcon
                      fontSize="small"
                      style={{ width: 15, height: 15 }}
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>
          {!minWidth768 && (
            <div
              style={{
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                zIndex: 10000,
              }}
              className="fixed-bottom p-3 d-flex bg-white justify-content-between"
            >
              <Button
                variant="contained"
                color="secondary"
                className="flex-grow-1 flex-grow-0 w-100 d-flex justify-content-between"
                id="btn-verification-6"
                onClick={submit}
                size="large"
              >
                تایید آدرس
                <ArrowBackIosRoundedIcon
                  fontSize="small"
                  style={{ width: 15, height: 15 }}
                />
              </Button>
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  businessLocation: makeSelectBusinessLocation(),
  themeColor: makeSelectBusinessThemeColor(),
  addresses: makeSelectAddresses(),
  user: makeSelectUser(),
  addressCallbackFunction: makeSelectAddressCallbackFunction(),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitAddress: (info, callback) => dispatch(createAddress(info, callback)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _patchAddress: (address, callback) =>
      dispatch(editAddress(address, callback)),
    selectAddressIdByUser: (selectedAddress) =>
      dispatch(setSelectedAddress(selectedAddress)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(Address);
