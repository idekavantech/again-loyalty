import React, { memo, useEffect, useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";
import useTheme from "@material-ui/core/styles/useTheme";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import IconButton from "@material-ui/core/IconButton";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import VariationModifierSetModal from "./CustomizeVariationModifierSetModal";
import AdminProductInBoxWrapper from "../../../AdminProduct/components/AdminProductInBoxWrapper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function VariationModifierSetsSection({
  variation,
  modifierSets,
  selectModifierSetsForVariation,
  customizeVariationModifierSet,
}) {
  const [
    selectedModifierSetForCustomization,
    selectModifierSetForCustomization,
  ] = useState(null);
  const [modifierDetail, setModifierDetail] = useState({
    el: null,
    id: null,
  });
  const [collapse, setCollapse] = useState(variation?.modifier_sets?.length);
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  useEffect(() => {}, [variation]);
  const item = {
    ...modifierSets.find((ms) => ms.id === modifierDetail.id),
  };
  const { modifier_sets } = variation;
  return (
    <AdminProductInBoxWrapper smallPadding>
      <VariationModifierSetModal
        variation={variation}
        selectedModifierSetForCustomization={
          selectedModifierSetForCustomization
        }
        setModifierSetData={customizeVariationModifierSet(
          selectedModifierSetForCustomization
        )}
        isOpen={Boolean(selectedModifierSetForCustomization)}
        onClose={() => selectModifierSetForCustomization(null)}
      />

      <Popper
        open={Boolean(modifierDetail.el)}
        anchorEl={modifierDetail.el}
        placement="bottom-start"
      >
        <ClickAwayListener
          onClickAway={() => {
            setModifierDetail({
              el: null,
              id: null,
            });
          }}
        >
          <Paper elevation={3} className="p-3">
            <div>
              <span className="u-font-semi-small">
                {item ? item.title : ""}
              </span>
              <span className="u-fontMedium u-fontWeightBold">
                {" "}
                To{variation.title}
              </span>
              <div className="mt-2">
                At least: ‌
                {englishNumberToPersianNumber(
                  item.radio
                    ? 1
                    : item.minimum_choice !== undefined
                    ? item.minimum_choice || "unlimited"
                    : item
                    ? item.minimum_choice || "unlimited"
                    : ""
                )}
              </div>
              <div className="mt-2">
                Maximum: ‌
                {englishNumberToPersianNumber(
                  item.radio
                    ? 1
                    : item.maximum_choice !== undefined
                    ? item.maximum_choice || "unlimited"
                    : item
                    ? item.maximum_choice || "unlimited"
                    : ""
                )}
              </div>
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>
      <div className="d-flex justify-content-between flex-1 px-4 py-2 align-items-center">
        <div>
          <div className="u-fontLarge u-fontWeightBold">Total additive</div>
          {minWidth768 ? (
            <div
              className="mt-2"
              style={{ width: "90%", color: "rgba(0, 0, 0, 0.6)" }}
            >
              You can use this section to provide different additives
              Put the user. Such as sauce, spoon and fork, extra items to the product.
            </div>
          ) : null}
        </div>
        <div>
          <FormControlLabel
            className="ml-0"
            control={
              <Switch
                size="small"
                checked={collapse}
                onChange={(e) => {
                  setCollapse(e.target.checked);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                color="primary"
              />
            }
            labelPlacement="start"
            label=""
          />
        </div>
      </div>
      <Collapse in={collapse}>
        <div>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size="small"
              aria-label="enhanced table"
            >
              <TableBody>
                {modifierSets.map((_modifierSet) => {
                  const variationModifierSet = variation?.modifier_sets?.find(
                    (modifier_set) => modifier_set.id === _modifierSet.id
                  );
                  return (
                    <TableRow
                      hover
                      key={_modifierSet.id}
                      aria-checked={_modifierSet.id}
                      selected={Boolean(
                        modifier_sets.find((ms) => ms.id === _modifierSet.id)
                      )}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell
                        color="primary"
                        align="right"
                        padding="checkbox"
                        onClick={selectModifierSetsForVariation(_modifierSet)}
                      >
                        <Checkbox
                          color="primary"
                          checked={Boolean(
                            modifier_sets.find(
                              (ms) => ms.id === _modifierSet.id
                            )
                          )}
                          style={{ paddingRight: 0 }}
                        />
                      </TableCell>
                      <TableCell
                        align="right"
                        className="text-nowrap flex-row d-flex align-items-center"
                        style={{ padding: 10 }}
                      >
                        <div className="flex-1 d-flex align-items-center">
                          {_modifierSet.title}
                          <IconButton
                            className="mr-1 mb-1"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModifierDetail({
                                el: e.currentTarget,
                                id: _modifierSet.id,
                              });
                            }}
                          >
                            <InfoRoundedIcon
                              style={{
                                fontSize: 16,
                                color:
                                  modifierDetail.id === _modifierSet.id
                                    ? theme.palette.text.tertiary
                                    : theme.palette.text.quaternary,
                              }}
                            />
                          </IconButton>
                        </div>

                        <Button
                          color="primary"
                          style={{ direction: "ltr" }}
                          onClick={() =>
                            selectModifierSetForCustomization({
                              ..._modifierSet,
                              ...variationModifierSet,
                            })
                          }
                          disabled={
                            !Boolean(
                              modifier_sets.find(
                                (ms) => ms.id === _modifierSet.id
                              )
                            )
                          }
                        >
                          Personalization
                          <SettingsIcon size="small" className="ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Collapse>
    </AdminProductInBoxWrapper>
  );
}

export default memo(VariationModifierSetsSection);
