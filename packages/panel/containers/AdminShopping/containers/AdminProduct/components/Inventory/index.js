import React from "react";
import { alterInventoryOptions } from "@saas/stores/plugins/constants";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { dust } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import FormControl from "@material-ui/core/FormControl";

import Input from "@saas/components/Input";
import useTheme from "@material-ui/core/styles/useTheme";
import { availableOnDayOptions } from "store/constants";
import Collapse from "@material-ui/core/Collapse";
import { Collapse as ReactCollapse } from "react-collapse";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import AdminProductInBoxWrapper from "../AdminProductInBoxWrapper";
import { useRouter } from "next/router";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function Inventory({
  isSuper,
  product: p,
  setProduct,
  adjustment = {},
  onProductInventoryReasonChange,
  onProductInventoryAmountChange,
  onProductKeepSellingChange,
  onProductAlertingChange,
  onProductThresholdChange,
}) {
  const theme = useTheme();
  const _product = { ...p, extra_data: p.extra_data || {} };

  const {
    variations: [
      {
        threshold,
        keep_selling: keepSelling,
        productId,
        alerting,
        inventory_count: inventoryCount,
      },
    ],
  } = _product;
  const {
    extra_data: { only_on_day: selectedDays = [] },
  } = _product;
  const product =
    _product?.deals?.find((deal) => deal.id === productId) || _product;
  const { reason = "", amount } = adjustment;

  const router = useRouter();
  const { minWidth768 } = useResponsive();

  const hasProductId = router.query.id !== "new";
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                  .ReactCollapse--collapse {
                    width: 100%;
                  }
                `,
        }}
      ></style>
      <div
        style={{
          padding: `20px ${minWidth768 ? "50px" : "20px"}`,
          fontWeight: 600,
          borderBottom: "1px solid #EEEEEE",
        }}
        className="u-fontVeryLarge"
      >
        Product status
      </div>

      <AdminProductInBoxWrapper smallPadding>
        <div className={"d-flex flex-wrap mb-5"}>
          <div className={"d-flex col-12 col-lg-6 flex-wrap"}>
            {!isSuper ? (
              <div
                className={`col-12 d-flex align-items-center w-100 my-2 ${
                  !minWidth768 && "px-0"
                }`}
              >
                <div
                  className={
                    "d-flex w-100 justify-content-between align-items-center"
                  }
                >
                  <p className={"u-fontSemiLarge"}>View status on the site</p>
                  <div
                    className={
                      "d-flex justify-content-between align-items-center"
                    }
                    style={{ width: 100 }}
                  >
                    <Switch
                      key={`switch-${Boolean(product.variations[0].is_active)}`}
                      className="ml-1"
                      size="small"
                      checked={product.variations[0].is_active}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          variations: [
                            {
                              ...product.variations[0],
                              is_active: e.target.checked,
                              pos_is_active: e.target.checked,
                            },
                          ],
                        })
                      }
                      color="primary"
                    />
                    <span className={"u-fontSemiLarge"}>
                      {product.variations[0].is_active ? "active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
            {!isSuper ? (
              <div
                className={`col-12 d-flex align-items-center w-100 my-2 flex-col ${
                  !minWidth768 ? "px-0" : ""
                }`}
                style={{ top: minWidth768 ? 10 : 0 }}
              >
                <div
                  className={
                    "d-flex w-100 justify-content-between align-items-center"
                  }
                >
                  <p className={"u-fontSemiLarge"}>Sale based on inventory</p>
                  <div
                    className={
                      "d-flex justify-content-between align-items-center"
                    }
                    style={{ width: 100 }}
                  >
                    <Switch
                      key={`switch-${Boolean(keepSelling)}`}
                      className="ml-1"
                      size="small"
                      checked={!keepSelling}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={onProductKeepSellingChange}
                      color="primary"
                    />
                    <span className={"u-fontSemiLarge"}>
                      {!keepSelling ? "active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <ReactCollapse
                  style={{ width: "100%" }}
                  isOpened={!keepSelling}
                >
                  <div className="p-4">
                    <div
                      style={{ border: `1px solid ${dust}`, borderBottom: 0 }}
                    >
                      <>
                        <div
                          style={{ borderBottom: `1px solid ${dust}` }}
                          className="d-flex col-12 px-0 align-items-center"
                        >
                          <div
                            style={{
                              height: 40,
                              backgroundColor: theme.palette.background.paper,
                            }}
                            className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                          >
                            the reason
                          </div>
                          <FormControl
                            className="col-8 my-0 px-0"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            size="small"
                            outline="none"
                          >
                            <Select
                              style={{ border: "none" }}
                              value={reason}
                              disabled={!hasProductId}
                              onChange={onProductInventoryReasonChange}
                              inputProps={{
                                style: { border: "none" },
                                outline: "none",
                              }}
                              displayEmpty
                              input={<Input tableInput />}
                            >
                              <MenuItem value="" disabled>
                                Choose the reason
                              </MenuItem>
                              {Object.entries(alterInventoryOptions).map(
                                ([key, option]) => (
                                  <MenuItem key={key} value={key}>
                                    {option.text}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </div>
                        {reason ? (
                          <div
                            style={{ borderBottom: `1px solid ${dust}` }}
                            className="d-flex col-12 px-0 align-items-center"
                          >
                            <div
                              style={{
                                height: 40,
                                backgroundColor: theme.palette.background.paper,
                              }}
                              className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                            >
                              {alterInventoryOptions[reason].actionText}
                            </div>
                            <Input
                              className="col-8"
                              style={{ height: 40 }}
                              margin="dense"
                              value={englishNumberToPersianNumber(amount, "")}
                              numberOnly
                              tableInput
                              onChange={onProductInventoryAmountChange}
                            />
                          </div>
                        ) : null}
                        <div
                          style={{ borderBottom: `1px solid ${dust}` }}
                          className="d-flex col-12 px-0 align-items-center"
                        >
                          <div
                            style={{
                              height: 40,
                              backgroundColor: theme.palette.background.paper,
                            }}
                            className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                          >
                            {reason
                              ? alterInventoryOptions[reason].countText
                              : "Available in the system"}
                          </div>
                          <div
                            style={{
                              height: 40,
                              backgroundImage: reason
                                ? "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)"
                                : "",
                              backgroundColor: reason ? dust : "",
                            }}
                            className="d-flex flex-1 px-0 col-8 align-items-center direction-ltr justify-content-end px-3"
                          >
                            {englishNumberToPersianNumber(inventoryCount)}
                            {reason &&
                              amount &&
                              alterInventoryOptions[reason].action === "plus" &&
                              " + "}
                            {reason &&
                              amount &&
                              alterInventoryOptions[reason].action ===
                                "minus" &&
                              " - "}

                            {reason &&
                            amount &&
                            (alterInventoryOptions[reason].action === "plus" ||
                              alterInventoryOptions[reason].action === "minus")
                              ? englishNumberToPersianNumber(amount)
                              : ""}

                            {reason &&
                            amount &&
                            (alterInventoryOptions[reason].action === "plus" ||
                              alterInventoryOptions[reason].action === "minus")
                              ? " = "
                              : ""}

                            {reason &&
                            amount &&
                            alterInventoryOptions[reason].action === "plus"
                              ? englishNumberToPersianNumber(
                                  inventoryCount + parseInt(amount)
                                )
                              : ""}
                            {reason &&
                            amount &&
                            alterInventoryOptions[reason].action === "minus"
                              ? englishNumberToPersianNumber(
                                  inventoryCount - amount
                                )
                              : ""}
                          </div>
                        </div>
                      </>
                    </div>
                    <FormControlLabel
                      className="d-block mt-4"
                      control={
                        <Switch
                          key={`switch-${alerting}`}
                          className="ml-2"
                          size="small"
                          checked={alerting}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onChange={onProductAlertingChange}
                          color="primary"
                        />
                      }
                      labelPlacement="start"
                      label="Completed alert"
                    />
                    <Collapse in={alerting}>
                      <div
                        style={{ border: `1px solid ${dust}` }}
                        className="d-flex mt-4 col-12 px-0 align-items-center"
                      >
                        <div
                          style={{
                            height: 40,
                            backgroundColor: theme.palette.background.paper,
                          }}
                          className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                        >
                          Alert Inventory
                        </div>
                        <Input
                          numberOnly
                          tableInput
                          margin="dense"
                          style={{ height: 40 }}
                          className="col-8"
                          value={englishNumberToPersianNumber(threshold, "")}
                          onChange={onProductThresholdChange}
                        />
                      </div>
                    </Collapse>
                  </div>
                </ReactCollapse>
              </div>
            ) : null}
          </div>
          <div
            className={
              "d-flex col-12 col-lg-6 justify-content-between flex-wrap"
            }
            style={{ maxHeight: 70 }}
          >
            <div
              className={`col-12 d-flex align-items-center my-2 w-100 ${
                !minWidth768 && "px-0"
              }`}
            >
              <div
                className={
                  "d-flex w-100 justify-content-between align-items-center"
                }
              >
                <p className={"u-fontSemiLarge"}>On all days of the week</p>
                <div
                  className={
                    "d-flex justify-content-between align-items-center"
                  }
                  style={{ width: 100 }}
                >
                  <Switch
                    key={`switch-${Boolean(selectedDays.length === 0)}`}
                    className="ml-1"
                    size="small"
                    checked={selectedDays.length === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      if (e.target.checked)
                        setProduct({
                          ...product,
                          extra_data: {
                            ...product.extra_data,
                            only_on_day: [],
                          },
                        });
                      else
                        setProduct({
                          ...product,
                          extra_data: {
                            ...product.extra_data,
                            only_on_day: availableOnDayOptions,
                          },
                        });
                    }}
                    color="primary"
                  />
                  <span className={"u-fontSemiLarge"}>
                    {selectedDays.length === 0 ? "active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <div className={`col-12 ${!minWidth768 && "px-0"}`}>
              <Autocomplete
                multiple
                disabled={selectedDays.length === 0}
                options={availableOnDayOptions}
                getOptionLabel={(option) => option.text}
                onChange={(e, newValue) => {
                  if (newValue.length > 0)
                    setProduct({
                      ...product,
                      extra_data: {
                        ...product.extra_data,
                        only_on_day: newValue,
                      },
                    });
                }}
                defaultValue={selectedDays}
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
                    placeholder={
                      selectedDays.length !== 0
                        ? "Select"
                        : "On all days of the week"
                    }
                    InputProps={{
                      ...params.InputProps,
                      className: `${params.InputProps.className} pr-2 pl-3`,
                      style: {
                        backgroundColor:
                          selectedDays.length === 0 ? "#F9F8F8" : "#FFF",
                      },
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </AdminProductInBoxWrapper>
    </div>
  );
}
