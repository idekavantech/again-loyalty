import { useEffect, useState, useMemo } from "react";
import {
  makeSelectCampaignItem,
  makeSelectCrmSegmentItem,
} from "store/selectors";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { CREDIT_EXPIRY_REMINDER } from "containers/AdminCRM/constants";
import {
  getCampaignById,
  getCrmSegments,
  createCampaign,
  updateCampaignById,
  getCrmSegment,
  setCrmSegment,
  createCrmSegment,
  updateCrmSegment,
} from "store/actions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { GET_CAMPAIGN_BY_ID } from "store/constants";
import useTheme from "@material-ui/core/styles/useTheme";
import { replacePersinaSmsKeywordWithEnglish } from "containers/AdminCRM/helpers/smsKeywords";

const generateDefaultSmsContent = (expiration_in_days) => {


  return `[MEMBERSHIP_NAME]  
${expiration_in_days || "---"} The day until the end of your gift credit is left.
The amount of credit: [CREDIT_AMOUNT]  $
[BUSINESS_TITLE]`
};

const crmSegmentDefaultState = {
  data: {
    mediums: [],
    satisfaction: [],
    credit_expires_in_days: 4,
  },
  labels: [],
  levels: [],
  title: "",
  variations: [],
};

const crmCampaignDefaultState = {
  title: "",
  action: {
    type: CREDIT_EXPIRY_REMINDER,
    sms: generateDefaultSmsContent(),
  },
  periodic_task: {
    one_off: true,
    is_active: false,
    crontab: {
      one_off: false,
    },
  },
};

const BUSINESS_TITLE = {
  name: "Business title",
  value: "BUSINESS_TITLE",
};

const MEMBERSHIP_NAME = {
  name: "Customer Name",
  value: "MEMBERSHIP_NAME",
};

const AMOUNT = {
  name: "the amount of",
  value: "AMOUNT",
};

const EXPIRY_DATE = {
  name: "Expiration date",
  value: "EXPIRY",
};

const CREDIT_AMOUNT = {
  name: "The amount of credit left to expire",
  value: "CREDIT_AMOUNT",
};

const EXPIRATION_TOOLTIP = "EXPIRATION_TOOLTIP";
const TIME_TOOLTIP = "TIME_TOOLTIP";

const smsDynamicKeysMap = [
  BUSINESS_TITLE,
  MEMBERSHIP_NAME,
  AMOUNT,
  EXPIRY_DATE,
  CREDIT_AMOUNT,
];

