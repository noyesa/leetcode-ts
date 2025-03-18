import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * A sort comparison function that sorts numbers into ascending order.
 * @param a - The left number.
 * @param b - The right number.
 * @returns Negative if b > a, 0 if a === b, positive if a > b.
 */
const ascending = (a: number, b: number): number => a - b;

/**
 * Takes in a list of match results, where each match is represented by a tuple
 * containing the winner in the first position and the loser in the second.
 * Computes two lists: all players who have not lost any matches, and all
 * players who have lost exactly one match.
 * @param matches - The list of match results.
 * @returns Two lists: the sorted list of players who won all and the list of
 *    players who lost exactly one game, in sorted order..
 */
function findWinners(matches: number[][]): number[][] {
  const lostNone = new Set<number>();
  const lostOne = new Set<number>();
  const lostMany = new Set<number>();

  for (const [winner, loser] of matches) {
    if (!(lostMany.has(winner) || lostOne.has(winner))) {
      lostNone.add(winner);
    }

    lostNone.delete(loser);
    if (lostMany.has(loser)) {
      continue;
    }

    if (lostOne.delete(loser)) {
      lostMany.add(loser);
    } else {
      lostOne.add(loser);
    }
  }

  return [
    Array.from(lostNone).toSorted(ascending),
    Array.from(lostOne).toSorted(ascending),
  ];
}

describe('findWinners', () => {
  it('solves example #1', () => {
    const matches = [
      [1, 3],
      [2, 3],
      [3, 6],
      [5, 6],
      [5, 7],
      [4, 5],
      [4, 8],
      [4, 9],
      [10, 4],
      [10, 9],
    ];

    assert.deepStrictEqual(findWinners(matches), [
      [1, 2, 10],
      [4, 5, 7, 8],
    ]);
  });

  it('solves exmaple #2', () => {
    const matches = [
      [2, 3],
      [1, 3],
      [5, 4],
      [6, 4],
    ];

    assert.deepStrictEqual(findWinners(matches), [[1, 2, 5, 6], []]);
  });

  it('solves example #3', () => {
    const matches = [
      [1, 5],
      [2, 5],
      [2, 8],
      [2, 9],
      [3, 8],
      [4, 7],
      [4, 9],
      [5, 7],
      [6, 8],
    ];

    assert.deepStrictEqual(findWinners(matches), [[1, 2, 3, 4, 6], []]);
  });
});
