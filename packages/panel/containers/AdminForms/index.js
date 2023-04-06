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
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import { pollution } from "@saas/utils/colors";
import { makeSelectForms } from "store/selectors";
import { deleteForm, getForms } from "store/actions";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment-jalaali";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
export function AdminForms({ urlPrefix, forms, _getForms, _deleteForm }) {
  const {minWidth768} = useResponsive()
  const theme = useTheme();
  const router = useRouter();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [numberOfForms, setNumberOfForms] = useState(null);
  const [selectedForm, selectForm] = useState(null);
  const [localForms, setLocalForms] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      _getForms();
    }, 0);
  }, []);
  useEffect(() => {
    if (forms) {
      setNumberOfForms(forms.length);
      const _forms = forms.map((_form) => {
        const createdDate = new Date(_form._created_at);
        const createdTime = moment(
          `${createdDate.getFullYear()}-${
            createdDate.getMonth() + 1
          }-${createdDate.getDate()}`,
          "YYYY-MM-DD"
        );

        return {
          ..._form,
          createdAtDate: englishNumberToPersianNumber(
            createdTime.format("jYYYY/jMM/jDD")
          ),
        };
      });
      setLocalForms(_forms);
    }
  }, [forms]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderDeleteItemPopup = () => (
    <Dialog
      open={isConfirmationOpen}
      onClose={() => setIsConfirmationOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this form?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            _deleteForm(selectedForm.id);
            setIsConfirmationOpen(false);
          }}
        >
          Remove the form
        </Button>
        <Button
          onClick={() => setIsConfirmationOpen(false)}
          color="primary"
          autoFocus
        >
          Candifying
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <div className="container">
      {renderDeleteItemPopup()}
      <Head>
        <title>Edit site forms</title>
      </Head>
      <AdminBreadCrumb />
      <Paper elevation={1} className="p-3 mt-3">
        <div
          className="px-3 d-flex justify-content-between align-items-center"
          style={{ color: theme.palette.text.tertiary, fontSize: 16 }}
        >
          <div className="d-flex align-items-center">
            <span className="ml-1">List of site forms</span>
            <span className="u-font-medium u-fontWeightBold">{`(${englishNumberToPersianNumber(
              numberOfForms
            )})`}</span>
          </div>
          <div>
            <Button
              style={{ direction: "ltr" }}
              color="primary"
              variant="contained"
              onClick={() => router.push(`${urlPrefix}forms/new`)}
              endIcon={<AddRoundedIcon fontSize="small" />}
            >
              New form
            </Button>
          </div>
        </div>
        <div className="mt-3">
          {localForms &&
            localForms.map((_form) => (
              <div
                key={_form.id}
                className="px-3 py-2 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex flex-column align-items-start">
                  <div>{_form.title}</div>
                  <div
                    className="u-font-semi-small"
                    style={{ color: pollution }}
                  >
                    {minWidth768
                      ? `made in${_form.createdAtDate}`
                      : _form.createdAtDate}
                  </div>
                </div>
                <div>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      router.push(`${urlPrefix}forms/${_form.id}/responses`)
                    }
                    style={{ direction: "ltr" }}
                  >
                    View recorded information
                  </Button>
                  <IconButton
                    color="primary"
                    className="mr-2"
                    onClick={(event) => {
                      handleClick(event);
                      selectForm(_form);
                    }}
                  >
                    <MoreHorizRoundedIcon fontSize="small" />
                  </IconButton>
                </div>
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
                      router.push(`${urlPrefix}forms/${selectedForm.id}`);
                    }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span
                      style={{
                        color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                      }}
                      className="ml-3"
                    >
                      Edit
                    </span>
                    <EditRoundedIcon color="primary" fontSize="small" />
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
                        color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                      }}
                      className="ml-3"
                    >
                      Delete
                    </span>
                    <DeleteIcon color="primary" fontSize="small" />
                  </MenuItem>
                </Menu>
              </div>
            ))}
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  forms: makeSelectForms(),
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _deleteForm: (id) => dispatch(deleteForm(id)),
    _getForms: () => dispatch(getForms()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminForms);
