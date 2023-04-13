import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
import Section from "@saas/components/Section";
import { noOp } from "@saas/utils/helpers/noOp";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";

import { DIRECTION_MODAL } from "@saas/stores/ui/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function Location1({
  onClick,
  isEditMode,
  themeColor,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  business,
}) {
  const { latitude, longitude, address } = business;
  const position = { latitude, longitude, singleMarker: true };
  const {minWidth768} = useResponsive()
  const mapOptions = {
    height: "230px",
    width: "100%",
    center: position,
    markers: [position],
    themeColor,
    dragging: minWidth768,
  };
  if (isEditMode) {
    return (
      <AdminSection
        isDragging={isDragging}
        dragHandleProps={dragHandleProps}
        style={{ padding: "0px !important" }}
        onClick={onClick}
        isActive={isActive}
        _updateSection={_updateSection}
      >
        <Section className="py-5" themeColor={themeColor} title="Address">
          <div className="map-sec mx-auto">
            <Map options={mapOptions} />
          </div>
          {address ? (
            <>
              <address className="u-text-darkest-grey u-fontLarge-r mt-5">
                {address}
              </address>
              <div
                className="mt-3 mb-3"
                onClick={() => pushParamsToUrl(DIRECTION_MODAL)}
                onKeyDown={noOp}
                role="button"
                tabIndex="0"
              >
                <button
                  className="c-btn c-btn-secondory c-btn-secondory c-btn-secondory__border__1px u-fontSemiLarge mx-1"
                  onClick={() => pushParamsToUrl(DIRECTION_MODAL)}
                  style={{
                    borderColor: themeColor,
                    color: themeColor,
                  }}
                >
                  Address and routing
                </button>
              </div>
            </>
          ) : (
            <div className="u-text-darkest-grey u-fontLarge-r mt-5">
              The address and position of your business
            </div>
          )}
        </Section>
      </AdminSection>
    );
  }
  return (
    <Section className="py-4" themeColor={themeColor} title="Address">
      <div className="map-sec mx-auto">
        <Map
          options={mapOptions}
          onClick={() => pushParamsToUrl(DIRECTION_MODAL)}
        />
      </div>
      {address && (
        <>
          {" "}
          <address className="u-text-darkest-grey u-fontLarge-r mt-5">
            {address}
          </address>
          <div
            className="mt-3 mb-3"
            onClick={() => pushParamsToUrl(DIRECTION_MODAL)}
            onKeyDown={noOp}
            role="button"
            tabIndex="0"
          >
            <button
              className="c-btn c-btn-secondory c-btn-secondory c-btn-secondory__border__1px u-fontSemiLarge mx-1"
              style={{
                borderColor: themeColor,
                color: themeColor,
              }}
            >
              Address and routing
            </button>
          </div>
        </>
      )}
    </Section>
  );
}

export default memo(Location1);
