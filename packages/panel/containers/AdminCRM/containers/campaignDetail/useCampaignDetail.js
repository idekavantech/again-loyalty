import { useCallback, useEffect, useReducer, useState } from "react";
import { makeSelectCampaignItem, makeSelectCrmSegments, makeSelectCrmSegmentItem } from "store/selectors";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import {
  CREDIT_EXPIRY_REMINDER,
  SMS,
  CASHBACK,
  REWARD,
  POINT,
  DISCOUNT_CODE,
  BUSINESS_TITLE_KEYWORD,
  MEMBERSHIP_NAME_KEYWORD,
  AMOUNT_KEYWORD,
  EXPIRY_DATE_KEYWORD,
  CREDIT_AMOUNT_KEYWORD,
  MEMBERSHIP_TOTAL_GIFT_KEYWORD,
  DISCOUNT_CODE_KEYWORD,
  DISCOUNT_PERCENT_KEYWORD,
  DISCOUNT_CEILING_KEYWORD,
  DISCOUNT_FLOOR_KEYWORD,
} from "containers/AdminCRM/constants";
import {
  getCampaignById,
  getCrmSegments,
  createCampaign,
  updateCampaignById,
  getCrmSegment,
  setCrmSegment,
} from "store/actions";
import { useRouter } from "next/router";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { GET_CAMPAIGN_BY_ID } from "store/constants";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

import {
  replacePersinaSmsKeywordWithEnglish,
  replaceEnglishSmsKeywordsWithPersian,
} from "containers/AdminCRM/helpers/smsKeywords";

const smsInitialState = {
  content: "",
  selectedStart: null,
  selectedEnd: null,
};

const smsActions = {
  write: "write",
  setDefault: "setDefault",
  insertKeyword: "insertKeyword",
  setSelectedRange: "setSelectedRange",
  convertPersian: "convertToPersian",
  convertEnglish: "convertEnglish",
};

const smsReducer = (state, action) => {
  switch (action.type) {
    case smsActions.write: {
      return { ...state, content: action.data };
    }
    case smsActions.setSelectedRange: {
      return { ...state, selectedStart: action.data.from, selectedEnd: action.data.to };
    }
    case smsActions.convertEnglish: {
      return { ...state, content: replacePersinaSmsKeywordWithEnglish(state.content) };
    }
    case smsActions.convertPersian: {
      return { ...state, content: replaceEnglishSmsKeywordsWithPersian(state.content) };
    }
    case smsActions.setDefault: {
      return { ...state, content: defaultSmsContent() };
    }
    case smsActions.insertKeyword: {
      const { selectedStart: from, selectedEnd: to, content } = state;
      const { keyword } = action.data;

      const sms = replaceEnglishSmsKeywordsWithPersian(content);
      const sentenceBeforeKeyword = sms.slice(0, from);
      const sentenceAfterKeywordHasPadding = sentenceBeforeKeyword.trimEnd().length !== sentenceBeforeKeyword.length;
      const sentenceAfterKeyword = sms.slice(to, sms.length);
      const sentenceBeforeKeywordHasPadding = sentenceAfterKeyword.trimStart().length !== sentenceAfterKeyword.length;
      const newExpiryReminderSms = `${sentenceBeforeKeyword}${sentenceAfterKeywordHasPadding ? "" : " "}[${keyword}]${
        sentenceBeforeKeywordHasPadding || !sentenceAfterKeyword.trim.length === 0 ? "" : " "
      }${sentenceAfterKeyword}`;
      return { ...state, content: newExpiryReminderSms };
    }
    default:
      throw new Error(`${action.type} is not a sms action`);
  }
};

const smsDynamicKeysMap = {
  [SMS]: [BUSINESS_TITLE_KEYWORD, MEMBERSHIP_NAME_KEYWORD],

  [CASHBACK]: [BUSINESS_TITLE_KEYWORD, MEMBERSHIP_NAME_KEYWORD],

  [POINT]: [BUSINESS_TITLE_KEYWORD, MEMBERSHIP_NAME_KEYWORD, AMOUNT_KEYWORD, EXPIRY_DATE_KEYWORD],

  [REWARD]: [BUSINESS_TITLE_KEYWORD, MEMBERSHIP_NAME_KEYWORD, AMOUNT_KEYWORD, EXPIRY_DATE_KEYWORD],

  [CREDIT_EXPIRY_REMINDER]: [
    BUSINESS_TITLE_KEYWORD,
    MEMBERSHIP_NAME_KEYWORD,
    MEMBERSHIP_TOTAL_GIFT_KEYWORD,
    AMOUNT_KEYWORD,
    EXPIRY_DATE_KEYWORD,
    CREDIT_AMOUNT_KEYWORD,
  ],

  [DISCOUNT_CODE]: [
    BUSINESS_TITLE_KEYWORD,
    MEMBERSHIP_NAME_KEYWORD,
    DISCOUNT_CODE_KEYWORD,
    DISCOUNT_PERCENT_KEYWORD,
    DISCOUNT_CEILING_KEYWORD,
    DISCOUNT_FLOOR_KEYWORD,
  ],
};

