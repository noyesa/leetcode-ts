import { describe, it } from 'node:test';
import assert from 'node:assert';

function sortedSquares(nums: number[]): number[] {
  const squared = nums.map((x) => Math.pow(x, 2));
  const output = new Array(nums.length);
  let left = 0;
  let right = squared.length - 1;
  for (let k = squared.length - 1; k >= 0; --k) {
    if (squared[left] > squared[right]) {
      output[k] = squared[left++];
    } else {
      output[k] = squared[right--];
    }
  }
  return output;
}

describe('sortedSquares', () => {
  it('solves example #1', () => {
    assert.deepEqual(sortedSquares([-4, -1, 0, 3, 10]), [0, 1, 9, 16, 100]);
  });

  it('solves example #2', () => {
    assert.deepEqual(sortedSquares([-7, -3, 2, 3, 11]), [4, 9, 9, 49, 121]);
  });
});
