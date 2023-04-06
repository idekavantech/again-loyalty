import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { graphite, pollution } from "@saas/utils/colors";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import useTheme from "@material-ui/core/styles/useTheme";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import ProductsAssignmentModal from "containers/AdminShopping/containers/AdminProduct/ModifiersSection/ProductsAssignmentModal";
import LimitSelector from "containers/AdminShopping/containers/AdminModifierSet/LimitSelector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function ProductModifierSetModal({
  isOpen,
  onClose,
  modifierSetData = {},
  setModifierSetData,
  product,
  bulkModifierSettingProducts,
  setBulkModifierSettingProducts,
}) {
  const theme = useTheme();
  const [editedModifierSet, setEditedModifierSet] = useState({});
  const [searchModal, setSearchModal] = useState(false);
  useEffect(() => {
    setEditedModifierSet({
      minimum_choice: modifierSetData.minimum_choice,
      maximum_choice: modifierSetData.maximum_choice,
      modifier_set: modifierSetData.id,
      variations: modifierSetData.variations,
    });
  }, [modifierSetData.id]);
  const { minWidth992 } = useResponsive();

  return (
    <Modal
      isBig
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} title="Adjustment adjustment" />}
      body={
        <>
          <ProductsAssignmentModal
            products={bulkModifierSettingProducts}
            setProducts={setBulkModifierSettingProducts}
            modifier={modifierSetData}
            isOpen={searchModal}
            onClose={() => setSearchModal(false)}
          />
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
                    modifierSetData.modifiers
                      ? Object.keys(modifierSetData.modifiers).length + 1
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
                    modifierSetData.modifiers
                      ? Object.keys(modifierSetData.modifiers).length + 1
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
                    {modifierSetData.variations &&
                      Object.values(modifierSetData.variations).map((_row) => {
                        const _editedModifierSetIndex =
                          editedModifierSet?.variations?.findIndex(
                            (variation) => variation.id === _row.id
                          );
                        const row = {
                          ..._row,
                          ...(editedModifierSet?.variations?.[
                            _editedModifierSetIndex
                          ] || {}),
                        };
                        return (
                          <TableRow
                            key={row.id}
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
                                  _editedModifierSet.variations[
                                    _editedModifierSetIndex
                                  ] = {
                                    ..._editedModifierSet.variations[
                                      _editedModifierSetIndex
                                    ],
                                    default_selected: e.target.checked,
                                  };
                                  setEditedModifierSet(_editedModifierSet);
                                }}
                                checked={row.default_selected}
                              />
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">
                              {row.title}
                            </TableCell>
                            <TableCell align="right">
                              {priceFormatter(row.price)} Toman
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {bulkModifierSettingProducts.length ? (
              <div className="p-3 mt-5">
                <div
                  className="p-3 d-flex align-items-center justify-content-between"
                  style={{ border: `1px solid ${pollution}` }}
                >
                  <div className="ml-3">
                    <div>
                      After storage{product.title} Settings for the following
                      Will be saved:
                    </div>
                    <div className="u-fontWeightBold mt-1">
                      {bulkModifierSettingProducts
                        .slice(0, 2)
                        .map(
                          (p, index) =>
                            `${p.title}${
                              !index && bulkModifierSettingProducts.length > 1
                                ? bulkModifierSettingProducts.length > 2
                                  ? "،"
                                  : " And"
                                : ""
                            }`
                        )}
                      {bulkModifierSettingProducts.length > 2
                        ? `, And${englishNumberToPersianNumber(
                            bulkModifierSettingProducts.length - 2
                          )} Another product`
                        : ""}
                    </div>
                  </div>
                  <div
                    style={{ color: theme.palette.primary.main }}
                    onClick={() => {
                      setSearchModal(true);
                    }}
                    className="text-center u-cursor-pointer"
                  >
                    Edit
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setSearchModal(true)}
                color="primary.main"
                style={{ color: theme.palette.primary.main }}
                className="mt-5 u-cursor-pointer text-center"
              >
                Apply settings on other products
              </div>
            )}
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
export default memo(ProductModifierSetModal);
