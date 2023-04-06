import React, { memo, useEffect, useRef, useState } from "react";
import AdminSection from "@saas/components/AdminSection";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import dynamic from "next/dynamic";
import Input from "@saas/components/Input";
import {
  makeSelectLoading,
  makeSelectUploadedFile,
} from "@saas/stores/global/selectors";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { pollution } from "@saas/utils/colors";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import ImageUploader from "../../../components/ImageUploader";
import Icon from "@saas/components/Icon";
import { GPS } from "@saas/icons";
import {
  makeSelectBusiness,
  makeSelectBusinessLocation,
  makeSelectBusinessThemeColor,
  makeSelectFormsDictionary,
} from "@saas/stores/business/selector";
import LocationAccessPopup from "@saas/components/LocationAccessPopup";
import useTheme from "@material-ui/core/styles/useTheme";
import LazyImage from "@saas/components/LazyImage";
import {
  createFormResponse,
  getFormsDictionary,
} from "@saas/stores/business/actions";
import styled from "styled-components";
import { FormControl, FormLabel } from "@material-ui/core";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });

const StyledCheckbox = styled(Checkbox)(({ checkboxThemeColor }) => ({
  "&.MuiCheckbox-root.Mui-checked": {
    color: checkboxThemeColor || "",
  },
  "& .MuiIconButton-label svg": {
    color: checkboxThemeColor || "",
  },
  "& + .MuiFormControlLabel-label": {
    color: checkboxThemeColor || "",
  },
  "& input": {
    color: checkboxThemeColor || "",
  },
}));

