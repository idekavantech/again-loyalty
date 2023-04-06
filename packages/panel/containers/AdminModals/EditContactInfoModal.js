import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { createStructuredSelector } from "reselect";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";

import Modal from "@saas/components/Modal";
import Input from "@saas/components/Input";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { updateBusiness } from "@saas/stores/business/actions";
import DeleteSectionPopup from "@saas/builder/SectionRenderer/components/DeleteSectionPopup";
import ModalHeader from "@saas/components/Modal/ModalHeader";

function EditContactInfoModal({
  isOpen,
  onClose,
  _updateBusiness,
  business,
  loading,
  deleteSection,
}) {
  const [phone, setPhone] = useState(business.phone_zero_starts);
  const [morePhoneNumbers, setMorePhoneNumbers] = useState(
    business.more_phone_numbers.split("\n")
  );
  const [telegram, setTelegram] = useState(
    business.telegram_url || "https://t.me/"
  );
  const [whatsapp, setWhatsapp] = useState(
    business.whatsapp_url || "https://wa.me/"
  );
  const [instagram, setInstagram] = useState(
    business.instagram_url || "https://www.instagram.com/"
  );
  const [linkedIn, setLinkedIn] = useState(
    business.linkedin_url || "https://linkedin.com/in/"
  );
  const [isDialogOpen, openDialog] = useState(false);

  const submit = () => {
    _updateBusiness({
      phone,
      telegram_url: telegram,
      instagram_url: instagram,
      whatsapp_url: whatsapp,
      linkedin_url: linkedIn,
      more_phone_numbers: morePhoneNumbers.map((mpn) => `${mpn}\n`).join(""),
    });
  };
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <ModalHeader
          onRightClick={onClose}
          LeftItem={() => (
            <IconButton>
              <DeleteIcon onClick={() => openDialog(true)} color="inherit" />
            </IconButton>
          )}
        />
      }
      body={
        <div className="mt-2">
          <DeleteSectionPopup
            open={isDialogOpen}
            onClose={() => openDialog(false)}
            submit={() => {
              openDialog(false);
              onClose();
              deleteSection();
            }}
          />
          <div className="px-3">
            <Input
              numberOnly
              type="tel"
              dir="ltr"
              className="my-2"
              value={phone}
              maxlength={11}
              label="The original contact number"
              hasLabel
              onChange={(value) => {
                setPhone(persianToEnglishNumber(value));
              }}
            />
            {morePhoneNumbers.map((mpn, index) => (
              <div key={`number-${mpn}`} className="d-flex align-items-center">
                <Input
                  numberOnly
                  type="tel"
                  dir="ltr"
                  className="my-2"
                  value={mpn}
                  maxlength={11}
                  label="More contact number"
                  hasLabel
                  onChange={(value) => {
                    const newArray = [...morePhoneNumbers];
                    newArray[index] = value;
                    setMorePhoneNumbers(newArray);
                  }}
                />

                <IconButton
                  onClick={() => {
                    const newArray = [...morePhoneNumbers];
                    newArray.splice(index, 1);
                    setMorePhoneNumbers(newArray);
                  }}
                >
                  <DeleteRoundedIcon color="primary" />
                </IconButton>
              </div>
            ))}
            <Button
              onClick={() => {
                setMorePhoneNumbers([...morePhoneNumbers, ""]);
              }}
              style={{ direction: "ltr" }}
              endIcon={<Add fontSize="small" color="primary" />}
              color="primary"
            >
              Add more contact number
            </Button>
          </div>
          <div className="px-3">
            <div className="my-2">
              <Input
                value={telegram}
                style={{ direction: "ltr" }}
                onChange={(value) => {
                  if (value.search("https://t.me/") > -1) setTelegram(value);
                }}
              />
            </div>
            <div className="my-2">
              <Input
                value={instagram}
                style={{ direction: "ltr" }}
                onChange={(value) => {
                  if (value.search("https://www.instagram.com/") > -1)
                    setInstagram(value);
                }}
              />
            </div>
            <div className="my-2">
              <Input
                value={whatsapp}
                style={{ direction: "ltr" }}
                onChange={(value) => {
                  if (value.search("https://wa.me/") > -1) setWhatsapp(value);
                }}
              />
            </div>
            <div className="my-2">
              <Input
                value={linkedIn}
                style={{ direction: "ltr" }}
                onChange={(value) => {
                  if (value.search("https://linkedin.com/in/") > -1)
                    setLinkedIn(value);
                }}
              />
            </div>
          </div>
        </div>
      }
      cta={
        <>
          <Button
            color="primary"
            className="w-100"
            variant="contained"
            onClick={submit}
            disabled={loading}
          >
            Store
          </Button>
        </>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data) => dispatch(updateBusiness(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EditContactInfoModal);
