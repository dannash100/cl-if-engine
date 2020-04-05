import { getEdgeEl, getDirOffset, mapSize } from "./scene.config";

/**
 * Spatial node and edge data for a Scene
 * @typedef Scene scene in game world
 * @type {Object}
 * @property {Paths} paths
 * @property {Number} id - sceneId
 */

/**
 * Edge data for a given Scene
 * Keys represent
 * @typedef Paths
 * @type {{Direction , number}}
 */

/**
 * @typedef Direction compass direction
 * @type {('n'|'s'|'e'|'w'|'se'|'sw'|'ne'|'nw')}
 */

/**
 * Returns slice indexes from map size with i as middle point.
 * @param {Number} i
 * @example given map size of 5
 * // returns [-2,3]
 * sliceIdxs(0)
 * // returns [2,7]
 * sliceIdx(4)
 * @returns {Indexes} [from, to] slice indexes
 */
export const sliceIdxs = i => [
  i - (mapSize - 1) / 2,
  i + 1 + (mapSize - 1) / 2
];

/**
 * Create array of zeros to target length
 * @param {Number} len output length
 * @returns {Array}
 */
export const emptyArray = len => Array(len).fill(0);

/**
 * Finds the item by its unique id.
 * @typedef Locater
 * @type {function(Array[]): Location}
 *
 * XY coordinates of item.
 * @typedef Location
 * @type {Object}
 * @property {Number} x
 * @property {Number} y
 *
 */

/**
 * Create 2d Array of zeros to target width and height
 * @param {Number} height
 * @param {Number} width
 * @returns {Array[]}
 */
export const emptyMatrix = (height, width) =>
  emptyArray(height).map(() => emptyArray(width));

/**
 *
 * @param {(String|Number)} element
 * @returns {Function} get XY function for element
 */
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

// /**
//  *
//  * @param {Array.<string[]>} matrix
//  */
// export const getPlayerMap = matrix => {
//   let p = getPlayer(matrix);
//   const resizeY = resizeOob(...sliceIdxs(p.y), emptyMatrix);
//   const resizeX = resizeOob(...sliceIdxs(p.x), emptyArray);
//   const resizedMatrix = resizeY(matrix).map(resizeX);
//   p = getPlayer(resizedMatrix);
//   return resizedMatrix
//     .slice(...sliceIdxs(p.y))
//     .map(row => row.slice(...sliceIdxs(p.x)));
// };

/**
 * Get node and edge coordinate offsets in a given direction
 * @param {Direction} direction
 * @param {Number} edgeLen length of edges
 */
export const getPathCoords = (direction, edgeLen = 1) => {
  const { x, y } = getDirOffset(direction);
  return [...Array(edgeLen + 1).keys()].map(i => ({
    x: x + x * i,
    y: y + y * i
  }));
};

/**
 * @typedef Indexes
 * @type {[Number, Number]}
 */

/**
 * @param {Indexes} targetXIndexes
 * @param {Indexes]} targetYIndexes
 * @param {Array[]} matrix
 * @return {Array[]} resizedMatrix
 */
export const resizeMatrix = ([fromX, toX], [fromY, toY], matrix) =>
  resizeOob(
    fromY,
    toY,
    emptyMatrix
  )(matrix).map(resizeOob(fromX, toX, emptyArray));

/**
 * Creates a matrix map of game world from scene node and edge data.
 * @param {Scene[]} input node and edge scene data
 * @return {Array[]} map of game world
 */
export const createMap = input => {
  let matrix = emptyMatrix(3, 3);

  const firstScene = input[0];

  // Targets for recalculating matrix size
  let targetX = [0, 2];
  let targetY = [0, 2];

  const adjustTarget = (i, [from, to]) => [Math.min(from, i), Math.max(to, i)];
  const getCoords = (x, y, el) => ({ x, y, el });

  // List of coordinates and elements to draw onto map
  let drawCoords = [getCoords(1, 1, firstScene.id)];

  // List of upcoming arguments for drawPathsFromNode
  let upNext = [[1, 1, firstScene]];

  // SceneIds of processed nodes
  let drawn = [];

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
                    targetX = adjustTarget(cx, targetX);
                    targetY = adjustTarget(cy, targetY);
                    if (!drawn.includes(sceneId)) {
                      upNext.push([
                        cx,
                        cy,
                        input.find(scene => scene.id === sceneId)
                      ]);
                    }
                  }
                  return getCoords(cx, cy, isNode ? sceneId : getEdgeEl(dir));
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

  matrix = resizeMatrix(targetX, targetY, matrix);

  const [offsetX] = targetX;
  const [offsetY] = targetY;

  drawCoords.forEach(({ x, y, el }) => {
    const drawX = x + Math.abs(offsetX);
    const drawY = y + Math.abs(offsetY);
    if (!matrix[drawY][drawX]) {
      matrix[drawY][drawX] = el;
    }
  });

  console.log(matrix);

  return matrix;
};
