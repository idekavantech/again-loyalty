/**
 *
 * AdminThemeSettings
 *
 */

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SaveAndDiscardButtons from "@saas/components/SaveAndDiscardButtons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@material-ui/core/Select";

import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import { updateBusiness } from "@saas/stores/business/actions";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";

import { useRouter } from "next/router";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { night, graphite, strawberryI } from "@saas/utils/colors";
import { makeSelectForms } from "store/selectors";
import { makeSelectFormsDictionary } from "@saas/stores/business/selector";
import { updateForm } from "store/actions";
import Input from "@saas/components/Input";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { getFormsDictionary } from "@saas/stores/business/actions";
import {
  FIELDS_CONFIGS,
  FIELDS_CONFIGS_COMPONENTS,
  SELECTABLE_FORM_FIELDS,
} from "./constants";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Menu from "@material-ui/core/Menu";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
export function AdminEditForm({
  loading,
  _updateForm,
  _setSnackBarMessage,
  _getFormsDictionary,
  formsDictionary,
}) {
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      _getFormsDictionary(router.query.id);
    }, 0);
  }, []);
  useEffect(() => {
    if (formsDictionary) {
      setForm(formsDictionary[router.query.id]);
    }
  }, [formsDictionary]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSelectFieldModalOpen, toggleSelectFieldModalOpen] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [selectedFieldType, selectFieldType] = useState(
    SELECTABLE_FORM_FIELDS[0].type
  );
  const [selectedFieldTypeConfig, setSelectedFieldTypeConfig] = useState(() => {
    const _config = {};
    FIELDS_CONFIGS[selectedFieldType].forEach(
      (configItem) => (_config[configItem] = "")
    );
    _config.type = selectedFieldType;
    return _config;
  });
  useEffect(() => {
    if (!isSelectFieldModalOpen) {
      const _config = {};
      FIELDS_CONFIGS[selectedFieldType].forEach(
        (configItem) => (_config[configItem] = "")
      );
      _config.type = selectedFieldType;
      setSelectedFieldTypeConfig(_config);
    }
  }, [isSelectFieldModalOpen]);
  useEffect(() => {
    const _config = {};
    FIELDS_CONFIGS[selectedFieldType].forEach(
      (configItem) => (_config[configItem] = "")
    );
    _config.id = selectedFieldTypeConfig.id;
    _config.type = selectedFieldType;
    setSelectedFieldTypeConfig(_config);
  }, [selectedFieldType]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    inputs: [],
  });
  const addFieldToForm = () => {
    if (selectedFieldTypeConfig.title === "") {
      setError("عنوان بالای فیلد نمی‌تواند خالی باشد.");
    } else {
      const __form = { ...form };
      __form.inputs.push({ ...selectedFieldTypeConfig, id: uniqueid() });
      setForm(__form);
      toggleSelectFieldModalOpen(false);
      const _config = {};
      FIELDS_CONFIGS[selectedFieldType].forEach(
        (configItem) => (_config[configItem] = "")
      );
      _config.type = selectedFieldType;
      setSelectedFieldTypeConfig(_config);
      setError(null);
    }
  };
  const removeFieldFromForm = () => {
    const __form = { ...form };
    __form.inputs.splice(selectedInputIndex, 1);
    setForm(__form);
    setIsConfirmationOpen(false);
  };
  const selectFieldToEdit = (field) => {
    selectFieldType(field.type);
    setTimeout(() => {
      setSelectedFieldTypeConfig(field);
    }, 0);
  };
  const editFieldConfigs = () => {
    if (selectedFieldTypeConfig.title === "") {
      setError("عنوان بالای فیلد نمی‌تواند خالی باشد.");
    } else {
      const __form = { ...form };
      const selectedInputIndex = __form.inputs.findIndex(
        (_input) => _input.id === selectedFieldTypeConfig.id
      );
      __form.inputs[selectedInputIndex] = { ...selectedFieldTypeConfig };
      setForm(__form);
      toggleSelectFieldModalOpen(false);
      const _config = {};
      FIELDS_CONFIGS[selectedFieldType].forEach(
        (configItem) => (_config[configItem] = "")
      );
      _config.type = selectedFieldType;
      setSelectedFieldTypeConfig(_config);
      setError(null);
    }
  };
  const submit = () => {
    if (form.title && form.description && form.inputs.length) {
      _updateForm(form);
    } else {
      _setSnackBarMessage(
        "لطفا عنوان فرم و توضیحات فرم و حداقل یک فیلد را وارد کنید",
        "fail"
      );
    }
  };
  useEffect(() => {
    if (selectedFieldTypeConfig.title !== "") {
      setError(null);
    }
  }, [selectedFieldTypeConfig.title]);

  const onDragEnd = (e) => {
    const newList = [...form.inputs];
    const draggbleItem = newList[e.source.index];
    newList.splice(e.source.index, 1);
    newList.splice(e.destination.index, 0, draggbleItem);
    setForm({ ...form, inputs: newList });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderDeleteFieldPopup = () => (
    <Dialog
      open={isConfirmationOpen}
      onClose={() => setIsConfirmationOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          با انتخاب <span className="u-fontWeightBold">دکمه‌ی حذف</span>، فیلد
          مربوطه و تمامی{" "}
          <span className="u-fontWeightBold">اطلاعات جمع‌آوری شده‌ی آن</span> در
          بخش اطلاعات دریافتی به طور کامل و{" "}
          <span className="u-fontWeightBold">غیر قابل بازگشت</span> حذف خواهند
          شد. آیا از انتخاب خود مطمئنید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setIsConfirmationOpen(false)}
          color="primary"
          autoFocus
        >
          انصراف
        </Button>
        <Button
          color="primary"
          onClick={removeFieldFromForm}
          style={{ color: strawberryI }}
        >
          حذف فیلد
        </Button>
      </DialogActions>
    </Dialog>
  );
  const renderSelectFieldModal = () => (
    <Dialog
      fullWidth
      open={isSelectFieldModalOpen}
      onClose={() => toggleSelectFieldModalOpen(false)}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="u-fontNormal">انتخاب فیلد</div>
        </DialogContentText>
        <div>
          <Select
            value={selectedFieldType}
            label="دسته‌بندی فیلد‌ها"
            onChange={(event) => selectFieldType(event.target.value)}
            className="medium w-100"
          >
            {SELECTABLE_FORM_FIELDS.map((option) => (
              <MenuItem key={option.id} value={option.type}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          <div className="mt-4">
            {FIELDS_CONFIGS[selectedFieldType].map((configItem) => {
                const COMP = FIELDS_CONFIGS_COMPONENTS[configItem]
                return <div key={configItem.id} className="my-3">
                  <COMP value={selectedFieldTypeConfig[configItem]} setValue={(value) => {
                    setSelectedFieldTypeConfig({
                      ...selectedFieldTypeConfig,
                      [configItem]: value,
                    });
                  }} />

                </div>
              })}
          </div>
        </div>
        {error && (
          <div style={{ color: theme.palette.error.main }} className="mr-1">
            {error}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (selectedFieldTypeConfig && selectedFieldTypeConfig.id) {
              editFieldConfigs();
            } else {
              addFieldToForm();
            }
          }}
        >
          {selectedFieldTypeConfig.id ? "ذخیره تغییرات" : "ایجاد فیلد"}
        </Button>
        <Button
          color="primary"
          onClick={() => toggleSelectFieldModalOpen(false)}
        >
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <div className="container">
      <Head>
        <title>ویرایش فرم</title>
      </Head>
      {renderDeleteFieldPopup()}
      {renderSelectFieldModal()}
      <AdminBreadCrumb />
      <Paper elevation={1} className="py-3 px-4 mt-3">
        <div className="u-fontLarge" style={{ color: night }}>
          مشخصات فرم
        </div>
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="mt-4">
              <Input
                type="text"
                size="medium"
                label="عنوان فرم"
                value={form && form.title}
                onChange={(value) => setForm({ ...form, title: value })}
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                size="medium"
                label="توضیحات فرم"
                value={form && form.description}
                onChange={(value) => setForm({ ...form, description: value })}
              />
            </div>
          </div>
        </div>
      </Paper>
      <div
        className="px-3 my-3 d-flex justify-content-between align-items-center"
        style={{ color: theme.palette.text.tertiary, fontSize: 16 }}
      >
        <div>لیست فیلد‌ها</div>
        <div>
          <Button
            onClick={() => toggleSelectFieldModalOpen(true)}
            style={{ direction: "ltr" }}
            color="primary"
            variant="outlined"
            endIcon={<AddRoundedIcon fontSize="small" />}
          >
            فیلد جدید
          </Button>
        </div>
      </div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="deal_categories">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {form &&
                  form.inputs.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(provided) => (
                        <Paper
                          elevation={1}
                          className="px-3 mb-2 py-2 d-flex justify-content-between align-items-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="d-flex align-items-center">
                            <span
                              className="dragHandle d-flex"
                              style={{ cursor: "grab", color: graphite }}
                            >
                              <DragIndicatorIcon />
                            </span>
                            <div>
                              {field.label || field.text || field.title || field.titleOfRadioOrCheckbox}
                            </div>
                          </div>
                          <div>
                            {field.required && (
                              <IconButton
                                color="primary"
                                className="mr-2"
                                style={{ pointerEvents: "none" }}
                              >
                                <StarsRoundedIcon
                                  fontSize="small"
                                  color="primary"
                                  className="mr-2"
                                />
                              </IconButton>
                            )}
                            <IconButton
                              color="primary"
                              className="mr-1"
                              onClick={(event) => {
                                handleClick(event);
                                selectFieldToEdit(field);
                                setSelectedInputIndex(index);
                              }}
                            >
                              <SettingsRoundedIcon fontSize="small" />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                              elevation={1}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  toggleSelectFieldModalOpen(true);
                                }}
                                className="d-flex justify-content-between align-items-center"
                              >
                                <span
                                  style={{
                                    color:
                                      process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                                  }}
                                  className="ml-3"
                                >
                                  ویرایش
                                </span>
                                <EditRoundedIcon
                                  color="primary"
                                  fontSize="small"
                                />
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  setIsConfirmationOpen(true);
                                }}
                                className="d-flex justify-content-between align-items-center"
                              >
                                <span
                                  style={{
                                    color:
                                      process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                                  }}
                                  className="ml-3"
                                >
                                  حذف
                                </span>
                                <DeleteIcon color="primary" fontSize="small" />
                              </MenuItem>
                            </Menu>
                          </div>
                        </Paper>
                      )}
                    </Draggable>
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <SaveAndDiscardButtons
        saveAction={submit}
        saveText="ذخیره"
        disabled={loading}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeConfig: makeSelectBusinessThemeConfig(),
  themeColor: makeSelectBusinessThemeColor(),
  forms: makeSelectForms(),
  formsDictionary: makeSelectFormsDictionary(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getFormsDictionary: (id) => dispatch(getFormsDictionary(id)),
    _updateForm: (data) => dispatch(updateForm(data)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminEditForm);
