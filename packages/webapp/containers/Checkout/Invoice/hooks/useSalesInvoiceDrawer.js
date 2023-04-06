import { useState } from "react";

export const useSalesInvoiceDrawer = () => {
  const [isSalesInvoiceDrawerOpen, setSalesInvoiceDrawerOpen] = useState(false);

  const toggleSalesInvoiceDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSalesInvoiceDrawerOpen(open);
  };

  const handleSalesInvoiceDrawerClose = () => {
    setSalesInvoiceDrawerOpen(false);
  };
  return {
    isSalesInvoiceDrawerOpen,
    toggleSalesInvoiceDrawer,
    handleSalesInvoiceDrawerClose,
  };
};
