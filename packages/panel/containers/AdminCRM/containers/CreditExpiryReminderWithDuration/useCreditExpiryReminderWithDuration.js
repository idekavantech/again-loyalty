import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  createCrmSegment,
  getCampaignById,
  updateCrmSegment,
  getCampaignList,
  createCampaign,
  updateCampaignById,
} from "store/actions";
import { makeSelectCampaignItem, makeSelectCampaignList, makeSelectCrmSegmentItem } from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  CREATE_CAMPAIGN,
  CREATE_CRM_SEGMENT,
  GET_CAMPAIGN_BY_ID,
  GET_CAMPAIGN_LIST,
  GET_CRM_SEGMENT_BY_ID,
} from "store/constants";
import { CREDIT_EXPIRY_REMINDER } from "../../constants";
import { replaceEnglishSmsKeywordsWithPersian, replacePersinaSmsKeywordWithEnglish } from "../../helpers/smsKeywords";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";


const defaultSmsContent = () => `Hello [Customer Name] dear,
You have a remaining gift credit of [The amount of credit left to expire] $ in the [Business Title] Customer Club, which is valid for [The number of days to the end of credit] days for use.`


const smsInitialState = {
  content: defaultSmsContent(),
  selectedStart: null,
  selectedEnd: null,
};

const smsActions = {
  write: "write",
  setDefault:'setDefault',
  insertKeyword:"insertKeyword",
  setSelectedRange:"setSelectedRange",
  convertPersian: "convertToPersian",
  convertEnglish: "convertEnglish",
};

