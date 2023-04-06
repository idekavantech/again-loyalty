import React from "react";
import OrderBasket from "@saas/icons/orderBasket";
import MenuIcon from "@material-ui/icons/Menu";
import { white } from "@saas/utils/colors";
import Badge from "@material-ui/core/Badge";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { useRouter } from "next/router";
import { MENU_DRAWER } from "@saas/stores/ui/constants";

export default function OnlineMenuHeader({ orderAmount, isMobile, urlPrefix }) {
  const router = useRouter();
  return (
    <div
      className={`online-menu__header pb-4 d-flex align-items-center ${
        isMobile ? "w-100 justify-content-between " : "justify-content-end"
      }`}
    >
      <div
        className="online-menu__header-icon d-flex align-items-center justify-content-center"
        style={{
          marginLeft: isMobile ? null : 16,
        }}
        onClick={() => {
          router.push(`${urlPrefix}/checkout/cart`);
        }}
      >
        <Badge
          style={{
            fontWeight: 700,
            color: white,
          }}
          badgeContent={englishNumberToPersianNumber(orderAmount)}
          className="online-menu__header-icon__badge"
        >
          <OrderBasket />
        </Badge>
      </div>

      <div
        onClick={() => pushParamsToUrl(MENU_DRAWER)}
        className="online-menu__header-icon d-flex align-items-center justify-content-center"
      >
        <MenuIcon style={{ color: "#5C5F62" }} />
      </div>
    </div>
  );
}
