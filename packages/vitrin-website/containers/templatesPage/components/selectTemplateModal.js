import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { uniqueId } from "lodash";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      alignItems: "center", // push the dialog to bottom
    },
  },
}));

const Btns = [
  {
    type: "store",
    image: "/images/store.svg",
    text: "فروشگاهی (با قابلیت فروش آنلاین)",
  },
  {
    type: "Introduction",
    image: "/images/laptop-mac.svg",
    text: "معرفی (بدون امکان فروش آنلاین)",
  },
];

const shopBuilderProducts = [
  {
    id: uniqueId(),
    value: { category: "1" },
    text: "کالای فیزیکی (لوازم دیجیتال، لوازم خانگی و ...)",
  },
  {
    id: uniqueId(),
    value: { category: "2" },
    text: "غذا و خوراکی (مواد غذایی، مواد فاسد شدنی و...)",
  },
  {
    id: uniqueId(),
    value: { category: "1", subCategory: "1" },
    text: "محصولات مجازی (فایل، گیفت کارت و...)",
  },
  {
    id: uniqueId(),
    value: { category: "4" },
    text: "خدمات (دوره آموزشی، نظافت و ...)",
  },
];

const SelectTemplateModal = ({
  isOpen,
  onClose,
  selected,
  isAuthenticated,
}) => {
  const [shopValues, setShopValues] = useState([]);
  const classes = useStyles();
  const router = useRouter();
  const { prev: prevPage } = router.query;
  const isPrevPageShopBuilder = prevPage === "shop-builder";

  function handleChangeShopValues(shopItem) {
    const tempShopValueIds = shopValues.map((item) => item.id);
    if (tempShopValueIds.includes(shopItem.id))
      setShopValues((values) =>
        values.filter((item) => item.id !== shopItem.id)
      );
    else setShopValues((values) => [...values, shopItem]);
  }

  function handleClickToShopBuilderPage() {
    let categoriesQP = shopValues
      .map((item) => item.value.category)
      .filter((item) => item)
      .map((item) => `categories=${item}`)
      .join("&");
    let subCategoriesQP = shopValues
      .map((item) => item.value.subCategory)
      .filter((item) => item)
      .map((item) => `sub_categories=${item}`)
      .join("&");
    if (categoriesQP) categoriesQP = `&${categoriesQP}`;
    if (subCategoriesQP) subCategoriesQP = `&${subCategoriesQP}`;

    router.push(
      `${isAuthenticated ? "/cr~main-info" : "/cr~signup-phone"}?template=${
        selected || "shoppingtemp"
      }&business_type=store${categoriesQP}${subCategoriesQP}`
    );
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      scroll="paper"
      maxWidth="sm"
      TransitionComponent={Transition}
      classes={{ container: classes.root, paper: classes.paper }}
      className="template-page-modal"
    >
      <DialogContent
        className={`template-page-modal-content  ${
          isPrevPageShopBuilder ? "px-4" : "py-4 px-4"
        }`}
      >
        <div className="d-flex align-items-center py-4 px-2 text-center">
          {/* <Link href={"/"}> */}
          <a className="d-inline-block px-2" onClick={() => router.back()}>
            <Image
              src={"/images/arrow-right-blue.svg"}
              width="11px"
              height="20px"
              priority
              alt="back to index"
            />
          </a>
          {/* </Link> */}
          <div className="d-md-none" style={{ flexGrow: 1 }}>
            <Image
              height={21}
              width={64}
              src={"/images/vitrin-logo-blue.svg"}
              alt="logo"
              priority
            />
          </div>

          <div className="d-none d-md-block" style={{ flexGrow: 1 }}>
            <Image
              height={36}
              width={108}
              src={"/images/logo-desktop-blue.svg"}
              alt="logo"
              priority
            />
          </div>
        </div>
        {isPrevPageShopBuilder ? (
          <p className="question-shop-builder text-center">
            چه نوع محصولی می‌خواهید بفروشید؟
          </p>
        ) : (
          <p className="question text-center">چه نوع سایتی می‌خواهید بسازید؟</p>
        )}

        <div className="template-page-modal-select-type d-flex flex-column align-items-center">
          {isPrevPageShopBuilder ? (
            <div className="row justify-content-center mx-0 w-100">
              <div className="col-12 col-sm-9 col-md-12 px-md-0">
                {shopBuilderProducts.map((item) => {
                  return (
                    <div className="text-right w-100" key={item.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => handleChangeShopValues(item)}
                            color="primary"
                          />
                        }
                        label={item.text}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            Btns.map((item) => {
              const btnHref = `${
                isAuthenticated ? "/cr~main-info" : "/cr~signup-phone"
              }?template=${
                selected || (item.type == "store" ? "shoppingtemp" : "intro")
              }&business_type=${item.type}`;

              return (
                <Link passHref href={btnHref} key={item.type}>
                  <button className="d-flex align-items-center  justify-content-center w-100 flex-1 mt-4 p-2 p-md-3">
                    <Image alt="" width={16} height={16} src={item.image} />
                    <span className="mr-2">{item.text}</span>
                  </button>
                </Link>
              );
            })
          )}
        </div>
        <div className="row justify-content-center mx-0 w-100">
          <div className="gift col-12 col-sm-9 col-md-12 d-flex">
            <div className="d-flex">
              <div className="p-0 pl-2 d-flex justify-content-end align-item-center">
                <Image
                  alt=""
                  src={"/images/gift.svg"}
                  width={"24px"}
                  height={"22px"}
                  unoptimized
                  priority
                />
              </div>
              <p className="px-1">
                با ساخت سایت، یک دامنه ir.{" "}
                <span className="font-weight-bold">رایگان</span> از ویترین هدیه
                بگیرید
              </p>
            </div>
          </div>
        </div>
        {isPrevPageShopBuilder && (
          <div className="btns">
            <button
              onClick={handleClickToShopBuilderPage}
              className="d-flex align-items-center w-100 justify-content-center p-2"
            >
              ثبت و ادامه
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

SelectTemplateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onNext: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default SelectTemplateModal;
