import { RHFRadioGroup } from "@/components/form/input-array/RadioGroup";
import { required } from "@/helpers/react-hook-form-helpers";
import type { Option } from "@/types";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

const options: Option[] = Object.keys([...Array(4)]).map(
  (i) =>
    ({
      value: `value_${+i + 1}`,
      label: `${
        +i + 1
      }. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`,
    } as Option)
);

export default function FieldRadioGroup() {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <RHFRadioGroup
      control={control}
      name="radiogroupfield"
      label="Lựa chọn giá trị"
      rules={required(t("common:pleaseSelect"))}
      options={options}
    />
  );
}
