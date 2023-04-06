// DO NOT CHANGE THESE STRINGS AT ANY COST !!!!!

import { oceanI } from "../colors";

export const ABOUT_US_SECTION = "about_us_section";
export const POSTS_SECTION = "gallery_section";
export const DESCRIPTION_SECTION = "description_section";
export const LOCATION_SECTION = "location_section";
export const WORKING_HOUR_SECTION = "working_hour_section";
export const CONTACT_US_SECTION = "contact_us_section";
export const FOOTER_SECTION = "footer_section";
export const BRANCHES_SECTION = "branches_section";
export const ENAMAD_SECTION = "enamad_section";

export const THEME_1 = "theme_1";
export const THEME_2 = "theme_2";
export const THEME_3 = "theme_3";
export const THEME_4 = "theme_4";
export const THEME_5 = "theme_5";
export const THEME_6 = "theme_6";
export const THEME_7 = "theme_7";
export const THEME_8 = "theme_8";
export const THEME_9 = "theme_9";
export const THEME_10 = "theme_10";
export const THEME_11 = "theme_11";
export const THEME_12 = "theme_12";
export const THEME_13 = "theme_13";
export const THEME_14 = "theme_14";
export const THEME_15 = "theme_15";
export const THEME_16 = "theme_16";
export const THEME_17 = "theme_17";
export const THEME_18 = "theme_18";
export const THEME_19 = "theme_19";
export const THEME_20 = "theme_20";
export const THEME_21 = "theme_21";
export const THEME_22 = "theme_22";

export const FONT_1 = { name: "Iran Sense", url: "IranSans" };
export const FONT_2 = { name: "Minister", url: "Vazir" };
export const FONT_3 = { name: "Wheat", url: "Gandom" };
export const FONT_4 = { name: "Swallow", url: "Parastoo" };
export const FONT_5 = { name: "Beach", url: "Sahel" };
export const FONT_6 = { name: "Seminary", url: "Samim" };
export const FONT_7 = { name: "Dew", url: "Shabnam" };
export const FONT_8 = { name: "single", url: "Tanha" };
export const FONT_9 = { name: "One", url: "XMYekan" };
export const FONT_10 = { name: "Dana", url: "dana" };
export const FONT_11 = { name: "association", url: "anjoman" };
export const FONT_12 = { name: "Iran One", url: "iranYekan" };
export const FONT_13 = { name: "Iran Handwritten Sense", url: "iranSansDn" };
export const FONT_14 = { name: "note book", url: "daftar" };
// export const FONT_15 = { name: "Professional", url: "danaPro" };
export const FONT_16 = { name: "Dibaj", url: "dibaj" };
export const FONT_17 = { name: "Possible", url: "emkan" };
export const FONT_18 = { name: "Square", url: "morabba pro" };
export const FONT_19 = { name: "it", url: "on" };
export const FONT_20 = { name: "Emergency", url: "tajrid" };
export const FONT_21 = { name: "Born", url: "peyda" };
export const FONT_22 = { name: "Nura", url: "noora" };
export const FONT_23 = { name: "Narrator", url: "ravi" };

export const defaultSections = () => [
  { name: THEME_1, is_active: true },
  { name: ABOUT_US_SECTION, is_active: true },
  { name: POSTS_SECTION, is_active: true },
  { name: DESCRIPTION_SECTION, is_active: true },
  { name: LOCATION_SECTION, is_active: true },
  { name: WORKING_HOUR_SECTION, is_active: true },
  { name: CONTACT_US_SECTION, is_active: true },
  { name: ENAMAD_SECTION, is_active: false },
  { name: FOOTER_SECTION, is_active: true },
];

export const themeSections = [
  { title: "Restaurant", themes: [THEME_2, THEME_3] },
  { title: "Grocery", themes: [THEME_11, THEME_12] },
  { title: "make up and beauty", themes: [THEME_8] },
  { title: "Medicine and Clinic", themes: [THEME_6] },
  { title: "Store", themes: [THEME_7, THEME_9] },
  { title: "Service", themes: [THEME_4, THEME_5] },
  { title: "recreational", themes: [THEME_16] },
  { title: "Car repair and clinic", themes: [THEME_17] },
  { title: "Sports and the club", themes: [THEME_13] },
  { title: "Hotel, travel and ecotourism", themes: [THEME_14] },
  { title: "School and school", themes: [THEME_18] },
  { title: "Property", themes: [THEME_15] },
  { title: "Confectionery and bakery", themes: [THEME_19, THEME_20] },
  { title: "Blog/Personal", themes: [THEME_10] },
  { title: "Other cases", themes: [THEME_1] },
];
export const fonts = () => [
  FONT_1,
  FONT_2,
  FONT_3,
  FONT_4,
  FONT_5,
  FONT_6,
  FONT_7,
  FONT_8,
  FONT_9,
  FONT_10,
  FONT_11,
  FONT_12,
  FONT_13,
  FONT_14,
  // FONT_15,
  FONT_16,
  FONT_17,
  FONT_18,
  FONT_19,
  FONT_20,
  FONT_21,
  FONT_22,
  // FONT_23
];

export const colorsList = [
  oceanI,
  "#74B9FF",
  "#1289A7",
  "#1B1464",
  "#AAA69D",
  "#05C46B",
  "#16A085",
  "#34495E",
  "#F78FB3",
  "#B53471",
  "#8854D0",
  "#8E44AD",
  "#F2A001",
  "#C0392B",
  "#EE5A24",
  "#6F1E51",
];

export const DEFAULT_THEME_COLOR = process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR;
