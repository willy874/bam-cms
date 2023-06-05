export function keyOf<T extends Record<string, unknown>>(value: T): (keyof T)[] {
  return Object.keys(value) as (keyof T)[];
}

export function fromNumberArray(value: number): number[] {
  return Array.from({ length: value }, (_, index) => index);
}

export function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && typeof value !== 'undefined';
}
