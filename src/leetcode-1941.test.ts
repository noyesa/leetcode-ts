import { describe, it } from 'node:test';
import assert from 'node:assert';

function areOccurrencesEqual(s: string): boolean {
  const counts = new Array(26).fill(0);
  for (let i = 0; i < s.length; ++i) {
    ++counts[s.charCodeAt(i) - 'a'.charCodeAt(0)];
  }

  const [first, ...rest] = counts.filter((count) => count > 0);
  return rest.every((count) => count === first);
}

describe('areOccurrencesEqual', () => {
  it('solves example #1', () => {
    const s = 'abacbc';
    assert.equal(areOccurrencesEqual(s), true);
  });

  it('solves example #2', () => {
    const s = 'aaabb';
    assert.equal(areOccurrencesEqual(s), false);
  });
});
