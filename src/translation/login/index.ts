import { AcceptLanguageEnum } from "@/constants/language";
import type { TTranslation } from "@/types";
import en from "./en-US.json";
import vi from "./vi-VN.json";

export default {
  [AcceptLanguageEnum["en-US"]]: en,
  [AcceptLanguageEnum["vi-VN"]]: vi,
} as TTranslation;
