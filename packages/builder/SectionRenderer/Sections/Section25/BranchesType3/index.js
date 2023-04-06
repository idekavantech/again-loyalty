import React, { memo, useState } from "react";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";
import { noOp } from "@saas/utils/helpers/noOp";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";

import { getDistance } from "@saas/utils/helpers/getDistance";

import LocationAccessPopup from "@saas/components/LocationAccessPopup";
import { BRANCH_SELECTION_MODAL } from "@saas/stores/ui/constants";
import { useRouter } from "next/router";

function BranchesSection({
  isEditMode,
  onClick,
  themeColor,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  business,
  customization,
}) {
  const {
    background: {
      background_type: backgroundType,
      background_image: backgroundImage,
      background_color: backgroundColor,
      opacity = 100,
    } = {},
  } = customization;
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const branches =
    business.branches && business.branches.length ? business.branches : [];
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
  return (
    <AdminSection
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      isEditMode={Boolean(isEditMode)}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
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
        className="container mx-auto position-relative"
        id="branches-section"
        style={{
          backgroundColor: backgroundType === "color" && backgroundColor,
        }}
      >
        <div className="py-5 u-fontNormal-r w-100">
          <div className="text-center u-text-black u-fontWeightBold">
            انتخاب شعبه
          </div>
          <div className="text-center u-text-black mt-1">
            برای سفارش آنلاین شعبه موردنظر خود را انتخاب کنید.
          </div>
          <div className="align-items-center justify-content-center d-flex w-100 pt-3">
            <div
              role="button"
              onKeyDown={noOp}
              tabIndex="0"
              onClick={() => pushParamsToUrl(BRANCH_SELECTION_MODAL)}
              className="px-3 u-text-white u-no-wrap u-fontWeightBold u-height-36 c-btn-branch u-border-radius-4 u-cursor-pointer"
              style={{ backgroundColor: themeColor }}
            >
              انتخاب شعبه
              <KeyboardArrowLeftRoundedIcon fontSize="small" />
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
    </AdminSection>
  );
}

export default memo(BranchesSection);
