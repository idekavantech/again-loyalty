/**
 *
 * Settings
 *
 */

import React, { memo, useEffect, useMemo, useState } from "react";
import Paper from "@material-ui/core/Paper";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import Head from "next/head";
import Link from "next/link";

import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import {
  makeSelectPlugin,
  makeSelectPlugins,
  makeSelectAdminUrlPrefix,
} from "@saas/stores/plugins/selector";
import { graphite, night, pollution, smoke } from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import { useRouter } from "next/router";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomizedSelect from "@saas/components/CustomizedSelect";
import { setPluginData } from "@saas/stores/plugins/actions";
import {
  CLOSING_TYPE_AUTOMATIC,
  CLOSING_TYPE_HOUR,
  CLOSING_TYPE_MANUAL,
  FULFILLMENT_CARRY_OUT,
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_CAR,
  FULFILLMENT_ON_USER_SITE,
} from "@saas/plugins/Shopping/constants";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import { makeSelectBranches } from "@saas/stores/business/selector";
import LocationSelector from "components/LocationSelector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";

const SelectComponentOptions = [
  {
    name: CLOSING_TYPE_MANUAL,
    Icon: `/images/manual.svg`,
    title: "Manual",
    description:
      "I will go manually and from this page I will activate the order.",
  },
  {
    name: CLOSING_TYPE_AUTOMATIC,
    Icon: `/images/automatic.svg`,
    title: "Auto, fits the working hours",
    description:
      "The ordering time will be automatically activated by arriving at the next work time.",
  },
  {
    name: CLOSING_TYPE_HOUR,
    Icon: `/images/timer.svg`,
    title: "Auto, after another hour",
    description: "After an hour, ordering will be automatically activated.",
  },
];

