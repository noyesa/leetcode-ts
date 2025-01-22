import { describe, it } from 'node:test';
import assert from 'node:assert';

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number = 0,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  clone(): TreeNode {
    const clone = new TreeNode(this.val);
    if (this.left) {
      clone.left = this.left.clone();
    }
    if (this.right) {
      clone.right = this.right.clone();
    }
    return clone;
  }
}

describe('TreeNode', () => {
  describe('clone', () => {
    it('makes a copy of the node', () => {
      const node = new TreeNode(3);
      const clone = node.clone();
      assert.notEqual(clone, node);
      assert.equal(node.val, clone.val);
    });

    it('makes a deep copy of the node', () => {
      const leftNode = new TreeNode(4);
      const rightNode = new TreeNode(6);
      const topNode = new TreeNode(5, leftNode, rightNode);
      const clone = topNode.clone();

      assert.notEqual(clone, topNode);
      assert.equal(clone.val, topNode.val);
      assert.notEqual(clone.left, leftNode);
      assert.equal(clone.left?.val, leftNode.val);
      assert.notEqual(clone.right, rightNode);
      assert.equal(clone.right?.val, rightNode.val);
    });
  });
});

function getTargetCopy(
  original: TreeNode | null,
  cloned: TreeNode | null,
  target: TreeNode | null,
): TreeNode | null {
  if (target === null || original === null || cloned === null) {
    return null;
  }

  const oStack = [original];
  const cStack = [cloned];

  /**
   * Push values into one of the stacks. Handles null checking.
   * @param stack - The stack to push non-null values into
   * @param values - Values to push into the stack
   */
  function pushIf(stack: TreeNode[], ...values: (TreeNode | null)[]) {
    for (const value of values) {
      if (value !== null) {
        stack.push(value);
      }
    }
  }

  /**
   * Pops values and returns values as array.
   * @param stacks - The stacks to pop a value from
   * @returns An array of treenodes popped off the stacks.
   */
  function popStacks(...stacks: TreeNode[][]) {
    return stacks.map((s) => s.pop());
  }

  while (oStack.length) {
    const [oNode, cNode] = popStacks(oStack, cStack);

    if (oNode === undefined || cNode === undefined) {
      return null;
    }

    if (oNode === target) {
      return cNode;
    }

    pushIf(oStack, oNode.left, oNode.right);
    pushIf(cStack, cNode.left, cNode.right);
  }

  return null;
}

describe('getTargetCopy', () => {
  it('solves example #1', () => {
    const target = new TreeNode(3, new TreeNode(6), new TreeNode(19));
    const tree = new TreeNode(7, new TreeNode(4), target);

    const clone = tree.clone();
    const result = getTargetCopy(tree, clone, target);

    assert.ok(result);
    assert.notEqual(result, target);
    assert.equal(target.val, result.val);
  });

  it('solves example #2', () => {
    const tree = new TreeNode(7);
    const clone = tree.clone();

    const result = getTargetCopy(tree, clone, tree);
    assert.notEqual(result, tree);
    assert.equal(result?.val, 7);
  });

  it('solves example #3', () => {
    const target = new TreeNode(
      4,
      null,
      new TreeNode(3, null, new TreeNode(2, null, new TreeNode(1))),
    );
    const tree = new TreeNode(
      8,
      null,
      new TreeNode(6, null, new TreeNode(5, null, target)),
    );

    const result = getTargetCopy(tree, tree.clone(), target);
    assert.ok(result);
    assert.notEqual(result, target);
    assert.equal(result?.val, 4);
  });
});
