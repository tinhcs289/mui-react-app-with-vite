/**
 * An elegant wait to do async/await
 * @example 
   const [error, result] = await tryDo(getUser(id));
   if (error) {
     console.log(error);
   }
   // do next with result
 */
export default async function tryDo<T>(
  prom: ((...args: any[]) => Promise<T>) | Promise<T>,
  ...args: any[]
): Promise<[error: null, result: T] | [error: unknown, result: null]> {
  try {
    const result = await (typeof prom === "function" ? prom(...args) : prom);
    return [null, result as T];
  } catch (error) {
    return [error, null];
  }
}
