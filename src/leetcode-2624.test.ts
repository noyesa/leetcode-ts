import { describe, it } from 'node:test';
import assert from 'assert';

declare global {
  interface Array<T> {
    snail(rowsCount: number, colsCount: number): T[][];
  }
}

/**
 * Converts a one-dimensional array into a two dimensional array using snail
 * order traversal.
 * @param rowsCount - The number of rows in the output matrix.
 * @param colsCount - The number of columns in the output matrix;
 * @returns The snail order conversion of this array.
 */
Array.prototype.snail = function <T>(
  this: T[],
  rowsCount: number,
  colsCount: number,
): T[][] {
  if (rowsCount * colsCount !== this.length) {
    return [];
  }

  const matrix: T[][] = Array.from(
    { length: rowsCount },
    () => new Array(colsCount),
  );

  let i = 0;
  for (let col = 0; col < colsCount; ++col) {
    for (let row = 0; row < rowsCount; ++row) {
      const isEvenCol = col % 2 === 0;
      matrix[isEvenCol ? row : rowsCount - 1 - row][col] = this[i++];
    }
  }

  return matrix;
};

describe('Array.prototype.snail', () => {
  it('solves example #1', () => {
    const nums = [
      19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15,
    ];

    assert.deepEqual(nums.snail(5, 4), [
      [19, 17, 16, 15],
      [10, 1, 14, 4],
      [3, 2, 12, 20],
      [7, 5, 18, 11],
      [9, 8, 6, 13],
    ]);
  });

  it('solves example #2', () => {
    const nums = [1, 2, 3, 4];
    assert.deepEqual(nums.snail(1, 4), [[1, 2, 3, 4]]);
  });

  it('solves example #3', () => {
    const nums = [1, 3];
    assert.deepEqual(nums.snail(2, 2), []);
  });
});