function useCampaignDetail() {
  const dispatch = useDispatch();

  const router = useRouter();
  const campaignId = router.query.id;
  const isCreatingNewCampaign = campaignId === "new";

  const _crmSegments = useSelector(makeSelectCrmSegments());
  const _campaignItem = useSelector(makeSelectCampaignItem());
  const business = useSelector(makeSelectBusiness());
  const segment = useSelector(makeSelectCrmSegmentItem());

  const _getCrmSegments = (query) => dispatch(getCrmSegments(query));
  const _getCampaignById = (id) => dispatch(getCampaignById(id));
  const _createCampaign = (data) => dispatch(createCampaign(data));
  const _updateCampaign = (data, id) => dispatch(updateCampaignById(data, id));
  const _getCrmSegment = (segmentId) => dispatch(getCrmSegment(segmentId));
  const _setCrmSegment = (data) => dispatch(setCrmSegment(data));

  const isLoading = useSelector(makeSelectLoading(GET_CAMPAIGN_BY_ID));
  const toggleModals = (modal) =>
    setModalsState({
      ...modals,
      [modal]: !modals[modal],
    });

  const toggleCampaignStatusModal = () => {
    setToggleCampaignStatusDialogOpen((prevState) => !prevState);
  };

  const [modals, setModalsState] = useState({
    SAVE_MODAL: false,
    CANCEL_MODAL: false,
  });

  const submit = () => {
    const _campaignDetails = { ...campaignDetail };
    _campaignDetails.action.sms = replacePersinaSmsKeywordWithEnglish(smsState.content);
    if (isCreatingNewCampaign) {
      _createCampaign(_campaignDetails);
    } else {
      const formatedCampaign = { ..._campaignDetails };
      formatedCampaign.business && delete formatedCampaign.business;
      formatedCampaign.history_logs && delete formatedCampaign.history_logs;
      formatedCampaign.id && delete formatedCampaign.id;
      formatedCampaign.updated_at && delete formatedCampaign.updated_at;
      formatedCampaign.periodic_task && delete formatedCampaign.periodic_task;
      _updateCampaign(formatedCampaign, campaignDetail.id);
    }
  };

  const updateCampaignStatus = (status = false) => {
    const data = {
      is_active: status,
    };
    _updateCampaign(data, campaignDetail.id);
  };

  const [toggleCampaignStatusDialogOpen, setToggleCampaignStatusDialogOpen] = useState(false);

  const [campaignDetail, setCampaignDetail] = useState({
    business: business.id,
    action: {},
    periodic_task: {
      one_off: true,
      is_active: false,
      crontab: {},
    },
  });

  const [smsState, smsDispatch] = useReducer(smsReducer, smsInitialState);

  useEffect(() => {
    setTimeout(() => {
      _setCrmSegment(undefined);
      _getCrmSegments({
        page: 1,
        page_size: 100,
      });
      if (!isCreatingNewCampaign) _getCampaignById({ id: campaignId });
      else {
        setCampaignDetail({
          business: business.id,
          title: "",
          action: {
            sms: "",
          },
          periodic_task: {
            one_off: true,
            is_active: false,
            crontab: {},
          },
        });
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (!_campaignItem || Object.keys(_campaignItem).length !== 0) {
      setCampaignDetail(_campaignItem);
      smsDispatch({ type: smsActions.write, data: _campaignItem.action.sms });
    }
  }, [_campaignItem]);

  useEffect(() => {
    if (!campaignDetail.segment) return;
    _getCrmSegment(campaignDetail.segment);
  }, [campaignDetail?.segment]);

  let selectRangeTimeout = null;

  const handleSmsSelectionChange = useCallback((e) =>{
    const { selectionStart, selectionEnd } = e.target ?? {};
    if (selectRangeTimeout) {
      clearTimeout(selectRangeTimeout)
      selectRangeTimeout = null;
    }

    selectRangeTimeout = setTimeout(()=>{
      smsDispatch({
        type: smsActions.setSelectedRange,
        data: { from: selectionStart ?? null, to: selectionEnd ?? null },
      });
    },500)
  },[])


  const onPeriodicTaskOneOffClick = (e) => {
    const _campaignDetail = { ...campaignDetail };
    const oneOffValue = !Boolean(e.target.value);
    if (oneOffValue) {
      delete _campaignDetail.periodic_task.expires;
    }
    _campaignDetail.periodic_task.one_off = oneOffValue;
    setCampaignDetail(_campaignDetail);
  };

  const onPeriodicTaskChange = () => {
    if (isCreatingNewCampaign) {
      const _campaignDetail = { ...campaignDetail };
      _campaignDetail.is_active = !_campaignDetail?.is_active;
      setCampaignDetail(_campaignDetail);
    } else {
      const campaignStatus = campaignDetail?.is_active;
      if (campaignStatus) toggleCampaignStatusModal();
      else updateCampaignStatus(!campaignDetail?.is_active);
    }
  };

  const onCampaignNameChange = (e) => {
    const value = e.target;
    const _campaignDetail = { ...campaignDetail };
    _campaignDetail.title = value.value;
    setCampaignDetail(_campaignDetail);
  };

  const onCampaignSegmentsChange = (e) => {
    const _campaignDetail = { ...campaignDetail };
    _campaignDetail.segment = e.target.value;
    setCampaignDetail(_campaignDetail);
  };

  const onCampaignStartTimeChange = (date) => {
    const formatedDate = moment(date).locale("en").format("YYYY-MM-DDTHH:mm:ss");

    const _campaignDetail = { ...campaignDetail };
    _campaignDetail.periodic_task = {
      ..._campaignDetail.periodic_task,
      start_time: formatedDate,
    };
    setCampaignDetail(_campaignDetail);
  };

  const onCampaignActionTypeChange = (e) => {
    const _campaignDetail = { ...campaignDetail };
    const campaginType = e.target.value;
    _campaignDetail.action.type = campaginType;
    if (campaginType === SMS) {
      delete _campaignDetail.action.amount;
      delete _campaignDetail.action.expiration;
      delete _campaignDetail.action.discount_ceiling_amount;
      delete _campaignDetail.action.discount_percent;
      delete _campaignDetail.action.discount_floor_amount;
      delete _campaignDetail.action.expiration_in_days;
    }
    if (campaginType === REWARD || campaginType === POINT) {
      delete _campaignDetail.action.discount_ceiling_amount;
      delete _campaignDetail.action.discount_percent;
      delete _campaignDetail.action.discount_floor_amount;
      delete _campaignDetail.action.expiration_in_days;
    }
    if (campaginType === CREDIT_EXPIRY_REMINDER) {
      delete _campaignDetail.action.amount;
      delete _campaignDetail.action.expiration;
      delete _campaignDetail.action.discount_ceiling_amount;
      delete _campaignDetail.action.discount_percent;
      delete _campaignDetail.action.discount_floor_amount;
    }
    if (campaginType === DISCOUNT_CODE) {
      delete _campaignDetail.action.amount;
      delete _campaignDetail.action.expiration;
      delete _campaignDetail.action.expiration_in_days;
    }
    setCampaignDetail(_campaignDetail);
  };

  const onCampaignActionAmountChange = (e) => {
    const { value } = e.target;
    const _campaignDetail = { ...campaignDetail };
    const formatedValue = reversePriceFormatter(value);
    _campaignDetail.action.amount = Number(formatedValue);

    setCampaignDetail(_campaignDetail);
  };

  const onCampaignActionExpirationChange = (e) => {
    const value = e.target;
    const _campaignDetail = { ...campaignDetail };
    const formatedValue = persianToEnglishNumber(value.value);
    _campaignDetail.action.expiration = Number(formatedValue);
    if (value.length === 0) delete _campaignDetail.action.expiration;
    setCampaignDetail(_campaignDetail);
  };

  const onCampaignPeriodicTaskExpiresChange = (date) => {
    const formatedDate = moment(date).locale("en").format("YYYY-MM-DDTHH:mm:ss");

    const _campaignDetail = { ...campaignDetail };
    _campaignDetail.periodic_task = {
      ..._campaignDetail.periodic_task,
      expires: formatedDate,
    };
    setCampaignDetail(_campaignDetail);
  };

  const onCampaignCrontabTimeChange = (date) => {
    const _campaignDetail = { ...campaignDetail };
    const formatedDate = new Date(date);
    const hour = formatedDate.getHours().toString();
    const minute = formatedDate.getMinutes().toString();
    _campaignDetail.periodic_task.crontab = {
      ..._campaignDetail.periodic_task.crontab,
      hour,
      minute,
    };
    setCampaignDetail(_campaignDetail);
  };

  const onCamapignCrontabDayOfWeekChange = (e) => {
    const _campaignDetail = { ...campaignDetail };
    const selectedElement = e.target.value.pop();
    if (
      _campaignDetail.periodic_task?.crontab?.day_of_week
        ?.split(",")
        .map((item) => Number(item))
        .includes(selectedElement)
    ) {
      let newWeekDayValue = _campaignDetail.periodic_task?.crontab?.day_of_week?.split(",");

      newWeekDayValue = newWeekDayValue.filter((item) => Number(item) !== selectedElement);
      _campaignDetail.periodic_task.crontab.day_of_week = newWeekDayValue.join(",");
      if (_campaignDetail.periodic_task.crontab.day_of_week.trim().length === 0) {
        delete _campaignDetail.periodic_task.crontab.day_of_week;
      }
    } else {
      _campaignDetail.periodic_task.crontab.day_of_week = _campaignDetail.periodic_task.crontab.day_of_week
        ? _campaignDetail.periodic_task.crontab.day_of_week.concat(`,${selectedElement}`)
        : `${selectedElement}`;
    }

    setCampaignDetail(_campaignDetail);
  };

  const onCampaignSMSChange = (e) => {
    const {value} = e.target
    smsDispatch({ type: smsActions.write, data: value });
  };

  const onCampaignActionExpirationInDaysChange = (e) => {
    const { value } = e.target;
    const _campaignDetail = { ...campaignDetail };
    _campaignDetail.action.expiration_in_days = value;
    if (!value) delete _campaignDetail.action.expiration_in_days;
    setCampaignDetail(_campaignDetail);
  };

  const onSmsKeyItemsClick = (smsKeyItem) => {
    const {value} = smsKeyItem
    smsDispatch({ type: smsActions.insertKeyword, data: { keyword: value } });
  };

  const onCampaignActionDiscountPercentChange = (e) => {
    const { value } = e.target;
    const _campaignDetail = JSON.parse(JSON.stringify(campaignDetail));
    const formatedValue = persianToEnglishNumber(value);
    _campaignDetail.action = {
      ..._campaignDetail.action,
      discount_percent: Number(formatedValue),
    };
    if (!formatedValue) delete _campaignDetail.action.discount_percent;

    setCampaignDetail(_campaignDetail);
  };

  const onCampaignActionDiscountFloorChange = (e) => {
    const { value } = e.target;
    const _campaignDetail = JSON.parse(JSON.stringify(campaignDetail));
    _campaignDetail.action = {
      ..._campaignDetail.action,
      discount_floor_amount: Number(value),
    };
    if (!value) delete _campaignDetail.action.discount_floor_amount;

    setCampaignDetail(_campaignDetail);
  };
  const onCampaignActionDiscountCeilingChange = (e) => {
    const { value } = e.target;
    const _campaignDetail = JSON.parse(JSON.stringify(campaignDetail));
    const formatedValue = reversePriceFormatter(value);
    _campaignDetail.action = {
      ..._campaignDetail.action,
      discount_ceiling_amount: Number(formatedValue),
    };
    if (!formatedValue) delete _campaignDetail.action.discount_ceiling_amount;

    setCampaignDetail(_campaignDetail);
  };

  const onCampignActionDiscountExpirationChange = (e) => {
    const { value } = e.target;
    const _campaignDetail = JSON.parse(JSON.stringify(campaignDetail));
    const formatedValue = persianToEnglishNumber(value);
    _campaignDetail.action = {
      ..._campaignDetail.action,
      expiration: Number(formatedValue),
    };
    if (!formatedValue) delete _campaignDetail.action.expiration;

    setCampaignDetail(_campaignDetail);
  };

  return {
    segment,
    router,
    isLoading,
    isCreatingNewCampaign,
    _crmSegments,
    campaignDetail,
    setCampaignDetail,
    smsDynamicKeysMap,
    toggleCampaignStatusDialogOpen,
    updateCampaignStatus,
    submit,
    modals,
    smsState,
    toggleCampaignStatusModal,
    toggleModals,
    onPeriodicTaskOneOffClick,
    onPeriodicTaskChange,
    onCampaignNameChange,
    onCampaignSegmentsChange,
    onCampaignStartTimeChange,
    onCampaignActionTypeChange,
    onCampaignActionAmountChange,
    onCampaignActionExpirationChange,
    onCampaignPeriodicTaskExpiresChange,
    onCampaignCrontabTimeChange,
    onCamapignCrontabDayOfWeekChange,
    onCampaignSMSChange,
    onCampaignActionExpirationInDaysChange,
    onSmsKeyItemsClick,
    handleSmsSelectionChange,
    onCampaignActionDiscountPercentChange,
    onCampaignActionDiscountFloorChange,
    onCampaignActionDiscountCeilingChange,
    onCampignActionDiscountExpirationChange,
    replaceEnglishSmsKeywordsWithPersian,
  };
}

export { useCampaignDetail };
