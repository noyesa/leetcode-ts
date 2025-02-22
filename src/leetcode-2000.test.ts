import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Reverses an array between two indices.
 * @param array - The array within which to reverse elements.
 * @param start - The start index of the reversal.
 * @param end - The end index of the reversal.
 */
function reverseBetween<T>(array: Array<T>, start: number, end: number) {
  for (let i = start, j; i < (j = end - i); ++i) {
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Reverses all the words in a string up until the first occurence of ch.
 * @param word - The word.
 * @param ch - The character to reverse up to.
 * @returns The input word with the prefix reversed if it exists.
 */
function reversePrefix(word: string, ch: string): string {
  const chIndex = word.indexOf(ch);
  if (chIndex === -1) {
    return word;
  } else {
    const output = Array.from(word);
    reverseBetween(output, 0, chIndex);
    return output.join('');
  }
}

describe('reversePrefix', () => {
  it('solves example #1', () => {
    const word = 'abcdefd';
    const ch = 'd';
    assert.equal(reversePrefix(word, ch), 'dcbaefd');
  });

  it('solves example #2', () => {
    const word = 'xyxzxe';
    const ch = 'z';
    assert.equal(reversePrefix(word, ch), 'zxyxxe');
  });

  it('solves example #3', () => {
    const word = 'abcd';
    const ch = 'z';
    assert.equal(reversePrefix(word, ch), 'abcd');
  });
});
