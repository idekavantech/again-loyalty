/**
 *
 * Settings
 *
 */

import React, { memo, useRef, useState } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { icon, surface, text, vanilla, white } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TimerIcon from "@material-ui/icons/Timer";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
import SavingIcon from "@saas/components/Icon/SavingIcon";
import { Swiper, SwiperSlide } from "swiper/react";

import LazyImage from "@saas/components/LazyImage";
import { CDN_BASE_URL } from "@saas/utils/api";
import {
  firstSection,
  thirdSection,
  VITRIN_TYPE_OTHER,
} from "@saas/stores/business/constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import {
  makeSelectBusiness,
  makeSelectBusinessVitrinType,
} from "@saas/stores/business/selector";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import Link from "next/link";
import { makeSelectUser } from "@saas/stores/user/selector";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function AdminActivation({ vitrinType: _vitrinType, business, user }) {
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  const [playVideo, setPlayVideo] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const swiperRef = useRef();
  const vitrinType = _vitrinType || VITRIN_TYPE_OTHER;
  return (
    <>
      <Head>
        <title>Launching a showcase</title>
      </Head>
      <AdminBreadCrumb />

      <div className="container mb-5">
        <div className="d-flex mt-md-4 flex-column-reverse flex-column flex-md-row">
          <div
            style={{ paddingLeft: minWidth768 ? 100 : 0 }}
            className="col-12 align-items-center align-items-md-start col-md-5 mt-4 pr-0 d-flex flex-column"
          >
            <div
              style={{ color: theme.palette.primary.main }}
              className="mt-4 mt-md-0 u-font-weight-extra-bold u-font-30-45"
            >
              Showcase Launch Services
            </div>
            <div className="text-center-md-right mt-2 mt-md-4 u-font-weight-extra-bold u-font-30-45">
              {firstSection[vitrinType].title}
            </div>
            <div className="mt-2 mt-md-4 u-font-15-21">
              {firstSection[vitrinType].subtitle}
            </div>
            <div style={{ marginTop: minWidth768 ? 72 : 24 }}>
              <Link
                passHref
                href={`https://panel.vitrin.site/creation/step8?business_slug=${business.slug}&token=${user.token}&category=${business.vitrin_type}&start_with=initialize`}
              >
                <Button color="primary" variant="contained">
                  See the packages
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-7 mt-4 px-0">
            {playVideo ? (
              <video className="w-100" controls>
                <source src="https://hs3-cdn-saas.behtarino.com/media/richtext/setup-lq.mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                onClick={() => setPlayVideo(true)}
                className="d-flex u-cursor-pointer align-items-center justify-content-center u-border-radius-8 overflow-hidden position-relative"
              >
                <video style={{ maxWidth: "unset" }} className="w-100">
                  <source
                    src={`https://hs3-cdn-saas.behtarino.com/media/richtext/setup-lq.mp4#t=6`}
                    type="video/mp4"
                  />
                </video>
                <PlayCircleFilledWhiteIcon
                  fontSize="large"
                  style={{ color: white }}
                  className="position-absolute left-0 right-0 bottom-0 u-top-0 m-auto"
                />
              </div>
            )}
          </div>
        </div>
        <Paper
          className="d-flex flex-wrap px-5 pb-5 u-border-none"
          style={{
            marginTop: minWidth768 ? 80 : 24,
            backgroundColor: vanilla,
          }}
        >
          {[
            {
              title: "Fast",
              subtitle: "Experienced team",
              icon: <TimerIcon style={{ fontSize: 32 }} />,
            },
            {
              title: "professional",
              subtitle: "Tested and effective solutions",
              icon: <BusinessCenterOutlinedIcon style={{ fontSize: 32 }} />,
            },
            {
              title: "Efficient",
              subtitle: "Different packages for different needs",
              icon: <SavingIcon />,
            },
          ].map((item) => (
            <div
              key={item.id}
              className="px-2 mt-5 col-12 col-md-4 d-flex align-items-start"
            >
              <div
                className="d-flex align-items-center justify-content-center ml-3"
                style={{
                  width: "30%",
                  flexShrink: 0,
                  maxWidth: 76,
                  aspectRatio: "1",
                  borderRadius: 16,
                  backgroundColor: surface.hovered,
                  color: icon.subdued,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ color: text.default }} className="u-font-16-20">
                  {item.title}
                </div>
                <div
                  className="u-fontLarge-r u-fontWeightHeavy mt-4"
                  style={{ color: text.subdued }}
                >
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </Paper>

        <Swiper
          dir="rtl"
          loop={false}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            setSlideIndex(swiper.activeIndex);
          }}
          className="py-1"
          onSwiper={(ref) => (swiperRef.current = ref)}
        >
          {thirdSection[vitrinType].map((item, index) => (
            <SwiperSlide key={item.id}>
              <div
                style={{ marginTop: minWidth768 ? 72 : 24 }}
                className="d-flex flex-column flex-md-row"
              >
                <div className="col-12 d-flex col-md-5 mt-4 px-0 u-border-radius-8 overflow-hidden">
                  <div
                    className="w-100"
                    style={minWidth768 ? {} : { height: 190, maxHeight: 190 }}
                  >
                    <LazyImage src={`${CDN_BASE_URL}upsell-image.jpg`} />
                  </div>
                </div>
                <div className="col-12 col-md-7 mt-4 px-0">
                  <div
                    style={minWidth768 ? { paddingRight: 100 } : {}}
                    className="text-right h-100"
                  >
                    <div className="u-font-24-28">{`${englishNumberToPersianNumber(
                      index + 1
                    )}/${englishNumberToPersianNumber(
                      thirdSection[vitrinType].length
                    )}`}</div>
                    <div className="mt-5 u-font-42-24 u-fontWeightHeavy">
                      {item.title}
                    </div>
                    <div
                      className="mb-5"
                      style={{ marginTop: minWidth768 ? 44 : 24 }}
                    >
                      {item.subtitle}
                    </div>
                    {item.bullets.map((bullet) => (
                      <div
                        key={bullet.id}
                        style={{ color: "black" }}
                        className="d-flex align-items-center mt-2 u-fontLarge"
                      >
                        <div
                          className="u-border-radius-50-percent ml-3"
                          style={{
                            backgroundColor: "black",
                            width: 8,
                            height: 8,
                          }}
                        />
                        {bullet}
                      </div>
                    ))}
                    {minWidth768 ? (
                      <Link
                        passHref
                        href={`https://panel.vitrin.site/creation/step8?business_slug=${business.slug}&token=${user.token}&category=${business.vitrin_type}&start_with=initialize`}
                      >
                        <Button
                          style={{ marginTop: 32 }}
                          color="primary"
                          variant="contained"
                        >
                          See the packages
                        </Button>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex align-items-center justify-content-between mt-5">
            {!minWidth768 ? (
              <Link
                passHref
                href={`https://panel.vitrin.site/creation/step8?business_slug=${business.slug}&token=${user.token}&category=${business.vitrin_type}&start_with=initialize`}
              >
                <Button color="primary" variant="contained">
                  See the packages
                </Button>
              </Link>
            ) : null}
            <div className="d-flex">
              <IconButton
                onClick={() => {
                  swiperRef.current.slideTo(slideIndex + 1);
                }}
                disabled={slideIndex === thirdSection[vitrinType].length - 1}
                className="ml-2"
                size="small"
              >
                <ChevronRightRoundedIcon
                  fontSize={minWidth768 ? "large" : "default"}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  swiperRef.current.slideTo(slideIndex - 1);
                }}
                disabled={slideIndex === 0}
                size="small"
              >
                <ChevronLeftRoundedIcon
                  fontSize={minWidth768 ? "large" : "default"}
                />
              </IconButton>
            </div>
          </div>
        </Swiper>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  vitrinType: makeSelectBusinessVitrinType(),
  user: makeSelectUser(),
  business: makeSelectBusiness(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(memo, withConnect)(AdminActivation);
