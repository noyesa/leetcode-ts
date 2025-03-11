import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Finds the number of subarrays within nums that sum to exactly k.
 * @param nums - Array to find subarrays within.
 * @param k - The sum of subarrays to search for.
 * @returns The number of subarrays that sum to k.
 */
function subarraySum(nums: number[], k: number): number {
  const counts = new Map([[0, 1]]);
  let prefixSum = 0;
  let total = 0;
  for (const num of nums) {
    prefixSum += num;
    const difference = prefixSum - k;
    if (counts.has(difference)) {
      total += counts.get(difference) ?? 0;
    }
    counts.set(prefixSum, (counts.get(prefixSum) ?? 0) + 1);
  }
  return total;
}

describe('subarraySum', () => {
  it('solves example #1', () => {
    const nums = [1, 1, 1];
    assert.equal(subarraySum(nums, 2), 2);
  });

  it('solves example #2', () => {
    const nums = [1, 2, 3];
    assert.equal(subarraySum(nums, 3), 2);
  });
});
