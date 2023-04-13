import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { CDN_BASE_URL } from "@saas/utils/api";
import { googleMapsNavigate } from "@saas/utils/helpers/googleMapsNavigate";
import { wazeNavigate } from "@saas/utils/helpers/wazeNavigate";

import LazyImage from "@saas/components/LazyImage";
import Modal from "@saas/components/Modal";
import dynamic from "next/dynamic";

import { makeSelectBusiness } from "@saas/stores/business/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
const wazeText = `${CDN_BASE_URL}waze_PNG23.svg`;
const waze = `${CDN_BASE_URL}wazeTextlogo.svg`;
const google = `${CDN_BASE_URL}google_PNG19644.svg`;
const googleText = `${CDN_BASE_URL}google-maps-png-google-maps-icon-1600.svg`;
const DirectionModal = ({ onClose, isOpen, business }) => {
  const {minWidth768} = useResponsive()
  const position = {
    latitude: business?.latitude,
    longitude: business?.longitude,
    singleMarker: true,
  };
  const mapOptions = {
    height: 300,
    width: "100%",
    center: position,
    markers: [position],
    themeColor: business?.theme_config.theme_color,
    dragging: minWidth768,
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      body={
        <div>
          <div className="d-flex c-modal-header  text-center u-borderBottom">
            <div
              tabIndex="0"
              onKeyDown={() => {}}
              role="button"
              className="u-relative"
              onClick={onClose}
            >
              <ArrowForwardIcon color="disabled" />
            </div>
          </div>
          <div className="c-modal-body">
            <div className="c-modal-body-sec">
              <Map options={mapOptions} />
              <div className="py-2 px-3">
                <div className="u-fontMedium u-text-dark-grey">Routing</div>
                <div className="mt-1 mb-2 d-flex">
                  <button
                    onClick={() =>
                      wazeNavigate(position.latitude, position.longitude)
                    }
                    className="c-btn c-btn-transparent-bg c-btn-routing flex-1 ml-1"
                  >
                    <LazyImage
                      src={waze}
                      width={50}
                      height={25}
                      objectFit="contain"
                      alt=""
                    />
                    <LazyImage
                      src={wazeText}
                      width={25}
                      height={25}
                      objectFit="contain"
                      alt=""
                      className="mr-1"
                    />
                  </button>
                  <button
                    onClick={() =>
                      googleMapsNavigate(position.latitude, position.longitude)
                    }
                    className="c-btn c-btn-transparent-bg flex-1 c-btn-routing"
                  >
                    <LazyImage
                      src={google}
                      width={50}
                      height={25}
                      objectFit="contain"
                      alt=""
                    />
                    <LazyImage
                      src={googleText}
                      width={25}
                      height={25}
                      objectFit="contain"
                      alt=""
                    />
                  </button>
                </div>
                <div className="u-fontMedium u-text-dark-grey">Address</div>
                <div className="u-fontMedium mt-1 mb-3">
                  {business?.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DirectionModal);
