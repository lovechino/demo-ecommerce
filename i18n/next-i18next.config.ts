import path from "path";
import type { UserConfig } from "next-i18next";

const config: UserConfig = {
  i18n: {
    defaultLocale: "vi",
    locales: ["vi", "en"],
    localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

export default config;
