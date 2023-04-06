import React, { memo, useState } from "react";
import LazyImage from "@saas/components/LazyImage";
import AdminSection from "@saas/components/AdminSection";
import SectionLink from "../../../components/SectionLink";
import Button from "@material-ui/core/Button";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Modal from "@saas/components/Modal";
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

function GalleryImagesType1({
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
    title: { value: title, color, font_size },
    images: { items: images = [] },
  } = content;
  const {
    setting: {
      image_size_type_1 = "square",
      mobile_columns,
      desktop_columns,
      max_items = 9,
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
  } = customization;

  const backgroundColor = background_type === "color" ? background_color : "";
  const businessAddress = business && business.get_vitrin_absolute_url;
  const { maxWidth768 } = useResponsive();
  const _isMobile = typeof isMobile === "boolean" ? isMobile : maxWidth768;
  const columns = _isMobile ? mobile_columns : desktop_columns;
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
        style={{ backgroundColor }}
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
          <div className="d-flex justify-content-center align-items-center mb-2">
            <div
              className="ml-2"
              style={{
                fontSize: font_size,
                fontWeight: 700,
                color,
                zIndex: 10,
              }}
            >
              {title}
            </div>
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
                      <div
                        style={{
                          width: `calc(${sectionImageWidth}% - 10px)`,
                          margin: "5px",
                        }}
                        className="posts-section-hover-action"
                      >
                        <SectionLink
                          href={
                            image.image_action === HAS_INTERNAL_LINK
                              ? image.internal_link
                              : image.external_link
                          }
                          isExternal={image.image_action === HAS_EXTERNAL_LINK}
                          businessAddress={businessAddress}
                        >
                          <div
                            className="w-100 h-100 position-relative"
                            style={{ borderRadius: 8, overflow: "hidden" }}
                          >
                            <LazyImage
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              src={image.url}
                              key={image.url}
                              alt={image.alternative || business.revised_title}
                              className="position-absolute top-0-left-0 "
                              wrapperClassName={`${cardRatio[image_size_type_1]} d-block`}
                            />
                          </div>
                        </SectionLink>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        style={{
                          width: `calc(${sectionImageWidth}% - 10px)`,
                          margin: "5px",
                        }}
                        className={`posts-section-hover-action 
                          ${
                            image.image_action === "has_modal" &&
                            "u-cursor-pointer"
                          }
                          `}
                      >
                        <div
                          className="w-100 h-100 position-relative"
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
                            alt={image.alternative || business.revised_title}
                            className="position-absolute top-0-left-0 "
                            wrapperClassName={`${cardRatio[image_size_type_1]} d-block`}
                          />
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

export default memo(GalleryImagesType1);
