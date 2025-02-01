import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Computes the minimum inital value you would need to ensure the sum of it and
 * each successive number in nums never totals lower than 1.
 * @param nums - Numbers to sum
 * @returns The minimum initial value
 */
function minStartValue(nums: number[]): number {
  let min = 0;
  let total = 0;
  for (const num of nums) {
    total += num;
    min = Math.min(min, total);
  }
  return 1 - min;
}

describe('minStartValue', () => {
  it('solves example #1', () => {
    const nums = [-3, 2, -3, 4, 2];
    assert.equal(minStartValue(nums), 5);
  });

  it('solves exmaple #2', () => {
    const nums = [1, 2];
    assert.equal(minStartValue(nums), 1);
  });

  it('solves example #3', () => {
    const nums = [1, -2, -3];
    assert.equal(minStartValue(nums), 5);
  });
});
