const IS_PROD = process.env.NODE_ENV === "production";

export const API_URL = IS_PROD
  ? "https://infinity-production-8dd2.up.railway.app"
  : "http://localhost:3000";
export const WEBSITE_URL = "https://infinity-web-demo.vercel.app";

export const PIL_PDF_URI =
  "https://github.com/piplabs/pil-document/blob/v1.3.0/Story%20Foundation%20-%20Programmable%20IP%20License%20(1.31.25).pdf";

export enum ContentStandard {
  NO_HATE = "No-Hate",
  SUITABLE_FOR_ALL_AGES = "Suitable-for-All-Ages",
  NO_DRUGS_OR_WEAPONS = "No-Drugs-or-Weapons",
  NO_PORNOGRAPHY = "No-Pornography"
}

export const CATEGORIES = [
  "any",

  "button",
  "text",
  "image",
  "video",
  "form",
  "input",

  "breadcrumb",
  "navigation-menu",
  "menubar",
  "sidebar",
  "pagination",

  "card",
  "grid",
  "aspect-ratio",
  "separator",
  "sheet",
  "scroll-area",

  "table",
  "data-table",
  "calendar",
  "chart",
  "typography",
  "avatar",
  "badge",
  "skeleton",

  "select",
  "checkbox",
  "radio-group",
  "switch",
  "slider",
  "textarea",
  "date-picker",
  "input-otp",
  "combobox",

  "alert",
  "progress",
  "toast",
  "spinner",
  "loading-button",

  "dialog",
  "drawer",
  "popover",
  "tooltip",
  "hover-card",
  "context-menu",
  "dropdown-menu",

  "accordion",
  "tabs",
  "collapsible",
  "toggle",
  "toggle-group",

  "command",
  "carousel",
  "resizable",
  "infinite-scroll",
  "dual-range-slider"
] as const;
