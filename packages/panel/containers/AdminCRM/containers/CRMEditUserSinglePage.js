/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { memo, useState, useEffect, useMemo } from "react";
import moment from "moment-jalaali";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Input from "@saas/components/Input";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { coal, pollution } from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import Chip from "@material-ui/core/Chip";
import { isPhoneNumber } from "@saas/utils/helpers/isPhoneNumber";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import SaveAndDiscardButtons from "@saas/components/SaveAndDiscardButtons";
import {
  addMembership,
  editMembershipByID,
  deleteMembership,
  postCrmLogs,
  getCRMLabels,
} from "store/actions";
import {
  makeSelectBusiness,
  makeSelectBusinessCRMMembershipById,
} from "@saas/stores/business/selector";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useRouter } from "next/router";
import TickIcon from "@saas/icons/tick";
import Button from "@material-ui/core/Button";
import AddNoteModal from "../../AdminShopping/containers/AdminOrder/containers/Modals/AddNoteModal";
import useTheme from "@material-ui/core/styles/useTheme";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { makeSelectCrmLabels } from "store/selectors";
import {
  addCreditTransaction,
  getCRMMembership,
} from "@saas/stores/business/actions";

function CRMEditUserSinglePage({
  loading,
  _labels,
  _getCRMLabels,
  _getCRMMembership,
  member,
  _editMembershipByID,
  _deleteMembership,
  _addCreditTransaction,
  _addNote,
  business,
}) {
  const theme = useTheme();
  const router = useRouter();
  const memberID = router.query.id;
  const matches = useMediaQuery("(min-width:992px)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [labels, setLabels] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectionInput, setSelectionInput] = useState();
  const [description, setDescription] = useState("");
  const [firstLoading, setFirstLoading] = useState(true);
  const [purseCredit, setPurseCredit] = useState("");
  const [editClicked, setEditClicked] = useState(false);
  const [chargePurse, setChargePurse] = useState("");
  const [chargePurseSending, setChargePurseSending] = useState("");
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [descriptionOptions, setDescriptionOptions] = useState();
  const [extraData, setExtraData] = useState({});
  const _descriptionOptions =
    business?.plugins_config?.crm?.data?.utm?.description_choices;
  const blur = () => {
    if (!isPhoneNumber(phone)) {
      setError("Incorrect contact number entered.");
    } else {
      setError("");
    }
  };
  const handlePurseCredit = (value) => {
    if (editClicked) {
      setPurseCredit(value);
    }
  };
  const handleInputChange = (value) => {
    setSelectionInput(value);
    if (labels.findIndex((label) => label.title === value) === -1) {
      setLabels([...labels, options.find((l) => l.title === value)]);
    }
    setFirstLoading(false);
  };
  const removeLabel = (index) => {
    const __labels = [...labels];
    __labels.splice(index, 1);
    setLabels(__labels);
  };
  const submit = () => {
    _editMembershipByID(
      member.id,
      name,
      phone,
      labels.map((l) => l.id),
      extraData
    );
    const amount = reversePriceFormatter(purseCredit) - member?.wallet_credit;
    _addCreditTransaction(memberID, {
      amount: reversePriceFormatter(amount || chargePurseSending),
      source: "owner",
    });
  };
  const deleteMember = () => {
    _deleteMembership(member.id, null);
  };
  useEffect(() => {
    setTimeout(() => {
      _getCRMLabels();
      _getCRMMembership(memberID);
    }, 0);
  }, []);
  useEffect(() => {
    if (member && _labels) {
      setPhone(member.user.phone_zero_starts);
      setName(member.name);
      setLabels(_labels.filter((l) => member.labels.includes(l.id)));
    }
    if (_labels) {
      setOptions(_labels);
    }
    if (member) {
      setPurseCredit(member?.wallet_credit);
    }
  }, [member, _labels]);
  useEffect(() => {
    setFirstLoading(true);
  }, []);
  const optionInputHTML = (
    <div className="mt-2 mt-lg-4">
      <FormControl variant="outlined" style={{ minWidth: "100%" }}>
        {firstLoading && (
          <div
            id="demo-simple-select-outlined-label"
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            Customer Category
          </div>
        )}
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // label="Customer Category"
          value={selectionInput}
          onChange={(event) => handleInputChange(event.target.value)}
          inputProps={{ "aria-label": "Without label" }}
          className="medium"
        >
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.title}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

  const utmOptionInput = useMemo(() => {
    if (_descriptionOptions?.length) {
      if (description) {
        setExtraData({
          utm_data: { description },
        });
      }
      return (
        <div className="mb-2 mb-lg-4">
          <FormControl variant="outlined" style={{ minWidth: "100%" }}>
            {!description && (
              <div
                id="demo-simple-select-outlined-label"
                style={{ position: "absolute", top: 10, right: 10 }}
              >
                Customer Login Channel{" "}
              </div>
            )}

            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              className="medium"
            >
              {_descriptionOptions?.map((option, index) => (
                <MenuItem key={`${option}-${index}`} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      );
    } else {
      return null;
    }
  }, [business, description]);

  useEffect(() => {
    if (member) {
      setDescription(member?.utm_data?.description);
    }
  }, [member]);

  const nameInputHTML = (
    <Input
      label="Customer Name"
      placeholder="Alireza Etihadi"
      value={name}
      onChange={(value) => setName(value)}
      className="mt-2 mt-lg-0"
      size="medium"
    />
  );

  const handleChargePurse = () => {
    setChargePurse(null);
    const newPurseCredit =
      reversePriceFormatter(chargePurse) + reversePriceFormatter(purseCredit);
    setPurseCredit(newPurseCredit);
  };
  const chargePurseOnChange = (value) => {
    setChargePurse(priceFormatter(value));
    setChargePurseSending(priceFormatter(value));
  };

  return (
    <div className="container">
      <AddNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setAddNoteModalOpen(false)}
        submit={(note) => _addNote({ id: member.id, comment: note })}
      />
      <Head>
        <title>Customer</title>
      </Head>

      <AdminBreadCrumb />

      <Paper elevation={1} className="d-flex mt-3 py-3 flex-wrap">
        <div className="col-12 col-lg-6 mb-lg-3 mb-0">
          <div className="u-fontLarge mb-3" style={{ color: coal }}>
            customer information
          </div>
          <Input
            label="customer number"
            placeholder="۰۹۱۲۹۲۷۶۴۵۵"
            helperText={error}
            type="tel"
            value={phone}
            onBlur={blur}
            onChange={(value) => setPhone(persianToEnglishNumber(value))}
            size="medium"
          />
          {matches ? optionInputHTML : nameInputHTML}
        </div>
        <div className="col-12 col-lg-6">
          <div
            className="u-fontLarge mb-lg-3 mb-0"
            style={{ color: "white", display: matches ? "" : "none" }}
          >
            Basic Information
          </div>
          {matches ? nameInputHTML : optionInputHTML}
        </div>
        <div className="col-12 mb-5">
          <div className="d-flex mt-2 flex-wrap">
            {labels.length ? (
              labels.map((label, index) => (
                <Chip
                  key={index}
                  label={label.title}
                  onDelete={() => removeLabel(index)}
                  color="primary"
                  variant="outlined"
                  className="ml-2 mb-1"
                />
              ))
            ) : (
              <Chip label="No categorization" disabled variant="outlined" />
            )}
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="u-fontLarge mb-3" style={{ color: coal }}>
            Wallet information
          </div>
          <div className="d-flex">
            <Input
              label="Wallet inventory"
              placeholder="Wallet inventory"
              value={priceFormatter(purseCredit)}
              onBlur={blur}
              onChange={(value) => handlePurseCredit(priceFormatter(value))}
              size="medium"
              style={{ width: "98%" }}
            />
            <div
              style={{
                width: "37%",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setEditClicked(!editClicked)}
            >
              {editClicked ? (
                <Button
                  disabled={!chargePurse}
                  style={{
                    width: "100%",
                    flexWrap: "nowrap",
                    background: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                    color: "white",
                    height: 40,
                  }}
                >
                  <TickIcon />
                </Button>
              ) : (
                <Button
                  disabled={!chargePurse}
                  style={{
                    width: "100%",
                    flexWrap: "nowrap",
                    background: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                    color: "white",
                    height: 40,
                  }}
                >
                  Inventory Editing
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 mt-lg-5 ">
          <div className="u-fontLarge mb-3"></div>
          <div className="d-flex">
            <Input
              label="Increased inventory"
              placeholder="Enter the desired amount"
              type="tel"
              value={priceFormatter(chargePurse)}
              onBlur={blur}
              onChange={chargePurseOnChange}
              size="medium"
              style={{ width: "97%" }}
            />
            <Button
              disabled={!chargePurse}
              style={{
                width: "37%",
                flexWrap: "nowrap",
                background: chargePurse
                  ? process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR
                  : "#D2D5D8",
                color: "white",
              }}
              onClick={handleChargePurse}
            >
              Increased inventory
            </Button>
          </div>
        </div>
      </Paper>
      <Paper color={theme.palette.text.tertiary} className="mt-3" elevation={2}>
        <div className="d-flex align-items-center justify-content-between px-5 py-4">
          <div style={{ fontWeight: 500, fontSize: 16 }}>Note</div>
          <div>
            <Button
              color="primary"
              size="small"
              disabled={loading}
              style={{ direction: "ltr" }}
              endIcon={<AddRoundedIcon fontSize="small" />}
              onClick={() => setAddNoteModalOpen(true)}
            >
              Add
            </Button>
          </div>
        </div>
        {member?.extra_data?.history?.length ? (
          <div className="px-5" style={{ color: pollution, fontSize: 13 }}>
            {member?.extra_data?.history?.map((comment) => (
              <div
                key={comment?.created_at}
                className=" pt-4 pb-4"
                style={{
                  borderTop: "1px solid #E4E6E7",
                }}
              >
                <p className="d-flex justify-content-between">
                  <span
                    style={{
                      color: theme.palette.text.tertiary,
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  >
                    {member?.user?.name ? member?.user?.name : "User without name"}
                  </span>
                  <span style={{ fontSize: 12 }}>
                    {englishNumberToPersianNumber(
                      moment(comment?.created_at).format("jYYYY/jMM/jDD")
                    )}
                  </span>
                </p>

                <p className=" pt-4" style={{ fontSize: 14 }}>
                  {comment.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 pb-4" style={{ color: pollution, fontSize: 13 }}>
            Not recorded.
          </div>
        )}
      </Paper>
      <Paper
        elevation={1}
        className="mt-3 py-3 flex-wrap"
        style={{ width: matches ? "50%" : "100%" }}
      >
        <div
          className="u-fontLarge mb-3"
          style={{ paddingRight: 20, color: coal }}
        >
          Customer entry channel information
        </div>
        <div className="d-flex flex-wrap text-right">
          <div className="col-12 mb-0">
            {utmOptionInput}
            <div>UTM Source: {member?.utm_data?.source || "-"}</div>
            <div className="mt-2">
              Site Referer : {member?.utm_data?.referer || "-"}
            </div>
          </div>
        </div>
      </Paper>
      <SaveAndDiscardButtons
        secondButton
        saveAction={submit}
        saveText="Save changes"
        secondButtonText="Remove Customer"
        secondButtonAction={deleteMember}
        disabled={loading}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  _labels: makeSelectCrmLabels(),
  member: makeSelectBusinessCRMMembershipById(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCRMLabels: () => dispatch(getCRMLabels()),
    _addMembership: (data) => dispatch(addMembership(data)),
    _getCRMMembership: (id) => dispatch(getCRMMembership(id)),
    _deleteMembership: (id, callback) =>
      dispatch(deleteMembership(id, callback)),
    _addCreditTransaction: (id, data) =>
      dispatch(addCreditTransaction(id, data)),
    _editMembershipByID: (id, name, phone, labels, extraData) =>
      dispatch(editMembershipByID(id, name, phone, labels, extraData)),
    _addNote: (data) => dispatch(postCrmLogs(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMEditUserSinglePage);
