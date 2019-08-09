import {
  sliceIdxs,
  emptyArray,
  emptyMatrix,
  getXY,
  resizeOob,
  getPlayerMap
} from "./scene";

import { mapSize } from "./scene.config";

console.log(getPlayerMap([[0,0,"P",0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0]]))

const isFunc = fn => expect(fn).toBeInstanceOf(Function)

describe("emptyArray", () => {
  it("should be a function", () => {
    isFunc(emptyArray)
  });
  it("should return an array with identical falsy values", () => {
    const arr = emptyArray(4);
    expect(arr).toBeDefined();
    expect(Array.isArray(arr)).toBe(true);
    arr.forEach(x => expect(arr[0]).toEqual(x))
    expect(arr.some(Boolean)).toBe(false);
  })
  it("should return an array of the length specified", () => {
    [0,1,10,20,40,60,2025].forEach(n => {
      expect(emptyArray(n)).toHaveLength(n)
    })
  })
})


describe("emptyMatrix", () => {
  it("should be a function", () => {
    isFunc(emptyMatrix);
  });
  it("should return a 2d array.", () => {
    const matrix = emptyMatrix(4);
    expect(matrix).toBeDefined();
    expect(Array.isArray(matrix)).toBe(true);
    matrix.forEach(row => expect(Array.isArray(row)).toBe(true));
  })
  it("should return a symetrical matrix of the dimension specified", () => {
    [0, 1, 10, 20, 40, 60].forEach(n => {
      const matrix = emptyMatrix(n);
      expect(matrix).toHaveLength(n);
      matrix.forEach(row => expect(row).toHaveLength(n));
    });
  });
})

describe("sliceIdxs", () => {
  it("should be a function", () => {
    isFunc(sliceIdxs)
  });
  it("should return an array of two numbers", () => {
    const indxs = sliceIdxs(6);
    expect(indxs).toBeDefined();
    expect(Array.isArray(indxs)).toBe(true);
    expect(indxs).toHaveLength(2);
    expect(indxs.map(indx => typeof indx)).toEqual(["number", "number"]);
  });
  it("Should slice array to mapSize given the index of the middle element", () => {
    const indxs = sliceIdxs(4)
    expect(Array(mapSize * 2).fill(0).slice(...indxs)).toHaveLength(mapSize)
  });
});

