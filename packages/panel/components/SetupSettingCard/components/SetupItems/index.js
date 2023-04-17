import React, { memo } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import Link from "next/link";

const SetupItems = ({ item, urlPrefix, successState }) => {
  //const isGateWay = item.type == "gateway";
  return (
    <div
      className="d-flex justify-content-between align-items-center"
      // style={{
      //   paddingTop: isGateWay ? 16 : 0,
      //   borderTop: isGateWay ? "1px solid #DADADA" : "",
      //   marginTop: isGateWay ? 16 : 0,
      // }}
    >
      <div className="d-flex align-items-center">
        <span>{item.title}</span>
        <button
          className={`p-0 mr-2 px-2 status_button ${
            successState[item.type]
              ? successState[item.type] == 1
                ? "status_process"
                : "status_active"
              : "status_inactive"
          }`}
        >
          {successState[item.type]
            ? successState[item.type] == 1
              ? "Processing"
              : "active"
            : "Inactive"}
        </button>
      </div>
      <Link href={`${urlPrefix}/${item.link}`}>
        <Button
          variant="text"
          className="p-0 dashboard_buttons"
          color="primary"
          disabled={successState[item.type]}
        >
          Connection
        </Button>
      </Link>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(SetupItems);
