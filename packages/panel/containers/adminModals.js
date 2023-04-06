import dynamic from "next/dynamic";
const FontSelectorModal = dynamic(() =>
  import("containers/AdminModals/FontSelectorModal")
);
const ThemeColorPickerModal = dynamic(() =>
  import("containers/AdminModals/ThemeColorPickerModal")
);
const ThemeSelectionModal = dynamic(() =>
  import("containers/AdminModals/ThemeSelectionModal")
);
const EditAboutUsModal = dynamic(() =>
  import("containers/AdminModals/EditAboutUsModal")
);
const EditDescriptionModal = dynamic(() =>
  import("containers/AdminModals/EditDescriptionModal")
);

const EditAddressModal = dynamic(() =>
  import("containers/AdminModals/EditAddressModal")
);
const EditContactInfoModal = dynamic(() =>
  import("containers/AdminModals/EditContactInfoModal")
);
const OrderNotificationsModal = dynamic(() =>
  import("containers/AdminModals/OrderNotificationsModal")
);
const AdminPagesModal = dynamic(() =>
  import("containers/AdminModals/AdminPagesModal")
);
const TargetingModal = dynamic(() =>
  import("components/SuccessAutomation/components/TargetingModal")
);
const GateAwayModal = dynamic(() =>
  import("components/SuccessAutomation/components/GateAwayModal")
);
const VitrinProModal = dynamic(() =>
  import("components/SuccessAutomation/components/VitrinProModal")
);
const EventsModal = dynamic(() => import("components/Modals/EventsModal"));

const ContactsModal = dynamic(() => import("components/Modals/ContactsModal"));

const UpdatesModal = dynamic(() => import("components/Modals/UpdatesModal"));

const DomainSelectionModal = dynamic(() =>
  import("./AdminModals/DomainSelectionModal")
);

import {
  ADMIN_FONT_SELECTION_MODAL,
  ADMIN_EDIT_ABOUT_US_MODAL,
  ADMIN_EDIT_DESCRIPTION_MODAL,
  ADMIN_EDIT_ADDRESS_MODAL,
  ADMIN_EDIT_BUSINESS_CONTACT_INFO_MODAL,
  ADMIN_THEME_SELECTION_MODAL,
  ADMIN_THEME_COLOR_MODAL,
  ADMIN_ORDER_NOTIFICATIONS_MODAL,
  ADMIN_TARGETING_MODAL,
  ADMIN_GATE_AWAY_MODAL,
  ADMIN_VITRIN_PRO_MODAL,
  ADMIN_EVENTS_MODAL,
  ADMIN_CONTACTS_MODAL,
  ADMIN_DOMAIN_SELECTION_MODAL,
  ADMIN_UPDATES_MODAL,
  ADMIN_PAGES_MODAL,
} from "@saas/stores/ui/constants";

export const adminModals = {
  [ADMIN_FONT_SELECTION_MODAL]: FontSelectorModal,
  [ADMIN_THEME_COLOR_MODAL]: ThemeColorPickerModal,
  [ADMIN_THEME_SELECTION_MODAL]: ThemeSelectionModal,
  [ADMIN_EDIT_ABOUT_US_MODAL]: EditAboutUsModal,
  [ADMIN_EDIT_DESCRIPTION_MODAL]: EditDescriptionModal,
  [ADMIN_EDIT_ADDRESS_MODAL]: EditAddressModal,
  [ADMIN_EDIT_BUSINESS_CONTACT_INFO_MODAL]: EditContactInfoModal,
  [ADMIN_ORDER_NOTIFICATIONS_MODAL]: OrderNotificationsModal,
  [ADMIN_PAGES_MODAL]: AdminPagesModal,
  [ADMIN_TARGETING_MODAL]: TargetingModal,
  [ADMIN_GATE_AWAY_MODAL]: GateAwayModal,
  [ADMIN_VITRIN_PRO_MODAL]: VitrinProModal,
  [ADMIN_EVENTS_MODAL]: EventsModal,
  [ADMIN_CONTACTS_MODAL]: ContactsModal,
  [ADMIN_UPDATES_MODAL]: UpdatesModal,
  [ADMIN_DOMAIN_SELECTION_MODAL]: DomainSelectionModal,
};
