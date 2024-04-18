export type AnyObject = { [x: string]: any };

export type BaseOn<T extends AnyObject = AnyObject> = T & AnyObject;
