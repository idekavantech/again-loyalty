import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "@material-ui/core/styles/useTheme";
import { createCampaignBySegment, updateCampaignBySegment, getCampaignBySegment } from "store/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { GET_CAMPAIGN_BY_SEGMENT } from "store/constants";
import { DISCOUNT_CODE, REWARD, SMS } from "../../constants";
import { replacePersinaSmsKeywordWithEnglish } from "../../helpers/smsKeywords";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import {
  BUSINESS_TITLE_KEYWORD,
  MEMBERSHIP_NAME_KEYWORD,
  CREDIT_AMOUNT_KEYWORD,
  MEMBERSHIP_TOTAL_GIFT_KEYWORD,
  DISCOUNT_PERCENT_KEYWORD,
} from "../../constants";
import { useRouter } from "next/router";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { useTextfieldCursor } from "containers/AdminCRM/helpers/useTextFieldCursor";

const OTHERS = SMS;

const giftTypes = [
  {
    id: 0,
    name: "discount code",
    value: DISCOUNT_CODE,
  },
  {
    id: 1,
    name: "Credit",
    value: REWARD,
  },
  {
    id: 2,
    name: "None",
    value: OTHERS,
  },
];

const smsKeywordsMap = new Map();

smsKeywordsMap.set(DISCOUNT_CODE, [
  MEMBERSHIP_NAME_KEYWORD,
  BUSINESS_TITLE_KEYWORD,
  DISCOUNT_PERCENT_KEYWORD,
  MEMBERSHIP_TOTAL_GIFT_KEYWORD,
]);

smsKeywordsMap.set(REWARD, [
  MEMBERSHIP_NAME_KEYWORD,
  BUSINESS_TITLE_KEYWORD,
  CREDIT_AMOUNT_KEYWORD,
  MEMBERSHIP_TOTAL_GIFT_KEYWORD,
]);

smsKeywordsMap.set(OTHERS, [MEMBERSHIP_NAME_KEYWORD, BUSINESS_TITLE_KEYWORD, MEMBERSHIP_TOTAL_GIFT_KEYWORD]);

const BIRTH_DATE = "birth_date";
const MARRIAGE_DATE = "marriage_date";

const eventTypes = [
  {
    id: 0,
    value: BIRTH_DATE,
    name: "Birth",
    pluralName: "Your birthday",
  },
  {
    id: 1,
    value: MARRIAGE_DATE,
    name: "anniversary",
    pluralName: "Your marriage anniversary",
  },
];

const generateCelebrationReminderCampaignName = (campaignType, DaysBeforeExecute) =>
  `Campaign${englishNumberToPersianNumber(DaysBeforeExecute)} The day left${campaignType}`;

const generateCelebrationReminderSegmentName = (campaignType, DaysBeforeExecute) =>
  `Customers${englishNumberToPersianNumber(DaysBeforeExecute)} The day left${campaignType}`;

const discountCodeDefaultSms = (eventType) => {
  const eventName = eventTypes.find((evt) => evt.value === eventType).pluralName;
  return `Hello[Customer Name] Relative
${eventName} Congratulations. We wish you the best.
Our gift to you: [discount percent] discount percent
Use deadline: [The number of days to the end of credit] Day
[Business title]`;
};

const rewardDefaultSms = (eventType) => {
  const eventName = eventTypes.find((evt) => evt.value === eventType).pluralName;
  return `Hello[Customer Name] Relative
${eventName} Congratulations. We wish you the best.
Our gift to you: [The amount of credit] $
Use deadline: [The number of days to the end of credit]
[Business title]`;
};

const othersDefaultSms = (eventType) => {
  const eventName = eventTypes.find((evt) => evt.value === eventType).pluralName;
  return `Hello[Customer Name] Relative
${eventName} Congratulations. We wish you the best.
[Business title]`;
};

const defaultSmsContent = {
  [DISCOUNT_CODE]: discountCodeDefaultSms,
  [REWARD]: rewardDefaultSms,
  [OTHERS]: othersDefaultSms,
};

