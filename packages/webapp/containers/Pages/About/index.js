/* eslint-disable indent */

import React, { memo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { Collapse } from "react-collapse";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import InstagramIcon from "@material-ui/icons/Instagram";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";

import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneEnabledRoundedIcon from "@material-ui/icons/PhoneEnabledRounded";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";

import {
  makeSelectBusiness,
  makeSelectBusinessWorkingHours,
} from "@saas/stores/business/selector";
import { submitReview } from "../Feedback/actions";
import { noOp } from "@saas/utils/helpers/noOp";
import { getBusinessAvailableTime } from "@saas/utils/helpers/getBusinessAvailableTime";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { getWeekDay } from "@saas/utils/helpers/getWeekDay";

import { getWeekDays } from "@saas/utils/constants/date";

import LazyImage from "@saas/components/LazyImage";

function About({ business, workingHours }) {
  const {
    phone_zero_starts: businessPhoneNumber,
    instagram_url: instagramUrl,
    telegram_url: telegramUrl,
    linkedin_url: linkedinUrl,
    whatsapp_url: whatsappUrl,
    aparat_url: aparatUrl,
    youtube_url: youtubeUrl,
    twitter_url: twitterUrl,
    facebook_url: facebookUrl,
  } = business;
  const theme = useTheme();
  const showInstagram =
    instagramUrl && instagramUrl !== "https://www.instagram.com/";
  const showWhatsapp = whatsappUrl && whatsappUrl !== "https://wa.me/";
  const showTelegram = telegramUrl && telegramUrl !== "https://t.me/";
  const showLinkedIn =
    linkedinUrl && linkedinUrl !== "https://linkedin.com/in/";
  const showAparat = aparatUrl && aparatUrl !== "https://www.aparat.com/";
  const showYoutube = youtubeUrl && youtubeUrl !== "http://www.youtube.com/";
  const showTwitter = twitterUrl && twitterUrl !== "https://www.twitter.com/";
  const showFacebook = facebookUrl && facebookUrl !== "https://facebook.com/";
  const workingDayStart = getBusinessAvailableTime(workingHours);
  const [collapse, setCollapse] = useState(false);

  if (!workingDayStart) {
    return null;
  }
  return (
    <div>
      <div className="container px-0 pb-70">
        <div className="d-flex flex-wrap py-2">
          <div className="px-2 pt-2 col-12 col-md-6">
            <Paper className="p-4 u-border-radius-8 h-100">
              <div className="d-flex align-items-center u-fontWeightBold">
                <LocationOnIcon color={theme.palette.text.primary} />
                <span className="mr-1">آدرس</span>
              </div>
              <div
                style={{ color: theme.palette.text.disabled }}
                className=" mt-1 mr-1"
              >
                {business.address}
              </div>
            </Paper>
          </div>
          <div className="px-2 pt-2 col-12 col-md-6">
            <Paper className="p-4 u-border-radius-8 h-100">
              <div className="d-flex align-items-center u-fontWeightBold">
                <PhoneEnabledRoundedIcon color={theme.palette.text.primary} />
                <span className="mr-1">شماره تماس</span>
              </div>
              <a
                className="mt-2 mr-1 d-flex"
                href={`tel:${businessPhoneNumber}`}
              >
                {englishNumberToPersianNumber(businessPhoneNumber)}
              </a>
            </Paper>
          </div>
          <div className="px-2 pt-2 col-12 col-md-6">
            <Paper className="p-4 u-border-radius-8">
              <div className="d-flex u-fontWeightBold align-items-center">
                <ScheduleRoundedIcon color={theme.palette.text.primary} />
                <span className="mr-1">ساعت کاری</span>
              </div>
              <div>
                {workingDayStart && (
                  <div
                    onKeyDown={noOp}
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                      setCollapse(!collapse);
                    }}
                    className="u-cursor-pointer u-font-medium mt-1 d-flex align-items-center py-2"
                  >
                    {`${
                      workingDayStart.dayName
                    } از ${englishNumberToPersianNumber(
                      workingDayStart.openingTime
                    )} - ${englishNumberToPersianNumber(
                      workingDayStart.closingTime
                    )}`}
                    <KeyboardArrowDownRoundedIcon
                      fontSize="small"
                      className="mr-1 transition-important"
                      style={{
                        transform: `rotate(${collapse ? "180deg" : "0"})`,
                      }}
                    />
                  </div>
                )}
                <Collapse isOpened={collapse}>
                  {business.has_working_hours &&
                    getWeekDays.map((label) => {
                      const day = workingHours[label];
                      return (
                        <div
                          className="d-flex justify-content-between align-items-start w-100 py-1"
                          key={`day-working-hour-${label}`}
                        >
                          <div
                            className="text-right"
                            style={{ minWidth: "64px" }}
                          >
                            {getWeekDay(label)}
                          </div>
                          <div>
                            {day.length
                              ? day.map((shift) => (
                                  <div
                                    className="mb-1"
                                    key={`${shift.from}-${shift.to}`}
                                  >
                                    {englishNumberToPersianNumber(shift.from)} -{" "}
                                    {englishNumberToPersianNumber(shift.to)}
                                  </div>
                                ))
                              : "تعطیل"}
                          </div>
                        </div>
                      );
                    })}
                </Collapse>
              </div>
            </Paper>
          </div>
          <div className="px-2 pt-2 col-12 col-md-6">
            <Paper className="p-4 u-border-radius-8">
              <div className="d-flex u-fontWeightBold align-items-center">
                <LanguageIcon color={theme.palette.text.primary} />
                <span className="mr-1">شبکه‌های اجتماعی</span>
              </div>
              <div style={{ color: theme.palette.secondary.main }}>
                {showInstagram &&
                  instagramUrl &&
                  instagramUrl.split("instagram.com/")[1] && (
                    <a
                      target="blank"
                      className="d-flex align-items-center mt-2"
                      href={instagramUrl}
                    >
                      <InstagramIcon color="secondary" fontSize="small" />
                      <span className="mr-1 u-text-ellipse direction-ltr">
                        {instagramUrl.split("instagram.com/")[1]}
                      </span>
                    </a>
                  )}
                {showTelegram &&
                  telegramUrl &&
                  telegramUrl.split("t.me/")[1] && (
                    <a
                      target="blank"
                      className="d-flex align-items-center mt-2"
                      href={telegramUrl}
                    >
                      <TelegramIcon fontSize="small" color="secondary" />
                      <span className="mr-1 u-text-ellipse direction-ltr">
                        {telegramUrl.split("t.me/")[1].split("/")[0]}
                      </span>
                    </a>
                  )}
                {showLinkedIn &&
                  linkedinUrl &&
                  linkedinUrl.split("linkedin.com/in/")[1] && (
                    <a
                      target="blank"
                      className="d-flex align-items-center mt-2"
                      href={linkedinUrl}
                    >
                      <LinkedInIcon fontSize="small" color="secondary" />
                      <span className="mr-1 u-text-ellipse direction-ltr">
                        {linkedinUrl.split("linkedin.com/in/")[1].split("/")[0]}
                      </span>
                    </a>
                  )}
                {showWhatsapp &&
                  whatsappUrl &&
                  whatsappUrl.split("wa.me/")[1] && (
                    <a
                      target="blank"
                      className="d-flex align-items-center mt-2"
                      href={whatsappUrl}
                    >
                      <WhatsAppIcon fontSize="small" color="secondary" />
                      <span className="mr-1 u-text-ellipse direction-ltr">
                        {whatsappUrl.split("wa.me/")[1].split("/")[0]}
                      </span>
                    </a>
                  )}
                {showAparat &&
                  aparatUrl &&
                  aparatUrl.split("aparat.com/")[1] && (
                    <a
                      target="blank"
                      className="d-flex align-items-center mt-2"
                      href={aparatUrl}
                    >
                      <LazyImage
                        src={`/images/clickable-aparat.svg`}
                        width={20}
                        height={20}
                      />
                      <span className="mr-1 u-text-ellipse direction-ltr">
                        {aparatUrl.split("aparat.com/")[1].split("/")[0]}
                      </span>
                    </a>
                  )}
                {showYoutube &&
                  youtubeUrl &&
                  youtubeUrl.split("youtube.com/")[1] && (
                    <a
                      target="blank"
                      className="d-flex align-items-center mt-2"
                      href={youtubeUrl}
                    >
                      <YouTubeIcon fontSize="small" color="secondary" />
                      <span className="mr-1 u-text-ellipse direction-ltr">
                        {youtubeUrl.split("youtube.com/")[1].split("/")[0]}
                      </span>
                    </a>
                  )}
                {showTwitter &&
                  twitterUrl &&
                  twitterUrl.split("twitter.com/")[1] && (
                    <a
                      target="blank"
                      className="d-flex align-items-center mt-2"
                      href={twitterUrl}
                    >
                      <TwitterIcon fontSize="small" color="secondary" />
                      <span className="mr-1 u-text-ellipse direction-ltr">
                        {twitterUrl.split("twitter.com/")[1].split("/")[0]}
                      </span>
                    </a>
                  )}
                {showFacebook &&
                  facebookUrl &&
                  facebookUrl.split("facebook.com/")[1] && (
                    <a
                      target="blank"
                      className="d-flex align-items-center mt-2"
                      href={facebookUrl}
                    >
                      <FacebookIcon fontSize="small" color="secondary" />
                      <span className="mr-1 u-text-ellipse direction-ltr">
                        {facebookUrl.split("facebook.com/")[1].split("/")[0]}
                      </span>
                    </a>
                  )}
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  workingHours: makeSelectBusinessWorkingHours(),
});

function mapDispatchToProps(dispatch) {
  return {
    _submitReview: (data) => dispatch(submitReview(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(About);
