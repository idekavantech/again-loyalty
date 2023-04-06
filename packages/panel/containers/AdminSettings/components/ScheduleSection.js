import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import { night } from "@saas/utils/colors";
import WorkTimeSection from "./WorkTimeSection";
import Switch from "@saas/components/Switch";
import useTheme from "@material-ui/core/styles/useTheme";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
function ScheduleSection({
  workingHours,
  updateWorkingHours,
  showWorkingTime,
  setShowWorkingTime,
  textError,
  workingHourRef,
}) {
  const theme = useTheme();
  return (
    <Paper
      elevation={1}
      className="d-flex mt-3 py-3 flex-wrap"
      ref={workingHourRef}
    >
      <div className="col-12 mb-lg-3 mb-0">
        <span className="anchor" id="working_hours" />
        <div className="u-fontLarge d-flex" style={{ color: night }}>
          <span>ساعت کاری</span>
          <div>
            <Switch
              onColor={theme.palette.primary.main}
              isSwitchOn={showWorkingTime}
              toggleSwitch={() => {
                setShowWorkingTime(!showWorkingTime);
              }}
            />
          </div>
        </div>
        <div className="mt-2">
          برای دریافت سفارش آنلاین در سایت لازم است این بخش را فعال کنید و ساعت
          دریافت سفارش خود را مشخص کنید. همچنین می توانید ساعت کاری خود را در
          سایت نمایش دهید.
        </div>
        {showWorkingTime ? (
          <div className="d-flex flex-column">
            <WorkTimeSection
              workingHours={workingHours}
              updateWorkingHours={updateWorkingHours}
            />
          </div>
        ) : null}
        {textError ? (
          <div className="d-flex align-items-center p-4 error-card mt-2">
            <InfoOutlinedIcon className="icon" />
            <span className="mr-3">{textError}</span>
          </div>
        ) : null}
      </div>
    </Paper>
  );
}

export default memo(ScheduleSection);
