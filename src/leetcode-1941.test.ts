import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Given a string s, return true if s is a "good" string, or false otherwise.
 * A string is a "good" string if all the characters that appear in s have the
 * same number of occurrences. (i.e., the same frequency).
 * @param s - The string to check frequency of characters.
 * @returns Is the string a "good" string?
 */
function areOccurrencesEqual(s: string): boolean {
  const counts = new Array(26).fill(0);
  for (let i = 0; i < s.length; ++i) {
    ++counts[s.charCodeAt(i) - 'a'.charCodeAt(0)];
  }
  const [expectation] = counts;
  return counts.slice(1).every((count) => count === expectation);
}

describe('areOccurrencesEqual', () => {
  it('solves example #1', () => {
    const s = 'abacbc';
    assert.equal(areOccurrencesEqual(s), true);
  });

  it('solves example #2', () => {
    const s = 'aaabb';
    assert.equal(areOccurrencesEqual(s), false);
  });
});
