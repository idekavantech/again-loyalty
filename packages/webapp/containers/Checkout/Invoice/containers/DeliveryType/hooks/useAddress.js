import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useDidMountEffect } from "@saas/utils/hooks/useDidMountEffect";
import { SHOPPING_ORDER_INVOICE_DTO } from "@saas/plugins/Shopping/constants";

export const useAddress = (
  orderInfo,
  getUserAddressesList,
  addresses,
  selectedAddressIdByUser,
  defaultAddressId,
  setUseGift,
  _getShoppingOrderInvoice
) => {
  const router = useRouter();
  const addressDetaildFieldsElementRef = useRef();
  const [sendTo, setSendTo] = useState(orderInfo?.user_address?.address_id);
  const [selectedAddressIdToDelete, selectAddressIdToDelete] = useState(null);
  useEffect(() => {
    if (orderInfo) {
      setTimeout(() => {
        getUserAddressesList(orderInfo?.id);
      }, 0);
    }
  }, [orderInfo?.id]);
  useEffect(() => {
    if (addresses) {
      const selectedAddressByUser =
        addresses.find((address) => address.id === selectedAddressIdByUser) ||
        addresses.find(
          (address) =>
            address.id === +localStorage.getItem("selctedAddressInMainPage")
        );
      if (typeof selectedAddressByUser?.full_address === "string") {
        setSendTo(selectedAddressByUser);
      } else if (typeof defaultAddressId === "number") {
        const address = addresses.find(
          (address) => address.id === defaultAddressId
        );
        setSendTo(address);
      } else {
        setSendTo(addresses[0]);
      }
    }
  }, [defaultAddressId, addresses, selectedAddressIdByUser, router.asPath]);
  useDidMountEffect(() => {
    const dto = sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO)
      ? JSON.parse(sessionStorage.getItem(SHOPPING_ORDER_INVOICE_DTO))
      : {};
    const newDTO = {
      ...dto,
      user_address: {
        address_id: sendTo.id,
      },
    };
    sessionStorage.setItem(SHOPPING_ORDER_INVOICE_DTO, JSON.stringify(newDTO));
    setUseGift(true);
    setTimeout(() => {
      _getShoppingOrderInvoice(orderInfo?.id, newDTO);
    }, 0);
  }, [sendTo?.id]);
  return {
    addressDetaildFieldsElementRef,
    sendTo,
    selectedAddressIdToDelete,
    selectAddressIdToDelete,
  };
};
