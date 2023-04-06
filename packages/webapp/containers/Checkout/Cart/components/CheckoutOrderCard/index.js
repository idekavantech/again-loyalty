import React, { memo } from "react";

import { useResponsive } from "@saas/utils/hooks/useResponsive";

import DesktopCard from "./components/DesktopCard";
import MobileCard from "./components/MobileCard";

function CheckoutOrderCard({ order, increase, decrease, themeColor }) {
  const { minWidth768 } = useResponsive();

  return (
    <div className="d-flex mb-5">
      {minWidth768 ? (
        <DesktopCard
          order={order}
          increase={increase}
          decrease={decrease}
          themeColor={themeColor}
        />
      ) : (
        <MobileCard
          order={order}
          increase={increase}
          decrease={decrease}
          themeColor={themeColor}
        />
      )}
    </div>
  );
}

export default memo(CheckoutOrderCard);
