import React, { memo, useState } from "react";
import { useRouter } from "next/router";

import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { coal, pollution, smoke } from "@saas/utils/colors";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import useTheme from "@material-ui/core/styles/useTheme";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

function CheckoutHeader({
  business,
  isBranch,
  themeColor,
  hasTrashIcon,
  headerTitle,
  orders,
  emptyOrders,
  urlPrefix,
}) {
  const { minWidth768 } = useResponsive();
  const theme = useTheme();
  const router = useRouter();
  const [isDialogOpen, openDialog] = useState(false);
  const title = isBranch
    ? business.super_business.title
    : business.revised_title;

  const isCartPage = router.asPath === `${urlPrefix}/checkout/cart`;
  return (
    <AppBar
      position="sticky"
      style={{
        boxShadow: "0px 0px 10px rgba(152, 169, 177, 0.2)",
        backgroundColor: "#ffffff",
        color: themeColor,
        position: "sticky",
        borderRadius: 0,
      }}
      elevation={2}
    >
      <Toolbar
        variant="dense"
        className="px-2 px-md-5 d-flex justify-content-between"
        style={{ height: 56 }}
      >
        {minWidth768 ? (
          <>
            <div className="d-flex align-items-center">
              <IconButton
                className="p-0"
                onClick={() =>
                  router.push(
                    `${
                      isCartPage
                        ? `${urlPrefix}/s`
                        : `${urlPrefix}/checkout/cart`
                    }`
                  )
                }
              >
                <ChevronRightRoundedIcon
                  fontSize="medium"
                  style={{ color: coal }}
                />
              </IconButton>
              <div style={{ color: pollution }} className="u-fontMedium">
                {headerTitle}
              </div>
            </div>
            <div
              className="d-flex align-items-center u-cursor-pointer"
              onClick={() =>
                router.push(`${urlPrefix}/${SHOPPING_PLUGIN_URL}/`)
              }
            >
              <img
                src={business.icon_image_url}
                style={{
                  width: 30,
                  height: 30,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
                alt={business.revised_title}
              />
              <div
                className="px-2 u-fontLarge"
                style={{ color: theme.palette.text.disabled }}
              >
                {title}
              </div>
            </div>

            <div
              className="d-flex align-items-center"
              style={{ visibility: hasTrashIcon ? "" : "hidden" }}
            >
              <IconButton
                className="p-1"
                onClick={orders?.length ? () => openDialog(true) : null}
              >
                <DeleteOutlinedIcon
                  fontSize="medium"
                  style={{ color: smoke }}
                />
              </IconButton>
              <span
                style={{ color: pollution }}
                className="u-fontMedium mr-1 u-cursor-pointer"
                onClick={orders?.length ? () => openDialog(true) : null}
              >
                حذف آیتم‌ها
              </span>
            </div>
          </>
        ) : (
          <>
            <IconButton className="p-0" onClick={() => router.back()}>
              <ChevronRightRoundedIcon
                fontSize="medium"
                style={{ color: coal }}
              />
            </IconButton>
            <div
              className="d-flex align-items-center u-cursor-pointer"
              onClick={() =>
                router.push(`${urlPrefix}/${SHOPPING_PLUGIN_URL}/`)
              }
            >
              <img
                src={business.icon_image_url}
                style={{
                  width: 30,
                  height: 30,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
                alt={business.revised_title}
              />
            </div>
            <IconButton
              className="p-1"
              onClick={orders?.length ? () => openDialog(true) : null}
              style={{ visibility: hasTrashIcon ? "" : "hidden" }}
            >
              <DeleteOutlinedIcon fontSize="medium" style={{ color: smoke }} />
            </IconButton>
          </>
        )}
      </Toolbar>
      <Dialog
        open={isDialogOpen}
        onClose={() => openDialog(false)}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا مطمئن هستید که می‌خواهید همه آیتم‌های سبد خرید خود را حذف کنید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            className="w-unset"
            onClick={() => openDialog(false)}
            autoFocus
          >
            انصراف
          </Button>

          <Button
            color="secondary"
            className="w-unset"
            size="small"
            style={{ color: themeColor }}
            onClick={() => {
              emptyOrders();
              openDialog(false);
            }}
          >
            حذف همه‌ آیتم‌ها
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default memo(CheckoutHeader);
