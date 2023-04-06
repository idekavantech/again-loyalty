import { useRouter } from "next/router";

import { FULFILLMENT_ON_USER_SITE } from "@saas/plugins/Shopping/constants";
import { UTM_DATA_SESSION_STORAGE } from "@saas/utils/constants";

export const useSubmit = (
  isAuthenticated,
  selectedFulfillmentType,
  user,
  business,
  orders,
  urlPrefix,
  _submitOrderEndUser
) => {
  const router = useRouter();

  const submit = (selectedFulfillmentTypeNameByUserFromLocalStorage) => {
    if (isAuthenticated) {
      const selectedMethodName =
        selectedFulfillmentTypeNameByUserFromLocalStorage ||
        selectedFulfillmentType?.name;
      if (
        selectedMethodName !== FULFILLMENT_ON_USER_SITE ||
        user?.has_address
      ) {
        const utmData = localStorage.getItem(UTM_DATA_SESSION_STORAGE)
          ? JSON.parse(localStorage.getItem(UTM_DATA_SESSION_STORAGE))
          : {};
        const orderDTO = {
          business_id: business?.id,
          order_items: orders?.map((order) => ({
            product_id: order.product.id,
            variation_id: order.variation_id,
            amount: order.count,
            modifiers: order.modifiers,
          })),
          ...(utmData && { utm_data: { ...utmData } }),
          user_id: user.id,
          delivery_site_type: selectedMethodName?.toLowerCase(),
        };
        const callback = () => {
          localStorage.removeItem(
            `selectedGettingOrderMethodName-${business?.id}`
          );
          router.push(`${urlPrefix}/checkout/invoice`);
        };
        _submitOrderEndUser(orderDTO, callback);
      } else {
        localStorage.setItem(
          `selectedGettingOrderMethodName-${business?.id}`,
          selectedFulfillmentType?.name
        );
        router.push(
          `${urlPrefix}/checkout/address?url=${urlPrefix}/checkout/cart?auto_submit=true`
        );
      }
    } else {
      localStorage.setItem(
        `selectedGettingOrderMethodName-${business?.id}`,
        selectedFulfillmentType?.name
      );
      router.push(
        `${urlPrefix}/login?url=${urlPrefix}/checkout/cart?auto_submit=true`
      );
    }
  };

  return {
    submit,
  };
};
