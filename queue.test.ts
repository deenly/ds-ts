import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { Queue } from "./queue.ts";

Deno.test("should create empty queue", () => {
  const queue = new Queue();
  assertNotEquals(queue, null);
  assertNotEquals(queue.linkedList, null);
});

Deno.test("should enqueue data to queue", () => {
  const queue = new Queue<number>();

  queue.enqueue(1);
  queue.enqueue(2);

  assertEquals(queue.toString(), "1,2");
});

interface ObjectType {
  value: string;
  key: string;
}

Deno.test("should be possible to enqueue/dequeue objects", () => {
  const queue = new Queue<ObjectType>();

  queue.enqueue({ value: "test1", key: "key1" });
  queue.enqueue({ value: "test2", key: "key2" });

  const stringifier = ({ value, key }: ObjectType) => `${key}:${value}`;

  assertEquals(queue.toString(stringifier), "key1:test1,key2:test2");
  assertEquals(queue.dequeue()?.value, "test1");
  assertEquals(queue.dequeue()?.value, "test2");
});

Deno.test("should peek data from queue", () => {
  const queue = new Queue<number>();

  assertEquals(queue.peek(), null);

  queue.enqueue(1);
  queue.enqueue(2);

  assertEquals(queue.peek(), 1);
  assertEquals(queue.peek(), 1);
});

Deno.test("should check if queue is empty", () => {
  const queue = new Queue<number>();

  assertEquals(queue.isEmpty(), true);

  queue.enqueue(1);

  assertEquals(queue.isEmpty(), false);
});

Deno.test("should dequeue from queue in FIFO order", () => {
  const queue = new Queue<number>();

  queue.enqueue(1);
  queue.enqueue(2);

  assertEquals(queue.dequeue(), 1);
  assertEquals(queue.dequeue(), 2);
  assertEquals(queue.dequeue(), null);
  assertEquals(queue.isEmpty(), true);
});
