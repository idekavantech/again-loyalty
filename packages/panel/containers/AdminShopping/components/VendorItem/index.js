import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import PopUp from "@saas/components/PopUp";
import Input from "@saas/components/Input";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { text } from "@saas/utils/colors";

export default function VendorItem({
  _updateVendorItem,
  _createVendorItem,
  vendorItem,
  _deleteVendorItem,
  clearNewVendorItems,
  availableVendors,
}) {
  const {minWidth992} = useResponsive()
  const [price, setPrice] = useState(vendorItem?.price || "");
  const [priceError, setPriceError] = useState("");
  const [vendor, setVendor] = useState(vendorItem?.vendor || "");
  const [vendorError, setVendorError] = useState("");
  const [enabled, setEnabled] = useState(!vendorItem.id);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    let hasError = false;
    if (!price) {
      setPriceError("Importing the price is mandatory.");
      hasError = true;
    }
    if (!vendor) {
      setVendorError("The import of supplier is required.");
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      if (vendorItem.id) {
        _updateVendorItem(
          vendorItem.id,
          { vendor_id: vendor.id, price: parseInt(price) },
          () => {
            setLoading(false);
            setEnabled(false);
          }
        );
      } else {
        _createVendorItem(
          { vendor_id: vendor.id, price: parseInt(price) },
          () => {
            setLoading(false);
            setEnabled(false);
            clearNewVendorItems();
          }
        );
      }
    }
  };
  const [deleteDialog, setDeleteDialog] = useState(null);
  return (
    <>
      <PopUp
        open={Boolean(deleteDialog)}
        onClose={() => setDeleteDialog(null)}
        text="Would you like to remove the supplier from this product?"
        submitText="Delete"
        closeText="Cancel"
        onSubmit={() => {
          setLoading(true);
          setDeleteDialog(null);
          _deleteVendorItem(deleteDialog, () => setLoading(false));
        }}
      />
      <div className="mt-2 px-3 d-flex flex-column flex-lg-row justify-content-between align-items-start">
        <div
          style={{ minWidth: 200 }}
          className={`d-flex flex-column flex-lg-row mb-2 ${
            minWidth992 ? "" : "w-100"
          }`}
        >
          <Autocomplete
            size="small"
            className="w-100"
            noOptionsText="The result was not found.."
            disableClearable
            disabled={!!vendorItem.id}
            style={{ height: 43 }}
            options={availableVendors}
            getOptionLabel={(i) => i.name || ""}
            value={vendor || ""}
            onChange={(e, option) => {
              setVendorError("");
              setVendor(option);
            }}
            renderInput={(params) => (
              <Input
                {...params}
                error={Boolean(vendorError)}
                helperText={vendorError}
                inputProps={{
                  ...params.inputProps,
                  style: { paddingTop: 0 },
                }}
                InputProps={{
                  ...params.InputProps,
                  className: `${params.InputProps.className} pr-2`,
                }}
                size="medium"
                className="medium"
                variant="outlined"
                color="primary"
              />
            )}
          />
        </div>
        <div
          className={`d-flex flex-1 flex-column position-relative flex-lg-row mb-2 ${
            minWidth992 ? "mr-3" : "w-100"
          }`}
        >
          <Input
            className="mb-2"
            numberOnly
            placeholder="Price supply"
            error={Boolean(priceError)}
            helperText={priceError}
            disabled={!enabled}
            value={englishNumberToPersianNumber(price, "")}
            onChange={(value) => {
              setPriceError("");
              setPrice(persianToEnglishNumber(value));
            }}
            size="medium"
          />
          <div
            style={{ color: text.subdued }}
            className="position-absolute left-0 ml-2 mt-2"
          >
            $
          </div>
        </div>
        <div
          className={`d-flex mb-2 align-items-center ${
            minWidth992 ? "mr-3" : "w-100"
          }`}
        >
          <Button
            className={minWidth992 ? "" : "flex-1"}
            variant={enabled ? "contained" : "outlined"}
            style={{ width: 40, height: 40, minWidth: 0 }}
            size="small"
            disabled={loading}
            color="primary"
            onClick={() => {
              if (enabled) submit();
              else setEnabled(true);
            }}
          >
            {enabled ? (
              <CheckRoundedIcon className="mx-2" />
            ) : (
              <EditRoundedIcon className="mx-2" />
            )}
            {!minWidth992 ? (enabled ? "Confirm" : "Edit") : ""}
          </Button>
          <Button
            className="mr-2"
            disabled={loading}
            variant="outlined"
            style={{ width: 40, height: 40, minWidth: 0 }}
            size="small"
            color="primary"
          >
            <DeleteIcon
              onClick={() => {
                if (vendorItem.id) setDeleteDialog(vendorItem.id);
                else clearNewVendorItems();
              }}
              color="inherit"
            />
          </Button>
        </div>
      </div>
    </>
  );
}
