import Image from "next/image";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { memo } from "react";

const TopLogoMainInfoPage = () => {
  const { minWidth576: isDesktop } = useResponsive();
  return (
    <div
      style={{
        flexGrow: 1,
        position: "absolute",
        right: "50%",
        transform: "translate(50%,0%)",
      }}
    >
      <Image
        height={isDesktop ? 36 : 30}
        width={isDesktop ? 108 : 85}
        src={"/images/vitrin-logo-blue.svg"}
        alt="logo"
        priority
      />
    </div>
  );
};
export default memo(TopLogoMainInfoPage);
