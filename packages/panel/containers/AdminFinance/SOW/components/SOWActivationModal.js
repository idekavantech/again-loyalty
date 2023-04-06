import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import {
  cement,
  jungleI,
  night,
  pollution,
  strawberryI,
} from "@saas/utils/colors";
import Divider from "@material-ui/core/Divider";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import NotificationImportantRoundedIcon from "@material-ui/icons/NotificationImportantRounded";
import { Collapse } from "react-collapse";
import Paper from "@material-ui/core/Paper";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { ACTIVATION_TEXT, DE_ACTIVATION_TEXT } from "./constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
function SOWActivationModal({ isOpen, onClose, hasSOW }) {
  const {minWidth768} = useResponsive()
  const [isCollapseOpen, SetCollapseOpen] = useState({
    activationCollapse: !hasSOW,
    deActivationCollapse: hasSOW,
  });
  const handleCollapse = (e) => {
    SetCollapseOpen({ ...isCollapseOpen, [e]: !isCollapseOpen[e] });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ className: "w-100 pb-2" }}
      maxWidth="md"
    >
      <DialogContent>
        <div className="d-flex align-items-center">
          <IconButton
            className="p-0 ml-2"
            onClick={onClose}
            style={{ color: night, marginRight: -5 }}
          >
            <CloseRoundedIcon style={{ color: night }} />
          </IconButton>
          <div style={{ lineHeight: "initial" }} className="u-fontWeightBold">
            توضیحات فعال و غیرفعال‌سازی کیف پول مشترک
          </div>
        </div>
        <Divider style={{ backgroundColor: cement }} className="my-4" />
        {minWidth768 ? (
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column flex-1">
              <div className="d-flex align-items-center">
                <CheckCircleRoundedIcon
                  style={{ color: jungleI }}
                  className="ml-2"
                  fontSize="small"
                />
                <div style={{ lineHeight: "initial" }}>فعال‌سازی:</div>
              </div>
              <div className="u-fontMedium mt-3 text-justify">
                {ACTIVATION_TEXT}
              </div>
            </div>
            <Divider
              style={{ backgroundColor: cement }}
              flexItem={true}
              className="mx-5"
              orientation="vertical"
            />
            <div className="d-flex flex-column flex-1">
              <div className="d-flex align-items-center">
                <CancelOutlinedIcon
                  style={{ color: strawberryI }}
                  className="ml-2"
                  fontSize="small"
                />
                <div style={{ lineHeight: "initial" }}>غیرفعال‌سازی:</div>
              </div>
              <div className="u-fontMedium mt-3 text-justify">
                {DE_ACTIVATION_TEXT}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Paper
              elevation={2}
              className="d-flex flex-wrap my-3 p-3"
              onClick={() => handleCollapse("activationCollapse")}
            >
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <CheckCircleRoundedIcon
                    style={{ color: jungleI }}
                    className="ml-2"
                    fontSize="small"
                  />
                  <div style={{ lineHeight: "initial" }}>فعال‌سازی</div>
                </div>

                {isCollapseOpen.activationCollapse ? (
                  <ExpandLessRoundedIcon color="primary" />
                ) : (
                  <ExpandMoreRoundedIcon color="primary" />
                )}
              </div>
              <Collapse isOpened={isCollapseOpen.activationCollapse}>
                <div className="u-fontMedium mt-3 text-justify">
                  {ACTIVATION_TEXT}
                </div>
              </Collapse>
            </Paper>
            <Paper
              elevation={2}
              className="d-flex flex-wrap my-3 p-3"
              onClick={() => handleCollapse("deActivationCollapse")}
            >
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <CancelOutlinedIcon
                    style={{ color: strawberryI }}
                    className="ml-2"
                    fontSize="small"
                  />
                  <div style={{ lineHeight: "initial" }}>غیرفعال‌سازی</div>
                </div>

                {isCollapseOpen.deActivationCollapse ? (
                  <ExpandLessRoundedIcon color="primary" />
                ) : (
                  <ExpandMoreRoundedIcon color="primary" />
                )}
              </div>
              <Collapse isOpened={isCollapseOpen.deActivationCollapse}>
                <div className="u-fontMedium mt-3 text-justify">
                  {DE_ACTIVATION_TEXT}
                </div>
              </Collapse>
            </Paper>
          </>
        )}
        <div className="d-flex flex-wrap align-items-center justify-content-between mt-5">
          <div className="d-flex align-items-center mb-5 mb-lg-0">
            <NotificationImportantRoundedIcon
              fontSize="small"
              style={{ color: pollution }}
              className="ml-2"
            />
            <div
              className="u-fontMedium text-justify "
              style={{ lineHeight: "initial" }}
            >
              برای توضیحات تکمیلی و فعال‌سازی و یا غیرفعال‌سازی کیف پول مشترک
              می‌توانید با پشتیبانی ویترین تماس حاصل فرمایید.
            </div>
          </div>
          <Button
            style={{ marginInlineStart: "auto" }}
            variant="contained"
            color="primary"
            className="u-box-shadow-none u-fontMedium"
            size="large"
            href="tel:+982191070751"
          >
            تماس با پشتیبانی
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(SOWActivationModal);
