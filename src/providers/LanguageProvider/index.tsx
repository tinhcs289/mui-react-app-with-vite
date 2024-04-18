import acceptLanguage, {
  i18nLanguage,
} from "@/browser/local-storage/acceptLanguage";
import { LANGUAGE_DEFAULT, NUMERAL_FORMAT } from "@/constants/language";
import { i18n } from "@/translation";
import numeral from "numeral";
import "numeral/locales/vi";
import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import "./us";

numeral.locale(NUMERAL_FORMAT[i18nLanguage.get() || LANGUAGE_DEFAULT]);
console.log("Numeral initialized");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
acceptLanguage.onChange((event, _) => {
  event?.stopPropagation?.();
  if (
    typeof window === "undefined" ||
    typeof window.location === "undefined" ||
    typeof window.location.reload !== "function"
  ) {
    return;
  }
  window.location.reload();
});

export default function LanguageProvider(props: { children?: ReactNode }) {
  const { children } = props;
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
