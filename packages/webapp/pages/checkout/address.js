import CheckoutLayout from "containers/Checkout/CheckoutLayout";
import Address from "containers/Pages/Address/address";

export default function checkoutAddress() {
  return <Address />;
}

checkoutAddress.layoutConfig = {
  noHeader: true,
  noFooter: true,
  noCopyRightFooter: true,
};
checkoutAddress.wrapperProps = { hasTrashIcon: false, headerTitle: "آدرس" };
checkoutAddress.Wrapper = CheckoutLayout;
