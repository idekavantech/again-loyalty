/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paper from "@material-ui/core/Paper";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import Modal from "@material-ui/core/Modal";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function DetailModal({ isOpen, closeModalHandler, deal, useThemeColor }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .detailModal .slick-dots li.slick-active button:before{
              color: ${useThemeColor} !important;
              transform: scale(1.7);
            }
            .detailModal .slick-next:before{
              color: ${useThemeColor} !important;
              content:'>';
            }
              .detailModal .slick-prev:before{
                color: ${useThemeColor} !important;
                content:'<'
            }
       `,
        }}
      />
      <Modal
        className="detailModal d-flex justify-content-center align-items-center"
        open={isOpen}
        onClose={closeModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper style={{ width: "80%", padding: "24px 0" }} className="px-4">
          <div style={{ width: "70%", margin: "0 auto", marginBottom: 30 }}>
            <Slider {...settings}>
              {deal?.images?.map((image, index) => (
                <img
                  style={{ maxWidth: "60%" }}
                  key={`mobile-slider-image-${index}`}
                  // className="h-100 object-fit-cover"
                  src={image.image_url}
                />
              ))}
            </Slider>
          </div>
          <div
            className="d-flex flex-column justify-content-center"
            style={{ width: 305, margin: "0 auto" }}
          >
            <p
              style={{ color: "#6D7175", fontSize: 12, fontWeight: 700 }}
              className="mb-4"
            >
              {deal.title}
            </p>
            {deal?.description ? (
              <p
                className="description mt-4"
                style={{
                  color: "#6D7175",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                dangerouslySetInnerHTML={{
                  __html: `${deal?.description}`,
                }}
              />
            ) : null}
          </div>
        </Paper>
      </Modal>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  urlPrefix: makeSelectUrlPrefix(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(DetailModal);
