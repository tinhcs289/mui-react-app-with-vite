import { i18nLanguage } from "@/browser/local-storage/acceptLanguage";
import { DATETIME_LOCALE, LANGUAGE_DEFAULT } from "@/constants/language";
import type { LocalizationProviderProps } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import type { Moment } from "moment";
import moment from "moment";
import "moment/locale/en-gb";
import "moment/locale/vi";

export type DateTimeProviderProps = Omit<
  LocalizationProviderProps<Moment, string>,
  "dateAdapter" | "moment" | "locale"
>;

const locale = DATETIME_LOCALE[i18nLanguage.get() || LANGUAGE_DEFAULT];

moment.locale(locale);
console.log("Moment initialized");

export default function DateTimeProvider(props: DateTimeProviderProps) {
  const { children, ...otherProps } = props;
  return (
    <LocalizationProvider
      {...otherProps}
      dateAdapter={AdapterMoment}
      adapterLocale={locale}
    >
      {children}
    </LocalizationProvider>
  );
}
