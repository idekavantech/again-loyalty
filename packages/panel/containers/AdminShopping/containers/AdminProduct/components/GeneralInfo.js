import React from "react";
import Input from "@saas/components/Input";
import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";
import PriceSection from "./PriceSection";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Link from "next/link";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
export default function GeneralInfo({
  product = {},
  error,
  onProductTitleChange,
  onProductPackagingPriceChange,
  onProductFinalUnitCostChange,
  onProductInitialPriceChange,
  onProductDiscountedPriceChange,
  productHasVariations,
}) {
  const { title } = product;
  const { minWidth768 } = useResponsive();

  return (
    <div id="product-general-section">
      <div
        style={{
          padding: `20px ${minWidth768 ? "50px" : "20px"}`,
          fontWeight: 600,
          borderBottom: "1px solid #EEEEEE",
        }}
        className="u-fontVeryLarge"
      >
        Product Information
      </div>
      <AdminProductInBoxWrapper
        style={{
          borderBottom: "1px solid #EEEEEE",
        }}
      >
        <div className="col-12">
          <Input
            labelPlacement="top"
            placeholder="Your product name or product"
            label="Product title"
            value={title}
            onChange={onProductTitleChange}
            assistive={error}
            error={Boolean(error)}
            InputProps={{ className: "u-height-48 u-border-radius-8" }}
            labelClassName={"u-fontMedium"}
            required
          />
        </div>
        {productHasVariations ? (
          <div
            className="col-12 d-flex align-items-center pb-2 pt-5"
            style={{ marginRight: minWidth768 ? 40 : 0 }}
          >
            <InfoOutlinedIcon
              fontSize="small"
              style={{ color: "#FB996A" }}
              className="ml-2"
            />
            <p className="u-fontSemiLarge mt-1">
              {"Defined for this varied product. Price at"}
              <span style={{ color: "#0050FF", textDecoration: "underline" }}>
                <Link href="#product-variation-section">Different parts</Link>
              </span>
              {" look. "}
            </p>
          </div>
        ) : null}
        <PriceSection
          productHasVariations={productHasVariations}
          product={product}
          onProductInitialPriceChange={onProductInitialPriceChange}
          onProductDiscountedPriceChange={onProductDiscountedPriceChange}
          onProductFinalUnitCostChange={onProductFinalUnitCostChange}
          onProductPackagingPriceChange={onProductPackagingPriceChange}
        />
      </AdminProductInBoxWrapper>
    </div>
  );
}
