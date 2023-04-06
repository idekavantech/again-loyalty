import React, { memo, useEffect, useState } from "react";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";
import SectionLink from "../../../components/SectionLink";
import Slider from "react-slick";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HAS_EXTERNAL_LINK } from "@saas/utils/constants/builderConstants";

function BannerWithSlider1({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  content = {},
  isMobile,
  business,
  customization,
}) {
  const {
    first_part_image,
    second_part_image,
    slides: { items = [] } = {},
  } = content;
  const {
    background: {
      background_type: backgroundType,
      background_image: backgroundImage,
      background_color: backgroundColor,
      opacity = 100,
    } = {},
  } = customization;
  const { maxWidth768 } = useResponsive();
  const _isMobile = typeof isMobile === "boolean" ? isMobile : maxWidth768;
  const [isClient, setIsClient] = useState(false);
  const _singleItems = [first_part_image, second_part_image];
  const _items = [...items];
  const allItems = [..._items, ..._singleItems];

  useEffect(() => {
    setIsClient(true);
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          color: "black",
          zIndex: 1010,
          right: 20,
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          zIndex: 1010,
          left: 20,
        }}
        onClick={onClick}
      />
    );
  }

  let settings = {
    infinite: true,
    fade: true,
    dots: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  if (_isMobile) {
    return (
      <AdminSection
        isEditMode={!!isEditMode}
        onClick={onClick}
        isActive={isActive}
        _updateSection={_updateSection}
        isDragging={isDragging}
        dragHandleProps={dragHandleProps}
      >
        {backgroundImage && backgroundType === "image" && (
          <div
            className="position-absolute left-0 u-top-0 h-100 w-100 d-block"
            style={{ opacity: opacity / 100 }}
          >
            <LazyImage src={backgroundImage} />
          </div>
        )}
        <div
          className="container px-0 py-5 position-relative"
          style={{
            backgroundColor: backgroundType === "color" && backgroundColor,
          }}
        >
          <div className="d-flex flex-wrap flex-row text-center py-2">
            <div style={{ maxHeight: 450 }} className="col-12">
              {isClient && (
                <Slider
                  {...settings}
                  className="digikala-section-1-slider h-100"
                >
                  {allItems.map((item) => (
                    <div key={item.id}>
                      <SectionLink
                        isExternal={item.link_type === HAS_EXTERNAL_LINK}
                        href={
                          item.link_type === HAS_EXTERNAL_LINK
                            ? item.external_link
                            : item.internal_link
                        }
                      >
                        <img
                          src={
                            item.having_banner_image_for_mobile
                              ? item.banner_image_in_mobile
                              : item.slide_image
                          }
                          alt={item.alternative || business?.revised_title}
                          className="w-100 h-100 image"
                        />
                      </SectionLink>
                    </div>
                  ))}
                </Slider>
              )}
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
      {backgroundImage && backgroundType === "image" && (
        <div
          className="position-absolute left-0 u-top-0 h-100 w-100 d-block"
          style={{ opacity: opacity / 100 }}
        >
          <LazyImage src={backgroundImage} />
        </div>
      )}
      <div
        className="container px-0 py-5 position-relative"
        style={{
          backgroundColor: backgroundType === "color" && backgroundColor,
        }}
      >
        <div className="d-flex flex-wrap flex-row text-center py-2">
          <div
            style={{ maxHeight: 450 }}
            className="col-12 col-md-8 px-2 mb-1 mb-md-0"
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
            .slick-slide {
              visibility: hidden;
            }
            .slick-slide.slick-active {
              visibility: visible;
            }
            `,
              }}
            />
            <Slider {...settings} className="digikala-section-1-slider h-100">
              {_items.map((item) => (
                <div key={item.id}>
                  <SectionLink
                    isExternal={item.link_type === HAS_EXTERNAL_LINK}
                    href={
                      item.link_type === HAS_EXTERNAL_LINK
                        ? item.external_link
                        : item.internal_link
                    }
                  >
                    <img
                      src={item.slide_image}
                      alt={item.alternative || business?.revised_title}
                      className="w-100 h-100 image"
                    />
                  </SectionLink>
                </div>
              ))}
            </Slider>
          </div>

          <div
            style={{ maxHeight: 450 }}
            className="col-12 col-md-4 d-flex flex-column justify-content-between px-2 pr-md-0"
          >
            {_singleItems.map((item) => (
              <div
                key={item.id}
                style={{ height: "49%" }}
                className="primary-item item border rounded"
              >
                <SectionLink
                  isExternal={item.link_type === HAS_EXTERNAL_LINK}
                  href={
                    item.link_type === HAS_EXTERNAL_LINK
                      ? item.external_link
                      : item.internal_link
                  }
                >
                  <img
                    className="w-100 h-100 image"
                    src={item.slide_image}
                    alt={item.alternative || business?.revised_title}
                  ></img>
                </SectionLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(BannerWithSlider1);
