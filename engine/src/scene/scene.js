import { getEdgeEl, getDirOffset, mapSize } from "./scene.config";

export const sliceIdxs = i => [
  i - (mapSize - 1) / 2,
  i + 1 + (mapSize - 1) / 2
];

export const emptyArray = len => Array(len).fill(0);
export const emptyMatrix = (len, width) =>
  emptyArray(len).map(() => emptyArray(width));

export const getXY = element => matrix => ({
  x: matrix.find(row => row.includes(element)).indexOf(element),
  y: matrix.findIndex(row => row.includes(element))
});

const getPlayer = getXY("P");

/**
 * Resize matrix if requested slice indexes are out of bounds.
 * @param {Number} begin index to begin slice
 * @param {Number} end index to end slice
 * @param {Function} padFn element generator function to generate a given number of elements.
 */
export const resizeOob = (begin, end, padFn) => arr => [
  ...padFn(Math.abs(Math.min(0, begin)), arr.length),
  ...arr,
  ...padFn(Math.max(end, arr.length - 1) - (arr.length - 1), arr.length)
];

export const getPlayerMap = matrix => {
  let p = getPlayer(matrix);
  const resizeY = resizeOob(...sliceIdxs(p.y), emptyMatrix);
  const resizeX = resizeOob(...sliceIdxs(p.x), emptyArray);
  const resizedMatrix = resizeY(matrix).map(resizeX);
  p = getPlayer(resizedMatrix);
  return resizedMatrix
    .slice(...sliceIdxs(p.y))
    .map(row => row.slice(...sliceIdxs(p.x)));
};

export const getPathCoords = (direction, edgeLen = 1) => {
  const { x, y } = getDirOffset(direction);
  return [...Array(edgeLen + 1).keys()].map(i => ({
    x: x + x * i,
    y: y + y * i
  }));
};

export const resizeMatrix = ([fromX, toX], [fromY, toY], matrix) =>
  resizeOob(
    fromY,
    toY,
    emptyMatrix
  )(matrix).map(resizeOob(fromX, toX, emptyArray));

export const createMap = input => {
  let matrix = emptyMatrix(3, 3);

  let drawCoords = [];

  // SceneIds of processed nodes
  let drawn = [];

  // drawPathFromNode arguments
  let upNext = [[1, 1, input[0]]];

  // Targets for recalculating matrix size
  let [fromX, toX] = [0, 2];
  let [fromY, toY] = [0, 2];

  // Draw starting node
  matrix[1][1] = input[0].id;

  const adjustTargetIdxs = (x, y) => {
    fromX = Math.min(fromX, x);
    toX = Math.max(toX, x);
    fromY = Math.min(fromY, y);
    toY = Math.max(toY, y);
  };

  const isOob = (x, y) =>
    x < 0 || x >= matrix[0].length || y < 0 || y >= matrix.length;

  const drawPathsFromNode = (initialX, initialY, { paths, id }) => {
    drawn.push(id);
    return [
      ...drawCoords,
      ...Object.entries(paths).reduce(
        (arr, [dir, sceneId]) =>
          sceneId
            ? [
                ...getPathCoords(dir).map(({ x, y }, i, coords) => {
                  const isNode = i === coords.length - 1;
                  const cx = initialX + x;
                  const cy = initialY + y;
                  if (isNode) {
                    adjustTargetIdxs(cx, cy);
                    if (!drawn.includes(sceneId)) {
                      upNext.push([
                        cx,
                        cy,
                        input.find(scene => scene.id === sceneId)
                      ]);
                    }
                  }
                  return {
                    x: cx,
                    y: cy,
                    el: isNode ? sceneId : getEdgeEl(dir)
                  };
                }),
                ...arr
              ]
            : arr,
        []
      )
    ];
  };

  while (upNext.length) {
    drawCoords = drawPathsFromNode(...upNext.pop());
  }

  if (isOob(fromX, fromY) || isOob(toX, toY)) {
    matrix = resizeMatrix([fromX, toX], [fromY, toY], matrix);
  }

  drawCoords.forEach(({ x, y, el }) => {
    const drawX = x + Math.abs(fromX);
    const drawY = y + Math.abs(fromY);
    if (!matrix[drawY][drawX]) {
      matrix[drawY][drawX] = el;
    }
  });

  return matrix
};
