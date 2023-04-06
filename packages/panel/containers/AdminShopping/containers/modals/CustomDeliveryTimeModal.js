/* eslint-disable indent */

import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment-jalaali";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { generateTimeRange } from "@saas/utils/helpers/generateTimeRange";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { getWeekDay } from "@saas/utils/helpers/getWeekDay";

import Modal from "@saas/components/Modal";
import { updateCustomDeliveryTimes } from "@saas/stores/plugins/actions";
import { makeSelectAdminSelectedDeliveryDate } from "../../../../store/selectors";
import { setSelectedDeliveryDate } from "../../../../store/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Icon from "@saas/components/Icon";
import { TRASH } from "@saas/icons";
import AddNewItemSection from "@saas/components/AddNewItemSection";
import ModalHeader from "@saas/components/Modal/ModalHeader";

const CustomDeliveryTimeModal = ({
  selectedDate,
  isOpen,
  onClose,
  _updateData,
  _setAdminSelectedDate,
  loading,
}) => {
  const theme = useTheme();
  const [selectedDay, selectDay] = useState(null);
  const [selectedShifts, selectShifts] = useState([]);
  useEffect(() => {
    if (selectedDate) {
      const date = Object.keys(selectedDate)[0];
      selectDay(date);
      if (selectedDate[date]) {
        selectShifts(selectedDate[date]);
      }
    }
  }, [selectedDate]);
  const times = generateTimeRange(30);
  const closeModal = () => {
    _setAdminSelectedDate({});
    onClose();
  };
  return (
    <Modal
      onClose={closeModal}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={closeModal} title="shipping time" />}
      body={
        <div className="flex-1 d-flex flex-column">
          <div className="form-check pt-2 px-1  px-2">
            <FormControlLabel
              className="mr-0 d-block"
              control={
                <Checkbox
                  checked={!selectedShifts.length}
                  onChange={(e) => {
                    if (e.target.checked) selectShifts([]);
                  }}
                  color="primary"
                />
              }
              label="Is not done on this day."
            />
          </div>
          <div className="text-center u-fontSemiLarge mt-1 py-2  px-2">
            <div className="u-text-darkest-grey">
              {englishNumberToPersianNumber(selectedDay)}
            </div>
            <span className="u-text-medium-grey">Day: </span>
            <span className="u-text-darkest-grey">
              {getWeekDay(moment(selectedDay, "jYYYY/jM/jD").isoWeekday())}
            </span>
          </div>
          <div className=" flex-1">
            {selectedShifts.map((shift, index) => (
              <div
                key={shift.id}
                className="text-center d-flex mt-2 flex-row justify-content-between px-2"
              >
                <div className="mx-1 flex-1">
                  <select
                    className="c-selector px-1"
                    onChange={(e) => {
                      selectedShifts[index].from = e.target.value;
                    }}
                  >
                    {times.map((time) => (
                      <option
                        key={time.id}
                        selected={
                          time.value.search(shift.from) > -1 && time.value
                        }
                        value={time.value}
                      >
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mx-1 flex-1">
                  <select
                    className="c-selector px-1"
                    onChange={(e) => {
                      selectedShifts[index].to = e.target.value;
                    }}
                  >
                    {times.map((time) => (
                      <option
                        key={time.id}
                        selected={
                          time.value.search(shift.to) > -1 && time.value
                        }
                        value={time.value}
                      >
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>
                <Icon
                  icon={TRASH}
                  color={theme.palette.primary.main}
                  className="mr-1 mt-2 u-cursor-pointer"
                  onClick={() => {
                    selectShifts(selectedShifts.filter((s, i) => i !== index));
                  }}
                />
              </div>
            ))}
            <AddNewItemSection
              className="m-3 u-w-auto p-2"
              onClick={() => {
                selectShifts([
                  ...selectedShifts,
                  { from: "09:00", to: "12:00" },
                ]);
              }}
              title="Add another shift to this day"
            />
          </div>
        </div>
      }
      cta={
        <Button
          disabled={loading}
          color="primary"
          variant="contained"
          className="w-100"
          onClick={() => {
            _updateData(selectedShifts, selectedDay);
            selectDay(null);
            if (!loading) closeModal();
          }}
        >
          Store
        </Button>
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  selectedDate: makeSelectAdminSelectedDeliveryDate(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateData: (data, id) => dispatch(updateCustomDeliveryTimes(data, id)),
    _setAdminSelectedDate: (data) => dispatch(setSelectedDeliveryDate(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CustomDeliveryTimeModal);
