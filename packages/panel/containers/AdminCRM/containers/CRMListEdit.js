import React, { memo, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import {
  updateCrmLevels,
  addGiftCreditTransaction,
  postCrmLogs,
} from "store/actions";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectCrmLevels, makeSelectCrmLabels } from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import Link from "next/link";
import { getCRMLabels } from "store/actions";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { useRouter } from "next/router";
import {
  makeSelectBusiness,
  makeSelectBusinessCRMMembershipById,
} from "@saas/stores/business/selector";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { updateProfile } from "@saas/stores/user/actions";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { AddNoteModal } from "../../AdminShopping/containers/AdminOrder/containers/Modals/AddNoteModal";
import moment from "moment-jalaali";
import { satisfactionTitle } from "store/constants";
import { SelectLabelmodal } from "./modals/selectLabelmodal";
import {
  addCreditTransaction,
  getCRMMembership,
} from "@saas/stores/business/actions";

function CRMListEdit({
  isLoading,
  adminUrlPrefix,
  crmLabels,
  _getCRMLabels,
  _getCRMMembership,
  member,
  _updateProfile,
  _addCreditTransaction,
  _addGiftCreditTransaction,
  business,
  loading,
  _addNote,
}) {
  const router = useRouter();
  const memberId = router.query.id;
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState({});
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [cancel, setCancel] = useState(false);
  const crmRatingAndLevel = useRef(null);
  const crmGiftCreditRef = useRef(null);
  const walletBalance = useRef(null);
  const [selectedLabels, setSelectedLabels] = useState({});
  const [isSearchModalOpen, toggleSearchModal] = useState(false);

  useEffect(() => {
    if (member) {
      const _selectedLabels = member?.new_labels?.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});

      setSelectedLabels(_selectedLabels);
    }
  }, [member]);
  const handleSelectInput = (selectedInput) => {
    selectedInput?.current?.focus();
  };

  const [crmMemberShipData, setCrmMemberShipData] = useState({
    business: business.id,
    name: "",
    user: { phone: "" },
    point_credit: "",
    labels: [],
    new_labels: [],
  });

  const [crmGiftCredit, setCrmGiftCredit] = useState("");
  const [crmWalletCredit, setCrmWalletCredit] = useState("");
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);

  const submit = () => {
    if (crmWalletCredit !== member?.wallet_credit) {
      const _crmWalletCredit =
        reversePriceFormatter(crmWalletCredit) - member?.wallet_credit;
      _addCreditTransaction(memberId, {
        amount: _crmWalletCredit,
        source: "owner",
      });
    }
    if (crmGiftCredit !== member?.gift_credit) {
      const _crmGifttCredit =
        reversePriceFormatter(crmGiftCredit) - member?.gift_credit;

      _addGiftCreditTransaction(memberId, {
        amount: _crmGifttCredit,
        source: "owner",
      });
    }
    _updateProfile(crmMemberShipData);
  };

  useEffect(() => {
    if (member) {
      setCrmMemberShipData({
        ...crmMemberShipData,
        name: member.name,
        user: { phone: member.user.phone },
        point_credit: member.point_credit,
      });
    }
    setCrmWalletCredit(member?.wallet_credit);
    setCrmGiftCredit(member?.gift_credit);
  }, [member]);

  useEffect(() => {
    if (selectedLabels && Object.keys(selectedLabels)?.length) {
      setCrmMemberShipData({
        ...crmMemberShipData,
        new_labels: [...Object.keys(selectedLabels)],
      });
    }
  }, [selectedLabels]);

  useEffect(() => {
    setTimeout(() => {
      _getCRMLabels();
      if (memberId && memberId != "new") {
        _getCRMMembership(memberId);
      }
    }, 0);
  }, []);
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
      <Paper elevation={3} style={{ marginTop: 28, padding: 24 }}>
        <p
          style={{
            color: "#202223",
            fontsize: 16,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          Customer specifications
        </p>
        <div className="row d-flex align-items-center justify-content-around">
          <div className="col-12 col-lg-2">
            <div
              style={{
                width: 68,
                height: 68,
                backgroundColor: "#F6F6F7",
                border: "1px dashed #D2D5D8",
                borderRadius: 8,
              }}
            ></div>
          </div>
          <div className="ml-0 my-3 my-lg-0 col-12 col-lg-5 pr-lg-0">
            <p style={{ fontsize: 12, fontWeight: 600 }} className="mb-2">
              Full name 
            </p>
            <input
              onChange={(e) =>
                setCrmMemberShipData({
                  ...crmMemberShipData,
                  name: e.target.value,
                })
              }
              value={crmMemberShipData.name}
              style={{
                width: "100%",
                fontSize: 14,
                fontWeight: 400,
                border: "1px solid #E4E6E7",
                color: "#6D717",
                padding: "8px 6px",
                borderRadius: 8,
              }}
            />
          </div>
          <div className="col-12 col-lg-5">
            <p
              style={{
                fontsize: 12,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              phone number
            </p>
            <input
              onChange={(e) =>
                setCrmMemberShipData({
                  ...crmMemberShipData,
                  user: { ...crmMemberShipData.user, phone: e.target.value },
                })
              }
              value={crmMemberShipData.user.phone}
              style={{
                width: "100%",
                fontSize: 14,
                fontWeight: 400,
                border: "1px solid #E4E6E7",
                color: "#6D717",
                padding: "8px 6px",
                borderRadius: 8,
                direction: "ltr",
                textAlign: "right",
              }}
            />
          </div>
        </div>
      </Paper>
      <Divider style={{ background: "#E4E6E7", margin: "24px 0" }} />
      <Paper elevation={3} style={{ padding: 24 }}>
        <p
          style={{
            color: "#202223",
            fontsize: 16,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          customer information
        </p>
        <div className="d-flex align-items-center justify-content-around row">
          <div className="col-12 col-lg-3 mb-4 mb-lg-0">
            <p
              style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
              className="mb-2"
            >
              Rating and Customer Level
            </p>
            {/* <div
              className="d-flex align-items-center justify-content-between px-4 "
              style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
              onClick={() => handleSelectInput(crmRatingAndLevel)}
            >
              <input
                onChange={(e) =>
                  setCrmMemberShipData({
                    ...crmMemberShipData,
                    point_credit: e.target.value,
                  })
                }
                ref={crmRatingAndLevel}
                value={crmMemberShipData?.point_credit}
                style={{
                  width: "50%",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#6D717",
                  padding: "8px 6px",
                }}
              />
              <p
                style={{
                  fontsize: 14,
                  fontweight: 400,
                  color: "#8C9196",
                  whiteSpace: "nowrap",
                }}
              >
                Golden surface
              </p>
            </div> */}
            <div
              className="px-4 py-2 d-flex align-items-center justify-content-between"
              style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
            >
              <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                {member?.point_credit}
              </p>
              <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                {member?.level ? member?.level?.title : "-"}
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-4 mb-lg-0">
            <p
              style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
              className="mb-2"
            >
              Customer satisfaction{" "}
            </p>
            <div
              className="px-4 py-2"
              style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
            >
              <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                {member?.aggregated_data?.review?.satisfaction
                  ? satisfactionTitle(
                      member?.aggregated_data?.review?.satisfaction
                    )
                  : "-"}
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-4 mb-lg-0">
            <p
              style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
              className="mb-2"
            >
              Gift credit
            </p>
            <div
              className="d-flex align-items-center justify-content-between px-4"
              style={{
                border: "1px solid #E4E6E7",
                borderRadius: 8,
                height: 38,
              }}
              onClick={() => handleSelectInput(crmGiftCreditRef)}
            >
              {/* <input
                onChange={(e) => setCrmGiftCredit(e.target.value)}
                ref={crmGiftCreditRef}
                value={priceFormatter(crmGiftCredit)}
                style={{
                  width: "50%",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#6D717",
                  padding: "8px 6px",
                }}
              /> */}

              <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                {priceFormatter(member?.gift_credit)}
              </p>
              <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                ${" "}
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <p
              style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
              className="mb-2"
            >
              Wallet inventory
            </p>
            <div
              className="d-flex align-items-center justify-content-between px-4"
              style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
              onClick={() => handleSelectInput(walletBalance)}
            >
              <input
                value={priceFormatter(crmWalletCredit)}
                onChange={(e) => setCrmWalletCredit(e.target.value)}
                ref={walletBalance}
                style={{
                  width: "50%",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#6D717",
                  padding: "8px 6px",
                }}
              />
              <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                ${" "}
              </p>
            </div>
          </div>
        </div>
        <Divider style={{ background: "#E4E6E7", margin: "24px 0" }} />
        <div className="d-flex align-items-center justify-content-around">
          <div style={{ width: "100%" }}>
            <div className="d-flex align-items-center justify-content-between">
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                Customer segmentation{" "}
              </p>
              <div className="d-flex">
                <Link href={`${adminUrlPrefix}vc/customer_levels/setting`}>
                  <p
                    className="cursor-pointer"
                    style={{
                      fontsize: 12,
                      fontweight: 400,
                      color: "#0050FF",
                    }}
                  >
                    Customer segmentation settings
                  </p>
                </Link>
                <span className="mr-2">
                  <ArrowBackIosIcon style={{ color: "#0050FF", width: 10 }} />
                </span>
              </div>
            </div>
            <div
              className="d-flex align-items-center flex-wrap px-4 pt-3"
              style={{
                width: "100%",
                fontSize: 14,
                fontWeight: 400,
                border: "1px solid #E4E6E7",
                color: "#6D717",
                borderRadius: 8,
              }}
            >
              {member?.segments?.map((crmSegmnet) => (
                <Chip
                  className="ml-4 mb-4"
                  style={{
                    backgroundColor: "#F6F6F7",
                    borderRadius: 8,
                    fontsize: 14,
                    fontweight: 400,
                    color: "#6D7175",
                  }}
                  label={crmSegmnet.title}
                />
              ))}
            </div>
          </div>
        </div>
        <Divider style={{ background: "#E4E6E7", margin: "24px 0" }} />
        <div className="d-flex align-items-center justify-content-around">
          <div style={{ width: "100%" }}>
            <div className="d-flex align-items-center justify-content-between">
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                customer labels
              </p>
              <div className="d-flex">
                <Link href={`${adminUrlPrefix}vc/labels`}>
                  <p
                    className="cursor-pointer"
                    style={{
                      fontsize: 12,
                      fontweight: 400,
                      color: "#0050FF",
                    }}
                  >
                    Tag settings
                  </p>
                </Link>
                <span className="mr-2">
                  <ArrowBackIosIcon style={{ color: "#0050FF", width: 10 }} />
                </span>
              </div>
            </div>
            <div
              className="d-flex align-items-center flex-wrap px-4 pt-3"
              style={{
                width: "100%",
                fontSize: 14,
                fontWeight: 400,
                border: "1px solid #E4E6E7",
                color: "#6D717",
                borderRadius: 8,
                // height
              }}
            >
              {selectedLabels &&
                Object.keys(selectedLabels)?.map((i) => {
                  return (
                    <Chip
                      deleteIcon={
                        <ClearRoundedIcon
                          style={{ color: theme.palette.text.disabled }}
                        />
                      }
                      style={{
                        backgroundColor: "#F6F6F7",
                        borderRadius: 8,
                        fontsize: 14,
                        fontweight: 400,
                        color: "#6D7175",
                      }}
                      className="ml-2 mb-2 py-2"
                      onDelete={() => {
                        const _selectedLabels = { ...selectedLabels };
                        delete _selectedLabels[selectedLabels[i].id];
                        setSelectedLabels({ ..._selectedLabels });
                      }}
                      label={selectedLabels[i].title}
                      key={selectedLabels[i].id}
                    />
                  );
                })}
              <SelectLabelmodal
                isOpen={isSearchModalOpen}
                onClose={() => toggleSearchModal(false)}
                labels={crmLabels}
                loading={isLoading}
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
              />
              <Button
                onClick={() => toggleSearchModal(true)}
                className="px-3 mb-2"
                style={{
                  border: `1px dashed ${theme.palette.primary.main}`,
                  color: `${theme.palette.primary.main}`,
                  fontsize: 14,
                  fontweight: 400,
                }}
              >
                <AddIcon />
                <span className="mr-3">Add label</span>
              </Button>
            </div>
          </div>
        </div>
        <Divider style={{ background: "#E4E6E7", margin: "24px 0" }} />

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
          <div
            className="px-5"
            style={{
              fontSize: 13,
              border: "1px solid #E4E6E7",
              borderRadius: 8,
            }}
          >
            {member?.extra_data?.history?.map((comment) => (
              <div key={comment?.created_at} className=" pt-4 pb-4">
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
          <div className="px-5 pb-4" style={{ fontSize: 13 }}>
            Not recorded.
          </div>
        )}
        <Divider style={{ background: "#E4E6E7", margin: "32px 0 40px 0" }} />

        <div
          className="p-5"
          style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
        >
          <div>UTM Source: {member?.extra_data?.source || "-"}</div>
          <div className="mt-2">
            Site Referer : {member?.extra_data?.referer || "-"}
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
            setOpenCancelModal(true);
          }}
        >
          Cancellation
        </Button>
        <Button
          style={{
            borderRadius: 8,
            background: theme.palette.primary.main,
            color: "#FFFFFF",
          }}
          className="py-2 px-4"
          onClick={() => {
            setOpenSaveModal(true);
          }}
        >
          Save changes
        </Button>
        <AssuranceDialog
          isOpen={openSaveModal}
          closeDialogHandler={() => setOpenSaveModal(false)}
          contentText="Are you sure to save changes?"
          dialogMainActions={() => {
            submit();
            setOpenSaveModal(false);
            router.back();
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setOpenSaveModal(false)}
          dialogSecondActionText="Cancel"
        />
        <AssuranceDialog
          isOpen={openCancelModal}
          closeDialogHandler={() => setOpenCancelModal(false)}
          contentText="Are you sure to cancel the changes?"
          dialogMainActions={() => {
            setCancel(true);
            setOpenCancelModal(false);
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setOpenCancelModal(false)}
          dialogSecondActionText="Cancel"
        />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  business: makeSelectBusiness(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  allCrmLevels: makeSelectCrmLevels(),
  isLoading: makeSelectLoading(),
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  crmLabels: makeSelectCrmLabels(),
  member: makeSelectBusinessCRMMembershipById(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateCustomerLevels: (data) => dispatch(updateCrmLevels(data)),
    _getCRMLabels: () => dispatch(getCRMLabels()),
    _getCRMMembership: (id) => dispatch(getCRMMembership(id)),
    _updateProfile: (data) => dispatch(updateProfile(data)),
    _addCreditTransaction: (id, data) =>
      dispatch(addCreditTransaction(id, data)),
    _addGiftCreditTransaction: (id, data) =>
      dispatch(addGiftCreditTransaction(id, data)),
    _addNote: (data) => dispatch(postCrmLogs(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMListEdit);
