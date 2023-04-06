import { useEffect, useState } from "react";
import { makeSelectInternalLinks } from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import { getPluginsInternalLinks } from "@saas/stores/plugins/actions";
import {
  getCrmSegments,
  getAutomatedProcess,
  updateAutomatedProcess,
} from "store/actions";
import {
  makeSelectAutomatedProcess,
  makeSelectCrmSegments,
} from "store/selectors";

import { makeSelectBusiness } from "@saas/stores/business/selector";
import { useSelector, useDispatch } from "react-redux";
import { SMS, CASHBACK, REWARD, POINT, DISCOUNT_CODE } from "../../constants";

import { createAutomatedProcess } from "store/actions";
import { isNullish } from "utils/helpers";
import { actionDelayTypes, SAVE_MODAL } from "../../constants";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { GET_AUTOMATED_PROCESS_BY_ID } from "store/constants";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";


const EXPIRATION = "EXPIRATION";
const CASHBACK_AMOUNT = "CASHBACK_AMOUNT";
const USAGE_LIMITATION = "USAGE_LIMITATION";
const POINT_AMOUNT = "POINT_AMOUNT";
const POINT_BY_STEP = "POINT_BY_STEP";
const CODE_PERCENT = "CODE_PERCENT";
const DISCOUNT_CEILING_AMOUNT = "DISCOUNT_CEILING_AMOUNT";
const DISCOUNT_FLOOR_AMOUNT = "DISCOUNT_FLOOR_AMOUNT";
const DISCOUNT_EXPIRY = "DISCOUNT_EXPIRY"

const automatedProcessInitialState = {
  action: {},
  time_to_execute: {
    value: 0,
    type: actionDelayTypes[0].type,
  },
  is_active: true,
};

const CUSTOM_LINK = {
  link: "CUSTOM_LINK",
  label: "The desired link",
};

