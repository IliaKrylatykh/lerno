import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "sr", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
});
