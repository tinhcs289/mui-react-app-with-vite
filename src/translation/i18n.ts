import { i18nLanguage } from "@/browser/local-storage/acceptLanguage";
import { AcceptLanguageEnum } from "@/constants/language";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resources, { addTranslation } from "./resources";
//
import common from "./common";
import login from "./login";
import notFound from "./notFound";
import register from "./register";

addTranslation("common", common);
addTranslation("login", login);
addTranslation("register", register);
addTranslation("notFound", notFound);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: i18nLanguage.get() || AcceptLanguageEnum["vi-VN"],
    fallbackLng: i18nLanguage.get() || AcceptLanguageEnum["vi-VN"],
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      useSuspense: true,
    },
    cache: {
      enabled: true,
    },
  });

console.log("i18n initialized");

export { i18n };
