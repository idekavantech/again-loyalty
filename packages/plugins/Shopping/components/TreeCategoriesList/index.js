/**
 *
 * CategoriesHandler
 *
 */

import React, { memo, useRef } from "react";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import Chip from "@material-ui/core/Chip";
import Link from "next/link";
import Flickity from "../../../../components/Flickity";
import { findKey } from "@saas/utils/helpers/findKey";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { APP_SHOPPINGPAGE_FILTER_MODAL } from "@saas/stores/plugins/constants";
import { useRouter } from "next/router";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
const flickityOptions = {
  rightToLeft: true,
  prevNextButtons: false,
  pageDots: false,
  cellAlign: "right",
  freeScroll: true,
  contain: true,
};
function TreeCategoriesList({ hierarchy, categoryItemLink }) {
  const router = useRouter();
  const isMainPage =
    !router.asPath.includes("/c/") || !router.asPath.split("/c/")[1];
  let categoryId = router.asPath.includes("/c/")
    ? router.asPath.split("/c/")[1]
    : "";

  categoryId = categoryId.split("-")[0] || categoryId;
  const flkty = useRef(null);
  const category = findKey(hierarchy, categoryId) || hierarchy;
  const categories = findKey(hierarchy, category.parent || 0).children;
  const dragging = useRef(false);
  const { maxWidth768 } = useResponsive();

  return (
    <div className="position-relative">
      <div className="d-flex align-items-center">
        {maxWidth768 ? (
          <FilterListRoundedIcon
            className="u-cursor-pointer  mx-1"
            onClick={() => pushParamsToUrl(APP_SHOPPINGPAGE_FILTER_MODAL)}
          />
        ) : null}
        <Flickity
          className="carousel my-2 flex-1"
          elementType="div"
          options={flickityOptions}
          disableImagesLoaded={false}
          dragging={dragging}
          flickityRef={flkty}
          reloadOnUpdate
        >
          {isMainPage ? (
            <Link href={categoryItemLink() || "/"}>
              <Chip
                label="All"
                key="c-all"
                className="mx-1"
                onClick={(e) => {
                  if (dragging.current) e.preventDefault();
                }}
                variant="outlined"
                color="secondary"
              />
            </Link>
          ) : null}
          {categories.map((c) => (
            <Link key={`c-${c.id}`} href={categoryItemLink(c) || "/"}>
              <Chip
                label={c.name}
                className="mx-1"
                onClick={(e) => {
                  if (dragging.current) e.preventDefault();
                }}
                variant="outlined"
                color={c.id === category.id ? "secondary" : "action.active"}
              />
            </Link>
          ))}
        </Flickity>
      </div>
    </div>
  );
}

export default memo(TreeCategoriesList);
