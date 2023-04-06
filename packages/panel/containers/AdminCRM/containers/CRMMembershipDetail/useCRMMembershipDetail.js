import {
  addCreditTransaction,
  addCrmPoint,
  getCRMMembership,
} from "@saas/stores/business/actions";
import {
  makeSelectBusiness,
  makeSelectBusinessCRMMembershipById,
} from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { updateProfile } from "@saas/stores/user/actions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addGiftCreditTransaction,
  getLabels,
  getMembershipEventLogs,
  postCrmLogs,
} from "store/actions";
import {
  makeSelectCrmLabels,
  makeSelectMemberhsipEventLogsPagination,
  makeSelectMembershipEventLogs,
} from "store/selectors";
import useTheme from "@material-ui/core/styles/useTheme";
import { useEffect, useRef, useState } from "react";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { GET_CRM_MEMBERSHIP } from "@saas/stores/business/constants";
import Link from "next/link";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import moment from "moment-jalaali";
import { automatedProcessesActionsType } from "containers/AdminCRM/constants";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { useMediaQuery } from "@material-ui/core";

export const AUTOMATED_PROCESS_EXECUTED_FOR_CRM_MEMBERSHIP =
  "automated_process_executed_for_crm_membership";
export const GIFT_FROM_INVITER_LINK = "gift_from_inviter_link_event";

export const GIFT_CREDIT_MODIFIED = "gift_credit_modified";
export const POINT_CREDIT_MODIFIED = "point_credit_modified";
export const WALLET_CREDIT_MODIFIED = "wallet_credit_modified";

export const SHOPPING_ORDER_ACCEPTED_EVENT = "shopping_order_accepted_event";
export const SHOPPING_ORDER_EVENT = "shopping_order_event";
export const SURVEY_PARTICIPATION = "survey_participation";
export const PROFILE_COMPLITED = "profile_complited";
export const DISCOUNT_CODE_USED = "discount_code_used";
export const CAMPAIGN_EXECUTED_FOR_CRM_MEMBERSHIP =
  "campaign_executed_for_crm_membership";
export const CAMPAIGN_SMS_SENT = "campaign_sms_sent";
export const CASH_BACK_SMS_SENT = "cash_back_sms_sent";
export const SMS_FOR_MEMBERSHIP_SENT = "sms_for_membership_sent";

const INCREASE = "increase";
const DECREASE = "decrease";

const creditChangeEventTypes = {
  [INCREASE]: "Increase",
  [DECREASE]: "Decrease",
};

const defaultMembershipEventLogsQuery = {
  page: 0,
  page_size: 20,
};

