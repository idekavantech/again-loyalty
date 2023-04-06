import Cart from "containers/Checkout/Cart";
import CheckoutLayout from "containers/Checkout/CheckoutLayout/";
import { NextSeo } from "next-seo";

export default function CheckoutCart() {
  return (
    <>
      <NextSeo
        title={"سبد خرید و روش ارسال"}
        description={"صفحه سبد خرید و روش ارسال"}
        openGraph={{
          description: "صفحه سبد خرید و روش ارسال",
          title: "سبد خرید و روش ارسال",
        }}
        noindex={true}
        nofollow={true}
      />
      <Cart />
    </>
  );
}
CheckoutCart.layoutConfig = {
  noHeader: true,
  noFooter: true,
  noCopyRightFooter: true,
};
CheckoutCart.wrapperProps = {
  hasTrashIcon: true,
  headerTitle: "سبد خرید و روش ارسال",
};
CheckoutCart.Wrapper = CheckoutLayout;
