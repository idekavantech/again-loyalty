import { makeSelectBranches } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientReport } from "store/actions";
import { useEffect, useState } from "react";
import { makeSelectIngredientReport } from "store/selectors";
import { inventoryAdjustmentReasons } from "@saas/stores/plugins/constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

export function useIngredientInventoryHistory({ ingredient, isOpen }) {
  const dispatch = useDispatch();
  const _getIngredientReport = (id, filters) =>
    dispatch(getIngredientReport(id, filters));
  const ingredientReport = useSelector(makeSelectIngredientReport());
  const loading = useSelector(makeSelectLoading());
  const branches = useSelector(makeSelectBranches());
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedReasons, setReasons] = useState(
    inventoryAdjustmentReasons.map((reason) => reason.keyword)
  );
  useEffect(() => {
    if (isOpen) {
      const filters = {};
      if (selectedReasons.length !== inventoryAdjustmentReasons.length) {
        filters.reason = selectedReasons;
        if (!selectedReasons.length) {
          filters.reason = 0;
        }
      }

      filters.business_id = selectedBranches;
      if (!selectedBranches.length) filters.business_id = 0;
      _getIngredientReport(ingredient.variations[0].id, filters);
    } else _getIngredientReport(null);
  }, [isOpen, selectedReasons, selectedBranches]);
  const renderSelectedAdjustmentReason = (selected) => {
    if (selected.length === 0) return "Choose the reason";
    if (selected.length === 1 && selected[0])
      return inventoryAdjustmentReasons.find((r) => r.keyword === selected[0])
        .text;
    if (selected.length === inventoryAdjustmentReasons.length)
      return "All reasons";
    return `${englishNumberToPersianNumber(selected.length)} the reason`;
  };
  const renderSelectedBranches = (selected) => {
    if (selected.length === 0) return "Choose a branch";
    if (selected.length === 1 && selected[0])
      return branches.find((branch) => branch.id === selected[0]).title;
    if (selected.length === branches.length) return "All branches";
    return `${englishNumberToPersianNumber(selected.length)} Branch`;
  };
  const selectAllAdjustmentReason = (e) => {
    e.preventDefault();
    if (selectedReasons.length) setReasons([]);
    else setReasons(inventoryAdjustmentReasons.map((branch) => branch.keyword));
  };
  const selectAdjustmentReason = (e, reason) => {
    e.preventDefault();
    if (!selectedReasons.find((_reason) => _reason === reason.keyword))
      setReasons([...selectedReasons, reason.keyword]);
    else setReasons(selectedReasons.filter((id) => id !== reason.keyword));
  };

  const selectAllBranches = (e) => {
    e.preventDefault();
    if (selectedBranches.length) setSelectedBranches([]);
    else setSelectedBranches(branches.map((branch) => branch.id));
  };
  const selectBranches = (e, branch) => {
    e.preventDefault();
    if (!selectedBranches.find((id) => id === branch.id))
      setSelectedBranches([...selectedBranches, branch.id]);
    else setSelectedBranches(selectedBranches.filter((id) => id !== branch.id));
  };
  return {
    _getIngredientReport,
    ingredientReport,
    selectedBranches,
    setSelectedBranches,
    selectedReasons,
    setReasons,
    loading,
    branches,
    renderSelectedAdjustmentReason,
    selectAdjustmentReason,
    selectAllAdjustmentReason,
    selectAllBranches,
    selectBranches,
    renderSelectedBranches,
  };
}