const StyledRadio = styled(Radio)(({ radioThemeColor }) => ({
  "&.MuiCheckbox-root.Mui-checked": {
    color: radioThemeColor || "",
  },
  "& .MuiIconButton-label svg": {
    color: radioThemeColor || "",
  },
  "& + .MuiFormControlLabel-label": {
    color: radioThemeColor || "",
  },
}));
let timeoutId = null;
function Form1({
  loading,
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  _getFormsDictionary,
  _submitForm,
  _setSnackBarMessage,
  formsDictionary,
  _uploadFile,
  _removeFile,
  uploadedFile,
  business,
  businessLocation,
  themeColor,
  isMobile,
  content,
  customization = {},
}) {
  const {
    form: {
      value: form_id,
      form_use_theme_color,
      form_color,
      button_use_theme_color,
      button_color,
      button_text_color,
    },
  } = content;
  const {
    background: {
      background_type = "color",
      background_color,
      opacity = 100,
      background_image,
    } = {},
  } = customization;
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
  const [access, setAccess] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      if (form_id) {
        _getFormsDictionary(form_id);
      }
    }, 0);
  }, [form_id]);
  const mapRef = useRef(null);
  useEffect(() => {
    if (formsDictionary) {
      _setForm(formsDictionary[form_id]);
      setForm(formsDictionary[form_id]);
    }
  }, [formsDictionary]);
  const [_form, _setForm] = useState({});

  const [zoom, setZoom] = useState(14);
  const mapOptions = {
    height: "320px",
    width: "100%",
    markers: [],
    editMode: true,
    onzoomend: (e) => setZoom(e.target._zoom),
    zoom,
    themeColor,
    ref: mapRef,
    dragging: isDesktop,
  };
  const submit = () => {
    const newArray = [];
    form.inputs.forEach((input) => {
      if (
        input.required === true &&
        (input.value === undefined ||
          input.value === "" ||
          input.value?.length === 0)
      ) {
        newArray.push(input);
      }
    });
    if (newArray && newArray.length) {
      _setSnackBarMessage("لطفا فیلدهای الزامی را پر نمایید.", "fail");
    } else {
      const _button = form.inputs.find((_input) => _input.type === "button");
      const callback = _button ? _button.callback : null;
      _submitForm(_form, form_id, callback);
      setTimeout(() => {
        form.inputs.forEach((input) => {
          if (input.type === "checkbox") input.value = [];
          else input.value = "";
        });
        if (form.inputs.find((input) => input.type === "image")) {
          _removeFile();
        }
      }, 0);
    }
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
  const renderField = (field) => {
    const value = form.inputs.find((input) => input.id === field.id).value;
    const inputIndex = form.inputs.findIndex((input) => input.id === field.id);
    if (field.type === "button") {
      return (
        <Button
          variant="contained"
          color={button_use_theme_color ? "secondary" : ""}
          style={{
            backgroundColor: !button_use_theme_color ? button_color : "",
          }}
          className="w-100"
          onClick={() => submit()}
        >
          <p
            style={{
              color: button_use_theme_color ? "#fff" : button_text_color,
            }}
          >
            {field.text}
          </p>
        </Button>
      );
    }
    if (
      field.type === "text" ||
      field.type === "number" ||
      field.type === "tel" ||
      field.type === "email"
    ) {
      return (
        <Input
          size="medium"
          type={field.type}
          label={field.label || field.title}
          required={field.required}
          formTheme={form_use_theme_color ? null : form_color}
          numberOnly={field.type === "tel" || field.type === "number"}
          value={value}
          onChange={(value) => {
            const localForm = { ..._form };
            localForm.inputs[inputIndex].value = value;
            _setForm(localForm);
          }}
          className="w-100"
        />
      );
    }
    if (field.type === "location") {
      return (
        <div className="position-relative">
          {field.title && (
            <p
              className="py-2 px-4"
              style={{
                color: form_use_theme_color ? "rgb(51, 83, 99)" : form_color,
              }}
            >
              {field.title}
              {field.required && <span className="mr-1">*</span>}
            </p>
          )}
          <Map
            options={{
              ...mapOptions,
              center: !_form.inputs[inputIndex].value
                ? {
                    latitude: +businessLocation.latitude,
                    longitude: +businessLocation.longitude,
                  }
                : {
                    latitude: +_form.inputs[inputIndex].value.latitude,
                    longitude: +_form.inputs[inputIndex].value.longitude,
                  },
              editMode: true,
              onMoveEnd: (e) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                  const { lat, lng } = e.target.getCenter();
                  const localForm = { ..._form };
                  const inputIndex = localForm.inputs.findIndex(
                    (input) => input.id === field.id
                  );
                  localForm.inputs[inputIndex].value = {
                    latitude: lat.toFixed(7),
                    longitude: lng.toFixed(7),
                  };
                  _setForm(localForm);
                }, 500);
              },
            }}
          />
          {!isDesktop && (
            <Button
              style={{
                bottom: 15,
                minWidth: "unset",
                right: 20,
                zIndex: 1000,
                borderRadius: "50%",
                backgroundColor: !button_use_theme_color
                  ? button_color
                  : theme.palette.background.default,
              }}
              className="p-2 c-btn-open-map position-absolute"
              onClick={() => {
                if (access) getAccess();
                else setDialogOpen(true);
              }}
              variant="contained"
            >
              <Icon
                color={button_use_theme_color ? pollution : button_text_color}
                icon={GPS}
                width={25}
                height={25}
              />
            </Button>
          )}
        </div>
      );
    }
    if (field.type === "image") {
      return (
        <ImageUploader
          _uploadFile={_uploadFile}
          title={field?.title}
          required={!!field.required}
          image={uploadedFile && uploadedFile.url}
          formTheme={form_use_theme_color ? null : form_color}
          callback={(img) => {
            const localForm = { ..._form };
            localForm.inputs[inputIndex].value = img;
            _setForm(localForm);
          }}
        />
      );
    }

    if (field.type === "checkbox") {
      let tempValue = value === undefined ? [] : value;
      const useCheckboxField = field.useCheckboxField || field.checkboxField
      return (
        <FormControl required={!!field.required}>
          <FormLabel
            style={{ ...(!form_use_theme_color && { color: form_color }) }}
          >
            {field.titleOfRadioOrCheckbox}
          </FormLabel>
          <FormGroup>
            {useCheckboxField &&  useCheckboxField.map((item, i) => (
              <FormControlLabel
                key={item.text}
                onChange={() => {
                  const localForm = { ..._form };
                  // handle set value to checkbox fields
                  let tempValues = localForm.inputs[inputIndex].value || [];
                  let itemValue =
                    localForm.inputs[inputIndex].useCheckboxField[i].text;
                  if (tempValues.includes(itemValue))
                    tempValues = tempValues.filter(
                      (item) => item !== itemValue
                    );
                  else tempValues = [...tempValues, itemValue];
                  localForm.inputs[inputIndex].value = tempValues;
                  _setForm(localForm);
                }}
                label={item.text}
                control={
                  <StyledCheckbox
                    checked={tempValue.includes(item.text)}
                    color="primary"
                    checkboxThemeColor={
                      !form_use_theme_color ? form_color : null
                    }
                  />
                }
                className="mx-0"
              />
            ))}
          </FormGroup>
        </FormControl>
      );
    }

    if (field.type === "radio") {
      return (
        <FormControl required={!!field.required}>
          <FormLabel
            style={{ ...(!form_use_theme_color && { color: form_color }) }}
          >
            {field.titleOfRadioOrCheckbox}
          </FormLabel>
          <RadioGroup name={`radio-${field.id}`} value={value}>
            {field.useRadioField &&
              field.useRadioField.map((item) => (
                <FormControlLabel
                  value={item.text}
                  key={item.text}
                  onChange={(e) => {
                    const localForm = { ..._form };
                    localForm.inputs[inputIndex].value = e.target.value;
                    _setForm(localForm);
                  }}
                  label={item.text}
                  control={
                    <StyledRadio
                      checked={value === item.text}
                      color="primary"
                      radioThemeColor={
                        !form_use_theme_color ? form_color : null
                      }
                    />
                  }
                  className="mx-0"
                />
              ))}
          </RadioGroup>
        </FormControl>
      );
    }
  };
  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      <div
        style={{
          height: "100%",
          backgroundColor:
            background_type === "color" ? background_color : "transparent",
        }}
        className="position-absolute left-0 u-top-0 w-100 d-block"
      >
        {background_image && background_type === "image" && (
          <LazyImage
            src={background_image}
            style={{ opacity: opacity / 100 }}
          />
        )}
      </div>
      <div className="container p-3 mt-3">
        {dialogOpen && !isDesktop && (
          <LocationAccessPopup
            business={business}
            onClose={() => setDialogOpen(false)}
            getAccess={getAccess}
          />
        )}
        {form ? (
          <div
            className={`${
              isDesktop ? "col-lg-6" : "col-12"
            } mx-auto text-right`}
          >
            <div
              className="my-2"
              style={{
                fontSize: 16,
                ...(!form_use_theme_color && { color: form_color }),
              }}
            >
              {form && form.title}
            </div>
            <div
              className="my-2"
              style={{
                opacity: 0.6,
                fontSize: 14,
                ...(!form_use_theme_color && { color: form_color }),
              }}
            >
              {form && form.description}
            </div>
            <div>
              {form &&
                form.inputs.map((_input) => (
                  <div key={_input.id} className="my-4">
                    {renderField(_input)}
                  </div>
                ))}
            </div>
          </div>
        ) : loading ? (
          <div className="w-100" style={{ height: 200 }}>
            <LoadingIndicator />
          </div>
        ) : (
          <div
            className={`${
              isDesktop ? "col-lg-6" : "col-12"
            } mx-auto text-center py-5`}
          >
            فرمی برای نمایش انتخاب نشده است.
          </div>
        )}
      </div>
    </AdminSection>
  );
}

const mapStateToProps = createStructuredSelector({
  formsDictionary: makeSelectFormsDictionary(),
  loading: makeSelectLoading(),
  uploadedFile: makeSelectUploadedFile(),
  themeColor: makeSelectBusinessThemeColor(),
  business: makeSelectBusiness(),
  businessLocation: makeSelectBusinessLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getFormsDictionary: (id) => dispatch(getFormsDictionary(id)),
    _submitForm: (data, id, cb) => dispatch(createFormResponse(data, id, cb)),
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: (index) => dispatch(removeFile(index)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Form1);
