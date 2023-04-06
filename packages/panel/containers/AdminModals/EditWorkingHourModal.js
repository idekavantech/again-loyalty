import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import { generateTimeRange } from "@saas/utils/helpers/generateTimeRange";
import { getWeekDay } from "@saas/utils/helpers/getWeekDay";

import AddNewItemSection from "@saas/components/AddNewItemSection";
import FreeSelect from "@saas/components/FreeSelect";
const EditWorkingHourModal = ({
  day,
  weekDay,
  loading,
  _updateBusinessWorkingHour,
}) => {
  const times = generateTimeRange(30);
  const [shifts, setShifts] = useState(day);
  return (
    <>
      <div className="">
        <div className="form-check pt-2 px-1  px-2">
          <FormControlLabel
            className="mr-0"
            control={
              <Checkbox
                checked={shifts && !shifts.length}
                onChange={(e) => {
                  if (e.target.checked) setShifts([]);
                }}
                color="primary"
              />
            }
            label="On this business day is closed."
          />
        </div>

        <div className="text-center u-fontSemiLarge mt-1 py-2  px-2">
          <span className="u-text-medium-grey">Day: </span>
          <span className="u-text-dark-grey">{getWeekDay(weekDay)}</span>
        </div>
        <div className=" flex-1">
          {shifts && shifts.length ? (
            <div className="text-center d-flex flex-row justify-content-between pt-3  px-2">
              <div className="mx-1 flex-1">
                <div className="u-fontNormal u-text-dark-grey mb-2">
                  Starting hours
                </div>
              </div>
              <div className="w-100 mx-1 flex-1">
                <div className="u-fontNormal u-text-dark-grey mb-2">
                  end time
                </div>
              </div>
            </div>
          ) : null}

          {shifts &&
            shifts.map((shift, index) => (
              <div
                key={index}
                className="text-center d-flex mt-2 flex-row justify-content-between px-2"
              >
                <div className="mx-1 flex-1">
                  <FreeSelect
                    options={times}
                    value={shifts[index].from}
                    onChange={(value) => {
                      shifts[index].from = value;
                      setShifts([...shifts]);
                    }}
                  />
                </div>
                <div className="mx-1 flex-1">
                  <FreeSelect
                    options={times}
                    value={shifts[index].to}
                    onChange={(value) => {
                      shifts[index].to = value;
                      setShifts([...shifts]);
                    }}
                  />
                </div>
                <IconButton
                  onClick={() => {
                    setShifts(shifts.filter((s, i) => i !== index));
                  }}
                >
                  <DeleteRoundedIcon color="primary" />
                </IconButton>
              </div>
            ))}
          <AddNewItemSection
            className="m-3 u-w-auto p-2"
            onClick={() => {
              setShifts([...shifts, { from: "09:00", to: "18:00" }]);
            }}
            title="Add another shift to this day"
          />
        </div>
        <div className="px-3 sticky-bottom">
          <Button
            disabled={loading}
            color="primary"
            className="w-100"
            variant="contained"
            onClick={() => {
              _updateBusinessWorkingHour(shifts, weekDay);
            }}
          >
            Store
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(EditWorkingHourModal);
