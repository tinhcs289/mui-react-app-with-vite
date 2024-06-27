import { AcceptLanguageEnum } from "@/constants/language";
import type { LocaleJSON, TranslationResoure } from "@/types";

type LanguageKey = `${AcceptLanguageEnum}`;

const allKeys = Object.values(AcceptLanguageEnum);

const resources = allKeys.reduce((resrc, languageCode) => {
  resrc[languageCode] = {} as LocaleJSON;
  return resrc;
}, {} as TranslationResoure);
export default resources;

export function addTranslation(name: string, translation: TranslationResoure) {
  allKeys.forEach((languageCode) => {
    resources[AcceptLanguageEnum[languageCode as LanguageKey]][name] =
      translation[AcceptLanguageEnum[languageCode as LanguageKey]];
  });
}
