import CheckoutLayout from "containers/Checkout/CheckoutLayout";
import Invoice from "containers/Checkout/Invoice";

export default function CheckoutInvoice() {
  return <Invoice />;
}
CheckoutInvoice.layoutConfig = {
  noHeader: true,
  noFooter: true,
  noCopyRightFooter: true,
};
CheckoutInvoice.wrapperProps = {
  hasTrashIcon: false,
  headerTitle: "تایید نهایی و پرداخت",
};

CheckoutInvoice.Wrapper = CheckoutLayout;
