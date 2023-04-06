import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import { CDN_BASE_URL } from "@saas/utils/api";
import Icon from "@saas/components/Icon";
import { MOBILE, DESKTOP } from "@saas/icons";
import LazyImage from "@saas/components/LazyImage";
import { coal, smoke } from "@saas/utils/colors";

function ThemePreview({ theme, selectTheme }) {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div className=" d-flex flex-column flex-1">
      <div className="flex-1">
        {isMobile ? (
          <LazyImage
            alt="theme-mobile"
            className="w-100 theme-image"
            src={`${CDN_BASE_URL}${theme}Mobile.png`}
          />
        ) : (
          <LazyImage
            className="w-100 theme-image"
            alt="theme-desktop"
            src={`${CDN_BASE_URL}${theme}.png`}
          />
        )}
      </div>
      <div
        className="d-flex flex-row justify-content-between sticky-bottom py-2 px-3"
        style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)" }}
      >
        <button
          className="mx-1 u-cursor-pointer d-flex align-items-center"
          onClick={() => setIsMobile(false)}
        >
          <Icon icon={MOBILE} color={isMobile ? smoke : coal} />
          <span
            className="u-fontNormal mr-1"
            style={{ color: isMobile ? smoke : coal }}
          >
            موبایل
          </span>
        </button>

        <button
          className="mx-1 u-cursor-pointer d-flex align-items-center"
          onClick={() => setIsMobile(true)}
        >
          <Icon icon={DESKTOP} color={isMobile ? coal : smoke} />
          <span
            className="u-fontNormal mr-1"
            style={{ color: isMobile ? coal : smoke }}
          >
            دسکتاپ
          </span>
        </button>
        <Button
          color="primary"
          varinat="contained"
          className="col-4"
          onClick={selectTheme}
        >
          انتخاب
        </Button>
      </div>
    </div>
  );
}

export default memo(ThemePreview);
