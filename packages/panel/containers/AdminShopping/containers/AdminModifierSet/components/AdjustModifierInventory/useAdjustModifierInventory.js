import useTheme from "@material-ui/core/styles/useTheme";
import { useEffect, useState } from "react";
export function useAdjustModifierInventory({
  _modifierSet,
  indexOfSelectedBranchModifierSet,
  adjustments,
  modifier,
}) {
  const theme = useTheme();
  const _adjustment = Object.values(adjustments)?.[0]?.find(
    (adj) => adj.modifier_id === modifier.id
  );
  const { reason = "", amount, modifier_id } = _adjustment;
  const indexOfModifier = Object.values(adjustments)?.[0].findIndex(
    (modifier) => modifier.modifier_id === modifier_id
  );
  const [_modifier, setModifierSet] = useState();
  const [selectedModifierSet, setSelectedModifierSet] = useState(
    _modifierSet?.modifier_sets
      ? _modifierSet.modifier_sets[
          indexOfSelectedBranchModifierSet === -1
            ? 0
            : indexOfSelectedBranchModifierSet
        ].id
      : _modifierSet.id
  );
  useEffect(() => {
    if (_modifierSet?.modifier_sets?.length) {
      if (_modifierSet?.modifier_sets?.length) {
        const selectedModifierSetModifiers = _modifierSet.modifier_sets.find(
          (modSet) => modSet.id === selectedModifierSet
        ).modifiers;
        const modifier = Object.values(selectedModifierSetModifiers).find(
          (modifier) => modifier.id === modifier_id
        );
        setModifierSet(modifier);
      }
    } else {
      setModifierSet(modifier);
    }
  }, [_modifierSet, selectedModifierSet, modifier_id, modifier]);
  return {
    reason,
    amount,
    modifier_id,
    _modifier,
    setModifierSet,
    selectedModifierSet,
    setSelectedModifierSet,
    indexOfModifier,
    theme,
  };
}
