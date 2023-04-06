import React, { memo, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { graphite, night, pollution, smoke } from "@saas/utils/colors";
import Switch from "@material-ui/core/Switch";
import {
  makeSelectPlugins,
  makeSelectAdminUrlPrefix,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import Link from "next/link";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import Divider from "@material-ui/core/Divider";
import SOWActivationModal from "containers/AdminFinance/SOW/components/SOWActivationModal";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export function SOW({
  urlPrefix,
  pluginsData,
  plugin = SHOPPING_PLUGIN,
  isSuper = false,
  business,
}) {
  const { minWidth768 } = useResponsive();
  const hasSOW = isSuper
    ? business?.plugins_config?.multi_branch?.data?.has_shared_wallet
    : business?.super_business?.plugins_config?.multi_branch?.data
        ?.has_shared_wallet;
  const [isSOWModalOpen, toggleSOWModalOpen] = useState(false);
  const pluginUrl = pluginsData[plugin].plugin_url;

  const admin_SOW_page_cards = useMemo(() => {
    return [
      {
        title: "عملیات تسویه حساب",
        description:
          "در این قسمت می‌توانید جزییات مربوط به تسویه حساب کیف پول مشترک را مشاهده کنید.",
        cards: [
          {
            title: "تسویه حساب",
            description: `در این قسمت می‌توانید جزییات مربوط به تسویه حساب کیف پول مشترک را مشاهده و همچنین اقدام به عملیات تسویه حساب کنید.`,
            link: `${urlPrefix}${pluginUrl}/finance/sow/checkout`,
            hasDivider: false,
          },
        ],
      },
      {
        title: "گزارش کیف پول مشترک",
        description:
          "در این قسمت می‌توانید گزارش‌های تراکنش‌های مربوط به بخش‌های مختلف کیف پول مشترک را مشاهده کنید.",
        cards: [
          {
            title: `گزارش‌ کیف پول (تراکنش‌های شعبه ${!isSuper ? "اصلی" : ""})`,
            description: `در این قسمت می‌توانید گزارش کیف پول مربوط به تراکنش‌های شعبه‌ها را مشاهده نمایید.`,
            link: `${urlPrefix}${pluginUrl}/finance/sow/branch_transactions`,
            hasDivider: true,
          },
          {
            title: "گزارش‌ کیف پول (تراکنش‌های کاربر)",
            description: `در این قسمت می‌توانید گزارش کیف پول مربوط به تراکنش‌های کاربران را مشاهده نمایید.`,
            link: `${urlPrefix}${pluginUrl}/finance/sow/users_transactions`,
            hasDivider: true,
          },
          {
            title: "گزارش کیف پول(حساب‌های شعب)",
            description: `در این قسمت میتوانید گزارش کیف پول مربوط به حساب‌های شعب را مشاهده نمایید.`,
            link: `${urlPrefix}${pluginUrl}/finance/sow/all_branch_transactions`,
            hasDivider: false,
          },
        ],
      },
    ];
  }, [urlPrefix, pluginUrl, isSuper]);

  return (
    <div>
      <div className="container mb-5">
        <Head>
          <title>کیف پول مشترک</title>
        </Head>
        <AdminBreadCrumb />
        <SOWActivationModal
          isOpen={isSOWModalOpen}
          onClose={() => toggleSOWModalOpen(false)}
          hasSOW={hasSOW}
        />
        <Paper elevation={1} className="mt-4">
          <div className="py-3 px-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="u-fontMedium" style={{ color: graphite }}>
                کیف پول مشترک : {hasSOW ? "فعال" : "غیرفعال"}
              </div>
              <Switch
                checked={hasSOW}
                onChange={() => toggleSOWModalOpen(true)}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
            <div
              className="u-font-semi-small mt-1"
              style={{ color: smoke, lineHeight: 1.8 }}
            >
              در صورت فعال بودن کیف پول مشترک مشتریان شما می‌توانند با یک کیف
              پول، از تمامی شعب شما خرید کنند.
            </div>
          </div>
        </Paper>
        {hasSOW &&
          admin_SOW_page_cards.map((pageContent) => (
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
                        href={cart.link}
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
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  urlPrefix: makeSelectAdminUrlPrefix(),
  pluginsData: makeSelectPlugins(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(SOW);
