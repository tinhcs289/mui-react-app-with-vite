import { RHFSelect } from "@/components/form/input-array/Select";
import { required } from "@/helpers/react-hook-form-helpers";
import type { Option } from "@/types";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldSelect() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFSelect
      control={control}
      name="singleSelectfield"
      label="Nhập liệu dạng lựa chọn"
      placeholder="Lựa chọn 1 giá trị"
      rules={required(t("common:pleaseSelect"))}
      options={Object.keys([...Array(10)]).map(
        (i) =>
          ({
            value: `value_${+i + 1}`,
            label: `lựa chọn số ${+i + 1}`,
          } as Option)
      )}
    />
  );
}
