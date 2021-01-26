import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { LinkedList } from "./linked_list.ts";

Deno.test("should create empty linked list", () => {
  const linkedList = new LinkedList();
  assertEquals(linkedList.toString(), "");
});

Deno.test("should append node to linked list", () => {
  const linkedList = new LinkedList();

  assertEquals(linkedList.head, null);
  assertEquals(linkedList.tail, null);

  linkedList.append(1);
  linkedList.append(2);

  assertEquals(linkedList.toString(), "1,2");
  assertEquals(linkedList.tail.next, null);
});

Deno.test("should prepend node to linked list", () => {
  const linkedList = new LinkedList();

  linkedList.prepend(2);
  assertEquals(linkedList.head.value, 2);
  assertEquals(linkedList.tail.value, 2);

  linkedList.append(1);
  linkedList.prepend(3);

  assertEquals(linkedList.toString(), "3,2,1");
});

Deno.test("should delete node by value from linked list", () => {
  const linkedList = new LinkedList();

  assertEquals(linkedList.delete(5), null);

  linkedList.append(1);
  linkedList.append(1);
  linkedList.append(2);
  linkedList.append(3);
  linkedList.append(3);
  linkedList.append(3);
  linkedList.append(4);
  linkedList.append(5);

  assertEquals(linkedList.head.toString(), "1");
  assertEquals(linkedList.tail.toString(), "5");

  const deleteNode = linkedList.delete(3);
  assertEquals(deleteNode.value, 3);
  assertEquals(linkedList.toString(), "1,1,2,4,5");

  linkedList.delete(3);
  assertEquals(linkedList.toString(), "1,1,2,4,5");

  linkedList.delete(1);
  assertEquals(linkedList.toString(), "2,4,5");

  assertEquals(linkedList.head.toString(), "2");
  assertEquals(linkedList.tail.toString(), "5");

  linkedList.delete(5);
  assertEquals(linkedList.toString(), "2,4");

  assertEquals(linkedList.head.toString(), "2");
  assertEquals(linkedList.tail.toString(), "4");

  linkedList.delete(4);
  assertEquals(linkedList.toString(), "2");

  assertEquals(linkedList.head.toString(), "2");
  assertEquals(linkedList.tail.toString(), "2");

  linkedList.delete(2);
  assertEquals(linkedList.toString(), "");

  assertEquals(linkedList.head, null);
  assertEquals(linkedList.tail, null);
});

Deno.test("should delete linked list tail", () => {
  const linkedList = new LinkedList();

  linkedList.append(1);
  linkedList.append(2);
  linkedList.append(3);

  assertEquals(linkedList.head.toString(), "1");
  assertEquals(linkedList.tail.toString(), "3");

  const deletedNode1 = linkedList.deleteTail();

  assertEquals(deletedNode1.value, 3);
  assertEquals(linkedList.toString(), "1,2");
  assertEquals(linkedList.head.toString(), "1");
  assertEquals(linkedList.tail.toString(), "2");

  const deletedNode2 = linkedList.deleteTail();

  assertEquals(deletedNode2.value, 2);
  assertEquals(linkedList.toString(), "1");
  assertEquals(linkedList.head.toString(), "1");
  assertEquals(linkedList.tail.toString(), "1");

  const deletedNode3 = linkedList.deleteTail();

  assertEquals(deletedNode3.value, 1);
  assertEquals(linkedList.toString(), "");
  assertEquals(linkedList.head, null);
  assertEquals(linkedList.tail, null);
});

Deno.test("should delete linked head", () => {
  const linkedList = new LinkedList();

  assertEquals(linkedList.deleteHead(), null);

  linkedList.append(1);
  linkedList.append(2);

  assertEquals(linkedList.head.toString(), "1");
  assertEquals(linkedList.tail.toString(), "2");

  const deletedNode1 = linkedList.deleteHead();

  assertEquals(deletedNode1.value, 1);
  assertEquals(linkedList.toString(), "2");
  assertEquals(linkedList.head.toString(), "2");
  assertEquals(linkedList.tail.toString(), "2");

  const deletedNode2 = linkedList.deleteHead();

  assertEquals(deletedNode2.value, 2);
  assertEquals(linkedList.toString(), "");
  assertEquals(linkedList.head, null);
  assertEquals(linkedList.tail, null);
});

