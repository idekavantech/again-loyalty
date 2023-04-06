import React, { memo, useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { generateTimeRange } from "@saas/utils/helpers/generateTimeRange";
import { getWeekDays } from "@saas/utils/constants/date";
import { getWeekDay } from "@saas/utils/helpers/getWeekDay";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const times = generateTimeRange(30);
function WorkTimeSection({ workingHours, updateWorkingHours }) {
  const { minWidth992 } = useResponsive();

  const [workingHourObj, setWorkingHourObj] = useState(null);
  const handleShiftChange = (value, weekDayIndex, shiftIndex, property) => {
    const arrayOfObjects = [...workingHourObj];
    arrayOfObjects[weekDayIndex].shifts[shiftIndex][property] = value;
    setWorkingHourObj(arrayOfObjects);
    setTimeout(() => {
      submit();
    }, 0);
  };

  const addNewShiftToWeekDay = (weekDayIndex) => {
    const arrayOfObjects = [...workingHourObj];
    arrayOfObjects[weekDayIndex].shifts.push({
      from: times[10].value,
      to: times[20].value,
    });
    setWorkingHourObj(arrayOfObjects);
    setTimeout(() => {
      submit();
    }, 0);
  };

  const deleteShiftFromWeekDay = (weekDayIndex, shiftIndex) => {
    const arrayOfObjects = [...workingHourObj];
    arrayOfObjects[weekDayIndex].shifts.splice(shiftIndex, 1);
    setWorkingHourObj(arrayOfObjects);
    setTimeout(() => {
      submit();
    }, 0);
  };

  const toggleOpenOrClose = (value, weekDayIndex) => {
    const arrayOfObjects = [...workingHourObj];
    arrayOfObjects[weekDayIndex].isOpen = value;
    setWorkingHourObj(arrayOfObjects);
    setTimeout(() => {
      submit();
    }, 0);
  };

  useEffect(() => {
    if (workingHours) {
      setWorkingHourObj(
        getWeekDays.map((weekDay) => ({
          name: getWeekDay(weekDay),
          id: weekDay,
          shifts: workingHours[weekDay].length
            ? workingHours[weekDay].map((shift) => ({
                from: shift.from.substring(0, 5),
                to: shift.to.substring(0, 5),
              }))
            : [{ from: times[10].value, to: times[20].value }],
          isOpen: workingHours[weekDay].length,
        }))
      );
    }
  }, [workingHours]);

  const submit = () => {
    const newWorkingHoursObj = {};
    workingHourObj.forEach((weekDay) => {
      newWorkingHoursObj[weekDay.id] = weekDay.isOpen
        ? weekDay.shifts.map((shift) => ({
            from: `${shift.from}:00`,
            to: `${shift.to}:00`,
          }))
        : [];
    });
    updateWorkingHours(newWorkingHoursObj);
  };
  return (
    <div>
      {workingHourObj &&
        workingHourObj.map((weekDay, idx) => {
          return (
            <div
              key={weekDay.id}
              className="d-flex flex-row align-items-center mt-3"
            >
              <div className="d-flex flex-column">
                {weekDay.shifts.map((shift, index) => (
                  <div
                    className="mt-3 d-flex align-items-center"
                    style={{ minHeight: 55.87 }}
                    key={shift.id}
                  >
                    {index === 0 ? (
                      <>
                        <Checkbox
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          className="pr-0"
                          checked={weekDay.isOpen}
                          onChange={(event) =>
                            toggleOpenOrClose(event.target.checked, idx)
                          }
                        />
                        <div
                          className="ml-1 ml-sm-2 d-inline-block"
                          style={{ width: 50 }}
                        >
                          {weekDay.name}
                        </div>
                      </>
                    ) : (
                      <>
                        <Checkbox
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          className="pr-0"
                          style={{ visibility: "hidden" }}
                        />
                        <div
                          className="ml-1 ml-sm-2 d-inline-block"
                          style={{ width: 50, visibility: "hidden" }}
                        >
                          {weekDay.name}
                        </div>
                      </>
                    )}
                    {weekDay.isOpen ? (
                      <>
                        <FormControl
                          variant="outlined"
                          style={{
                            minWidth: minWidth992 ? 150 : 75,
                            marginLeft: minWidth992 ? 15 : 5,
                          }}
                        >
                          <Select
                            value={shift.from}
                            onChange={(e) =>
                              handleShiftChange(
                                e.target.value,
                                idx,
                                index,
                                "from"
                              )
                            }
                            className="medium"
                            style={{
                              minWidth: minWidth992 ? 150 : 75,
                              marginLeft: minWidth992 ? 15 : 5,
                            }}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            {times.map((time) => (
                              <MenuItem key={time.value} value={time.value}>
                                From{time.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl
                          variant="outlined"
                          style={{
                            minWidth: minWidth992 ? 150 : 75,
                            marginLeft: minWidth992 ? 15 : 5,
                          }}
                        >
                          <Select
                            value={shift.to}
                            onChange={(e) =>
                              handleShiftChange(
                                e.target.value,
                                idx,
                                index,
                                "to"
                              )
                            }
                            displayEmpty
                            className="medium"
                            style={{
                              minWidth: minWidth992 ? 150 : 75,
                              marginLeft: minWidth992 ? 15 : 5,
                            }}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            {times.map((time) => (
                              <MenuItem key={time.id} value={time.value}>
                                until the{time.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {index === 0 ? (
                          <IconButton onClick={() => addNewShiftToWeekDay(idx)}>
                            <AddCircleOutlineIcon
                              color="primary"
                              style={{ cursor: "pointer" }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => deleteShiftFromWeekDay(idx, index)}
                          >
                            <DeleteRoundedIcon
                              color="primary"
                              style={{ cursor: "pointer" }}
                            />
                          </IconButton>
                        )}
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default memo(WorkTimeSection);
