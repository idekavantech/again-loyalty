import Image from "next/image";
import Button from "@material-ui/core/Button";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { memo } from "react";

const AddLocationByMapBtn = ({ onClick, hasCoords }) => {
  const { maxWidth430: isMobile } = useResponsive();
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 100,
        }}
        className={"d-flex justify-content-center align-items-center"}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Image
            width={400}
            height={isMobile ? 120 : 100}
            quality={30}
            src="/images/map-bg.jpg"
            opacity="0.5"
            fit="cover"
            style={{ transform: "scale(1.7)" }}
            alt="Select Location of your business"
          />
        </div>
        <div style={{ zIndex: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClick}
            style={{
              fontSize: isMobile ? 18 : 16,
              backgroundColor: "white",
              borderRadius: "8px",
              minWidth: isMobile ? 270 : 210,
              top: -3,
            }}
          >
            {hasCoords ? "ویرایش محدوده مکانی" : "تعیین محدوده مکانی"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(AddLocationByMapBtn);
