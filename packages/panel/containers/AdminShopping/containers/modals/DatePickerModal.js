import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import Modal from "@saas/components/Modal";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { setSelectedDeliveryDate } from "store/actions";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultToDate } from "@saas/utils/constants/date";

function DatePickerModal({
  isOpen,
  onClose,
  _setAdminSelectedDate,
  toggleModal,
}) {
  const [selectedDay, setSelectedDay] = useState(defaultToDate);
  const date = `${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`;
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} />}
      cta={
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          onClick={() => {
            const dateObject = {};
            dateObject[date] = [];
            _setAdminSelectedDate(dateObject);
            onClose();
            toggleModal();
          }}
        >
          Confirm and continue
        </Button>
      }
      body={
        <div className="p-3">
          <div className="u-fontWeightBold">
            Select your desired day and date on calendar.
          </div>
          <div className="d-flex justify-content-center align-items-center Calendar-no-box-shadow">
            <CustomCalendar
              selectedDayRange={selectedDay}
              setSelectedDayRange={setSelectedDay}
              renderFooter={false}
            />
          </div>
        </div>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setAdminSelectedDate: (data) => dispatch(setSelectedDeliveryDate(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DatePickerModal);
