import React, { memo, useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "stores/global/selector";
import {
  createFormResponse,
  getFormsDictionary,
  setSnackBarMessage,
} from "stores/global/actions";
import { phoneValidator } from "utils/helpers/phoneValidator";
import { makeSelectFormsDictionary } from "stores/global/selector";
import Input from "components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import LazyImage from "components/LazyImage";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import InstagramIcon from "@material-ui/icons/Instagram";
import { uniqueId } from "lodash";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";

const WaysOfCommunication = [
  {
    id: uniqueId(),
    icon: () => <PhoneInTalkIcon />,
    link: "tel:+982191070751",
    Text: "+۹۸۲۱۹۱۰۷۰۷۵۱",
  },
  {
    id: uniqueId(),
    icon: () => <WhatsAppIcon />,
    link: "https://api.whatsapp.com/send/?phone=989981741275&text&app_absent=0",
    Text: "+۹۸۹۹۸۱۷۴۱۲۷۵",
  },
  {
    id: uniqueId(),
    icon: () => <InstagramIcon />,
    link: "https://www.instagram.com/vitrin.me/",
    Text: "vitrin.me",
  },
];

const familarWithVitrin = [
  { id: uniqueId(), text: "اینستاگرام و پیج ویترین" },
  { id: uniqueId(), text: "جست‌وجو در گوگل" },
  { id: uniqueId(), text: "معرفی دوستان و آشنایان" },
  { id: uniqueId(), text: "سایت‌های ساخته شده با ویترین" },
  { id: uniqueId(), text: "راه‌های دیگر" },
];

export function FreeConsultationModal({
  isOpen,
  onClose,
  formsDictionary,
  _getFormsDictionary,
  _setSnackBarMessage,
  _submitForm,
  loading,
}) {
  const [_form, _setForm] = useState([]);
  const [selectedWayOfFamilar, setSelectedWtOfFamilar] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const form_id = 548;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        _getFormsDictionary(form_id);
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (formsDictionary) {
      _setForm(formsDictionary[form_id]);
    }
  }, [formsDictionary]);

  const submit = () => {
    const newArray = [];
    _form.inputs.forEach((input) => {
      if (
        input.required === true &&
        (input.value === undefined || input.value === "")
      ) {
        newArray.push(input);
      }
    });
    if (newArray && newArray.length) {
      _setSnackBarMessage("لطفا همه فیلدها را پر نمایید.", "fail");
    } else if (!phoneValidator(_form?.inputs[1].value).valid) {
      _setSnackBarMessage("شماره تلفن همراه وارد شده اشتباه است", "fail");
    } else {
      const _button = _form.inputs.find((_input) => _input.type === "button");
      _submitForm(_form, form_id, onClose);
      setTimeout(() => {
        _form.inputs.forEach((input) => (input.value = ""));
        setSelectedWtOfFamilar([]);
        if (_form.inputs.find((input) => input.type === "image")) {
          _removeFile();
        }
      }, 0);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xl"
      scroll="paper"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "m-0" }}
    >
      <DialogContent className="m-0 p-4 p-xl-5 d-flex contact-form flex-col flex-xl-row">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .MuiBackdrop-root{
            backdrop-filter: blur(3px);
            background-color:rgba(0,0,30,0.5)
          }
          .MuiOutlinedInput-adornedStart {
            padding-left: 0;
            border-radius:8px
          },
        `,
          }}
        />
        <div className="col-12 col-xl-7 call-section pb-5 pb-xl-0 pl-0 pl-xl-5 pr-0">
          <LazyImage
            src="/images/call-form.svg"
            width={120}
            className="ml-4  d-xl-none "
          />
          <h1 className="text-center title mt-4 mt-xl-0">
            منتظر تماس ما بمانید
          </h1>
          <span className="py-3 text-absolute title">یا</span>
          <Button
            className={`w-100 btn-form mt-4  d-xl-none  ${
              showForm ? "d-none" : "d-block"
            }`}
            size="large"
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
          >
            پر کردن فرم
          </Button>
          <div className={`${showForm ? "d-block" : "d-none d-xl-block"}`}>
            <p className="description">
              برای دریافت اطلاعات بیشتر دربارهٔ ویترین، لطفا اطلاعات تماس خود را
              در این فرم وارد کنید تا برای مشاورهٔ رایگان با شما تماس بگیریم و
              راهکار اختصاصی خودتان را دریافت کنید.
            </p>
            <div className="d-flex" style={{ marginTop: 45 }}>
              <LazyImage
                src="/images/call-form.svg"
                className="ml-4  d-none d-xl-block"
              />
              <div className="d-flex flex-col flex-1">
                <Input
                  type="tel"
                  dir="rtl"
                  id="phoneNumber"
                  noModal
                  label="نام و نام خانوادگی"
                  style={{ paddingLeft: 0 }}
                  inputProps={{
                    style: { paddingLeft: 0 },
                  }}
                  placeholder={"مثال : فاطمه امینی"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        style={{
                          position: "absolute",
                          left: 10,
                          backgroundColor: "#F6F6F7",
                        }}
                        position="start"
                      >
                        <PersonIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(value) => {
                    const localForm = { ..._form };
                    localForm.inputs[0].value = value;
                    _setForm(localForm);
                  }}
                />
                <Input
                  type="tel"
                  dir="rtl"
                  id="phoneNumber"
                  noModal
                  label="شماره همراه"
                  style={{ paddingLeft: 0, marginTop: 16 }}
                  inputProps={{
                    maxLength: 11,
                    style: { paddingLeft: 0 },
                  }}
                  onChange={(value) => {
                    const localForm = { ..._form };
                    localForm.inputs[1].value = persianToEnglishNumber(value);
                    _setForm(localForm);
                  }}
                  placeholder={"مثال : ۰۹۱۲۱۲۳۴۵۶۷"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        style={{
                          position: "absolute",
                          left: 10,
                          backgroundColor: "#F6F6F7",
                        }}
                        position="start"
                      >
                        <PhoneAndroidIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Input
                  type="tel"
                  dir="rtl"
                  id="phoneNumber"
                  noModal
                  label="زمینه فعالیت شما"
                  style={{ paddingLeft: 0, marginTop: 16 }}
                  onChange={(value) => {
                    const localForm = { ..._form };
                    localForm.inputs[2].value = value;
                    _setForm(localForm);
                  }}
                  inputProps={{
                    style: { paddingLeft: 0 },
                  }}
                  placeholder={"مثال : رستوران"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        style={{
                          position: "absolute",
                          left: 10,
                          backgroundColor: "#F6F6F7",
                        }}
                        position="start"
                      >
                        <WorkIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div>
              <p className="text">چگونه با ویترین آشنا شده اید؟</p>
              <Select
                className="mt-4 c-selector"
                style={{
                  width: "100%",
                  height: 56,
                  flex: 1,
                  borderRadius: 8,
                  color: "rgba(0, 0, 0, 0.6)",
                  marginBottom: 30,
                }}
                value={selectedWayOfFamilar}
                margin="dense"
                variant="outlined"
                displayEmpty
                size="large"
                // IconComponent={() => null}
                renderValue={() => {
                  if (!selectedWayOfFamilar.length) return "انتخاب کنید";
                  return selectedWayOfFamilar[0].text;
                }}
                MenuProps={{
                  getContentAnchorEl: null,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  variant: "menu",
                }}
              >
                <MenuItem
                  className="px-2"
                  onClick={() => setSelectedWtOfFamilar([])}
                >
                  <ListItemText primary="انتخاب کنید" className="text-right" />
                </MenuItem>
                {familarWithVitrin.map((item) => (
                  <MenuItem
                    className="px-2"
                    key={item.id}
                    onClick={() => {
                      setSelectedWtOfFamilar([item]);
                      const localForm = { ..._form };
                      localForm.inputs[3].value = item.text;
                      _setForm(localForm);
                    }}
                  >
                    <ListItemText primary={item.text} className="text-right" />
                  </MenuItem>
                ))}
              </Select>
            </div>
            <Button
              className="w-100 btn-form"
              size="large"
              variant="contained"
              color="primary"
              onClick={submit}
              disabled={loading}
            >
              ثبت اطلاعات برای تماس
            </Button>
          </div>

          <div className="w-100 mt-5 seperatore-box d-flex justify-content-center d-xl-none">
            <span className="title text-center">یا</span>
          </div>
        </div>
        <div className="col-12 col-xl-5 pr-0  pr-xl-5 pl-0 d-flex flex-col align-items-center">
          <LazyImage
            src="/images/message-form.svg"
            width={120}
            className="  d-xl-none"
          />

          <h1 className="text-center title mt-4 mt-xl-0">به ما پیام دهید</h1>
          <Button
            className={`w-100 btn-form mt-4  ${
              showSocialMedia ? "d-none" : "d-block d-xl-none"
            }`}
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => {
              setShowSocialMedia(true);
            }}
          >
            دیدن راه‌های ارتباطی
          </Button>
          <div
            className={`${
              showSocialMedia ? "d-block" : "d-none d-xl-flex flex-col"
            }`}
            style={{ height: "100%" }}
          >
            <p className="description">
              کارشناسان ویترین آماده هستند تا از طریق راه‌های ارتباطی ویترین
              پرسش‌های شما را دریافت کنند.
            </p>
            <div className="d-flex w-100 social-media-box">
              <div className="d-flex flex-col flex-1">
                {WaysOfCommunication.map((way, index) => (
                  <div
                    key={way.id}
                    className={`d-flex justify-content-end align-items-center  ${
                      index !== 0 ? "item" : ""
                    }`}
                  >
                    <a
                      className="ml-3"
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        direction: "ltr",
                      }}
                      href={way.link}
                      target="_blank"
                    >
                      {way.Text}
                    </a>{" "}
                    {way.icon()}
                  </div>
                ))}
              </div>
              <LazyImage
                src="/images/message-form.svg"
                className="mr-5 d-none d-xl-block"
              />
            </div>
            <div className="w-100 mt-xl-auto mt-4">
              <a
                href="https://api.whatsapp.com/send/?phone=989981741275&text&app_absent=0"
                target="_blank"
              >
                <Button
                  className="w-100 btn-form"
                  size="large"
                  variant="outlined"
                  color="primary"
                >
                  پیام به واتساپ ویترین
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(FreeConsultationModal);
