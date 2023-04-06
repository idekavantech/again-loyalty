import React, { memo, Fragment, useMemo } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
import { fulfillmentTypeOptions } from "containers/Checkout/Invoice/containers/NotDeliveryType/constants";
import { coal, pollution, smoke } from "@saas/utils/colors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { MAP_DETAIL_ACCURACY_IS_ADDRESS } from "@saas/plugins/Shopping/constants";

import Paper from "@material-ui/core/Paper";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";

function ReceivingInformation({
  deliveryOnSiteDetailAccuracy,
  fulfillmentType,
  business,
  themeColor,
}) {
  const { minWidth768 } = useResponsive();
  const mapOptions = useMemo(() => {
    return {
      height: 200,
      width: "100%",
      center: {
        latitude: business?.latitude,
        longitude: business?.longitude,
        singleMarker: true,
      },
      markers: [
        {
          latitude: business?.latitude,
          longitude: business?.longitude,
          singleMarker: true,
        },
      ],
      touchZoom: true,
      themeColor,
      zoom: 14,
      borderRadius: 8,
    };
  }, [business?.latitude, business?.longitude, themeColor]);

  return (
    <Fragment>
      <div style={{ position: "relative" }}>
        {deliveryOnSiteDetailAccuracy ===
        MAP_DETAIL_ACCURACY_IS_ADDRESS ? null : (
          <Map options={mapOptions} />
        )}
        <Paper
          elevation={1}
          className="px-4 py-3 w-100 d-flex align-items-center"
          style={{
            position: `${
              deliveryOnSiteDetailAccuracy === MAP_DETAIL_ACCURACY_IS_ADDRESS
                ? null
                : "absolute"
            }`,
            bottom: 0,
            borderRadius: 8,
          }}
        >
          <LocationOnRoundedIcon className="ml-2" />
          <div>
            <div className="d-flex align-items-center">
              <div className="u-fontMedium" style={{ color: coal }}>
                {fulfillmentTypeOptions[fulfillmentType.toUpperCase()]}
              </div>
              &nbsp;
              <div
                className="u-fontMedium u-fontWeightBold"
                style={{ color: coal }}
              >
                {business.revised_title}
              </div>
            </div>
            <div
              className="u-font-semi-small mt-1"
              style={{ color: pollution }}
            >
              {business.address}
            </div>
          </div>
        </Paper>
      </div>
      <div className="d-flex align-items-start align-items-md-center mt-3">
        <ErrorOutlineRoundedIcon
          size="small"
          style={{
            color: smoke,
            width: 15,
            height: 15,
            marginTop: !minWidth768 && 3,
          }}
          className="ml-1"
        />
        <div
          style={{ color: smoke, lineHeight: 1.8 }}
          className="u-font-semi-small"
        >
          جزییات آدرس و لینک مسیریابی بعد از ثبت موفق سفارش برای شما پیامک خواهد
          شد.
        </div>
      </div>
    </Fragment>
  );
}

export default memo(ReceivingInformation);
