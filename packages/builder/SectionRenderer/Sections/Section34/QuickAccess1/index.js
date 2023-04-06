import React, { memo, useRef } from "react";
import AdminSection from "@saas/components/AdminSection";
import Flickity from "@saas/components/Flickity";
import LazyImage from "@saas/components/LazyImage";

const flickityOptions = {
  rightToLeft: true,
  prevNextButtons: false,
  pageDots: false,
  cellAlign: "right",
  freeScroll: true,
  contain: true,
};
function QuickAccess1({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  content,
  customization = {},
}) {
  const dragging = useRef(false);
  const flkty = useRef(null);
  const {
    image: { value: image_url, alt: image_alt },
    title: {
      value: title_value,
      color: title_color,
      font_size: title_font_size,
      html_tag: title_html_tag,
      position: title_position,
    },
    squares_colors: {
      color: square_colors,
      background_color: square_background_color,
    },
    squares: { items = [] },
  } = content;
  const {
    background: {
      background_type = "color",
      background_color,
      opacity = 100,
      background_image,
    } = {},
    showcases: { photo_display = true } = {},
  } = customization;
  const headingsComp = {
    h1: (title) => (
      <h1
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} `}
      >
        {title}
      </h1>
    ),
    h2: (title) => (
      <h2
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} `}
      >
        {title}
      </h2>
    ),
    h3: (title) => (
      <h3
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} `}
      >
        {title}
      </h3>
    ),
    h4: (title) => (
      <h4
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} `}
      >
        {title}
      </h4>
    ),
    h5: (title) => (
      <h5
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} `}
      >
        {title}
      </h5>
    ),
    h6: (title) => (
      <h6
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} `}
      >
        {title}
      </h6>
    ),
    p: (title) => (
      <p
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} `}
      >
        {title}
      </p>
    ),
    div: (title) => (
      <div
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title}
      </div>
    ),
    span: (title) => (
      <span
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title}
      </span>
    ),
  };
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
        style={{
          height: "100%",
          backgroundColor:
            background_type === "color" ? background_color : "transparent",
        }}
        className="position-absolute left-0 u-top-0 w-100 d-block"
      >
        {background_image && background_type === "image" && (
          <LazyImage
            src={background_image}
            style={{ opacity: opacity / 100 }}
          />
        )}
      </div>
      <div className="container position-relative">
        <div className="my-5">
          {title_value ? headingsComp[title_html_tag](title_value) : null}
          <div className="d-flex my-4 mx-md-2">
            <Flickity
              className="carousel container px-0 "
              elementType="div"
              options={flickityOptions}
              disableImagesLoaded={false}
              dragging={dragging}
              flickityRef={flkty}
            >
              {items &&
                items.map((item) => (
                  <a
                    key={item.id}
                    href={item.link ? `#${item.link}` : null}
                    style={{
                      color: square_colors,
                      backgroundColor: square_background_color,
                      borderRadius: 8,
                      minWidth: "fit-content",
                    }}
                    className="p-4 mx-1"
                  >
                    {item.text}
                  </a>
                ))}
            </Flickity>
          </div>
          {image_url && photo_display && (
            <img
              src={image_url}
              alt={image_alt}
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: 8,
              }}
            />
          )}
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(QuickAccess1);
