import React, { memo, useState } from "react";
import LazyImage from "@saas/components/LazyImage";
import AdminSection from "@saas/components/AdminSection";
import SectionLink from "../../../components/SectionLink";
import Button from "@material-ui/core/Button";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Modal from "@saas/components/Modal";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";

const cardRatio = {
  square: "aspect-ratio-box aspect-ratio-box-1-1",
  rectangle: "aspect-ratio-box aspect-ratio-box-10-14",
  horizontal_rectangle: "aspect-ratio-box aspect-ratio-box-14-10",
};

function GalleryImagesType3({
  isEditMode,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  onClick,
  content,
  customization,
  isMobile,
  business,
}) {
  const {
    title: { value: title, color, font_size, use_theme_color },
    images: { items: images = [] },
  } = content;
  const theme = useTheme();

  const {
    setting: {
      mobile_columns_type_3,
      desktop_columns,
      max_items = 9,
      image_size_type_3 = "rectangle",
      align = false,
    },

    section_size: { main_width = "container" } = {},
    background: {
      background_type = "color",
      color: background_color,
      opacity = 100,
      background_image,
      mobile_background_image,
      should_upload_seperate_image_for_mobile = false,
    } = {},
    overlay,
  } = customization;

  const { overlay_color } = overlay || {};

  const backgroundColor = background_type === "color" ? background_color : "";
  const businessAddress = business && business.get_vitrin_absolute_url;
  const { maxWidth768 } = useResponsive();
  const _isMobile = typeof isMobile === "boolean" ? isMobile : maxWidth768;
  const columns = _isMobile ? mobile_columns_type_3 : desktop_columns;
  const [selectedImageIndex, selectImageIndex] = useState(null);
  const sectionImageWidth = 100 / columns;
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
        className={`p-4 position-realative ${main_width}`}
        style={{ backgroundColor, minHeight: 200 }}
      >
        {(background_image || mobile_background_image) &&
          background_type === "image" && (
            <div className="position-absolute left-0 u-top-0 h-100 w-100 d-block">
              <LazyImage
                src={
                  should_upload_seperate_image_for_mobile && _isMobile
                    ? mobile_background_image
                    : background_image
                }
                alt={business.revised_title}
                style={{ opacity: opacity / 100 }}
              />
            </div>
          )}
        {title && (
          <div
            className="d-flex justify-content-center align-items-center mb-2 z-index-10"
            style={{
              color: use_theme_color ? theme.palette.secondary.main : color,
              zIndex: 10,
            }}
          >
            <div
              style={{
                backgroundColor: use_theme_color
                  ? theme.palette.secondary.main
                  : color,
                width: 220,
                height: 1,
              }}
            ></div>
            <div
              className="ml-3 mr-3"
              style={{
                fontSize: font_size,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </div>
            <div
              style={{
                backgroundColor: use_theme_color
                  ? theme.palette.secondary.main
                  : color,
                width: 220,
                height: 1,
              }}
            ></div>
          </div>
        )}
        <div
          className={title && "mt-5"}
          style={{
            display: "flex",
            justifyContent: align ? "center" : "flex-start",
            flexWrap: "wrap",
          }}
        >
          {images && images.length
            ? images
                .filter((img, i) => i < max_items)
                .map((image, index) => {
                  if (
                    image.image_action === HAS_EXTERNAL_LINK ||
                    image.image_action === HAS_INTERNAL_LINK ||
                    typeof image.image_action === "undefined"
                  ) {
                    return (
                      <SectionLink
                        href={
                          image.image_action === HAS_INTERNAL_LINK
                            ? image.internal_link
                            : image.external_link
                        }
                        isExternal={image.image_action === HAS_EXTERNAL_LINK}
                        businessAddress={businessAddress}
                        style={{
                          width: `calc(${sectionImageWidth}% - ${
                            _isMobile ? "16px" : "30px"
                          })`,
                          margin: _isMobile ? "8px" : "15px",
                        }}
                      >
                        <div
                          className={`position-relative d-flex align-items-center justify-content-center opacity-1-on-hover`}
                        >
                          {!_isMobile && (
                            <h2
                              className="position-absolute child"
                              style={{
                                zIndex: 10,
                                fontSize: 25,
                                color: image.title_color,
                              }}
                            >
                              {image.title}
                            </h2>
                          )}
                          <div
                            className="w-100 h-100 position-relative gallery-image-section-hover-action"
                            style={{ borderRadius: 8, overflow: "hidden" }}
                          >
                            <LazyImage
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="position-absolute top-0-left-0"
                              wrapperClassName={`${cardRatio[image_size_type_3]} d-block`}
                              style={{ borderRadius: _isMobile ? 30 : 50 }}
                              src={image.url}
                              key={image.url}
                              alt={image.alternative || business.revised_title}
                            />
                            <div
                              className="position-absolute gallery-image-section-child-hover-action top-0-left-0"
                              style={{
                                backgroundColor: `${overlay_color}80`,
                                color: image.title_use_theme_color
                                  ? theme.palette.secondary.main
                                  : image.title_color,
                                fontSize: image.font_size,
                                whiteSpace: "nowrap",
                              }}
                            ></div>
                          </div>
                          {_isMobile && image.title && (
                            <div
                              className="gallery-image-section-text-on-mobile"
                              style={{
                                backgroundColor: `${overlay_color}80`,
                                color: image.title_use_theme_color
                                  ? theme.palette.secondary.main
                                  : image.title_color,
                                fontSize: image.font_size,
                                whiteSpace: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span
                                style={{
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  width: 100,
                                  display: "inline-block",
                                }}
                              >
                                {" "}
                                {image.title}
                              </span>
                            </div>
                          )}
                        </div>
                      </SectionLink>
                    );
                  } else {
                    return (
                      <div
                        className={`
                          ${
                            image.image_action === "has_modal" &&
                            "u-cursor-pointer"
                          } position-relative d-flex align-items-center justify-content-center opacity-1-on-hover
                          `}
                        style={{
                          width: `calc(${sectionImageWidth}% - ${
                            _isMobile ? "16px" : "30px"
                          })`,
                          margin: _isMobile ? "8px" : "15px",
                        }}
                      >
                        {!_isMobile && (
                          <h2
                            className="position-absolute child"
                            style={{
                              zIndex: 10,
                              fontSize: 25,
                              color: image.title_color,
                            }}
                          >
                            {image.title}
                          </h2>
                        )}
                        <div
                          className="w-100 h-180 position-relative gallery-image-section-hover-action"
                          style={{ borderRadius: 8, overflow: "hidden" }}
                        >
                          <LazyImage
                            onClick={(e) => {
                              e.stopPropagation();
                              image.image_action === "has_modal" &&
                                selectImageIndex(index);
                            }}
                            src={image.url}
                            key={image.url}
                            style={{ borderRadius: _isMobile ? 30 : 50 }}
                            className="position-absolute top-0-left-0 "
                            wrapperClassName={`${cardRatio[image_size_type_3]} d-block`}
                            alt={image.alternative || business.revised_title}
                          />
                          <div
                            className="position-absolute gallery-image-section-child-hover-action top-0-left-0"
                            style={{
                              backgroundColor: `${overlay_color}80`,
                              color: image.title_use_theme_color
                                ? theme.palette.secondary.main
                                : image.title_color,
                              fontSize: image.font_size,
                              whiteSpace: "nowrap",
                            }}
                          ></div>
                          {_isMobile && image.title && (
                            <div
                              className="gallery-image-section-text-on-mobile"
                              style={{
                                backgroundColor: `${overlay_color}80`,
                                color: image.title_use_theme_color
                                  ? theme.palette.secondary.main
                                  : image.title_color,
                                fontSize: image.font_size,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span
                                style={{
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  width: 100,
                                  display: "inline-block",
                                }}
                              >
                                {" "}
                                {image.title}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                })
            : null}
        </div>
        {selectedImageIndex !== null && (
          <Modal
            onClose={() => selectImageIndex(null)}
            isOpen={selectImageIndex !== null}
            isBig
            header={
              <ModalHeader
                onRightClick={() => selectImageIndex(null)}
                title="عکس"
              />
            }
            body={
              <div
                style={{ minHeight: "100%" }}
                className="d-flex justify-content-center align-items-center p-3"
              >
                <img
                  alt=""
                  src={images[selectedImageIndex]?.url}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            }
            cta={
              <div className="d-flex justify-content-end w-100">
                <Button
                  onClick={() => selectImageIndex(null)}
                  variant="contained"
                  className={_isMobile ? "w-100" : "px-5"}
                  color="secondary"
                >
                  بستن
                </Button>
              </div>
            }
          />
        )}
      </div>
    </AdminSection>
  );
}


export default memo(GalleryImagesType3);
