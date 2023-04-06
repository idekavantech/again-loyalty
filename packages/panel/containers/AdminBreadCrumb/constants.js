const getVideoUrl = (name) =>
  `https://hs3-cdn-saas.behtarino.com/static/panel/helpvideos/${name}.mp4`;

export const ADMIN_HELP_VIDEOS = {
  product: {
    url: getVideoUrl("product"),
  },
  orders: {
    url: getVideoUrl("orders"),
  },
  labels: {
    url: getVideoUrl("labels"),
  },
  category: {
    url: getVideoUrl("category"),
  },
  productInventory: {
    url: getVideoUrl("product-inventory"),
  },
  modifierSets: {
    url: getVideoUrl("modifier-sets"),
  },
  mainPageBuilder: {
    url: getVideoUrl("main-page-builder"),
  },
  shopPageBuilder: {
    url: getVideoUrl("shop-page-builder"),
  },
  productPageBuilder: {
    url: getVideoUrl("product-page-builder"),
  },
  menus: {
    url: getVideoUrl("menus"),
  },
  fontAndColor: {
    url: getVideoUrl("font-and-color"),
  },
  orderingSetting: {
    url: getVideoUrl("ordering-setting"),
  },
  fab: {
    url: getVideoUrl("fab"),
  },
  paymentMethods: {
    url: getVideoUrl("payment-methods"),
  },
  deliverySetting: {
    url: getVideoUrl("delivery-setting"),
  },
  deliveryZone: {
    url: getVideoUrl("delivery-zone"),
  },
  pickupSetting: {
    url: getVideoUrl("pickup-setting"),
  },
  mainInfo: {
    url: getVideoUrl("main-info"),
  },
};