export function useAutomatedProcesses(props) {
  const { au } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const automatedProcessId = router.query.id;
  const isCreatingNewAutomatedProcess = automatedProcessId === "new";

  const [automatedProcessDetail, setAutomatedProcessDetail] = useState(
    automatedProcessInitialState
  );

  const [modals, setModalsState] = useState({
    SAVE_MODAL: false,
    CANCEL_MODAL: false,
  });
  const [settingActionsCanceled, setSettingActionsCanceled] = useState(false);

  const _getCrmSegments = (query) => dispatch(getCrmSegments(query));
  const _getInternalLinks = () => dispatch(getPluginsInternalLinks());

  const _getAutomatedProcess = (id) => dispatch(getAutomatedProcess(id));
  const _createAutomatedProcess = (data) =>
    dispatch(createAutomatedProcess(data));

  const _updateAutomatedProcess = (id, data) =>
    dispatch(updateAutomatedProcess(id, data));

  const isLoading = useSelector(makeSelectLoading(GET_AUTOMATED_PROCESS_BY_ID))
  const _crmSegments = useSelector(makeSelectCrmSegments());
  const business = useSelector(makeSelectBusiness());
  const internalLinks = useSelector(makeSelectInternalLinks());
  const automatedProcess = useSelector(makeSelectAutomatedProcess());

  const ACTION_FIELDS = {
    [CASHBACK]: [CASHBACK_AMOUNT, USAGE_LIMITATION, EXPIRATION],
    [SMS]: [],
    [REWARD]: [POINT_AMOUNT, EXPIRATION],
    [POINT]: [POINT_AMOUNT, EXPIRATION, POINT_BY_STEP],
    [DISCOUNT_CODE]: [
      CODE_PERCENT,
      DISCOUNT_CEILING_AMOUNT,
      DISCOUNT_EXPIRY
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      _getInternalLinks({});
    }, 0);
  }, []);

  const toggleModals = (modal) =>
    setModalsState({
      ...modals,
      [modal]: !modals[modal],
    });

  useEffect(() => {
    setTimeout(() => {
      _getCrmSegments({
        page:1,
        page_size:100
      });
      if (!isCreatingNewAutomatedProcess) {
        _getAutomatedProcess(automatedProcessId);
      }
    }, 0);
  }, [settingActionsCanceled]);
  const validateForm = () => {
    setDelayError(null);
    return true;
  };

  const submit = () => {
    toggleModals(SAVE_MODAL);
    const isValidForm = validateForm(automatedProcessDetail);
    if (!isValidForm) return;
    if (isCreatingNewAutomatedProcess) {
      _createAutomatedProcess(automatedProcessDetail);
    } else {
      _updateAutomatedProcess(automatedProcessId, automatedProcessDetail);
    }
    router.back();
  };

  useEffect(() => {
    if (
      !isCreatingNewAutomatedProcess &&
      automatedProcess &&
      Object.keys(automatedProcess).length != 0
    ) {
      if (automatedProcess.business) delete automatedProcess.business;
      setAutomatedProcessDetail(automatedProcess);
    } else {
      const _automatedProcessInitialState = { ...automatedProcessInitialState };
      _automatedProcessInitialState.event_type = au?.type;
      setAutomatedProcessDetail(_automatedProcessInitialState);
    }
  }, [automatedProcess]);

  const automatedTrendsSMSConstant = {
    profile_completed: {
      [SMS]: ({ businessTitle }) => (
        <div>
          {`Hello Dear{Customer Name}`}

          <div>
            Of that you completed your information at the Customer Club so that we can
            Thank you for a better service..
          </div>
          <div> {businessTitle} </div>
        </div>
      ),
      [POINT]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            Such a privilege to complete your information at the Customer Club
            He got.
          </div>
          <div>Total Score at Customer Club: -</div>
          <div> {businessTitle} </div>
        </div>
      ),
      [REWARD]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            Such a gift of credit to complete your information at the Customer Club to
            You belonged to be used in the next order.
          </div>

          <div>validity duration: -</div>
          <div>Total credit at the customer club: - $</div>

          <div>See the following link for use</div>
          <div>{`{link}`}</div>
          <div> {businessTitle} </div>
        </div>
      ),
      [DISCOUNT_CODE]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            {`To appreciate the completion of your profile information,{discount percent} discount percent*For minimum purchase{Buy floor} $* In the next purchase is intended for you.`}
          </div>
          <div> discount code: :</div>
          <div>validity duration:</div>

          <div>See the following link for use</div>
          <div>{`{link}`}</div>
          <div> {businessTitle} </div>
        </div>
      ),
    },
    shopping_order_accepted_event: {
      [CASHBACK]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            Such a USD to appreciate your purchase from{businessTitle} To
            The gift title was added to your credit.
          </div>

          <div>validity duration: -</div>
          <div>Total credit at the customer club: - $</div>

          <div>See the following link for use</div>
          <div>{`{link}`}</div>
          <div> {businessTitle} </div>
        </div>
      ),
      [SMS]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}

          <div>
            Because the customer{businessTitle} Thank you. Sincerely from your purchase
            We appreciate and hope to buy us again.
          </div>
          <div> {businessTitle} </div>
        </div>
      ),
      [POINT]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            Such a privilege to appreciate your purchase from{businessTitle} To
            The gift title was added to your points.
          </div>
          <div>Total Score at Customer Club: -</div>
          <div> {businessTitle} </div>
        </div>
      ),
      [REWARD]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            Such a USD to appreciate your purchase from{businessTitle} To
            The gift title was added to your credit.
          </div>

          <div>validity duration: -</div>
          <div>Total credit at the customer club: - $</div>

          <div>See the following link for use</div>
          <div>{`{link}`}</div>
          <div> {businessTitle} </div>
        </div>
      ),
      [DISCOUNT_CODE]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            {`To appreciate your purchase from{Business name} ،{discount percent} discount percent*For minimum purchase{Buy floor} $* In the next purchase is intended for you.`}
          </div>
          <div> discount code: :</div>
          <div>validity duration:</div>

          <div>See the following link for use</div>
          <div>{`{link}`}</div>
          <div> {businessTitle} </div>
        </div>
      ),
    },
    gift_from_inviter_link_event: {
      [SMS]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}

          <div>
            Of being to the crowd of customers{businessTitle} You are very pleased.
          </div>
          <div> {businessTitle} </div>
        </div>
      ),
      [POINT]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>Such a privilege was given to the customer's club.</div>
          <div>Total Score at Customer Club: -</div>
          <div> {businessTitle} </div>
        </div>
      ),
      [REWARD]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            Gift Credit Credit to the Customer Club
            Captured that can be used in the next order.
          </div>

          <div>validity duration: -</div>
          <div>Total credit at the customer club: - $</div>

          <div>See the following link for use</div>
          <div>{`{link}`}</div>
          <div> {businessTitle} </div>
        </div>
      ),
      [DISCOUNT_CODE]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            {`To appreciate your membership at the Customer Club{Business name}،{discount percent} discount percent*For minimum purchase{Buy floor} $* In the next purchase is intended for you.`}
          </div>
          <div> discount code: :</div>
          <div>validity duration:</div>

          <div>See the following link for use</div>
          <div>{`{link}`}</div>
          <div> {businessTitle} </div>
        </div>
      ),
    },
    survey_participation: {
      [SMS]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}

          <div>
            Since in the survey{businessTitle} Thank you. we hope so
            Be able to get better every day by using your opinion.
          </div>
          <div> {businessTitle} </div>
        </div>
      ),
      [POINT]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>Such a privilege was assigned to you in the poll.</div>
          <div>Total Score at Customer Club: -</div>
          <div> {businessTitle} </div>
        </div>
      ),
      [REWARD]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            This gift of gift credit was given to you in the poll, which in the poll
            The next order is usable.
          </div>

          <div>validity duration: -</div>
          <div>Total credit at the customer club: - $</div>

          <div>See the following link for use</div>
          <div>{`{link}`}</div>
          <div> {businessTitle} </div>
        </div>
      ),
      [DISCOUNT_CODE]: ({ businessTitle }) => (
        <div>
          {`Hello{Customer Name} Relative`}
          <div>
            {`
To appreciate the participation in the survey,{discount percent} discount percent*For minimum purchase{Buy floor} $* In the next purchase is intended for you.`}
          </div>
          <div> discount code: :</div>
          <div>validity duration:</div>

          <div>See the following link for use</div>
          <div>{`{link}`}</div>
          <div> {businessTitle} </div>
        </div>
      ),
    },
  };

  const [selectedLinkLabel, setSelectedLinkLabel] = useState("");
  const [delayError, setDelayError] = useState(null);

  const onNameChange = (e) => {
    const {value} = e.target
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.title = value;
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onTimeToExecuteTypeChange = (e) => {
    const {value} = e.target
    if (!value) return;
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.time_to_execute = {
      ..._automatedProcessDetail.time_to_execute,
      type: value,
    };
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onTimeToExecuteValueChange = (e) => {
    const {value} = e.target
    const englishNumber = persianToEnglishNumber(value)
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.time_to_execute = {
      ..._automatedProcessDetail.time_to_execute,
      value: Number(englishNumber),
    };
    if (!englishNumber) delete _automatedProcessDetail.time_to_execute.value;
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionTypeChange = (e) => {
    const value = e?.target?.value;
    if (!value) return;
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      type: value,
    };
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionExpirationChange = (e) => {
    const {value} = e.target
    const formatedValue = persianToEnglishNumber(value)
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      expiration: Number(formatedValue),
    };
    if (!formatedValue) delete _automatedProcessDetail.action.expiration;
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionAmountChange = (e) => {
    const {value} = e.target
    const formatedAmount = reversePriceFormatter(value)
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      amount: Number(formatedAmount),
    };
    if (!formatedAmount) delete _automatedProcessDetail.action.amount;
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionMaxCashbackChange = (e) => {
    const {value} = e.target
    const _automatedProcessDetail = { ...automatedProcessDetail };
    const formatedAmount = persianToEnglishNumber(value)
    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      max_cashback: Number(formatedAmount),
    };
    if (isNullish(formatedAmount) || formatedAmount.trim().length === 0)
      delete _automatedProcessDetail.action.max_cashback;
    delete _automatedProcessDetail.action.amount;
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionPriceDivisionAmount = (e) => {
    const {value} = e.target
    const _automatedProcessDetail = { ...automatedProcessDetail };
    const formatedAmount = persianToEnglishNumber(value)
    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      price_division_amount: +Number(formatedAmount),
    };
    if (!formatedAmount) delete _automatedProcessDetail.action.price_division_amount;
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionPercentChange = (e) => {
    const {value} = e.target
    const formatedPercent = persianToEnglishNumber(value)
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      percent: +Number(formatedPercent),
    };
    if (isNullish(formatedPercent) || formatedPercent.trim().length === 0)
      delete _automatedProcessDetail.action.percent;
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionSelectLinkChange = (e) => {
    const { link, label } = e?.target?.value;
    setSelectedLinkLabel(label);
    if (label === CUSTOM_LINK.label) return;
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      link: link,
    };
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionInputLinkChange = (e) => {
    const {value} = e.target
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      link: value,
    };
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onSegmentChange = (e) => {
    const value = e.target.value;
    const _automatedProcessDetail = { ...automatedProcessDetail };
    _automatedProcessDetail.segment = value;
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionDiscountPercentChange = (e) => {
    const {value} = e.target
    const formatedPercent = persianToEnglishNumber(value);
    const _automatedProcessDetail = JSON.parse(
      JSON.stringify(automatedProcessDetail)
    );

    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      discount_percent: Number(formatedPercent),
    };
    if(!formatedPercent) delete _automatedProcessDetail.action.discount_percent
    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionCeilingAmountChange = (e) => {
    const {value} = e.target
    const formatedPrice = reversePriceFormatter(value);
    const _automatedProcessDetail = JSON.parse(
      JSON.stringify(automatedProcessDetail)
    );

    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      discount_ceiling_amount: Number(formatedPrice),
    };

    if(!formatedPrice) delete _automatedProcessDetail.action.discount_ceiling_amount

    setAutomatedProcessDetail(_automatedProcessDetail);
  };

  const onActionFloorAmountChange = (e) => {
    const {value} = e.target
    const formatedPrice = reversePriceFormatter(value);

    const _automatedProcessDetail = JSON.parse(
      JSON.stringify(automatedProcessDetail)
    );

    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      discount_floor_amount: Number(formatedPrice),
    };

    if(!formatedPrice) delete _automatedProcessDetail.action.discount_floor_amount

    setAutomatedProcessDetail(_automatedProcessDetail);
  };


  const onDiscountExpiryChange = (e) => {
    const {value} = e.target
    const formatedNumber = persianToEnglishNumber(value)
    const _automatedProcessDetail = JSON.parse(
      JSON.stringify(automatedProcessDetail)
    );
    _automatedProcessDetail.action = {
      ..._automatedProcessDetail.action,
      expiration: Number(formatedNumber),
    };

    if(!formatedNumber) delete _automatedProcessDetail.action.expiration

    setAutomatedProcessDetail(_automatedProcessDetail);
  }

  return {
    router,
    isLoading,
    _crmSegments,
    CUSTOM_LINK,
    business,
    internalLinks,
    modals,
    setSettingActionsCanceled,
    au,
    submit,
    toggleModals,
    ACTION_FIELDS,
    automatedTrendsSMSConstant,
    selectedLinkLabel,
    automatedProcessDetail,
    onNameChange,
    onTimeToExecuteTypeChange,
    onTimeToExecuteValueChange,
    onActionTypeChange,
    EXPIRATION,
    CASHBACK_AMOUNT,
    USAGE_LIMITATION,
    POINT_AMOUNT,
    POINT_BY_STEP,
    DISCOUNT_EXPIRY,
    CODE_PERCENT,
    DISCOUNT_CEILING_AMOUNT,
    DISCOUNT_FLOOR_AMOUNT,
    onActionExpirationChange,
    onActionAmountChange,
    onActionMaxCashbackChange,
    onActionPriceDivisionAmount,
    onActionPercentChange,
    onActionSelectLinkChange,
    onActionInputLinkChange,
    onActionDiscountPercentChange,
    onActionFloorAmountChange,
    onActionCeilingAmountChange,
    onSegmentChange,
    delayError,
    onDiscountExpiryChange,
  };
}