export function useCRMMembershipDetail() {
  const dispatch = useDispatch();
  const business = useSelector(makeSelectBusiness());
  const isLoading = useSelector(makeSelectLoading(GET_CRM_MEMBERSHIP));
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const crmLabels = useSelector(makeSelectCrmLabels());
  const CRMMembership = useSelector(makeSelectBusinessCRMMembershipById());
  const membershipEventLogs = useSelector(makeSelectMembershipEventLogs());
  const membershipEventLogsPagination = useSelector(
    makeSelectMemberhsipEventLogsPagination()
  );

  const _getCRMLabels = () => dispatch(getLabels());
  const _getCRMMembership = (id) => dispatch(getCRMMembership(id));
  const _updateProfile = (id, data, callback) =>
    dispatch(updateProfile(id, data, callback));
  const _addCreditTransaction = (id, data) =>
    dispatch(addCreditTransaction(id, data));
  const _addGiftCreditTransaction = (id, data) =>
    dispatch(addGiftCreditTransaction(id, data));
  const _addNote = (data) => dispatch(postCrmLogs(data));
  const _setPointCredit = (id, data) => dispatch(addCrmPoint(id, data));
  const _getMemebershipEventLogs = (id, query) =>
    dispatch(getMembershipEventLogs(id, query));

  const router = useRouter();
  const CRMMembershipId = router.query.id;
  const theme = useTheme();
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const crmGiftCreditRef = useRef(null);
  const walletBalance = useRef(null);
  const [selectedLabels, setSelectedLabels] = useState({});
  const [isSearchModalOpen, toggleSearchModal] = useState(false);
  const [crmGiftCredit, setCrmGiftCredit] = useState("");
  const [crmPointCredit, setCrmPointCredit] = useState("");
  const [crmWalletCredit, setCrmWalletCredit] = useState("");
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const generateUILink = (title, link) => {
    if (!title || !link || link.includes("undefined")) return;
    return (
      <span
        className="text-nowrap pr-1 cursor-pointer"
        align="right"
        style={{
          fontWeight: 400,
          fontSize: 16,
          width: 160,
          minWidth: 100,
        }}
      >
        <span
          style={{
            borderBottom: "1px solid #87009B",
            color: "#87009B",
            fontSize: 14,
          }}
        >
          {" "}
          <Link href={`${adminUrlPrefix}${link}`}>{title}</Link>
        </span>
      </span>
    );
  };

  useEffect(() => {
    if (CRMMembership) {
      setCrmMemberShipData({
        ...crmMemberShipData,
        name: CRMMembership.name,
        user: { phone: CRMMembership?.user?.phone },
        point_credit: CRMMembership?.point_credit,
        birth_date: CRMMembership?.birth_date ?? null,
        marriage_date: CRMMembership?.marriage_date ?? null,
      });
    }
    setCrmWalletCredit(CRMMembership?.wallet_credit);
    setCrmGiftCredit(CRMMembership?.gift_credit);
    setCrmPointCredit(CRMMembership?.point_credit);
  }, [CRMMembership]);

  useEffect(() => {
    if (selectedLabels && Object.keys(selectedLabels)?.length) {
      setCrmMemberShipData({
        ...crmMemberShipData,
        labels: [...Object.keys(selectedLabels)],
      });
    }
  }, [selectedLabels]);

  useEffect(() => {
    setTimeout(() => {
      _getCRMLabels();
      if (CRMMembershipId && CRMMembershipId != "new") {
        _getCRMMembership(CRMMembershipId);
        _getMemebershipEventLogs(CRMMembershipId, {
          ...membershipLogsQuery,
          page: membershipLogsQuery.page + 1,
        });
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (CRMMembership) {
      const _selectedLabels = CRMMembership?.labels?.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
      setSelectedLabels(_selectedLabels);
    }
  }, [CRMMembership]);

  const submit = () => {
    const callback = () => {
      if (crmPointCredit !== CRMMembership?.point_credit) {
        _setPointCredit(CRMMembershipId, {
          point_credit: Number(crmPointCredit),
        });
      }
      if (crmWalletCredit !== CRMMembership?.wallet_credit) {
        const _crmWalletCredit =
          reversePriceFormatter(crmWalletCredit) - CRMMembership?.wallet_credit;
        _addCreditTransaction(CRMMembershipId, {
          amount: _crmWalletCredit,
          source: "owner",
        });
      }
      if (crmGiftCredit !== CRMMembership?.gift_credit) {
        const _crmGiftCredit =
          reversePriceFormatter(crmGiftCredit) - CRMMembership?.gift_credit;
        _addGiftCreditTransaction(CRMMembershipId, {
          amount: _crmGiftCredit,
          source: "owner",
        });
      }
    };

    _updateProfile(CRMMembershipId, crmMemberShipData, callback);
  };

  const handleSelectInput = (selectedInput) => {
    selectedInput?.current?.focus();
  };

  const [crmMemberShipData, setCrmMemberShipData] = useState({
    business: business.id,
    name: "",
    user: { phone: "" },
    point_credit: "",
    labels: [],
  });

  const [memberhsipsLogPrevDate, setMemberhsipsLogPrevDate] = useState(null);

  const [membershipLogsQuery, setMembershipLogsQuery] = useState(
    defaultMembershipEventLogsQuery
  );

  const onPageChange = (e, newPage) => {
    setMembershipLogsQuery((prevState) => {
      return {
        ...prevState,
        page: newPage,
      };
    });
  };
  const onPageSizeChange = (e) => {
    const { value } = e.target;
    setMembershipLogsQuery((prevState) => {
      return {
        ...prevState,
        page: 0,
        page_size: value,
      };
    });
  };

  useEffect(() => {
    _getMemebershipEventLogs(CRMMembershipId, {
      ...membershipLogsQuery,
      page: membershipLogsQuery.page + 1,
    });
  }, [membershipLogsQuery]);

  const onBirthDateChange = (date) => {
    const _CRMMembership = JSON.parse(JSON.stringify(crmMemberShipData));
    _CRMMembership.birth_date = persianToEnglishNumber(
      date?.format("YYYY-MM-DD")
    );
    setCrmMemberShipData(_CRMMembership);
  };

  const onMarriageDateChange = (date) => {
    const _CRMMembership = JSON.parse(JSON.stringify(crmMemberShipData));
    _CRMMembership.marriage_date = persianToEnglishNumber(
      date?.format("YYYY-MM-DD")
    );
    setCrmMemberShipData(_CRMMembership);
  };

  const userReportTypes = {
    [AUTOMATED_PROCESS_EXECUTED_FOR_CRM_MEMBERSHIP]: (event) => {
      const { data, created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>
          Automated process <b>{data.automated_process_title}</b> Ran for customer 
          </span>

          {created_at && (
            <span>
              {englishNumberToPersianNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },

    // [GIFT_FROM_INVITER_LINK]: (event) => {
    //   const { created_at } = event;

    //   return (
    //     <div className="d-flex justify-content-between px-2">
    //       <span style={{ maxWidth: "60%" }}>Membership in the club</span>
    //       {created_at && (
    //         <span>
    //           {englishNumberToPersianNumber(moment(created_at).format("HH:mm"))}
    //         </span>
    //       )}
    //     </div>
    //   );
    // },

    [GIFT_CREDIT_MODIFIED]: (event) => {
      const { data, created_at } = event;

      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>
            {creditChangeEventTypes[data.operation]} Gift credit  in the amount of {" "}
            <b>{priceFormatter(data.amount)}$</b> Due to :{data.reason}{" "}
            {data.operation === INCREASE &&
              data.expiry &&
              moment(data.expiry).isValid() &&
              `Expiration date${persianToEnglishNumber(
                moment(data.expiry).format("jYYYY/jMM/jDD")
              )}`}
          </span>

          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },

    [POINT_CREDIT_MODIFIED]: (event) => {
      const { data, created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>
            {creditChangeEventTypes[data.operation]} point credit in the amount of {" "}
            <b>{priceFormatter(data.amount)}$</b> Due to : {data.reason}{" "}
            {data.operation === INCREASE &&
              data.expiry &&
              moment(data.expiry).isValid() &&
              `Expiration date${persianToEnglishNumber(
                moment(data.expiry).format("jYYYY/jMM/jDD")
              )}`}
          </span>

          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },

    [WALLET_CREDIT_MODIFIED]: (event) => {
      const { data, created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>
            {creditChangeEventTypes[data.operation]} wallet credit in the amount of
            <b>{priceFormatter(data.amount)}</b> $ Due to : {data.reason}{" "}
            {data.operation === INCREASE &&
              data.expiry &&
              moment(data.expiry).isValid() &&
              `Expiration date${persianToEnglishNumber(
                moment(data.expiry).format("jYYYY/jMM/jDD")
              )}`}
          </span>

          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },

    [SHOPPING_ORDER_ACCEPTED_EVENT]: (event) => {
      const { data, created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>
            Confirm the order in the amount of <b>{priceFormatter(data.order_price)}$</b>
            {generateUILink("View order", `s/orders/${data.order_id}`)}
          </span>

          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },

    [SHOPPING_ORDER_EVENT]: (event) => {
      const { data, created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>
            Register an order in the amount of <b>{priceFormatter(data.order_price)}$</b>
            {generateUILink("View order", `s/orders/${data.order_id}`)}
          </span>

          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },

    [SURVEY_PARTICIPATION]: (event) => {
      const { created_at } = event;

      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>Participate in survey</span>
          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },

    [CAMPAIGN_SMS_SENT]: (event) => {
      const { created_at } = event;

      return (
        <div className="d-flex justify-content-between px-2">
          {" "}
          <span style={{ maxWidth: "60%" }}>Campaign SMS sent for customer</span>
          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },
    [CASH_BACK_SMS_SENT]: (event) => {
      const { created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>Cashback SMS sent for customer</span>
          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },
    [PROFILE_COMPLITED]: (event) => {
      const { created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>Complete the profile</span>
          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },

    [DISCOUNT_CODE_USED]: (event) => {
      const { data, created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>
            Customer used <b>{data.code}</b> discount code
            {generateUILink("View order", `s/orders/${data.order_id}`)}
          </span>
          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },

    [CAMPAIGN_EXECUTED_FOR_CRM_MEMBERSHIP]: (event) => {
      const { data, created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>
          <b>{data.campaign_title}</b> Campaign executed for customer
            {generateUILink(
              "view campaign",
              `crm/campaign/details/${data.campaign_id}`
            )}
          </span>

          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },
    [SMS_FOR_MEMBERSHIP_SENT]: (event) => {
      const { data, created_at } = event;
      return (
        <div className="d-flex justify-content-between px-2">
          <span style={{ maxWidth: "60%" }}>
            SMS for customer sent because{data.sms_type}
          </span>

          {created_at && (
            <span>
              {persianToEnglishNumber(moment(created_at).format("HH:mm"))}
            </span>
          )}
        </div>
      );
    },
  };

  return {
    memberhsipsLogPrevDate,
    isMobile,
    membershipLogsQuery,
    isLoading,
    membershipEventLogsPagination,
    userReportTypes,
    membershipEventLogs,
    adminUrlPrefix,
    crmLabels,
    CRMMembership,
    router,
    theme,
    walletBalance,
    crmPointCredit,
    isSearchModalOpen,
    crmWalletCredit,
    isAddNoteModalOpen,
    crmMemberShipData,
    crmGiftCredit,
    crmGiftCreditRef,
    openSaveModal,
    selectedLabels,
    setOpenSaveModal,
    setSelectedLabels,
    toggleSearchModal,
    submit,
    setCrmWalletCredit,
    setAddNoteModalOpen,
    handleSelectInput,
    setCrmMemberShipData,
    setCrmGiftCredit,
    _addNote,
    setCrmPointCredit,
    onBirthDateChange,
    setMemberhsipsLogPrevDate,
    onMarriageDateChange,
    onPageChange,
    onPageSizeChange,
  };
}
