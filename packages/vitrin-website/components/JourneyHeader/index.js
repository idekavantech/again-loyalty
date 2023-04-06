import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const JourneyHeader = () => {
  const {maxWidth768} = useResponsive()
  const router = useRouter();
  return (
    <div
      style={{
        padding: "16px 0",
        borderBottom: "1px solid #E4E6E7",
      }}
    >
      <div className=" container d-flex align-items-center justify-content-center position-relative">
        <p
          className="position-absolute "
          style={{ fontSize: 14, color: "#000", cursor: "pointer", right: 24 }}
          onClick={() => router.back()}
        >
          <img src="/images/arrow-right-icon.svg" width={5.5} alt="بازگشت" />
          <span className="mr-4"> بازگشت</span>
        </p>
        <Image
          height={maxWidth768 ? 21 : 36}
          width={maxWidth768 ? 64 : 108}
          className="cursorPointer"
          src="/images/vitrin-logo-blue.svg"
          alt=""
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default JourneyHeader;
