import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { memo } from "react";
import JalaliUtils from "@date-io/jalaali";

const FieldDateTimePicker = ({ setDisable, setValue, value }) => {
  return (
    <div className="mb-5">
      <MuiPickersUtilsProvider utils={JalaliUtils} locale={"fa"}>
        <DateTimePicker
          inputVariant="outlined"
          fullWidth={true}
          okLabel="تأیید"
          cancelLabel="لغو"
          disablePast={true}
          ampm={false}
          required
          invalidDateMessage="زمان انتخاب شده صحیح نیست"
          minDateMessage="تاریخ روزهای گذشته مجاز نیست"
          label="مدت زمان تخفیف"
          minTime={new Date(0, 0, 0, 9)}
          labelFunc={(date) =>
            date ? date.format("jYYYY/jMM/jDD hh:mm:ss a") : ""
          }
          value={value}
          onChange={(date) => {
            if (new Date(date).getTime() < new Date().getTime()) {
              setDisable(true);
              setValue(false);
            } else {
              setDisable(false);
              setValue(date);
            }
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default memo(FieldDateTimePicker);
