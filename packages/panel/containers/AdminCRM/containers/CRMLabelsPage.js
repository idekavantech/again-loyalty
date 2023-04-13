import React, { memo, useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { textTypes } from "@saas/utils/colors";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@saas/icons/addIcon";
import CRMLabelsPageTable from "./CRMLabelsPageTable";
import { createCRMLabel, getLabels, updateCrmLables } from "store/actions";
import { makeSelectCrmLabels } from "store/selectors";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import useTheme from "@material-ui/core/styles/useTheme";
import AdminBreadCrumb from "../../AdminBreadCrumb";

function CRMLabelsPage({
  isLoading,
  allCrmLabels,
  _getCRMLabels,
  _createLabel
}) {
  const [labelValue, setLabelValue] = useState("");
  const [labels, setLabels] = useState([]);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      _getCRMLabels();
    }, 0);
  }, []);

  useEffect(() => {
    if (Boolean(allCrmLabels?.length)) {
      setLabels(allCrmLabels);
    }
  }, [allCrmLabels]);

  useEffect(() => {
    if (isCancel) {
      setLabels(allCrmLabels);
    }
  }, [isCancel]);

  useEffect(() => {
    if (labels?.length) {
      setOrder(labels?.length + 1);
    }
  }, [labels]);

  const addNewLable = () => {
    if (!Boolean(labelValue.trim())) return
    _createLabel(labelValue , "")
    _getCRMLabels()
      setLabelValue("");

  };


  return (
    <div className="container">
      <AdminBreadCrumb />

      <div>
        <p
          className="w-100"
          style={{
            textAlign: "right",
            color: textTypes.text.default,
            fontSize: 20,
            fontWeight: 600,
            lineHeight: "28px",
          }}
        >
          Labels
        </p>
        <p className="mt-2" style={{ fontSize: 14, lineHeight: "24px" }}>
          In this section you can create labels that can be assign into one or more customers
          (Labels that are defined in this section are used in customers list and segments)
        </p>
        <Paper elevation={1} style={{ marginTop: 25, padding: 24 }}>
          <div className="d-flex radius-8">
            <input
              className="flex-1 crm-input p-4"
              style={{
                backgroundColor: "#FAFBFB",
                border: "1px solid #E4E6E7",
                borderLeft: "none",
                borderRadius: "0 8px 8px 0",
              }}
              placeholder="add tags"
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
            />

            <Button
              color="primary"
              variant="contained"
              style={{
                width: 56,
                height: 56,
                padding: 0,
                minWidth: 56,
                borderRadius: "8px 0 0 8px",
              }}
              onClick={addNewLable}
            >
              <AddIcon color="#fff" />
            </Button>
          </div>
          <div
            className="mt-2"
            style={{ maxHeight: "439px", overflowY: "scroll" }}
          >
            <CRMLabelsPageTable
              labels={labels}
              setLabels={setLabels}
              isLoading={isLoading}
            />
          </div>
        </Paper>
        <div
          className="d-flex justify-content-end align-items-center"
          style={{
            marginTop: 32,
            paddingTop: 32,
            borderTop: "1px solid #E4E6E7",
          }}
        >
          <AssuranceDialog
            isOpen={openCancelModal}
            closeDialogHandler={() => setOpenCancelModal(false)}
            contentText="Are you sure to cancel the changes?"
            dialogSecondActionTextColor="primary"
            dialogMainActions={() => {
              setIsCancel(true);
              setOpenCancelModal(false);
            }}
            dialogMainActionText="Yes"
            dialogSecondActions={() => setOpenCancelModal(false)}
            dialogSecondActionText="Cancel"
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading("crm_labels"),
  urlPrefix: makeSelectAdminUrlPrefix(),
  allCrmLabels: makeSelectCrmLabels(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateCustomerLabels: (data) => dispatch(updateCrmLables(data)),
    _getCRMLabels: () => dispatch(getLabels()),
    _createLabel: (name , description)=> dispatch(createCRMLabel(name , description))
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(CRMLabelsPage);
