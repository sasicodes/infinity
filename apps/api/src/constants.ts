export const DYNAMIC_ENV_ID = process.env.DYNAMIC_ENV_ID as string;
export const DYNAMIC_API_TOKEN = process.env.DYNAMIC_API_TOKEN as string;

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
  "Grid",
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
