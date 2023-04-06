import { makeSelectBranches } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  createIngredient,
  deleteIngredient,
  getIngredient,
  setApprovedPriceSuperIngredient,
  updateIngredient,
} from "store/actions";
import useTheme from "@material-ui/core/styles/useTheme";
import { useEffect, useState } from "react";
import { makeSelectIngredient } from "store/selectors";

export function useIngredient({ isSuper }) {
  const dispatch = useDispatch();
  const _updateIngredient = (data, callback) =>
    dispatch(updateIngredient(data, callback));
  const _deleteIngredient = (id, callback) =>
    dispatch(deleteIngredient(id, callback));
  const _createIngredient = (data, callback) =>
    dispatch(createIngredient(data, callback));
  const _setApprovedPriceSuperIngredient = (id, data) =>
    dispatch(setApprovedPriceSuperIngredient(id, data));
  const _getIngredient = (id) => dispatch(getIngredient(id));
  const [approvedPrice, setApprovedPrice] = useState("");

  const originalIngredient = useSelector(makeSelectIngredient());
  const isLoading = useSelector(makeSelectLoading());
  const branches = useSelector(makeSelectBranches());
  const router = useRouter();
  const theme = useTheme();
  const ingredientId =
    router.query.id === "new" ? null : parseInt(router.query.id);
  const [titleError, setTitleError] = useState("");
  const [skuError, setSkuError] = useState("");
  const [unitError, setUnitError] = useState("");
  const [isDialogBoxOpen, setDialogBox] = useState(false);
  const [ingredient, setIngredient] = useState({
    title: "",
    unit: null,
    sku: "",
    extra_data: { config: { is_composable: true } },
    variations: [{ title: null }],
  });
  const [historyModal, setHistoryModal] = useState(false);

  useEffect(() => {
    return () => {
      setIngredient({
        title: "",
        unit: null,
        sku: "",
        extra_data: { config: { is_composable: true } },
        variations: [{ title: null }],
      });
      _getIngredient(null);
    };
  }, []);
  useEffect(() => {
    if (originalIngredient?.title) {
      setIngredient(originalIngredient);
    }
  }, [originalIngredient?.title]);
  const submit = () => {
    if (!ingredient.title) setTitleError("Please enter the raw material name.");

    if (!ingredient.sku) setSkuError("Please enter the ID of the raw material.");

    if (!ingredient.unit) setUnitError("Please enter the raw material unit.");
    let callback;

    if ((Boolean(approvedPrice) && isSuper) || !isSuper) {
      callback = () => {
        if (isSuper) {
          _setApprovedPriceSuperIngredient(ingredient.variations[0].id, {
            price: +approvedPrice,
          });
        }
        router.back();
      };
    }
    if (ingredient.variations[0].title && ingredient.sku && ingredient.unit) {
      if (ingredientId) {
        _updateIngredient(
          {
            variation_id: ingredient.variations[0].id,
            resource_id: ingredientId,
            variation: {
              title: ingredient.variations[0].title,
              sku: ingredient.variations[0].sku,
              threshold: ingredient.variations[0].threshold,
              alerting: ingredient.variations[0].alerting,
            },
            adjustment: {
              reason: ingredient.variations[0].reason,
              amount: ingredient.variations[0].amount,
            },
            resource: {
              unit: ingredient.unit,
              sku: ingredient.variations[0].sku,
            },
          },
          callback
        );
      } else {
        _createIngredient({...ingredient , labels:[]}, callback);
      }
    }
  };
  useEffect(() => {
    if (!ingredientId) {
      setIngredient({
        title: "",
        unit: null,
        sku: "",
        extra_data: { config: { is_composable: true } },
        variations: [{ title: null }],
      });
    }
    setTimeout(() => {
      _getIngredient(ingredientId);
    }, 0);
  }, [ingredientId]);
  const onSKUChange = (sku) => {
    setSkuError("");
    setIngredient({
      ...ingredient,
      sku: sku,
      variations: [{ ...ingredient.variations[0], sku }],
    });
  };
  const onTitleChange = (title) => {
    setTitleError("");
    setIngredient({
      ...ingredient,
      title: title,
      variations: [{ ...ingredient.variations[0], title }],
    });
  };
  const onUnitChange = (e, option) => {
    setUnitError("");
    setIngredient({ ...ingredient, unit: option.english });
  };
  const onInventoryChange = (data) =>
    setIngredient({
      ...ingredient,
      variations: [{ ...ingredient.variations[0], ...data }],
    });
  const confirmDeleteIngredient = () => {
    setDialogBox(false);
    _deleteIngredient(ingredientId, router.back);
  };

  return {
    router,
    theme,
    ingredientId,
    titleError,
    setTitleError,
    skuError,
    setSkuError,
    unitError,
    setUnitError,
    isDialogBoxOpen,
    setDialogBox,
    ingredient,
    setIngredient,
    isLoading,
    branches,
    historyModal,
    setHistoryModal,
    submit,
    confirmDeleteIngredient,
    onSKUChange,
    onTitleChange,
    onUnitChange,
    onInventoryChange,
    approvedPrice,
    setApprovedPrice,
  };
}
