import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";
import { customerListConstant } from "../../../../AdminShopping/containers/AdminOrdersList/constants";
import CRMMembershipsListTableRow from "./CRMMembershipsListTableRow";
import { Checkbox } from "@material-ui/core";

export default function CRMMembershipsListTable({
  labels,
  loading,
  adminUrlPrefix,
  CRMmemberships,
  selectedMembershipIds,
  onMembershipClick,
  onCRMMembershipHeaderCheckboxClick,
}) {
  return (
    <TableContainer style={{ maxHeight: 400 }}>
      <Table
        aria-labelledby="tableTitle"
        size="small"
        aria-label="enhanced table"
      >
        <TableHead
          style={{
            width: "100%",
            height: 50,
            position: "sticky",
            top: 0,
            zIndex: 1000,
            background: "#E4E5E7",
            height: 64,
          }}
        >
          <TableRow style={{ width: "100%" }}>
            <TableCell
              className="text-nowrap u-fontWeightBold"
              key="id"
              color="text.primary"
              align="right"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              <Checkbox
                onClick={onCRMMembershipHeaderCheckboxClick}
                indeterminate={
                  selectedMembershipIds?.length &&
                  selectedMembershipIds?.length !== CRMmemberships?.length
                }
                color="primary"
                checked={
                  selectedMembershipIds?.length === CRMmemberships?.length
                }
              />
            </TableCell>
            {customerListConstant?.map((headCell) => (
              <TableCell
                className="text-nowrap u-fontWeightBold"
                key={headCell.id}
                align={headCell.align}
                color="text.primary"
                style={{
                  minWidth: headCell.minWidth,
                  width: headCell.width,
                  maxWidth: headCell.maxWidth,
                }}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <TableRow style={{ height: 53 }} key={item}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                  (cell, index) => (
                    <TableCell key={cell?.id}>
                      <Skeleton
                        style={{
                          transform: "scale(1)",
                          width: index === 0 ? 48 : "100%",
                          height: index === 0 ? 48 : "",
                        }}
                      />
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody style={{ backgroundColor: "#FFFFFF" }}>
            {CRMmemberships?.map((CRMMembership) => (
              <CRMMembershipsListTableRow
                selectedMembershipIds={selectedMembershipIds}
                onMembershipClick={onMembershipClick}
                CRMMembership={CRMMembership}
                adminUrlPrefix={adminUrlPrefix}
                key={CRMMembership.id}
                labels = {labels}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
