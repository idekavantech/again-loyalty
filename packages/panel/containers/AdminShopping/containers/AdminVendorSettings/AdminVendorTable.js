import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { border } from "@saas/utils/colors";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import AdminVendorTableRow from "containers/AdminShopping/containers/AdminVendorSettings/AdminVendorTableRow";

const headCells = [
  {
    id: "name",
    align: "right",
    label: "Title",
  },
  {
    id: "phone",
    align: "right",
    label: "phone number",
  },
  {
    id: "email",
    align: "right",
    label: "email",
  },
  {
    id: "actions",
    align: "center",
    label: "",
  },
];

export default function AdminVendorTable({
  vendors,
  isLoading,
  urlPrefix,
  pluginUrl,
  _updateAdminVendor,
  _getVendors,
}) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow
            style={{
              height: 48,
              borderBottom: `1px solid ${border.subdued}`,
            }}
            className={isLoading ? "u-pointer-events-none" : ""}
          >
            {headCells.map((headCell) => {
              return (
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
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors?.map((vendor) => (
            <AdminVendorTableRow
              key={vendor.id}
              vendor={vendor}
              urlPrefix={urlPrefix}
              pluginUrl={pluginUrl}
              isLoading={isLoading}
              _updateAdminVendor={_updateAdminVendor}
              _getVendors={_getVendors}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
