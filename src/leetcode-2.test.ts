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