function AdminShoppingDashboard({
  shoppingPluginData,
  _setPluginData,
  loading,
  urlPrefix,
  plugin = SHOPPING_PLUGIN,
  branches,
  isSuper = false,
  pluginsData,
}) {
  const pluginUrl = pluginsData[plugin].plugin_url;
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : null
  );
  const { minWidth768 } = useResponsive();

  const pluginData = isSuper
    ? {
        ...branches.find((branch) => branch.slug === selectedBranch)
          ?.plugins_config[SHOPPING_PLUGIN],
        ui_access_config: branches.find(
          (branch) => branch.slug === selectedBranch
        )?.ui_access_config?.admin_panel?.plugins?.[SHOPPING_PLUGIN],
      }
    : shoppingPluginData;
  const selectedBranchSiteDomain = useMemo(
    () =>
      branches.find((branch) => branch.slug === selectedBranch)?.site_domain,
    [selectedBranch]
  );
  const accessedDeliverySiteTypeOptions = pluginData?.ui_access_config
    ?.delivery_site_type_options || [
    FULFILLMENT_ON_BUSINESS_SITE,
    FULFILLMENT_CARRY_OUT,
    FULFILLMENT_ON_CAR,
    FULFILLMENT_ON_USER_SITE,
  ];
  const admin_shopping_dashboard_page_cards = useMemo(() => {
    const delivery_setting_title_options = {
      both: "In -person submission and delivery settings",
      hasNoDelivery: "In -person delivery settings",
      hasJustDelivery: "Send settings",
      none: "",
    };
    const none_delivery_type_card_title_options = {
      hasServe: "Receive settings",
      hasNoServe: "In -person delivery settings(Receiving in place)",
    };
    const hasOneOfNoneDeliveryTypes =
      accessedDeliverySiteTypeOptions.includes(FULFILLMENT_ON_BUSINESS_SITE) ||
      accessedDeliverySiteTypeOptions.includes(FULFILLMENT_CARRY_OUT) ||
      accessedDeliverySiteTypeOptions.includes(FULFILLMENT_ON_CAR);
    const hasDeliveryType = accessedDeliverySiteTypeOptions.includes(
      FULFILLMENT_ON_USER_SITE
    );
    const isBoth = hasDeliveryType && hasOneOfNoneDeliveryTypes ? "both" : null;
    const hasJustDelivery =
      hasDeliveryType && !hasOneOfNoneDeliveryTypes ? "hasJustDelivery" : null;
    const hasNotDelivery =
      !hasDeliveryType && hasOneOfNoneDeliveryTypes ? "hasNoDelivery" : null;
    const title_option = isBoth || hasJustDelivery || hasNotDelivery || "none";
    const delivery_setting_cards = hasDeliveryType
      ? [
          {
            title: "Submit and Settings Settings",
            description: `With this section, you can specify different ways to send orders. Each of these methods includes adjustments such as how to ship, order preparation time, packaging fee and... is.
             `,
            link: `${urlPrefix}${pluginUrl}/settings/general/delivery/`,
            hasDivider: true,
          },
          {
            title: "Service range settings and shipping costs",
            description: `With the help of this section, you can specify the range you send them, as well as for each range, specify the cost of submitting separately..
              `,
            link: `${urlPrefix}${pluginUrl}/settings/general/delivery/zones`,

            hasDivider: true,
          },
        ]
      : [];
    const hasServeVariable = accessedDeliverySiteTypeOptions.includes(
      FULFILLMENT_ON_BUSINESS_SITE
    )
      ? "hasServe"
      : "hasNoServe";
    const no_delivery_setting_cards = hasOneOfNoneDeliveryTypes
      ? [
          {
            title: none_delivery_type_card_title_options[hasServeVariable],
            description: `With this section, you can enable or deactivate different types of product downloads for customers.
                      `,
            link: `${urlPrefix}${pluginUrl}/settings/general/pickup`,

            hasDivider: false,
          },
        ]
      : [];
    const cards = [
      {
        title: "Payment settings",
        description: `With these settings, you can set online and cash payment terms for customers.
                  `,
        cards: [
          {
            title: "Payment settings",
            description: `With this section, you can determine how the customer can pay for the goods purchased from the site.
              `,
            link: `${urlPrefix}${pluginUrl}/settings/general/payment`,
            hasDivider: false,
          },
        ],
      },
      {
        title: "Popper Settings",
        description: `With these settings, you can determine the terms of pop -up display for customers.
          `,
        cards: [
          {
            title: "Popper Settings",
            description: `With this section, you can specify what message to be displayed to the customer when ordering.
              `,
            link: `${urlPrefix}${pluginUrl}/settings/general/popup`,
            hasDivider: false,
          },
        ],
      },
      {
        title: "General ordering settings",
        description: `With these settings, you can adjust the public ordering behavior for your business.
          `,
        cards: [
          {
            title: "Tax Settings, Packaging Cost and Minimum Order",
            description: `With the help of this section you can set taxes, default packaging and minimum default order on each order.
              `,
            link: `${urlPrefix}${pluginUrl}/settings/general/config`,
            hasDivider: false,
          },
        ],
      },
    ];
    if ([...delivery_setting_cards, ...no_delivery_setting_cards].length) {
      cards.unshift({
        title: delivery_setting_title_options[title_option],
        description: `With these settings, you can accurately manage the terms of product shipping or how to deliver products to your customers..
          `,
        cards: [...delivery_setting_cards, ...no_delivery_setting_cards],
      });
    }
    return cards;
  }, [accessedDeliverySiteTypeOptions]);
  const router = useRouter();

  const isOrderingActive =
    typeof pluginData.data?.is_open === "boolean"
      ? pluginData.data?.is_open
      : true;

  const handleOrderingActivationState = () => {
    setDialogBoxOpen(true);
  };
  const [isDialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [isOrderingActiveTemp, changeOrderingActivationTemp] = useState(
    pluginData.data?.is_open
  );

  const [OrderingActivationMethod, setOrderingActivationMethod] = useState(
    SelectComponentOptions[0]
  );

  const submit = () => {
    _setPluginData(
      SHOPPING_PLUGIN,
      {
        ...pluginData.data,
        is_open: isOrderingActiveTemp === "open",
        closing_type: OrderingActivationMethod.name,
      },
      selectedBranch
    );
    setDialogBoxOpen(false);
  };
  const discard = () => {
    setDialogBoxOpen(false);
    setTimeout(() => {
      changeOrderingActivationTemp(isOrderingActive ? "open" : "close");
    }, 0);
  };

  useEffect(() => {
    changeOrderingActivationTemp(isOrderingActive ? "open" : "close");
  }, [isOrderingActive, selectedBranch]);
  useEffect(() => {
    if (localStorage.getItem("adminDeliverySelectedBranch") && isSuper)
      setSelectedBranch(localStorage.getItem("adminDeliverySelectedBranch"));
  }, []);
  return (
    <div>
      <div className="container mb-5">
        <Head>
          <title>Ordering settings</title>
        </Head>
        <AdminBreadCrumb
          helpVideo={{ url: ADMIN_HELP_VIDEOS.orderingSetting.url }}
        />
        {isSuper ? (
          <div className="mt-2">
            <LocationSelector
              value={selectedBranch}
              onChange={(slug) => {
                localStorage.setItem("adminDeliverySelectedBranch", slug);
                setSelectedBranch(slug);
              }}
              items={branches.map((branch) => ({
                title: branch.title,
                value: branch.slug,
              }))}
            />
          </div>
        ) : null}
        <Paper elevation={1} className="mt-4 py-3 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="u-fontMedium" style={{ color: graphite }}>
              Ordering: {isOrderingActive ? "active" : "Inactive"}
            </div>
            <div className="d-flex align-items-center">
              <Button
                color="primary"
                style={{ direction: "ltr" }}
                endIcon={<EditRoundedIcon style={{ fontSize: 18 }} />}
                onClick={() => setDialogBoxOpen(true)}
              >
                Edit
              </Button>
              <Switch
                checked={isOrderingActive}
                onChange={handleOrderingActivationState}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
          <div
            className="u-font-semi-small mt-1"
            style={{ color: smoke, lineHeight: 1.7 }}
          >
            {isOrderingActive
              ? `If ordering is enabled, customers can register online through the site.
`
              : `If the order is inactivated, the products are displayed on the site but it is not possible to buy from the site.
`}
          </div>
        </Paper>
        {admin_shopping_dashboard_page_cards.map((pageContent) => (
          <div
            key={pageContent.id}
            className="d-flex mt-4 flex-column flex-md-row"
            style={{ lineHeight: 1.7 }}
          >
            <div className="col-12 col-md-4 d-flex flex-column px-0 py-3">
              <div
                className="u-fontWeightMedium u-fontLarge"
                style={{ color: night }}
              >
                {pageContent.title}
              </div>
              <div
                className="mt-1 u-font-semi-small text-justify"
                style={{
                  color: pollution,
                  width: minWidth768 ? "75%" : "100%",
                }}
              >
                {pageContent.description}
              </div>
            </div>
            <div className="col-12 col-md-8 mt-2 mt-md-0 px-0">
              <Paper elevation={1}>
                {pageContent.cards.map((cart, index) => (
                  <>
                    <Link
                      href={cart.link}
                      className="d-block py-3 px-4 admin-hover"
                      style={{
                        borderRadius:
                          pageContent.cards.length > 1
                            ? index === 0
                              ? "8px 8px 0px 0px"
                              : index === pageContent.cards.length - 1
                              ? "0px 0px 8px 8px"
                              : 0
                            : 8,
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div className="w-75">
                          <div
                            className="u-fontMedium u-fontWeightMedium"
                            style={{ color: graphite }}
                          >
                            {cart.title}
                          </div>
                          <div
                            style={{ color: smoke }}
                            className="u-font-semi-small mt-1 text-justify"
                          >
                            {cart.description}
                          </div>
                        </div>
                        <div className="d-flex justify-content-end w-25">
                          <ChevronLeftRoundedIcon style={{ color: smoke }} />
                        </div>
                      </div>
                    </Link>
                    {cart.hasDivider && <Divider />}
                  </>
                ))}
              </Paper>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={isDialogBoxOpen}
        aria-describedby="alert-dialog-description"
        onClose={discard}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="d-flex justify-content-between align-items-center">
              <div
                style={{ color: night }}
                className="u-fontLarge u-fontWeightMedium"
              >
                online order
              </div>
              <CloseRoundedIcon
                className="u-cursor-pointer"
                style={{ color: night }}
                onClick={discard}
              />
            </div>
            <div className="mt-4">
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={isOrderingActiveTemp}
                  onChange={(event) =>
                    changeOrderingActivationTemp(event.target.value)
                  }
                >
                  <FormControlLabel
                    className="mr-0 mb-3 mb-md-1"
                    value="open"
                    control={<Radio color="primary" className="pr-0" />}
                    label="Open:‌ Customers can register online through the site."
                  />
                  <FormControlLabel
                    className="mr-0"
                    value="close"
                    control={<Radio color="primary" className="pr-0" />}
                    label="Closed: Products are displayed on the site but it is not possible to place an order from the site."
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {isOrderingActiveTemp === "close" && (
              <div className="mt-3">
                <Divider />
                <div
                  className="my-3 u-fontMedium u-fontWeightMedium"
                  style={{ color: night }}
                >
                  Re -activation of ordering
                </div>
                <CustomizedSelect
                  options={SelectComponentOptions}
                  value={OrderingActivationMethod}
                  onChangeMethod={setOrderingActivationMethod}
                />
                {OrderingActivationMethod === SelectComponentOptions[1] && (
                  <div
                    className="d-flex align-items-center mt-2 u-cursor-pointer"
                    onClick={() =>
                      router.push(
                        isSuper
                          ? `${urlPrefix}/branches/${selectedBranchSiteDomain}setting`
                          : `${urlPrefix}setting`
                      )
                    }
                  >
                    <SettingsRoundedIcon
                      className="ml-1"
                      color="primary"
                      fontSize="small"
                    />
                    <div
                      style={{
                        color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                      }}
                      className="u-font-semi-small"
                    >
                      Working time settings
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          className="justify-content-start"
          style={{ padding: "0px 24px 20px 0px" }}
        >
          <Button
            onClick={submit}
            variant="contained"
            color="primary"
            className="ml-2"
            disabled={loading}
          >
            Confirm
          </Button>
          <Button onClick={discard} variant="outlined" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  urlPrefix: makeSelectAdminUrlPrefix(),
  loading: makeSelectLoading(),
  branches: makeSelectBranches(),
  pluginsData: makeSelectPlugins(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setPluginData: (pluginName, data, slug) =>
      dispatch(setPluginData(pluginName, data, null, slug)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminShoppingDashboard);
