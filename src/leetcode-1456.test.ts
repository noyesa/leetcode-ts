import { describe, it } from 'node:test';
import assert from 'node:assert';

const vowels = new Set('aeiou'.split(''));

/**
 * Is the c argument a vowel?
 * @param c - The character to check for voweliness.
 * @returns Is c a vowel?
 */
function isVowel(c: string): boolean {
  return vowels.has(c);
}

/**
 * Determines the maximum number of vowels you can find in a substring of s
 * of length k.
 * @param s - The string within which to search substrings.
 * @param k - The length of the substrings
 * @returns The maximum number of vowels in a substring of length k.
 */
function maxVowels(s: string, k: number): number {
  // Preload the sliding window.
  let runningVowelCount = 0;
  let right = 0;
  for (; right < k; ++right) {
    if (isVowel(s.charAt(right))) {
      ++runningVowelCount;
    }
  }

  let maxVowelCount = runningVowelCount;
  for (; right < s.length; ++right) {
    const left = right - k + 1;

    // Remove old character.
    if (isVowel(s.charAt(left - 1))) {
      --runningVowelCount;
    }

    // Add new character.
    if (isVowel(s.charAt(right))) {
      ++runningVowelCount;
      maxVowelCount = Math.max(maxVowelCount, runningVowelCount);
    }
  }

  return maxVowelCount;
}

describe('maxVowels', () => {
  it('solves example #1', () => {
    const s = 'abciiidef';
    assert.equal(maxVowels(s, 3), 3);
  });

  it('solves example #2', () => {
    const s = 'aeiou';
    assert.equal(maxVowels(s, 2), 2);
  });

  it('solves example #3', () => {
    const s = 'leetcode';
    assert.equal(maxVowels(s, 3), 2);
  });
});
