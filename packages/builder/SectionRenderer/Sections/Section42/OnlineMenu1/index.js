import React, { memo, useEffect, useMemo, useRef, useState } from "react";

import AdminSection from "@saas/components/AdminSection";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import MenuProductCard from "./components/MenuProductCard";
import Skeleton from "@material-ui/lab/Skeleton";
import useTheme from "@material-ui/core/styles/useTheme";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddedProductRow from "@saas/plugins/Shopping/containers/modals/ProductModal/AddedProductRow";
import { makeSelectCategoriesDeals } from "@saas/plugins/Shopping/selectors";
import {
  makeSelectOrdersBySiteDomain,
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { Swiper, SwiperSlide } from "swiper/react";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";

import { getCategoryDeals } from "@saas/plugins/Shopping/actions";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectBusinessWorkingHours } from "@saas/stores/business/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { TABLE_NUMBER_SESSION_STORAGE } from "@saas/plugins/Shopping/constants";
import { isCurrentTimeAvailable } from "@saas/utils/helpers/isCurrentTimeAvailable";
import { border } from "@saas/utils/colors";

function OnlineMenu1({
  isDragging,
  dragHandleProps,
  isActive,
  _updateSection,
  isEditMode,
  onClick,
  business,
  categoriesDeals,
  orders,
  urlPrefix,
  _getCategoriesDeals,
  customization,
  isMobile,
  content,
  loading,
  shoppingPluginData,
  workingHours,
}) {
  const {
    colors: {
      header_background_color,
      body_background_color,
      card_background_color,
      card_texts_color,
      body_categories_color,
      slider_categories_text_color,
      slider_categories_background_color,
      use_theme_color,
      card_theme_color,
    },
  } = customization;
  const {
    categories: { items = [] },
  } = content;

  const _categories = categoriesDeals?.filter(
    (category) => !(category?.products && !category?.products?.length)
  ); // TODO: read from items (builder) conditionally
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [heightStickyHeader, setHeightStickyHeader] = useState(0);

  const router = useRouter();
  const routerQueryTableNumber = router?.query?.table_number;
  useEffect(() => {
    if (routerQueryTableNumber) {
      sessionStorage.setItem(
        TABLE_NUMBER_SESSION_STORAGE,
        routerQueryTableNumber
      );
    }
  }, [routerQueryTableNumber]);
  const { minWidth768 } = useResponsive();

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
  const _categoriesDeals = useMemo(() => {
    return categoriesDeals?.filter(
      (category) =>
        category.products.length &&
        (isEditMode ||
          !category.extra_data ||
          !category.extra_data.shifts ||
          isCurrentTimeAvailable(category.extra_data.shifts))
    );
  }, [categoriesDeals, isEditMode]);
  const categories = useMemo(
    () =>
      _categoriesDeals.map((category) => ({
        title: category.title,
        id: category.id,
      })),
    [_categoriesDeals]
  );
  useEffect(() => {
    setAnchorEl(
      isDesktop ? document.getElementById("shopping-cart") : document.body
    );
  }, [isDesktop]);
  const orderCount = orders?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0
  );
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const [orderItemsGroupByProductId, setOrderItemsGroupByProductId] = useState(
    {}
  );
  const isDisabled =
    shoppingPluginData?.data?.is_open === false ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);

  const timeout = useRef(null);
  const prevOrders = useRef(orderCount);
  useEffect(() => {
    if (orderCount > prevOrders.current) {
      setOpen(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
    prevOrders.current = orderCount;
  }, [orderCount]);
  useEffect(() => {
    const stickyHeaderElement = document.getElementById("stickyHeader");
    if (stickyHeaderElement) {
      const { height } = stickyHeaderElement.getBoundingClientRect();
      setHeightStickyHeader(parseInt(height));
    }
    setTimeout(() => {
      _getCategoriesDeals();
    }, 0);
  }, []);

  useEffect(() => {
    const _orderItemsGroupByProductId = {};
    orders?.forEach((order) => {
      if (!_orderItemsGroupByProductId[order.product.id]) {
        _orderItemsGroupByProductId[order.product.id] = [];
      }
      _orderItemsGroupByProductId[order.product.id].push(order);
    });
    setOrderItemsGroupByProductId(_orderItemsGroupByProductId);
  }, [JSON.stringify(orders), categoriesDeals]);

  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryElement = document.getElementById(
        `category-${selectedCategory}`
      );
      let { top } = selectedCategoryElement.getBoundingClientRect();
      top += window.scrollY;
      top -= heightStickyHeader + selectedCategoryElement.offsetHeight;
      window.scroll({
        top,
        behavior: "smooth",
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    let timer = null;
    const handleScroll = () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        let indexOfCategoryItem = 0;
        categories.forEach((category, index) => {
          const categoryElement = document.getElementById(
            `category-${category.id}`
          );

          const sectionTop = categoryElement.offsetTop;
          const offset = isDesktop ? 170 : 130;
          if (window.scrollY >= sectionTop - offset) {
            indexOfCategoryItem = index;
          }
        });
        controlledSwiper.slideTo(indexOfCategoryItem, 500);
      }, 150);
    };
    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, [categories, controlledSwiper]);

  return (
    <AdminSection
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      isActive={isActive}
      _updateSection={_updateSection}
      isEditMode={!!isEditMode}
      onClick={onClick}
    >
      <div
        className="position-relative h-100 d-flex flex-1 align-items-center justify-content-start flex-column w-100"
        style={{ minHeight: "100vh" }}
      >
        <div
          style={{
            maxWidth: 410,
            background: "white",
            border: `5px solid ${card_theme_color}`,
          }}
          className="d-flex flex-1 flex-column justify-content-between w-100 h-100 position-relative"
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
          .swiper-slide-active .menu-card{
            background-color: ${hexToRGBA(
              slider_categories_background_color,
              0.39
            )};
            transform: scale(1.4);
          }
          .swiper-wrapper .swiper-slide {
            width: 130px !important;
          }
          .menu-card {
            box-sizing: border-box;
            width: 84px;
            min-width: 84px;
            height: 84px;
            background-color: ${hexToRGBA(
              slider_categories_background_color,
              0.16
            )};
            border-radius: 5px;
            transition: 0.4s
          }
      `,
            }}
          ></style>
          <div className="position-relative">
            <div
              id="stickyHeader"
              className="py-1 position-sticky"
              style={{ background: header_background_color, top: 0, zIndex: 2 }}
            >
              <Swiper
                dir="rtl"
                centeredSlides
                slideToClickedSlide
                slidesPerView={"auto"}
                className="py-1"
                onClick={(swiper) => {
                  if (swiper.clickedIndex != undefined) {
                    setSelectedCategory(categories[swiper.clickedIndex].id);
                    swiper.slideTo(swiper.clickedIndex, 500);
                  }
                }}
                onSwiper={setControlledSwiper}
              >
                {_categories?.map((_category) => {
                  const category = _category?.id
                    ? _category
                    : categoriesDeals?.find(
                        (_c) => _c.id === _category?.category_id
                      );
                  if (
                    !category ||
                    (category?.products && !category?.products?.length)
                  ) {
                    return null;
                  }
                  return (
                    <SwiperSlide
                      key={_category?.category_id}
                      id={`nav-${category.id}`}
                    >
                      <div
                        className={`d-flex justify-content-center align-items-center px-5 cursor-pointer nav-item-${category.id}`}
                      >
                        <div
                          className="menu-card my-4 d-flex align-items-center flex-column p-2 justify-content-center"
                          style={{ fontSize: 10 }}
                        >
                          {_category?.image && (
                            <div style={{ width: "80%" }}>
                              <img
                                className="w-100"
                                style={{ borderRadius: 4 }}
                                src={_category?.image}
                                alt=""
                              />
                            </div>
                          )}
                          <div
                            className="mt-1"
                            style={{ color: slider_categories_text_color }}
                          >
                            {category?.title}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div
              className="py-4 text-right"
              style={{
                backgroundColor: body_background_color,
                color: "#ffffff",
              }}
            >
              <div className="container">
                {items &&
                  _categories?.map((_category, index) => {
                    const category = _category?.id
                      ? _category
                      : categoriesDeals?.find(
                          (_c) => _c?.id === _category?.category_id
                        );
                    if (
                      !category ||
                      (category?.products && !category?.products?.length)
                    ) {
                      return null;
                    }
                    return (
                      <div key={category?.id} id={`category-${index}`}>
                        <div className="d-flex align-items-center">
                          <div
                            id={`category-${category.id}`}
                            className="py-4"
                          />
                          <div
                            className="p-3"
                            style={{
                              fontSize: 20,
                              fontWeight: 700,
                              color: body_categories_color,
                            }}
                          >
                            {category.title}
                          </div>
                        </div>
                        <div className="d-flex flex-wrap">
                          {category?.products ? (
                            category?.products?.map((deal) => {
                              if (deal) {
                                const customizedOrderItems =
                                  orderItemsGroupByProductId[deal.id]?.filter(
                                    (orderItem) =>
                                      orderItem.modifiers?.length > -1 ||
                                      orderItem.variation_id
                                  );
                                const orderItem = orderItemsGroupByProductId[
                                  deal.id
                                ]?.find(
                                  (orderItem) =>
                                    !orderItem.modifiers?.length &&
                                    !orderItem.variation_id
                                );
                                return (
                                  <MenuProductCard
                                    customizedOrderItems={customizedOrderItems}
                                    orderItem={orderItem}
                                    key={deal.id}
                                    backgroundColor={card_background_color}
                                    textsColor={card_texts_color}
                                    isMobile={!isDesktop}
                                    product={deal}
                                    useThemeColor={use_theme_color}
                                    customThemeColor={card_theme_color}
                                    couldShop={!isDisabled}
                                  />
                                );
                              }
                            })
                          ) : loading ? (
                            <>
                              <div
                                className={
                                  !isDesktop
                                    ? "col-12 px-0 my-2"
                                    : "col-lg-6 px-lg-2 my-2"
                                }
                              >
                                <div
                                  className="p-2 d-flex flex-wrap"
                                  style={{
                                    background: card_background_color,
                                    borderRadius: 5,
                                  }}
                                >
                                  <div className="col-4 px-0">
                                    <Skeleton
                                      variant="rect"
                                      animation="wave"
                                      width="100%"
                                      height={126}
                                      style={{ borderRadius: 5 }}
                                    ></Skeleton>
                                  </div>
                                  <div
                                    className="col-8 texts-color"
                                    id="menu-card"
                                  >
                                    <Skeleton
                                      animation="wave"
                                      width="100%"
                                    ></Skeleton>
                                    <Skeleton
                                      animation="wave"
                                      width="80%"
                                    ></Skeleton>
                                    <Skeleton
                                      animation="wave"
                                      width="20%"
                                    ></Skeleton>
                                    <Skeleton
                                      animation="wave"
                                      width="50%"
                                    ></Skeleton>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={
                                  !isDesktop
                                    ? "col-12 px-0 my-2"
                                    : "col-lg-6 px-lg-2 my-2"
                                }
                              >
                                <div
                                  className="p-2 d-flex flex-wrap"
                                  style={{
                                    background: card_background_color,
                                    borderRadius: 5,
                                  }}
                                >
                                  <div className="col-4 px-0">
                                    <Skeleton
                                      variant="rect"
                                      animation="wave"
                                      width="100%"
                                      height={126}
                                      style={{ borderRadius: 5 }}
                                    ></Skeleton>
                                  </div>
                                  <div
                                    className="col-8 texts-color"
                                    id="menu-card"
                                  >
                                    <Skeleton
                                      animation="wave"
                                      width="100%"
                                    ></Skeleton>
                                    <Skeleton
                                      animation="wave"
                                      width="80%"
                                    ></Skeleton>
                                    <Skeleton
                                      animation="wave"
                                      width="20%"
                                    ></Skeleton>
                                    <Skeleton
                                      animation="wave"
                                      width="50%"
                                    ></Skeleton>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            PaperProps={{
              elevation: 3,
              style: { width: isDesktop ? 360 : "100%", marginTop: 10 },
            }}
            onClose={() => setOpen(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: isDesktop ? "left" : "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: isDesktop ? "left" : "center",
            }}
          >
            <div className="p-2">
              <div className="d-flex mb-2 align-items-center u-fontWeightBold">
                آیتم افزوده شده سبد خرید
                <ShoppingCartIcon fontSize="small" className="mr-1" />
              </div>
              {orders &&
                orders.map((order) => (
                  <AddedProductRow
                    resetTimeout={() => {
                      clearTimeout(timeout.current);
                      timeout.current = setTimeout(() => {
                        setOpen(false);
                      }, 5000);
                    }}
                    key={`op-${order.id}`}
                    order={order}
                  />
                ))}
              <div className="d-flex mt-3">
                <Button
                  color="secondary"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  بستن
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="flex-1"
                  onClick={() => {
                    setOpen(false);
                    router.push(`${urlPrefix}/checkout/cart`);
                  }}
                >
                  دیدن سبد خرید
                </Button>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </AdminSection>
  );
}

const mapStateToProps = createStructuredSelector({
  categoriesDeals: makeSelectCategoriesDeals(),
  orders: makeSelectOrdersBySiteDomain(),
  urlPrefix: makeSelectUrlPrefix(),
  loading: makeSelectLoading(),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  workingHours: makeSelectBusinessWorkingHours(),
});
function mapDispatchToProps(dispatch) {
  return {
    _getCategoriesDeals: () => dispatch(getCategoryDeals()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(OnlineMenu1);
