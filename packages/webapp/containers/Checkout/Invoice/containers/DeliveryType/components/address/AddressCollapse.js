import React, { memo } from "react";
import { useRouter } from "next/router";

import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  DELETE_ADDRESS_MODAL,
  SELECT_ADDRESS_DROPDOWN,
} from "@saas/plugins/Shopping/constants";
import {
  coal,
  jungleI,
  jungleIII,
  pollution,
  strawberryI,
  strawberryIII,
} from "@saas/utils/colors";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";

import { Collapse } from "react-collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";

function AddressCollapse({
  UIDropDowns,
  urlPrefix,
  addresses,
  selectAddressIdByUser,
  toggleDropDown,
  sendTo,
  selectAddressIdToDelete,
  toggleModal,
}) {
  const { minWidth768 } = useResponsive();
  const theme = useTheme();
  const router = useRouter();
  const currentRout = router.asPath;

  return (
    <Collapse isOpened={UIDropDowns[SELECT_ADDRESS_DROPDOWN] && minWidth768}>
      <Divider />
      <div
        className="p-4 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
        onClick={() =>
          router.push(`${urlPrefix}/checkout/address?url=${currentRout}`)
        }
      >
        <div className="d-flex align-items-center">
          <AddRoundedIcon color="secondary" className="ml-2" />
          <div style={{ color: theme.palette.secondary.main }}>
            افزودن آدرس جدید
          </div>
        </div>
      </div>
      <Divider />
      {addresses?.map((address) => (
        <>
          <div
            className="px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
            onClick={() => {
              selectAddressIdByUser(address.id);
              toggleDropDown(
                SELECT_ADDRESS_DROPDOWN,
                !UIDropDowns[SELECT_ADDRESS_DROPDOWN]
              );
            }}
          >
            <div className="d-flex align-items-center">
              <div
                style={{
                  visibility:
                    sendTo && address.id === sendTo.id ? "visible" : "hidden",
                }}
                className="ml-2"
              >
                <CheckRoundedIcon color="secondary" />
              </div>
              <div className="ml-5">
                {address.title && (
                  <div
                    className="u-fontMedium u-fontWeightBold mb-2"
                    style={{ color: coal }}
                  >
                    {address.title}
                  </div>
                )}
                <div
                  className="u-font-semi-small text-justify"
                  style={{ color: pollution }}
                >
                  {address.full_address}
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-end">
              <div
                className="mb-1 d-flex justify-content-end"
                style={{ minWidth: 97 }}
              >
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
              <div
                className="px-2 py-1 u-font-semi-small"
                style={{
                  borderRadius: 50,
                  color: address.is_available ? jungleI : strawberryI,
                  backgroundColor: address.is_available
                    ? hexToRGBA(jungleIII, 0.2)
                    : hexToRGBA(strawberryIII, 0.2),
                  minWidth: address.is_available ? 72 : 97,
                }}
              >
                {address.is_available ? "در محدوده" : "خارج از محدوده"}
              </div>
            </div>
          </div>
          <Divider />
        </>
      ))}
    </Collapse>
  );
}

export default memo(AddressCollapse);
