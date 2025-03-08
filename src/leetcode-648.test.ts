import { describe, it } from 'node:test';
import assert from 'node:assert';

class TrieNode {
  /**
   * The full string this node represents in the trie.
   */
  value: string;

  /**
   * Indicates whether this node was the end of a full word.
   */
  isEnd: boolean = false;

  /**
   * Maps to characters that can follow this character.
   */
  children: Map<string, TrieNode> = new Map();

  constructor(value: string) {
    this.value = value;
  }
}

class Trie {
  /**
   * The root of the trie.
   */
  readonly root = new TrieNode('');

  /**
   * Inserts words into the trie.
   * @param words - Words to be inserted into the trie.
   */
  insert(...words: string[]) {
    for (const word of words) {
      let head = this.root;
      let current = '';
      for (const char of word) {
        current += char;
        const node = head.children.get(char);
        if (node) {
          head = node;
        } else {
          const newNode = new TrieNode(current);
          head.children.set(char, newNode);
          head = newNode;
        }
      }
      head.isEnd = true;
    }
  }

  /**
   * Determines whether a word is present in the trie.
   * @param word - The word to check for existence.
   * @returns Is the word in the trie?
   */
  has(word: string): boolean {
    return !!this.#findEnd(word)?.isEnd;
  }

  /**
   * Finds the shortest prefix for a word.
   * @param word - The word to find prefix of.
   * @returns The shortest prefix of the word that is a full word.
   */
  findShortestPrefixWord(word: string): string | null {
    let head = this.root;
    for (const char of word) {
      const node = head.children.get(char);
      if (node) {
        if (node.isEnd) {
          return node.value;
        } else {
          head = node;
        }
      } else {
        return null;
      }
    }
    return null;
  }

  /**
   * Finds the node for the last character in a word.
   * @param word - The word for which to find the node of the last character.
   * @returns The node for the last character.
   */
  #findEnd(word: string): TrieNode | null {
    let head = this.root;
    for (const char of word) {
      const node = head.children.get(char);
      if (node) {
        head = node;
      } else {
        return null;
      }
    }
    return head;
  }
}

describe('Trie', () => {
  it('allows inserting and checking for existence of keys', () => {
    const trie = new Trie();
    trie.insert('foo');
    assert.equal(trie.has('foo'), true);

    // Allows inserting multiple words in one call.
    trie.insert('bar', 'baz');
    assert.equal(trie.has('bar'), true);
    assert.equal(trie.has('baz'), true);

    // Things not inserted return false.
    assert.equal(trie.has('buzz'), false);
  });

  describe('findShortestPrefixWord', () => {
    it('finds the shortest prefix for an input word that is also a word', () => {
      const trie = new Trie();
      trie.insert('foo');

      assert.equal(trie.findShortestPrefixWord('foobar'), 'foo');
    });
  });
});

/**
 * Given a dictionary consisting of many roots and a sentence consisting of
 * words separated by spaces, replace all the derivatives in the sentence with
 * the root forming it.
 * @param dictionary - The roots of words to replace derivatives with.
 * @param sentence - The sentence to replace derivatives in.
 * @returns The sentence with the derivatives swapped out with roots.
 */
function replaceWords(dictionary: string[], sentence: string): string {
  const dictTrie = new Trie();
  dictTrie.insert(...dictionary);
  return sentence
    .split(' ')
    .map((word) => dictTrie.findShortestPrefixWord(word) ?? word)
    .join(' ');
}

describe('replaceWords', () => {
  it('solves example #1', () => {
    const dictionary = ['cat', 'bat', 'rat'];
    const sentence = 'the cattle was rattled by the battery';
    assert.equal(
      replaceWords(dictionary, sentence),
      'the cat was rat by the bat',
    );
  });

  it('solves example #2', () => {
    const dictionary = ['a', 'b', 'c'];
    const sentence = 'aadsfasf absbs bbab cadsfafs';
    assert.equal(replaceWords(dictionary, sentence), 'a a b c');
  });
});
