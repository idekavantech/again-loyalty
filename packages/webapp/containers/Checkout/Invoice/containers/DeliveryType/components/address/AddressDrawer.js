import React, { memo } from "react";
import { useRouter } from "next/router";

import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import {
  DELETE_ADDRESS_MODAL,
  SELECT_ADDRESS_DRAWER,
} from "@saas/plugins/Shopping/constants";
import {
  coal,
  jungleI,
  jungleIII,
  night,
  pollution,
  strawberryI,
  strawberryIII,
} from "@saas/utils/colors";

import Paper from "@material-ui/core/Paper";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Drawer from "@material-ui/core/Drawer";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import useTheme from "@material-ui/core/styles/useTheme";

function AddressDrawer({
  addresses,
  selectedAddress,
  selectAddressId,
  isOpen,
  urlPrefix,
  toggleDrawer,
  selectAddressIdToDelete,
  toggleModal,
}) {
  const router = useRouter();
  const currentRout = router.asPath;
  const theme = useTheme();
  const onClose = () => {
    toggleDrawer(SELECT_ADDRESS_DRAWER, false);
  };

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      style={{ zIndex: 10000 }}
      onClose={onClose}
      classes={{ paperAnchorBottom: "drawer-border-radius" }}
    >
      <div className="bg-white">
        <div
          className="d-flex justify-content-between align-items-center mb-5 w-100"
          style={{ padding: "15px 15px 0px 15px" }}
        >
          <IconButton
            className="p-0"
            onClick={onClose}
            style={{ color: night }}
          >
            <CancelRoundedIcon />
          </IconButton>
          <span
            style={{ color: coal }}
            className="u-fontLarge  u-fontWeightBold"
          >
            انتخاب آدرس
          </span>
          <IconButton
            className="p-0"
            onClick={onClose}
            style={{ color: night, visibility: "hidden" }}
          >
            <CancelRoundedIcon />
          </IconButton>
        </div>
        <div
          className="p-4 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
          onClick={() =>
            router.push(`${urlPrefix}/checkout/address?url=${currentRout}`)
          }
          style={{ padding: "15px 15px 0px 15px" }}
        >
          <div className="d-flex align-items-center">
            <AddRoundedIcon color="secondary" className="ml-2" />
            <div style={{ color: theme.palette.secondary.main }}>
              افزودن آدرس جدید
            </div>
          </div>
        </div>
      </div>
      <Paper
        elevation={1}
        style={{
          overflowY: "auto",
          borderRadius: 0,
        }}
      >
        {addresses &&
          addresses.map((address) => (
            <>
              <div
                className="px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
                onClick={() => {
                  selectAddressId(address.id);
                  toggleDrawer(SELECT_ADDRESS_DRAWER, false);
                }}
                style={{ padding: "15px 15px 0px 15px" }}
              >
                <div className="d-flex align-items-center">
                  <div className="ml-2">
                    <CheckRoundedIcon
                      color="secondary"
                      style={{
                        visibility:
                          selectedAddress && address.id === selectedAddress.id
                            ? "visible"
                            : "hidden",
                      }}
                    />
                  </div>
                  <div className="ml-5">
                    <div
                      className="u-fontMedium u-fontWeightBold mb-3"
                      style={{ color: coal }}
                    >
                      {address.title || ""}
                    </div>
                    <div
                      className="u-font-semi-small mb-3 text-justify"
                      style={{ color: pollution }}
                    >
                      {address.full_address}
                    </div>
                    <span
                      className="px-2 py-1 u-font-semi-small"
                      style={{
                        borderRadius: 50,
                        color: address.is_available ? jungleI : strawberryI,
                        backgroundColor: address.is_available
                          ? hexToRGBA(jungleIII, 0.2)
                          : hexToRGBA(strawberryIII, 0.2),
                      }}
                    >
                      {address.is_available ? "در محدوده" : "خارج از محدوده"}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <div className="mb-1 d-flex justify-content-end">
                    <IconButton
                      style={{ width: 35, height: 35 }}
                      onClick={(event) => {
                        event.stopPropagation();
                        selectAddressIdToDelete(address.id);
                        toggleModal(DELETE_ADDRESS_MODAL, true);
                      }}
                    >
                      <DeleteRoundedIcon color="secondary" fontSize="small" />
                    </IconButton>
                    <IconButton style={{ width: 35, height: 35 }}>
                      <CreateRoundedIcon
                        color="secondary"
                        onClick={(event) => {
                          event.stopPropagation();
                          router.push(
                            `${urlPrefix}/checkout/address?address=${address.id}&url=${currentRout}`
                          );
                        }}
                        fontSize="small"
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
              <Divider />
            </>
          ))}
      </Paper>
    </Drawer>
  );
}

export default memo(AddressDrawer);
