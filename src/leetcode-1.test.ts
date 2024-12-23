import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Find the pair of indices whose values in nums adds up to target.
 * @param nums - The numbers to search for pair
 * @param target - The value the pair should sum to
 * @returns The pair as a 2-tuple array, or undefined if no result found.
 */
function twoSum(nums: number[], target: number): number[] | undefined {
  const indices = new Map();
  for (const [i, num] of nums.entries()) {
    const remainder = target - num;
    const complement = indices.get(remainder);
    if (complement !== undefined) {
      return [complement, i];
    }
    indices.set(num, i);
  }
}

describe('twoSum()', () => {
  it('example #1', () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    assert.deepEqual(twoSum(nums, target), [0, 1]);
  });

  it('example #2', () => {
    const nums = [3, 2, 4];
    const target = 6;
    assert.deepEqual(twoSum(nums, target), [1, 2]);
  });

  it('example #3', () => {
    const nums = [3, 3];
    const target = 6;
    assert.deepEqual(twoSum(nums, target), [0, 1]);
  });
});
