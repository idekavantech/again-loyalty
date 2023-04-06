import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createCost,
  createCostCategory,
  getCostsCategoriesList,
  getPaymentMethods,
} from "store/actions";
import {
  CREATE_COST_CATEGORY,
  GET_COST_CATEGORIES_LIST,
} from "store/constants";
import {
  makeSelectCostsCategory,
  makeSelectPaymentMethods,
} from "store/selectors";

const initialCostState = {
  date: new Date().toISOString(),
};
const useAddExpense = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const costCategoryInputRef = useRef(null);

  const _getCostCategories = () => dispatch(getCostsCategoriesList());
  const _createCostCategory = (data, callback) =>
    dispatch(createCostCategory(data, callback));
  const _getPaymentMethods = () => dispatch(getPaymentMethods());
  const _createCost = (data, callback) => dispatch(createCost(data, callback));

  const _costCategories = useSelector(makeSelectCostsCategory());
  const _paymentMethods = useSelector(makeSelectPaymentMethods());
  const _isLoadingCostCategoryList = useSelector(
    makeSelectLoading(GET_COST_CATEGORIES_LIST)
  );
  const _isLoadingCreateCostCategory = useSelector(
    makeSelectLoading(CREATE_COST_CATEGORY)
  );

  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());

  const [cost, setCost] = useState(initialCostState);
  const [selectedCostCategoryId, setSelectedCostCategoryId] = useState(null);
  const [costCategoryTextField, setCostCategoryTextField] = useState("");
  const [isCostCategoryAutocompliteOpen, setIsCostCategoryAutocompliteOpen] =
    useState(false);

  const [costCategoryErr , setCostCategoryErr] = useState(false)
  const [priceErr , setPriceErr] = useState(false)
  const [paymentTypeErr , setPaymentTypeErr] = useState(false)
  const [descriptionErr , setDescriptionErr] = useState(false)

  const handleOpenCostCategoryAutocomplite = () =>
    setIsCostCategoryAutocompliteOpen(true);
  const handleCloseCostCategoryAutocomplite = () =>
    setIsCostCategoryAutocompliteOpen(false);

  useEffect(() => {
    setTimeout(() => {
      _getCostCategories();
      _getPaymentMethods();
    }, 0);
  }, []);

  const onCostCategoryTextFieldChange = (e) => {
    if (!e) return;
    const { value } = e.target;
    if (!isCostCategoryAutocompliteOpen) handleOpenCostCategoryAutocomplite();
    setCostCategoryTextField(value);
  };

  useEffect(() => {
    const item = _costCategories?.find(
      (item) => item?.title?.toString() === costCategoryTextField?.toString()
    );
    if (item) {
      setSelectedCostCategoryId(item.id);
    } else {
      setSelectedCostCategoryId(null);
    }
  }, [_costCategories, costCategoryTextField]);

  const updateCostCategoryId = (newCostCategory) => {
    if (newCostCategory && newCostCategory.id) {
      setSelectedCostCategoryId(newCostCategory.id);
      setCostCategoryTextField(newCostCategory.title);
    } else {
      setSelectedCostCategoryId(null);
      setSelectedCostCategoryId("");
    }
    handleCloseCostCategoryAutocomplite();
  };

  const filteredCostCategory = useMemo(() => {
    const noSpecialCharacters = costCategoryTextField.replace(
      /[^a-zA-Z0-9Come-ی۱-۹]/g,
      ""
    );
    const regexp = new RegExp(noSpecialCharacters || "", "g");
    return (_costCategories || []).filter((item) =>
      regexp.test(item.title || "")
    );
  }, [costCategoryTextField, _costCategories]);

  const createNewCostCategory = (cb) => {
    const textFieldValue = costCategoryTextField.trim();
    const isTextFieldEmpty = textFieldValue.length === 0;
    if (_isLoadingCreateCostCategory) return;
    if (selectedCostCategoryId !== null || isTextFieldEmpty) return;
    _createCostCategory({ title: textFieldValue }, cb);
  };

  const addNewCostCategory = (e) => {
    if (_isLoadingCostCategoryList) return;
    const isUserPressedEnter = e.key === "Enter";
    if (!isUserPressedEnter) return;
    const haveSuggestions = filteredCostCategory.length;
    if (haveSuggestions) {
      const suggested = filteredCostCategory[0];
      setCostCategoryTextField(suggested.title);
      setSelectedCostCategoryId(suggested.id);
      handleCloseCostCategoryAutocomplite();
    } else {
      createNewCostCategory(updateCostCategoryId);
    }
  };

  const setClickedCostCategory = (id) => {
    if (!id) return;
    const costCategoryItem = _costCategories.find(
      (costCat) => costCat.id === id
    );
    setSelectedCostCategoryId(costCategoryItem.id);
    setCostCategoryTextField(costCategoryItem.title);
    handleCloseCostCategoryAutocomplite();
  };

  const onPriceChange = (e) => {
    const { value } = e.target;
    const englishValue = reversePriceFormatter(value);
    const _cost = { ...cost };
    if (!englishValue || !Number(englishValue)) delete _cost.price;
    _cost.price = Number(englishValue);
    setCost(_cost);
  };

  const onDataChange = (date) => {
    const standardDate = new Date(date);
    const _cost = { ...cost };
    _cost.date = standardDate.toISOString();
    setCost(_cost);
  };

  const onDescriptionChange = (e) => {
    const { value } = e.target;
    const _cost = { ...cost };
    _cost.description = value;
    setCost(_cost);
  };

  const onPaymentMethodChange = (e) => {
    const { value } = e.target;
    const _cost = { ...cost };
    if (value === undefined) return;
    _cost.paymentMethodId = value;
    setCost(_cost);
  };

  const clearAllData = () => {
    setCost({ ...initialCostState }), setSelectedCostCategoryId(null);
    setCostCategoryTextField("");
  };

  const redirectToCostList = () =>
    router.push(`${urlPrefix}/s/settings/accounting/expenses_list`);

  const createNewCost = (submitData, cb) => _createCost(submitData, cb);

  const validate = () => {
    const { price, paymentMethodId , description} = cost;

    if (!selectedCostCategoryId) {
      setCostCategoryErr(true);
      return false;
    }else setCostCategoryErr(false)

    if (!description || description.trim().length === 0) {
      setDescriptionErr(true);
      return false;
    }else setDescriptionErr(false)

    if(isNaN(Number(price))){
      setPriceErr(true)
      return false
    }else setPriceErr(false);

    if (!paymentMethodId) {
      setPaymentTypeErr(true);
      return false;
    } else setPaymentTypeErr(false);

    setCostCategoryErr(false);
    setPriceErr(false);
    setPaymentTypeErr(false);
    setDescriptionErr(false);
    return true;
  };

  const submit = () => {
    const isValidForm = validate();
    if (!isValidForm) return;
    const submitData = { ...cost };
    if (Boolean(selectedCostCategoryId)) {
      submitData.costsCategoryId = selectedCostCategoryId;
      createNewCost(submitData, redirectToCostList);
    } else {
      createNewCostCategory((costCategoryResponseData) => {
        if(!costCategoryResponseData) return 
        submitData.costsCategoryId = costCategoryResponseData.id;
        createNewCost(submitData, redirectToCostList);
      });
    }
  };

  const submitAndClear = () => {
    const isValidForm = validate();
    if (!isValidForm) return;
    const submitData = { ...cost };
    if (Boolean(selectedCostCategoryId)) {
      submitData.costsCategoryId = selectedCostCategoryId;
      createNewCost(submitData, clearAllData);
    } else {
      createNewCostCategory((costCategoryResponseData) => {
        if (!costCategoryResponseData) return;
        submitData.costsCategoryId = costCategoryResponseData.id;
        createNewCost(submitData, clearAllData);
      });
    }
  };

  return {
    costCategoryErr,
    priceErr,
    paymentTypeErr,
    descriptionErr,
    createNewCostCategory,
    isCostCategoryAutocompliteOpen,
    handleCloseCostCategoryAutocomplite,
    handleOpenCostCategoryAutocomplite,
    cost,
    _isLoadingCreateCostCategory,
    clearAllData,
    filteredCostCategory,
    costCategoryInputRef,
    setClickedCostCategory,
    _paymentMethods,
    onCostCategoryTextFieldChange,
    addNewCostCategory,
    onPriceChange,
    onDataChange,
    onDescriptionChange,
    onPaymentMethodChange,
    costCategoryTextField,
    submit,
    submitAndClear,
  };
};

export { useAddExpense };
