import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Input from "@saas/components/Input";
import { coal, graphite, night, pollution } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import Checkbox from "@material-ui/core/Checkbox";

import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import { useRouter } from "next/router";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Skeleton from "@material-ui/lab/Skeleton";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { ellipseText } from "@saas/utils/helpers/ellipseText";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@saas/components/Icon";
import { $ } from "@saas/icons";

let timeoutId = null;
const SELECT_PRODUCT = "select_product";
const SELECT_MODIFIERS = "select_modifiers";
const modalHeaders = {
  [SELECT_PRODUCT]: "Product selection",
  [SELECT_MODIFIERS]: "Additive selection",
};
export function SearchProductsModal({
  isOpen,
  onClose,
  isLoading,
  deals,
  getProducts,
  loading,
  selected_business,
  submit,
  orderItems,
  businessSlug,
}) {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(SELECT_PRODUCT);
  const [searchValue, setSearchValue] = useState(() => router?.query?.search ?? "");
  const [selectedProducts, selectProducts] = useState({});
  const [selectedModifiers, selectModifiers] = useState({});
  const isAnyModifierInSelectedProducts = Object.values(selectedProducts)?.some(
    (variation) => variation?.modifier_sets?.length
  );
  const theme = useTheme();
  useEffect(() => {
    const _query = { ...router?.query };
    delete _query?.id;
    delete _query?.site_domain;
    setTimeout(
      () =>
        getProducts({
          filters: {
            search: "",
            ..._query,
            business_slug: selected_business?.slug || businessSlug,
            page: 1,
            page_size: 200,
          },
        }),
      0
    );
  }, [router.query?.category, router.query?.search, selected_business, isOpen]);
  useEffect(() => {
    if (!isOpen) {
      selectProducts({});
      selectModifiers({});
      setSearchValue("");
      setTabValue(SELECT_PRODUCT);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: "" },
      });
    }
  }, [isOpen]);
  const onVariationClick = (deal, variation_id, deal_id) => {
    const selectedVariation = JSON.parse(
      JSON.stringify(
        deal.variations.find((variation) => variation.id === variation_id)
      )
    );
    const _selectedProducts = { ...selectedProducts };
    const isVariationSelected =
      `${deal_id}_${variation_id}` in _selectedProducts;
    if (isVariationSelected) {
      delete _selectedProducts[`${deal_id}_${variation_id}`];
    } else {
      _selectedProducts[`${deal_id}_${variation_id}`] = selectedVariation;
    }
    selectProducts(_selectedProducts);
  };
  const onModifierClick = (key, modifier, modifier_set_id) => {
    const _selectedModifiers = { [key]: {}, ...selectedModifiers };
    if (_selectedModifiers[key][modifier.id]) {
      delete _selectedModifiers[key][modifier.id];
    } else {
      _selectedModifiers[key][modifier.id] = {
        amount: 1,
        modifier_id: modifier.id,
        modifier_set_id,
        ...modifier,
      };
    }

    selectModifiers(_selectedModifiers);
  };
  const modalProductSearchExistance = {
    [SELECT_MODIFIERS]: (
      <div
        className="p-4 d-flex align-items-center cursor-pointer"
        style={{ fontSize: 14, color: pollution }}
        onClick={() => setTabValue(SELECT_PRODUCT)}
      >
        <ChevronRightRoundedIcon />
        Product selection
      </div>
    ),
    [SELECT_PRODUCT]: (
      <div className="p-4">
        <Input
          size="small"
          value={searchValue}
          onChange={(value) => {
            setSearchValue(value);
            clearTimeout(timeoutId);
            const query = { ...router.query };
            delete query.search;
            if (value) {
              query.search = value;
            }
            timeoutId = setTimeout(() => {
              router.push({
                pathname: router.pathname,
                query,
              });
            }, 500);
          }}
          placeholder="Search"
          inputProps={{
            className: "pr-5 mr-2",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                style={{ position: "absolute", right: 0 }}
                className={`u-cursor-pointer u-pointer-events-none`}
                position="start"
              >
                <SearchRoundedIcon
                  className="ml-1"
                  style={{ color: theme.palette.text.disabled }}
                  fontSize="small"
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
    ),
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ className: "w-100 m-2" }}
    >
      <DialogTitle>
        <div
          className="d-flex justify-content-between align-items-center p-4"
          style={{ borderBottom: "1px solid #EDEDED" }}
        >
          <div style={{ color: night, fontWeight: "bold", fontSize: 16 }}>
            {modalHeaders[tabValue]}
          </div>
          <div>
            <IconButton
              className="p-0"
              onClick={onClose}
              style={{ color: night }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
        {modalProductSearchExistance[tabValue]}
      </DialogTitle>
      <DialogContent className="p-0 w-100">
        <TabContext value={tabValue}>
          <TabPanel className="p-0" value={SELECT_PRODUCT}>
            <TableContainer>
              <Table>
                <TableBody>
                  {loading ? (
                    [0, 1, 2, 3, 4, 5].map((number) => (
                      <div
                        key={number}
                        className="d-flex align-items-center px-4 py-2"
                      >
                        <Skeleton
                          style={{
                            width: 36,
                            height: 36,
                            transform: "none",
                          }}
                          className="ml-2"
                        />
                        <Skeleton style={{ width: "100%" }} />
                      </div>
                    ))
                  ) : !deals?.length ? (
                    <div
                      className={
                        "u-fontMedium u-fontWeightBold w-100 d-flex justify-content-center align-items-center my-3"
                      }
                    >
                      The product was not found
                      <ErrorOutlineIcon className={"mr-1"} />
                    </div>
                  ) : (
                    deals?.map((deal = {}) => {
                      const isDealSelected =
                        `${deal.id}_${deal?.default_variation?.id}` in
                        selectedProducts;
                      const dealHasVariation = Boolean(
                        deal?.variants_data.length
                      );
                      const inventoryCount =
                        deal?.default_variation?.inventory_count;
                      let itemAmountForTheSameDealIds = 0;
                      orderItems?.forEach((orderItem) => {
                        if (
                          orderItem.product_id === deal?.id &&
                          orderItem.variation_id === deal?.default_variation?.id
                        ) {
                          itemAmountForTheSameDealIds += orderItem.amount;
                        }
                      });
                      const isProductAvailableForSelect = (() => {
                        if (!deal?.default_variation?.available) return false;
                        if (!deal?.default_variation?.is_active) return false;
                        if (inventoryCount - itemAmountForTheSameDealIds > 0)
                          return true;
                        return (
                          inventoryCount - itemAmountForTheSameDealIds <= 0 &&
                          deal?.default_variation.keep_selling
                        );
                      })();

                      return (
                        <>
                          <TableRow
                            hover
                            key={deal?.id}
                            aria-checked={deal?.id}
                            selected={isDealSelected}
                            style={{
                              borderTop: "1px solid #EDEDED",
                              cursor:
                                inventoryCount ===
                                  itemAmountForTheSameDealIds ||
                                dealHasVariation ||
                                !isProductAvailableForSelect
                                  ? "default"
                                  : "pointer",
                              backgroundColor:
                                (dealHasVariation ||
                                  !isProductAvailableForSelect) &&
                                "#F6F6F7",
                            }}
                          >
                            <TableCell
                              align="right"
                              width="50px"
                              className="p-4"
                              onClick={() => {
                                if (
                                  !dealHasVariation &&
                                  isProductAvailableForSelect
                                ) {
                                  onVariationClick(
                                    deal,
                                    deal?.default_variation?.id,
                                    deal?.id
                                  );
                                }
                              }}
                            >
                              <Checkbox
                                color="primary"
                                checked={isDealSelected}
                                disabled={
                                  dealHasVariation ||
                                  !isProductAvailableForSelect
                                }
                                style={{
                                  visibility: dealHasVariation && "hidden",
                                  marginRight: -10,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              align="right"
                              className="py-4 pl-4 pr-0"
                              onClick={() => {
                                if (
                                  !dealHasVariation &&
                                  isProductAvailableForSelect
                                ) {
                                  onVariationClick(
                                    deal,
                                    deal?.default_variation?.id,
                                    deal?.id
                                  );
                                }
                              }}
                            >
                              <div
                                className="d-flex align-items-center"
                                style={{ width: "max-content" }}
                              >
                                {!dealHasVariation && (
                                  <img
                                    alt=""
                                    width="48px"
                                    height="48px"
                                    style={{ borderRadius: 8 }}
                                    src={deal?.main_image_thumbnail_url}
                                  />
                                )}
                                <div
                                  className={!dealHasVariation && "mr-4"}
                                  title={deal?.title}
                                >
                                  {ellipseText(deal?.title, 30)}
                                </div>
                                {!dealHasVariation &&
                                !isProductAvailableForSelect ? (
                                  <div
                                    className="mr-5"
                                    style={{
                                      color: theme.palette.error.main,
                                    }}
                                  >
                                    (Irresistible)
                                  </div>
                                ) : null}
                              </div>
                            </TableCell>
                            {!dealHasVariation ? (
                              <TableCell
                                align="left"
                                className="py-4 pl-4 pr-0"
                                onClick={() => {
                                  if (
                                    !dealHasVariation &&
                                    isProductAvailableForSelect
                                  ) {
                                    onVariationClick(
                                      deal,
                                      deal?.default_variation?.id,
                                      deal?.id
                                    );
                                  }
                                }}
                              >
                                {priceFormatter(
                                  deal?.default_variation?.discounted_price
                                )}
                                <Icon
                                  icon={$}
                                  width={21}
                                  height={21}
                                  color={graphite}
                                  className="mr-1"
                                />
                              </TableCell>
                            ) : (
                              <TableCell
                                align="left"
                                className="py-4 pl-4 pr-0"
                              ></TableCell>
                            )}
                          </TableRow>
                          {dealHasVariation &&
                            deal?.variations.map((variation) => {
                              const isVariationSelected =
                                `${deal?.id}_${variation.id}` in
                                selectedProducts;
                              const inventoryCount = variation.inventory_count;
                              let itemAmountForTheSameDealIds = 0;
                              orderItems?.forEach((orderItem) => {
                                if (
                                  orderItem.product_id === deal?.id &&
                                  orderItem.variation_id === variation.id
                                ) {
                                  itemAmountForTheSameDealIds +=
                                    orderItem.amount;
                                }
                              });
                              const isVariationAvailableForSelect = (() => {
                                if (!variation.available) return false;
                                if (!variation.is_active) return false;
                                if (
                                  inventoryCount - itemAmountForTheSameDealIds >
                                  0
                                )
                                  return true;
                                return (
                                  inventoryCount -
                                    itemAmountForTheSameDealIds <=
                                    0 && variation.keep_selling
                                );
                              })();
                              return (
                                <TableRow
                                  hover
                                  key={variation.id}
                                  aria-checked={variation.id}
                                  selected={isVariationSelected}
                                  style={{
                                    borderTop: "1px solid #EDEDED",
                                    cursor: !isVariationAvailableForSelect
                                      ? "default"
                                      : "pointer",
                                  }}
                                >
                                  <TableCell
                                    align="right"
                                    width="50px"
                                    className="p-4"
                                    onClick={() => {
                                      if (isVariationAvailableForSelect) {
                                        onVariationClick(
                                          deal,
                                          variation.id,
                                          deal?.id
                                        );
                                      }
                                    }}
                                  >
                                    <Checkbox
                                      disabled={!isVariationAvailableForSelect}
                                      color="primary"
                                      checked={isVariationSelected}
                                      style={{ marginRight: -10 }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    className="py-4 pl-4 pr-0"
                                    onClick={() => {
                                      if (isVariationAvailableForSelect) {
                                        onVariationClick(
                                          deal,
                                          variation.id,
                                          deal?.id
                                        );
                                      }
                                    }}
                                  >
                                    <div
                                      className="d-flex align-items-center pr-5 mr-3"
                                      style={{ width: "max-content" }}
                                    >
                                      <img
                                        alt=""
                                        width="48px"
                                        height="48px"
                                        style={{ borderRadius: 8 }}
                                        src={
                                          variation.main_image_url ||
                                          variation.main_image_thumbnail_url
                                        }
                                      />
                                      <div
                                        className="mr-4"
                                        title={variation.title}
                                      >
                                        {ellipseText(variation.title, 30)}
                                      </div>
                                      {!isVariationAvailableForSelect ? (
                                        <div
                                          className="mr-5"
                                          style={{
                                            color: theme.palette.error.main,
                                          }}
                                        >
                                          (Irresistible)
                                        </div>
                                      ) : null}
                                    </div>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="py-4 pl-4 pr-0"
                                    onClick={() => {
                                      if (isVariationAvailableForSelect) {
                                        onVariationClick(
                                          deal,
                                          variation.id,
                                          deal?.id
                                        );
                                      }
                                    }}
                                  >
                                    {priceFormatter(variation.discounted_price)}{" "}
                                    <Icon
                                      icon={$}
                                      width={21}
                                      height={21}
                                      color={graphite}
                                      className="mr-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel className="p-0" value={SELECT_MODIFIERS}>
            {Object.entries(selectedProducts).map(([key, value]) => {
              const variation_id = key.split("_")[1];
              const deal_id = key.split("_")[0];
              const product_key = key;
              let product = JSON.parse(
                JSON.stringify(deals?.find((deal) => deal.id === +deal_id))
              );
              const dealHasVariation = Boolean(product?.variants_data?.length);
              let productImage = product?.main_image_thumbnail_url;
              let productTitle = product?.title;
              const variation = dealHasVariation
                ? product?.variations.find(
                    (variation) => variation.id === +variation_id
                  )
                : product?.variations?.[0];
              let modifiers = variation?.modifier_sets;
              if (dealHasVariation) {
                product = value;
                productImage = value.image_url || productImage;
                productTitle = value.title;
              }
              return (
                <div
                  key={key}
                  className="p-4"
                  style={{
                    borderTop: "1px solid #EDEDED",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        width="48px"
                        height="48px"
                        style={{ borderRadius: 8 }}
                        src={productImage}
                        alt=""
                      />
                    </div>
                    <div className="mr-4">{productTitle}</div>
                  </div>
                  <div>
                    {modifiers?.map((modifier_set) => (
                      <div className="my-3 pt-4" key={modifier_set.id}>
                        <div
                          style={{ color: coal, fontSize: 14, fontWeight: 500 }}
                        >
                          {modifier_set.title}{" "}
                        </div>
                        {Object.entries(modifier_set.modifiers).map(
                          ([, modifier]) => {
                            return (
                              <div
                                key={modifier.id}
                                className="d-flex justify-content-between align-items-center"
                                onClick={() =>
                                  onModifierClick(
                                    product_key,
                                    modifier,
                                    modifier_set.id
                                  )
                                }
                              >
                                <div>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      selectedModifiers?.[product_key] &&
                                      modifier.id in
                                        selectedModifiers?.[product_key]
                                    }
                                    style={{ marginRight: -10 }}
                                  />
                                  {modifier.title}
                                </div>
                                <div>{priceFormatter(modifier.price)}</div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabPanel>
        </TabContext>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <div>
          {englishNumberToPersianNumber(Object.keys(selectedProducts).length)}{" "}
          Product selected
        </div>
        <div>
          <Button
            onClick={() => {
              if (
                tabValue === SELECT_PRODUCT &&
                isAnyModifierInSelectedProducts
              ) {
                setTabValue(SELECT_MODIFIERS);
              } else {
                submit(selectedProducts, selectedModifiers);
              }
            }}
            variant="contained"
            color="primary"
            className="u-box-shadow-none u-fontMedium"
            size="medium"
            disabled={isLoading || !Object.keys(selectedProducts).length}
          >
            Confirm
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            className="u-box-shadow-none u-fontMedium mr-3"
            size="medium"
          >
            Cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default memo(SearchProductsModal);
