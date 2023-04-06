import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { border } from "@saas/utils/colors";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import VendorProductRow from "containers/AdminShopping/containers/AdminVendor/components/VendorProductRow";

const headCells = [
  {
    id: "name",
    align: "right",
    label: "Product Name",
  },
  {
    id: "phone",
    align: "right",
    label: "Product ID",
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
export default function VendorProducts({
  updateVendorItem,
  vendorProducts,
  isLoading,
}) {
  const vendorProductsWithVariation = vendorProducts?.reduce(
    (productList, vendorItem) => {
      if (!vendorItem.variation_id) return [...productList, vendorItem];
      const newProductList = [...productList];
      const variationIndex = newProductList.findIndex(
        (productItem) =>
          productItem.content_object.id === vendorItem.content_object.id
      );
      if (variationIndex === -1)
        return [
          ...productList,
          {
            ...vendorItem,
            variations: [vendorItem],
          },
        ];
      newProductList[variationIndex].variations = [
        ...newProductList[variationIndex].variations,
        vendorItem,
      ];
      return newProductList;
    },
    []
  );
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
            {vendorProductsWithVariation?.map((product) => (
              <VendorProductRow
                key={product.id}
                vendorProduct={product}
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
