import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import { useEffect, useState } from "react";
import {
  createModifierSet,
  deleteModifierSet,
  getIngredients,
  getModifierSet,
  updateModifierSet,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { makeSelectIngredients, makeSelectModifierSet } from "store/selectors";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export function useModifierSet({ isSuper }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(makeSelectLoading());
  const modifierSet = useSelector(makeSelectModifierSet());
  const ingredients = useSelector(makeSelectIngredients());
  const branches = useSelector(makeSelectBranches());
  const _updateModifierSet = (
    id,
    modifierSet,
    modifiersInventoryAdjustment,
    callback
  ) =>
    dispatch(
      updateModifierSet(id, modifierSet, modifiersInventoryAdjustment, callback)
    );
  const _deleteModifierSet = (modifierSetId, callback) =>
    dispatch(deleteModifierSet(modifierSetId, callback));
  const _createModifierSet = (modifier, callback) =>
    dispatch(createModifierSet(modifier, callback));
  const _getModifierSet = (id) => dispatch(getModifierSet(id));

  const _getIngredients = () => dispatch(getIngredients({ paginated: false }));
  const { minWidth768 } = useResponsive();
  const theme = useTheme();
  const router = useRouter();
  const modifierSetId =
    router.query.id === "new" ? null : parseInt(router.query.id);
  const [error, setError] = useState("");
  const [choiceError, setChoiceError] = useState("");
  const [variationError, setVariationError] = useState("");
  const [modifierErrors, setModifierErrors] = useState({});
  const [
    isDeleteModifierSetConfirmationModalOpen,
    setDeleteModifierSetConfirmationModalOpen,
  ] = useState(false);
  const [_modifierSet, _setModifierSet] = useState({
    title: "",
    modifiers: {},
    extra_data: {
      config: {
        is_additive: true,
      },
    },
  });
  const [selectedBranchId, setSelectedBranchId] = useState(isSuper ? 0 : null);
  const [modifiersInventoryAdjustment, setModifierInventoryAdjustment] =
    useState({});

  // modifierSet?.modifier_sets is for modifier sets of super modifier children
  const indexOfModifierSetBranch = modifierSet?.modifier_sets?.findIndex(
    (modifierSet) => modifierSet.business === selectedBranchId
  );
  useEffect(() => {
    if (!modifierSetId) {
      _setModifierSet({
        title: "",
        modifiers: {},
        extra_data: {
          config: {
            is_additive: true,
          },
        },
      });
    } else {
      setTimeout(() => {
        _getIngredients();
        _getModifierSet(router.query.id);
      }, 0);
    }

    return () => {
      setTimeout(() => {
        _setModifierSet({
          title: "",
          modifiers: {},
          extra_data: {
            config: {
              is_additive: true,
            },
          },
        });
      }, 0);
    };
  }, [modifierSetId]);
  useEffect(() => {
    setTimeout(() => {
      _getIngredients();
    }, 0);
  }, [isSuper]);

  useEffect(() => {
    if (modifierSet && modifierSetId) {
      const _modifiersInventoryAdjustment = modifierSet?.modifier_sets?.length
        ? Object.values(
            modifierSet?.modifier_sets?.[
              indexOfModifierSetBranch === -1 ? 0 : indexOfModifierSetBranch
            ]?.modifiers
          ).map((modifier) => {
            return {
              modifier_id: modifier.id,
            };
          })
        : modifierSet?.variations?.map((modifier) => {
            return {
              modifier_id: modifier.id,
            };
          });
      const modifiersAdjustmentObject = modifierSet?.modifier_sets
        ? {
            [modifierSet?.modifier_sets?.[
              indexOfModifierSetBranch === -1 ? 0 : indexOfModifierSetBranch
            ].id]: [..._modifiersInventoryAdjustment],
          }
        : {
            [modifierSet?.id]: [..._modifiersInventoryAdjustment],
          };
      setModifierInventoryAdjustment(modifiersAdjustmentObject);
      const __modifierSet = { ..._modifierSet, ...modifierSet, modifiers: {} };
      if (modifierSet?.variations) {
        for (let variation of modifierSet.variations) {
          __modifierSet.modifiers[variation.id] = {
            ...variation,
            price: variation.discounted_price,
          };
        }
      }
      _setModifierSet(__modifierSet);
    }
  }, [modifierSet]);
  const submit = () => {
    let hasError = false;
    if (!_modifierSet.title) {
      setError("Please enter the name of the additive set.");
      hasError = true;
    }
    if (!Object.entries(_modifierSet.modifiers)?.length) {
      setVariationError("Additives should not be empty.");
      hasError = true;
    } else {
      setVariationError("");
    }
    if (
      _modifierSet.minimum_choice > _modifierSet.maximum_choice &&
      (_modifierSet.maximum_choice || _modifierSet.maximum_choice === 0)
    ) {
      setChoiceError("The minimum selection must be less than the maximum.");
      hasError = true;
    }
    const newModifierErrors = { ...modifierErrors };
    Object.entries(_modifierSet.modifiers).map(([key, m]) => {
      if (!m.title || (!m.discounted_price && m.discounted_price !== 0))
        hasError = true;
      newModifierErrors[key] = {
        titleError: m.title ? "" : "Enter the additive name..",
        priceError:
          m.discounted_price || m.discounted_price === 0
            ? ""
            : "Enter the additive price.",
      };
    });
    setModifierErrors(newModifierErrors);
    if (!hasError) {
      const updatedModifierSet = {
        ..._modifierSet,
        variations: Object.entries(_modifierSet.modifiers).map(([, m]) => {
          const indexOfModifier = modifiersInventoryAdjustment[_modifierSet.id]
            ? modifiersInventoryAdjustment[_modifierSet.id].findIndex(
                (modifier) => modifier.modifier_id === m.id
              )
            : 0;
          let newKeepSelling = m.keep_selling;
          if (modifiersInventoryAdjustment[_modifierSet.id]) {
            const _keepSelling =
              modifiersInventoryAdjustment[_modifierSet.id][indexOfModifier]
                ?.keep_selling;
            if (_keepSelling || _keepSelling === false)
              newKeepSelling = _keepSelling;
          }

          return {
            ...m,
            keep_selling: newKeepSelling,
            id: m.new ? null : m.id,
            ingredients: (m.ingredients || []).map((ing) => ({
              item: ing.ingredient_id || ing.id,
              fraction: parseFloat(ing.fraction),
            })),
          };
        }),
      };
      if (modifierSetId) {
        _updateModifierSet(
          modifierSetId,
          updatedModifierSet,
          modifiersInventoryAdjustment,
          router.back
        );
      } else {
        _createModifierSet(updatedModifierSet, router.back);
      }
    }
  };

  const onModifierSetTitleChange = (title) => {
    setError("");
    _setModifierSet({ ..._modifierSet, title });
  };
  const onMinimumChoiceChange = (minimum_choice) => {
    setChoiceError("");
    _setModifierSet({
      ..._modifierSet,
      minimum_choice,
    });
  };
  const onMaximumChoiceChange = (maximum_choice) => {
    setChoiceError("");
    _setModifierSet({
      ..._modifierSet,
      maximum_choice,
    });
  };
  const addModifierItem = () => {
    const id = uniqueid();
    _setModifierSet({
      ..._modifierSet,
      modifiers: {
        ..._modifierSet.modifiers,
        [id]: {
          id,
          title: "",
          price: "",
          ingredients: [],
          keep_selling: true,
          inventory_count: 0,
          new: true,
        },
      },
    });
  };

  const confirmDeleteModifierSet = () => {
    setDeleteModifierSetConfirmationModalOpen(false);
    _deleteModifierSet(modifierSetId, router.back);
  };
  return {
    minWidth768,
    theme,
    router,
    modifierSetId,
    error,
    setError,
    choiceError,
    variationError,
    setChoiceError,
    modifierErrors,
    isDeleteModifierSetConfirmationModalOpen,
    setDeleteModifierSetConfirmationModalOpen,
    _modifierSet,
    _setModifierSet,
    setSelectedBranchId,
    modifiersInventoryAdjustment,
    setModifierInventoryAdjustment,
    isLoading,
    ingredients,
    branches,
    indexOfModifierSetBranch,
    submit,
    onModifierSetTitleChange,
    onMinimumChoiceChange,
    onMaximumChoiceChange,
    addModifierItem,
    confirmDeleteModifierSet,
  };
}
