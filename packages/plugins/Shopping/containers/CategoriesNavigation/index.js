import { memo, useEffect, useMemo, useRef, useState } from "react";
import { textTypes } from "@saas/utils/colors";
import { compose } from "redux";
import { connect } from "react-redux";
import Input from "@saas/components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
} from "@saas/stores/business/selector";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { createStructuredSelector } from "reselect";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { CATEGORY_DEALS } from "@saas/stores/global/constants";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Navigation } from "swiper";
import SkeletonRenderer from "./components/Skeleton";
import Skeleton from "@material-ui/lab/Skeleton";
import CategoryNavItem from "./components/CategoryNavItem";
import { useWindowWidthSize } from "@saas/utils/hooks/useWindowWidthSize";
import { useRouter } from "next/router";


let timeoutId = null;
let shouldNotScroll = false;
let shouldNotSlide = false;

const defaultCategoryItemImage = `/images/no-picture.svg`;

function CategoriesNavigation({
  categories,
  hasCategoriesImage,
  isCategoiesDealsLoading,
  isMobile,
  searchValue,
  setSearchValue,
}) {
  const router = useRouter();

  SwiperCore.use([Navigation]);
  const showCategoriesImage = useMemo(
    () => hasCategoriesImage,
    [hasCategoriesImage]
  );
  const { maxWidth768 } = useResponsive();
  const mobileMatches = typeof isMobile === "boolean" ? isMobile : maxWidth768;

  const theme = useTheme();
  const [isSearchBoxExpanded, toggleSearchBox] = useState(false);
  const categoriesNavigationRef = useRef();

  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hasSlider, setHasSlider] = useState(null);
  const [isSliderEnd, setIsEnd] = useState(false);
  const [isSliderBeginning, setIsBeginning] = useState(true);

  const swiperRef = useRef(null);
  const widthOfPage = useWindowWidthSize();

  useEffect(
    () =>
      widthOfPage > categories.length * 140 + 120
        ? setHasSlider(false)
        : setHasSlider(true),
    [widthOfPage, categories]
  );

  useEffect(() => {
    if (isCategoiesDealsLoading === false && categories.length) {
      setTimeout(() => {
        const asPath = router.asPath;
        if (asPath?.includes("#category-")) {
          const indexOfFirstOfCategoryId = asPath?.indexOf("#");
          const categoryElementId = asPath.slice(
            indexOfFirstOfCategoryId + 1,
            asPath?.length
          );
          const categorySection = document.getElementById(categoryElementId);
          shouldNotSlide = true;
          const categoryId = +categoryElementId.slice(
            9,
            categoryElementId.length
          );
          const indexOfCategory = categories.findIndex(
            (c) => c.id === categoryId
          );
          setActiveCategory(indexOfCategory);
          window.scrollTo(
            categorySection?.offsetLeft,
            categorySection?.getBoundingClientRect().top +
              window.scrollY -
              categoriesNavigationRef.current?.getBoundingClientRect().height
          );
          setActiveCategory(indexOfCategory);
          swiperRef?.current?.swiper?.slideTo(indexOfCategory, 500);
        }
      }, 1000);
    }
  }, [isCategoiesDealsLoading === false]);

  useEffect(() => {
    if (controlledSwiper) {
      document.addEventListener("scroll", () => {
        if (!shouldNotSlide) {
          const scrollTop = window.scrollY + 100;
          categories?.forEach((category, index) => {
            const element = document.getElementById(`category-${category.id}`);
            if (element && controlledSwiper) {
              const offsetTop = element.offsetTop;
              const height = element.clientHeight;
              if (offsetTop <= scrollTop && scrollTop <= offsetTop + height) {
                shouldNotScroll = true;
                setActiveCategory(index);
                if (controlledSwiper.isBeginning) {
                  setIsBeginning(true);
                } else {
                  setIsBeginning(false);
                }
                if (controlledSwiper.isEnd) {
                  setIsEnd(true);
                } else {
                  setIsEnd(false);
                }
                controlledSwiper.slideTo(index, 500);
                // window.location.hash = `category-${category.id}`;
              }
            }
          });
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          shouldNotSlide = false;
        }, 1000);
      });
    }
  }, [controlledSwiper, isSliderBeginning, isSliderEnd]);

  return (
    <section
      ref={categoriesNavigationRef}
      className={`direction-rtl category-navbar category-navbar__fixed d-flex align-items-center w-100  `}
    >
      <div
        className="d-flex align-items-center w-100 position-relative"
        style={{ height: mobileMatches ? 70 : 96 }}
      >
        <div
          style={{
            width: isSearchBoxExpanded ? "100%" : mobileMatches ? 24 : 32,
            height: mobileMatches ? 24 : 32,
          }}
        >
          {isCategoiesDealsLoading ? (
            <Skeleton
              variant="circle"
              animation="wave"
              width={mobileMatches ? 24 : 32}
              height={mobileMatches ? 24 : 32}
            ></Skeleton>
          ) : isSearchBoxExpanded ? (
            <Input
              size="medium"
              value={searchValue}
              onChange={(value) => {
                window?.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setSearchValue(value);
              }}
              placeholder="جستجوی محصول"
              InputProps={{
                className: "pr-5",
                startAdornment: (
                  <>
                    <InputAdornment
                      style={{ position: "absolute", left: 3 }}
                      className="u-cursor-pointer"
                      position="start"
                      onClick={() => {
                        setSearchValue("");
                        toggleSearchBox(false);
                      }}
                    >
                      <ClearRoundedIcon
                        style={{ color: theme.palette.text.disabled }}
                      />
                    </InputAdornment>
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
          ) : (
            <SearchRoundedIcon
              style={{
                width: mobileMatches ? 24 : 32,
                height: mobileMatches ? 24 : 32,
                color: textTypes.text.default,
              }}
              onClick={() => toggleSearchBox(!isSearchBoxExpanded)}
            />
          )}
        </div>
        {!isSearchBoxExpanded && (
          <>
            {!isCategoiesDealsLoading ? (
              mobileMatches ? (
                <div
                  style={{
                    overflow: "hidden",
                    marginRight: 32,
                  }}
                  className={`${
                    hasSlider ? "" : "swiper-slider-right"
                  } swiper-slider h-100 `}
                >
                  {hasSlider && !isSliderBeginning ? (
                    <button
                      className="d-flex align-items-center justify-content-center swiper-slider-back-btn"
                      style={{
                        position: "absolute",
                        top: "50%",
                        zIndex: 30,
                        height: "100%",
                        width: 48,
                        transform: "translateY(-50%)",
                        background:
                          "linear-gradient(270deg, #F6F7F7 63.02%, rgba(246, 247, 247, 0.7) 81.77%, rgba(246, 246, 247, 0) 100%)",
                      }}
                      id="previousButton"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault;
                        if (swiperRef.current.swiper.isBeginning) {
                          setIsBeginning(true);
                        } else {
                          setIsBeginning(false);
                        }
                        if (swiperRef.current.swiper.isEnd) {
                          setIsEnd(true);
                        } else {
                          setIsEnd(false);
                        }
                        swiperRef.current.swiper.slidePrev();
                      }}
                    >
                      <svg
                        width="8"
                        height="15"
                        viewBox="0 0 13 20"
                        fill="#5C5F62"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.879883 2.12L8.75988 10L0.879883 17.88L2.99988 20L12.9999 10L2.99988 0L0.879883 2.12Z"
                          fill="#5C5F62"
                        />
                      </svg>
                    </button>
                  ) : null}
                  {hasSlider && !isSliderEnd ? (
                    <button
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: -20,
                        zIndex: 30,
                        height: "100%",
                        width: 48,
                        background:
                          "linear-gradient(90deg, #F6F7F7 59.9%, rgba(246, 247, 247, 0.7) 77.08%, rgba(246, 246, 247, 0) 100%)",
                      }}
                      id="nextButton"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (swiperRef.current.swiper.isBeginning) {
                          setIsBeginning(true);
                        } else {
                          setIsBeginning(false);
                        }
                        if (swiperRef.current.swiper.isEnd) {
                          setIsEnd(true);
                        } else {
                          setIsEnd(false);
                        }
                        swiperRef.current.swiper.slideNext();
                      }}
                    >
                      <svg
                        width="8"
                        height="15"
                        viewBox="0 0 13 20"
                        fill="#5C5F62"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1201 2.12L4.24012 10L12.1201 17.88L10.0001 20L0.000117302 10L10.0001 0L12.1201 2.12Z"
                          fill="#5C5F62"
                        />
                      </svg>
                    </button>
                  ) : null}
                  <Swiper
                    ref={swiperRef}
                    centeredSlides={false}
                    dir="rtl"
                    slidesPerView="auto"
                    className="categories-swiper"
                    onSliderMove={(swiper) => {
                      shouldNotScroll = false;
                      if (swiper.isBeginning) {
                        setIsBeginning(true);
                      } else {
                        setIsBeginning(false);
                      }
                      if (swiper.isEnd) {
                        setIsEnd(true);
                      } else {
                        setIsEnd(false);
                      }
                    }}
                    onClick={(swiper) => {
                      shouldNotScroll = false;
                      window.location.hash = `category-${
                        categories?.[swiper.clickedIndex].id
                      }`;
                      if (!shouldNotScroll) {
                        const categorySection = document.getElementById(
                          `category-${categories?.[swiper.clickedIndex].id}`
                        );
                        shouldNotSlide = true;
                        window.scrollTo(
                          categorySection?.offsetLeft,
                          categorySection?.getBoundingClientRect().top +
                            window.scrollY -
                            categoriesNavigationRef.current?.getBoundingClientRect()
                              .height
                        );
                      }
                      shouldNotScroll = false;
                      setActiveCategory(swiper.clickedIndex);
                      swiper.slideTo(swiper.clickedIndex, 500);
                      if (swiper.isBeginning) {
                        setIsBeginning(true);
                      } else {
                        setIsBeginning(false);
                      }
                      if (swiper.isEnd) {
                        setIsEnd(true);
                      } else {
                        setIsEnd(false);
                      }
                    }}
                    onSwiper={setControlledSwiper}
                    // loadPrevNext={true}
                    // loadPrevNextAmount={2}
                  >
                    {categories.map((category, index) => (
                      <SwiperSlide key={category.id}>
                        {() => (
                          <CategoryNavItem
                            hasImage={showCategoriesImage}
                            index={index}
                            id={category.id}
                            categoryImage={
                              category.image || defaultCategoryItemImage
                            }
                            categoryName={category.title}
                            isActive={index === activeCategory}
                          />
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div
                  className={`${
                    hasSlider ? "" : "swiper-slider-right"
                  } swiper-slider h-100`}
                  style={{ width: "200%", overflow: "hidden", marginRight: 40 }}
                >
                  {hasSlider && !isSliderBeginning ? (
                    <button
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        background:
                          "linear-gradient(270deg, #F6F7F7 59.9%, rgba(246, 247, 247, 0.7) 77.08%, rgba(246, 246, 247, 0) 100%)",
                        position: "absolute",
                        top: "50%",
                        right: 40,
                        zIndex: 30,
                        height: "100%",
                        width: 56,
                        transform: "translateY(-50%)",
                        borderRadius: "0px 8px 8px 0px",
                      }}
                      id="previousButton"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault;
                        swiperRef.current.swiper.slidePrev();
                        if (swiperRef.current.swiper.isBeginning) {
                          setIsBeginning(true);
                        } else {
                          setIsBeginning(false);
                        }
                        if (swiperRef.current.swiper.isEnd) {
                          setIsEnd(true);
                        } else {
                          setIsEnd(false);
                        }
                      }}
                    >
                      <svg
                        width="13"
                        height="20"
                        viewBox="0 0 13 20"
                        fill="#5C5F62"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.879883 2.12L8.75988 10L0.879883 17.88L2.99988 20L12.9999 10L2.99988 0L0.879883 2.12Z"
                          fill="#5C5F62"
                        />
                      </svg>
                    </button>
                  ) : null}
                  {hasSlider && !isSliderEnd ? (
                    <button
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        background:
                          "linear-gradient(90deg, #F6F7F7 59.9%, rgba(246, 247, 247, 0.7) 77.08%, rgba(246, 246, 247, 0) 100%)",
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        zIndex: 30,
                        height: "100%",
                        width: 56,
                        transform: "translateY(-50%)",
                        borderRadius: "8px 0px 0px 8px",
                      }}
                      id="nextButton"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        swiperRef.current.swiper.slideNext();
                        if (swiperRef.current.swiper.isBeginning) {
                          setIsBeginning(true);
                        } else {
                          setIsBeginning(false);
                        }
                        if (swiperRef.current.swiper.isEnd) {
                          setIsEnd(true);
                        } else {
                          setIsEnd(false);
                        }
                      }}
                    >
                      <svg
                        width="13"
                        height="20"
                        viewBox="0 0 13 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1201 2.12L4.24012 10L12.1201 17.88L10.0001 20L0.000117302 10L10.0001 0L12.1201 2.12Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  ) : null}
                  <Swiper
                    ref={swiperRef}
                    centeredSlides={false}
                    dir="rtl"
                    slidesPerView="auto"
                    className="categories-swiper"
                    onSliderMove={(swiper) => {
                      shouldNotScroll = false;
                      if (swiper.isBeginning) {
                        setIsBeginning(true);
                      } else {
                        setIsBeginning(false);
                      }
                      if (swiper.isEnd) {
                        setIsEnd(true);
                      } else {
                        setIsEnd(false);
                      }
                    }}
                    onClick={(swiper, event) => {
                      event.stopPropagation();
                      shouldNotScroll = false;
                      if (!shouldNotScroll) {
                        const categorySection = document.getElementById(
                          `category-${categories?.[swiper.clickedIndex].id}`
                        );
                        shouldNotSlide = true;

                        window.scrollTo(
                          categorySection?.offsetLeft,
                          categorySection?.getBoundingClientRect().top +
                            window.scrollY -
                            categoriesNavigationRef.current?.getBoundingClientRect()
                              .height
                        );
                      }
                      shouldNotScroll = false;
                      setActiveCategory(swiper.clickedIndex);
                      swiper.slideTo(swiper.clickedIndex, 500);
                      if (swiper.isBeginning) {
                        setIsBeginning(true);
                      } else {
                        setIsBeginning(false);
                      }
                      if (swiper.isEnd) {
                        setIsEnd(true);
                      } else {
                        setIsEnd(false);
                      }
                    }}
                    onSwiper={setControlledSwiper}
                  >
                    {categories.map((category, index) => (
                      <SwiperSlide
                        style={{ cursor: "pointer" }}
                        key={category.id}
                      >
                        <CategoryNavItem
                          hasImage={showCategoriesImage}
                          index={index}
                          id={category.id}
                          categoryImage={
                            category.image || defaultCategoryItemImage
                          }
                          categoryName={category.title}
                          isActive={index === activeCategory}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )
            ) : (
              <SkeletonRenderer isMobile={isMobile} />
            )}
          </>
        )}
      </div>
    </section>
  );
}

const mapStateToProps = createStructuredSelector({
    themeColor: makeSelectBusinessThemeColor(),
    business: makeSelectBusiness(),
    urlPrefix: makeSelectUrlPrefix(),
    isCategoiesDealsLoading: makeSelectLoading(CATEGORY_DEALS),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(CategoriesNavigation);
