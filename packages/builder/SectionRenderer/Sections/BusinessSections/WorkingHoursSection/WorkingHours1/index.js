/* eslint-disable indent */

import React, { memo } from "react";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { getWeekDays } from "@saas/utils/constants/date";
import { getWeekDay } from "@saas/utils/helpers/getWeekDay";

import Section from "@saas/components/Section";
import AdminSection from "@saas/components/AdminSection";

function WorkingHours1({
  isEditMode,
  onClick,
  themeColor,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  business,
  mock,
  isMobile,
}) {
  const { work_hours: workHours, has_working_hours: hasWorkingHours } =
    business;

  return (
    <AdminSection
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      isEditMode={Boolean(isEditMode)}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
    >
      <Section themeColor={themeColor} title="ساعت کاری" className="py-4">
        <div
          className={`${isMobile ? "col-10" : "col-md-6"} ${
            !mock && "col-lg-3"
          } mx-auto`}
        >
          <div className="py-1 u-text-darkest-grey u-fontNormal-r w-100">
            {hasWorkingHours &&
              getWeekDays.map((label) => {
                const day = workHours[label];
                return (
                  <div
                    className="d-flex justify-content-between align-items-start w-100 py-1"
                    key={`day-working-hour-${label}`}
                  >
                    <div className="text-right" style={{ minWidth: "64px" }}>
                      {getWeekDay(label)}
                    </div>
                    <div>
                      {day.length
                        ? day.map((shift) => (
                            <div
                              className="mb-1"
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
        </div>
      </Section>
    </AdminSection>
  );
}

export default memo(WorkingHours1);
