import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Reverses a subarray of an array.
 * @param a - The array to reverse subarrays within.
 * @param start - The start index of the subarray.
 * @param end - The end index of the subarray.
 */
function reverseSubarray<T>(a: T[], start: number, end: number) {
  let j;
  for (let i = start; i < (j = end - (i - start)); ++i) {
    [a[i], a[j]] = [a[j], a[i]];
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
 * Finds the next index beginning with start that passes the predicate.
 * @param a - The list within which to search.
 * @param start - The start index from which to begin search.
 * @param pred - Callback that will be invoked with each value.
 * @returns The index of the next passing value after start.
 */
function findNextIndex<T>(a: T[], start: number, pred: (arg0: T) => boolean) {
  for (let i = start; i < a.length; ++i) {
    if (pred(a[i])) {
      return i;
    }
  }
  return -1;
}

describe('findNextIndex', () => {
  it('finds the first instance by default', () => {
    const nums = [1, 2, 3, 4, 3];
    assert.equal(
      findNextIndex(nums, 0, (x) => x === 2),
      1,
    );
  });

  it('finds instances after the start index', () => {
    const nums = [1, 2, 3, 2, 5];
    assert.equal(
      findNextIndex(nums, 2, (x) => x === 2),
      3,
    );
  });

  it('returns -1 when no value passes the predicate', () => {
    const nums = [1, 2, 3, 4, 5];
    assert.equal(
      findNextIndex(nums, 0, (x) => x === 10),
      -1,
    );
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

  // Find the beginning of a word.
  let i = 0;
  while ((i = findNextIndex(s, i, (c) => c !== ' ')) !== -1) {
    // Find the end of the word.
    let j = s.indexOf(' ', i + 1);
    if (j === -1) {
      j = s.length;
    }

    // Reverse the word.
    reverseSubarray(s, i, j - 1);

    // Advance to the next word, skipping the space.
    i = j + 1;
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
