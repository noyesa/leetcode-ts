import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * A node in the trie.
 */
class TrieNode {
  /**
   * Does this node represent the end of a word?
   */
  isEnd: boolean = false;

  /**
   * Child characters of this node.
   */
  children: Map<string, TrieNode> = new Map();
}

/**
 * A trie data structure that stores strings.
 */
class Trie {
  /**
   * Reference to the root of the tree.
   */
  readonly root = new TrieNode();

  /**
   * Inserts a word into the trie.
   * @param word - The word to insert into the trie.
   */
  insert(word: string) {
    let head = this.root;
    for (const char of word) {
      if (head.children.has(char)) {
        head = head.children.get(char) as TrieNode;
      } else {
        const newNode = new TrieNode();
        head.children.set(char, newNode);
        head = newNode;
      }
    }

    // Mark the final node as the end.
    head.isEnd = true;
  }

  /**
   * Determines whether a word has been inserted into the trie.
   * @param word - The word to search for.
   * @returns Is the word in the tree?
   */
  search(word: string): boolean {
    const end = this.findEnd(word);
    return !!end && end.isEnd;
  }

  /**
   * Determines whether some word exists in the trie that starts with prefix.
   * @param prefix - The prefix to search for.
   * @returns Does a word with the prefix exist in the trie?
   */
  startsWith(prefix: string): boolean {
    return !!this.findEnd(prefix);
  }

  /**
   * Tries to find a node that represents the last character in the word. If no
   * node is found, null is returned.
   * @param word - The word to search for.
   * @returns A reference to the last node of the word, or null if not found.
   */
  findEnd(word: string): TrieNode | null {
    let head = this.root;
    for (const char of word) {
      const nextNode = head.children.get(char);
      if (nextNode) {
        head = nextNode;
      } else {
        return null;
      }
    }
    return head;
  }
}

describe('Trie', () => {
  it('solves example #1', () => {
    const trie = new Trie();
    trie.insert('apple');
    assert.equal(trie.search('apple'), true);
    assert.equal(trie.search('app'), false);
    assert.equal(trie.startsWith('app'), true);
    trie.insert('app');
    assert.equal(trie.search('app'), true);
  });
});
