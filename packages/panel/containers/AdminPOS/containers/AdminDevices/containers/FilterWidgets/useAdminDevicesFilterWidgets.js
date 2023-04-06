import { getPosDevices } from "store/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { cashDrawerTypes } from "containers/AdminPOS/constants";

let setFilterDebounceTimeoutId = null;
export function useAdminDevicesFilterWidgets(setFilters) {
  const branches = useSelector(makeSelectBranches());
  const dispatch = useDispatch();
  const _getDevices = () => dispatch(getPosDevices());
  const [search, setSearch] = useState("");
  const [selectedBranches, setSelectedBranches] = useState(
    branches ? branches.map((branch) => branch.id) : []
  );
  const [selectedTypes, setSelectedTypes] = useState(
    cashDrawerTypes ? cashDrawerTypes.map((type) => type.id) : []
  );

  const selectAllBranches = (e) => {
    e.preventDefault();
    if (selectedBranches.length) setSelectedBranches([]);
    else setSelectedBranches(branches.map((branch) => branch.id));
  };
  const selectBranches = (e, branchId) => {
    e.preventDefault();
    if (!selectedBranches.includes(branchId))
      setSelectedBranches([...selectedBranches, branchId]);
    else setSelectedBranches(selectedBranches.filter((id) => id !== branchId));
  };
  const selectAllStatuses = (e) => {
    e.preventDefault();
    if (selectedTypes.length) setSelectedTypes([]);
    else setSelectedTypes(cashDrawerTypes.map((type) => type.id));
  };
  const selectStatuses = (e, typeId) => {
    e.preventDefault();
    if (!selectedTypes.includes(typeId))
      setSelectedTypes([...selectedTypes, typeId]);
    else setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
  };
  const renderSelectedStatusesValue = (selected) => {
    if (selected.length === 0) return "Select the status";
    if (selected.length === 1 && selected[0])
      return cashDrawerTypes.find((type) => type.id === selected[0]).text;
    if (selected.length === branches.length) return "All situations";
    return `${englishNumberToPersianNumber(selected.length)} Condition`;
  };
  const renderSelectedBranchValue = (selected) => {
    if (selected.length === 0) return "Choose a branch";
    if (selected.length === 1 && selected[0])
      return branches.find((branch) => branch.id === selected[0]).title;
    if (selected.length === branches.length) return "All branches";
    return `${englishNumberToPersianNumber(selected.length)} Branch`;
  };

  useEffect(() => {
    setTimeout(() => _getDevices(), 0);
  }, []);

  useEffect(() => {
    clearTimeout(setFilterDebounceTimeoutId);
    setFilterDebounceTimeoutId = setTimeout(() => {
      setFilters({
        search,
        selectedBranches,
        selectedTypes,
      });
    }, 500);
  }, [search, selectedBranches, selectedTypes]);

  return {
    setSearch,
    search,
    selectedBranches,
    branches,
    selectedTypes,
    renderSelectedBranchValue,
    selectBranches,
    selectAllBranches,
    renderSelectedStatusesValue,
    selectAllStatuses,
    selectStatuses,
  };
}
