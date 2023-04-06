import { makeSelectLoading } from "@saas/stores/global/selectors";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCostsCategoriesList,
  getCostsList,
  getPaymentMethods,
} from "store/actions";
import { GET_COSTS_LIST } from "store/constants";
import {
  makeSelectCostsCategory,
  makeSelectCostsList,
  makeSelectCostsPagination,
  makeSelectPaymentMethods,
} from "store/selectors";
import jMoment from "moment-jalaali";
import { formatDateObjectToNormal } from "utils/helpers";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  tableHeaderModals,
  orderingColumns,
  orderingTypes,
} from "containers/AdminExpenses/constants";
import { useRouter } from "next/router";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";

const initialDateRange = {
  from: null,
  to: null,
};

const initialPriceRangeState = { from: null, to: null };
const initialCostFilters = {
  page: 0,
  pageSize: 10,
  paymentMethodIds: [],
  costsCategoryIds: [],
};

const invertOrdering = (ordering) => {
  if (!(ordering in orderingTypes)) return;
  if (ordering === orderingTypes.asc) return orderingTypes.desc;
  return orderingTypes.asc;
};

const MapedHeaderModals = Object.keys(tableHeaderModals);

const useExpensesList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { maxWidth768 } = useResponsive();

  const headerRefsInitialValue = Object.fromEntries(
    MapedHeaderModals.map((entry) => [entry, null])
  );

  const headerRefs = useRef(headerRefsInitialValue);

  const _getCostList = (query) => dispatch(getCostsList(query));
  const _getCostCategory = () => dispatch(getCostsCategoriesList());
  const _getPaymentMethods = () => dispatch(getPaymentMethods());

  const _costList = useSelector(makeSelectCostsList());
  const _costCategory = useSelector(makeSelectCostsCategory());
  const _paymentMethods = useSelector(makeSelectPaymentMethods());
  const _isCostListLoading = useSelector(makeSelectLoading(GET_COSTS_LIST));
  const costsPagination = useSelector(makeSelectCostsPagination());

  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());

  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState({});
  const [costListFilters, setCostListFilters] = useState(initialCostFilters);
  const [dateRangeFilter, setDateRangeFilter] = useState(initialDateRange);
  const [priceFilter, setPriceFilter] = useState(initialPriceRangeState);

  useEffect(() => {
    setTimeout(() => {
      _getCostCategory();
      _getPaymentMethods();
    }, 0);
  }, []);

  useEffect(() => {
    const orderFilters = { ...costListFilters };

    console.log(costListFilters);

    if (orderFilters.orderBy)
      orderFilters.orderBy = JSON.stringify(orderFilters.orderBy);

    if (orderFilters.priceRange)
      orderFilters.priceRange = JSON.stringify(orderFilters.priceRange);

    if (orderFilters.dateRange)
      orderFilters.dateRange = JSON.stringify(orderFilters.dateRange);

    if (orderFilters.costsCategoryIds)
      orderFilters.costsCategoryIds = JSON.stringify(
        orderFilters.costsCategoryIds
      );

    if (orderFilters.paymentMethodIds)
      orderFilters.paymentMethodIds = JSON.stringify(
        orderFilters.paymentMethodIds
      );

    orderFilters.page = orderFilters?.page + 1 || 1;

    setTimeout(() => {
      _getCostList(orderFilters);
    }, 0);
  }, [, costListFilters]);

  // const onOrderingChange = (column, type = orderingTypes.asc) => {
  //   if (!(type in orderingTypes)) return;
  //   if (!(column in orderingColumns)) return;
  //   const newCostListFilter = JSON.parse(JSON.stringify(costListFilters));
  //   newCostListFilter.orderBy = {
  //     ...newCostListFilter.orderBy,
  //     [column]: type,
  //   };
  //   setCostListFilters(newCostListFilter);
  // };

  const onOrderingToggle = (column) => {
    if (!(column in orderingColumns)) return;
    const newCostListFilter = JSON.parse(JSON.stringify(costListFilters));
    const orderings = newCostListFilter?.orderBy || [];
    const atOrderItem = orderings.find((orderItem) => column in orderItem);
    const haveOrderItem = Boolean(atOrderItem);
    const newOrderItem = haveOrderItem
      ? { [column]: invertOrdering(atOrderItem[column]) }
      : { [column]: orderingTypes.asc };
    const newOrderings = haveOrderItem
      ? orderings.map((item) => {
          const foundOrder = column in item;
          if (foundOrder) {
            return newOrderItem;
          } else {
            return item;
          }
        })
      : [...orderings, newOrderItem];
    newCostListFilter.orderBy = [...newOrderings];
    setCostListFilters(newCostListFilter);
  };

  const toggleHeaderState = (type) => {
    if (!(type in tableHeaderModals)) return;
    const haveModal = type in isHeaderModalOpen;
    if (haveModal) {
      setIsHeaderModalOpen((prevState) => ({
        ...prevState,
        [type]: !prevState[type],
      }));
    } else {
      setIsHeaderModalOpen((prevState) => ({ ...prevState, [type]: true }));
    }
  };

  const enableHeaderState = (type) => {
    if (!(type in tableHeaderModals)) return;
    setIsHeaderModalOpen((prevState) => ({
      ...prevState,
      [type]: true,
    }));
  };

  const disableHeaderState = (type) => {
    if (!(type in tableHeaderModals)) return;
    setIsHeaderModalOpen((prevState) => ({
      ...prevState,
      [type]: false,
    }));
  };

  const onPriceFilterFromChange = (e) => {
    const { value } = e.target;
    const englishPrice = reversePriceFormatter(value);
    const _priceFilter = { ...priceFilter };
    _priceFilter.from = englishPrice ? englishPrice : null;
    setPriceFilter(_priceFilter);
  };

  const onPriceFilterToChange = (e) => {
    const { value } = e.target;
    const englishPrice = reversePriceFormatter(value);
    const _priceFilter = { ...priceFilter };
    _priceFilter.to = englishPrice ? englishPrice : null;
    setPriceFilter(_priceFilter);
  };

  const onClearPriceFilter = () => {
    const _costFilters = { ...costListFilters };
    delete _costFilters.priceRange;
    setPriceFilter({ ...initialPriceRangeState });
    setCostListFilters(_costFilters);
    disableHeaderState(tableHeaderModals.AMOUNT);
  };

  const onSubmitPriceFilter = () => {
    if (!priceFilter.from || !priceFilter.to) return;
    const _costFilters = { ...costListFilters };
    _costFilters.priceRange = [priceFilter.from, priceFilter.to];
    setCostListFilters(_costFilters);
    disableHeaderState(tableHeaderModals.AMOUNT);
  };

  const onSubmitDateRange = () => {
    if (!dateRangeFilter.from || !dateRangeFilter.to) return;
    const _costFilters = { ...costListFilters };

    const from_date_range = persianToEnglishNumber(
      jMoment(
        formatDateObjectToNormal(dateRangeFilter.from),
        "jYYYY-jM-jD"
      ).format("YYYY-M-D")
    );
    const to_date_range = persianToEnglishNumber(
      jMoment(
        formatDateObjectToNormal(dateRangeFilter.to),
        "jYYYY-jM-jD"
      ).format("YYYY-M-D")
    );

    _costFilters.dateRange = [
      new Date(from_date_range).toISOString(),
      new Date(to_date_range).toISOString(),
    ];
    setCostListFilters(_costFilters);
    disableHeaderState(tableHeaderModals.DATE)
  };

  const onClearDateRange = () => {
    setDateRangeFilter({ ...initialDateRange });
    const _costFilters = { ...costListFilters };
    delete _costFilters.dateRange;
    setCostListFilters(_costFilters);
    disableHeaderState(tableHeaderModals.DATE)
  };

  const onPageChange = (e, newPage) => {
    const _costFilters = { ...costListFilters };
    _costFilters.page = newPage;
    setCostListFilters(_costFilters);
  };

  const onPageSizeChange = (e) => {
    const { value } = e.target;
    const _costFilters = { ...costListFilters };
    _costFilters.pageSize = value;
    _costCategory.page = 0;
    setCostListFilters(_costFilters);
  };

  const onClickPaymentMethodFilter = (paymentId) => {
    if (!paymentId) return;
    const _orderFilters = { ...costListFilters };
    const paymentMethods = _orderFilters?.paymentMethodIds || [];
    const havePaymentId = paymentMethods?.find(
      (paymentItem) => paymentItem === paymentId
    );
    const newPaymentMethods = havePaymentId
      ? paymentMethods.filter((costCat) => costCat !== paymentId)
      : [...paymentMethods, paymentId];
    _orderFilters.paymentMethodIds = newPaymentMethods;
    setCostListFilters(_orderFilters);
  };

  const onClickAllPaymentMethods = () => {
    const havePaymentMethodIds =
      costListFilters?.paymentMethodIds?.length === _paymentMethods.length;
    const _orderFilters = { ...costListFilters };
    const newPaymentMethods = havePaymentMethodIds
      ? []
      : _paymentMethods.map((item) => item.id);
    _orderFilters.paymentMethodIds = newPaymentMethods;
    setCostListFilters(_orderFilters);
  };

  const onClickCostCategoryFilter = (costCategoryId) => {
    if (!costCategoryId) return;
    const _orderFilters = { ...costListFilters };
    const costCategories = _orderFilters?.costsCategoryIds || [];
    const haveCostCategoryId = costCategories?.find(
      (costCatItem) => costCatItem === costCategoryId
    );
    const newCostCategories = haveCostCategoryId
      ? costCategories.filter((costCat) => costCat !== costCategoryId)
      : [...costCategories, costCategoryId];
    _orderFilters.costsCategoryIds = newCostCategories;
    setCostListFilters(_orderFilters);
  };

  const onClickAllCostCategory = () => {
    const haveCostsCategoryIds =
      costListFilters?.costsCategoryIds?.length === _costCategory.length;
    const _orderFilters = { ...costListFilters };
    const newPaymentMethods = haveCostsCategoryIds
      ? []
      : _costCategory.map((item) => item.id);
    _orderFilters.costsCategoryIds = newPaymentMethods;
    setCostListFilters(_orderFilters);
  };

  return {
    onClickPaymentMethodFilter,
    onClickAllPaymentMethods,
    onClickCostCategoryFilter,
    onClickAllCostCategory,
    costsPagination,
    onPageChange,
    onPageSizeChange,
    maxWidth768,
    dateRangeFilter,
    setDateRangeFilter,
    setDateRangeFilter,
    onSubmitDateRange,
    costListFilters,
    onClearDateRange,
    _isCostListLoading,
    router,
    headerRefs,
    onOrderingToggle,
    orderingColumns,
    orderingTypes,
    _costList,
    _costCategory,
    _paymentMethods,
    tableHeaderModals,
    isHeaderModalOpen,
    toggleHeaderState,
    enableHeaderState,
    disableHeaderState,
    onPriceFilterFromChange,
    urlPrefix,
    onPriceFilterToChange,
    onClearPriceFilter,
    onSubmitPriceFilter,
    priceFilter,
  };
};

export { useExpensesList };