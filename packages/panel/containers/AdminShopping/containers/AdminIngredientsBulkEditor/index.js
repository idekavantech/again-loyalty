import React, { memo } from "react";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { dust } from "@saas/utils/colors";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import Button from "@material-ui/core/Button";
import IngredientBulkEditorRow from "containers/AdminShopping/containers/AdminIngredientsBulkEditor/components/IngredientBulkEditorRow";
import {
  headCells,
  useIngredientsBulkEditor,
} from "./useIngredientsBulkEditor";

function IngredientBulkEditor({ isSuper = false }) {
  const {
    isLoading,
    filteredIds,
    updatedIngredients,
    setUpdatedIngredients,
    loading,
    ingredients,
    submit,
  } = useIngredientsBulkEditor();

  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitAction={submit}
        isLoading={loading || isLoading}
        submitButtonText="Save changes"
      />
      <Paper elevation={1} className="py-3 mt-3">
        <TableContainer>
          <Table
            className="h-100"
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow
                style={{ borderBottom: `1px solid ${dust}` }}
                className={isLoading ? "u-pointer-events-none" : ""}
              >
                {headCells
                  .filter((cell) => cell.super || !isSuper)
                  .map((headCell) => (
                    <TableCell
                      style={{
                        minWidth: headCell.minWidth,
                        width: headCell.width,
                      }}
                      className="text-nowrap u-fontWeightBold"
                      key={headCell.id}
                      align={headCell.align}
                      color="text.primary"
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients
                ?.filter(
                  (ingredient) =>
                    !ingredient.id ||
                    !filteredIds ||
                    filteredIds.some(
                      (id) => parseInt(id) === ingredient.resource
                    )
                )
                .map((ingredient) => (
                  <IngredientBulkEditorRow
                    key={ingredient.id}
                    isLoading={isLoading}
                    ingredient={ingredient}
                    isSuper={isSuper}
                    cells={headCells}
                    updatedIngredients={updatedIngredients}
                    setUpdatedIngredients={setUpdatedIngredients}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button
        color="primary"
        className="mt-3"
        variant="contained"
        disabled={loading || isLoading}
        onClick={submit}
      >
        Save changes
      </Button>
    </div>
  );
}

export default memo(IngredientBulkEditor);
