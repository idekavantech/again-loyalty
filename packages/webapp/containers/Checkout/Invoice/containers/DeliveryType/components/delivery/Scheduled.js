import React, { memo, useRef } from "react";

import { night } from "@saas/utils/colors";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { formatDate } from "@saas/utils/helpers/formatDate";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { getWeekDay } from "@saas/utils/helpers/getWeekDay";
import Flickity from "@saas/components/Flickity";
import { flickityOptions } from "containers/Checkout/Invoice/containers/DeliveryType/constants";

import Divider from "@material-ui/core/Divider";

function Scheduled({
  deliveryTimingElementRef,
  isAddressDetailsInvalid,
  isDateAndHourSelected,
  availableDeliveryTimes,
  _today,
  selectedTimeForDeliveryScheduled,
  selectedDayForDeliveryScheduled,
  themeColor,
  setDayForDeliveryScheduled,
  setTimeForDeliveryScheduled,
  setIsTimeSelect,
}) {
  const dragging = useRef();
  const flkty = useRef(null);
  return (
    <div ref={deliveryTimingElementRef}>
      <Divider />
      <div
        className={`d-flex flex-column justify-content-center px-4 py-3 ${
          !isAddressDetailsInvalid &&
          !isDateAndHourSelected &&
          "error-scheduled-time-animation"
        }`}
      >
        <div className="u-fontMedium u-fontWeightBold mb-3">
          انتخاب روز و بازه ارسال
        </div>
        <Flickity
          className="carousel px-3"
          elementType="div"
          options={flickityOptions}
          disableImagesLoaded={false}
          dragging={dragging}
          flickityRef={flkty}
        >
          {availableDeliveryTimes?.map((date) => {
            if (date.shifts.length)
              return (
                <div className="p-4" style={{ minWidth: "fit-content" }}>
                  <div style={{ color: night }} className="u-fontNormal mb-3">
                    {date.date === _today.format("YYYY/jM/jD")
                      ? "امروز"
                      : getWeekDay(date.weekDay)}
                    ،{"  "}
                    {formatDate(date.date)}
                  </div>
                  <div className="d-flex">
                    {date.shifts.map((shift, index) => {
                      const text = `${englishNumberToPersianNumber(
                        shift.from.substr(0, 5)
                      )} - ${englishNumberToPersianNumber(
                        shift.to.substr(0, 5)
                      )}`;
                      return (
                        <span
                          key={text}
                          style={{
                            color:
                              selectedTimeForDeliveryScheduled === shift &&
                              selectedDayForDeliveryScheduled === date.date &&
                              isDateAndHourSelected
                                ? themeColor
                                : night,
                            border: `1px solid ${
                              selectedTimeForDeliveryScheduled === shift &&
                              selectedDayForDeliveryScheduled === date.date &&
                              isDateAndHourSelected
                                ? hexToRGBA(themeColor, 0.2)
                                : "#EDEDED"
                            }`,
                            borderRadius:
                              date.shifts.length === 1
                                ? 8
                                : index === 0
                                ? "0px 8px 8px 0px"
                                : index === date.shifts.length - 1
                                ? "8px 0px 0px 8px"
                                : 0,
                            backgroundColor:
                              selectedTimeForDeliveryScheduled === shift &&
                              selectedDayForDeliveryScheduled === date.date &&
                              isDateAndHourSelected &&
                              hexToRGBA(themeColor, 0.2),
                          }}
                          className="u-fontNormal p-3 u-cursor-pointer"
                          onClick={() => {
                            setDayForDeliveryScheduled(date.date);
                            setTimeForDeliveryScheduled(shift);
                            setIsTimeSelect({
                              day: true,
                              time: true,
                            });
                          }}
                        >
                          {text}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
          })}
        </Flickity>
      </div>
    </div>
  );
}

export default memo(Scheduled);
