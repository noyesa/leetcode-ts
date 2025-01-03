import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * A node in a linked list.
 */
class ListNode<T> {
  val: T;
  next: ListNode<T> | null;

  /**
   * Initialize list node.
   * @param val - Value of the list node.
   * @param [next=null] - Next node in the list.
   */
  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val;
    this.next = next;
  }

  /**
   * Compares the values of two linked lists in order to determine whether they
   * contain the same values.
   * @param other - The other list to compare this with.
   * @returns Do the lists contain equal values?
   */
  isEqual(other: ListNode<T>): boolean {
    if (this === other) {
      return true;
    }

    if (!other) {
      return false;
    }

    let thisHead: ListNode<T> | null = this;
    let otherHead: ListNode<T> | null = other;
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
  static from<T>(array: T[]): ListNode<T> {
    if (array.length === 0) {
      throw new TypeError('cannot build linked list from empty array.');
    }
    return array.reduceRight(
      (nextNode: ListNode<T> | null, val) => new ListNode(val, nextNode),
      null,
    ) as ListNode<T>;
  }
}

describe('ListNode', () => {
  it('sets default values correctly', () => {
    const node = new ListNode(0);
    assert.equal(node.val, 0);
    assert.equal(node.next, null);
  });

  it('sets properties to the values passed to constructor', () => {
    const dummy = new ListNode(0);
    const node = new ListNode(10, dummy);
    assert.equal(node.val, 10);
    assert.equal(node.next, dummy);
  });

  describe('isEqual', () => {
    it('returns false if an unequal list is passed', () => {
      const list1 = ListNode.from([1, 2, 3]) as ListNode<number>;
      const list2 = ListNode.from([2, 3, 4]) as ListNode<number>;
      assert.equal(list1.isEqual(list2), false);
    });

    it('returns true if the same list is passed', () => {
      const list1 = ListNode.from([1, 2, 3]) as ListNode<number>;
      assert.ok(list1.isEqual(list1));
    });

    it('returns true if an equal list is passed', () => {
      const list1 = ListNode.from([1, 2, 3]) as ListNode<number>;
      const list2 = ListNode.from([1, 2, 3]) as ListNode<number>;
      assert.ok(list1.isEqual(list2));
    });
  });

  describe('from', () => {
    it('builds a linked list from an array', () => {
      const list = ListNode.from([4, 1, 2]);
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
        ListNode.from([]);
      });
    });
  });
});

/**
 * Adds together two numbers represented as reverse-order linked lists of their
 * digits.
 * @param num1 - The first number.
 * @param num2 - The second number.
 * @returns The sum of the first and second numbers.
 */
function addTwoNumbers(
  num1: ListNode<number>,
  num2: ListNode<number>,
): ListNode<number> | null {
  // Use dummy node so we can always append.
  const dummyNode = new ListNode(0);
  let out = dummyNode;

  let head1: ListNode<number> | null = num1;
  let head2: ListNode<number> | null = num2;
  let carry = false;
  while (head1 || head2) {
    let sum = 0;

    if (carry) {
      sum += 1;
      carry = false;
    }

    if (head1) {
      sum += head1.val;
      head1 = head1.next;
    }

    if (head2) {
      sum += head2.val;
      head2 = head2.next;
    }

    if (sum > 9) {
      sum -= 10;
      carry = true;
    }

    const newNode = new ListNode(sum);
    out.next = newNode;
    out = newNode;
  }

  if (carry) {
    out.next = new ListNode(1);
  }

  return dummyNode.next;
}

describe('addTwoNumbers', () => {
  it('example #1', () => {
    assert.ok(
      addTwoNumbers(
        ListNode.from([2, 4, 3]),
        ListNode.from([5, 6, 4]),
      )?.isEqual(ListNode.from([7, 0, 8])),
    );
  });

  it('example #2', () => {
    assert.ok(
      addTwoNumbers(ListNode.from([0]), ListNode.from([0]))?.isEqual(
        ListNode.from([0]),
      ),
    );
  });

  it('example #3', () => {
    const l1 = ListNode.from([9, 9, 9, 9, 9, 9, 9]);
    const l2 = ListNode.from([9, 9, 9, 9]);
    const result = addTwoNumbers(l1, l2);
    assert.ok(result?.isEqual(ListNode.from([8, 9, 9, 9, 0, 0, 0, 1])));
  });
});
