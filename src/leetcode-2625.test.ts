import { describe, it } from 'node:test';
import assert from 'node:assert';

type MultiDimensionalArray = (number | MultiDimensionalArray)[];

function flat(arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
  const output: MultiDimensionalArray = [];
  if (n === 0) {
    return Array.from(arr);
  } else {
    for (const itemOrArr of arr) {
      if (Array.isArray(itemOrArr)) {
        output.push(...flat(itemOrArr, n - 1));
      } else {
        output.push(itemOrArr);
      }
    }
  }
  return output;
}

describe('flat', () => {
  it('solves example #1', () => {
    const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
    assert.deepEqual(flat(arr, 0), Array.from(arr));
  });

  it('solves example #2', () => {
    const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
    assert.deepEqual(flat(arr, 1), [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      [9, 10, 11],
      12,
      13,
      14,
      15,
    ]);
  });

  it('solves example #3', () => {
    const arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, [9, 10, 11], 12],
      [13, 14, 15],
    ];
    assert.deepEqual(
      flat(arr, 2),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    );
  });
});
