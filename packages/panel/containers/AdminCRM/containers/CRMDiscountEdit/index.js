import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Head from "next/head";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { AddNoteModal } from "containers/AdminShopping/containers/AdminOrder/containers/Modals/AddNoteModal";
import { discountCodeValue , PERCENT , PRICE} from "../../constants";
import MenuItem from "@material-ui/core/MenuItem";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SingleDatePicker from "@saas/components/SingleDatePicker";
import  TextField  from "@material-ui/core/TextField";

import {useCRMDiscountEdit} from "./useCRMDiscountEdit"
import LoadingIndicator from "@saas/components/LoadingIndicator";

function CRMDiscountEdit() {

  const {    
    isLoading,    
    router,
    theme,
    discountFloorErr,
    validate,
    submit,
    isSaveMoalOpen,
    setIsSaveMoalOpen,
    isCancelModalOpen,
    setIsCancelModalOpen,
    minimumDiscount,
    MaximumDiscount,
    isAddNoteModalOpen,
    handleSelectInput,
    discountCodeAmount,
    setAddNoteModalOpen,
    discountData,
    discountCodeId,
    onDiscountCodeChange,
    onDiscountAmountChange,
    onDiscountSelectChange,
    onDiscountFloorAmountChange,
    onDiscountCeilingChange,
    onDiscountCeilingUseChange,
    onExpirationDateChange,
    onDiscountMaxUsingNumberChange
  } = useCRMDiscountEdit()


  if(isLoading){
    return <LoadingIndicator height="80vh" />
  }else{
  return (
    <div className="container">
      <AddNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setAddNoteModalOpen(false)}
        submit={(note) => _addNote({ id: member.id, comment: note })}
      />

      <Head>
        <title>Customer Name</title>
      </Head>

      <AdminBreadCrumb />
      <Paper elevation={3} style={{ padding: 24 }}>
        <p
          style={{
            color: "#202223",
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          General information
        </p>
        <p
          style={{
            fontSize: 14,
            fontweight: 400,
            lineHeight: "24px",
            color: "#6D7175",
            marginBottom: 24,
          }}
        >
           In this section, the original discount code information is the title of the discount code, the amount of the discount code(In terms of percentage or USD) And its expiration-date.
          Note that after saving the changes, the discount code title will not be editable. 
        </p>
        <div
          className="d-flex align-items-center justify-content-between flex-lg-row flex-md-column flex-sm-column flex-column ltr-force"
        >
          <div
            className="col-12 col-lg-4 mb-4 mb-xl-0 pl-lg-4"
            style={{ padding: 0 }}
          >
            <p
              style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
              className="mb-2"
            >
              discount code*
            </p>
            <div  
                className="d-flex align-items-center justify-content-between px-4 py-3"
                style={{
                  border: "1px solid #E4E6E7",
                  borderRadius: 8,
                  height: 44,
                }}
                >
            <TextField
              value={discountData?.code}
              className="px-4 py-3"
              placeholder="Enter the Discount Code"
              onChange={onDiscountCodeChange}
              disabled={discountCodeId && discountCodeId !== "new"}
              InputProps={{ 
                disableUnderline: true , 
                style: {
                  background:"red !important"
                } }}
              style={{
                width: "100%",
                fontSize: 14,
                fontWeight: 400,
                color: "#6D717",
              }}

            />
            </div>
          </div>

          <div
            className="col-12 col-lg-4 mb-4 mb-xl-0 pl-lg-4"
            style={{ padding: 0 }}
          >
            <p
              style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
              className="mb-2"
            >
              Discount amount*{" "}
            </p>
            <div
              className="discountAmount d-flex align-items-center justify-content-between px-4 py-3 position-relative"
              style={{
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                height: 44,
              }}
            >
              <TextField
                value={
                  discountData?.discount_price
                    ? discountData.discount_price
                    : discountData.discount_percent
                }
                InputProps={{ disableUnderline: true }}
                placeholder=" Discount code"
                type="number"
                onChange={onDiscountAmountChange}
                style={{
                  width: "50%",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#6D717",
                }}
              />
              <div>
                <Select
                  focused={false}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: 44,
                    padding: 0,
                    border: "none",
                  }}
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  disableUnderline
                  IconComponent={() => null}
                  className="w-25 "
                  inputProps={{ style: { border: "none" } }}
                  onChange={onDiscountSelectChange}
                  value={discountCodeAmount}
                >
                  {discountCodeValue.map((discounttype) => (
                    <MenuItem key={discounttype.type} value={discounttype.type}>
                      {discounttype.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4 mb-4 mb-xl-0 pl-lg-4" style={{ padding: 0 }}>
            <p
              style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
              className="mb-2"
            >
              Expiration date*
            </p>
            <div
              className="discountDatePicker d-flex align-items-center pl-4"
              style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
            >
              <SingleDatePicker
                inputProps={{
                  style: {
                    width: "100%",
                    height: 42,
                    padding: "0 14px",
                  },
                }}
                disableFuture={false}
                selectedDate={discountData?.expiration_date ?? null}
                handleDateChange={onExpirationDateChange}
                placeholder="00/ 00/ 00"
              />
              <div className="mx-3 d-flex align-items-center ">
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3333 2.00033H11.6666V0.666992H10.3333V2.00033H3.66665V0.666992H2.33331V2.00033H1.66665C0.933313 2.00033 0.333313 2.60033 0.333313 3.33366V14.0003C0.333313 14.7337 0.933313 15.3337 1.66665 15.3337H12.3333C13.0666 15.3337 13.6666 14.7337 13.6666 14.0003V3.33366C13.6666 2.60033 13.0666 2.00033 12.3333 2.00033ZM12.3333 14.0003H1.66665V5.33366H12.3333V14.0003Z"
                  fill="black"
                  fillOpacity="0.54"
                />
              </svg>
              </div>
            </div>
          </div>
        </div>

        <Divider style={{ background: "#E4E6E7", margin: "24px 0" }} />
        <div>
          <p style={{ fontSize: 16, fontWeight: 600 }} className="pb-2">
            More settings
          </p>
          <p style={{ color: "#6D7175", fontsize: 14, marginBottom: 24 }}>
            In this section you can make more settings for your discount code.
            Filling the following fields is not mandatory.
            <br/>
            <br/>
            Use ceiling: The total number of times this code can be used by all users.
          </p>
          <div
            className="d-flex align-items-center justify-content-around row"
            style={{ padding: "0px 20px" }}
          >
            <div
              className="col-12 col-xl-3 mb-4 mb-xl-0 pl-xl-4"
              style={{ padding: 0 , height:80}}
            >
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                  Minimum purchase
              </p>
              <div
                className="d-flex align-items-center justify-content-between px-4 py-3"
                style={{
                  border: `1px solid ${discountFloorErr ? "red" : "#E4E6E7"} `,
                  borderRadius: 8,
                  height: 44,
                }}
                onClick={() => handleSelectInput(minimumDiscount)}
              >
                <TextField
                  placeholder="Enter the amount"
                  value={discountData?.discount_floor_amount}
                  type="number"
                  InputProps={{ disableUnderline: true }}
                  onChange={onDiscountFloorAmountChange}
                  ref={minimumDiscount}
                  style={{
                    width: "50%",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#6D717",
                  }}
                />
                <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                  ${" "}
                </p>
              </div>
              {
                discountFloorErr && <p style={{color:"red"}}>Minimum purchase{discountData.discount_price} $</p>
              }
              
            </div>
           { discountCodeAmount === PERCENT &&  <div
              className="col-12 col-xl-3 mb-4 mb-xl-0 pl-xl-4"
              style={{ padding: 0 ,height:80}}
            >
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                Maximum discount amount
              </p>
              <div
                className="d-flex align-items-center justify-content-between px-4 py-3"
                style={{
                  border: "1px solid #E4E6E7",
                  borderRadius: 8,
                  height: 44,
                }}
                onClick={() => handleSelectInput(MaximumDiscount)}
              >
                <TextField
                  disabled={discountCodeAmount === "price"}
                  placeholder="Enter the amount"
                  value={discountData?.discount_ceiling_amount}
                  type="number"
                  InputProps={{ disableUnderline: true }}
                  onChange={onDiscountCeilingChange}
                  ref={MaximumDiscount}
                  style={{
                    width: "50%",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#6D717",
                  }}
                />
                <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                  ${" "}
                </p>
              </div>
            </div>}

            <div
              className="col-12 col-xl-3 mb-4 mb-xl-0 pl-xl-4"
              style={{ padding: 0 ,height:80}}
            >
              <p
                style={{
                  fontsize: 12,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
                className="mb-2"
              >
              Ceiling Use per user
              </p>
              <div 
                className="d-flex align-items-center justify-content-between px-4 py-3"
                style={{
                  border: "1px solid #E4E6E7",
                  borderRadius: 8,
                  height: 44,
                }}
              >
                <TextField
                    style={{
                      width: "100%",
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#6D717",
                    }}
                  InputProps={{ disableUnderline: true }}
                  value={discountData?.max_using_number_per_user}
                  placeholder="Entering the number"
                  type="number"
                  onChange={onDiscountMaxUsingNumberChange}
                />
              </div>
            </div>
            <div
              className="col-12 col-xl-3 mb-4 mb-xl-0 pl-xl-4"
              style={{ padding: 0 ,height:80 }}
            >
              <p
                style={{
                  fontsize: 12,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
                className="mb-2"
              >
                Total use ceiling
              </p>
              <div 
                className="d-flex align-items-center justify-content-between px-4 py-3"
                style={{
                  border: "1px solid #E4E6E7",
                  borderRadius: 8,
                  height: 44,
                }}
              >
                <TextField
                    style={{
                      width: "100%",
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#6D717",
                    }}
                  InputProps={{ disableUnderline: true }}
                  value={discountData?.max_using_total}
                  placeholder="Unlimited"
                  type="number"
                  onChange={onDiscountCeilingUseChange}
                />
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <Divider style={{ background: "#E4E6E7", margin: "32px 0 40px 0" }} />
      <div className="d-flex justify-content-end">
        <Button
          style={{
            border: "1px solid #8C9196",
            borderRadius: 8,
            color: "#6D7175",
          }}
          className="py-2 px-4 ml-4"
          onClick={() => {
            setIsCancelModalOpen(true);
          }}
        >
          Cancel
        </Button>
        <Button
          style={{
            borderRadius: 8,
            background: theme.palette.primary.main,
            color: "#FFFFFF",
          }}
          className="py-2 px-4"
          onClick={() => {
            validate() && setIsSaveMoalOpen(true); 
          }}
        >
          Save changes
        </Button>
        <AssuranceDialog
          isOpen={isSaveMoalOpen}
          closeDialogHandler={() => setIsSaveMoalOpen(false)}
          contentText="Are you sure to save changes?"
          dialogSecondActionTextColor="primary"
          dialogMainActions={() => {
            submit();
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setIsSaveMoalOpen(false)}
          dialogSecondActionText="No"
        />
        <AssuranceDialog
          isOpen={isCancelModalOpen}
          closeDialogHandler={() => setIsCancelModalOpen(false)}
          contentText="Are you sure to cancel the changes?"
          dialogSecondActionTextColor="primary"
          dialogMainActions={() => {
            setIsCancelModalOpen(false);
            router.back()
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setIsCancelModalOpen(false)}
          dialogSecondActionText="No"
        />
      </div>
    </div>
  );
  }
}



export default memo(CRMDiscountEdit);
