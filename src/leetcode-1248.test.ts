import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Finds the number of subarrays where the subarray contains exactly k odd
 * numbers.
 * @param nums - The array within which to search subarrays.
 * @param k - The number of odd numbers in each subarray.
 * @return The number of subarrays within nums that have k odd numbers.
 */
function numberOfSubarrays(nums: number[], k: number): number {
  const counts = new Map([[0, 1]]);
  let curr = 0;
  let total = 0;
  for (const num of nums) {
    curr += num % 2;
    total += counts.get(curr - k) ?? 0;
    counts.set(curr, (counts.get(curr) ?? 0) + 1);
  }
  return total;
}

describe('numberOfSubarrays', () => {
  it('solves example #1', () => {
    const nums = [1, 1, 2, 1, 1];
    assert.equal(numberOfSubarrays(nums, 3), 2);
  });

  it('solves example #2', () => {
    const nums = [2, 4, 6];
    assert.equal(numberOfSubarrays(nums, 1), 0);
  });
});
