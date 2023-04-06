import React, { useState } from "react";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import VisibilityOffRoundedIcon from "@material-ui/icons/VisibilityOffRounded";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import HomePageIcon from "@saas/icons/HomePageIcon";
import ShoppingHomePageIcon from "@saas/icons/ShoppingHomePageIcon";
import useTheme from "@material-ui/core/styles/useTheme";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { useRouter } from "next/router";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function PageRow({
  page,
  isBlog: is_blog,
  _setSnackBarMessage,
  business,
  themeConfig,
  entityPersianCopyRight,
  _updatePage,
  _deleteBusinessPage,
  _updateBusiness,
  urlPrefix,
  adminUrlPrefix,
  plugin,
  duplicatePage,
}) {
  const router = useRouter();
  const { maxWidth430: isMobile } = useResponsive();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const slug =
    page &&
    page.data &&
    (page.data.slug || page.data.seo_title || page.data.name);
  const isStatic = page && page.isStatic;
  const previewLink = isStatic
    ? page && page.data
      ? `${business.get_vitrin_absolute_url}${urlPrefix}${page.data.previewLink}`
      : ""
    : `${business.get_vitrin_absolute_url}${urlPrefix}${
        is_blog ? "/blog" : ""
      }/${page.id}${slug ? `-${slug}` : ""}`;
  const truncate = (input, length) => {
    if (input.length > length) {
      return input.substring(0, length) + "...";
    }
    return input;
  };
  const getPageName = (page) => {
    if (!page || !page?.data) return "";
    if (isMobile) return truncate(page.data.name, 14);
    return page.data.name;
  };
  const renderDeleteItemPopup = () => (
    <>
      <Dialog
        open={isConfirmationOpen.deleteDialog}
        onClose={() =>
          setIsConfirmationOpen({ ...isConfirmationOpen, deleteDialog: false })
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want this{entityPersianCopyRight} Remove
            do?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              _deleteBusinessPage(page.id, { is_blog });
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                deleteDialog: false,
              });
            }}
          >
            Delete{entityPersianCopyRight}
          </Button>
          <Button
            onClick={() =>
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                deleteDialog: false,
              })
            }
            color="primary"
            autoFocus
          >
            Candifying
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isConfirmationOpen.toggleShown}
        onClose={() =>
          setIsConfirmationOpen({ ...isConfirmationOpen, toggleShown: false })
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Is the change of display status of this{entityPersianCopyRight} are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              _updatePage({
                ...page,
                data: {
                  ...page.data,
                  is_active: Boolean(!page.data.is_active),
                },
              });
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                toggleShown: false,
              });
            }}
          >
            I'm sure
          </Button>
          <Button
            onClick={() =>
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                toggleShown: false,
              })
            }
            color="primary"
            autoFocus
          >
            Candifying
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isConfirmationOpen.setMainPageDialog}
        onClose={() =>
          setIsConfirmationOpen({
            ...isConfirmationOpen,
            setMainPageDialog: false,
          })
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure of selecting this page as a homepage?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              const editedBusiness = {
                theme_config: {
                  ...themeConfig,
                  main_page_id: page.id,
                },
              };
              _updateBusiness(
                editedBusiness,
                "The Home Page was successfully selected",
                "Changed not accepted!"
              );
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                setMainPageDialog: false,
              });
            }}
          >
            I'm sure
          </Button>
          <Button
            onClick={() =>
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                setMainPageDialog: false,
              })
            }
            color="primary"
            autoFocus
          >
            Candifying
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isConfirmationOpen.resetDefault}
        onClose={() =>
          setIsConfirmationOpen({ ...isConfirmationOpen, resetDefault: false })
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you make sure you want this{entityPersianCopyRight} To default
            Return?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              _updatePage({
                id: page.id,
                plugin: page.plugin,
                isStatic: true,
              });
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                resetDefault: false,
              });
            }}
          >
            I'm sure
          </Button>
          <Button
            onClick={() =>
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                resetDefault: false,
              })
            }
            color="primary"
            autoFocus
          >
            Candifying
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
  return (
    <TableRow hover>
      {renderDeleteItemPopup()}

      <TableCell
        align="right"
        scope="row"
        style={{
          width: "85%",
          ...(isMobile && { paddingLeft: 0, paddingRight: 7 }),
        }}
      >
        <div
          className="d-flex align-items-center u-cursor-pointer"
          style={{ width: "max-content" }}
          onClick={() =>
            router.push(
              `${adminUrlPrefix}${
                page?.data?.is_blog ? "blog/" : "appearance/pages/"
              }${page.id}${plugin ? `?plugin=${plugin}` : ""}`
            )
          }
        >
          <DescriptionRoundedIcon
            className="ml-2"
            style={{ color: "#00283C" }}
          />
          <div>{getPageName(page)}</div>
        </div>
      </TableCell>
      {Boolean(!is_blog) && (
        <TableCell align="center" style={{ padding: 0 }}>
          {!isStatic ? (
            <IconButton
              color="primary"
              style={{ direction: "ltr" }}
              onClick={() => {
                setIsConfirmationOpen({
                  ...isConfirmationOpen,
                  setMainPageDialog: page.id !== themeConfig.main_page_id,
                });
              }}
            >
              <HomePageIcon
                color={hexToRGBA(
                  theme.palette.primary.main,
                  page.id === themeConfig.main_page_id ? 1 : 0.3
                )}
              />
            </IconButton>
          ) : (
            <div style={{ width: 25 }} />
          )}
        </TableCell>
      )}
      {isStatic && (
        <TableCell align="center" style={{ padding: 0 }}>
          <div
            style={{ width: 48, height: 48 }}
            className="d-flex align-items-center justify-content-center"
          >
            <ShoppingHomePageIcon
              color={hexToRGBA(
                theme.palette.primary.main,
                page.id === "main" ? 1 : 0
              )}
            />
          </div>
        </TableCell>
      )}
      <TableCell align="center" style={{ padding: 0 }}>
        {!isStatic ? (
          <IconButton
            color="primary"
            style={{ direction: "ltr" }}
            onClick={() => {
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                toggleShown: true,
              });
            }}
          >
            {typeof page.data.is_active === "undefined" ||
            page.data.is_active ? (
              <VisibilityRoundedIcon />
            ) : (
              <VisibilityOffRoundedIcon />
            )}
          </IconButton>
        ) : (
          <IconButton
            color="primary"
            style={{ direction: "ltr" }}
            onClick={() => {
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                resetDefault: true,
              });
            }}
          >
            <ReplayIcon />
          </IconButton>
        )}
      </TableCell>
      <TableCell align="center" style={{ padding: 0 }}>
        <IconButton
          color="primary"
          onClick={() =>
            router.push(
              `${adminUrlPrefix}${
                page?.data?.is_blog ? "blog/" : "appearance/pages/"
              }${page.id}${plugin ? `?plugin=${plugin}` : ""}`
            )
          }
          style={{ direction: "ltr" }}
        >
          <div
            className="d-flex align-items-center justify-content-center u-border-radius-50-percent"
            style={{
              border: `2px solid ${process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}`,
              width: 24,
              height: 24,
            }}
          >
            <EditRoundedIcon style={{ fontSize: 14 }} />
          </div>
        </IconButton>
      </TableCell>
      <TableCell align="center" style={{ padding: 0 }}>
        <IconButton
          color="primary"
          onClick={(event) => {
            handleClick(event);
          }}
        >
          <MoreHorizRoundedIcon fontSize="small" />
        </IconButton>
      </TableCell>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
      >
        {!isStatic || (page && page.data && page.data.previewLink) ? (
          <MenuItem
            onClick={() => {
              handleClose();
              window.open(previewLink);
            }}
          >
            Preview
          </MenuItem>
        ) : null}
        {!isStatic ? (
          <MenuItem
            onClick={() => {
              handleClose();
              setIsConfirmationOpen({
                ...isConfirmationOpen,
                deleteDialog: true,
              });
            }}
          >
            Delete
          </MenuItem>
        ) : null}
        <MenuItem
          onClick={() => {
            handleClose();
            navigator.clipboard.writeText(previewLink);
            _setSnackBarMessage("The desired link was copied!", "success");
          }}
        >
          Copy of the link
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            duplicatePage(page);
          }}
        >
          {`Copy${entityPersianCopyRight}`}
        </MenuItem>
      </Menu>
    </TableRow>
  );
}
