import { RHFSwitchWithLabel } from "@/components/form/input-boolean/SwitchWithLabel";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldSwitch() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFSwitchWithLabel
      control={control}
      name="swithfield"
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      rules={required(t("common:pleaseSelect"))}
    />
  );
}
