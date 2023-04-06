/* eslint-disable camelcase */
import {
  PLUGIN_INACTIVE_STATUS,
  PLUGIN_TRIAL_STATUS,
  PLUGIN_ACTIVE_STATUS,
  MENU_LINKS_WIDGET,
  HEADER_ICONS_WIDGET,
  ADMIN_ORDERS_WIDGET,
  DEFAULT_PAYMENT_DATA,
} from "../constants";
import { getSiteDomain } from "@saas/utils/helpers/getSiteDomain";

export default class Plugin {
  constructor(pluginData, business, incomingUrl, incomingHost) {
    const {
      status,
      activation_date: activationDate,
      expiration_date: expirationDate,
      data,
      payment_data,
      had_trial,
    } = pluginData || {};
    this.branches = business && business.branches;
    this.urlPrefix =
      business &&
      business.super_business &&
      getSiteDomain(incomingHost || window.location.host) ===
        business.super_business.site_domain
        ? incomingUrl.match(/\/branches\/[a-zA-Z0-9\-]*/m)?.[0]
        : "";

    this.adminUrlPrefix = incomingUrl.match(
      /\/admin\/([a-zA-Z0-9\-]*)\/branches\/([a-zA-Z0-9\-]*)/m
    )?.[0]
      ? `${
          incomingUrl.match(
            /\/admin\/([a-zA-Z0-9\-]*)\/branches\/([a-zA-Z0-9\-]*)/m
          )?.[0]
        }/`
      : `${incomingUrl.match(/\/admin\/([a-zA-Z0-9\-]*)/m)?.[0]}/`;

    this.hasLandingPage = false;
    this.hadTrial = Boolean(had_trial);
    this.adminMenuLinks = [];
    this.adminReportLinks = [];
    this.status = status || PLUGIN_INACTIVE_STATUS;
    this.isActive =
      status === PLUGIN_TRIAL_STATUS || status === PLUGIN_ACTIVE_STATUS;
    this.expirationDate = expirationDate || null;
    this.activationDate = activationDate || null;
    this.widgets = {
      [MENU_LINKS_WIDGET]: null,
      [ADMIN_ORDERS_WIDGET]: null,
      [HEADER_ICONS_WIDGET]: null,
    };
    this.drawers = [];
    this.modals = [];
    this.adminUrls = [];
    this.callToActions = [];
    this.adminCallToActions = [];
    this.tabActions = [];
    this.adminTabActions = [];
    this.callToActionText =
      data && data.menu_keyword_for_vitrin
        ? data.menu_keyword_for_vitrin
        : null;
    this.adminCallToActionUrl = null;
    this.adminCallToActionText = null;
    this.baseUrl = null;
    this.urls = null;
    this.data = data || {};
    this.payment_data = payment_data || DEFAULT_PAYMENT_DATA;
  }
}
