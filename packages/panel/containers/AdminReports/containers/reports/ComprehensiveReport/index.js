/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import jMoment from "moment-jalaali";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { surface } from "@saas/utils/colors";
import MaterialSelect from "@saas/components/Select/MaterialSelect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import { getShoppingOrdersPaymentSummaryReports } from "store/actions";
import { makeSelectShoppingOrdersPaymentSummaryReports } from "store/selectors";
import Chip from "@material-ui/core/Chip";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import {
  HIGHEST_PRICE,
  HIGHEST_SALES_AMOUNT,
  LOWEST_PRICE,
  LOWEST_SALES_AMOUNT,
} from "../constants";
import { BASE_PLUGIN } from "@saas/utils/constants/plugins";

import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import CustomCalendar from "@saas/components/CustomCalendar";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const sortingOptions = [
  { id: 0, text: "بیشترین تعداد", keyword: HIGHEST_SALES_AMOUNT },
  { id: 1, text: "کمترین تعداد", keyword: LOWEST_SALES_AMOUNT },
  { id: 2, text: "بیشترین مبلغ", keyword: HIGHEST_PRICE },
  { id: 3, text: "کمترین مبلغ", keyword: LOWEST_PRICE },
];

const sortingFunctions = {
  [HIGHEST_SALES_AMOUNT]: (businesses) =>
    businesses?.sort((a, b) =>
      a.grand_total_num_orders < b.grand_total_num_orders ? 1 : -1
    ),
  [LOWEST_SALES_AMOUNT]: (businesses) =>
    businesses?.sort((a, b) =>
      a.grand_total_num_orders > b.grand_total_num_orders ? 1 : -1
    ),
  [HIGHEST_PRICE]: (businesses) =>
    businesses?.sort((a, b) =>
      a.grand_total_payments < b.grand_total_payments ? 1 : -1
    ),
  [LOWEST_PRICE]: (businesses) =>
    businesses?.sort((a, b) =>
      a.grand_total_payments > b.grand_total_payments ? 1 : -1
    ),
};

