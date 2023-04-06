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
import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
  makeSelectNavigationMenus,
} from "@saas/stores/business/selector";
import { updateBusiness } from "@saas/stores/business/actions";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  defaultNavigationMenus,
  MAIN_FOOTER_NAVIGATION_MENU,
  MAIN_HEADER_NAVIGATION_MENU,
  TOP_PAGE_HEADER_MENU,
} from "./constants";
import {
  makeSelectAdminUrlPrefix,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";

export function AdminNavigationMenus({
  loading,
  themeConfig,
  _updateBusiness,
  navigationMenus,
  adminUrlPrefix,
  urlPrefix,
}) {
  const theme = useTheme();
  const router = useRouter();
  const [menus, setMenus] = useState({});
  const [_key, _setKey] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const addNewMenuItem = () => {
    const _menus = { ...menus };
    const id = uniqueid();
    _menus[id] = {
      id,
      name: "New menu",
      links: [],
    };
    setMenus(_menus);
  };
  const deleteMenu = () => {
    const _menus = { ...menus };
    delete _menus[_key];
    setMenus(_menus);
    setIsConfirmationOpen(false);
  };
  const renderDeleteItemPopup = (
    <Dialog
      open={isConfirmationOpen}
      onClose={() => setIsConfirmationOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item menu?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteMenu} color="primary">
          Remove the item menu
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
  const submit = () => {
    const editedBusiness = {
      theme_config: {
        ...themeConfig,
        navigation_menus: menus,
      },
    };
    _updateBusiness(
      editedBusiness,
      "Menus were successfully stored.",
      "Save menus changes were unsuccessful!"
    );
  };
  useEffect(() => {
    const _navigationMenus = Object.keys(navigationMenus).length
      ? { ...navigationMenus }
      : { ...defaultNavigationMenus(urlPrefix) };
    setMenus(_navigationMenus);
  }, [navigationMenus]);
  return (
    <div className="container">
      {renderDeleteItemPopup}
      <Head>
        <title>Edit site menus</title>
      </Head>
      <AdminBreadCrumb helpVideo={{ url: ADMIN_HELP_VIDEOS.menus.url }} />
      <Paper elevation={1} className="p-3 mt-3">
        <div
          className="px-3 d-flex justify-content-between align-items-center"
          style={{ color: theme.palette.text.tertiary, fontSize: 16 }}
        >
          <div>List of site menus</div>
          <div>
            <Button
              style={{ direction: "ltr" }}
              color="primary"
              variant="contained"
              onClick={addNewMenuItem}
              endIcon={<AddRoundedIcon fontSize="small" />}
            >
              The new menu
            </Button>
          </div>
        </div>
        <div className="mt-3">
          {Object.keys(menus).map((item) => (
            <div
              key={item.id}
              className="px-3 py-2 d-flex justify-content-between align-items-center"
            >
              <div>{menus[item].name}</div>
              <div>
                <Button
                  color="primary"
                  onClick={() =>
                    router.push(`${adminUrlPrefix}appearance/menu/${item}`)
                  }
                  style={{ direction: "ltr" }}
                  endIcon={
                    <div
                      className="d-flex align-items-center justify-content-center u-border-radius-50-percent"
                      style={{
                        border: `2px solid ${process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}`,
                        width: 24,
                        height: 24,
                      }}
                    >
                      <EditRoundedIcon style={{ fontSize: 14 }} />
                    </div>
                  }
                >
                  Edit
                </Button>
                {item !== MAIN_HEADER_NAVIGATION_MENU &&
                item !== MAIN_FOOTER_NAVIGATION_MENU &&
                item !== TOP_PAGE_HEADER_MENU ? (
                  <IconButton
                    color="primary"
                    onClick={() => {
                      _setKey(item);
                      setIsConfirmationOpen(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Paper>
      <SaveAndDiscardButtons
        saveAction={submit}
        saveText="Save menus"
        disabled={loading}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeConfig: makeSelectBusinessThemeConfig(),
  themeColor: makeSelectBusinessThemeColor(),
  navigationMenus: makeSelectNavigationMenus(),
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminNavigationMenus);
