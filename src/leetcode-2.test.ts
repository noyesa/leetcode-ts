import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * A node in a linked list.
 */
class ListNode {
  val: number;
  next: ListNode | null;

  /**
   * Initialize list node.
   * @param [val=0] - Value of the list node.
   * @param [next=null] - Next node in the list.
   */
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }

  /**
   * Compares the values of two linked lists in order to determine whether they
   * contain the same values.
   * @param other - The other list to compare this with.
   * @returns Do the lists contain equal values?
   */
  isEqual(other: ListNode): boolean {
    if (this === other) {
      return true;
    }

    let thisHead: ListNode | null = this;
    let otherHead: ListNode | null = other;
    while (thisHead && otherHead) {
      if (thisHead.val !== otherHead.val) {
        return false;
      }
      thisHead = thisHead.next;
      otherHead = otherHead.next;
    }

    return !(thisHead || otherHead);
  }

  /**
   * Builds a linked list of numbers from an array of numbers.
   * @param array - Array to convert to linked list.
   * @returns Linked list created from values in array.
   */
  static fromArray(array: number[]): ListNode {
    if (array.length === 0) {
      throw new TypeError('cannot build linked list from empty array.');
    }
    return array.reduceRight(
      (nextNode: ListNode | null, val) => new ListNode(val, nextNode),
      null,
    ) as ListNode;
  }
}

describe('ListNode', () => {
  it('sets default values correctly', () => {
    const node = new ListNode();
    assert.equal(node.val, 0);
    assert.equal(node.next, null);
  });

  it('sets properties to the values passed to constructor', () => {
    const dummy = new ListNode();
    const node = new ListNode(10, dummy);
    assert.equal(node.val, 10);
    assert.equal(node.next, dummy);
  });

  describe('isEqual', () => {
    it('returns false if an unequal list is passed', () => {
      const list1 = ListNode.fromArray([1, 2, 3]) as ListNode;
      const list2 = ListNode.fromArray([2, 3, 4]) as ListNode;
      assert.equal(list1.isEqual(list2), false);
    });

    it('returns true if the same list is passed', () => {
      const list1 = ListNode.fromArray([1, 2, 3]) as ListNode;
      assert.ok(list1.isEqual(list1));
    });

    it('returns true if an equal list is passed', () => {
      const list1 = ListNode.fromArray([1, 2, 3]) as ListNode;
      const list2 = ListNode.fromArray([1, 2, 3]) as ListNode;
      assert.ok(list1.isEqual(list2));
    });
  });

  describe('fromArray', () => {
    it('builds a linked list from an array', () => {
      const list = ListNode.fromArray([4, 1, 2]);
      // The list was created.
      assert.ok(list);

      // It has the correct values.
      assert.equal(list?.val, 4);
      assert.equal(list?.next?.val, 1);
      assert.equal(list?.next?.next?.val, 2);

      // The final element in the list has a null next pointer.
      assert.equal(list?.next?.next?.next, null);
    });

    it('throws when an empty array is passed', () => {
      assert.throws(() => {
        ListNode.fromArray([]);
      });
    });
  });
});

describe('addTwoNumbers', () => {});
