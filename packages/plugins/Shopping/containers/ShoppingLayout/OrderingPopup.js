/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo, useMemo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeConfig,
  makeSelectBusinessWorkingHours,
} from "@saas/stores/business/selector";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { getWorkingDayStart } from "@saas/utils/helpers/getWorkingDayStart";

import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  CLOSING_TYPE_AUTOMATIC,
  CLOSING_TYPE_HOUR,
  CLOSING_TYPE_MANUAL,
  DEFAULT_POPUP,
  IN_THE_WORKING_HOURS,
  NO_CONDITION_POP_UP,
  NO_POP_UP,
  OUT_OF_THE_WORKING_HOURS,
} from "../../constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

function OrderingPopup({ workingHours, pluginData, themeConfig }) {
  const currentTimeInBusinessHours = isBusinessOpenNow(workingHours)
    ? IN_THE_WORKING_HOURS
    : OUT_OF_THE_WORKING_HOURS;
  const IS_BUSINESS_OPEN =
    typeof pluginData.data.is_open !== "boolean"
      ? true
      : pluginData.data.is_open;
  const CLOSING_TYPE = pluginData.data.closing_type || CLOSING_TYPE_MANUAL;

  const POPUP_TYPE =
    themeConfig?.plugins?.[SHOPPING_PLUGIN]?.ordering_popup?.type ||
    DEFAULT_POPUP;
  const POPUP_CUSTOM_TEXT =
    themeConfig?.plugins?.[SHOPPING_PLUGIN]?.ordering_popup?.text || "";
  const workingDate = getWorkingDayStart(workingHours);
  const overrideMessage =
    POPUP_TYPE === NO_CONDITION_POP_UP ? POPUP_CUSTOM_TEXT : null;
  const closingTypesMessages = useMemo(() => {
    return {
      [CLOSING_TYPE_MANUAL]: "موقتا قادر به دریافت سفارش نیستیم.",
      [CLOSING_TYPE_AUTOMATIC]:
        workingDate &&
        `خارج از ساعت کاری هستیم. شروع سفارش‌گیری از ${
          workingDate.dayName
        } ساعت ${englishNumberToPersianNumber(workingDate.openingTime)}`,
      [CLOSING_TYPE_HOUR]:
        "حداکثر از یک ساعت دیگر قادر به دریافت سفارش خواهیم بود.",
    };
  }, [workingDate, overrideMessage]);
  const PREORDER_TYPE_MESSAGE = useMemo(
    () =>
      workingDate &&
      ` درحال حاضر خارج از ساعت کاری هستیم. در صورت ثبت سفارش،  ${
        workingDate.dayName
      } ساعت ${englishNumberToPersianNumber(
        workingDate.openingTime
      )} پردازش می‌شود.`,
    [workingDate]
  );

  const POPUP_HTML = !IS_BUSINESS_OPEN ? (
    <div className="u-fontNormal">
      {overrideMessage || closingTypesMessages[CLOSING_TYPE]}
    </div>
  ) : (
    <div className="u-fontNormal">
      {overrideMessage || PREORDER_TYPE_MESSAGE}
    </div>
  );

  const shouldPopupBeOpen =
    POPUP_TYPE === NO_CONDITION_POP_UP ||
    (POPUP_TYPE !== NO_POP_UP &&
      (!IS_BUSINESS_OPEN ||
        currentTimeInBusinessHours === OUT_OF_THE_WORKING_HOURS));

  const [isDialogOpen, setDialogOpen] = useState(shouldPopupBeOpen);

  const onClose = () => {
    setDialogOpen(false);
  };
  if (!workingDate) {
    return null;
  }
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      aria-describedby="alert-dialog-description"
      disableBackdropClick
      disableEscapeKeyDown
      PaperProps={{ style: { width: "100%" } }}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {POPUP_HTML}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          تایید
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = createStructuredSelector({
  workingHours: makeSelectBusinessWorkingHours(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  themeConfig: makeSelectBusinessThemeConfig(),
  business: makeSelectBusiness(),
});

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, memo)(OrderingPopup);
