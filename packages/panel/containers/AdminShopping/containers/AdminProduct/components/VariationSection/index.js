import React, { useState } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Input from "@saas/components/Input";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Button from "@material-ui/core/Button";
import ProductInventoryHistory from "containers/AdminShopping/containers/AdminProduct/components/VariationSection/ProductInventoryHistory";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import LazyImage from "@saas/components/LazyImage";
import { useRouter } from "next/router";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { hashStringToInt } from "utils/helpers";
import AdminProductInBoxWrapper from "../AdminProductInBoxWrapper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const useStyle = makeStyles(() => ({
  tooltip: {
    backgroundColor: "#0050FF",
    color: "#fff",
    maxWidth: 220,
    lineHeight: "20px",
    fontSize: 11,
    borderRadius: 8,
    margin: "5px 0px",
    padding: 8,
  },
  arrow: {
    color: "#0050FF",
  },
}));
export default function VariationSection({
  product,
  AdminUrlPrefix,
  pluginUrl,
  isSuper,
  addVariantObjectToVariantsData,
  deleteVariant,
  onVariantKeyChange,
  onVariantValuesChange,
  variationsTable,
  productHasVariations,
  variationsValuesError,
  variationNameError,
}) {
  const [historyModal, setHistoryModal] = useState(false);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const productId = router.query.id === "new" ? null : router.query.id;
  const classes = useStyle();
  const { minWidth768 } = useResponsive();

  let showTable = false;
  if (productId && productHasVariations) showTable = true;
  else if (
    !productId &&
    variationsTable &&
    Object.keys(variationsTable)?.length > 0
  )
    showTable = true;

  if (!product) {
    return null;
  }

  return (
    <AdminProductInBoxWrapper smallPadding id="product-variation-section">
      <div className={"col-12 text-center product-variation-section"}>
        <ProductInventoryHistory
          product={product}
          isOpen={historyModal}
          onClose={() => setHistoryModal(false)}
          isSuper={isSuper}
        />
        <div className="d-flex justify-content-between flex-1 text-right">
          <div className="d-flex justify-content-between w-100 flex-wrap">
            <div>
              <div className="u-fontLarge u-fontWeightBold">
                <span>Diversity</span>
                <ClickAwayListener onClickAway={() => setIsOpenTooltip(false)}>
                  <Tooltip
                    placement="top"
                    PopperProps={{
                      disablePortal: true,
                    }}
                    arrow
                    classes={classes}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    onClose={() => setIsOpenTooltip(false)}
                    open={isOpenTooltip}
                    title={
                      <React.Fragment>
                        If your product has different features and
                        Wishing customers to be able to diverse different product of your product
                        Such as color, size and.. To choose. Use this section
                        do.
                      </React.Fragment>
                    }
                  >
                    <Button
                      style={{ minWidth: 30 }}
                      onClick={() => setIsOpenTooltip(!isOpenTooltip)}
                    >
                      <HelpOutlineRoundedIcon
                        style={{ width: 20, height: 20, color: "#8C9196" }}
                      />
                    </Button>
                  </Tooltip>
                </ClickAwayListener>
              </div>
              <div className="mt-2">
                If necessary, different products of your product such as color, size, so on
                Define in this section.
              </div>
            </div>
            {!product.variants_data ||
              (product?.variants_data?.length === 0 && (
                <div
                  onClick={addVariantObjectToVariantsData}
                  className={`mt-1 ${
                    !minWidth768
                      ? "w-100 d-flex justify-content-center align-items-center"
                      : ""
                  }`}
                >
                  <IconButton>
                    <AddCircleOutlineIcon
                      color="primary"
                      style={{ cursor: "pointer" }}
                    />
                  </IconButton>
                  <span
                    className="u-cursor-pointer u-fontLarge u-fontWeightMedium"
                    style={{ color: theme.palette.primary.main }}
                  >
                    Added new variety
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="pb-4">
          {!!product.variants_data && product?.variants_data?.length !== 0 ? (
            <div
              className="d-flex mt-2 pr-2 align-items-center u-fontSemiLarge"
              style={{ color: "#0044D9" }}
            >
              <InfoOutlinedIcon />
              <span className="text-right mt-md-1 mr-1">
                Price and inventory of each different after the product saved from the editing section
                Set the products.
              </span>
            </div>
          ) : null}
          {product.variants_data?.map((variant, index) => (
            <div
              className="mt-4 d-flex align-items-start text-right"
              key={variant.id}
            >
              <div style={{ flex: 3 }} className="mx-1 mt-1 ">
                <Input
                  placeholder="Various name"
                  className="mt-2 pr-1 mt-lg-0"
                  value={variant.name || ""}
                  onChange={onVariantKeyChange(index)}
                  error={Boolean(variationNameError)}
                  assistive={variationNameError}
                  InputProps={{ className: "u-height-48 u-border-radius-8" }}
                  labelClassName={"u-fontMedium"}
                />
              </div>

              <div style={{ flex: 5 }} className="mx-1 mt-1">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Autocomplete
                    onChange={onVariantValuesChange(index)}
                    label="Various cases"
                    multiple
                    freeSolo
                    open={false}
                    // disabled={!variant.name}
                    fullWidth
                    className="mt-2 mt-lg-0 "
                    defaultValue={variant.values.map((item) => item.value)}
                    ChipProps={{
                      variant: "outlined",
                      size: "small",
                      style: { margin: "2px 3px" },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="dense"
                        className={`mt-0 ${params.className}`}
                        InputProps={{
                          ...params.InputProps,
                          className: `pr-2 pl-5 ${params.InputProps.className}`,
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="Various cases"
                        error={Boolean(variationsValuesError)}
                      />
                    )}
                  />
                  {variationsValuesError?.length ? (
                    <div
                      style={{
                        color: theme.palette.error.main,
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: 1.66,
                      }}
                    >
                      {variationsValuesError}
                    </div>
                  ) : null}
                  <div style={{ color: theme.palette.text.disabled }}>
                    To add the next varietyenter hit.
                  </div>
                </form>
              </div>
              <IconButton onClick={deleteVariant(index)}>
                <DeleteRoundedIcon
                  color="primary"
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
              {product.variants_data?.length - 1 === index ? (
                <IconButton onClick={addVariantObjectToVariantsData}>
                  <AddCircleOutlineIcon
                    color="primary"
                    style={{ cursor: "pointer" }}
                  />
                </IconButton>
              ) : null}
            </div>
          ))}
          <>
            {showTable && (
              <TableContainer className="mt-5 position-relative">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right" className="text-nowrap" />

                      <TableCell align="right" className="text-nowrap">
                        Various name
                      </TableCell>
                      <TableCell align="right" className="text-nowrap">
                        Unit price($)
                      </TableCell>
                      <TableCell align="right" className="text-nowrap">
                        The final price
                      </TableCell>
                      {!isSuper ? (
                        <TableCell align="right" className="text-nowrap">
                          Inventory
                        </TableCell>
                      ) : null}
                      <TableCell
                        align="right"
                        className="text-nowrap position-sticky left-0"
                        style={{ backgroundColor: "#fff" }}
                      />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.values(variationsTable)
                      .sort(
                        (a, b) =>
                          hashStringToInt(a.title) - hashStringToInt(b.title)
                      )
                      .map((item) => {
                        let image = product?.main_image_url;
                        if (item.has_image)
                          image = item.main_image_thumbnail_url;
                        return (
                          <TableRow key={item}>
                            <TableCell
                              align="right"
                              component="th"
                              scope="row"
                              style={{ minWidth: "10%" }}
                            >
                              <div className="mt-2 mt-lg-0">
                                {image ? (
                                  <LazyImage
                                    src={image}
                                    width={40}
                                    height={40}
                                  />
                                ) : (
                                  <LazyImage
                                    src={"/images/default_deal.jpg"}
                                    width={40}
                                    height={40}
                                  />
                                )}
                              </div>
                            </TableCell>
                            <TableCell
                              align="right"
                              component="th"
                              scope="row"
                              style={{ minWidth: "20%" }}
                            >
                              <div className="mt-2 mt-lg-0">{item.title}</div>
                            </TableCell>
                            <TableCell align="right" className="text-nowrap">
                              <div className="mt-2 mt-lg-0">
                                {item.initial_price}
                              </div>
                            </TableCell>
                            <TableCell align="right" className="text-nowrap">
                              <div className="mt-2 mt-lg-0">
                                {item.discounted_price}
                              </div>
                            </TableCell>
                            {!isSuper ? (
                              <TableCell align="right" className="text-nowrap">
                                <div className="mt-2 mt-lg-0">
                                  {item.inventory_count}
                                </div>
                              </TableCell>
                            ) : null}

                            <TableCell
                              align="right"
                              className="text-nowrap position-sticky left-0"
                              style={{ backgroundColor: "#fff" }}
                            >
                              <Link
                                href={`${AdminUrlPrefix}${pluginUrl}/settings/products/${product.id}/variations/${item.id}`}
                                passHref
                              >
                                <Button
                                  color="primary"
                                  disabled={item.new}
                                  style={{ direction: "ltr" }}
                                  endIcon={
                                    <div
                                      className="d-flex align-items-center justify-content-center u-border-radius-50-percent"
                                      style={{
                                        border: `2px solid ${
                                          item.new
                                            ? "#eeeeee"
                                            : process.env
                                                .NEXT_PUBLIC_ADMIN_THEME_COLOR
                                        }`,
                                        width: 24,
                                        height: 24,
                                      }}
                                    >
                                      <EditRoundedIcon
                                        style={{ fontSize: 14 }}
                                      />
                                    </div>
                                  }
                                >
                                  Edit
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {minWidth768 &&
            !isSuper &&
            productHasVariations &&
            Object.values(variationsTable)?.filter((item) => !item.new)
              ?.length > 0 ? (
              <Button
                onClick={() =>
                  router.push(
                    `${AdminUrlPrefix}${pluginUrl}/settings/bulk/products_inventory?ids=${product.id}`
                  )
                }
                variant="outlined"
                color="primary"
              >
                Inventory adjustment
              </Button>
            ) : null}
          </>
        </div>
      </div>
    </AdminProductInBoxWrapper>
  );
}
