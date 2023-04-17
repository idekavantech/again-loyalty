import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import LazyImage from "@saas/components/LazyImage";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";

const SuccessMessageModal = ({
  type = "success",
  title,
  content,
  isOpen,
  onClose,
  next,
  nextTitle,
  returnToDashboard,
  returnToDashboardText,
  image,
}) => {
  const desktopMatches = useMediaQuery("(min-width:1200px)");

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        style: {
          maxWidth: desktopMatches ? 520 : 320,
          margin: 0,
          borderRadius: 8,
        },
      }}
      scroll="paper"
    >
      <DialogContent
        className="m-0 d-flex flex-column justify-content-center align-items-center"
        style={{
          overflowY: "hidden",
          backgroundColor: type == "alert" ? "#FFF5EA" : "#ECF6F1",

          padding: desktopMatches ? 20 : 16,
        }}
      >
        {title && (
          <div className="w-100 justify-content-center d-flex align-items-start align-items-md-center">
            <CloseIcon
              onClick={onClose}
              style={{ color: "#1B5E20", cursor: "pointer", fontSize: 20 }}
            />
            <span
              className="mr-3"
              style={{
                lineHeight: desktopMatches ? "32px" : "28px",
                color: type == "alert" ? "#000" : "rgba(0, 0, 0, 0.87)",
                fontWeight: 500,
                fontSize: desktopMatches ? 20 : 16,
              }}
            >
              {title}
            </span>
            <CheckCircleOutlinedIcon
              className="mr-3"
              style={{ color: "#1B5E20", fontSize: desktopMatches ? 32 : 24 }}
            />
          </div>
        )}

        {image ? (
          <LazyImage width={200} height={"auto"} className="mt-5" src={image} />
        ) : null}
        <p
          className="mt-4"
          style={{
            fontSize: 16,
            lineHeight: desktopMatches ? "32px" : "24px",
            color: "rgba(0, 0, 0, 0.87)",
          }}
        >
          {content}
        </p>
        {returnToDashboard ? (
          <div className="d-flex flex-column align-items-center mt-5">
            <Button
              className="dashboard_buttons"
              style={{
                color: "#FFF",
                backgroundColor: "#0050FF",
                width: "fit-content",
              }}
              onClick={next}
            >
              {nextTitle || "Continue changes"}
            </Button>
            <Button
              className="dashboard_buttons mt-2"
              style={{ color: "#0050FF" }}
              onClick={returnToDashboard}
            >
              {returnToDashboardText || "Back to the dashboard"}
            </Button>
          </div>
        ) : (
          <Button
            className="p-1 mt-2 ml-auto mr-auto dashboard_buttons"
            style={{ color: "#0050FF" }}
            onClick={next}
          >
            Continuation
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessMessageModal;
