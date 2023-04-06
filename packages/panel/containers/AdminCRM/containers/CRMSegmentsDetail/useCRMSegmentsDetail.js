import { useEffect, useMemo, useState } from "react";
import {
  getAdminAllProducts,
  getCrmLevels,
  getCrmSegment,
  getLabels,
  setCrmSegment,
} from "store/actions";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import useTheme from "@material-ui/core/styles/useTheme";
import { GET_CRM_SEGMENT_BY_ID, satisfactionChoices } from "store/constants";
import {
  makeSelectAdminAllProducts,
  makeSelectCrmLabels,
  makeSelectCrmLevels,
  makeSelectCrmSegmentItem,
  makeSelectCrmSegments,
} from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { useRouter } from "next/router";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import { useSelector, useDispatch } from "react-redux";
import { createCrmSegment, updateCrmSegment } from "store/actions";

export function useCRMSegmentsDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const isLoading = useSelector(makeSelectLoading(GET_CRM_SEGMENT_BY_ID));
  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const _crmLevels = useSelector(makeSelectCrmLevels());
  const _crmLabels = useSelector(makeSelectCrmLabels());
  const _crmSegments = useSelector(makeSelectCrmSegments());
  const business = useSelector(makeSelectBusiness());
  const CRMPluginData = useSelector(makeSelectPlugin(CRM_PLUGIN));
  const _crmSegment = useSelector(makeSelectCrmSegmentItem());
  const allAdminVariations = useSelector(makeSelectAdminAllProducts());

  const _getAllAdminVariations = (slug) => dispatch(getAdminAllProducts(slug));
  const _getCRMLabels = () => dispatch(getLabels());
  const _getCrmLevels = () => dispatch(getCrmLevels());
  const _getCrmSegment = (id) => dispatch(getCrmSegment(id));
  const _createNewSegment = (data) => dispatch(createCrmSegment(data));
  const _updateCrmSegment = (id, data) => dispatch(updateCrmSegment(id, data));
  const _setSelectedCrmSegment = (data) => dispatch(setCrmSegment(data));

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isOpenTooltip , setIsOpenToolip] = useState(false)

  const UNSET = "UNSET";
  const TODAY = "TODAY";
  const CUSTOM_DATE_RANGE = "CUSTOM_DATE_RANGE";

  const segmentsEventDateType = [
    {
      type: "MARRIAGE_DATE",
      description: "The date of marriage",
    },
    {
      type: "BIRTH_DATE",
      description: "Date of birth",
    },
  ];

  const segmentEventValueTypes = [
    {
      type: TODAY,
      description: "Select the day",
    },
    {
      type: CUSTOM_DATE_RANGE,
      description: "Choosing the interval",
    },
  ];

  const crmSegmentInitialState = {
    title: "New section",
    levels: [],
    labels: [],
    data: {
      satisfaction: [],
      mediums: [],
    },
  };

  const segmentId = router.query.id;
  const isCreatingNewSegment = segmentId === "new";

  const [crmSegmentDetails, setCrmSegmentDetails] = useState(
    crmSegmentInitialState
  );

  const [isUsingDateRange, setIsUsingDateRange] = useState(false);

  const variationList = useMemo(() => {
    return (
      allAdminVariations
        .map((product) => {
          return product.variations;
        })
        .flat() ?? []
    );
  }, [allAdminVariations]);

  useEffect(() => {
    setTimeout(() => {
      _getAllAdminVariations(business.slug);
      _getCRMLabels();
      _getCrmLevels();
      if (!isCreatingNewSegment) _getCrmSegment(segmentId);
    }, 0);
  }, []);

  useEffect(() => {
    if (!_crmSegment || Object.keys(_crmSegment).length === 0) return;

    const segment = { ..._crmSegment };
    if (segment.business) delete segment.business;

    const isRelatedDateRangeZero =
      segment.data.customer_related_date &&
      segment.data.customer_related_date.from &&
      segment.data.customer_related_date.to &&
      segment.data.customer_related_date.from +
        segment.data.customer_related_date.to ===
        0;

    const levels =
      Array.isArray(segment?.levels) && segment.levels?.length > 0
        ? segment.levels
        : [];

    const labels =
      Array.isArray(segment?.labels) && segment.labels?.length > 0
        ? segment.labels
        : [];

    const newCrmSegment = Object.assign(crmSegmentInitialState, {
      ...segment,
      levels,
      labels,
    });

    setIsUsingDateRange(!isRelatedDateRangeZero);
    setCrmSegmentDetails(newCrmSegment);
  }, [_crmSegment]);

  const submit = () => {
    if (isCreatingNewSegment) {
      _createNewSegment(crmSegmentDetails);
    } else {
      _updateCrmSegment(segmentId, crmSegmentDetails);
    }
    _setSelectedCrmSegment({});
  };

  const { utm: { description_choices = [] } = {} } = CRMPluginData?.data;

  const segmentMediums = crmSegmentDetails?.data?.mediums || [];
  const selectableMediums = description_choices?.length
    ? description_choices
    : crmSegmentDetails?.mediums;

  const onSegmentNameChange = (e) => {
    const newCustomerSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    newCustomerSegment.title = e.target.value;
    setCrmSegmentDetails(newCustomerSegment);
  };

  const onOrderFilterFromChange = (e) => {
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));

    newCrmSegment.data.shopping_order = {
      ...newCrmSegment?.data?.shopping_order,
      count: {
        ...newCrmSegment?.data?.shopping_order?.count,
        from: +e.target.value,
      },
    };
    if (e.target.value === "") {
      delete newCrmSegment?.data?.shopping_order.count.from;
    }
    setCrmSegmentDetails(newCrmSegment);
  };

  const onOrderFilterToChange = (e) => {
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));

    newCrmSegment.data.shopping_order = {
      ...newCrmSegment?.data?.shopping_order,
      count: {
        ...newCrmSegment?.data?.shopping_order?.count,
        to: +e.target.value,
      },
    };
    if (e.target.value === "") {
      delete newCrmSegment?.data?.shopping_order.count.to;
    }
    setCrmSegmentDetails(newCrmSegment);
  };

  const onOrderFilterAmountFromChange = (e) => {
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    newCrmSegment.data.shopping_order = {
      ...newCrmSegment?.data?.shopping_order,
      total: {
        ...newCrmSegment?.data?.shopping_order?.total,
        from: +e.target.value,
      },
    };
    if (e.target.value === "") {
      delete newCrmSegment?.data?.shopping_order.total.from;
    }
    setCrmSegmentDetails(newCrmSegment);
  };

  const onOrderFilterAmountToChange = (e) => {
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    newCrmSegment.data.shopping_order = {
      ...newCrmSegment?.data?.shopping_order,
      total: {
        ...newCrmSegment?.data?.shopping_order?.total,
        to: +e.target.value,
      },
    };
    if (e.target.value === "") {
      delete newCrmSegment?.data?.shopping_order.total.to;
    }
    setCrmSegmentDetails(newCrmSegment);
  };

  const handleCRMLevelClick = () => {
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));

    if (crmSegmentDetails?.levels?.length) {
      newCrmSegment.levels = [];
      setCrmSegmentDetails(newCrmSegment);
    } else {
      newCrmSegment.levels = _crmLevels?.map((level) => level.id);
      setCrmSegmentDetails(newCrmSegment);
    }
  };

  const handleCRMLevelItemClick = (e, label) => {
    e.preventDefault();
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));

    if (crmSegmentDetails?.levels.includes(label.id)) {
      const newLabels = crmSegmentDetails?.levels.filter(
        (_label) => _label !== label.id
      );
      newCrmSegment.levels = [...newLabels];
      setCrmSegmentDetails(newCrmSegment);
    } else {
      newCrmSegment.levels = [...newCrmSegment.levels, label.id];
      setCrmSegmentDetails(newCrmSegment);
    }
  };

  const handleCRMSatisfactionClick = () => {
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    if (crmSegmentDetails?.data?.satisfaction?.length) {
      newCrmSegment.data = {
        ...newCrmSegment.data,
        satisfaction: [],
      };
      setCrmSegmentDetails(newCrmSegment);
    } else {
      newCrmSegment.data = {
        ...newCrmSegment.data,
        satisfaction: satisfactionChoices?.map((level) => level.id),
      };
      setCrmSegmentDetails(newCrmSegment);
    }
  };

  const handleCRMSatisfactionItemClick = (e, label) => {
    e.preventDefault();
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    if (crmSegmentDetails?.data?.satisfaction?.includes(label.id)) {
      const newLabels = crmSegmentDetails?.data?.satisfaction.filter(
        (_label) => _label !== label.id
      );
      newCrmSegment.data = {
        ...newCrmSegment.data,
        satisfaction: [...newLabels],
      };
      setCrmSegmentDetails(newCrmSegment);
    } else {
      newCrmSegment.data = {
        ...newCrmSegment.data,
        satisfaction: [...(newCrmSegment?.data?.satisfaction || []), label.id],
      };
      setCrmSegmentDetails(newCrmSegment);
    }
  };

  const handleCRMLabelClick = () => {
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));

    if (crmSegmentDetails?.labels?.length) {
      newCrmSegment.labels = [];
      setCrmSegmentDetails(newCrmSegment);
    } else {
      newCrmSegment.labels = _crmLabels?.map((level) => level.id);
      setCrmSegmentDetails(newCrmSegment);
    }
  };

  const handleCRMLabelItemClick = (e, label) => {
    e.preventDefault();
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));

    if (crmSegmentDetails?.labels.includes(label.id)) {
      const newLabels = crmSegmentDetails?.labels.filter(
        (_label) => _label !== label.id
      );
      newCrmSegment.labels = [...newLabels];
      setCrmSegmentDetails(newCrmSegment);
    } else {
      newCrmSegment.labels = [...newCrmSegment.labels, label.id];
      setCrmSegmentDetails(newCrmSegment);
    }
  };

  const handleCRMMediumsClick = () => {
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    if (crmSegmentDetails?.data?.mediums?.length) {
      newCrmSegment.data = {
        ...newCrmSegment.data,
        mediums: [],
      };
      setCrmSegmentDetails(newCrmSegment);
    } else {
      newCrmSegment.data.mediums = selectableMediums;
      newCrmSegment.data = {
        ...newCrmSegment.data,
        mediums: selectableMediums,
      };
      setCrmSegmentDetails(newCrmSegment);
    }
  };

  const handleCRMMediumsItemClick = (e, medium) => {
    e.preventDefault();
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    if (crmSegmentDetails?.data?.mediums?.includes(medium)) {
      const _mediums = crmSegmentDetails?.data?.mediums.filter(
        (_label) => _label !== medium
      );
      newCrmSegment.data = {
        ...newCrmSegment.data,
        mediums: [..._mediums],
      };
      setCrmSegmentDetails(newCrmSegment);
    } else {
      newCrmSegment.data = {
        ...newCrmSegment.data,
        mediums: [...(newCrmSegment.data?.mediums || []), medium],
      };
      setCrmSegmentDetails(newCrmSegment);
    }
  };

  const handleCRMProductIdsClick = () => {
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    if (newCrmSegment?.variations?.length === variationList?.length) {
      newCrmSegment.variations = [];
    } else {
      newCrmSegment.variations = variationList.map((item) => item.id);
    }
    setCrmSegmentDetails(newCrmSegment);
  };

  const handleCRMProductIdsItemClick = (e, product) => {
    e.preventDefault();
    const productId = Number(product.id);
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    if (crmSegmentDetails?.variations?.includes(productId)) {
      const newProducts = crmSegmentDetails?.variations.filter(
        (pid) => pid !== productId
      );
      newCrmSegment.variations = [...newProducts];
      setCrmSegmentDetails(newCrmSegment);
    } else {
      if (!newCrmSegment.variations) {
        newCrmSegment.variations = [productId];
      } else {
        newCrmSegment.variations = [...newCrmSegment.variations, productId];
      }
      setCrmSegmentDetails(newCrmSegment);
    }
  };

  const onSegmentEventValueTypeClick = (e) => {
    const value = e?.target?.value;
    if (!value) return;
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));

    switch (value) {
      case TODAY: {
        newCrmSegment.data.customer_related_date = {
          ...newCrmSegment.data.customer_related_date,
          from: 0,
          to: 0,
        };
        setIsUsingDateRange(false);
        break;
      }
      case CUSTOM_DATE_RANGE: {
        newCrmSegment.data.customer_related_date = {
          ...newCrmSegment.data.customer_related_date,
          from: 1,
          to: 1,
        };
        setIsUsingDateRange(true);
        break;
      }
    }
    setCrmSegmentDetails(newCrmSegment);
  };

  const onSegmentEventDateTypeClick = (e) => {
    const value = e?.target?.value;
    if (!value) return;
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    if (value === UNSET) {
      delete newCrmSegment.data.customer_related_date;
      setCrmSegmentDetails(newCrmSegment);
      return;
    }
    newCrmSegment.data.customer_related_date = {
      ...newCrmSegment.data.customer_related_date,
      date_type: value.toLowerCase(),
    };
    setCrmSegmentDetails(newCrmSegment);
  };

  const onSegmentDateFilterFromChange = (e) => {
    const value = e.target.value;
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    newCrmSegment.data.customer_related_date = {
      ...newCrmSegment.data.customer_related_date,
      from: Number(value),
    };
    if (!value) delete newCrmSegment.data.customer_related_date.from;
    setCrmSegmentDetails(newCrmSegment);
  };

  const onSegmentDateFilterToChange = (e) => {
    const value = e.target.value;
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    newCrmSegment.data.customer_related_date = {
      ...newCrmSegment.data.customer_related_date,
      to: Number(value),
    };
    if (!value) delete newCrmSegment.data.customer_related_date.to;
    setCrmSegmentDetails(newCrmSegment);
  };

  const onCreditExpireInChange = (e) => {
    const value = e.target.value;
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    newCrmSegment.data = {
      ...newCrmSegment.data,
      credit_expires_in_days: Number(value),
    };
    if (value.trim().length === 0) {
      delete newCrmSegment.data.credit_expires_in_days;
    }
    setCrmSegmentDetails(newCrmSegment);
  };

  const onLastSubmitedOrderChange = (e) => {
    const value = e.target.value;
    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    newCrmSegment.data = {
      ...newCrmSegment.data ,
      last_submitted_order_days : Number(value)
    }
    if (!value) delete newCrmSegment.data.last_submitted_order_days;
    setCrmSegmentDetails(newCrmSegment);
  };
  const onSegmentDateFilterChange = (e) => {
    const value = e.target.value;
    const newCrmSegmentDetails = JSON.parse(JSON.stringify(crmSegmentDetails));
    newCrmSegmentDetails.data.customer_related_date = {
      ...newCrmSegmentDetails.data.customer_related_date,
      from: Number(value) * -1,
      to: Number(value),
    };
    if (!value) {
      delete newCrmSegmentDetails.data.customer_related_date.from;
      delete newCrmSegmentDetails.data.customer_related_date.to;
    }
    setCrmSegmentDetails(newCrmSegmentDetails);
  };

  const onMinimumCreditChange = (e) => {
    const { value } = e.target;

    if(isNaN(Number(value))) return

    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));

    newCrmSegment.data = {
      ...newCrmSegment.data,
      gift_credit: { from: Number(value) },
    };

    if (!value)
      delete newCrmSegment.data.gift_credit;

    setCrmSegmentDetails(newCrmSegment);
  };

  const onNoEventInDaysChange = (e) => {
    const { value } = e.target;

    if(isNaN(Number(value))) return

    const newCrmSegment = JSON.parse(JSON.stringify(crmSegmentDetails));
    newCrmSegment.data = {
      ...newCrmSegment.data,
      no_event_in_days: Number(value),
    };
    if (!value)
      delete newCrmSegment.data.no_event_in_days;

    setCrmSegmentDetails(newCrmSegment);
  };

  return {
    isOpenTooltip,
    setIsOpenToolip,
    router,
    isLoading,
    theme,
    urlPrefix,
    _crmLevels,
    _crmLabels,
    _crmSegments,
    business,
    CRMPluginData,
    isSaveModalOpen,
    setIsSaveModalOpen,
    segmentMediums,
    selectableMediums,
    UNSET,
    TODAY,
    CUSTOM_DATE_RANGE,
    segmentsEventDateType,
    segmentEventValueTypes,
    isUsingDateRange,
    isCreatingNewSegment,
    setIsUsingDateRange,
    submit,
    onSegmentNameChange,
    onOrderFilterFromChange,
    onOrderFilterToChange,
    onOrderFilterAmountFromChange,
    onOrderFilterAmountToChange,
    handleCRMLevelClick,
    handleCRMLevelItemClick,
    handleCRMSatisfactionClick,
    handleCRMSatisfactionItemClick,
    handleCRMLabelClick,
    handleCRMLabelItemClick,
    handleCRMMediumsClick,
    handleCRMMediumsItemClick,
    handleCRMProductIdsClick,
    handleCRMProductIdsItemClick,
    onSegmentEventValueTypeClick,
    onSegmentEventDateTypeClick,
    onSegmentDateFilterFromChange,
    onSegmentDateFilterToChange,
    onCreditExpireInChange,
    onSegmentDateFilterChange,
    crmSegmentDetails,
    variationList,
    onLastSubmitedOrderChange,
    onMinimumCreditChange,
    onNoEventInDaysChange,
  };
}
