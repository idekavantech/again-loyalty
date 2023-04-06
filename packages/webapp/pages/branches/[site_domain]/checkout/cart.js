import Cart from "containers/Checkout/Cart";
import CheckoutLayout from "containers/Checkout/CheckoutLayout";

export default function CheckoutCart() {
  return <Cart />;
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
