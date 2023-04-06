import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { border } from "@saas/utils/colors";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import VendorIngredientRow from "containers/AdminShopping/containers/AdminVendor/components/VendorIngredientRow";

const headCells = [
  {
    id: "name",
    align: "right",
    label: "Name of the raw material",
  },
  {
    id: "phone",
    align: "right",
    label: "ID of the raw material",
  },
  {
    id: "email",
    align: "right",
    label: "Price($)",
  },
  {
    id: "actions",
    align: "center",
    label: "",
  },
];
export default function VendorIngredients({
  updateVendorItem,
  vendorIngredients,
  isLoading,
}) {
  return (
    <Paper elevation={2} className="my-4 pt-4">
      <div className="flex-1 px-3 u-fontLarge u-fontWeightHeavy">
        Raw material
      </div>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow
              style={{
                height: 48,
                borderBottom: `1px solid ${border.default}`,
              }}
              className={isLoading ? "u-pointer-events-none" : ""}
            >
              {headCells.map((headCell) => (
                <TableCell
                  style={{
                    minWidth: headCell.minWidth,
                    width: headCell.width,
                  }}
                  className="text-nowrap u-fontWeightHeavy u-font-semi-small"
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
            {vendorIngredients?.map((ingredient) => (
              <VendorIngredientRow
                key={ingredient.id}
                vendorIngredient={ingredient}
                isLoading={isLoading}
                updateVendorItem={updateVendorItem}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
