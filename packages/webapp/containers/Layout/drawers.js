import { MENU_DRAWER } from "@saas/stores/ui/constants";
const Menu = dynamic(() => import("./containers/Menu"), {
  ssr: false,
});

import dynamic from "next/dynamic";

const drawers = {
  [MENU_DRAWER]: Menu,
};

export { drawers };
