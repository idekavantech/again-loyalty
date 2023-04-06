/* eslint-disable no-underscore-dangle */
import React, { memo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";
import { makeSelectPluginsModals } from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import { modals } from "../modals";
function Modals({ modals: _modals }) {
  const router = useRouter();

  return (
    <>
      {_modals.map((_modal) => {
        const Modal = modals[_modal];
        const isOpen = router && router.query[_modal];
        return (
          <Modal
            key={_modal}
            isOpen={Boolean(isOpen)}
            onClose={() => removeParamsFromUrl(_modal)}
          />
        );
      })}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  modals: makeSelectPluginsModals(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,

  memo
)(Modals);
