import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Given a 2D integer array nums where nums[i] is a non-empty array of distinct
 * positive integers, return th elist of integers that are present in each
 * array of nums sorted in ascending order.
 * @param nums - The 2D integer array to search for common values.
 * @returns An array of the numbers common to all arrays, sorted ascending.
 */
function intersection(nums: number[][]): number[] {
  // Count how many times each number appears in the input matrix.
  const counts = new Map();
  for (const list of nums) {
    for (const num of list) {
      const count = counts.get(num) ?? 0;
      counts.set(num, count + 1);
    }
  }

  const output = [];
  for (const [key, value] of counts) {
    // Because the inputs are guaranteed not to contain duplicates per the
    // problem description, the counts are the number of input arrays the value
    // appeared in.
    if (value === nums.length) {
      output.push(key);
    }
  }

  return output.toSorted((a, b) => a - b);
}

describe('intersection', () => {
  it('solves example #1', () => {
    const nums = [
      [3, 1, 2, 4, 5],
      [1, 2, 3, 4],
      [3, 4, 5, 6],
    ];
    assert.deepEqual(intersection(nums), [3, 4]);
  });

  it('solves example #2', () => {
    const nums = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    assert.deepEqual(intersection(nums), []);
  });

  it('solves example #3', () => {
    const nums = [
      [4, 43, 15, 30, 27, 22],
      [15, 30, 43, 27, 10, 4],
    ];
    assert.deepEqual(intersection(nums), [4, 15, 27, 30, 43]);
  });
});
