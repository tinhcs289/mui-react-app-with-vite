import type { ObjectSchema } from "yup";

export function does<T extends object>(value?: T | null) {
  return {
    matchWith(schema: ObjectSchema<T>) {
      if (!value) return false;
      if (!schema) return false;
      try {
        schema.validateSync(value);
        return true;
      } catch (error) {
        return false;
      }
    },
  };
}

export default function isValidAsYupSchema<T extends object>(
  value: T | null,
  schema: ObjectSchema<T>
) {
  if (!value) return false;
  if (!schema) return false;
  try {
    schema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
}
