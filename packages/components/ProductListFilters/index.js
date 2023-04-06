import React, { useEffect, useRef, useState } from "react";
import Input from "../Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MaterialSelect from "../Select/MaterialSelect";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Link from "next/link";

const sortOptions = [
  { id: 2, text: "جدید‌ترین", keyword: "-_created_at" },
  { id: 3, text: "جدید‌ترین ویرایش", keyword: "-_updated_at" },
  { id: 4, text: "حروف الفبا", keyword: "title" },
  { id: 5, text: "فعال بودن", keyword: "-available" },
  { id: 6, text: "اولویت", keyword: "-priority" },
];

export default function ProductListFilters({
  categories,
  editAllProductsLink,
  toggleAll,
  isSuper = false,
  setPage,
}) {
  const router = useRouter();
  const theme = useTheme();
  const inputRef = useRef(null);
  const timeout = useRef(null);
  const [search, setSearch] = useState(router.query.search);
  const { maxWidth768 } = useResponsive();
  useEffect(() => {
    if (isSuper) {
      const indexOfAvailablityOption = sortOptions.indexOf(
        (option) => option.keyword === "-available"
      );
      if (indexOfAvailablityOption > -1) {
        sortOptions.splice(indexOfAvailablityOption, 1);
      }
    }
  }, [isSuper]);
  useEffect(() => {
    setSearch(router.query.search || "");
  }, [router.query.search]);
  return (
    <>
      <div className="d-flex pt-2 justify-content-between flex-wrap align-items-center px-4">
        <div className={`mt-2 d-flex ${maxWidth768 ? "flex-1" : ""}`}>
          <div className="w-100">
            <Input
              size="small"
              inputRef={inputRef}
              value={search}
              fullWidth={false}
              onChange={(search) => {
                setSearch(search);
                clearTimeout(timeout.current);
                const query = { ...router.query };
                delete query.search;
                delete query.page;
                setPage && setPage(1);
                if (search) {
                  query.search = search;
                }
                timeout.current = setTimeout(() => {
                  router.push({
                    pathname: router.pathname,
                    query,
                  });
                }, 500);
              }}
              className="ml-2"
              placeholder="جستجوی محصول"
              inputProps={{
                className: "pr-5 mr-2",
              }}
              InputProps={{
                startAdornment: (
                  <>
                    {router.query.search ? (
                      <InputAdornment
                        style={{ position: "absolute", left: 3 }}
                        className="u-cursor-pointer"
                        position="start"
                        onClick={() => {
                          setSearch("");
                          const query = { ...router.query };
                          delete query.search;
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }}
                      >
                        <ClearRoundedIcon
                          style={{ color: theme.palette.text.disabled }}
                        />
                      </InputAdornment>
                    ) : null}
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
                  </>
                ),
              }}
            />
          </div>

          <MaterialSelect
            FormControlProps={{
              style: {
                width: 80,
                flexShrink: 0,
              },
            }}
            className="small ml-2 pr-0 direction-ltr"
            inputProps={{
              className: "text-center ml-minus-2",
            }}
            IconComponent={() => null}
            options={sortOptions}
            themeColor={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
            menuHeader={
              <div
                style={{ width: 200 }}
                className="px-3 u-fontWeightBold u-fontNormal my-1"
              >
                مرتب‌سازی بر اساس
              </div>
            }
            selectOption={(text) => {
              const keyword = sortOptions.find((i) => i.text === text).keyword;
              router.push({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: 1,
                  ordering: keyword,
                },
              });
            }}
            inputData={{
              defaultValue: "مرتب‌سازی",
            }}
            selected={sortOptions.find((i) => {
              return (
                i.keyword ===
                (router.query.ordering
                  ? router.query.ordering
                  : sortOptions[0].keyword)
              );
            })}
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
          {categories ? (
            <MaterialSelect
              FormControlProps={{
                style: {
                  width: 80,
                  flexShrink: 0,
                },
              }}
              className="small ml-2 pr-0 direction-ltr"
              inputProps={{ className: " ml-minus-2 text-center" }}
              IconComponent={() => null}
              options={categories.map((cat) => ({
                ...cat,
                text: cat.title,
              }))}
              themeColor={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
              menuHeader={
                <div style={{ height: 30 }}>
                  <Button
                    variant="text"
                    color="primary"
                    className="u-top-0 u-text-underline position-absolute left-0 justify-content-end px-5 u-fontWeightBold u-fontNormal text-center w-100"
                    onClick={() => {
                      const query = { ...router.query };
                      delete query.category;
                      delete query.page;
                      router.push({
                        pathname: router.pathname,
                        query,
                      });
                    }}
                  >
                    پاک کردن
                  </Button>
                </div>
              }
              selectOption={(o) => {
                const option = categories.find((cat) => o === cat.title);
                if (option && option.id) {
                  router.push({
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      category: option.id,
                    },
                  });
                }
              }}
              inputData={{
                defaultValue: "برچسب",
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                style: {
                  maxHeight: 270,
                },
                elevation: 3,
                getContentAnchorEl: null,
              }}
            />
          ) : null}
        </div>
        {editAllProductsLink ? (
          <Link passHref href={editAllProductsLink}>
            <Button className="mt-2" color="primary" variant="outlined">
              ویرایش جمعی محصولات
            </Button>
          </Link>
        ) : null}
        {toggleAll ? (
          <div className="d-flex align-items-center">
            <Button
              variant="text"
              className="mt-2"
              color="primary"
              onClick={() => toggleAll(true)}
            >
              فعال کردن همه
            </Button>
            <Button
              variant="text"
              className="mt-2"
              color="primary"
              onClick={() => toggleAll(false)}
            >
              غیرفعال کردن همه
            </Button>
          </div>
        ) : null}
      </div>
      <div className="px-4 pt-2 d-flex flex-wrap">
        {Object.entries(router.query).map(([key, value]) => {
          if (["search", "ordering", "category"].includes(key))
            return (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                }}
                className="ml-2 mb-2"
                onDelete={() => {
                  const query = { ...router.query };
                  delete query[key];
                  delete query.page;
                  router.push({ pathname: router.pathname, query });
                }}
                label={
                  key === "search"
                    ? `جستجوی ${value} در نام محصول`
                    : key === "category"
                    ? `برچسب ${
                        categories.find(
                          (cat) => parseInt(cat.id) === parseInt(value)
                        ).title
                      }`
                    : key === "ordering"
                    ? `مرتب‌سازی بر اساس ${
                        sortOptions.find((option) => option.keyword === value)
                          ?.text
                      }`
                    : key === "available"
                    ? `وضعیت ${
                        value === "1"
                          ? "موجود"
                          : value === "0"
                          ? "ناموجود"
                          : "همه"
                      }`
                    : ``
                }
              />
            );
        })}
      </div>
    </>
  );
}
