import React, { useEffect, useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { textTypes } from "@saas/utils/colors";
import { makeStyles } from "@material-ui/core";

const useClasses = makeStyles({
  arrow: {
    position: "absolute",
    height: "100%",
    width: "30px",
    bottom: "0px",
    "& > div": {
      border: (props) => `solid ${props.arrowColor}`,
      borderWidth: (props) =>
        `0 ${props.isMobile ? "2px" : "3px"} ${
          props.isMobile ? "2px" : "3px"
        } 0 !important`,
      display: "inline-block",
      padding: "3px",
      width: (props) => (props.isMobile ? "8px" : "15px"),
      height: (props) => (props.isMobile ? "8px" : "15px"),
      cursor: "pointer",
      borderRadius: "0 0 3px 0",
    },

    "&.arrowRight": {
      background: (props) => {
        return `linear-gradient(270deg, ${
          props.arrowBg
        } 59.9%, ${props.arrowBg.concat("b3")} 77.08%, ${props.arrowBg.concat(
          "00"
        )} 100%)`;
      },
      right: (props) => (props.isMobile ? "-10px" : "-35px"),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > div": {
        transform: "rotate(-45deg)",
      },
    },

    "&.arrowLeft": {
      background: (props) => {
        return `linear-gradient(90deg, ${
          props.arrowBg
        } 59.9%, ${props.arrowBg.concat("b3")} 77.08%, ${props.arrowBg.concat(
          "00"
        )} 100%)`;
      },
      left: (props) => (props.isMobile ? "-10px" : "-35px"),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > div": {
        transform: "rotate(135deg)",
      },
    },
  },
});

export default function CategoriesNavigation({
  categories,
  themeColor,
  selectedCategory,
  setSelectedCategory,
  isMobile,
  customization,
  heightStickyHeader,
  isEditMode,
}) {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [arrows, setArrows] = useState({ showRight: false, showLeft: true });

  const sliderRef = useRef(null);
  const {
    colors: {
      slider_categories_text_color,
      slider_categories_background_color,
      use_theme_color,
      card_theme_color,
      body_background_color,
    } = {},
  } = customization;

  const classes = useClasses({
    arrowColor: use_theme_color ? themeColor : card_theme_color,
    isMobile,
    arrowBg: body_background_color,
  });

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

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
        let current = "";
        let indexOfCategoryItem = 0;
        categories.forEach((category, index) => {
          const categoryElement = document.getElementById(
            `category-${category.id}`
          );
          if (categoryElement) {
            const sectionTop = categoryElement.offsetTop;

            if (scrollY >= sectionTop - 15) {
              current = category.id;
              indexOfCategoryItem = index;
            }
          }
        });

        categories.forEach((category) => {
          const navElement = document.getElementById(`nav-${category.id}`);

          navElement.style.borderBottom = `2px solid transparent`;
          if (navElement.classList.contains(`nav-item-${current}`)) {
            navElement.style.borderBottom = `2px solid ${
              use_theme_color ? themeColor : card_theme_color
            }`;
            setArrows({
              showRight: !controlledSwiper.isBeginning,
              showLeft: !controlledSwiper.isEnd,
            });
            controlledSwiper.slideTo(indexOfCategoryItem, 500);
          }
        });
      }, 150);
    };
    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, [categories, controlledSwiper]);

  return (
    <div className={`px-4 ${isEditMode ? "" : "px-md-0"} position-relative`}>
      <Swiper
        slidesPerView="auto"
        dir="rtl"
        className="categories-swiper"
        onClick={(swiper) => {
          if (swiper.clickedIndex != undefined) {
            setSelectedCategory(categories[swiper.clickedIndex].id);
            swiper.slideTo(swiper.clickedIndex, 500);
          }
        }}
        ref={sliderRef}
        onSwiper={setControlledSwiper}
        onSlideChange={() =>
          setArrows({
            showRight: !controlledSwiper.isBeginning,
            showLeft: !controlledSwiper.isEnd,
          })
        }
      >
        {categories.map((category, index) => (
          <SwiperSlide key={category.id}>
            <div
              className={`nav-item-${category.id} ${
                index == 0 ? "active" : ""
              } online-menu__navigation-wrapper__item${
                isMobile ? "__mobile" : ""
              }`}
              id={`nav-${category.id}`}
              data-color={use_theme_color ? themeColor : card_theme_color}
              style={{
                color: slider_categories_text_color || textTypes.text.subdued,
                backgroundColor:
                  slider_categories_background_color || "transparent",
                margin:
                  index === 0
                    ? "0 0 0 12px"
                    : index + 1 === categories.length
                    ? "0 12px 0 0"
                    : "0 12px",
                ...(!index && {
                  borderBottom: `2px solid ${
                    use_theme_color ? themeColor : card_theme_color
                  }`,
                }),
              }}
            >
              {category.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {arrows.showLeft && (
        <div className={`${classes.arrow} arrowLeft`} onClick={handleNext}>
          <div />
        </div>
      )}
      {arrows.showRight && (
        <div className={`${classes.arrow} arrowRight`} onClick={handlePrev}>
          <div />
        </div>
      )}
    </div>
  );
}
