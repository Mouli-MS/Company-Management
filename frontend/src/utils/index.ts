export function safeStringify(obj: any, replacer: any = null, space: number | undefined = 2) {
  try {
    return JSON.stringify(obj, replacer, space);
  } catch {
    return String(obj);
  }
}
