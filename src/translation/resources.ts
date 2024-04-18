import { AcceptLanguageEnum } from "@/constants/language";
import type { LocaleJSON, TTranslation } from "@/types";

type TLanguageKey = `${AcceptLanguageEnum}`;

const allKeys = Object.values(AcceptLanguageEnum);

const resources = allKeys.reduce((resrc, languageCode) => {
  resrc[languageCode] = {} as LocaleJSON;
  return resrc;
}, {} as TTranslation);
export default resources;

export const addTranslation = (name: string, translation: TTranslation) => {
  allKeys.forEach((languageCode) => {
    resources[AcceptLanguageEnum[languageCode as TLanguageKey]][name] =
      translation[AcceptLanguageEnum[languageCode as TLanguageKey]];
  });
};
