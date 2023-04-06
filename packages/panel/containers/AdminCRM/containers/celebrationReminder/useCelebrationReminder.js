import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "@material-ui/core/styles/useTheme";
import { getCampaignsBySegment, updateCampaignBySegment } from "store/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { DISCOUNT_CODE, DISCOUNT_CODE_ACTION, POINT, POINT_ACTION, REWARD, REWARD_ACTION } from "../../constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useRouter } from "next/router";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { GET_CAMPAIGNS_BY_SEGMENT } from "store/constants";

const BIRTH_DATE = "birth_date";
const MARRIAGE_DATE = "marriage_date";

const eventTypes = {
  [BIRTH_DATE]: "Birth",
  [MARRIAGE_DATE]: "anniversary",
};

const giftTypes = {
  [REWARD]: REWARD_ACTION,
  [POINT]: POINT_ACTION,
  [DISCOUNT_CODE]: DISCOUNT_CODE_ACTION,
};

const useCelebrationReminder = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const _isCelebrationReminderLoading = useSelector(makeSelectLoading(GET_CAMPAIGNS_BY_SEGMENT));

  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());

  const _getCampaignsBySegment = (query, callback) => dispatch(getCampaignsBySegment(query, callback));
  const _updateCelebrationReminder = (id, data, callback) => dispatch(updateCampaignBySegment(id, data, callback));

  const [celebrationReminders, setCampaignsBySegment] = useState([]);
  const [openPopperId, setOpenPopperId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      _getCampaignsBySegment({segment_rule:"customer_related_date"}, (state) => setCampaignsBySegment(state));
    }, 0);
  }, []);

  const updateSingleCelebrationReminder = (newReminderItem) => {
    setCampaignsBySegment(celebrationReminders.map((itm) => (itm.id === newReminderItem.id ? newReminderItem : itm)));
  };

  const handleToggleCelebrationReminderIsActive = (reminderId) => {
    const selectedItem = celebrationReminders.find((itm) => itm.id === reminderId) 
    _updateCelebrationReminder(reminderId, { is_active: !selectedItem.is_active }, updateSingleCelebrationReminder);

  };

  const handleClosePopper = () => setOpenPopperId(null);
  const handleOpenPopper = (id) => setOpenPopperId(id);
  const togglePopper = (id) => (openPopperId === null ? handleOpenPopper(id) : handleClosePopper());

  const openPopperItem = useMemo(
    () => (openPopperId === null ? null : celebrationReminders.find((itm) => itm.id === openPopperId)),
    [openPopperId]
  );

  const crontabToReadableTime = (crontab) => {
    if (!crontab || isNaN(Number(crontab.hour)) || isNaN(Number(crontab.minute))) return "";
    const { hour, minute } = crontab;
    const formattedHour = ("0" + hour).slice(-2);
    const formattedMinutes = ("0" + minute).slice(-2);
    return englishNumberToPersianNumber(`${formattedHour}:${formattedMinutes}`);
  };

  const haveSetNoReminders = useMemo(
    () => !_isCelebrationReminderLoading && celebrationReminders?.length === 0,
    [_isCelebrationReminderLoading, celebrationReminders]
  );


  return {
    _isCelebrationReminderLoading,
    theme,
    openPopperItem,
    celebrationReminders,
    haveSetNoReminders,
    eventTypes,
    giftTypes,
    adminUrlPrefix,
    router,
    handleToggleCelebrationReminderIsActive,
    openPopperId,
    togglePopper,
    handleClosePopper,
    handleOpenPopper,
    crontabToReadableTime,
  };
};

export { useCelebrationReminder };
