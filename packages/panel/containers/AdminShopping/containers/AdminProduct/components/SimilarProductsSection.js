import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";
import Collapse from "@material-ui/core/Collapse";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function SimilarProductsSection({
  selectedSimilarProductsLabels,
  labels = [],
  onSimilarProductsLabelsChange,
}) {
  const [collapse, setCollapse] = useState(false);
  const { minWidth768 } = useResponsive();

  useEffect(() => {
    if (
      !collapse &&
      labels?.filter((label) =>
        selectedSimilarProductsLabels.includes(label.id)
      )?.length
    )
      setCollapse(true);
  }, [selectedSimilarProductsLabels, labels, collapse]);

  return (
    <AdminProductInBoxWrapper smallPadding>
      <div className={"col-12"}>
        <div className="d-flex justify-content-between flex-1 py-2">
          <div>
            <div
              className={`u-fontLarge u-fontWeightBold`}
              style={{ ...(!minWidth768 ? { width: "85%" } : {}) }}
            >
              Select similar labels(similar products)
            </div>
            {minWidth768 ? (
              <div className="mt-2" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                To display the same products you want on this product page
                Customers suggest, search for relevant labels.
              </div>
            ) : null}
          </div>
          <div
            className={
              "w-100 d-flex justify-content-between align-items-center"
            }
            style={{ width: 80 }}
          >
            <FormControlLabel
              className="ml-1"
              control={
                <Switch
                  size="small"
                  checked={collapse}
                  onChange={() => setCollapse((prevState) => !prevState)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  color="primary"
                />
              }
              labelPlacement="start"
              label=""
            />
            {collapse ? "active" : "Inactive"}
          </div>
        </div>
        <Collapse in={collapse}>
          <Autocomplete
            multiple
            options={labels}
            getOptionLabel={(option) => option.title}
            onChange={onSimilarProductsLabelsChange}
            value={labels?.filter((label) =>
              selectedSimilarProductsLabels.includes(label.id)
            )}
            filterSelectedOptions
            size="small"
            disableClearable
            ChipProps={{ size: "small", variant: "outlined" }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                size="small"
                variant="outlined"
                placeholder="Searching the label name"
                InputProps={{
                  ...params.InputProps,
                  className: `${params.InputProps.className} pr-2 pl-3`,
                }}
              />
            )}
          />
        </Collapse>
      </div>
    </AdminProductInBoxWrapper>
  );
}
