/**
 *
 * CategoriesHandler
 *
 */

import React, { memo, useRef } from "react";
import Chip from "@material-ui/core/Chip";
import Flickity from "../Flickity";
import { slugify } from "@saas/utils/helpers/slugify";
import { useRouter } from "next/router";
import Link from "next/link";
function CategoriesList(props) {
  const { categories, selectedId, categoryItemLink } = props;
  const Router = useRouter();
  const flkty = useRef(null);
  const flickityOptions = {
    rightToLeft: true,
    prevNextButtons: false,
    pageDots: false,
    cellAlign: "right",
    freeScroll: true,
    contain: true,
  };
  const dragging = useRef(false);
  return (
    <div className="c-category-component">
      <div className="d-flex align-items-center py-4">
        <Flickity
          className="carousel container-fluid"
          elementType="div"
          options={flickityOptions}
          disableImagesLoaded={false}
          dragging={dragging}
          flickityRef={flkty}
        >
          {categories
            ?.filter((category) => Boolean(category))
            ?.map((category, index) => (
              <Link key={category.title} href={categoryItemLink(category)}>
                <Chip
                  label={category.title}
                  onClick={(e) => {
                    if (dragging.current) e.preventDefault();
                  }}
                  variant="outlined"
                  color={
                    category.id === selectedId ||
                    (Router &&
                      Router.asPath.includes(
                        `/l/${category.id}-${slugify(category.title)}`
                      )) ||
                    (!selectedId && index === 0)
                      ? "secondary"
                      : "action.active"
                  }
                  className="m-1"
                />
              </Link>
            ))}
        </Flickity>
      </div>
    </div>
  );
}

export default memo(CategoriesList);
