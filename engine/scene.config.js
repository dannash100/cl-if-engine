export const getEdgePos = direction => ({
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

export const getEdgeEl = direction => ({
  NW: '\\',
  N: '|',
  NE: '/',
  W: '-',
  E: '-',
  SW: '/',
  S: '|',
  SE: '\\'
}[direction]);

export const mapSize = 9