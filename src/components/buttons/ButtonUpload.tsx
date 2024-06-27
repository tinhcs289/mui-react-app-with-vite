import type { ChangeEventHandler } from "react";
import { useCallback } from "react";
import type { ButtonCommonProps } from "./ButtonCommon";
import ButtonCommon from "./ButtonCommon";

export type ButtonUploadProps = ButtonCommonProps & {
  multiple?: boolean;
  onUpload?: (files: Array<File>) => void;
};

export default function ButtonUpload(props: ButtonUploadProps) {
  const { children, onUpload, multiple = false, ...otherProps } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (!event?.target?.files) return;
      const files = event.target.files;
      if (!files) return;
      onUpload?.(Array.from(files));
      event.target.files = null;
    },
    [onUpload]
  );

  return (
    <ButtonCommon component="label" {...otherProps}>
      <input type="file" hidden onChange={handleChange} multiple={multiple} />
      {children}
    </ButtonCommon>
  );
}
