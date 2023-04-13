import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { white } from "@saas/utils/colors";
import { useRouter } from "next/router";
import LazyImage from "../LazyImage";
import useTheme from "@material-ui/core/styles/useTheme";
import { isAndroid } from "@saas/utils/helpers/isAndroid";

const A2HS = ({ title, icon, isOpen, onClose, APK_URL, pwaPlugin }) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <div
      className="transition-primary"
      id="a2hs"
      style={{
        height: isOpen ? 51 : 0,
        transform: `translateY(${isOpen ? 0 : -60}px)`,
      }}
    >
      <div
        className="d-flex flex-column"
        style={{
          minHeight: "unset",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
      >
        <div className="flex-1 d-flex flex-column justify-content-center">
          <div className="d-flex flex-1 pl-3 pr-1 align-items-center my-2">
            <IconButton
              onClick={onClose}
              style={{ height: 35, width: 35 }}
              color="inherit"
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>

            <div className="ml-2 u-border-radius-4">
              <LazyImage src={icon} width={32} height={32} />
            </div>
            <div
              className="d-flex flex-column ml-2 align-items-start justify-content-center flex-1"
              style={{ maxWidth: "calc(100% - 157px)" }}
            >
              <span className="u-font-semi-small u-fontWeightBold u-text-ellipse w-100">
                {pwaPlugin?.data?.link_description || ` you${title}`}
              </span>
              <span className="u-fontVerySmall">Easier access</span>
            </div>
            <Button
              color="secondary"
              style={{ background: white }}
              className="u-cursor-pointer d-flex justify-content-center align-items-center px-4 py-1 u-border-radius-4"
              onClick={() => {
                if (APK_URL && isAndroid()) {
                  onClose();
                  localStorage.setItem(
                    "CLICKED_ON_INSTALL",
                    new Date().getTime()
                  );
                  window.location = APK_URL;
                } else {
                  router.push({
                    pathname: "/pwa/download",
                  });
                  onClose();
                  localStorage.setItem(
                    "CLICKED_ON_INSTALL",
                    new Date().getTime()
                  );
                }
              }}
            >
              Installation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(A2HS);
