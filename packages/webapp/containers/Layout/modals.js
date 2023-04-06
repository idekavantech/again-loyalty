import {
  APP_SHOPPINGPAGE_PRODUCT_MODAL,
  APP_SHOPPINGPAGE_MODIFIERS_MODAL,
  APP_SHOPPINGPAGE_SEARCH_MODAL,
  APP_SHOPPINGPAGE_FILTER_MODAL,
} from "@saas/stores/plugins/constants";

const ShoppingModifiersModal = dynamic(
  () => import("@saas/plugins/Shopping/containers/modals/ModifiersModal"),

  { ssr: false }
);
const ShoppingProductModal = dynamic(
  () => import("@saas/plugins/Shopping/containers/modals/ProductModal"),
  { ssr: false }
);
const ShoppingProductsSearch = dynamic(
  () => import("@saas/plugins/Shopping/containers/modals/ProductsSearch"),
  { ssr: false }
);
const BranchSelectionModal = dynamic(
  () => import("@saas/builder/SectionRenderer/modals/BranchSelectionModal"),
  { ssr: false }
);
const FilterModal = dynamic(
  () => import("@saas/plugins/Shopping/containers/modals/FilterModal"),
  { ssr: false }
);
const DirectionModal = dynamic(
  () =>
    import(
      "@saas/builder/SectionRenderer/Sections/BusinessSections/DirectionModal"
    ),
  { ssr: false }
);

const WalletChargeModal = dynamic(
  () => import("@saas/plugins/Shopping/containers/modals/walletCharge"),
  { ssr: false }
);

import {
  BRANCH_SELECTION_MODAL,
  DIRECTION_MODAL,
  CHARGE_WALLET_MODAL,
} from "@saas/stores/ui/constants";
import dynamic from "next/dynamic";

export const modals = {
  [APP_SHOPPINGPAGE_PRODUCT_MODAL]: ShoppingProductModal,
  [APP_SHOPPINGPAGE_MODIFIERS_MODAL]: ShoppingModifiersModal,
  [APP_SHOPPINGPAGE_SEARCH_MODAL]: ShoppingProductsSearch,
  [APP_SHOPPINGPAGE_FILTER_MODAL]: FilterModal,
  [BRANCH_SELECTION_MODAL]: BranchSelectionModal,
  [DIRECTION_MODAL]: DirectionModal,
  [CHARGE_WALLET_MODAL]: WalletChargeModal,
};
