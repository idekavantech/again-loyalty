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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { night, graphite, strawberryI } from "@saas/utils/colors";
import { makeSelectForms } from "store/selectors";
import { createForm } from "store/actions";
import Input from "@saas/components/Input";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
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
export function AdminCreateForm({ loading, _createForm, _setSnackBarMessage }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSelectFieldModalOpen, toggleSelectFieldModalOpen] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [selectedFieldType, selectFieldType] = useState(
    SELECTABLE_FORM_FIELDS[0].type
  );
  const [selectedFieldTypeConfig, setSelectedFieldTypeConfig] = useState(() => {
    const _config = {};
    FIELDS_CONFIGS[selectedFieldType].forEach(
      (configItem) => (_config[configItem] = null)
    );
    _config.type = selectedFieldType;
    return _config;
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    inputs: [],
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
  const addFieldToForm = () => {
    if (selectedFieldTypeConfig.title === "") {
      setError("The title of the top of the field cannot be empty.");
    } else {
      const __form = { ...form };
      __form.inputs.push({ ...selectedFieldTypeConfig, id: uniqueid() });
      setForm(__form);
      toggleSelectFieldModalOpen(false);
      const _config = {};
      FIELDS_CONFIGS[selectedFieldType].forEach(
        (configItem) => (_config[configItem] = null)
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
      setError("The title of the top of the field cannot be empty.");
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
        (configItem) => (_config[configItem] = null)
      );
      _config.type = selectedFieldType;
      setSelectedFieldTypeConfig(_config);
      setError(null);
    }
  };
  const submit = () => {
    if (form.title && form.description && form.inputs.length) {
      _createForm(form);
    } else {
      _setSnackBarMessage(
        "Please enter the form and description of the form and at least one field",
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
          by choosing<span className="u-fontWeightBold">Remove button</span>, field
          Related and all{" "}
          <span className="u-fontWeightBold">Its collected information</span> At
          The information section received completely and{" "}
          <span className="u-fontWeightBold">Irreversible</span> They will delete
          became. Are you sure of your choice?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setIsConfirmationOpen(false)}
          color="primary"
          autoFocus
        >
          Candifying
        </Button>
        <Button
          color="primary"
          onClick={removeFieldFromForm}
          style={{ color: strawberryI }}
        >
          Remove field
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
          <div className="u-fontNormal">Field selection</div>
        </DialogContentText>
        <div>
          <Select
            value={selectedFieldType}
            label="Classification of fields"
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
          <div style={{}} color="error.main" className="mr-1">
            {error}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={
            selectedFieldTypeConfig && selectedFieldTypeConfig.id
              ? editFieldConfigs
              : addFieldToForm
          }
        >
          {selectedFieldTypeConfig.id ? "Save changes" : "Creating a field"}
        </Button>
        <Button
          color="primary"
          onClick={() => toggleSelectFieldModalOpen(false)}
        >
          to close
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <div className="container">
      <Head>
        <title>Form construction</title>
      </Head>
      {renderDeleteFieldPopup()}
      {renderSelectFieldModal()}
      <AdminBreadCrumb />
      <Paper elevation={1} className="py-3 px-4 mt-3">
        <div className="u-fontLarge" style={{ color: night }}>
          Form Specifications
        </div>
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="mt-4">
              <Input
                type="text"
                size="medium"
                label="Form form"
                value={form.title}
                onChange={(value) => setForm({ ...form, title: value })}
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                size="medium"
                label="Form description"
                value={form.description}
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
        <div style={{ visibility: form.inputs.length ? "" : "hidden" }}>
          List of fields
        </div>
        <div>
          <Button
            onClick={() => toggleSelectFieldModalOpen(true)}
            style={{ direction: "ltr" }}
            color="primary"
            variant="outlined"
            endIcon={<AddRoundedIcon fontSize="small" />}
          >
            New field
          </Button>
        </div>
      </div>
      <div className="mt-3">
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
                                className="mr-2"
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
                                    toggleSelectFieldModalOpen(true);
                                    handleClose();
                                  }}
                                  className="d-flex justify-content-between align-items-center"
                                >
                                  <span
                                    style={{
                                      color:
                                        process.env
                                          .NEXT_PUBLIC_ADMIN_THEME_COLOR,
                                    }}
                                    className="ml-3"
                                  >
                                    Edit
                                  </span>
                                  <EditRoundedIcon
                                    color="primary"
                                    fontSize="small"
                                  />
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    setIsConfirmationOpen(true);
                                    handleClose();
                                  }}
                                  className="d-flex justify-content-between align-items-center"
                                >
                                  <span
                                    style={{
                                      color:
                                        process.env
                                          .NEXT_PUBLIC_ADMIN_THEME_COLOR,
                                    }}
                                    className="ml-3"
                                  >
                                    Delete
                                  </span>
                                  <DeleteIcon
                                    color="primary"
                                    fontSize="small"
                                  />
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
      </div>
      {form.inputs.length ? (
        <SaveAndDiscardButtons
          saveAction={submit}
          saveText="Store"
          disabled={loading}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeConfig: makeSelectBusinessThemeConfig(),
  themeColor: makeSelectBusinessThemeColor(),
  forms: makeSelectForms(),
});

function mapDispatchToProps(dispatch) {
  return {
    _createForm: (data) => dispatch(createForm(data)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminCreateForm);