function useCampaignDetail() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const router = useRouter();
  const campaignId = router.query.id;
  const isCreatingNewCampaign = campaignId === "new";
  const business = useSelector(makeSelectBusiness());
  const _campaign = useSelector(makeSelectCampaignItem());
  const _segment = useSelector(makeSelectCrmSegmentItem());

  const _isCampaignLoading = useSelector(makeSelectLoading(GET_CAMPAIGN_BY_ID));

  const _getCampaignById = (id) => dispatch(getCampaignById(id));
  const _createCampaign = (data, callback) =>
    dispatch(createCampaign(data, callback));
  const _updateCampaign = (data, id, callback) =>
    dispatch(updateCampaignById(data, id, callback));

  const _setCrmSegment = (data) => dispatch(setCrmSegment(data));
  const _getCrmSegment = (segmentId) => dispatch(getCrmSegment(segmentId));

  const _getCrmSegments = (query) => dispatch(getCrmSegments(query));

  const _createSegement = (data, callback) =>
    dispatch(createCrmSegment(data, callback));

  const _updateSegment = (id, data, callback) =>
    dispatch(updateCrmSegment(id, data, callback));

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

  const navigateBack = () => {
    router.back();
  };

  const updateCampaignStatus = (status = false) => {
    const data = {
      is_active: status,
    };
    _updateCampaign(data, campaignDetail.id);
  };

  const [toggleCampaignStatusDialogOpen, setToggleCampaignStatusDialogOpen] =
    useState(false);

  const [isSmsFieldEnabled, setIsSmsFieldEnabled] = useState(false);

  const useDefaultSmsContent = useMemo(
    () => isCreatingNewCampaign && !isSmsFieldEnabled,
    [isCreatingNewCampaign, isSmsFieldEnabled]
  );

  const [isOpenTooltipOpen, setIsOpenToolipOpen] = useState({
    [EXPIRATION_TOOLTIP]: false,
    [TIME_TOOLTIP]: false,
  });

  const toggleTooltip = (type) => {
    setIsOpenToolipOpen((prevState) => {
      return { ...prevState, [type]: !prevState[type] };
    });
  };

  const disableTooltip = (type) => {
    setIsOpenToolipOpen((prevState) => {
      return { ...prevState, [type]: false };
    });
  };

  const [campaignDetail, setCampaignDetail] = useState(crmCampaignDefaultState);

  const [isSegmentCreated, setIsSegmentCreated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      _setCrmSegment(undefined);
      _getCrmSegments();
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
    if (_campaign && Object.keys(_campaign).length) {
      const { segment } = _campaign;
      setCampaignDetail(_campaign);
      _getCrmSegment(segment);
    }
  }, [_campaign]);

  const createExpiryCampaign = () => {
    const campaign = {
      ...campaignDetail,
      business: business.id,
    };
    campaign.action.type = CREDIT_EXPIRY_REMINDER;
    campaign.action.sms = replacePersinaSmsKeywordWithEnglish(campaign.action.sms)
    !isCreatingNewCampaign &&
      campaign.periodic_task &&
      delete campaign.periodic_task;
    return campaign;
  };

  useEffect(() => {
    console.log(isSegmentCreated , _segment)
    if (_segment && Object.keys(_segment).length) {
      if (isSegmentCreated) {
        const createdSegmentId = _segment.id;
        const campaign = createExpiryCampaign();
        _createCampaign(
          { ...campaign, segment: createdSegmentId },
          navigateBack
        );
        setIsSegmentCreated(false);
      }
    }
  }, [_segment, isSegmentCreated]);

  const createSegmentFromCampaign = () => {
    console.log(campaignDetail);
    const segmentTitle = `(${campaignDetail.title}) Reminder Campaign Customers`;
    const segmentExpiry = campaignDetail.action.expiration_in_days;
    const segment = {
      ...crmSegmentDefaultState,
      title: segmentTitle,
      data: {
        ...crmSegmentDefaultState.data,
        credit_expires_in_days: Number(segmentExpiry),
      },
    };
    return segment;
  };

  const updateCampaign = () => {
    const campaign = createExpiryCampaign();
    _updateCampaign(
      { ...campaign, segment: _segment.id },
      _campaign.id,
      navigateBack
    );
  };

  const submit = () => {
    const segment = createSegmentFromCampaign();
    if (isCreatingNewCampaign) {
      _createSegement(segment);
      setIsSegmentCreated(true);
    } else {
      _updateSegment(_segment.id, segment, updateCampaign);
    }
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

  const onCampaignSMSChange = (e) => {
    const _campaignDetail = { ...campaignDetail };
    _campaignDetail.action.sms = e;
    setCampaignDetail(_campaignDetail);
  };

  const onCampaignActionExpirationInDaysChange = (e) => {
    const { value } = e.target;
    const _campaignDetail = JSON.parse(JSON.stringify(campaignDetail));
    _campaignDetail.action.expiration_in_days = value;
    _campaignDetail.title = `Remember${value} The day left to expire`;
    useDefaultSmsContent &&
      (_campaignDetail.action.sms = generateDefaultSmsContent(value));
    if (!value) delete _campaignDetail.action.expiration_in_days;
    console.log(_campaignDetail);
    setCampaignDetail(_campaignDetail);
  };

  const onSmsKeyItemsClick = (smsKeyItem) => {
    const _campaignDetail = { ...campaignDetail };
    _campaignDetail.action = {
      ..._campaignDetail.action,
      sms: _campaignDetail.action.sms + ` [${smsKeyItem.value}]  `,
    };
    setCampaignDetail(_campaignDetail);
  };

  return {
    theme,
    isCreatingNewCampaign,
    _isCampaignLoading,
    campaignDetail,
    toggleCampaignStatusDialogOpen,
    updateCampaignStatus,
    submit,
    modals,
    onSmsKeyItemsClick,
    smsDynamicKeysMap,
    toggleCampaignStatusModal,
    toggleModals,
    onPeriodicTaskChange,
    onCampaignActionExpirationInDaysChange,
    onCampaignCrontabTimeChange,
    onCampaignSMSChange,
    toggleTooltip,
    disableTooltip,
    isOpenTooltipOpen,
    TIME_TOOLTIP,
    EXPIRATION_TOOLTIP,
    isSmsFieldEnabled,
    setIsSmsFieldEnabled,
  };
}

export { useCampaignDetail };
