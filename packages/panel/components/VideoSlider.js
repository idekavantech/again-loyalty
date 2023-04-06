import React, { useEffect, useRef, useState } from "react";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import useTheme from "@material-ui/core/styles/useTheme";
import { white } from "@saas/utils/colors";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import { useWindowSize } from "@saas/utils/hooks/useWindowSize";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Skeleton from "@material-ui/lab/Skeleton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function VideoSlider({ title, subtitle, videos }) {
  const theme = useTheme();
  const scrollRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState({
    left: false,
    right: true,
  });
  const [loadedVideos, setLoadedVideos] = useState({});
  const size = useWindowSize();
  const desktopMatches = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    setButtonDisabled({
      left:
        scrollRef.current.scrollWidth <
        -scrollRef.current.scrollLeft + scrollRef.current.clientWidth + 5,
      right: -scrollRef.current.scrollLeft < 5,
    });
  }, [size, videos]);
  return (
    <div>
      <Dialog
        open={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        className="p-0"
        PaperProps={{ className: "m-2" }}
      >
        <DialogContent className="w-100 p-0">
          <video autoPlay className="w-100 d-flex" controls>
            <source src={selectedVideo} />
            Your browser does not support the video tag.
          </video>
        </DialogContent>
      </Dialog>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div
            style={{ color: "#000000de", fontSize: desktopMatches ? 16 : 13 }}
          >
            {title}
          </div>
          <div
            className="mt-1 u-fontWeightMedium"
            style={{ color: theme.palette.text.disabled }}
          >
            {subtitle}
          </div>
        </div>
        <div className="d-md-block d-none">
          <ButtonGroup
            color="text.primary"
            className="direction-ltr"
            size="small"
          >
            <Button
              style={{ height: 36, width: 36 }}
              disabled={buttonDisabled.left}
              onClick={() => {
                if (
                  scrollRef.current.scrollWidth > scrollRef.current.clientWidth
                )
                  scrollRef.current.scrollTo({
                    left: scrollRef.current.scrollLeft - 190,
                    behavior: "smooth",
                  });
              }}
            >
              <ChevronLeftRoundedIcon />
            </Button>
            <Button
              style={{ height: 36, width: 36 }}
              disabled={buttonDisabled.right}
              onClick={() => {
                if (
                  scrollRef.current.scrollWidth > scrollRef.current.clientWidth
                )
                  scrollRef.current.scrollTo({
                    left: scrollRef.current.scrollLeft + 200,
                    behavior: "smooth",
                  });
              }}
              color="text.primary"
            >
              <ChevronRightRoundedIcon />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div
        className="d-flex mt-2 mt-md-4 overflow-auto w-100 mobileSlider"
        ref={scrollRef}
        onScroll={(e) => {
          setButtonDisabled({
            left:
              e.target.scrollWidth <
              -e.target.scrollLeft + e.target.clientWidth + 5,
            right: -e.target.scrollLeft < 5,
          });
        }}
      >
        {videos?.map((video, index) => (
          <div
            key={video.video}
            className="u-cursor-pointer mb-4 ml-4"
            onClick={() => setSelectedVideo(video.video)}
            style={{ width: 177 }}
          >
            <div
              className="d-flex align-items-center justify-content-center u-border-radius-8 overflow-hidden position-relative"
              style={{
                width: 177,
                height: 113,
              }}
            >
              {!loadedVideos[index] ? (
                <Skeleton
                  variant="rect"
                  animation="wave"
                  width="100%"
                  height="100%"
                  className="position-absolute"
                />
              ) : null}
              <video
                style={{
                  maxWidth: "unset",
                }}
                width="200"
                height="129"
                poster={video.video_placeholder}
                onLoadedData={() => {
                  setLoadedVideos({ ...loadedVideos, [index]: true });
                }}
              >
                <source
                  src={`${video.video}${
                    video.video_placeholder ? "" : "#t=10"
                  }`}
                  type="video/mp4"
                />
              </video>
              <PlayCircleFilledWhiteIcon
                fontSize="large"
                style={{
                  color: white,
                  border: "rgba(0, 0, 0, 0.1) 0px 0px 4px inset",
                }}
                className="position-absolute left-0 right-0 bottom-0 u-top-0 m-auto"
              />
            </div>
            <div
              style={{ color: theme.palette.text.disabled }}
              className="mt-2"
            >
              {video.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
