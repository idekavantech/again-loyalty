/* eslint-disable indent */

import React, { memo } from "react";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { getWeekDays } from "@saas/utils/constants/date";
import { getWeekDay } from "@saas/utils/helpers/getWeekDay";

function WorkingHour({ business }) {
  const { work_hours: workHours, has_working_hours: hasWorkingHours } =
    business;

  return (
    <div className="py-1 u-text-black u-fontNormal-r w-100">
      {hasWorkingHours &&
        getWeekDays.map((label) => {
          const day = workHours[label];
          return (
            <div
              className="d-flex justify-content-around align-items-start w-100 py-1"
              key={`day-working-hour-${label}`}
            >
              <div className="text-right" style={{ minWidth: 64 }}>
                {getWeekDay(label)}
              </div>
              <div style={{ minWidth: 75 }}>
                {day.length
                  ? day.map((shift) => (
                      <div
                        className="mb-1 text-right"
                        key={`${shift.from}-${shift.to}`}
                      >
                        {englishNumberToPersianNumber(shift.from)} -{" "}
                        {englishNumberToPersianNumber(shift.to)}
                      </div>
                    ))
                  : "تعطیل"}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default memo(WorkingHour);
