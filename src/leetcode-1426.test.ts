import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Given an integer array arr, count how many elements x there are, such that
 * x + 1 is also in arr. If there are duplicates in arr, count them separately.
 * @param arr - The array to search for matches.
 * @returns The number of elements in arr satisfying the above conditions.
 */
function countElements(arr: number[]): number {
  const numSet = new Set(arr);
  let count = 0;
  for (const num of arr) {
    if (numSet.has(num + 1)) {
      ++count;
    }
  }
  return count;
}

describe('countElements', () => {
  it('solves example #1', () => {
    const arr = [1, 2, 3];
    assert.equal(countElements(arr), 2);
  });

  it('solves example #2', () => {
    const arr = [1, 1, 3, 3, 5, 5, 7, 7];
    assert.equal(countElements(arr), 0);
  });
});
