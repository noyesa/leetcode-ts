import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Reverses a subarray of an array.
 * @param a - The array to reverse subarrays within.
 * @param start - The start index of the subarray.
 * @param end - The end index of the subarray.
 */
function reverseSubarray<T>(a: T[], start: number, end: number) {
  let i = start;
  let j;
  while (i < (j = end - (i - start))) {
    [a[i], a[j]] = [a[j], a[i]];
    ++i;
  }
}

describe('reverseSubarray', () => {
  it('reverses from start to end index', () => {
    const a = [0, 1, 2, 3, 4];
    reverseSubarray(a, 1, 3);
    assert.deepEqual(a, [0, 3, 2, 1, 4]);
  });
});

/**
 * Takes a character array s and reverses the order of the words. This must be
 * done in place, without allocating any additional memory.
 * @param s - The string represented as an array of characters.
 */
function reverseWords(s: string[]): void {
  // Reverse the entire array.
  reverseSubarray(s, 0, s.length - 1);

  // Swap all the words in the array.
  let i = 0;
  while (i < s.length) {
    // Find the beginning of a word.
    if (s[i] === ' ') {
      ++i;
    } else {
      // Find the end of the word.
      let j = i;
      while (j < s.length - 1 && s[j + 1] !== ' ') {
        ++j;
      }

      // Reverse the word.
      reverseSubarray(s, i, j);

      // Advance to the next word, skipping the space.
      i = j + 2;
    }
  }
}

describe('reverseWords', () => {
  it('solves example #1', () => {
    const s = Array.from('the sky is blue');
    reverseWords(s);
    assert.deepEqual(s, Array.from('blue is sky the'));
  });

  it('solves example #2', () => {
    const s = Array.from('a');
    reverseWords(s);
    assert.deepEqual(s, Array.from('a'));
  });
});