const initialCelebrationReminderState = {
  is_active: true,
  segment: {
    data: {
      customer_related_date: {},
    },
  },
  periodic_task: {
    one_off: false,
    crontab: {},
  },
  action: {
    type: DISCOUNT_CODE,
    sms: defaultSmsContent[DISCOUNT_CODE](MARRIAGE_DATE),
  },
};

const isNumberValid = (num) => !isNaN(Number(num)) && num.trim().length > 0;

const useCelebrationReminderDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const { state, write, insert, selectionRangeChange } = useTextfieldCursor();

  const _createCelebrationReminder = (data, callback) => dispatch(createCampaignBySegment(data, callback));
  const _updateCelebrationReminder = (id, data, callback) => dispatch(updateCampaignBySegment(id, data, callback));
  const _getCampaignBySegment = (id, cb) => dispatch(getCampaignBySegment(id, cb));

  const isCelebrationReminderLoading = useSelector(makeSelectLoading(GET_CAMPAIGN_BY_SEGMENT));
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());

  const celebrationReminderId = router.query.id;
  const isCreatingNewCelebrationReminder = celebrationReminderId === "new";

  const [celebrationReminder, setCelebrationReminder] = useState(initialCelebrationReminderState);
  const [isSmsFieldActive, setIsSmsFieldActive] = useState(!isCreatingNewCelebrationReminder);
  const handleActivateSmsField = () => setIsSmsFieldActive(true);
  const handleDeActiveSmsField = () => setIsSmsFieldActive(false)

  useEffect(() => {
    setTimeout(() => {
      if (isCreatingNewCelebrationReminder) return;
      _getCampaignBySegment(celebrationReminderId, (state) => {
        setCelebrationReminder(state)
        write(state?.action?.sms ?? "")
      });
    }, 0);
  }, []);
  
  const handleNavigateBack = () => router.push(`${adminUrlPrefix}/crm/celebration_reminder/`);


  const submit = () => {
    const { segment } = celebrationReminder;

    const eventName = eventTypes.find((evt) => evt.value === segment.data.customer_related_date.date_type)?.name ?? "";

    const _celebrationReminder = structuredClone(celebrationReminder);
    const convertedSmsContent = replacePersinaSmsKeywordWithEnglish(state.content);

    const campaignName = generateCelebrationReminderCampaignName(eventName, segment.data.customer_related_date.from);
    const segmentName = generateCelebrationReminderSegmentName(eventName, segment.data.customer_related_date.from);

    _celebrationReminder.action.sms = convertedSmsContent;
    _celebrationReminder.title = campaignName;
    _celebrationReminder.segment.title = segmentName;

    if (isCreatingNewCelebrationReminder) {
      _createCelebrationReminder(_celebrationReminder , handleNavigateBack);
    } else {
      delete _celebrationReminder.periodic_task
      _updateCelebrationReminder(celebrationReminderId, _celebrationReminder, handleNavigateBack);
    }
  };

  const handleEventTypeChange = (e) => {
    const { value } = e.target;
    const _celebrationReminder = structuredClone(celebrationReminder);

    if (!isSmsFieldActive) {
      write(defaultSmsContent[_celebrationReminder.action.type](value))
    }

    _celebrationReminder.segment.data.customer_related_date.date_type = value;
    setCelebrationReminder(_celebrationReminder);
  };

  const handleDaysBeforeExecuteChange = (e) => {
    const { value } = e.target;
    const englishValue = persianToEnglishNumber(value);
    const _celebrationReminder = structuredClone(celebrationReminder);
    const isValidNumber = isNumberValid(englishValue);
    _celebrationReminder.segment.data.customer_related_date.from = Number(englishValue) * 1;
    _celebrationReminder.segment.data.customer_related_date.to = Number(englishValue) * -1;
    if (!isValidNumber) {
      delete _celebrationReminder.segment.data.customer_related_date.from;
      delete _celebrationReminder.segment.data.customer_related_date.to;
    }
    setCelebrationReminder(_celebrationReminder);
  };

  const onTimeToExecuteChange = (time) => {
    const _celebrationReminder = structuredClone(celebrationReminder);
    const date = new Date(time);
    _celebrationReminder.periodic_task.crontab.hour = date.getHours();
    _celebrationReminder.periodic_task.crontab.minute = date.getMinutes();
    setCelebrationReminder(_celebrationReminder);
  };

  const handleGiftTypeChange = (_, newGiftType) => {
    const _celebrationReminder = structuredClone(celebrationReminder);

    if (!isSmsFieldActive) {
      const smsContent = defaultSmsContent[newGiftType](
        _celebrationReminder?.segment?.data?.customer_related_date?.date_type ?? MARRIAGE_DATE
      );
      write(smsContent);
    }
    _celebrationReminder.action.type = newGiftType;
    setCelebrationReminder(_celebrationReminder);
  };

  const handleDiscountAmountChange = (e) => {
    const { value } = e.target;
    const englishValue = persianToEnglishNumber(value);
    const isValidNumber = isNumberValid(englishValue);
    const _celebrationReminder = structuredClone(celebrationReminder);
    _celebrationReminder.action.discount_percent = englishValue;
    if (!isValidNumber) {
      delete _celebrationReminder.action.discount_percent;
    }
    setCelebrationReminder(_celebrationReminder);
  };

  const handleRewardAmountChange = (e) => {
    const { value } = e.target;
    const englishValue = persianToEnglishNumber(value);
    const isValidNumber = isNumberValid(englishValue);
    const _celebrationReminder = structuredClone(celebrationReminder);
    _celebrationReminder.action.amount = englishValue;
    if (!isValidNumber) {
      delete _celebrationReminder.action.amount;
    }
    setCelebrationReminder(_celebrationReminder);
  };

  const handleDeadlineChange = (e) => {
    const { value } = e.target;
    const englishValue = persianToEnglishNumber(value);
    const isValidNumber = isNumberValid(englishValue);
    const _celebrationReminder = structuredClone(celebrationReminder);
    _celebrationReminder.action.expiration = englishValue;
    if (!isValidNumber) {
      delete _celebrationReminder.action.expiration;
    }
    setCelebrationReminder(_celebrationReminder);
  };

  const handleSmsContentChange = (e) => {
    const { value } = e.target;
    write(value)
  };

  const handleSmsKeywordsClick = (value) => {
    insert(value)
  };

  const isFormValidForSubmit = useMemo(() => {
    const { action, periodic_task, segment } = celebrationReminder;
    if (!action.type) return false;
    if (segment?.data?.customer_related_date?.from + segment?.data?.customer_related_date?.to !== 0) return false;
    if (!segment?.data?.customer_related_date?.date_type) return false;
    if (isNaN(Number(periodic_task.crontab.hour)) || isNaN(Number(periodic_task.crontab.minute))) return false;

    switch (action.type) {
      case DISCOUNT_CODE: {
        if (isNaN(Number(action.discount_percent))) return false;
        return true;
      }
      case REWARD: {
        if (isNaN(Number(action.amount))) return false;
        return true;
      }
      default:
        return true;
    }
  }, [celebrationReminder]);

  const handleSetDefaultSmsField = () =>{
    const _celebrationReminder = structuredClone(celebrationReminder);
    const {action , segment} = _celebrationReminder
    write(defaultSmsContent[action?.type](segment?.data?.customer_related_date?.date_type ?? BIRTH_DATE));
    setCelebrationReminder(_celebrationReminder);
    handleDeActiveSmsField()
  }

  return {
    theme,
    state,
    selectionRangeChange,
    isSmsFieldActive,
    isCelebrationReminderLoading,
    giftTypes,
    DISCOUNT_CODE,
    OTHERS,
    smsKeywordsMap,
    eventTypes,
    isFormValidForSubmit,
    isCreatingNewCelebrationReminder,
    celebrationReminder,
    handleSmsContentChange,
    handleSmsKeywordsClick,
    handleActivateSmsField,
    handleNavigateBack,
    handleEventTypeChange,
    handleDiscountAmountChange,
    handleGiftTypeChange,
    handleRewardAmountChange,
    handleDeadlineChange,
    handleSetDefaultSmsField,
    submit,
    onTimeToExecuteChange,
    handleDaysBeforeExecuteChange,
  };
};

export { useCelebrationReminderDetails };
