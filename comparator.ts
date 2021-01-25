export type ComparatorFunction<T> = (a: T, b: T) => -1 | 0 | 1;

export class Comparator<T> {
  compare: ComparatorFunction<T>;

  constructor(compareFunction?: ComparatorFunction<T | null>) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction<T>(a: T | null, b: T | null) {
    if (a === b) return 0;

    return a < b ? -1 : 1;
  }

  equal(a: T | null, b: T | null) {
    return this.compare(a, b) === 0;
  }

  lessThan(a: T | null, b: T | null) {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: T | null, b: T | null) {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: T | null, b: T | null) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a: T | null, b: T | null) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a: T, b: T) => compareOriginal(b, a);
  }
}
