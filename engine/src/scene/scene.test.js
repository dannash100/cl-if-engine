import {
  sliceIdxs,
  emptyArray,
  emptyMatrix,
  getXY,
  resizeOob,
  getPlayerMap
} from "./scene";

import { mapSize } from "./scene.config";

const isFunc = fn => expect(fn).toBeInstanceOf(Function);

describe("emptyArray", () => {
  it("should be a function", () => {
    isFunc(emptyArray);
  });
  it("should return an array with identical falsy values", () => {
    const arr = emptyArray(4);
    expect(arr).toBeDefined();
    expect(Array.isArray(arr)).toBe(true);
    arr.forEach(x => expect(arr[0]).toEqual(x));
    expect(arr.some(Boolean)).toBe(false);
  });
  it("should return an array of the length specified", () => {
    [0, 1, 10, 20, 40, 60, 2025].forEach(n => {
      expect(emptyArray(n)).toHaveLength(n);
    });
  });
});

describe("emptyMatrix", () => {
  it("should be a function", () => {
    isFunc(emptyMatrix);
  });
  it("should return a 2d array.", () => {
    const matrix = emptyMatrix(4);
    expect(matrix).toBeDefined();
    expect(Array.isArray(matrix)).toBe(true);
    matrix.forEach(row => expect(Array.isArray(row)).toBe(true));
  });
  it("should return a symetrical matrix of the dimension specified", () => {
    [0, 1, 10, 20, 40, 60].forEach(n => {
      const matrix = emptyMatrix(n);
      expect(matrix).toHaveLength(n);
      matrix.forEach(row => expect(row).toHaveLength(n));
    });
  });
});

describe("sliceIdxs", () => {
  it("should be a function", () => {
    isFunc(sliceIdxs);
  });
  it("should return an array of two numbers", () => {
    const indxs = sliceIdxs(6);
    expect(indxs).toBeDefined();
    expect(Array.isArray(indxs)).toBe(true);
    expect(indxs).toHaveLength(2);
    expect(indxs.map(indx => typeof indx)).toEqual(["number", "number"]);
  });
  it("Should slice array to mapSize given the index of the middle element", () => {
    const indxs = sliceIdxs(4);
    expect(
      Array(mapSize * 2)
        .fill(0)
        .slice(...indxs)
    ).toHaveLength(mapSize);
  });
});

describe("getXY", () => {
  const getMatrixWithPlayer = (size, x, y) => {
    const matrix = emptyMatrix(size);
    matrix[y][x] = "P";
    return matrix;
  };
  const getPlayer = getXY("P");
  describe("inner function", () => {
    it("should be a function", () => {
      isFunc(getXY);
    });
    it("should return a function", () => {
      isFunc(getXY("P"));
    });
  });
  describe("outer function", () => {
    it("inner function should return an object with keys x and y", () => {
      const result = getPlayer(getMatrixWithPlayer(8, 0, 0));
      expect(result).toHaveProperty("x");
      expect(result).toHaveProperty("y");
      expect(Object.keys(result)).toHaveLength(2);
    });

    it("Should return correct coordinates", () => {
      const tests = [
        { x: 0, y: 1 },
        { x: 4, y: 6 },
        { x: 7, y: 2 },
        { x: 5, y: 0 },
        { x: 7, y: 7 },
        { x: 0, y: 0 }
      ];
      tests.forEach(test => {
        const result = getPlayer(getMatrixWithPlayer(8, test.x, test.y));
        expect(result).toMatchObject(test);
      });
    });
  });
});

describe("resizeOob", () => {
  describe("outer function", () => {
    it("Should be a function", () => {
      isFunc(resizeOob);
    });
    it("should return a function", () => {
      isFunc(resizeOob(0, 3, emptyArray));
    });
  });
  describe("Inner function", () => {
    const testArr = ["0", "0", "0", "0", "0"];
    const tests = [[0, 14], [2, 8], [-3, 2], [4, 6]];
    // Resize array so a slice from 0 to 7 is possible

    const getResult = sliceXY => {
      const resizeArr = resizeOob(...sliceXY, x => "P".repeat(x));
      const result = resizeArr(testArr);
      return result;
    };
    it("Expect to return array", () => {
      tests.forEach(test =>
        expect(Array.isArray(getResult(test))).toBeTruthy()
      );
    });
    it("Expect to pad array with generated P elements", () => {
      tests.forEach(test =>
        expect([...new Set(getResult(test))]).toHaveLength(2)
      );
    });
    it("Returns arr of appropriate length given out of bound indexes", () => {
      tests.forEach(test =>
        expect(getResult(test).length).toBeGreaterThanOrEqual(test[1] - test[0])
      );
    });
  });
});

describe("resizeOob", () => {
  const scenes = [
    {
      id: 1,
      paths: {
        N: 2
      }
    },
    {
      id: 2,
      paths: {
        S: 1,
        E: 3
      }
    },
    {
      id: 3,
      paths: {
        N: 1,
        W: 2
      }
    }
  ];
});
