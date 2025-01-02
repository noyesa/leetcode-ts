import { describe, it } from 'node:test';
import assert from 'node:assert';

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

describe('ListNode', () => {
  it('sets default values correctly', () => {
    const node = new ListNode();
    assert.equal(node.val, 0);
    assert.equal(node.next, null);
  });
});
