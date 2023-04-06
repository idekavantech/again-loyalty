import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectAuthorization, makeSelectUserOrder } from "../../selectors";
import { getOrder } from "../../actions";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { setLoginCallBack } from "@saas/stores/user/actions";
import { PRODUCT_MODAL } from "@saas/stores/ui/constants";
import { NOT_AUTHORIZED, NOT_LOGGED_IN } from "@saas/stores/user/constants";
import { useRouter } from "next/router";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
export function Review({
  userOrder: order,
  _fetchOrder,
  _setLoginCallBack,
  authorization,
  urlPrefix,
}) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => _fetchOrder({ id: router.query.id }), 0);
  }, []);
  useEffect(() => {
    if (order && order.id) {
      localStorage.setItem(
        "feedbackBadges",
        JSON.stringify(
          order.items.map((item) => ({
            title: item.deal.title,
            link: `/s?modals=${PRODUCT_MODAL}&product=${item.deal.id}`,
          }))
        )
      );
      router.push(`${urlPrefix}/feedback`);
    }
  }, [order && order.id]);
  useEffect(() => {
    if (authorization === NOT_LOGGED_IN) {
      _setLoginCallBack(() => _fetchOrder({ id: router.query.id }));
      router.push(`${urlPrefix}/login?url=${router.asPath}`);
    }
    if (authorization === NOT_AUTHORIZED) router.push(`${urlPrefix}/`);
  }, [authorization]);
  return <LoadingIndicator />;
}

const mapStateToProps = createStructuredSelector({
  userOrder: makeSelectUserOrder(),
  authorization: makeSelectAuthorization(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _fetchOrder: (data) => dispatch(getOrder(data)),
    _setLoginCallBack: (data) => dispatch(setLoginCallBack(data)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,

  memo
)(Review);
