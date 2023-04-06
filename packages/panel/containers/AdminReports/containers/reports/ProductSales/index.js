/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";

import moment from "moment-jalaali";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { downloaderRequest } from "@saas/utils/helpers/downloaderRequest";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  makeSelectBranches,
  makeSelectBusiness,
  makeSelectBusinessId,
} from "@saas/stores/business/selector";
import { getAdminProducts } from "store/actions";
import {
  makeSelectAdminProducts,
  makeSelectDealsReportsSoldByCount,
} from "store/selectors";
import Chip from "@material-ui/core/Chip";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { BASE_URL_V2 } from "@saas/utils/api";
import { makeSelectUser } from "@saas/stores/user/selector";
import { BASE_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { SearchModal } from "./SearchModal";
import Input from "@saas/components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import CustomCalendar from "@saas/components/CustomCalendar";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export function AdminProductSalesReport({
  isLoading,
  isSuper,
  branches,
  // _getProductsReportsSoldByCount,
  business_id,
  user,
  BasePluginData,
  business,
  _getAdminProducts,
  adminDeals,
}) {
  const salesChannels =
    business?.super_business?.plugins_config[BASE_PLUGIN]?.sales_channels ||
    BasePluginData?.salesChannels;
  const salesChannelsOptions = useMemo(() => {
    if (salesChannels) {
      return Object.entries(salesChannels).map(([key, value]) => ({
        id: key,
        keyword: key,
        title: value?.name,
      }));
    } else {
      return [];
    }
  }, [salesChannels]);
  const router = useRouter();
  const theme = useTheme();
  const { minWidth768 } = useResponsive();

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [selectedDeliveryDayRange, setSelectedDeliveryDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelivery, setOpenModalDelivery] = useState(false);

  const [selectedSalesChannel, setSelectedSalesChannel] = useState(
    salesChannelsOptions.map((salesChannel) => salesChannel.id)
  );
  const handleCloseModalDelivery = () => setOpenModalDelivery(false);
  const handleOpenModalDelivery = () => setOpenModalDelivery(true);

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;
  const [selectedBranches, setSelectedBranches] = useState(
    branches.length ? branches.map((branch) => branch.id) : [business_id]
  );

  const inputRef = useRef(null);
  const page = parseInt(router.query.page) || 1;
  const pageSize = router.query.page_size || 10;
  const [isSearchModalOpen, toggleSearchModal] = useState(false);
  const _getProducts = _getAdminProducts;
  const fetchUpdatedDeals = useCallback(
    () =>
      _getProducts({
        filters: {
          ...router.query,
          page,
          page_size: pageSize,
        },
      }),
    [page, pageSize, router.query]
  );
  useEffect(() => {
    setTimeout(fetchUpdatedDeals, 0);
  }, [page, pageSize, router.query]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const selectedProductId = Object.keys(selectedProduct);
  const exportCSVEndpoint = useMemo(
    () =>
      selectedProductId?.length
        ? `${BASE_URL_V2}resources/reports/sold-by-count/excel/?${selectedSalesChannel
            .map((sc) => `sales_channel=${sc}`)
            .join("&")}&${selectedProductId
            .map((sb) => (isSuper ? `super_resource_id=${+sb}` : `resource_id=${+sb}`))
            .join("&")}&${selectedBranches
            .map((sb) => `business_id=${sb}`)
            .join("&")}&from_date=${persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          )}&to_date=${persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          )}&from_delivery_date=${persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDeliveryDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          )}&to_delivery_date=${persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDeliveryDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          )}`
        : `${BASE_URL_V2}resources/reports/sold-by-count/excel/?${selectedSalesChannel
            .map((sc) => `sales_channel=${sc}`)
            .join("&")}&${selectedBranches
            .map((sb) => `business_id=${sb}`)
            .join("&")}&from_date=${persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          )}&to_date=${persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          )}&from_delivery_date=${persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDeliveryDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          )}&to_delivery_date=${persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDeliveryDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          )}`,

    [
      selectedSalesChannel,
      selectedBranches,
      selectedProductId,
      selectedDayRange,
      selectedDeliveryDayRange,
    ]
  );

  return (
    <div className="container mb-5">
      <Head>
        <title>گزارش تعدادی فروش محصولات</title>
      </Head>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => toggleSearchModal(false)}
        deals={adminDeals}
        loading={isLoading}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <AdminBreadCrumb
        submitButtonText="خروجی گرفتن"
        submitAction={() => {
          if (user?.token) {
            downloaderRequest(
              "گزارش تعدادی فروش محصولات",
              exportCSVEndpoint,
              user.token
            );
          }
        }}
      />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex align-items-center  ml-3 mb-3">
              <div className="mt-2 ml-2">زمان ثبت سفارش: </div>
              <div className="d-flex flex-wrap align-items-center ml-5 mb-4 mb-lg-0">
                <Button
                  style={{
                    direction: "rtl",
                  }}
                  aria-describedby={id}
                  onClick={handleOpen}
                  variant="outlined"
                >
                  از{" "}
                  <span className="px-2">
                    {englishNumberToPersianNumber(
                      formatDateObjectToNormal(selectedDayRange.from)
                    )}
                  </span>
                  تا{" "}
                  <span className="px-2">
                    {englishNumberToPersianNumber(
                      formatDateObjectToNormal(selectedDayRange.to)
                    )}
                  </span>
                </Button>
                <Popover
                  id={id}
                  anchorOrigin={{
                    vertical: 195,
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openModal}
                  onClose={handleClose}
                >
                  <div
                    style={{ backgroundColor: "#fff", position: "relative" }}
                  >
                    <CloseIcon
                      onClick={handleClose}
                      className="u-cursor-pointer"
                      style={{
                        fontSize: 24,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10000,
                        color: "#555555",
                      }}
                    />
                    <CustomCalendar
                      selectedDayRange={selectedDayRange}
                      setSelectedDayRange={setSelectedDayRange}
                      submitDate={handleClose}
                    />
                  </div>
                </Popover>
              </div>

              <div className="mt-2 mx-2">زمان ارسال سفارش: </div>
              <div className="d-flex flex-wrap align-items-center ml-5 mb-4 mb-lg-0">
                <Button
                  style={{
                    direction: "rtl",
                  }}
                  aria-describedby={id}
                  onClick={handleOpenModalDelivery}
                  variant="outlined"
                >
                  از{" "}
                  <span className="px-2">
                    {englishNumberToPersianNumber(
                      formatDateObjectToNormal(selectedDeliveryDayRange.from)
                    )}
                  </span>
                  تا{" "}
                  <span className="px-2">
                    {englishNumberToPersianNumber(
                      formatDateObjectToNormal(selectedDeliveryDayRange.to)
                    )}
                  </span>
                </Button>
                <Popover
                  id={id}
                  anchorOrigin={{
                    vertical: 195,
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openModalDelivery}
                  onClose={handleCloseModalDelivery}
                >
                  <div
                    style={{ backgroundColor: "#fff", position: "relative" }}
                  >
                    <CloseIcon
                      onClick={handleCloseModalDelivery}
                      className="u-cursor-pointer"
                      style={{
                        fontSize: 24,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10000,
                        color: "#555555",
                      }}
                    />
                    <CustomCalendar
                      selectedDayRange={selectedDeliveryDayRange}
                      setSelectedDayRange={setSelectedDeliveryDayRange}
                      submitDate={handleCloseModalDelivery}
                    />
                  </div>
                </Popover>
              </div>
            </div>
            <Select
              className=" ml-3 mb-3"
              style={{ minWidth: 150, height: 36, flex: 1, maxWidth: 200 }}
              value={selectedSalesChannel}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              // IconComponent={() => null}
              renderValue={() => {
                if (selectedSalesChannel.length === 0)
                  return "کانال فروش انتخاب کنید";
                if (
                  selectedSalesChannel.length === 1 &&
                  selectedSalesChannel[0]
                )
                  return salesChannelsOptions.find(
                    (saleChannel) => saleChannel.id === selectedSalesChannel[0]
                  ).title;
                if (selectedSalesChannel.length === salesChannelsOptions.length)
                  return "همه کانال فروش‌ها";
                return `${englishNumberToPersianNumber(
                  selectedSalesChannel.length
                )} کانال‌فروش `;
              }}
              MenuProps={{
                getContentAnchorEl: null,
                style: { maxHeight: 500 },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                variant: "menu",
              }}
            >
              <MenuItem className="px-2">
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedSalesChannel.length !==
                      salesChannelsOptions.length && selectedSalesChannel.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedSalesChannel.length)
                      setSelectedSalesChannel([]);
                    else
                      setSelectedSalesChannel(
                        salesChannelsOptions.map(
                          (saleChannel) => saleChannel.id
                        )
                      );
                  }}
                  color="primary"
                  checked={
                    selectedSalesChannel.length === salesChannelsOptions.length
                  }
                />
                <ListItemText
                  primary="انتخاب همه کانال فروش‌ها"
                  className="text-right"
                />
              </MenuItem>
              {salesChannelsOptions.map((saleChannel) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={saleChannel.id}
                    value={saleChannel.id}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedSalesChannel.includes(saleChannel.id)) {
                        setSelectedSalesChannel([
                          ...selectedSalesChannel,
                          saleChannel.id,
                        ]);
                      } else {
                        setSelectedSalesChannel(
                          selectedSalesChannel.filter(
                            (pr) => pr !== saleChannel.id
                          )
                        );
                      }
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      color="primary"
                      checked={selectedSalesChannel.includes(saleChannel.id)}
                    />
                    <ListItemText
                      primary={saleChannel.title}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            {isSuper && (
              <Select
                className=" ml-3 mb-3"
                style={{ minWidth: 150, height: 36, flex: 1 }}
                value={selectedBranches}
                multiple
                margin="dense"
                variant="outlined"
                displayEmpty
                size="large"
                renderValue={() => {
                  if (selectedBranches.length === 0) return "شعبه انتخاب کنید";
                  if (selectedBranches.length === 1 && selectedBranches[0])
                    return branches.find(
                      (branch) => branch.id === selectedBranches[0]
                    ).title;
                  if (selectedBranches.length === branches.length)
                    return "همه شعب";
                  return `${englishNumberToPersianNumber(
                    selectedBranches.length
                  )} شعبه `;
                }}
                MenuProps={{
                  getContentAnchorEl: null,
                  style: { maxHeight: 500 },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  variant: "menu",
                }}
              >
                <MenuItem className="px-2">
                  <Checkbox
                    className="p-1"
                    size="small"
                    indeterminate={
                      selectedBranches.length !== branches.length &&
                      selectedBranches.length
                    }
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      if (selectedBranches.length) setSelectedBranches([]);
                      else setSelectedBranches(branches.map((b) => b.id));
                    }}
                    color="primary"
                    checked={selectedBranches.length === branches.length}
                  />
                  <ListItemText
                    primary="انتخاب همه شعب"
                    className="text-right"
                  />
                </MenuItem>
                {branches.map((branch) => {
                  return (
                    <MenuItem
                      className="px-2"
                      key={`${branch.id}-${selectedBranches.includes(
                        branch.id
                      )}`}
                      value={branch.id}
                    >
                      <Checkbox
                        className="p-1"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!selectedBranches.includes(branch.id)) {
                            setSelectedBranches([
                              ...selectedBranches,
                              branch.id,
                            ]);
                          } else {
                            setSelectedBranches(
                              selectedBranches.filter((id) => id !== branch.id)
                            );
                          }
                        }}
                        color="primary"
                        checked={selectedBranches.includes(branch.id)}
                      />
                      <ListItemText
                        primary={branch.title}
                        className="text-right"
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            )}
            <div className="mb-3 d-flex justify-content-between">
              <div
                className="w-100"
                onClick={() => {
                  toggleSearchModal(true);
                }}
              >
                <Input
                  size="small"
                  inputRef={inputRef}
                  style={{
                    width: "100%",
                  }}
                  className="ml-2"
                  placeholder={minWidth768 ? "جستجوی محصول" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className="u-cursor-pointer"
                        position="start"
                      >
                        <SearchRoundedIcon
                          className="mr-1"
                          style={{ color: theme.palette.text.disabled }}
                          fontSize="small"
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {isSuper && (
          <div className="d-flex align-items-center flex-wrap px-4">
            {selectedBranches?.length === branches?.length ? (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() => setSelectedBranches([])}
                label="همه شعب"
              />
            ) : selectedBranches?.length ? (
              branches
                ?.filter((item) => selectedBranches.includes(item.id))
                .map((branch) => {
                  return (
                    <Chip
                      key={branch.id}
                      deleteIcon={
                        <ClearRoundedIcon
                          style={{ color: theme.palette.text.disabled }}
                        />
                      }
                      style={{
                        borderRadius: 4,
                        background: theme.palette.background.secondary,
                        maxWidth: "fit-content",
                      }}
                      className="ml-2 mb-2"
                      onDelete={() =>
                        setSelectedBranches(
                          selectedBranches.filter((item) => item !== branch.id)
                        )
                      }
                      label={branch.title}
                    />
                  );
                })
            ) : (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() =>
                  setSelectedBranches(branches.map((branch) => branch.id))
                }
                label="هیچ‌کدام از شعب"
              />
            )}
          </div>
        )}
        <div className="d-flex align-items-center flex-wrap px-4">
          {selectedSalesChannel?.length === salesChannelsOptions?.length ? (
            <Chip
              deleteIcon={
                <ClearRoundedIcon
                  style={{ color: theme.palette.text.disabled }}
                />
              }
              style={{
                borderRadius: 4,
                background: theme.palette.background.secondary,
                maxWidth: "fit-content",
              }}
              className="ml-2 mb-2"
              onDelete={() => setSelectedSalesChannel([])}
              label="همه کانال‌های فروش"
            />
          ) : selectedSalesChannel?.length ? (
            salesChannelsOptions
              ?.filter((item) => selectedSalesChannel.includes(item.id))
              .map((ingredient) => {
                return (
                  <Chip
                    key={ingredient.id}
                    deleteIcon={
                      <ClearRoundedIcon
                        style={{ color: theme.palette.text.disabled }}
                      />
                    }
                    style={{
                      borderRadius: 4,
                      background: theme.palette.background.secondary,
                      maxWidth: "fit-content",
                    }}
                    className="ml-2 mb-2"
                    onDelete={() =>
                      setSelectedSalesChannel(
                        selectedSalesChannel.filter(
                          (item) => item !== ingredient.id
                        )
                      )
                    }
                    label={ingredient.title}
                  />
                );
              })
          ) : (
            <Chip
              deleteIcon={
                <ClearRoundedIcon
                  style={{ color: theme.palette.text.disabled }}
                />
              }
              style={{
                borderRadius: 4,
                background: theme.palette.background.secondary,
                maxWidth: "fit-content",
              }}
              className="ml-2 mb-2"
              onDelete={() =>
                setSelectedSalesChannel(
                  salesChannelsOptions?.map((ingredient) => ingredient.id)
                )
              }
              label="هیچ‌کدام از کانال‌های فروش"
            />
          )}
        </div>
        <div className="d-flex align-items-center flex-wrap px-4">
          {selectedProduct &&
            Object.keys(selectedProduct).map((i) => {
              return (
                <Chip
                  key={i.id}
                  deleteIcon={
                    <ClearRoundedIcon
                      style={{ color: theme.palette.text.disabled }}
                    />
                  }
                  style={{
                    borderRadius: 4,
                    background: theme.palette.background.secondary,
                    maxWidth: "fit-content",
                  }}
                  className="ml-2 mb-2"
                  onDelete={() => {
                    const _selectedProducts = { ...selectedProduct };
                    delete _selectedProducts[selectedProduct[i].id];
                    setSelectedProduct({ ..._selectedProducts });
                  }}
                  label={selectedProduct[i].title}
                />
              );
            })}
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
  dealsReportsSoldByCount: makeSelectDealsReportsSoldByCount(),
  business_id: makeSelectBusinessId(),
  user: makeSelectUser(),
  BasePluginData: makeSelectPlugin(BASE_PLUGIN),
  business: makeSelectBusiness(),
  adminDeals: makeSelectAdminProducts(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminProducts: (data) => dispatch(getAdminProducts(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminProductSalesReport);
