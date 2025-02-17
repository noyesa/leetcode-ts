import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Swaps two items in an array.
 * @param list - The list within which to swap items.
 * @param i - The first index.
 * @param j - The second index.
 */
function swap<T>(list: Array<T>, i: number, j: number) {
  [list[i], list[j]] = [list[j], list[i]];
}

describe('swap', () => {
  it('swaps the values of two items in the array', () => {
    const list = [1, 2, 3, 4];
    swap(list, 1, 3);
    assert.deepEqual(list, [1, 4, 3, 2]);
  });
});

/**
 * Reverses the order of words in a string.
 * @param s - The string within which to reverse all words.
 * @returns A string containing the words of the input in reverse order.
 */
function reverseWords(s: string): string {
  const words = s.trim().split(/\s+/);
  let i = 0;
  let j = words.length - 1;
  while (i < j) {
    swap(words, i++, j--);
  }
  return words.join(' ');
}

describe('reverseWords', () => {
  it('solves example #1', () => {
    const s = 'the sky is blue';
    assert.equal(reverseWords(s), 'blue is sky the');
  });

  it('solves example #2', () => {
    const s = '  hello world  ';
    assert.equal(reverseWords(s), 'world hello');
  });

  it('solves example #3', () => {
    const s = 'a good   example';
    assert.equal(reverseWords(s), 'example good a');
  });
});
