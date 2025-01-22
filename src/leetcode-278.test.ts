import { describe, it } from 'node:test';
import assert from 'node:assert';

function solution(isBadVersion: (n: number) => boolean): (n: number) => number {
  return (n: number) => {
    let left = 0;
    let right = n;

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (isBadVersion(mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  };
}

describe('solution', () => {
  it('solves example #1', () => {
    const findBadVersion = solution((n) => n === 4);
    assert.equal(findBadVersion(5), 4);
  });

  it('solves example #2', () => {
    const findBadVersion = solution((n) => n === 1);
    assert.equal(findBadVersion(1), 1);
  });
});
