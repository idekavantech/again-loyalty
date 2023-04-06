import React, { memo, useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import { createStructuredSelector } from "reselect";
import { makeSelectFormsDictionary } from "stores/global/selector";
import { connect } from "react-redux";
import { compose } from "redux";
import Input from "components/Input";
import {
  createFormResponse,
  getFormsDictionary,
  setSnackBarMessage,
} from "stores/global/actions";
import LoadingIndicator from "components/LoadingIndicator";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { makeSelectLoading } from "stores/global/selector";
import LocationAccessPopup from "@saas/components/LocationAccessPopup";
function Form1({
  loading,
  _getFormsDictionary,
  _submitForm,
  _setSnackBarMessage,
  formsDictionary,
  _removeFile,
  business,
  isMobile,
}) {
  const form_id = 85;
  const {minWidth768  } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
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
  const submit = () => {
    const newArray = [];
    form.inputs.forEach((input) => {
      if (
        input.required === true &&
        (input.value === undefined || input.value === "")
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
        form.inputs.forEach((input) => (input.value = ""));
        if (form.inputs.find((input) => input.type === "image")) {
          _removeFile();
        }
      }, 0);
    }
  };
  const getAccess = async () => {
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
          className="w-100"
          onClick={() => submit()}
          style={{ backgroundColor: "#0050ff", color: "#fff" }}
        >
          {field.text}
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
  };
  return (
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
          className={`${isDesktop ? "col-lg-6" : "col-12"} mx-auto text-right`}
        >
          <div className="my-2" style={{ fontSize: 16 }}>
            {form && form.title}
          </div>
          <div className="my-2" style={{ opacity: 0.6, fontSize: 14 }}>
            {form && form.description}
          </div>
          <div>
            {form &&
              form.inputs.map((_input) => (
                <div className="my-4" key={_input.id}>
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
  );
}

const mapStateToProps = createStructuredSelector({
  formsDictionary: makeSelectFormsDictionary(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getFormsDictionary: (id) => dispatch(getFormsDictionary(id)),
    _submitForm: (data, id, cb) => dispatch(createFormResponse(data, id, cb)),
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Form1);
