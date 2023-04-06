/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Link from "next/link";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import LoadingIndicator from "@saas/components/LoadingIndicator";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import PopUp from "@saas/components/PopUp";

import useTheme from "@material-ui/core/styles/useTheme";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { dust } from "@saas/utils/colors";
import FormControl from "@material-ui/core/FormControl";
import Input from "@saas/components/Input";
import DeviceCreatedModal from "containers/AdminPOS/components/DeviceCreatedModal";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import CashDrawer from "containers/AdminPOS/components/CashDrawer";
import PosUsers from "containers/AdminPOS/containers/PosUsers";
import Divider from "@material-ui/core/Divider";
import RenewLicenseDialog from "containers/AdminPOS/components/RenewLicenseDialog";
import { useAdminDevice } from "./useAdminDevice";
import { Checkbox } from "@material-ui/core";
const inputProps = {
  style: { border: "none" },
  outline: "none",
};
function AdminDevice({ _setSnackBarMessage }) {
  const theme = useTheme();
  const {
    onDeviceDelete,
    handleSalesChannelChange,
    handleDeviceNameChange,
    selectBranch,
    renewLicense,
    menuTypes,
    SHORTCUT_MENU_NAME,
    isLoading,
    availableDeliveryOptions,
    handleDefaultDeliveryType,
    defaultDeliveryTypeError,
    defaultDeliveryType,
    _getDevice,
    business,
    branches,
    _createCashDrawer,
    _closeCashDrawer,
    _finishCashDrawer,
    _createCashTransaction,
    cashDrawers,
    isQuickOrder,
    handleMenuTypeChange,
    _getCashDrawers,
    adminUrlPrefix,
    nameError,
    setNameError,
    saleChannelError,
    branchError,
    isDialogBoxOpen,
    setDialogBox,
    phoneError,
    setPhoneError,
    phone,
    setPhone,
    name,
    setName,
    modal,
    setModal,
    saleChannel,
    device,
    menuType,
    setMenuType,
    dialog,
    setDialog,
    submit,
    branch,
    deviceId,
    isCrmRequired,
    setIsCrmRequired,
  } = useAdminDevice();

  return (
    <div className="container pb-3">
      <RenewLicenseDialog
        isOpen={dialog}
        onClose={() => setDialog(false)}
        submit={renewLicense}
        isLoading={isLoading}
      />
      <AdminBreadCrumb />
      <DeviceCreatedModal
        isOpen={modal}
        onClose={() => setModal(false)}
        device={device || {}}
        _setSnackBarMessage={_setSnackBarMessage}
        branches={branches}
      />

      {device ? (
        <>
          <Paper elevation={2} className="my-4 p-4">
            <div className="col-12 px-0 mb-3">
              <div className="mb-2 u-fontLarge u-fontWeightHeavy">
                اطلاعات دستگاه
              </div>
              <div className="mb-4">
                برای ساخت یک دستگاه جدید، کافیست یک شعبه و یک نام برای آن انتخاب
                کنید. دستگاه پس از ساخته شدن، با نام انتخابی شما شناخته خواهد
                شد.
              </div>
              <Divider />
            </div>
            <div style={{ border: `1px solid ${dust}`, borderBottom: 0 }}>
              <>
                {branches?.length ? (
                  <div
                    style={{ borderBottom: `1px solid ${dust}` }}
                    className="d-flex col-12 px-0 align-items-center"
                  >
                    <div
                      style={{
                        height: 40,
                        cursor: "default",
                        backgroundColor: theme.palette.background.paper,
                      }}
                      className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                    >
                      شعبه
                    </div>
                    <FormControl
                      className="col-8 my-0 px-0"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      size="small"
                      outline="none"
                    >
                      <Select
                        disabled={deviceId}
                        style={{
                          border: "none",
                          height: 40,
                          backgroundColor: deviceId ? dust : "",
                          backgroundImage: deviceId
                            ? "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)"
                            : "",
                        }}
                        value={branch}
                        onChange={selectBranch}
                        inputProps={{
                          style: { border: "none" },
                          outline: "none",
                        }}
                        displayEmpty
                        input={<Input tableInput />}
                      >
                        <MenuItem value="" disabled>
                          شعبه انتخاب کنید
                        </MenuItem>
                        {branches.map((branch) => (
                          <MenuItem key={branch.id} value={branch.id}>
                            {branch.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                ) : null}
                <div
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className="d-flex col-12 px-0 align-items-center"
                >
                  <div
                    style={{
                      height: 40,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                  >
                    نام دستگاه
                  </div>
                  <Input
                    tableInput
                    style={{ height: 40 }}
                    className="col-8 px-2"
                    margin="dense"
                    value={device.name}
                    onChange={handleDeviceNameChange}
                  />
                </div>
                {device.licence_code ? (
                  <div
                    style={{ borderBottom: `1px solid ${dust}` }}
                    className="d-flex col-12 px-0 align-items-center"
                  >
                    <div
                      style={{
                        height: 40,
                        backgroundColor: theme.palette.background.paper,
                      }}
                      className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                    >
                      کد دستگاه
                    </div>
                    <div
                      style={{
                        height: 40,
                        cursor: "default",
                        backgroundImage:
                          "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                        backgroundColor: dust,
                      }}
                      className="d-flex flex-1 px-0 col-8 align-items-center direction-ltr justify-content-end px-3"
                    >
                      {/* <Button onClick={() => setDialog(true)} color="primary">
                        ساخت مجدد کد
                      </Button> */}
                      <div>{device.licence_code.toUpperCase()}</div>
                    </div>
                  </div>
                ) : null}
              </>
            </div>
            {nameError ? (
              <div
                style={{ color: theme.palette.error.main }}
                className="mt-2 u-font-semi-small"
              >
                {nameError}
              </div>
            ) : null}
            {branchError ? (
              <div
                style={{ color: theme.palette.error.main }}
                className="mt-2 u-font-semi-small"
                color="error.main"
              >
                {branchError}
              </div>
            ) : null}
          </Paper>
          <Paper elevation={2} className="my-4 p-4">
            <div className="col-12 px-0 mb-3">
              <div className="mb-2 u-fontLarge u-fontWeightHeavy">
                تنظیمات صفحه ی نمایش محصولات
              </div>
              <div className="mb-4">
                در این قسمت میتوانید نحوه ی چینش و نمایش محصولات خود را در صفحه
                ی انتخاب محصولات اپلیکیشن مشخص کنید.
              </div>
              <FormControl
                className="col-8 my-0 px-0"
                margin="dense"
                variant="outlined"
                fullWidth
                size="small"
                outline="none"
              >
                <Select
                  style={{
                    border: "none",
                    height: 40,
                    backgroundColor: "",
                    backgroundImage: !deviceId
                      ? "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)"
                      : "",
                  }}
                  value={menuType}
                  onChange={handleMenuTypeChange}
                  inputProps={inputProps}
                  displayEmpty
                  input={<Input tableInput />}
                >
                  {menuTypes.map((i) => (
                    <MenuItem key={i.id} value={i.value}>
                      {i.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {menuType === 2 && (
                <div className="mt-4 d-flex align-items-center">
                  <Checkbox
                    checked={isCrmRequired}
                    onChange={() => setIsCrmRequired((prev) => !prev)}
                    color="primary"
                  />{" "}
                  <p>دریافت اطلاعات کاربر اجباری باشد</p>
                </div>
              )}
              {menuType === SHORTCUT_MENU_NAME && (
                <Link href={`${adminUrlPrefix}supermenu`}>
                  رفتن به صفحه ی چینش محصولات و میانبرها
                </Link>
              )}
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <div className="mb-2 u-fontLarge u-fontWeightHeavy">
                انتخاب کانال فروش
              </div>
              <div className="mb-4">
                در این قسمت میتوانید کانال فروش پیش فرض دستگاه خود را انتخاب
                کنید (امکان تغییر این گزینه و همچنین انتخاب کانال های فروش دیگر
                نیز وجود دارد )
              </div>
              <FormControl
                className="col-8 my-0 px-0"
                margin="dense"
                variant="outlined"
                fullWidth
                size="small"
                outline="none"
              >
                {saleChannelError ? (
                  <div
                    style={{ color: theme.palette.error.main }}
                    className="mt-2 u-font-semi-small"
                  >
                    {saleChannelError}
                  </div>
                ) : null}
                <Select
                  style={{
                    border: "none",
                    height: 40,
                    backgroundColor: "",
                    backgroundImage: !deviceId
                      ? "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)"
                      : "",
                  }}
                  value={saleChannel}
                  onChange={handleSalesChannelChange}
                  inputProps={{
                    style: { border: "none" },
                    outline: "none",
                  }}
                  displayEmpty
                  input={<Input tableInput />}
                >
                  <MenuItem disabled value="">
                    لطفا انتخاب کنید
                  </MenuItem>
                  {Object.keys(business?.plugins_config?.base?.sales_channels)
                    .filter(
                      (saleChannelItem) =>
                        business?.plugins_config?.base?.sales_channels[
                          saleChannelItem
                        ]?.data?.type !== "personal_vitrin"
                    )
                    .map((i) => (
                      <MenuItem key={i.id} value={i}>
                        {
                          business?.plugins_config?.base?.sales_channels[i]
                            ?.name
                        }
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {isQuickOrder ? null : (
                <>
                  {" "}
                  <br />
                  <br />
                  <Divider />
                  <br />
                  <br />
                  <div className="mb-2 u-fontLarge u-fontWeightHeavy">
                    {" "}
                    انتخاب نحوه تحویل پیش فرض
                  </div>
                  <div className="mb-4">
                    در این قسمت میتوانید نحوه تحویل پیش فرض دستگاه خود را انتخاب
                    کنید (امکان تغییر این گزینه وجود دارد )
                  </div>
                  <FormControl
                    className="col-8 my-0 px-0"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    size="small"
                    outline="none"
                  >
                    {defaultDeliveryTypeError ? (
                      <div
                        style={{ color: theme.palette.error.main }}
                        className="mt-2 u-font-semi-small"
                      >
                        {defaultDeliveryTypeError}
                      </div>
                    ) : null}
                    <Select
                      style={{
                        border: "none",
                        height: 40,
                        backgroundColor: "",
                        backgroundImage: !deviceId
                          ? "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)"
                          : "",
                      }}
                      value={defaultDeliveryType}
                      onChange={handleDefaultDeliveryType}
                      inputProps={{
                        style: { border: "none" },
                        outline: "none",
                      }}
                      displayEmpty
                      input={<Input tableInput />}
                    >
                      <MenuItem disabled value="">
                        لطفا انتخاب کنید
                      </MenuItem>
                      {availableDeliveryOptions.map((deliveryOption) => (
                        <MenuItem
                          key={deliveryOption.value}
                          value={deliveryOption.value}
                        >
                          {deliveryOption.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
            </div>
          </Paper>
          <PosUsers
            phone={phone}
            setPhone={setPhone}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            deviceId={deviceId}
            device={device}
            name={name}
            setName={setName}
            nameError={nameError}
            setNameError={setNameError}
          />
          {deviceId ? (
            <CashDrawer
              _createCashDrawer={_createCashDrawer}
              _closeCashDrawer={_closeCashDrawer}
              _finishCashDrawer={_finishCashDrawer}
              _createCashTransaction={_createCashTransaction}
              _getDevice={_getDevice}
              loading={isLoading}
              device={device}
              cashDrawers={cashDrawers}
              getCashDrawers={_getCashDrawers}
            />
          ) : null}
          <PopUp
            open={isDialogBoxOpen}
            onClose={() => setDialogBox(false)}
            text="آیا مایل به حذف دستگاه هستید؟"
            submitText="حذف دستگاه"
            closeText="انصراف"
            onSubmit={onDeviceDelete}
          />
          <Button
            color="primary"
            variant="contained"
            style={{ flex: 2 }}
            disabled={isLoading}
            onClick={submit}
            isLoading={isLoading}
          >
            ذخیره تغییرات
          </Button>
          {deviceId && (
            <Button
              color="primary"
              style={{ flex: 1 }}
              className="mr-2"
              disabled={isLoading}
              onClick={() => setDialogBox(true)}
            >
              حذف دستگاه
            </Button>
          )}
        </>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(AdminDevice);
