import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Given a string s, remove duplicate letters so that every letter appears once
 * and only once. You must make sure your result is the smallest in
 * lexicographical order among all possible results.
 * @param s - The string to remove duplidates from.
 * @returns The input string with duplicate characters removed.
 */
function removeDuplicateLetters(s: string): string {
  // Find the last index of each character.
  const lastIndices = new Map();
  for (let i = 0; i < s.length; ++i) {
    lastIndices.set(s.charAt(i), i);
  }

  const output = [];
  const seen = new Set();
  for (let i = 0; i < s.length; ++i) {
    const char = s.charAt(i);
    if (!seen.has(char)) {
      let top;
      while (
        output.length &&
        (top = output[output.length - 1]) > char &&
        i < lastIndices.get(top)
      ) {
        seen.delete(output.pop());
      }

      output.push(char);
      seen.add(char);
    }
  }
  return output.join('');
}

describe('removeDuplicateLetters', () => {
  it('solves example #1', () => {
    const s = 'bcabc';
    assert.equal(removeDuplicateLetters(s), 'abc');
  });

  it('solves example #2', () => {
    const s = 'cbacdcbc';
    assert.equal(removeDuplicateLetters(s), 'acdb');
  });
});
