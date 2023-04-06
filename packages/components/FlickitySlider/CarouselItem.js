/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
import React, { memo } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

import LazyImage from "../LazyImage";
import { noOp } from "@saas/utils/helpers/noOp";

const CarouselItem = ({
  image,
  className,
  style,
  onClick,
  zoomable,
  afterLoad = noOp,
  imageAlt,
}) => (
  <div
    onClick={onClick}
    className={`w-100 flex-1 d-flex carouselItem u-background-melo-grey-remove ${
      className || ""
    }`}
    style={style}
  >
    <style
      dangerouslySetInnerHTML={{
        __html: `
        .iiz__img{
          width: 100%
        }`,
      }}
    />
    {image &&
      (!zoomable ? (
        <LazyImage
          className="w-100 h-100 object-fit-cover"
          wrapperClassName="w-100 h-100 object-fit-cover"
          src={image}
          afterLoad={afterLoad}
          alt={imageAlt}
        />
      ) : (
        <InnerImageZoom
          className="w-100 h-100 object-fit-cover"
          src={image}
          fullscreenOnMobile
          zoomSrc={image}
          alt={imageAlt}
        />
      ))}
  </div>
);

export default memo(CarouselItem);
