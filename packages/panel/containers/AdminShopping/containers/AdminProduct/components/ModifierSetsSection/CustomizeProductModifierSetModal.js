import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { graphite } from "@saas/utils/colors";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import LimitSelector from "../../../AdminModifierSet/components/LimitSelector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function CustomizeProductModifierSetModal({
  isOpen,
  onClose,
  selectedModifierSetForCustomization = {},
  setModifierSetData,
}) {
  const [editedModifierSet, setEditedModifierSet] = useState({});
  useEffect(() => {
    setEditedModifierSet({
      minimum_choice:
        selectedModifierSetForCustomization?.customized_minimum_choice ||
        selectedModifierSetForCustomization?.minimum_choice,
      maximum_choice:
        selectedModifierSetForCustomization?.customized_maximum_choice ||
        selectedModifierSetForCustomization?.maximum_choice,
      modifier_set: selectedModifierSetForCustomization?.id,
      default_selected:
        selectedModifierSetForCustomization?.default_selected || [],
    });
  }, [selectedModifierSetForCustomization?.id]);
  const { minWidth992 } = useResponsive();

  return (
    <Modal
      isBig
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} title="Adjustment adjustment" />}
      body={
        <>
          <div style={{ maxWidth: 580 }} className="mt-1 mx-auto">
            <div className="px-3 mt-2">
              <div className="text-center u-fontWeightBold py-2">
                The additive set settings are applied to this product only.
              </div>
            </div>
            <div className="d-flex px-2 justify-content-center mt-3">
              <div className="flex-1 mx-1">
                <div>At least</div>
                <LimitSelector
                  optionMaxNumber={
                    selectedModifierSetForCustomization?.modifiers
                      ? Object.keys(
                          selectedModifierSetForCustomization?.modifiers
                        ).length + 1
                      : 0
                  }
                  onChange={(minimum_choice) => {
                    setEditedModifierSet({
                      ...editedModifierSet,
                      minimum_choice,
                    });
                  }}
                  inputValue={editedModifierSet.minimum_choice}
                />
              </div>
              <div className="flex-1 mx-1">
                <div>Maximum</div>
                <LimitSelector
                  optionMaxNumber={
                    selectedModifierSetForCustomization?.modifiers
                      ? Object.keys(
                          selectedModifierSetForCustomization?.modifiers
                        ).length + 1
                      : 0
                  }
                  onChange={(maximum_choice) => {
                    setEditedModifierSet({
                      ...editedModifierSet,
                      maximum_choice,
                    });
                  }}
                  inputValue={editedModifierSet.maximum_choice}
                />
              </div>
            </div>
            <div className="px-3 mt-5">
              <div className="u-fontWeightBold mb-2">Additives</div>
              <TableContainer className="mb-4">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ borderBottom: `1px solid ${graphite}` }}
                        className="py-2 u-fontWeightBold text-nowrap"
                        padding="checkbox"
                      >
                        The selected default
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: `1px solid ${graphite}` }}
                        component="th"
                        scope="row"
                        align="right"
                        className="py-2 u-fontWeightBold "
                      >
                        Title
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: `1px solid ${graphite}` }}
                        align="right"
                        className="py-2 u-fontWeightBold "
                      >
                        Price
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedModifierSetForCustomization?.variations?.map(
                      (modifier) => {
                        return (
                          <TableRow
                            key={modifier.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                          >
                            <TableCell
                              align="right"
                              className="text-nowrap"
                              padding="checkbox"
                            >
                              <Checkbox
                                color="primary"
                                onChange={(e) => {
                                  const _editedModifierSet = {
                                    ...editedModifierSet,
                                  };

                                  if (e.target.checked) {
                                    const modifierIndex =
                                      _editedModifierSet.default_selected.indexOf(
                                        modifier.id
                                      );
                                    if (modifierIndex === -1) {
                                      _editedModifierSet.default_selected.push(
                                        modifier.id
                                      );
                                    }
                                  } else {
                                    const modifierIndex =
                                      _editedModifierSet.default_selected.indexOf(
                                        modifier.id
                                      );
                                    if (modifierIndex !== -1) {
                                      _editedModifierSet.default_selected.splice(
                                        modifierIndex,
                                        1
                                      );
                                    }
                                  }
                                  setEditedModifierSet(_editedModifierSet);
                                }}
                                checked={Boolean(
                                  editedModifierSet.default_selected?.includes(
                                    modifier.id
                                  )
                                )}
                              />
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">
                              {modifier.title}
                            </TableCell>
                            <TableCell align="right">
                              {priceFormatter(modifier.price)} $
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          {minWidth992 ? (
            <div
              style={{ maxWidth: 580, marginTop: 70 }}
              className="mx-auto d-flex justify-content-end px-3"
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setModifierSetData(editedModifierSet);
                  onClose();
                }}
              >
                Store
              </Button>
            </div>
          ) : null}
        </>
      }
      cta={
        !minWidth992 ? (
          <Button
            color="primary"
            variant="contained"
            className="w-100"
            onClick={() => {
              setModifierSetData(editedModifierSet);
              onClose();
            }}
          >
            Store
          </Button>
        ) : null
      }
    />
  );
}
export default memo(CustomizeProductModifierSetModal);
