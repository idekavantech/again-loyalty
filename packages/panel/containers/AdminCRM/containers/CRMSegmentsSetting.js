import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import {
  getCrmLevels,
  getCRMLabels,
  updateCrmSegments,
  getCrmSegments,
} from "store/actions";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import CRMSegmentsTable from "./CRMSegmentsTable";
import {
  makeSelectCrmLabels,
  makeSelectCrmLevels,
  makeSelectCrmSegments,
} from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import { useRouter } from "next/router";

function CRMSegmentsSetting({
  _getCrmLevels,
  _getCRMLabels,
  _getCrmSegments,
  _updateCustomerSegments,
  _crmLevels,
  _crmLabels,
  _crmSegments,
  isLoading,
}) {
  const theme = useTheme();
  const router = useRouter();

  const [customerSegments, setCustomerSegments] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      _getCRMLabels();
      _getCrmLevels();
      _getCrmSegments();
    }, 0);
  }, []);

  useEffect(() => {
    customerSegments.map((item, index) =>
      setIsOpen({ ...isOpen, [index]: false })
    );
  }, []);

  useEffect(() => {
    if (Boolean(_crmSegments?.length)) {
      const newCustomerSegments = _crmSegments?.map((item) => {
        const newItem = item;
        if (
          Array.isArray(newItem?.crm_levels) &&
          newItem.crm_levels?.length > 0
        ) {
          newItem.crm_levels = newItem?.crm_levels?.map((item) => item.id);
        }

        if (
          Array.isArray(newItem?.new_labels) &&
          newItem.new_labels?.length > 0
        ) {
          newItem.new_labels = newItem?.new_labels?.map((item) => item.id);
        }
        return newItem;
      });
      setCustomerSegments(newCustomerSegments);
    }
  }, [_crmSegments]);

  useEffect(() => {
    if (isCancel) {
      setCustomerSegments(_crmSegments);
    }
  }, [isCancel]);

  const submit = () => {
    _updateCustomerSegments(customerSegments);
  };

  return (
    <div className="container">
      <Head>
        <title>Customer segmentation settings</title>
      </Head>

      <AdminBreadCrumb />
      <Paper elevation={3} style={{ marginTop: 24, padding: 24 }}>
        <p style={{ fontSize: 16, fontWeight: 500 }} className="pb-2">
          Customer segmentation settings
        </p>
        <div>
          <p style={{ lineHeight: "24px" }}>
            You can with a combination of customer levels, their satisfaction, and
            Tags they have, make your favorite parts. Be careful
            To execute automated processes for a portion of the customers, must be in this
            Create the sections of your desired.
          </p>
        </div>
        <Divider style={{ background: "#E4E6E7", marginTop: "24px" }} />
        <CRMSegmentsTable
          customerSegments={customerSegments}
          setCustomerSegments={setCustomerSegments}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          theme={theme}
          _crmLevels={_crmLevels}
          _crmLabels={_crmLabels}
          isLoading={isLoading}
        />
      </Paper>
      <Divider
        style={{ background: "#D2D5D8", marginTop: 100, marginBottom: 40 }}
      />
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
            setIsSaveModalOpen(true);
          }}
        >
          Save changes
        </Button>
        <AssuranceDialog
          isOpen={isSaveModalOpen}
          closeDialogHandler={() => setIsSaveModalOpen(false)}
          contentText="Are you sure to save changes?"
          dialogMainActions={() => {
            submit();
            setIsSaveModalOpen(false);
            router.back();
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setIsSaveModalOpen(false)}
          dialogSecondActionText="Cancel"
        />
        <AssuranceDialog
          isOpen={isCancelModalOpen}
          closeDialogHandler={() => setIsCancelModalOpen(false)}
          contentText="Are you sure to cancel the changes?"
          dialogMainActions={() => {
            setIsCancel(true);
            setIsCancelModalOpen(false);
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setIsCancelModalOpen(false)}
          dialogSecondActionText="Cancel"
        />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  _crmLevels: makeSelectCrmLevels(),
  _crmLabels: makeSelectCrmLabels(),
  _crmSegments: makeSelectCrmSegments(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateCustomerSegments: (data) => dispatch(updateCrmSegments(data)),
    _getCRMLabels: () => dispatch(getCRMLabels()),
    _getCrmLevels: () => dispatch(getCrmLevels()),
    _getCrmSegments: () => dispatch(getCrmSegments()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMSegmentsSetting);
