import moment from "moment";
import { getNextWorkingDayStart } from "./getNextWorkingDayStart";
import { persianToEnglishNumber } from "./persianToEnglishNumber";
// Business Timing
const NEXT_PERIOD = "NEXT_PERIOD";
const RIGHT_NOW_PERIOD = "RIGHT_NOW_PERIOD";
export function getBusinessAvailableTime(workingHours) {
  const today = moment().isoWeekday();
  const rightNowHour = parseInt(
    persianToEnglishNumber(moment().format("HH")),
    10
  );
  const rightNowMinute = parseInt(
    persianToEnglishNumber(moment().format("mm")),
    10
  );
  const rightNowTime = rightNowHour * 60 + rightNowMinute; // In minute
  let todayHours = workingHours[today];
  // Sort working time period
  if (todayHours?.length) {
    todayHours = [
      ...todayHours.slice().sort((firstPeriod, secondPeriod) => {
        const firstPeriodHour = parseInt(firstPeriod.from.split(":")[0], 10);
        const secondPeriodHour = parseInt(secondPeriod.from.split(":")[0], 10);
        const firstPeriodMinute = parseInt(firstPeriod.from.split(":")[1], 10);
        const secondPeriodMinute = parseInt(
          secondPeriod.from.split(":")[1],
          10
        );

        const firstPeriodTime = firstPeriodHour * 60 + firstPeriodMinute;
        const secondPeriodTime = secondPeriodHour * 60 + secondPeriodMinute;
        if (firstPeriodTime < secondPeriodTime) return -1;
        if (firstPeriodHour > secondPeriodTime) return 1;
        return 0;
      }),
    ];
  }

  const businessNextPeriodFromHour =
    +parseInt(todayHours[0]?.from?.split(":")[0], 10) || "0";
  const businessNextPeriodFromMinute =
    +parseInt(todayHours[0]?.from?.split(":")[1], 10) || "0";
  const businessNextPeriodFromTime =
    businessNextPeriodFromHour >= 0 && businessNextPeriodFromMinute >= 0
      ? businessNextPeriodFromHour * 60 + +businessNextPeriodFromMinute
      : null; // In minute
  // BUSINESS ONLY HAS ONE PERIOD AND CURRENT TIME IS NOT IN PERIOD DURIATION
  if (todayHours.length === 1 && businessNextPeriodFromTime > rightNowTime) {
    return {
      badWay: "non non",
      status: NEXT_PERIOD,
      dayName: "Today",
      openingTime: todayHours[0].from,
      closingTime: todayHours[0].to,
    };
  }

  for (let i = 0; i < todayHours.length; i++) {
    const businessIsOpenFromInHour = parseInt(
      todayHours[i].from.split(":")[0],
      10
    );
    const businessIsOpenFromInMinute = parseInt(
      todayHours[i].from.split(":")[1],
      10
    );
    const businessFromTime =
      businessIsOpenFromInHour * 60 + +businessIsOpenFromInMinute; // In minute

    const businessIsOpenToInHour = parseInt(todayHours[i].to.split(":")[0], 10);
    const businessIsOpenToInMinute = parseInt(
      todayHours[i].to.split(":")[1],
      10
    );
    const businessToTime =
      businessIsOpenToInHour * 60 + +businessIsOpenToInMinute; // In minute

    const businessPrevPeriodToHour = parseInt(
      todayHours[i - 1]?.to?.split(":")[0],
      10
    );
    const businessPrevPeriodToMinute = parseInt(
      todayHours[i - 1]?.to?.split(":")[1],
      10
    );
    const businessPrevPeriodToTime =
      businessPrevPeriodToHour >= 0 && businessPrevPeriodToMinute >= 0
        ? businessPrevPeriodToHour * 60 + +businessPrevPeriodToMinute
        : null; // In minute
    if (rightNowTime < businessToTime && rightNowTime > businessFromTime) {
      return {
        status: RIGHT_NOW_PERIOD,
        dayName: "Today",
        openingTime: todayHours[i].from,
        closingTime: todayHours[i].to,
      };
    } else if (
      rightNowTime < businessFromTime &&
      rightNowTime > businessPrevPeriodToTime
    ) {
      return {
        status: RIGHT_NOW_PERIOD,
        dayName: "Today",
        openingTime: todayHours[i].from,
        closingTime: todayHours[i].to,
      };
    }
  }

  if (todayHours?.length > 1) {
    for (let i = 0; i < todayHours.length; i++) {
      const businessToHoure = parseInt(todayHours[i].to.split(":")[0], 10);
      const businessToMinute = parseInt(todayHours[i].to.split(":")[1], 10);
      const businessToTime = businessToHoure * 60 + businessToMinute; // In minute
      const businessNextPeriodFromHour = parseInt(
        todayHours[i + 1]?.from?.split(":")[0],
        10
      );
      const businessNextPeriodFromMinute = parseInt(
        todayHours[i + 1]?.from?.split(":")[1],
        10
      );
      const businessNextPeriodFromTime =
        businessNextPeriodFromHour >= 0 && businessNextPeriodFromMinute >= 0
          ? businessNextPeriodFromHour * 60 + businessNextPeriodFromMinute
          : null; // In minute
      if (
        rightNowTime > businessToTime &&
        rightNowTime < businessNextPeriodFromTime
      ) {
        return {
          status: NEXT_PERIOD,
          dayName: "Today",
          openingTime: todayHours[i + 1]?.from,
          closingTime: todayHours[i + 1]?.to,
        };
      }
    }
    return getNextWorkingDayStart(workingHours);
  }
  return getNextWorkingDayStart(workingHours);
}
