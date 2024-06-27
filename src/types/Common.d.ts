export type AnyObject = { [x: string]: any };

export type BaseOn<T extends AnyObject = AnyObject> = T & AnyObject;

export type ElementOf<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type AwaitedReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

export type PartialOrNullable<T extends object> = {
  [K in keyof T]: T[K] | null | undefined;
};
