/**
 *
 * AdminLayout
 *
 */

import React, { memo, useState } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import AdminOrdersWidget from "containers/AdminLayout/AdminOrdersWidget";
import { ADMIN_ORDER_NOTIFICATIONS_MODAL } from "@saas/stores/ui/constants";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { tiramisoo } from "@saas/utils/colors";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import IconButton from "@material-ui/core/IconButton";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeSelectUser } from "@saas/stores/user/selector";
import { useSelector } from "react-redux";
import { DOBARE_WEBAPP_CONSTANT } from "@saas/utils/constants";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";

function AdminHeader({
  url,
  openMenu,
  adminOrdersWidget,
  noItemLeft,
  businessTitle,
}) {
  const isDobare = process.env.NEXT_PUBLIC_APP_NAME === DOBARE_WEBAPP_CONSTANT;

  const { minWidth768 } = useResponsive();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector(makeSelectUser());

  const headerHeight = minWidth768 ? 64 : 48;
  const previewText = "View store";
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onPreviewClick = (link) => {
    window.open(`${url || "https://vitrin.me"}${link}?token=${user.token}`);
  };
  const theme = useTheme();
  return (
    <div
      className="w-100 d-flex u-top-0 c-header-admin"
      style={{
        height: headerHeight,
        zIndex: 1001,
        borderBottom: `1px solid ${tiramisoo}`,
        boxShadow: "0px 0px 20px rgba(204, 212, 215, 0.2)",
      }}
    >
      <div
        style={{
          color: theme.palette.primary.contrastText,
          width: minWidth768 ? 260 : 48,
          backgroundColor: theme.palette.primary.main,
        }}
        className="d-flex align-items-center"
      >
        {!minWidth768 ? (
          <IconButton
            className="d-flex align-items-center justify-content-center"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openMenu}
          >
            <MenuRoundedIcon data-tour="menu" />
          </IconButton>
        ) : (
          <span className="mr-4">{`control panel${businessTitle}`}</span>
        )}
      </div>

      <AdminOrdersWidget
        adminOrdersWidget={adminOrdersWidget}
        onClick={() => pushParamsToUrl(ADMIN_ORDER_NOTIFICATIONS_MODAL)}
      />
      {!noItemLeft && !isDobare ? (
        <div className={"d-flex align-items-center justify-content-center"}>
          <Button
            className={"h-100"}
            color="primary"
            onClick={() => onPreviewClick("/s")}
          >
            <div
              data-tour="preview"
              className="u-cursor-pointer u-fontNormal-r d-flex "
            >
              <VisibilityRoundedIcon className="ml-1" />
              {previewText}
            </div>
          </Button>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                  .preview-btn-header-menu .MuiMenu-list {
                    ${minWidth768 ? `padding: 9px 4px;` : `padding: 1px;`}
                    font-size: 15px;
                  }
                  .show-shop-btn-arrow {
                    transition: all 0.3s ease;
                    top: -1px;
                    position: relative;
                  }
                  .show-shop-btn-arrow:hover {
                    background-color: #F6F6F7;
                  }
                `,
            }}
          ></style>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={1}
            className={"preview-btn-header-menu"}
            style={{
              top: minWidth768 ? 40 : 20,
              left: -5,
            }}
            disableScrollLock
            MenuListProps={{ minWidth: 140 }}
          >
            <MenuItem onClick={() => onPreviewClick("/s")}>
              View store
            </MenuItem>
            <MenuItem onClick={() => onPreviewClick("/")}>View home</MenuItem>
          </Menu>
          <KeyboardArrowDownRoundedIcon
            onClick={handleClick}
            className="ml-3 mr-1 u-cursor-pointer show-shop-btn-arrow"
            fontSize={"medium"}
            style={{
              transform: `rotate(${Boolean(anchorEl) ? 180 : 0}deg)`,
            }}
          />
        </div>
      ) : (
        <div style={{ width: 89 }} />
      )}
    </div>
  );
}

export default memo(AdminHeader);
