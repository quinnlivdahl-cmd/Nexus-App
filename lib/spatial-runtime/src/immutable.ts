export function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function deepFreeze<T>(value: T): Readonly<T> {
  if (value === null || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);
  for (const child of Object.values(value)) {
    deepFreeze(child);
  }

  return value;
}

export function immutableCopy<T>(value: T): Readonly<T> {
  return deepFreeze(cloneValue(value));
}
