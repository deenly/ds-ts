import { LinkedList } from "./linked_list.ts";

export class Queue<T> {
  linkedList: LinkedList<T>;

  constructor() {
    // We're going to implement Queue based on LinkedList since the two
    // structures are quite similar. Namely, they both operate mostly on
    // the elements at the beginning and the end. Compare enqueue/dequeue
    // operations of Queue with append/deleteHead operations of LinkedList.
    this.linkedList = new LinkedList();
  }

  /**
   * @return {boolean}
   */
  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  /**
   * Read the element at the front of the queue without removing it.
   * @return {*}
   */
  peek(): T | null {
    if (!this.linkedList.head) return null;

    return this.linkedList.head!.value;
  }

  /**
   * Add a new element to the end of the queue (the tail of the linked list).
   * This element will be processed after all element ahead of it.
   * @param {*} value
   */
  enqueue(value: T) {
    this.linkedList.append(value);
  }

  /**
   * Remove the element at front of the queue (the head of the linked list).
   * If the queue is empty, return null.
   * @return {*}
   */
  dequeue(): T | null {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * @param {function} callback
   * @return {string}
   */
  toString(callback?: (value: T) => string): string {
    // Return string representation of the queue's linked list.
    return this.linkedList.toString(callback);
  }
}
