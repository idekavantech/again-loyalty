/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { memo, useRef, useState, useMemo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Modal from "@saas/components/Modal";
import Icon from "@saas/components/Icon";
import { ARROW, CHEVRON, LOCATION } from "@saas/icons";
import { noOp } from "@saas/utils/helpers/noOp";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";

import { getDistance } from "@saas/utils/helpers/getDistance";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
import { setBranch } from "@saas/stores/business/actions";
import LocationAccessPopup from "@saas/components/LocationAccessPopup";
import { pollution } from "@saas/utils/colors";
import { useRouter } from "next/router";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function BranchSelectionModal({ isOpen, onClose, themeColor, business }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const branches = useMemo(() => {
    return business?.branches?.length
      ? business.branches
      : business.super_business && Object.keys(business.super_business).length
      ? business.super_business.branches
      : [];
  }, [business?.branches]);

  const getPosition = () => {
    // Simple wrapper
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, options);
    }).catch();
  };
  const accessLocation = async () => {
    const pos = await getPosition();
    if (pos) {
      const crd = pos.coords;
      const latitude = +crd.latitude.toFixed(7);
      const longitude = +crd.longitude.toFixed(7);
      return { latitude, longitude };
    }
    return null;
  };
  const getAccess = async () => {
    setDialogOpen(false);
    const location = await accessLocation();
    if (location) {
      let minDistance = getDistance(
        location.latitude,
        location.longitude,
        branches[0].latitude,
        branches[0].longitude
      );
      let minBranchIndex = 0;
      branches.map((branch, i) => {
        const d = getDistance(
          location.latitude,
          location.longitude,
          branch.latitude,
          location.longitude
        );
        if (d < minDistance) {
          minDistance = d;
          minBranchIndex = i;
        }
        return false;
      });
      router.push(`/branches/${branches[minBranchIndex].site_domain}`);
    }
  };
  const {minWidth768} = useResponsive()

  const mapRef = useRef(null);
  const mapOptions = useMemo(() => {
    return {
      height: "230px",
      width: "100%",
      markers: branches.map((branch) => ({
        latitude: +branch.latitude,
        longitude: +branch.longitude,
      })),
      fitBounds: [
        [
          branches.reduce(
            (min, branch) =>
              Math.min(min, parseFloat(branch.latitude) || 35.70194),
            Number.MAX_VALUE
          ),
          branches.reduce(
            (min, branch) =>
              Math.min(min, parseFloat(branch.longitude) || 51.389976),
            Number.MAX_VALUE
          ),
        ],
        [
          branches.reduce(
            (max, branch) =>
              Math.max(max, parseFloat(branch.latitude) || 35.70194),
            0
          ),
          branches.reduce(
            (max, branch) =>
              Math.max(max, parseFloat(branch.longitude) || 51.389976),
            0
          ),
        ],
      ],
      ref: mapRef,
      themeColor,
      touchZoom: true,
      dragging: minWidth768,
    };
  }, [JSON.stringify(branches)]);
  const onChangeBrachHandler = (site_domain) => {
    router.push(`/branches/${site_domain}/${SHOPPING_PLUGIN_URL}`);
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      body={
        <div>
          <div className="d-flex  text-center u-borderBottom py-2">
            <div
              role="button"
              onKeyDown={noOp}
              tabIndex="0"
              className="flex-1 u-relative text-right pr-2"
              onClick={onClose}
            >
              <Icon width={25} height={25} icon={ARROW} color={pollution} />
            </div>
            <div className="flex-1">Choosing a branch</div>
            <div className="flex-1" />
          </div>
          <div className="c-modal-body ">
            <Map options={mapOptions} />
            <div className="px-3">
              <div className="u-text-black u-fontWeightBold mt-2 text-center">
                Choose your desired branch.
              </div>
              <div className="my-5">
                {branches
                  .sort((a) =>
                    a.has_working_hours &&
                    a?.plugins_config[SHOPPING_PLUGIN]?.data?.is_open &&
                    (isBusinessOpenNow(a.working_hours) ||
                      a?.is_open_out_of_working_hours === true)
                      ? -1
                      : 1
                  )
                  .filter(
                    (branch) =>
                      !branch?.extra_data?.labels?.includes("warehouse")
                  )
                  .map((branch) => (
                    <div
                      key={`branch-${branch.slug}`}
                      role="button"
                      onKeyDown={noOp}
                      tabIndex="0"
                      onClick={() => onChangeBrachHandler(branch.site_domain)}
                      style={{
                        boxShadow: "0px 0px 10px rgba(204, 212, 215, 0.2)",
                      }}
                      className="mt-1 u-cursor-pointer p-3 container-shadow"
                    >
                      <div className="d-flex align-items-center">
                        <Icon
                          icon={LOCATION}
                          color={theme.palette.text.disabled}
                        />
                        <div
                          style={{ color: theme.palette.text.secondary }}
                          className="flex-1 mr-1"
                        >
                          {branch.title}
                        </div>
                        <div style={{ color: themeColor }}>Order</div>
                        <Icon
                          icon={CHEVRON}
                          color={themeColor}
                          className="mr-1"
                          angle={-90}
                        />
                      </div>
                      {branch.has_working_hours &&
                        branch?.plugins_config[SHOPPING_PLUGIN]?.data
                          ?.is_open &&
                        (isBusinessOpenNow(branch.working_hours) ||
                          branch?.is_open_out_of_working_hours === true) && (
                          <div className="u-text-primary-green u-fontNormal mt-3 d-flex align-items-center">
                            <div className="pulse-container ml-1">
                              <div className="position-absolute">
                                <div
                                  className="pulse-outer-circle u-background-green"
                                  style={{
                                    width: 18,
                                    height: 18,
                                  }}
                                />
                              </div>
                              <div className="position-absolute">
                                <div
                                  className="pulse-inner-circle u-background-green"
                                  style={{
                                    width: 9,
                                    height: 9,
                                  }}
                                />
                              </div>
                            </div>
                            We accept the order.
                          </div>
                        )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {dialogOpen && (
            <LocationAccessPopup
              themeColor={themeColor}
              className="position-fixed"
              business={business}
              onClose={() => setDialogOpen(false)}
              getAccess={getAccess}
            />
          )}
        </div>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeColor: makeSelectBusinessThemeColor(),
  themeConfig: makeSelectBusinessThemeConfig(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: (index) => dispatch(removeFile(index)),
    _setBranch: (data) => dispatch(setBranch(data)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(BranchSelectionModal);