Deno.test("should be possible to store objects in the list and to print them out", () => {
  const linkedList = new LinkedList();

  const nodeValue1 = { value: 1, key: "key1" };
  const nodeValue2 = { value: 2, key: "key2" };

  linkedList.append(nodeValue1).prepend(nodeValue2);

  const nodeStringifier = (value) => `${value.key}:${value.value}`;

  assertEquals(linkedList.toString(nodeStringifier), "key2:2,key1:1");
});

Deno.test("should find node by value", () => {
  const linkedList = new LinkedList();

  assertEquals(linkedList.find({ value: 5 }), null);

  linkedList.append(1);
  assertNotEquals(linkedList.find({ value: 1 }), null);

  linkedList.append(2).append(3);

  const node = linkedList.find({ value: 2 });

  assertEquals(node.value, 2);
  assertEquals(linkedList.find({ value: 5 }), null);
});

Deno.test("should find node by callback", () => {
  const linkedList = new LinkedList();

  linkedList.append({ value: 1, key: "test1" });
  linkedList.append({ value: 2, key: "test2" });
  linkedList.append({ value: 3, key: "test3" });

  const node = linkedList.find({ callback: (value) => value.key === "test2" });

  assertNotEquals(node, null);
  assertEquals(node.value.value, 2);
  assertEquals(node.value.key, "test2");
  assertEquals(
    linkedList.find({ callback: (value) => value.key === "test5" }),
    null,
  );
});

Deno.test("should create linked list from array", () => {
  const linkedList = new LinkedList();
  linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

  assertEquals(linkedList.toString(), "1,1,2,3,3,3,4,5");
});

interface CustomType {
  value: number;
  customValue: string;
}

Deno.test("should find node by means of custom compare function", () => {
  const comparatorFunction = (a: CustomType, b: CustomType) => {
    if (a.customValue === b.customValue) {
      return 0;
    }

    return a.customValue < b.customValue ? -1 : 1;
  };

  const linkedList = new LinkedList<CustomType>(comparatorFunction);

  linkedList.append({ value: 1, customValue: "test1" });
  linkedList.append({ value: 2, customValue: "test2" });
  linkedList.append({ value: 3, customValue: "test3" });

  const node = linkedList.find({
    value: { value: 2, customValue: "test2" },
  });

  assertNotEquals(node, null);
  assertEquals(node.value.value, 2);
  assertEquals(node.value.customValue, "test2");
  assertEquals(
    linkedList.find({ value: { value: 2, customValue: "test5" } }),
    null,
  );
});

Deno.test("should find preferring callback over compare function", () => {
  const greaterThan = (value, compareTo) => (value > compareTo ? 0 : 1);

  const linkedList = new LinkedList<number>(greaterThan);
  linkedList.fromArray([1, 2, 3, 4, 5]);

  let node = linkedList.find({ value: 3 });
  assertEquals(node.value, 4);

  node = linkedList.find({ callback: (value: number) => value < 3 });
  assertEquals(node.value, 1);
});

Deno.test("should covert to array", () => {
  const linkedList = new LinkedList();
  linkedList.append(1);
  linkedList.append(2);
  linkedList.append(3);
  assertEquals(linkedList.toArray().join(","), "1,2,3");
});

Deno.test("should reverse linked list", () => {
  const linkedList = new LinkedList();

  // Add test values to linked list.
  linkedList.append(1).append(2).append(3);

  assertEquals(linkedList.toString(), "1,2,3");
  assertEquals(linkedList.head.value, 1);
  assertEquals(linkedList.tail.value, 3);

  // Reverse linked list.
  linkedList.reverse();
  assertEquals(linkedList.toString(), "3,2,1");
  assertEquals(linkedList.head.value, 3);
  assertEquals(linkedList.tail.value, 1);

  // Reverse linked list back to initial state.
  linkedList.reverse();
  assertEquals(linkedList.toString(), "1,2,3");
  assertEquals(linkedList.head.value, 1);
  assertEquals(linkedList.tail.value, 3);
});
