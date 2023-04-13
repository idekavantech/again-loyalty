import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";
import CRMDiscountRow from "./CRMDiscountRow";

export const customerDiscountConstant = [
  {
    id: 1,
    label: "created at",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 2,
    label: "discount code",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 3,
    label: "Discount amount",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 5,
    label: "Expiration date",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 6,
    label: "",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
];

export default function CRMDiscountTable({
  loading,
  adminUrlPrefix,
  discountCodesData,
}) {
  return (
    <>
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
              {customerDiscountConstant?.map((headCell) => (
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
              {[1, 2, 3, 4, 5].map((item) => (
                <TableRow style={{ height: 53 }} key={item}>
                  {[1, 2, 3, 4, 5].map((cell, index) => (
                    <TableCell key={cell}>
                      <Skeleton
                        style={{
                          transform: "scale(1)",
                          width: index === 0 ? 48 : "100%",
                          height: index === 0 ? 48 : "",
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody style={{ backgroundColor: "#FFFFFF" }}>
              {discountCodesData?.map((discountCodeData) => (
                <CRMDiscountRow
                  discountCodeData={discountCodeData}
                  adminUrlPrefix={adminUrlPrefix}
                  key={`${discountCodeData} - ${discountCodeData.id}`}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
