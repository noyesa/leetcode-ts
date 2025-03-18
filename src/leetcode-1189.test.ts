import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const balloonCounts = new Map([
  ['b', 1],
  ['a', 1],
  ['l', 2],
  ['o', 2],
  ['n', 1],
]);

function maxNumberOfBalloons(text: string): number {
  const map = new Map<string, number>([
    ['b', 0],
    ['a', 0],
    ['l', 0],
    ['o', 0],
    ['n', 0],
  ]);

  for (const char of text) {
    if (map.has(char)) {
      map.set(char, (map.get(char) as number) + 1);
    }
  }

  let min = Infinity;
  for (const [char, count] of map) {
    const required = balloonCounts.get(char) as number;
    if (count < required) {
      return 0;
    }
    const max = Math.floor(count / required);
    min = Math.min(min, max);
  }

  return Number.isFinite(min) ? min : 0;
}

describe('maxNumberOfBalloons', () => {
  it('solves example #1', () => {
    const text = 'nlaebolko';
    assert.equal(maxNumberOfBalloons(text), 1);
  });

  it('solves example #2', () => {
    const text = 'loonbalxballpoon';
    assert.equal(maxNumberOfBalloons(text), 2);
  });

  it('solves example #3', () => {
    const text = 'leetcode';
    assert.equal(maxNumberOfBalloons(text), 0);
  });
});
