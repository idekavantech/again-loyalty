/**
 *
 * LazyImage
 *
 */
/* eslint-disable indent */

import React, { memo, useRef } from "react";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
function LazyImage({
  src,
  alt,
  className = "",
  wrapperClassName,
  scrollPosition,
  hoverEffect,
  style,
  ...props
}) {
  const wrapperRef = useRef(null);
  if (!src) {
    return null;
  }
  if (src.search(".svg") > -1) {
    return <img src={src} alt={alt} className={className} {...props} />;
  }
  return (
    <LazyLoadImage
      scrollPosition={scrollPosition}
      className={`${hoverEffect && "hover-slide__image"} ${className}`}
      width="100%"
      height="100%"
      src={src}
      effect="blur"
      alt={alt}
      style={{ objectFit: "cover", ...style }}
      delayTime={0}
      wrapperClassName={`${hoverEffect && "hover-slide"} ${wrapperClassName}`}
      wrapperProps={
        hoverEffect
          ? {
              ref: wrapperRef,
              onMouseMove: (e) => {
                const r = wrapperRef.current.getBoundingClientRect();
                // Set x and y values prop values based on center of slide element
                wrapperRef.current.style.setProperty(
                  "--x",
                  e.clientX - (r.left + Math.floor(r.width / 2))
                );
                wrapperRef.current.style.setProperty(
                  "--y",
                  e.clientY - (r.top + Math.floor(r.height / 2))
                );
              },
              onMouseLeave: () => {
                wrapperRef.current.style.setProperty("--x", 0);
                wrapperRef.current.style.setProperty("--y", 0);
              },
            }
          : {}
      }
      {...props}
    />
  );
}

LazyImage.defaultProps = {
  alt: "Showcase",
  className: "",
};

export default memo(trackWindowScroll(LazyImage));
