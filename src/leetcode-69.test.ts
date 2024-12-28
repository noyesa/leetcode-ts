import { describe, it } from 'node:test';
import assert from 'node:assert';

function mySqrt(x: number): number {}

describe('mySqrt', () => {
  it('solves example #1', () => {
    assert.equal(mySqrt(4), 2);
  });

  it('solves example #2', () => {
    assert.equal(mySqrt(8), 2);
  });
});
