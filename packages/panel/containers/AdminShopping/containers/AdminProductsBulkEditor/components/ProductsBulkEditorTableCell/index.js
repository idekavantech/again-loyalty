import React from "react";
import { dust } from "@saas/utils/colors";
import Skeleton from "@material-ui/lab/Skeleton";
import Input from "@saas/components/Input";
import TableCell from "@material-ui/core/TableCell";

export default function BulkEditorTableCell({
  isMock,
  hasVariations,
  value,
  onChange,
  disabled,
  numberOnly = true,
}) {
  return (
    <TableCell
      style={{
        borderLeft: `1px solid ${dust}`,
        verticalAlign: isMock || hasVariations ? "middle" : "top",
      }}
      scope="row"
      className="h-100 p-0"
      align="right"
    >
      {isMock ? (
        <div className="d-flex align-items-center p-2">
          <Skeleton style={{ width: 50 }} />
        </div>
      ) : hasVariations ? (
        <div
          className="text-right w-100 p-2"
          style={{ width: 80, cursor: "not-allowed" }}
        >
          —
        </div>
      ) : (
        <Input
          tableInput
          selectOnFocus
          numberOnly={numberOnly}
          disabled={hasVariations || disabled}
          margin="dense"
          className="h-100 px-3"
          inputProps={{ className: "px-0" }}
          value={value}
          onChange={onChange}
          style={
            disabled
              ? {
                  backgroundImage:
                    "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                  backgroundColor: dust,
                }
              : {}
          }
        />
      )}
    </TableCell>
  );
}
