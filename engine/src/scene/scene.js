import { getEdgePos, getDirOffset, mapSize } from "./scene.config";

export const sliceIdxs = i => [i - (mapSize - 1) / 2, i + 1 + (mapSize - 1) / 2];

export const emptyArray = len => Array(len).fill(0);
export const emptyMatrix = len => emptyArray(len).map(() => emptyArray(len));

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
  ...padFn(Math.abs(Math.min(0, begin))),
  ...arr,
  ...padFn(Math.max(end, arr.length) - arr.length)
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
  return [...Array(edgeLen).keys()].map(i => ({ x: x + x * i, y: y + y * i }));
};

// Only draw map once - and redraw if map changes - otherwise just zoom in on player
// Find starting scene - then draw recursively - untill 
//

// once a new scene is created - find out which x and y are 2 away from out of bounds

const drawMap = (matrix, paths) => {
  const len = matrix.length;
  matrix[len / 2 + 1][[len / 2 + 1]] = "P"; // draw player at center
  // Path [{direction: N, scene: 2345345}]
  currentScene.paths.forEach(path => {
    const { x, y } = getEdgePos(path.direction);
    // draw edge
    matrix[x][y] = "";
  });
  // path . for each {x, y} = getEdgePos(N)
  // then draw scene - if Positive(+1) if Negative(-1)
  // Read Scene Data
  /*

[[0,0,0,0,P],
[0,0,0,0,0],
[0,0,0,0,0],
[0,0,0,0,0],
[0,0,0,0,0]]



[0,0,0,0,0,0,0,0,0,0,'P']
[0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0]


11 x 11

center is 6x6y

Dir  EdgePos  NodePos   RelEdge   RelNode               
NW - 5x5y     4x4y     -1x -1y    -2x -2x
N - 5x6y      4x6y     -1x y	   -2x y
NE - 5x7y     4x8y     -1x +1y    -2x +2y

E    6x 5y   6x 4y    1x -1y    1x -2y
W    6x 7y   6x 8y    1x +1y    1x +2y 

SW   7x 5y   8x 4y    +1x -1y  +2x -2y
S    7x6y    8x6y     +1x 1y   +2x  1y
SE   7x7y    8x8y     +1x +1y  +2x +2y

  */
};
