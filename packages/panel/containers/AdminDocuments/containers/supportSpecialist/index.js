import React, { memo, useEffect, useState } from "react";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import LazyImage from "@saas/components/LazyImage";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { getJourneyState, updateJourneyState } from "store/actions";
import { makeSelectJourneyState } from "store/selectors";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import Link from "next/link";

const SupportSpecialist = ({
  adminUrlPrefix,
  journeyData,
  _getJourneyState,
  _updateJourneyState,
}) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const [isOpenSuccessMessageModal, setIsOpenSuccessMessageModal] =
    useState(false);
  const dashboardState = journeyData?.vitrin_journey_state?.dashboard_state;
  const router = useRouter();

  useEffect(() => {
    _getJourneyState();
  }, []);

  const submit = () => {
    if (!dashboardState?.domain_settings_state) {
      _updateJourneyState(
        {
          dashboard_state: { ...dashboardState, domain_settings_state: 1 },
        },
        () => setIsOpenSuccessMessageModal(true)
      );
    } else {
      router.push(adminUrlPrefix);
    }
  };

  return (
    <div className="container mb-5">
      <Head>
        <title>Domain settings</title>
      </Head>
      <AdminBreadCrumb />
      <div className="col-12 mt-4 px-0"></div>
      <div
        className="p-2 p-md-5 d-flex"
        style={{
          borderRadius: 8,
          backgroundColor: "rgba(0, 80, 255, 0.04)",
        }}
      >
        <LazyImage
          width={desktopMatches ? 100 : 40}
          height={desktopMatches ? 100 : 40}
          src="/images/sahar.svg"
        />
        <p
          className="mr-2"
          style={{
            fontSize: desktopMatches ? 15 : 12,
            lineHeight: desktopMatches ? "22px" : "29px",
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <strong>Sahar Molizadeh- Showcase Support Expert</strong> With you
          Until the process of connecting to a simple and faster domain. Since the time of filling
          Your form  10 Business Day till domain registration on your website
          Is. Wait for the domain connection and from the same time the product loading and completing
          Pages according to{" "}
          <Link style={{ color: "#0050ff" }} href="https://help.vitrin.me/">
            Showcase guide
          </Link>{" "}
          Start.
        </p>
      </div>
      <div className="d-flex justify-content-end">
        <Button
          className="mt-5 col-12 col-md-auto"
          variant="contained"
          color="primary"
          onClick={submit}
        >
          Confirm
        </Button>
      </div>
      <SuccessMessageModal
        isOpen={isOpenSuccessMessageModal}
        onClose={() => setIsOpenSuccessMessageModal(false)}
        returnToDashboard={() => router.push(adminUrlPrefix)}
        next={() =>
          (window.location =
            "https://help.vitrin.me/?_gl=1*jd36rr*_ga*MTg4OTAzOTIwNS4xNjUyNzEzNDQ0*_ga_S6SJXQYHNZ*MTY1NTExNDk4Ny40MS4xLjE2NTUxMTU1ODEuNjA.")
        }
        content="Showcase support expert for final coordination to connect domain will be in touch with you. You can start launching other parts of the site now."
        image="/images/Approve.svg"
        nextTitle="Education"
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  journeyData: makeSelectJourneyState(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getJourneyState: () => dispatch(getJourneyState()),
    _updateJourneyState: (data, callback) =>
      dispatch(updateJourneyState(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(memo, withConnect)(SupportSpecialist);
