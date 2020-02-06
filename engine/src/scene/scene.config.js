export const getEdgePos = direction =>
  ({
    NW: {
      x: -1,
      y: -1
    },
    N: {
      x: -1,
      y: 0
    },
    NE: {
      x: -1,
      y: 1
    },
    E: {
      x: 1,
      y: -1
    },
    W: {
      x: 0,
      y: 1
    },
    SW: {
      x: 1,
      y: -1
    },
    S: {
      x: 1,
      y: 0
    },
    SE: {
      x: 1,
      y: 1
    }
  }[direction]);

export const getDirOffset = direction =>
  ({
    NW: {
      x: -1,
      y: -1
    },
    N: {
      x: 0,
      y: -1
    },
    NE: {
      x: 1,
      y: -1
    },
    E: {
      x: 1,
      y: 0
    },
    W: {
      x: -1,
      y: 0
    },
    SW: {
      x: -1,
      y: 1
    },
    S: {
      x: 0,
      y: 1
    },
    SE: {
      x: 1,
      y: 1
    }
}[direction]);

/**
 *
 * @param {String} direction
 * @param {Number} edgeLen length of edge
 * @returns {Array} Coordinates for edge positions, last element being a node.
 */
export const getPathCoords = (direction, edgeLen = 1) => {
  const { x, y } = getDirOffset(direction);
  return [...Array(edgeLen).keys()].map(i => ({ x: x + x * i, y: y + y * i }));
};


export const getEdgeEl = direction =>
  ({
    NW: "\\",
    N: "|",
    NE: "/",
    W: "-",
    E: "-",
    SW: "/",
    S: "|",
    SE: "\\"
  }[direction]);

export const mapSize = 9;
