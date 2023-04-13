import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionLink from "../../../components/SectionLink";
import Card from "./components/Card";
import AdminSection from "@saas/components/AdminSection";
import { getProducts } from "@saas/stores/business/actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectFilteredDeals } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { slugify } from "@saas/utils/helpers/slugify";

import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import { mockProducts } from "../constant";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

const calcDiffrence = (finalTime) => {
  return Math.round(Math.abs(new Date(finalTime) - new Date()) / 1000);
};
const secondsToTime = (_seconds) => {
  let hours = Math.floor(_seconds / (60 * 60));
  let divisor_for_minutes = _seconds % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);
  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  return {
    h: hours,
    m: minutes,
    s: seconds,
  };
};

function ProductsListType3({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  business,
  isDragging,
  dragHandleProps,
  _getProducts,
  deals,
  isLoading,
  urlPrefix,
  content,
  customization,
  isMobile,
}) {
  const {
    category_id: { value: categoryId },
    discount_time: { value: discountTime, has_deadline },
    intro_card: {
      intro_image: introImage,
      value: title,
      button_color: color,
      link: link,
    },
  } = content;
  const {
    background_color: { value: sectionBackgroundColor },
    slider_setting: {
      autoplay = false,
      timer = 4000,
      speed = 500,
      infinite = false,
    } = {},
  } = customization;
  const { minWidth1024, maxWidth930 } = useResponsive();

  const businessAddress = business.get_vitrin_absolute_url;
  const isTablet = isMobile === "boolean" ? isMobile : maxWidth930;
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth1024;

  const [time, setTime] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (discountTime && calcDiffrence(discountTime) > 0) {
      setSeconds(calcDiffrence(discountTime));
    }
  }, [discountTime]);
  useEffect(() => {
    if (new Date(discountTime).getTime() > new Date().getTime()) {
      const _seconds =
        seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
      const _timer =
        seconds > 0 && setTimeout(() => setTime(secondsToTime(seconds), 1000));
      return () => {
        clearInterval(_seconds);
        clearInterval(_timer);
      };
    } else if (new Date(discountTime).getTime() < new Date().getTime()) {
      return;
    }
  }, [seconds]);
  const sliderRef = useRef(null);
  useEffect(() => {
    if (categoryId) {
      setTimeout(() => {
        _getProducts({ categories: [categoryId] }, categoryId);
      }, 0);
    } else if (sliderRef.current) {
      sliderRef.current.slickGoTo(mockProducts.length - 1);
    }
  }, [categoryId, sliderRef.current]);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const handleOnItemClick = useCallback(
    (e) => {
      if (dragging) e.stopPropagation();
    },
    [dragging]
  );

  useEffect(() => {
    if (
      sliderRef.current &&
      deals &&
      deals[categoryId] &&
      deals[categoryId].length
    ) {
      sliderRef.current.slickGoTo(deals[categoryId].length - 1);
    }
  }, [deals && deals[categoryId], sliderRef.current]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          background: "#fff",
          boxShadow: "-1.5px 0 4px 0 rgb(0 0 0 / 15%)",
          borderRadius: "8px 0 0 8px",
          height: "90px",
          width: "49px",
          zIndex: "1020",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#333333",
          fontSize: 45,
        }}
        onClick={onClick}
      >
        <ChevronRightRoundedIcon fontSize="inherit" />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          background: "#fff",
          boxShadow: "1.5px 0 4px 0 rgba(0,0,0,.15)",
          borderRadius: "0 8px 8px 0",
          height: "90px",
          width: "49px",
          zIndex: "1020",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#333333",
          fontSize: 45,
        }}
        onClick={onClick}
      >
        <ChevronLeftRoundedIcon fontSize="inherit" />
      </div>
    );
  }

  let settings = {
    infinite: infinite,
    speed: speed,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplaySpeed: timer,
    autoplay: autoplay,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    rtl: true,
    initialSlide: 0,
    lazyLoading: true,
    responsive: [
      {
        breakpoint: 1085,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          initialSlide:
            deals && deals[categoryId] && deals[categoryId].length
              ? 3 - (deals[categoryId].length % 3)
              : 2,
          dots: false,
        },
      },
    ],
  };

  if (
    new Date(discountTime).getTime() < new Date().getTime() &&
    discountTime !== null &&
    !isEditMode &&
    has_deadline
  ) {
    return null;
  }
  if (isDesktop) {
    return (
      <AdminSection
        isEditMode={!!isEditMode}
        onClick={onClick}
        isActive={isActive}
        _updateSection={_updateSection}
        isDragging={isDragging}
        dragHandleProps={dragHandleProps}
      >
        <div
          className="full-container d-flex flex-column justify-content-center align-items"
          style={{
            backgroundColor: sectionBackgroundColor,
            height: `${isEditMode ? "430px" : "517px"}`,
          }}
        >
          <div className="container d-flex align-items-center">
            <div className="col-lg-2 col-md-3">
              <SectionLink
                href={link}
                isExternal={isUrlExternal(link)}
                className="h-100"
                style={{
                  display: "block",
                }}
              >
                <div
                  style={{
                    height: `${
                      isEditMode ? "390px" : isTablet ? "320px" : "436px"
                    }`,
                  }}
                  className="all-products-link w-100 h-100 d-flex flex-column align-items-start justify-content-center"
                >
                  <div className="w-100 mt-auto">
                    <img alt="" src={introImage} className="w-100 h-100" />
                  </div>

                  <div
                    className=" mt-auto d-flex justify-content-center align-items-center"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "12px",
                      color: color,
                      border: `solid 1px ${color}`,
                      padding: "9px 16px",
                      overflow: "none",
                      wordBreak: "break-word",
                      marginTop: `${isEditMode ? "0" : "auto"}`,
                    }}
                  >
                    {title.length > 15 ? title.slice(0, 14) + "..." : title}
                    <ArrowBackIosIcon
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        display: "inline",
                      }}
                    />
                  </div>
                </div>
              </SectionLink>
            </div>

            <div className="col-12 col-lg-10 col-md-9 px-0 w-100 rtl">
              <Slider
                beforeChange={handleBeforeChange}
                afterChange={handleAfterChange}
                {...settings}
                className="digikala-section-2-slider"
                style={{
                  direction: "ltr",
                }}
                ref={sliderRef}
              >
                {deals && deals[categoryId] && deals[categoryId].length
                  ? deals[categoryId]
                      .filter((item, index) => index < 10)
                      .map((item) => {
                        const { has_image } = item;
                        let {
                          main_image_thumbnail_url: mainImageThumbnailUrl,
                        } = item;
                        if (!has_image) {
                          mainImageThumbnailUrl =
                            item?.default_variation?.main_image_thumbnail_url;
                        }
                        const slug =
                          (item.seo && slugify(item.seo.slug)) ||
                          (item.title && slugify(item.title));
                        return (
                          <div
                            key={item.id}
                            className="product"
                            onClickCapture={handleOnItemClick}
                          >
                            <SectionLink
                              href={`${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${item.id}-${slug}`}
                              businessAddress={businessAddress}
                            >
                              <Card
                                isEditMode={isEditMode}
                                product
                                title={
                                  item.title.length > 50
                                    ? item.title.slice(0, 55) + "..."
                                    : item.title
                                }
                                image={mainImageThumbnailUrl}
                                price={item.default_variation.initial_price}
                                has_deadline={has_deadline}
                                discountPrice={
                                  item.default_variation.discounted_price
                                }
                                discountTime={time}
                                isDiscountEnd={
                                  new Date(discountTime).getTime() <
                                  new Date().getTime()
                                }
                              />
                            </SectionLink>
                          </div>
                        );
                      })
                  : (!isLoading || !categoryId) &&
                    mockProducts.map((item) => (
                      <div
                        key={item.id}
                        className="product"
                        onClickCapture={handleOnItemClick}
                      >
                        <SectionLink
                          href={item.link}
                          isExternal={isUrlExternal(item.link)}
                        >
                          <Card
                            isEditMode={isEditMode}
                            product
                            isMock
                            title={item.title}
                            image={item.main_image_url}
                            price={item.initial_price}
                            has_deadline={has_deadline}
                            discountPrice={item.discounted_price}
                            discountTime={time}
                            isDiscountEnd={
                              new Date(discountTime).getTime() <
                              new Date().getTime()
                            }
                          />
                        </SectionLink>
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
        </div>
      </AdminSection>
    );
  }

  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      <div
        className="full-container d-flex flex-column justify-content-center"
        style={{
          backgroundColor: sectionBackgroundColor,
          height: "100%",
        }}
      >
        <div
          className="d-flex mobileSlider"
          style={{
            overflowY: "scroll",
            padding: "20px 20px 20px 0px",
          }}
        >
          <div
            style={{
              flex: "0 0 140px",
              minWidth: "140px",
              height: "284px",
              marginLeft: "8px",
              alignSelf: "center",
            }}
          >
            <SectionLink
              href={`${link}`}
              isExternal={isUrlExternal(link)}
              className="h-100"
              style={{
                display: "block",
              }}
            >
              <div className="all-products-link w-100 h-100 d-flex flex-column align-items-start justify-content-center">
                <div className="w-100 mt-auto ">
                  <img alt="" src={introImage} className="w-100 h-100" />
                </div>

                <div
                  className=" mt-auto d-flex justify-content-center align-items-center"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "12px",
                    color: color,
                    overflow: "none",
                    wordWrap: "break-word",
                    lineHeight: "13px",
                  }}
                >
                  {title.length > 15 ? title.slice(0, 15) + "..." : title}
                  <ArrowBackIosIcon
                    style={{
                      color: color,
                      fontSize: "13px",
                      fontWeight: 500,
                      display: "inline",
                    }}
                  />
                </div>
              </div>
            </SectionLink>
          </div>

          {deals && deals[categoryId] && deals[categoryId].length
            ? deals[categoryId]
                .filter((item, index) => index < 10)
                .map((item) => {
                  const slug =
                    (item.seo && slugify(item.seo.slug)) ||
                    (item.title && slugify(item.title));
                  return (
                    <div
                      key={item.id}
                      className="mx-1 rtl"
                      style={{ flex: "0 0 205px", minWidth: "205px" }}
                    >
                      <SectionLink
                        href={`/${SHOPPING_PLUGIN_URL}/products/${item.id}-${slug}`}
                        businessAddress={businessAddress}
                      >
                        <Card
                          isEditMode={isEditMode}
                          product
                          title={
                            item.title.length > 30 && isTablet
                              ? item.title.slice(0, 30) + "..."
                              : item.title
                          }
                          image={item.main_image_url}
                          price={item.default_variation.initial_price}
                          has_deadline={has_deadline}
                          discountPrice={
                            item.default_variation.discounted_price
                          }
                          discountTime={time}
                          isDiscountEnd={
                            new Date(discountTime).getTime() <
                            new Date().getTime()
                          }
                        />
                      </SectionLink>
                    </div>
                  );
                })
            : (!isLoading || !categoryId) &&
              mockProducts.map((item) => (
                <div
                  key={item.id}
                  className="mx-1"
                  style={{ minWidth: "205px" }}
                >
                  <SectionLink href={item.link}>
                    <Card
                      isEditMode={isEditMode}
                      product
                      title={item.title}
                      image={item.main_image_url}
                      price={item.initial_price}
                      has_deadline={has_deadline}
                      discountPrice={item.discounted_price}
                      discountTime={time}
                      isDiscountEnd={
                        new Date(discountTime).getTime() < new Date().getTime()
                      }
                      isMock
                    />
                  </SectionLink>
                </div>
              ))}

          <div className="mr-1 pl-5">
            <SectionLink
              isExternal={isUrlExternal(link)}
              href={link}
              className="h-100"
              style={{
                display: "block",
                borderRadius: "8px",
              }}
            >
              <div
                className="all-products-link w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                style={{
                  minWidth: "205px",
                  height: "320px",
                  alignSelf: "flex-end",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                <div
                  style={{
                    border: "solid 1px #0fabc6",
                    borderRadius: "100%",
                    padding: "14px",
                    display: "flex",
                  }}
                >
                  <ArrowBackIcon style={{ color: "#0fabc6" }} />
                </div>

                <p
                  style={{
                    marginTop: "20px",
                    fontSize: "16px",
                    color: "#424750",
                    fontWeight: "900",
                  }}
                >
                  View everyone
                </p>
              </div>
            </SectionLink>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

const mapStateToProps = createStructuredSelector({
  deals: makeSelectFilteredDeals(),
  isLoading: makeSelectLoading(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getProducts: (data, name) => dispatch(getProducts(data, name)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProductsListType3);
