import React, { memo, useState } from "react";
import Input from "@saas/components/Input";
import Paper from "@material-ui/core/Paper";
import { night } from "@saas/utils/colors";
import CoverPhotoImage from "./CoverPhotoSection/CoverPhotoImage";
import MainIconImage from "containers/AdminSettings/components/CoverPhotoSection/MainIconImage";
import FavIconSection from "./FavIconSection";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";


const useStyle = makeStyles(() => ({
  tooltip: {
    backgroundColor: "#0050FF",
    color: "#fff",
    maxWidth: "fit-content",
    lineHeight: "20px",
    fontSize: 11,
    borderRadius: 8,
    margin: "0 5px",
    padding: 8,
  },
  arrow: {
    color: "#0050FF",
  },
}));

function MainInfoSection({
  title,
  slogan,
  changeTitle,
  changeSlogan,
  changeUploadFile,
  removingFile,
  icon,
  setIcon,
  favIcon,
  setFavIcon,
  cover,
  setCover,
  aboutUs,
  changeAboutUs,
}) {
  const [error, setError] = useState("");
  const stringAboutUs = aboutUs.toString().replace(/(<([^>]+)>)/gi, "");
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const desktopMatches = useMediaQuery("(min-width:768px)");

  const classes = useStyle();

  return (
    <Paper elevation={1} className="d-flex mt-3 py-3 flex-wrap">
      <div className="col-12 col-lg-6 mb-3">
        <span className="anchor" id="business-logo" />
        <div className="u-fontLarge" style={{ color: night }}>
          Logo image
        </div>

        <MainIconImage
          removeFile={removingFile}
          uploadFile={changeUploadFile}
          icon={icon}
          setIcon={setIcon}
        />
        <span className="anchor" id="business-logo" />
        <div className="mt-4 u-fontLarge" style={{ color: night }}>
          Fu akon
          <ClickAwayListener onClickAway={() => setIsOpenTooltip(false)}>
            <Tooltip
              placement="left"
              PopperProps={{
                disablePortal: true,
              }}
              classes={classes}
              arrow
              title={
                <React.Fragment>
                  <div
                    className="d-flex flex-column justify-content-center"
                    style={{ width: desktopMatches ? 200 : 155, fontSize: 11 }}
                  >
                    <Image
                      alt=""
                      width={132}
                      height={desktopMatches ? 42 : 32}
                      src={`/images/tooltip-favicon.svg`}
                    />
                    <p className="mt-2">
                      Fawaikon is a symbol of the image that your website on the Internet
                      Shows to others.
                    </p>
                  </div>
                </React.Fragment>
              }
              open={isOpenTooltip}
            >
              <Button
                style={{ minWidth: 30 }}
                onClick={() => setIsOpenTooltip(!isOpenTooltip)}
              >
                <HelpOutlineRoundedIcon
                  data-tour="favIcon"
                  style={{ width: 20, height: 20, color: "#8C9196" }}
                />
              </Button>
            </Tooltip>
          </ClickAwayListener>
        </div>
        <div>
          <FavIconSection
            removeFile={removingFile}
            uploadFile={changeUploadFile}
            favIcon={favIcon}
            setFavIcon={setFavIcon}
          />
        </div>

        <span className="anchor" id="business-image" />
        <div className="mt-4 u-fontLarge" style={{ color: night }}>
          Main Business Photo
        </div>
        <CoverPhotoImage
          removeFile={removingFile}
          uploadFile={changeUploadFile}
          cover={cover}
          setCover={setCover}
        />
      </div>
      <div className="col-12 col-lg-6">
        <div className="u-fontLarge mb-3" style={{ color: night }}>
          Basic Information
        </div>
        <span className="anchor" id="business-title" />
        <div>
          <Input
            label="Business title"
            placeholder="For example Reyhun Restaurant"
            value={title}
            onChange={changeTitle}
            size="medium"
          />
          <div className="mt-4">
            <Input
              className="mt-1"
              label="Business slogan"
              value={slogan}
              onChange={changeSlogan}
              size="medium"
            />
          </div>
          <span className="anchor" id="business-description" />
          <div className="mt-4">
            <Input
              className="mt-1"
              label="about us"
              value={stringAboutUs}
              multiline
              inputProps={{ maxLength: 250 }}
              onChange={(value) => {
                changeAboutUs(value);
                if (value.length < 250) {
                  setError("");
                } else {
                  setError("Your text cannot be more than 2 characters.");
                }
              }}
            />
            <div className="u-text-red mt-2">{error}</div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(MainInfoSection);
