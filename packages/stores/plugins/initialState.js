import { SHOPPING_CART_STORAGE } from "./constants";

export const initialState = {
  plugins: null,
  adminCallToActions: null,
  callToActions: null,
  navigationLinks: null,
  adminNavigationLinks: null,
  widgets: null,
  drawers: null,
  modals: null,
  urlPrefix: "",
  internal_links: [],
  neighbourhoodsByIds: null,
  citiesByIds: null,
  newOrderItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(SHOPPING_CART_STORAGE)) || []
      : [],
  adminMenuLinks: {},
};
