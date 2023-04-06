import React from "react";
import Paper from "@material-ui/core/Paper";
import { border } from "@saas/utils/colors";
import Input from "@saas/components/Input";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

export default function VendorInfo({
  vendor,
  nameError,
  setNameError,
  setVendor,
  setPhoneNumberError,
  phoneNumberError,
}) {
  if (!vendor) return <LoadingIndicator />;
  return (
    <Paper elevation={2} className="my-4 py-4 px-2">
      <div
        className="pb-4 mx-2"
        style={{ borderBottom: `1px solid ${border.default}` }}
      >
        <div className="flex-1 u-fontLarge u-fontWeightHeavy">
          Supplier information
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row ">
        <div className="mt-3 flex-1 px-2">
          <div className="">The supplier name*</div>
          <Input
            margin="dense"
            value={vendor.name}
            onChange={(name) => {
              setNameError("");
              setVendor({ ...vendor, name });
            }}
            helperText={nameError}
            error={Boolean(nameError)}
          />
        </div>
        <div className="mt-3 flex-1 px-2">
          <div className="">phone number</div>
          <Input
            numberOnly
            margin="dense"
            value={englishNumberToPersianNumber(vendor.phone, "")}
            onChange={(phone) => {
              setPhoneNumberError("");
              setVendor({ ...vendor, phone: persianToEnglishNumber(phone) });
            }}
            helperText={phoneNumberError}
            error={Boolean(phoneNumberError)}
          />
        </div>
      </div>
      <div className=" d-flex flex-column flex-md-row ">
        <div className="mt-3 flex-1 px-2">
          <div className="">State/ City</div>
          <Input
            margin="dense"
            value={vendor.city}
            onChange={(city) => {
              setVendor({ ...vendor, city });
            }}
          />
        </div>
        <div className="mt-3 flex-1 px-2">
          <div className="">Postal code</div>
          <Input
            numberOnly
            margin="dense"
            value={englishNumberToPersianNumber(vendor.postal_code, "")}
            onChange={(postalCode) => {
              setVendor({
                ...vendor,
                postal_code: persianToEnglishNumber(postalCode),
              });
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row ">
        <div className="mt-3 flex-1 px-2">
          <div className="">Address</div>
          <Input
            margin="dense"
            value={vendor.address}
            onChange={(address) => {
              setVendor({ ...vendor, address });
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row ">
        <div className="mt-3 flex-1 px-2">
          <div className="mb-2">Description</div>
          <Input
            multiline
            value={vendor.description}
            onChange={(description) => {
              setVendor({ ...vendor, description });
            }}
          />
        </div>
      </div>
    </Paper>
  );
}
