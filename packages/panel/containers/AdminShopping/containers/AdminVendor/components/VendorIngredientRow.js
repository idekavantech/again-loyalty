import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Skeleton from "@material-ui/lab/Skeleton";
import { border } from "@saas/utils/colors";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Button from "@material-ui/core/Button";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Input from "@saas/components/Input";

export default function VendorIngredientRow({
  vendorIngredient,
  updateVendorItem,
}) {
  const { id, price, variation } = vendorIngredient;
  const title = variation.resource_title;
  const sku = variation.sku;
  const isMock = !id;
  const [enabled, setEnabled] = useState(false);
  const [focused, setFocused] = useState(false);
  const [editedPrice, setPrice] = useState(price);
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <TableRow
        onClick={() => {}}
        className={isLoading ? "u-pointer-events-none" : "u-cursor-pointer"}
        style={{ height: 56, borderBottom: `1px solid ${border.subdued}` }}
        key={id}
      >
        <TableCell style={{ width: "99%" }} scope="row" align="right">
          {isMock ? <Skeleton style={{ width: 150 }} /> : title}
        </TableCell>
        <TableCell align="center">
          {isMock ? (
            <Skeleton style={{ width: 150 }} />
          ) : (
            englishNumberToPersianNumber(sku)
          )}
        </TableCell>
        <TableCell align="right" className="u-pre">
          {isMock ? (
            <Skeleton style={{ width: 150 }} />
          ) : !enabled ? (
            <div>{priceFormatter(editedPrice)} $</div>
          ) : (
            <Input
              style={
                focused
                  ? {
                      height: 32,
                      borderRadius: 4,
                      padding: "0 8px",
                    }
                  : {
                      height: 32,
                      borderRadius: 4,
                      padding: "0 8px",
                      border: focused ? "unset" : `1px solid ${border.subdued}`,
                    }
              }
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
              value={englishNumberToPersianNumber(editedPrice, "")}
              onChange={(value) => {
                setPrice(persianToEnglishNumber(value));
              }}
              numberOnly
              tableInput
            />
          )}
        </TableCell>
        <TableCell
          onClick={(e) => {
            e.preventDefault();
          }}
          align="right"
        >
          <Button
            variant={enabled ? "contained" : "outlined"}
            disabled={isLoading}
            onClick={() => {
              if (!enabled) {
                setEnabled(true);
              } else {
                setLoading(true);
                updateVendorItem(id, { price: editedPrice }, () => {
                  setEnabled(false);
                  setLoading(false);
                });
              }
            }}
            style={{ height: 24, width: 24, minWidth: 0 }}
            color="primary"
            size="small"
          >
            {enabled ? (
              <CheckRoundedIcon fontSize="small" />
            ) : (
              <EditRoundedIcon color="primary" fontSize="small" />
            )}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
