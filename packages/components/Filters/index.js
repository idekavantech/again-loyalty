import React, { useEffect, useRef, useState } from "react";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MaterialSelect from "../Select/MaterialSelect";
import Switch from "../Switch";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";

import { dust } from "@saas/utils/colors";
import { useRouter } from "next/router";

const maxPrice = 30000000;
const minPrice = 0;
const sortOptions = [
  { id: 0, text: "محبوب‌ترین", keyword: null },
  { id: 1, text: "جدید‌ترین", keyword: "_updated_at" },
  { id: 2, text: "ارزان‌ترین", keyword: "default_variation__discounted_price" },
  { id: 3, text: "گران‌ترین", keyword: "-default_variation__discounted_price" },
];
export default function Filters({ themeColor, submitOnChange, callback }) {
  const loaded = useRef(false);
  const router = useRouter();
  const params = router.query;

  const [filters, setFilters] = useState({
    ordering: params.ordering || sortOptions[0].keyword,
    available: params.available || null,
    is_discounted: params.is_discounted || null,
    min_price: params.min_price || null,
    max_price: params.max_price || null,
  });
  const [priceRange, setPriceRange] = useState([
    params.min_price || minPrice,
    params.max_price || maxPrice,
  ]);
  useEffect(() => {
    if (loaded.current) {
      if (submitOnChange) pushParamsToUrl(filters);
    } else loaded.current = true;
  }, [
    filters.ordering,
    filters.available,
    filters.is_discounted,
    filters.min_price,
    filters.max_price,
  ]);
  useEffect(() => {
    setFilters({
      ordering: params.ordering || sortOptions[0].keyword,
      available: params.available || null,
      is_discounted: params.is_discounted || null,
      min_price: params.min_price || null,
      max_price: params.max_price || null,
    });
    setPriceRange([params.min_price || minPrice, params.max_price || maxPrice]);
  }, [router.asPath]);
  return (
    <>
      <div className="p-3 filters-container">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .MuiSlider-root{
            color:  ${themeColor}; 
          }
        `,
          }}
        />
        <Paper elevation={2} className="p-3 u-border-radius-8">
          <div className="u-text-black u-fontWeightBold text-right mb-2">
            مرتب‌سازی بر اساس
          </div>
          <MaterialSelect
            options={sortOptions}
            themeColor={themeColor}
            selectOption={(text) =>
              setFilters({
                ...filters,
                ordering: sortOptions.find((i) => i.text === text).keyword,
              })
            }
            inputData={{
              value: sortOptions.find((i) => i.keyword === filters.ordering)
                .text,
            }}
          />
        </Paper>
        <Paper elevation={2} className="mt-3 p-3 u-border-radius-8">
          <div className="d-flex">
            <Switch
              themeColor={themeColor}
              onColor={themeColor}
              isSwitchOn={filters.available}
              toggleSwitch={() => {
                setFilters({
                  ...filters,
                  available: !filters.available || null,
                });
              }}
            />
            <div>فقط محصولات موجود</div>
          </div>
          <div className="d-flex mt-2">
            <Switch
              themeColor={themeColor}
              onColor={themeColor}
              isSwitchOn={filters.is_discounted}
              toggleSwitch={() => {
                setFilters({
                  ...filters,
                  is_discounted: !filters.is_discounted || null,
                });
              }}
            />
            <div>فقط محصولات تخفیف‌دار</div>
          </div>
        </Paper>
        <Paper elevation={2} className="mt-3 p-3 u-border-radius-8">
          <div className="d-flex justify-content-between">
            <div>{priceFormatter(priceRange[0])} تومان</div>
            <div>{priceFormatter(priceRange[1])} تومان به بالا</div>
          </div>
          <Slider
            step={1000}
            min={minPrice}
            color={themeColor}
            max={maxPrice}
            onChangeCommitted={(event, price) => {
              const newFilters = {
                ...filters,
                min_price: null,
                max_price: null,
              };
              if (maxPrice - price[0] !== maxPrice)
                newFilters.max_price = maxPrice - price[0];
              if (maxPrice - price[1] !== minPrice)
                newFilters.min_price = maxPrice - price[1];

              setFilters(newFilters);
            }}
            value={[maxPrice - priceRange[1], maxPrice - priceRange[0]]}
            onChange={(event, price) =>
              setPriceRange([maxPrice - price[1], maxPrice - price[0]])
            }
          />
        </Paper>
      </div>
      {!submitOnChange && (
        <div
          style={{ borderTop: `solid 0.5px ${dust}` }}
          className="position-fixed w-100 bottom-0 p-3 align-items-center  d-flex z-index-2"
        >
          <Button
            className="w-100"
            id="SubmitPhoneNumber"
            onClick={() => {
              pushParamsToUrl(filters);
              if (callback) callback();
            }}
            color="secondary"
            variant="contained"
          >
            اعمال
          </Button>
        </div>
      )}
    </>
  );
}