const smsReducer = (state , action)=>{
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
    case smsActions.setDefault :{
      return { ...state, content: defaultSmsContent() };
    }
    case smsActions.insertKeyword : {
      const { selectedStart: from, selectedEnd: to , content } = state;
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
}

const creditExpiryReminderTemplateCampaign = {
  // title: "",
  is_active: true,
  action: {
    type: CREDIT_EXPIRY_REMINDER,
    // expiration_in_days: 1
    //sms : "",
  },
  periodic_task: {
    one_off: false,
    // crontab: {},
  },
};

const creditExpiryReminderTemplateSegment = {
  // title: "",
  data: {
    mediums: [],
    satisfaction: [],
    // credit_expires_in_days: 4,
  },
  labels: [],
  levels: [],
  variations: [],
};

const generateCreditExpiryReminderCampaignName = (expiration_in_days) =>
  expiration_in_days ? `Reminding Campaign${expiration_in_days}` : null;

const generateCreditExpiryReminderSegmentName = (expiration_in_days) => {
  const campaignName = generateCreditExpiryReminderCampaignName(expiration_in_days);
  return `Customers(${campaignName})`;
};

const generateCreditExpiryReminderCampaign = ({ title, expiration_in_days, sms, crontab }) => {
  const result = {
    ...creditExpiryReminderTemplateCampaign,
    title,
    action: { ...creditExpiryReminderTemplateCampaign.action, expiration_in_days, sms },
    periodic_task: { ...creditExpiryReminderTemplateCampaign.periodic_task, crontab },
  };
  if (!crontab) delete result.periodic_task;
  return result;
};

const generateCreditExpiryReminderSegment = ({ title, credit_expires_in_days }) => {
  return {
    ...creditExpiryReminderTemplateSegment,
    title,
    data: { ...creditExpiryReminderTemplateSegment.data, credit_expires_in_days },
  };
};


const crontabToReadableTime = (crontab) => {
  if (!crontab || isNaN(Number(crontab.hour)) || isNaN(Number(crontab.minute))) return "";
  const { hour, minute } = crontab;
  const formattedHour = ("0" + hour).slice(-2);
  const formattedMinutes = ("0" + minute).slice(-2);
  return englishNumberToPersianNumber(`${formattedHour}:${formattedMinutes}`);
};

const defaultCampaignFilters = {
  action: CREDIT_EXPIRY_REMINDER,
};

const useCreditExpiryReminderWithDuration = () => {
  //!SECTION init hooks
  const { maxWidth768 } = useResponsive();
  const theme = useTheme();
  const dispatch = useDispatch();
  //!SECTION dispatchers

  // campaigns
  const _updateCrmSegment = (data, id, cb) => dispatch(updateCrmSegment(id, data, cb));
  const _createCrmSegment = (data, cb) => dispatch(createCrmSegment(data, cb));

  // segments
  const _getCrmCampaigns = (query) => dispatch(getCampaignList(query));
  const _getCrmCampaignById = (data, cb) => dispatch(getCampaignById(data, cb));
  const _createCampaign = (data, cb) => dispatch(createCampaign(data, cb));
  const _updateCrmCampaign = (data, id, cb) => dispatch(updateCampaignById(data, id, cb));

  //!SECTION selectors

  // campaigns
  const _campaignList = useSelector(makeSelectCampaignList());
  const _campaignDetail = useSelector(makeSelectCampaignItem());
  const _isCampaignItemLoading = useSelector(makeSelectLoading(GET_CAMPAIGN_BY_ID));
  const _isCampaignListLoading = useSelector(makeSelectLoading(GET_CAMPAIGN_LIST)) ?? true;

  // segments
  const _segmentDetail = useSelector(makeSelectCrmSegmentItem());
  const _isSegmentDetailLoading = useSelector(makeSelectLoading(GET_CRM_SEGMENT_BY_ID));
  const _isCreateSegmentLoading = useSelector(makeSelectLoading(CREATE_CAMPAIGN));
  const _isCreateCampaignLoading = useSelector(makeSelectLoading(CREATE_CRM_SEGMENT));

  //!SECTION states
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [expiryReminderDetailId, setExpiryReminderDetailId] = useState(null);

  const [expirationInDays, setExpirationInDays] = useState("");
  const [expirationInDaysError, setExpirationInDaysError] = useState(false);

  const [timeToExecute, setTimeToExecute] = useState("");
  const [isEditSmsActive, setIsEditSmsActive] = useState(false);

  const [campaignList, setCampaignList] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isCampaignAssuranceIsActiveModalOpen, setIsCampaignAssuranceIsActiveModalOpen] = useState(false);

  const [selectedSegmentId, setSelectedSegmentId] = useState(null);

  const [smsState, smsDispatch] = useReducer(smsReducer, smsInitialState);

  //SECTION - drive states

  const isCreatingNewReminder = useMemo(() => expiryReminderDetailId === null, [expiryReminderDetailId]);

  const haveNoExpiryReminder = useMemo(
    () => !_isCampaignListLoading && _campaignList?.length === 0,
    [_isCampaignListLoading, _campaignList]
  );

  const isActiveSubmitBtn = useMemo(() => {
    return (
      !_isCreateSegmentLoading &&
      !_isCreateCampaignLoading &&
      expirationInDays?.trim().length > 0 &&
      Object.keys(timeToExecute).length > 0 &&
      !isNaN(Number(timeToExecute.hour)) &&
      !isNaN(Number(timeToExecute.minute))
    );
  }, [expirationInDays, timeToExecute, _isCreateSegmentLoading, _isCreateCampaignLoading]);

  const getCreditExpiryReminderCampaigns = () => {
    _getCrmCampaigns({
      filters: defaultCampaignFilters,
    });
  };
  //!SECTION side effects

  useEffect(() => {
    setTimeout(() => {
      getCreditExpiryReminderCampaigns();
    }, 0);
  }, []);

  useEffect(() => {
    setCampaignList(_campaignList);
  }, [_campaignList]);

  //!SECTION functions and utils

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

  const updateCampaignListItem = (campaignDetail) => {
    const _campaignList = campaignList.map((campaignListItem) => {
      const isUpdatedItem = campaignListItem.id === campaignDetail.id;
      return isUpdatedItem ? campaignDetail : campaignListItem;
    });
    setCampaignList(_campaignList);
    setSelectedCampaign(null);
  };

  const updateCampaignIsActive = (campaignId, status = true, cb) => {
    const data = {
      is_active: status,
    };
    _updateCrmCampaign(data, campaignId, cb);
  };

  const handleActiveSmsContent = () => setIsEditSmsActive(true);
  const handleOpenDetailModal = () => setIsDetailModalOpen(true);
  const handleCloseDetailModal = () => setIsDetailModalOpen(false);
  const handleOpenCampaignIsActiveAssuranceModal = () => setIsCampaignAssuranceIsActiveModalOpen(true);
  const handleCloseCampaignIsActiveAssuranceModal = () => setIsCampaignAssuranceIsActiveModalOpen(false);

  const handleSubmitCampaignIsActiveAssuranceModal = () => {
    updateCampaignIsActive(selectedCampaign.id, false, updateCampaignListItem);
    handleCloseCampaignIsActiveAssuranceModal();
  };

  const handleToggleCampaignIsActive = (campaignId) => {
    const campaignDetails = campaignList.find((campaignItem) => campaignItem.id === campaignId);
    if (!campaignId || !campaignDetails) return;
    const { is_active, id } = campaignDetails;
    if (is_active) {
      setSelectedCampaign(campaignDetails);
      handleOpenCampaignIsActiveAssuranceModal();
    } else {
      updateCampaignIsActive(id, true, updateCampaignListItem);
    }
  };

  const resetFormState = () => {
    setExpirationInDays("");
    setTimeToExecute("");
    setIsEditSmsActive(false);
    setExpirationInDaysError(false);
    smsDispatch({type:smsActions.setDefault})
  };

  const applyFormStateToModal = (formData) => {
    const {
      periodic_task: { crontab },
      action,
      segment,
    } = formData;
    const crontabData = { hour: Number(crontab.hour), minute: Number(crontab.minute) };
    const smsData = action.sms ?? defaultSmsContent();
    setSelectedSegmentId(segment);
    setExpirationInDays(action.expiration_in_days.toString());
    setTimeToExecute(crontabData);
    setIsEditSmsActive(false);
    setExpirationInDaysError(false);
    smsDispatch({ type: smsActions.write, data: smsData });
  };

  const handleCreateNewCampaign = () => {
    setExpiryReminderDetailId(null);
    handleOpenDetailModal();
    resetFormState();
  };

  const handleEditCampaign = (campaignId) => {
    setExpiryReminderDetailId(campaignId);
    _getCrmCampaignById({ id: campaignId }, applyFormStateToModal);
    handleOpenDetailModal();
  };

  //SECTION - user input change handlers

  const onExpirationInDaysChange = (e) => {
    const { value } = e.target;
    const englishValue = persianToEnglishNumber(value);
    if (isNaN(Number(englishValue))) return;
    setExpirationInDays(englishValue);
  };

  const onTimeToExecuteChange = (time) => {
    const _timeToExecute = { ...timeToExecute };
    const date = new Date(time);
    _timeToExecute.hour = date.getHours();
    _timeToExecute.minute = date.getMinutes();
    setTimeToExecute(_timeToExecute);
  };

  const onSmsChange = (e) => {
    const { value } = e.target;
    smsDispatch({ type: smsActions.write, data: value });
  };

  //SECTION -

  const insertText = (keyword) => {
    if (!keyword) return;
    smsDispatch({ type: smsActions.insertKeyword, data: { keyword } });
  };

  const validate = () => {
    if (Number(expirationInDays) < 1) {
      setExpirationInDaysError(true);
      return false;
    } else {
      setExpirationInDaysError(false);
    }
    return true;
  };

  const createCampaignCallback = () => {
    handleCloseDetailModal();
    getCreditExpiryReminderCampaigns();
    resetFormState();
  };

  const createSegmentCallback = (campaignData) => (segmentData) => {
    if (!campaignData || !segmentData || !segmentData.id) return;
    const { id } = segmentData;
    const campaignWithSegmentId = { ...campaignData, segment: id };
    _createCampaign(campaignWithSegmentId, createCampaignCallback);
  };

  const onSubmitCreateNewExpiryReminder = (formData) => {
    const { expiration_in_days, sms, crontab } = formData;
    const segmentName = generateCreditExpiryReminderSegmentName(expiration_in_days);
    const campaignName = generateCreditExpiryReminderCampaignName(expiration_in_days);
    const segmentData = generateCreditExpiryReminderSegment({
      title: segmentName,
      credit_expires_in_days: expiration_in_days,
    });
    const campaignData = generateCreditExpiryReminderCampaign({
      title: campaignName,
      expiration_in_days: expiration_in_days,
      sms,
      crontab,
    });
    _createCrmSegment(segmentData, createSegmentCallback(campaignData));
  };

  const cleanUpStatesAfterUpdate = () => {
    resetFormState();
    handleCloseDetailModal();
    getCreditExpiryReminderCampaigns();
  };

  const updateCampaign = (campaignData, campaignId) => {
    _updateCrmCampaign(campaignData, campaignId, cleanUpStatesAfterUpdate);
  };

  const onSubmitUpdateExpiryReminder = (formData, campaignId, segmentId) => {
    if (!campaignId || !segmentId || !formData) return;
    const { expiration_in_days, sms } = formData;
    const segmentName = generateCreditExpiryReminderSegmentName(expiration_in_days);
    const campaignName = generateCreditExpiryReminderCampaignName(expiration_in_days);
    const segmentData = generateCreditExpiryReminderSegment({
      title: segmentName,
      credit_expires_in_days: expiration_in_days,
    });
    const campaignData = generateCreditExpiryReminderCampaign({
      title: campaignName,
      expiration_in_days: expiration_in_days,
      sms,
    });

    _updateCrmSegment(segmentData, segmentId, () => updateCampaign(campaignData, campaignId));
  };

  const submit = () => {
    const isFormDataValid = validate();
    if (!isFormDataValid) return;
    const expiration_in_days = Number(expirationInDays);
    const sms = replacePersinaSmsKeywordWithEnglish(smsState.content);
    const formData = { expiration_in_days, sms, crontab: timeToExecute };
    if (isCreatingNewReminder) {
      onSubmitCreateNewExpiryReminder(formData);
    } else {
      onSubmitUpdateExpiryReminder(formData, expiryReminderDetailId, selectedSegmentId);
    }
  };

  return {
    _campaignDetail,
    _segmentDetail,
    _isCampaignItemLoading,
    _isCampaignListLoading,
    _isSegmentDetailLoading,
    smsState,
    expirationInDays,
    expirationInDaysError,
    isActiveSubmitBtn,
    isEditSmsActive,
    timeToExecute,
    isCampaignAssuranceIsActiveModalOpen,
    campaignList,
    haveNoExpiryReminder,
    theme,
    isDetailModalOpen,
    maxWidth768,
    expiryReminderDetailId,
    isCreatingNewReminder,
    submit,
    handleSmsSelectionChange,
    handleActiveSmsContent,
    handleToggleCampaignIsActive,
    onExpirationInDaysChange,
    onTimeToExecuteChange,
    crontabToReadableTime,
    onSmsChange,
    handleCreateNewCampaign,
    handleOpenCampaignIsActiveAssuranceModal,
    handleCloseCampaignIsActiveAssuranceModal,
    handleSubmitCampaignIsActiveAssuranceModal,
    insertText,
    handleEditCampaign,
    handleOpenDetailModal,
    handleCloseDetailModal,
    setExpiryReminderDetailId,
  };
};

export { useCreditExpiryReminderWithDuration };
