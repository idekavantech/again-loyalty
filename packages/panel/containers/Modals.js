/* eslint-disable no-underscore-dangle */
import React, { memo } from "react";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { adminModals } from "./adminModals";

import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";
import {
  ADMIN_FONT_SELECTION_MODAL,
  ADMIN_THEME_COLOR_MODAL,
  ADMIN_THEME_SELECTION_MODAL,
  ADMIN_EDIT_ABOUT_US_MODAL,
  ADMIN_EDIT_DESCRIPTION_MODAL,
  ADMIN_EDIT_ADDRESS_MODAL,
  ADMIN_EDIT_BUSINESS_CONTACT_INFO_MODAL,
  ADMIN_ORDER_NOTIFICATIONS_MODAL,
  ADMIN_TARGETING_MODAL,
  ADMIN_GATE_AWAY_MODAL,
  ADMIN_VITRIN_PRO_MODAL,
  ADMIN_EVENTS_MODAL,
  ADMIN_CONTACTS_MODAL,
  ADMIN_DOMAIN_SELECTION_MODAL,
  ADMIN_UPDATES_MODAL,
  ADMIN_PAGES_MODAL,
} from "@saas/stores/ui/constants";
import { useRouter } from "next/router";
function Modals() {
  const _modals = [
    ADMIN_FONT_SELECTION_MODAL,
    ADMIN_THEME_COLOR_MODAL,
    ADMIN_THEME_SELECTION_MODAL,
    ADMIN_EDIT_ABOUT_US_MODAL,
    ADMIN_EDIT_DESCRIPTION_MODAL,
    ADMIN_EDIT_ADDRESS_MODAL,
    ADMIN_EDIT_BUSINESS_CONTACT_INFO_MODAL,
    ADMIN_ORDER_NOTIFICATIONS_MODAL,
    ADMIN_TARGETING_MODAL,
    ADMIN_GATE_AWAY_MODAL,
    ADMIN_VITRIN_PRO_MODAL,
    ADMIN_PAGES_MODAL,
    ADMIN_EVENTS_MODAL,
    ADMIN_CONTACTS_MODAL,
    ADMIN_DOMAIN_SELECTION_MODAL,
    ADMIN_UPDATES_MODAL,
  ];
  const router = useRouter();
  return (
    <>
      {_modals.map((_modal) => {
        const Modal = adminModals[_modal];
        const isOpen = router.query[_modal];
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

const mapStateToProps = createStructuredSelector({});

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
