import Paper from "@material-ui/core/Paper";
import Image from "next/image";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Button from "@material-ui/core/Button";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useState } from "react";

const ChannelBox = ({ name, description, image, cta, video }) => {
  const [showVideo, setShowVideo] = useState(false);

  const onCtaClick = () => {
    window.open(cta.link, "_blank");
  };
  const { maxWidth992, maxWidth430: isMobile } = useResponsive();
  return (
    <div className={"col-12 col-lg-6 mb-3"}>
      <Paper
        elevation={1}
        style={{
          minHeight: 200,
        }}
      >
        <div
          className={"d-flex flex-col"}
          style={{ padding: !maxWidth992 ? "32px" : "16px" }}
        >
          <div
            className={`${
              !maxWidth992 ? `` : `text-center flex-col align-items-center`
            } d-flex`}
          >
            <div>
              <Image
                layout={"fixed"}
                width={80}
                height={80}
                src={image}
                alt={`کانال بازاریابی ${name}`}
              />
            </div>
            <div className={`d-flex ${!maxWidth992 ? "mr-5" : ""} flex-col`}>
              <h2 className={"mb-2"}>{name}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div
            className={`d-flex justify-content-${
              !maxWidth992 ? "end" : "center"
            } mt-5 ${isMobile ? "flex-col" : ""}`}
          >
            <Button
              className={`${isMobile ? "mb-2" : "ml-2"} `}
              color="primary"
              onClick={() => setShowVideo(true)}
              variant="outlined"
            >
              <PlayCircleFilledIcon />
              <span className="mr-2">مشاهده ویدیو</span>
            </Button>
            <Button color="primary" variant="contained" onClick={onCtaClick}>
              <span className="mr-2">{cta.text}</span>
            </Button>
          </div>
        </div>
      </Paper>
      {video && (
        <Dialog
          open={showVideo}
          onClose={() => setShowVideo(false)}
          className="p-0 w-100"
          PaperProps={{ className: "m-2" }}
          maxWidth="md"
          disableScrollLock
        >
          <DialogContent className="w-100 p-0">
            <video autoPlay className="w-100 d-flex" controls>
              <source src={video} />
              Your browser does not support the video tag.
            </video>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ChannelBox;
