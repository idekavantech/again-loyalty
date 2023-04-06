/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { memo } from "react";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";
import { compose } from "redux";
import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";

import { makeSelectPluginsDrawers } from "@saas/stores/plugins/selector";
import { drawers } from "../drawers";
import { useRouter } from "next/router";
import LazyHydrate from "react-lazy-hydration";

function Drawers({ drawers: _drawers }) {
  const router = useRouter();
  return (
    <div>
      {_drawers.map((_drawer) => {
        const Drawer = drawers[_drawer];
        const isOpen = router && router.query[_drawer];
        return (
          <LazyHydrate key={_drawer} whenVisible>
            <Drawer
              onClose={() => removeParamsFromUrl(_drawer)}
              isOpen={Boolean(isOpen)}
            />
          </LazyHydrate>
        );
      })}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  drawers: makeSelectPluginsDrawers(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Drawers);
