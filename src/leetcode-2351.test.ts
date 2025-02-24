import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Given a string s consisting of lowercase English letters, return the first
 * letter to appear twice.
 * @param s - String to find repeated characters within.
 * @returns Repeated character if found, undefined otherwise.
 */
function repeatedCharacter(s: string): string | undefined {
  const charSet = new Set();
  for (const char of s) {
    if (charSet.has(char)) {
      return char;
    }
    charSet.add(char);
  }
}

describe('repeatedCharacter', () => {
  it('solves example #1', () => {
    const s = 'abccbaacz';
    assert.equal(repeatedCharacter(s), 'c');
  });

  it('solves example #2', () => {
    const s = 'abcdd';
    assert.equal(repeatedCharacter(s), 'd');
  });
});
