import React from "react";
import { dust } from "@saas/utils/colors";
import TableCell from "@material-ui/core/TableCell";
import Skeleton from "@material-ui/lab/Skeleton";
import TableRow from "@material-ui/core/TableRow";
import Input from "@saas/components/Input";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useIngredientsBulkEditorRow } from "./useIngredientBulkEditorRow";

function IngredientBulkEditorRow({
  ingredient,
  cells,
  updatedIngredients,
  setUpdatedIngredients,
  isLoading,
  hasVariations,
}) {
  const {
    mainImageThumbnailUrl,
    isMock,
    onIngredientFieldChange,
    title,
    updatedIngredient,
  } = useIngredientsBulkEditorRow({
    ingredient,
    cells,
    updatedIngredients,
    setUpdatedIngredients,
    isLoading,
    hasVariations,
  });

  return (
    <TableRow
      className={isLoading ? "u-pointer-events-none" : ""}
      hover
      style={{ borderBottom: `1px solid ${dust}` }}
    >
      <TableCell
        style={
          mainImageThumbnailUrl || isMock
            ? {
                width: "99%",
                maxWidth: 200,
                borderLeft: `1px solid ${dust}`,
              }
            : {
                width: "99%",
                borderLeft: `1px solid ${dust}`,
                maxWidth: 200,
                paddingRight: 70,
              }
        }
        align="right"
        className="text-nowrap u-text-ellipse"
      >
        {isMock ? (
          <div className="d-flex align-items-center">
            <Skeleton
              style={{
                width: 36,
                height: 36,
                transform: "none",
              }}
              className="ml-2"
            />
            <Skeleton style={{ width: 115 }} />
          </div>
        ) : (
          <>
            {mainImageThumbnailUrl ? (
              <img
                className="u-border-radius-4 ml-2"
                style={{ width: 36, height: 36 }}
                src={mainImageThumbnailUrl}
                alt={title}
              />
            ) : null}
            {title}
          </>
        )}
      </TableCell>
      {cells
        ?.filter((cell) => cell.inputType)
        .map((cell) => (
          <TableCell
            key={cell.id}
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
                numberOnly
                disabled={hasVariations}
                margin="dense"
                className="h-100 px-3"
                inputProps={{ className: "px-0" }}
                value={englishNumberToPersianNumber(
                  updatedIngredient[cell.id] || ingredient[cell.id],
                  ""
                )}
                onChange={onIngredientFieldChange(cell)}
              />
            )}
          </TableCell>
        ))}
    </TableRow>
  );
}

export default IngredientBulkEditorRow;
