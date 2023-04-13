import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import {
  updateCrmLevels,
  getCrmLevels,
  createCrmLevel,
  updateCrmLevel,
  getCrmLevelItem,
} from "store/actions";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import CRMLevelsTable from "./CRMLevelsTable";
import { makeSelectCrmLevel, makeSelectCrmLevels } from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import { useRouter } from "next/router";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import Link from "next/link";
import Input from "@saas/components/Input";

const levelDetailsInitialState = {};

function CRMCustomerLevelsSetting({
  _getCrmLevel,
  adminUrlPrefix,
  _createCrmLevel,
  _updateCrmLevels,
  crmLevel,
}) {
  const theme = useTheme();
  const router = useRouter();
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const [levelDetails, setLevelDetails] = useState({});

  const levelId = router.query.id;
  const isCreatingNewLevel = levelId === "new";

  useEffect(() => {
    setTimeout(() => {
      if (isCreatingNewLevel) return;
      _getCrmLevel({ id: levelId });
    }, 0);
  }, []);

  useEffect(() => {
    if (crmLevel && !isCreatingNewLevel) {
      setLevelDetails(crmLevel);
    } else {
      setLevelDetails({ ...levelDetailsInitialState });
    }
  }, [crmLevel]);

  const submit = () => {
    const _levelDetails = {
      ...levelDetails,
      color: levelDetails?.color?.replace("#", ""),
    };
    if (isCreatingNewLevel) {
      console.log("running create");
      _createCrmLevel(_levelDetails);
    } else {
      console.log("running update");
      _updateCrmLevels(_levelDetails);
    }
    router.back();
  };

  const onLevelNameChange = (value) => {
    const _levelDetails = { ...levelDetails };
    _levelDetails.title = value;
    if (!value) delete _levelDetails.title;
    setLevelDetails(_levelDetails);
  };

  const onMinScoreChange = (value) => {
    const _levelDetails = { ...levelDetails };
    _levelDetails.min_score = value;
    if (!value) delete _levelDetails.min_score;
    setLevelDetails(_levelDetails);
  };

  const onMaxScoreChange = (value) => {
    const _levelDetails = { ...levelDetails };
    _levelDetails.max_score = value;
    if (!value) delete _levelDetails.max_score;
    setLevelDetails(_levelDetails);
  };

  const onLevelColorChange = (e) => {
    const value = e.target.value;
    const _levelDetails = { ...levelDetails };
    _levelDetails.color = value;
    if (!value) delete _levelDetails.color;
    setLevelDetails(_levelDetails);
  };

  return (
    <div className="container">
      <Head>
        <title>Customer level settings</title>
      </Head>

      <AdminBreadCrumb />
      <Paper elevation={3} style={{ marginTop: 24, padding: 24 }}>
        <div>
          <p style={{ fontSize: 16, fontWeight: 600 }} className="pb-2">
            Settings settings
          </p>
          <p style={{ fontSize: 14, fontWeight: 500, lineHeight: "24px" }}>
            In this section, you can by construct different levels and determine the score range
            Categorize your customers according to their received points.
            How to score customers in the section{" "}
            <Link
              style={{ color: theme.palette.primary.main }}
              href={`${adminUrlPrefix}crm/automated_processes/`}
            >
              Automatic trends
            </Link>{" "}
            It is defined.
          </p>
        </div>
        <Divider style={{ background: "#E4E6E7", marginTop: "24px" }} />
        <div className="d-felx row mb-md-4 mt-5">
          <div className="col-12 col-md-12 pl-md-6 mb-4">
            <p>Level name</p>
            <Input
              variant="outlined"
              placeholder="New level"
              className="customInput"
              value={levelDetails?.title}
              onChange={onLevelNameChange}
            />
          </div>
          <div className="col-12 col-md-6 pl-md-6 mb-4">
            <p>Rating</p>
            <div className="d-flex">
              <Input
                variant="outlined"
                placeholder="Minimum rating"
                className="customInput px-2"
                onChange={onMinScoreChange}
                type="number"
                value={levelDetails?.min_score}
              />
              <div
                style={{
                  textAlight: "center",
                  fontSize: "1.3rem",
                  margin: "auto",
                }}
              >
                until the
              </div>
              <Input
                variant="outlined"
                placeholder="Maximum rating"
                className="customInput px-2"
                onChange={onMaxScoreChange}
                type="number"
                value={levelDetails?.max_score}
              />
            </div>
          </div>

          <div className="col-12 col-md-4 pl-md-6 mb-4">
            <p> Select surface color</p>
            <input
              variant="outlined"
              type="color"
              placeholder="New level"
              className="customInput px-2"
              style={{
                border: "solid 1px rgba(0,0,0,0.2)",
                borderRadius: ".5rem",
                padding: "0.5rem",
                height: "2.7rem",
                width: "4rem",
              }}
              onChange={onLevelColorChange}
              value={
                levelDetails?.color?.includes("#")
                  ? levelDetails?.color
                  : `#${levelDetails?.color}`
              }
            />
          </div>
        </div>
      </Paper>
      <Divider
        style={{ background: "#D2D5D8", marginTop: 84, marginBottom: 40 }}
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
            setIsOpenSaveModal(true);
          }}
        >
          {isCreatingNewLevel ? "Store" : "Save changes"}
        </Button>
        <AssuranceDialog
          isOpen={isOpenSaveModal}
          closeDialogHandler={() => setIsOpenSaveModal(false)}
          contentText="Are you sure to save changes?"
          dialogSecondActionTextColor="primary"
          dialogMainActions={() => {
            submit();
            setIsOpenSaveModal(false);
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setIsOpenSaveModal(false)}
          dialogSecondActionText="Cancel"
        />
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
  );
}

const mapStateToProps = createStructuredSelector({
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  isLoading: makeSelectLoading(),
  crmLevel: makeSelectCrmLevel(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _createCrmLevel: (data) => dispatch(createCrmLevel(data)),
    _updateCrmLevels: (data) => dispatch(updateCrmLevel(data)),
    _getCrmLevel: (data) => dispatch(getCrmLevelItem(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMCustomerLevelsSetting);
