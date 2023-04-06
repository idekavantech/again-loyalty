/**
 *
 * Modal
 *
 */

import React, { memo } from "react";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function ios() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}
function ModalBody({ children }) {
  const {maxWidth768} = useResponsive()
  return (
    <div
      className={`overflow-auto flex-1 position-relative`}
      style={{ paddingBottom: maxWidth768 && ios() ? 40 : "" }}
    >
      {children}
    </div>
  );
}

export default memo(ModalBody);