const branchHeadCells = [
  {
    id: "id",
    name: "ردیف",
    label: "ردیف",
    align: "center",
  },
  {
    id: "id",
    name: "میانگین فاکتور",
    label: (
      <div className="d-flex flex-column">
        <div> میانگین فاکتور کل</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
    style: {
      position: "sticky",
      top: 0,
      left: 260,
      background: "#F1F2F3",
      borderRight: "none",
      borderBottom: "none",
      minWidth: 130,
      maxWidth: 130,
    },
  },
  {
    id: "id",
    name: "تعداد کل",
    label: "تعداد کل",
    align: "center",
    style: {
      position: "sticky",
      top: 0,
      left: 130,
      background: "#F1F2F3",
      borderRight: "none",
      borderBottom: "none",
      minWidth: 130,
      maxWidth: 130,
    },
  },
  {
    id: "id",
    name: "مبلغ فروش کل",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ فروش کل</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
    style: {
      position: "sticky",
      top: 0,
      left: 0,
      background: "#F1F2F3",
      borderRight: "none",
      borderBottom: "none",
      minWidth: 130,
      maxWidth: 130,
    },
  },
];

const mainBranchSpanHeadCells = [
  {
    id: 1,
    label: "",
    align: "center",
  },
  {
    id: 8,
    label: "",
    align: "center",
    collSpan: 3,
    style: {
      position: "sticky",
      top: 0,
      left: 0,
      background: "#F1F2F3",
    },
  },
];

let timeoutId = null;

export function AdminComprehensiveReport({
  isLoading,
  isSuper,
  branches,
  _getShoppingOrdersPaymentSummaryReports,
  shoppingOrdersPaymentSummaryReports,
  BasePluginData,
  business,
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
  const theme = useTheme();

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = openModal ? "simple-popover" : undefined;

  const [selectedSalesChannel, setSelectedSalesChannel] = useState(
    salesChannelsOptions?.map((salesChannel) => salesChannel.id)
  );
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );

  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getShoppingOrdersPaymentSummaryReports({
            business_id: selectedBranches,
            sales_channel: selectedSalesChannel,
            from_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.from),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.to),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getShoppingOrdersPaymentSummaryReports({
          sales_channel: selectedSalesChannel,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
    handleClose();
  };

  const branchHeadCellsWithSalesChannels = useMemo(() => {
    const _branchHeadCells = [...branchHeadCells];
    const _salesChannels = [];
    if (salesChannels) {
      Object.keys(salesChannels).forEach(() =>
        _salesChannels.push(
          {
            id: "id",
            name: "مجموع فروش",
            label: "مجموع فروش",
            align: "center",
          },
          {
            id: "id",
            name: "سهم فروش",
            label: "سهم فروش",
            align: "center",
          },
          {
            id: "id",
            name: "تعداد",
            label: "تعداد",
            align: "center",
          },
          {
            id: "id",
            name: "میانگین فاکتور",
            label: (
              <div className="d-flex flex-column">
                <div>میانگین فاکتور</div>
                <div className="u-font-semi-small u-fontWeightNormal">
                  (تومان)
                </div>
              </div>
            ),
            align: "center",
          }
        )
      );
    }
    _branchHeadCells.splice(1, 0, ..._salesChannels);
    return _branchHeadCells;
  }, [salesChannels]);

  const headCells = useMemo(() => {
    if (isSuper) {
      const mainBranchHeadCells = [...branchHeadCellsWithSalesChannels];
      mainBranchHeadCells.splice(1, 0, {
        id: "id",
        label: "نام شعبه",
        name: "نام شعبه",
        align: "center",
      });
      return mainBranchHeadCells;
    } else {
      return branchHeadCellsWithSalesChannels;
    }
  }, [isSuper, branchHeadCellsWithSalesChannels]);
  const branchSpanHeadCellsWithSalesChannels = useMemo(() => {
    const _mainBranchSpanHeadCells = [...mainBranchSpanHeadCells];
    const _salesChannels = salesChannels
      ? Object.entries(salesChannels).map(([key, value]) => ({
          id: key,
          label: value?.name,
          align: "center",
          collSpan: 4,
        }))
      : [];
    _mainBranchSpanHeadCells.splice(1, 0, ..._salesChannels);
    return _mainBranchSpanHeadCells;
  }, [salesChannels]);

  const spanHeadCells = useMemo(() => {
    if (isSuper) {
      const mainBranchSpanHeadCells = [...branchSpanHeadCellsWithSalesChannels];
      mainBranchSpanHeadCells.splice(1, 0, {
        id: "id",
        label: "",
        align: "center",
      });
      return mainBranchSpanHeadCells;
    } else {
      return branchSpanHeadCellsWithSalesChannels;
    }
  }, [isSuper, branchSpanHeadCellsWithSalesChannels]);

  useEffect(() => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getShoppingOrdersPaymentSummaryReports({
            business_id: selectedBranches,
            sales_channel: selectedSalesChannel,
            from_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.from),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.to),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getShoppingOrdersPaymentSummaryReports({
          sales_channel: selectedSalesChannel,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
  }, [selectedSalesChannel, isSuper, selectedBranches]);
  const headCellsRow = headCells.map((headCell) => headCell.name);
  const salesChannelsRow = spanHeadCells
    ?.map((saleChannel) => {
      if (saleChannel?.collSpan) {
        return Array.from(Array(saleChannel?.collSpan)).map(
          () => saleChannel.label
        );
      }
      return saleChannel.label;
    })
    .flat();
  const rows = useMemo(() => {
    if (!isLoading) {
      const _rows = sortingFunctions?.[selectedSortingType](
        shoppingOrdersPaymentSummaryReports?.businesses || []
      )?.map((business, index) => {
        const extraData = salesChannelsOptions?.map((channel) => {
          const salesChannelObj = business?.per_sales_channel?.find(
            (ch) => ch.sales_channel === channel.id
          );
          return [
            salesChannelObj?.total_payments || "-",
            salesChannelObj?.percent_of_total_payment || "-",
            salesChannelObj?.total_num_orders || "-",
            salesChannelObj?.total_payment_average || "-",
          ];
        });
        if (isSuper) {
          return [
            index + 1,
            branches?.find((branch) => branch.id === business.business_id)
              .title,
            extraData?.flat(),
            business.grand_total_payments_average,
            business.grand_total_num_orders,
            business.grand_total_payments,
          ]?.flat();
        } else {
          return [
            index + 1,
            extraData?.flat(),
            business.grand_total_payments_average,
            business.grand_total_num_orders,
            business.grand_total_payments,
          ]?.flat();
        }
      });
      return _rows;
    }
    return [];
  }, [
    isLoading,
    sortingFunctions,
    selectedSortingType,
    shoppingOrdersPaymentSummaryReports,
    selectedBranches,
    selectedSalesChannel,
  ]);

  return (
    <div className="container">
      <Head>
        <title>{isSuper ? "گزارش جامع عملکرد شعب" : "گزارش جامع عملکرد"}</title>
      </Head>

      {/* <AdminBreadCrumb /> */}
      <AdminBreadCrumb
        isLoading={isLoading}
        submitButtonText="خروجی گرفتن"
        submitAction={() =>
          generateCSVFile(
            [salesChannelsRow, headCellsRow].join("\n"),
            rows || [],
            [],
            `گزارش جامع عملکرد از ${formatDateObjectToNormal(
              selectedDayRange.from
            )} تا  ${formatDateObjectToNormal(selectedDayRange.to)}`
          )
        }
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
      .highcharts-background {
        fill : #FFFFFF;
      }
      `,
        }}
      />

      <Paper
        elevation={2}
        className="d-flex flex-column mt-4"
        style={{ marginBottom: 100 }}
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex flex-wrap align-items-center mb-3 ml-3">
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
                <div style={{ backgroundColor: "#fff", position: "relative" }}>
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
                    submitDate={submitDate}
                  />
                </div>
              </Popover>
            </div>
            <Select
              className=" ml-3 mb-3"
              style={{ minWidth: 150, height: 36, flex: 1 }}
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
                  return salesChannelsOptions?.find(
                    (saleChannel) => saleChannel.id === selectedSalesChannel[0]
                  ).title;
                if (
                  selectedSalesChannel.length === salesChannelsOptions?.length
                )
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
                      salesChannelsOptions?.length &&
                    selectedSalesChannel.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedSalesChannel.length)
                      setSelectedSalesChannel([]);
                    else
                      setSelectedSalesChannel(
                        salesChannelsOptions?.map(
                          (saleChannel) => saleChannel.id
                        )
                      );
                  }}
                  color="primary"
                  checked={
                    selectedSalesChannel.length === salesChannelsOptions?.length
                  }
                />
                <ListItemText
                  primary="انتخاب همه کانال فروش‌ها"
                  className="text-right"
                />
              </MenuItem>
              {salesChannelsOptions?.map((saleChannel) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={saleChannel.id}
                    value={saleChannel.id}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
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
                // IconComponent={() => null}
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
          </div>
          <MaterialSelect
            FormControlProps={{
              style: {
                width: 80,
                flexShrink: 0,
              },
            }}
            className="small ml-2 pr-0 direction-ltr mb-3"
            inputProps={{
              className: "text-center ml-minus-2",
            }}
            IconComponent={() => null}
            options={sortingOptions}
            themeColor={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
            menuHeader={
              <div
                style={{ width: 200 }}
                className="px-3 u-fontWeightBold u-fontNormal my-1"
              >
                مرتب‌سازی بر اساس
              </div>
            }
            selectOption={(text) =>
              selectSortingType(
                sortingOptions.find((i) => i.text === text).keyword
              )
            }
            inputData={{
              defaultValue: "مرتب‌سازی",
            }}
            selected={sortingOptions.find(
              (i) => i.keyword === selectedSortingType
            )}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              elevation: 3,
              getContentAnchorEl: null,
            }}
          />
        </div>
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
        {!selectedSalesChannel?.length ? (
          <div className="mx-auto">هیچ کانال فروشی انتخاب نشده است.</div>
        ) : !selectedBranches?.length && isSuper ? (
          <div className="mx-auto">هیچ شعبه‌ای انتخاب نشده است.</div>
        ) : (
          <TableContainer
            className="mt-3 purchase-by-order-table"
            style={{ maxHeight: 500 }}
          >
            <Table
              aria-labelledby="tableTitle"
              size="small"
              aria-label="enhanced table"
            >
              <TableHead
                style={{
                  backgroundColor: "#F1F2F3",
                  height: 50,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableRow>
                  {spanHeadCells.map((headCell) => (
                    <TableCell
                      padding={headCell.padding || "unset"}
                      width={headCell.width || ""}
                      className="text-nowrap u-fontWeightBold"
                      key={headCell.id}
                      align={headCell.align}
                      style={headCell.style}
                      colSpan={headCell.collSpan}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableHead
                style={{
                  backgroundColor: "#F1F2F3",
                  height: 50,
                  position: "sticky",
                  top: 50,
                  zIndex: 1,
                }}
              >
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      padding={headCell.padding || "unset"}
                      width={headCell.width || ""}
                      className="text-nowrap u-fontWeightBold"
                      key={headCell.id}
                      align={headCell.align}
                      style={headCell.style}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableBody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <TableRow style={{ height: 53 }} key={item}>
                      {headCells.map((cell) => (
                        <TableCell key={cell.id}>
                          <Skeleton
                            style={{
                              transform: "scale(1)",
                              width: "100%",
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {sortingFunctions[selectedSortingType](
                    shoppingOrdersPaymentSummaryReports?.businesses
                  )?.map((report, index) => {
                    return (
                      <TableRow key={report.id}>
                        <TableCell align="center">
                          {englishNumberToPersianNumber(index + 1)}
                        </TableCell>
                        {isSuper && (
                          <TableCell align="center">
                            {
                              branches?.find(
                                (branch) => branch.id === report.business_id
                              ).title
                            }
                          </TableCell>
                        )}
                        {salesChannelsOptions?.map((channel) => {
                          const salesChannelObj =
                            report?.per_sales_channel?.find(
                              (ch) => ch.sales_channel === channel.id
                            );
                          return (
                            <>
                              <TableCell align="center">
                                {salesChannelObj?.total_payments
                                  ? priceFormatter(
                                      salesChannelObj?.total_payments
                                    )
                                  : "-"}
                              </TableCell>
                              <TableCell align="center">
                                {salesChannelObj?.percent_of_total_payment
                                  ? englishNumberToPersianNumber(
                                      (salesChannelObj?.percent_of_total_payment).toFixed(
                                        2
                                      )
                                    ) + "%"
                                  : "-"}
                              </TableCell>
                              <TableCell align="center">
                                {salesChannelObj?.total_num_orders
                                  ? priceFormatter(
                                      salesChannelObj?.total_num_orders
                                    )
                                  : "-"}
                              </TableCell>
                              <TableCell align="center">
                                {salesChannelObj?.total_payment_average
                                  ? priceFormatter(
                                      salesChannelObj?.total_payment_average
                                    )
                                  : "-"}
                              </TableCell>
                            </>
                          );
                        })}
                        <TableCell
                          align="center"
                          style={{
                            position: "sticky",
                            left: 260,
                            background: "#F1F2F3",
                            minWidth: 130,
                            maxWidth: 130,
                          }}
                        >
                          {priceFormatter(report.grand_total_payments_average)}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            position: "sticky",
                            left: 130,
                            background: "#F1F2F3",
                            minWidth: 130,
                            maxWidth: 130,
                          }}
                        >
                          {priceFormatter(report.grand_total_num_orders)}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            position: "sticky",
                            left: 0,
                            background: "#F1F2F3",
                            minWidth: 130,
                            maxWidth: 130,
                          }}
                        >
                          {priceFormatter(report.grand_total_payments)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow
                    style={{
                      backgroundColor: "#F1F2F3",
                      height: 85,
                      position: "sticky",
                      bottom: 0,
                    }}
                  >
                    <TableCell
                      align="center"
                      style={{ border: "none", position: "sticky", right: 0 }}
                    >
                      جمع کل
                    </TableCell>
                    {isSuper && (
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                    )}
                    {salesChannelsOptions.map((item) => {
                      const salesChannelObj =
                        shoppingOrdersPaymentSummaryReports?.totals[0]?.per_sales_channel.find(
                          (ch) => ch.sales_channel === item.id
                        );
                      return salesChannelObj ? (
                        <>
                          <TableCell align="center" style={{ border: "none" }}>
                            <div
                              style={{
                                backgroundColor: surface.neutral.default,
                                borderRadius: 4,
                              }}
                              className="px-4 py-3 u-fontWeightBold"
                            >
                              {priceFormatter(salesChannelObj?.total_payments)}
                            </div>
                          </TableCell>
                          <TableCell align="center" style={{ border: "none" }}>
                            <div
                              style={{
                                backgroundColor: surface.neutral.default,
                                borderRadius: 4,
                              }}
                              className="px-4 py-3 u-fontWeightBold"
                            >
                              -
                            </div>
                          </TableCell>
                          <TableCell align="center" style={{ border: "none" }}>
                            <div
                              style={{
                                backgroundColor: surface.neutral.default,
                                borderRadius: 4,
                              }}
                              className="px-4 py-3 u-fontWeightBold"
                            >
                              {priceFormatter(
                                salesChannelObj?.total_num_orders
                              )}
                            </div>
                          </TableCell>
                          <TableCell align="center" style={{ border: "none" }}>
                            <div
                              style={{
                                backgroundColor: surface.neutral.default,
                                borderRadius: 4,
                              }}
                              className="px-4 py-3 u-fontWeightBold"
                            >
                              {priceFormatter(
                                salesChannelObj?.total_payments /
                                  salesChannelObj?.total_num_orders
                              )}
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell align="center" style={{ border: "none" }}>
                            <div
                              style={{
                                backgroundColor: surface.neutral.default,
                                borderRadius: 4,
                              }}
                              className="px-4 py-3 u-fontWeightBold"
                            >
                              -
                            </div>
                          </TableCell>
                          <TableCell align="center" style={{ border: "none" }}>
                            <div
                              style={{
                                backgroundColor: surface.neutral.default,
                                borderRadius: 4,
                              }}
                              className="px-4 py-3 u-fontWeightBold"
                            >
                              -
                            </div>
                          </TableCell>
                          <TableCell align="center" style={{ border: "none" }}>
                            <div
                              style={{
                                backgroundColor: surface.neutral.default,
                                borderRadius: 4,
                              }}
                              className="px-4 py-3 u-fontWeightBold"
                            >
                              -
                            </div>
                          </TableCell>
                          <TableCell align="center" style={{ border: "none" }}>
                            <div
                              style={{
                                backgroundColor: surface.neutral.default,
                                borderRadius: 4,
                              }}
                              className="px-4 py-3 u-fontWeightBold"
                            >
                              -
                            </div>
                          </TableCell>
                        </>
                      );
                    })}
                    <TableCell
                      align="center"
                      style={{
                        border: "none",
                        position: "sticky",
                        left: 260,
                        background: "#F1F2F3",
                        minWidth: 130,
                        maxWidth: 130,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: surface.neutral.default,
                          borderRadius: 4,
                        }}
                        className="px-4 py-3 u-fontWeightBold"
                      >
                        {priceFormatter(
                          shoppingOrdersPaymentSummaryReports?.totals[0]
                            ?.grand_total_payment_average
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        border: "none",
                        position: "sticky",
                        left: 130,
                        background: "#F1F2F3",
                        minWidth: 130,
                        maxWidth: 130,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: surface.neutral.default,
                          borderRadius: 4,
                        }}
                        className="px-4 py-3 u-fontWeightBold"
                      >
                        {priceFormatter(
                          shoppingOrdersPaymentSummaryReports?.totals[0]
                            ?.grand_total_num_orders
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        border: "none",
                        position: "sticky",
                        left: 0,
                        background: "#F1F2F3",
                        minWidth: 130,
                        maxWidth: 130,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: surface.neutral.default,
                          borderRadius: 4,
                        }}
                        className="px-4 py-3 u-fontWeightBold"
                      >
                        {priceFormatter(
                          shoppingOrdersPaymentSummaryReports?.totals[0]
                            ?.grand_total_payments
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
  shoppingOrdersPaymentSummaryReports:
    makeSelectShoppingOrdersPaymentSummaryReports(),
  BasePluginData: makeSelectPlugin(BASE_PLUGIN),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getShoppingOrdersPaymentSummaryReports: (data) =>
      dispatch(getShoppingOrdersPaymentSummaryReports(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminComprehensiveReport);
