import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import Link from "next/link";
import Input from "@saas/components/Input";
import useCrmLevelDetails from "./useCrmLevelDetails";
import LoadingIndicator from "@saas/components/LoadingIndicator";

function CRMCustomerLevelsSetting() {
  const {
    router,
    theme,
    isLoading,
    isOpenSaveModal,
    setIsOpenSaveModal,
    openCancelModal,
    setOpenCancelModal,
    levelDetails,
    isCreatingNewLevel,
    adminUrlPrefix,
    submit,
    onMinScoreChange,
    onMaxScoreChange,
    onLevelColorChange,
    onLevelNameChange,
  } = useCrmLevelDetails();

  if (isLoading) {
    return <LoadingIndicator height="80vh" />;
  } else {
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
              In this section you can create levels and categorize your customers according to their points
              <Link style={{ color: theme.palette.primary.main }} href={`${adminUrlPrefix}crm/automated_processes/`}>
                Automatic trends
              </Link>{" "}
              you can find how to assign points to your customers
            </p>
          </div>
          <Divider style={{ background: "#E4E6E7", marginTop: "24px" }} />
          <div className="mb-md-4 mt-5">
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
            <div className="col-12 col-md-12 pl-md-6 mb-4">
              <p>Rating</p>
              <div className="d-flex">
                <Input
                  variant="outlined"
                  placeholder="Minimum rating"
                  className="customInput pr-2"
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
                  to
                </div>
                <Input
                  variant="outlined"
                  placeholder="Maximum rating"
                  className="customInput px-2"
                  onChange={onMaxScoreChange}
                  type="number"
                  value={levelDetails?.max_score}
                />
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
                  value={levelDetails?.color?.includes("#") ? levelDetails?.color : `#${levelDetails?.color}`}
                />
              </div>
            </div>
          </div>
        </Paper>
        <Divider style={{ background: "#D2D5D8", marginTop: 84, marginBottom: 40 }} />

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
            cancel
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
            {isCreatingNewLevel ? "Create Level" : "Save changes"}
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
            dialogSecondActionText="No"
          />
          <AssuranceDialog
            isOpen={openCancelModal}
            closeDialogHandler={() => setOpenCancelModal(false)}
            contentText="Are you sure to cancel the changes?"
            dialogSecondActionTextColor="primary"
            dialogMainActions={() => {
              setOpenCancelModal(false);
              router.back();
            }}
            dialogMainActionText="Yes"
            dialogSecondActions={() => setOpenCancelModal(false)}
            dialogSecondActionText="No"
          />
        </div>
      </div>
    );
  }
}

export default memo(CRMCustomerLevelsSetting);
