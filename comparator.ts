export type ComparatorFunction<T> = (a: T, b: T) => -1 | 0 | 1;

export class Comparator<T> {
  compare: ComparatorFunction<T>;

  /**
   * @param {ComparatorFunction} [compareFunction] - It may be custom compare function that, let's
   * say may compare custom object together
   */
  constructor(compareFunction?: ComparatorFunction<T>) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
   * @param {(string | number)} a
   * @param {(string | number)} b
   */
  // TODO: Need to replace the type?
  static defaultCompareFunction<T>(a: T, b: T) {
    if (a === b) return 0;

    return a < b ? -1 : 1;
  }

  /**
   * Check if two variables are equal.
   * @param {*} a
   * @param {*} b
   */
  equal(a: T, b: T) {
    return this.compare(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b".
   * @param {*} a
   * @param {*} b
   */
  lessThan(a: T, b: T) {
    return this.compare(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b".
   * @param {*} a
   * @param {*} b
   */
  greaterThan(a: T, b: T) {
    return this.compare(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * @param a
   * @param b
   */
  lessThanOrEqual(a: T, b: T) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * @param {*} a
   * @param {*} b
   */
  greaterThanOrEqual(a: T, b: T) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * Reverses the comparison order.
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a: T, b: T) => compareOriginal(b, a);
  }
}
