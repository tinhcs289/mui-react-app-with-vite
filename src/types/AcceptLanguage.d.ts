import { AcceptLanguageEnum } from "@/constants/language";
export type AcceptLanguage = `${AcceptLanguageEnum}`;
export type LocaleJSON = { [x: string]: string | LocaleJSON };
export type TranslationResoure = Record<AcceptLanguageEnum, LocaleJSON>;
