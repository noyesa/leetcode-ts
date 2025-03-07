import { describe, it } from 'node:test';
import assert from 'node:assert';

class TrieNode {
  /**
   * Value associated with the current key.
   */
  value: number | null = null;

  /**
   * Children of the current prefix.
   */
  children: Map<string, TrieNode> = new Map();

  /**
   * Computes the sum of this and all child nodes that represent values
   * inserted into the trie.
   * @returns The sum of this and all child words.
   */
  sum(): number {
    let sum = this.value ?? 0;
    for (const child of this.children.values()) {
      sum += child.sum();
    }
    return sum;
  }
}

class MapSum {
  readonly root = new TrieNode();

  /**
   * Inserts a string into the trie and associates it with a value.
   * @param key - The key to insert
   * @param value - The value to associate with key.
   */
  insert(key: string, value: number) {
    let head = this.root;
    for (const char of key) {
      const node = head.children.get(char);
      if (node) {
        head = node;
      } else {
        const newNode = new TrieNode();
        head.children.set(char, newNode);
        head = newNode;
      }
    }

    head.value = value;
  }

  /**
   * Gets the sum of all keys under a prefix.
   * @param prefix - The prefix string to find sum of.
   * @returns The sum of all keys under this prefix.
   */
  sum(prefix: string): number {
    // First, find the last node of the prefix.
    let head = this.root;
    for (const char of prefix) {
      const nextNode = head.children.get(char);
      if (nextNode) {
        head = nextNode;
      } else {
        return 0;
      }
    }

    return head.sum();
  }
}

describe('MapSum', () => {
  it('solves example #1', () => {
    const mapSum = new MapSum();
    mapSum.insert('apple', 3);
    const newLocal = mapSum.sum('ap');
    assert.equal(newLocal, 3);
    mapSum.insert('app', 2);
    assert.equal(mapSum.sum('ap'), 5);
  });
});
