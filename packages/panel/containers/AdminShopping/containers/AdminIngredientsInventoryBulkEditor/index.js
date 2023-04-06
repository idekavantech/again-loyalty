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
import LocationSelector from "components/LocationSelector";

import IngredientsBulkEditorTableRow from "./components/IngredientsInventoryBulkEditorTableRow";

import { useIngredientsInventoryBulkEditor } from "./useIngredientsInventoryBulkEditor";
const headCells = [
  {
    id: "name",
    align: "right",
    label: "The name of the material",
  },
  {
    id: "previous",
    align: "right",
    label: "Inventory",
  },
  {
    id: "reason",
    align: "right",
    label: "the reason",
  },

  {
    id: "change",
    align: "right",
    label: "Change",
  },
  {
    id: "previous",
    align: "right",
    label: "New creature",
  },
  {
    id: "threshold",
    align: "right",
    label: "Completed alert",
  },
];
function IngredientBulkEditInventory({ isSuper }) {
  const {
    loading,
    adjustments,
    setAdjustments,
    updatedIngredients,
    setUpdatedIngredients,
    selectedBranch,
    setSelectedBranch,
    isLoading,
    branches,
    _ingredients,
    submit,
    exportCSV,
    filterIngredients,
  } = useIngredientsInventoryBulkEditor({ isSuper });

  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitAction={submit}
        isLoading={loading || isLoading}
        submitButtonText="Save changes"
        buttons={
          <Button
            color="primary"
            className="mr-3"
            variant="contained"
            disabled={loading || isLoading}
            onClick={exportCSV}
          >
            Output
          </Button>
        }
      />
      <Paper elevation={1} className="pb-4 mt-4 overflow-hidden">
        {isSuper && branches?.length ? (
          <LocationSelector
            value={selectedBranch}
            onChange={setSelectedBranch}
            items={branches.map((branch) => ({
              title: branch.title,
              value: branch.slug,
            }))}
          />
        ) : null}
        <TableContainer className="mt-4 u-overflow-y-hidden">
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
                {headCells.map((headCell) => (
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
              {_ingredients?.filter(filterIngredients).map((ingredient) => (
                <IngredientsBulkEditorTableRow
                  key={ingredient.id}
                  isLoading={isLoading}
                  ingredient={ingredient}
                  updatedIngredients={updatedIngredients}
                  setUpdatedIngredients={setUpdatedIngredients}
                  adjustments={adjustments}
                  setAdjustments={setAdjustments}
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

export default memo(IngredientBulkEditInventory);
