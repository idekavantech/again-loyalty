import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { text } from "@saas/utils/colors";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Select from "@material-ui/core/Select";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useAddExpense } from "./useAddExpense";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { MuiPickersUtilsProvider , DatePicker } from "@material-ui/pickers";
import moment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import AdminBreadCrumb from "containers/AdminBreadCrumb";

moment.locale("en");
moment.loadPersian({ usePersianDigits: true });

const AddExpense = () => {
  const {
    costCategoryErr,
    priceErr,
    paymentTypeErr,
    descriptionErr,
    isCostCategoryAutocompliteOpen,
    handleCloseCostCategoryAutocomplite,
    handleOpenCostCategoryAutocomplite,
    _isLoadingCreateCostCategory,
    cost,
    clearAllData,
    filteredCostCategory,
    costCategoryInputRef,
    setClickedCostCategory,
    _paymentMethods,
    onCostCategoryTextFieldChange,
    addNewCostCategory,
    createNewCostCategory,
    onPriceChange,
    onDataChange,
    onDescriptionChange,
    onPaymentMethodChange,
    costCategoryTextField,
    submit,
    submitAndClear,
    updateCostCategoryId,
  } = useAddExpense();

  const { minWidth768 } = useResponsive();

  return (
    <div className="container pb-3">
      <AdminBreadCrumb responsive={false} />
      <Paper className="p-4">
        <div className="mb-4 px-2" style={{ fontSize: "1.3rem" }}>
          ثبت هزینه جدید
        </div>
        <div className="d-flex mb-4 flex-row flex-wrap">
          <ClickAwayListener onClickAway={handleCloseCostCategoryAutocomplite}>
            <div className="col-12 px-2 col-lg-3 col-md-4 col-sm-12">
              <p style={{ fontSize: 12, fontWeight: 600, position: "relative" }} className="mb-1">
                دسته‌بندی‌
              </p>

              <TextField
                error={costCategoryErr}
                disabled={_isLoadingCreateCostCategory}
                className="w-100"
                variant="outlined"
                style={{ textAlign: "right", height: 44 }}
                InputProps={{
                  style: { borderRadius: 8, height: 44 },
                }}
                onKeyUp={addNewCostCategory}
                onFocus={handleOpenCostCategoryAutocomplite}
                onClick={handleOpenCostCategoryAutocomplite}
                ref={costCategoryInputRef}
                value={costCategoryTextField}
                onChange={onCostCategoryTextFieldChange}
              />

              <Popper
                placement="bottom"
                style={{ width: minWidth768 ? "18%" : "85%" }}
                anchorEl={costCategoryInputRef.current}
                open={isCostCategoryAutocompliteOpen}
              >
                <Paper
                  style={{
                    maxHeight: "15rem",
                    overflowY: "scroll",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.2  )",
                  }}
                  className="p-2"
                >
                  {filteredCostCategory.length > 0 ? (
                    filteredCostCategory?.map((item, index) => {
                      return (
                        <MenuItem
                          onClick={() => setClickedCostCategory(item.id)}
                          key={item.id}
                          style={{
                            backgroundColor: index === 0 && costCategoryTextField ? "rgba(0,0,0,.05)" : "unset",
                          }}
                        >
                          {item.title}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem onClick={() => createNewCostCategory(updateCostCategoryId)}>
                      ساخت{" "}
                      <span style={{ padding: "0 1rem " }}>
                        <b>{costCategoryTextField}</b>
                      </span>
                    </MenuItem>
                  )}
                </Paper>
              </Popper>
            </div>
          </ClickAwayListener>
          <div className="col-12 px-2 col-lg-3 col-md-4 col-sm-12">
            <p style={{ fontSize: 12, fontWeight: 600, position: "relative" }} className="mb-1">
              مبلغ
            </p>
            <TextField
              error={priceErr}
              value={cost?.price ? priceFormatter(cost.price) : ""}
              className="w-100"
              onChange={onPriceChange}
              variant="outlined"
              style={{ textAlign: "left", height: 44 }}
              InputProps={{
                style: { borderRadius: 8, height: 44 },
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "33px",
                left: "25px",
                color: "rgba(0,0,0,.12)",
              }}
            >
              تومان
            </div>
          </div>
          <div className="col-12 px-2 col-lg-3 col-md-4 col-sm-12">
            <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
              تاریخ
            </p>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale={"fa"}>
              <DatePicker
                style={{
                  border: "1px solid #E4E6E7",
                  flex: 1,
                  borderRadius: 8,
                  height: 44,
                  padding: ".5rem",
                  pointerEvents: "auto",
                }}
                InputProps={{ disableUnderline: true }}
                inputVariant="standard"
                fullWidth={true}
                okLabel="تأیید"
                cancelLabel="لغو"
                ampm={false}
                required
                invalidDateMessage="زمان انتخاب شده صحیح نیست"
                minDateMessage="تاریخ روزهای گذشته مجاز نیست"
                minTime={new Date(0, 0, 0, 9)}
                placeholder="0000/00/00"
                labelFunc={(date) => {
                  return cost?.date ? date.format(" jDD jMMMM - jYYYY") : "";
                }}
                value={cost?.date}
                onChange={onDataChange}
                onClick={(e) => console.log(e)}
              />
            </MuiPickersUtilsProvider>
            <div
              style={{
                position: "absolute",
                top: 32,
                left: 20,
                color: "rgba(0,0,0,.54)",
                pointerEvents: "none",
              }}
            >
              <CalendarTodayIcon />
            </div>
          </div>
        </div>
        <div className="px-2 mb-4">
          <p style={{ color: text.default }} className="mb-2 u-fontWeightHeavy u-font-semi-small">
            شرح
          </p>
          <TextField
            error={descriptionErr}
            style={{ textAlign: "left" }}
            InputProps={{
              style: { borderRadius: 8 },
            }}
            placeholder="یادداشتی برای این‌که بعدا یادتان بیاید"
            floatingLabelText="MultiLine and FloatingLabel"
            multiline
            value={cost?.description || ""}
            onChange={onDescriptionChange}
            minRows={4}
            maxRows={6}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="col-12 px-2 col-lg-3 col-md-5 col-sm-12">
          <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-1">
            نحوه پرداخت
          </p>
          <Select
            error={paymentTypeErr}
            placeholder="بخش بندی"
            variant="outlined"
            style={{
              height: "44px",
              borderRadius: "8px",
            }}
            inputProps={{
              style: {
                backgroundColor: "blue",
                height: "44px",
              },
            }}
            className="w-100 px-4"
            onChange={onPaymentMethodChange}
            value={cost.paymentMethodId || null}
          >
            {_paymentMethods?.map((paymentMethod) => {
              return (
                <MenuItem value={paymentMethod.id} key={paymentMethod.id}>
                  {paymentMethod.title}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="d-flex flex-row-reverse my-2 flex-wrap">
          <Button onClick={clearAllData} className="mx-2 mt-2" color="primary" variant="outlined">
            انصراف
          </Button>
          <Button onClick={submitAndClear} className="mx-2 mt-2" color="primary" variant="outlined">
            ذخیره و ثبت خرید جدید
          </Button>
          <Button
            className="mx-2 mt-2"
            style={{ padding: ".3rem 5rem" }}
            color="primary"
            variant="contained"
            onClick={submit}
          >
            ذخیره
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default AddExpense;
