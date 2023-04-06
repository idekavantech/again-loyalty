import React, { memo } from "react";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import Image from "next/image";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import Link from "next/link";
import { directGateWays, interfaceGateWays } from "./constant";

const AdminGateWay = ({ adminUrlPrefix }) => {
  return (
    <div className="container mb-5">
      <AdminBreadCrumb />
      <div className="col-12 mt-4 px-0">
        <Paper elevation={1} className="p-2 p-md-4 gate_away_page">
          <p className="title">Select the payment gateway</p>
          <p className="mt-3 pt-2">
            To start selling online, your customers can make the payment process from
            Do the way to showcase portable ports.
          </p>
          <p className="mt-3 pt-2 gate_away_type">Intermediate ports</p>
          {interfaceGateWays.map((gateway) => (
            <div
              className="d-flex align-items-center justify-content-between pt-3 mt-2"
              key={gateway.id}
            >
              <div className="d-flex align-items-center">
                <Image width={60} height={60} src={gateway.image} />
                <a className="flex-1 pr-2 mr-3" href={gateway.link}>
                  <span style={{ textDecorationLine: "underline" }}>
                    {gateway.title}
                  </span>
                </a>
              </div>
              {gateway.hasOwnProperty("button") ? (
                <Link
                  passHref
                  href={`${adminUrlPrefix}/${gateway.button.link}`}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    className="dashboard_buttons"
                  >
                    {" "}
                    {gateway.button.title}{" "}
                  </Button>
                </Link>
              ) : null}
            </div>
          ))}
          <hr className="hr-normal mt-5" />
          <p className="mt-3 pt-2 gate_away_type">Direct ports</p>
          {directGateWays.map((gateway) => (
            <div
              className="d-flex align-items-center pt-3 mt-2"
              key={gateway.id}
            >
              <Image width={60} height={60} src={gateway.image} />
              <a className="flex-1 pr-2 mr-3" href={gateway.link}>
                <span style={{ textDecorationLine: "underline" }}>
                  {gateway.title}
                </span>
              </a>
            </div>
          ))}
        </Paper>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminGateWay);
