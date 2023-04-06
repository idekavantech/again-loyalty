/* eslint-disable react/no-danger */
/**
 *
 * FlickitySlider
 *
 */

import React, { memo, useRef } from "react";
import CarouselItem from "./CarouselItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function FlickitySlider({
  items,
  count,
  className,
  flickityClassName,
  wrapperClassName,
  hasNav = false,
  options,
}) {
  const {minWidth768} = useResponsive()

  const slicedItems = count ? items && items.slice(0, 3) : items;
  const nav1 = useRef(null);
  const nav2 = useRef(null);
  const afterLoad = () => {};
  const afterNavLoad = () => {};
  if (!slicedItems || !slicedItems.length) {
    return null;
  }
  if (minWidth768) {
    return (
      <div className={`w-100 ${wrapperClassName}`}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .nav-item .slick-slide {
              opacity: 0.7;
              transition: all 0.3s ease-in-out;
            }
            .nav-item .slick-current {
              opacity: 1
            }
          `,
          }}
        ></style>
        <Slider
          ref={nav2}
          asNavFor={
            (slicedItems && slicedItems.length > 1 && hasNav && nav1.current) ||
            undefined
          }
          arrows={false}
          className={`w-100 carousel-nav ${flickityClassName || ""}`} // default ''
        >
          {slicedItems &&
            slicedItems.map((item) =>
              item ? (
                <CarouselItem
                  zoomable={hasNav}
                  className={className}
                  key={`carousel-item-${item.image}`}
                  image={item.image}
                  description={item.description}
                  afterLoad={afterLoad}
                />
              ) : null
            )}
        </Slider>
        {slicedItems && slicedItems.length > 1 && hasNav && (
          <div className="overflow-hidden position-relative mt-3">
            <Slider
              asNavFor={nav2.current}
              ref={nav1}
              className={`${className} nav-item ${flickityClassName}`}
              slidesToShow={3}
              swipeToSlide
              focusOnSelect
            >
              {slicedItems &&
                slicedItems.map((item) =>
                  item ? (
                    <CarouselItem
                      style={{ objectFit: "cover" }}
                      className={`p-1 ${className}`}
                      key={`carousel-item-${item.image}`}
                      image={item.image}
                      description={item.description}
                      afterLoad={afterNavLoad}
                    />
                  ) : null
                )}
              {slicedItems.length === 2 ? <div></div> : null}
            </Slider>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={`w-100 ${wrapperClassName}`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
         .slick-dots {
           bottom: -30px;
           pointer-events: none
       }
       `,
        }}
      ></style>
      <Slider
        asNavFor={nav1.current}
        ref={nav2}
        arrows={false}
        rtl
        className={`carousel-main carousel w-100 ${flickityClassName || ""}`} // default ''
        {...options}
      >
        {slicedItems &&
          slicedItems.map((item) =>
            item ? (
              <CarouselItem
                className={className}
                key={`carousel-item-${item.image}`}
                image={item.image}
                description={item.description}
                afterLoad={afterLoad}
              />
            ) : null
          )}
      </Slider>
    </div>
  );
}

export default memo(FlickitySlider);
