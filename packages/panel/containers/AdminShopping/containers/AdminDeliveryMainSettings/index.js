/**
 *
 * Settings
 *
 */

import React, { memo, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";

import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import {
  makeSelectDeliveryTypes,
  makeSelectPlugin,
  makeSelectDeliveryTypesPagination,
  makeSelectPlugins,
  makeSelectAdminUrlPrefix,
} from "@saas/stores/plugins/selector";
import { coal, graphite, night, smoke } from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Switch from "@material-ui/core/Switch";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Link from "next/link";
import { getDeliveryTypes, setPluginData } from "@saas/stores/plugins/actions";
import {
  FULFILLMENT_ON_USER_SITE,
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_CARRY_OUT,
  deliveryTypePersianNames,
  FULFILLMENT_ON_CAR,
} from "@saas/plugins/Shopping/constants";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectBranches } from "@saas/stores/business/selector";
import LocationSelector from "components/LocationSelector";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { getBusiness } from "@saas/stores/business/actions";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";
function AdminDeliveryMainSettings({
  shoppingPluginData,
  _setPluginData,
  deliveryTypes,
  _getDeliveryTypes,
  pagination,
  loading,
  branches,
  pluginsData,
  plugin = SHOPPING_PLUGIN,
  isSuper,
  urlPrefix,
  _getBusinessData,
}) {
  const { maxWidth768 } = useResponsive();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : null
  );
  const pluginData = isSuper
    ? {
        ...branches.find((branch) => branch.slug === selectedBranch)
          ?.plugins_config[SHOPPING_PLUGIN],
        ui_access_config: branches.find(
          (branch) => branch.slug === selectedBranch
        )?.ui_access_config?.admin_panel?.plugins?.[SHOPPING_PLUGIN],
      }
    : shoppingPluginData;
  const pluginUrl = pluginsData[plugin].plugin_url;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    setTimeout(() => {
      _getDeliveryTypes(SHOPPING_PLUGIN, page + 1, selectedBranch);
    }, 0);
  }, [page, selectedBranch]);
  const [deliveryTypesState, toggleDeliveryTypesState] = useState({
    [FULFILLMENT_ON_USER_SITE]: false,
    [FULFILLMENT_ON_BUSINESS_SITE]: false,
    [FULFILLMENT_CARRY_OUT]: false,
    [FULFILLMENT_ON_CAR]: false,
  });
  const [isDialogBoxOpen, setDialogBoxOpen] = useState(false);
  useEffect(() => {
    if (pluginData.data?.delivery_type_options) {
      const _deliveryTypesState = {
        [FULFILLMENT_ON_USER_SITE]: false,
        [FULFILLMENT_ON_BUSINESS_SITE]: false,
        [FULFILLMENT_CARRY_OUT]: false,
        [FULFILLMENT_ON_CAR]: false,
      };
      pluginData.data?.delivery_type_options?.forEach((option) => {
        _deliveryTypesState[option] = true;
      });
      toggleDeliveryTypesState(_deliveryTypesState);
    } else {
      const _deliveryTypesState = { ...deliveryTypesState };
      [
        FULFILLMENT_ON_BUSINESS_SITE,
        FULFILLMENT_CARRY_OUT,
        FULFILLMENT_ON_USER_SITE,
      ].forEach((option) => {
        _deliveryTypesState[option] = true;
      });
      toggleDeliveryTypesState(_deliveryTypesState);
    }
  }, [pluginData.data, selectedBranch]);

  const submit = (_deliveryTypesState) => {
    const options = Object.keys(_deliveryTypesState).filter(
      (key) => _deliveryTypesState[key]
    );

    if (pluginData) {
      _setPluginData(
        SHOPPING_PLUGIN,
        {
          ...pluginData.data,
          delivery_type_options: options,
        },
        _getBusinessData,
        selectedBranch
      );
    }
  };

  const switchHandler = (event) => {
    if (!event.target.checked) {
      setDialogBoxOpen(true);
    } else {
      setDialogBoxOpen(false);
      const _deliveryTypesState = {
        ...deliveryTypesState,
        [FULFILLMENT_ON_USER_SITE]: true,
      };
      toggleDeliveryTypesState(_deliveryTypesState);
      submit(_deliveryTypesState);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("adminDeliverySelectedBranch") && isSuper)
      setSelectedBranch(localStorage.getItem("adminDeliverySelectedBranch"));
  }, []);
  return (
    <>
      <div className="container mb-3 mb-md-0">
        <Head>
          <title>Send settings</title>
        </Head>
        <AdminBreadCrumb
          submitButtonText="New sending method"
          submitButtonHasPlus
          submitAction={() =>
            router.push(
              `${urlPrefix}${pluginUrl}/settings/general/delivery/new`
            )
          }
          helpVideo={{ url: ADMIN_HELP_VIDEOS.deliverySetting.url }}
          isLoading={loading}
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
        <Paper elevation={1} className="mt-4">
          <div className="py-3 px-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="u-fontMedium" style={{ color: graphite }}>
                Send order:{" "}
                {deliveryTypesState[FULFILLMENT_ON_USER_SITE]
                  ? "active"
                  : "Inactive"}
              </div>
              <Switch
                checked={deliveryTypesState[FULFILLMENT_ON_USER_SITE]}
                onChange={(event) => switchHandler(event)}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
            <div
              className="u-font-semi-small mt-1"
              style={{ color: smoke, lineHeight: 1.8 }}
            >
              {deliveryTypesState[FULFILLMENT_ON_USER_SITE] ? (
                "Customers can register their purchase on the site and receive it at their desired address."
              ) : (
                <span>
                  It is not possible to send an order to the customer. You can visit
                  to section
                  <span
                    className="u-cursor-pointer mx-1"
                    style={{
                      borderBottom: `1px solid ${process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}`,
                      color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                    }}
                    onClick={() =>
                      router.push(
                        `${urlPrefix}${pluginUrl}/settings/general/pickup`
                      )
                    }
                  >
                    {` "In -person delivery settings"`}
                  </span>
                  Enable the ability to deliver in person for your customers.
                </span>
              )}
            </div>
          </div>
        </Paper>
        <Paper
          elevation={1}
          className="mt-4"
          style={{ marginBottom: maxWidth768 ? 60 : "" }}
        >
          {loading ? (
            <LoadingIndicator />
          ) : (
            <TableContainer>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {!maxWidth768 && (
                      <TableCell
                        className="text-nowrap px-4 py-2 u-fontMedium u-fontWeightBold"
                        align="right"
                        style={{ color: coal, width: "3%" }}
                      >
                        Row
                      </TableCell>
                    )}
                    <TableCell
                      className="text-nowrap px-4 py-2 u-fontMedium u-fontWeightBold"
                      align="right"
                      style={{ color: coal }}
                    >
                      Name of the method of submission
                    </TableCell>
                    <TableCell
                      className="text-nowrap px-4 py-2 u-fontMedium u-fontWeightBold"
                      align="left"
                      style={{ color: coal }}
                    >
                      Type
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deliveryTypes &&
                    deliveryTypes.map((deliveryType, index) => (
                      <TableRow key={deliveryType.id} hover>
                        {!maxWidth768 && (
                          <Link
                            passHref
                            href={`${urlPrefix}${pluginUrl}/settings/general/delivery/[id]`}
                            as={`${urlPrefix}${pluginUrl}/settings/general/delivery/${deliveryType.id}`}
                          >
                            <TableCell
                              className="text-nowrap px-4 py-2 u-cursor-pointer"
                              align="right"
                              style={{ width: "3%" }}
                            >
                              {englishNumberToPersianNumber(
                                page * 10 + (index + 1)
                              )}
                            </TableCell>
                          </Link>
                        )}
                        <Link
                          passHref
                          href={`${urlPrefix}${pluginUrl}/settings/general/delivery/[id]`}
                          as={`${urlPrefix}${pluginUrl}/settings/general/delivery/${deliveryType.id}`}
                        >
                          <TableCell
                            className="text-nowrap px-4 py-2 u-cursor-pointer"
                            align="right"
                          >
                            {deliveryType.title}
                          </TableCell>
                        </Link>
                        <Link
                          passHref
                          href={`${urlPrefix}${pluginUrl}/settings/general/delivery/[id]`}
                          as={`${urlPrefix}${pluginUrl}/settings/general/delivery/${deliveryType.id}`}
                        >
                          <TableCell
                            className="px-4 py-2 u-cursor-pointer"
                            align="left"
                          >
                            {deliveryTypePersianNames[deliveryType.timing.type]}
                          </TableCell>
                        </Link>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            labelDisplayedRows={({ from, to, count }) =>
              `${englishNumberToPersianNumber(
                from
              )} - ${englishNumberToPersianNumber(to)} From${
                count !== -1
                  ? englishNumberToPersianNumber(count)
                  : `more than${englishNumberToPersianNumber(to)}`
              }`
            }
            rowsPerPageOptions={[10]}
            component="div"
            count={pagination ? pagination.count : 10}
            rowsPerPage={10}
            page={page}
            onChangePage={handleChangePage}
            ActionsComponent={({ count, page, rowsPerPage, onChangePage }) => (
              <div className="">
                <IconButton
                  onClick={(event) => {
                    onChangePage(event, page - 1);
                  }}
                  disabled={page === 0}
                  aria-label="previous page"
                >
                  <KeyboardArrowRight />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    onChangePage(event, page + 1);
                  }}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="next page"
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </div>
            )}
          />
        </Paper>
      </div>
      <Dialog
        open={isDialogBoxOpen}
        aria-describedby="alert-dialog-description"
        onClose={() => setDialogBoxOpen(false)}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="d-flex justify-content-between align-items-center">
              <div
                style={{ color: night }}
                className="u-fontLarge u-fontWeightMedium"
              >
                Disabled order shipping
              </div>
              <CloseRoundedIcon
                className="u-cursor-pointer"
                style={{ color: night }}
                onClick={() => setDialogBoxOpen(false)}
              />
            </div>
            <div style={{ color: graphite }} className="u-fontMedium mt-4">
              In case of disabling customers, they will not be able to register an order
              Was. Are you sure of disabling it?
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          className="justify-content-start"
          style={{ padding: "0px 24px 20px 0px" }}
        >
          <Button
            onClick={() => setDialogBoxOpen(false)}
            variant="outlined"
            color="primary"
            className="ml-2"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              const _deliveryTypesState = {
                ...deliveryTypesState,
                [FULFILLMENT_ON_USER_SITE]: false,
              };
              toggleDeliveryTypesState(_deliveryTypesState);
              submit(_deliveryTypesState);
              setDialogBoxOpen(false);
            }}
            variant="contained"
            color="primary"
          >
            to deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  deliveryTypes: makeSelectDeliveryTypes(SHOPPING_PLUGIN),
  pagination: makeSelectDeliveryTypesPagination(SHOPPING_PLUGIN),
  loading: makeSelectLoading(),
  branches: makeSelectBranches(),
  pluginsData: makeSelectPlugins(),
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setPluginData: (pluginName, data, callback, slug) =>
      dispatch(setPluginData(pluginName, data, callback, slug)),
    _getDeliveryTypes: (pluginName, nextpage, slug) =>
      dispatch(getDeliveryTypes(pluginName, nextpage, slug)),
    _getBusinessData: () => dispatch(getBusiness()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminDeliveryMainSettings);
