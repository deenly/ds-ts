import { Comparator } from "./comparator.ts";
import type { ComparatorFunction } from "./comparator.ts";

export class LinkedListNode<T> {
  value: T | null;
  next: LinkedListNode<T> | null;

  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback?: (value: T | null) => void) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
  compare: Comparator<T>;

  /**
   * @param {function} compareFunction
   */
  constructor(compareFunction?: ComparatorFunction<T>) {
    /** @var LinkedListNode */
    this.head = null;

    this.tail = null;

    this.compare = new Comparator<T>(compareFunction);
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  append(value: T): LinkedList<T> {
    const newNode = new LinkedListNode(value);

    // if there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  prepend(value: T): LinkedList<T> {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedListNode}
   */
  delete(value: T): LinkedListNode<T> | null {
    if (!this.head) return null;

    let deleteNode: LinkedListNode<T> | null = null;

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deleteNode;
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find(
    { value, callback }: { value?: T; callback?: (value: T) => boolean },
  ): LinkedListNode<T> {
    if (!this.head) return null;

    let currentNode = this.head;

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) return currentNode;

      // If value is specified then try to compare by value.
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode?.next;
    }

    return null;
  }

  /**
   * @return {LinkedListNode}
   */
  deleteTail(): LinkedListNode<T> | null {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * @return {LinkedListNode}
   */
  deleteHead(): LinkedListNode<T> {
    if (!this.head) {
      return null;
    }

    const deletedHead: LinkedListNode<T> = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   */
  fromArray(values: T[]): LinkedList<T> {
    values.forEach((value) => this.append(value));

    return this;
  }

  /**
   * @return {LinkedListNode[]}
   */
  toArray() {
    const nodes: LinkedListNode<T>[] = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback?: (value: T) => void): string {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }

  /**
   * Reverse a linked list.
   * @return {LinkedList}
   */
  reverse(): LinkedList<T> {
    let currNode: LinkedListNode<T> = this.head;
    let prevNode: LinkedListNode<T> = null;
    let nextNode: LinkedListNode<T> = null;

    while (currNode) {
      // Store next node.
      nextNode = currNode.next;

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
