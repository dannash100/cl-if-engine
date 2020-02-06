export const getPrepRegex = prep => new RegExp(`\\b${prep}\\b`);
export const getVerbRegex = verb => new RegExp(`^${verb}\\b`);
export const getSplitAheadRegex = str => new RegExp(`(?<=${str})\\s`);
export const getSplitBehindRegex = str => new RegExp(`\\s(?=${str})`);

const directionRegex = /\b(u(p)?|d(own)?|north ?(east|west)?|south ?(east|west)?|east|west|[ns] ?[ew]?|[ew])\b/;
const rotationDirectionRegex = /\b(anti|counter)?clockwise\b/;

const prepAliases = {
  on: ["onto", "on to"],
  in: ["into", "on to"]
};

// finish

// need to cover - sleep in bed

export const actionsToPrepositions = {
  with: [
    "push",
    "pull",
    "move",
    "attack",
    "hit",
    "open",
    "close",
    "cover",
    "break",
    "cut",
    "examine",
    "combine",
    "replace",
    "use"
  ],
  on: ["use", "throw", "put", "drop"],
  in: ["throw", "put", "drop"],
  at: ["throw"],
  under: ["throw", "put", "drop"],
  from: ["remove", "get", "steal"]
};

export const prepositions = Object.values(prepAliases).reduce(
  (a, b) => a.concat(b),
  Object.keys(actionsToPrepositions)
);

export const verbAliases = {
  get: ["take", "pickup", "pick up", "grab"],
  use: ["operate"],
  go: ["go in", "go to", "walk"],
  turn: ["rotate"],
  put: ["place"],
  talk: ["talk to", "talk with"],
  sleep: ["go to sleep"],
  throw: ["toss"],
  open: [],
  close: ["shut"],
  drop: [],
  attack: [],
  break: [],
  cover: []
  // Global - starts pre filled with self.
};

export const keywordAliases = {
  save: ["save game"],
  load: ["load game", "restore game"],
  exit: ["exit game", "leave game", "quit game"],
  inventory: ["look in inventory", "look at inventory"]
};

export const parseByVerb = (verb, text) => {
  switch (verb) {
    case "turn": {
      const match = text.match(rotationDirectionRegex);
      if (match) {
        const [noun, direction] = text.split(getSplitBehindRegex(match[0]));
        return { noun, direction };
      }
      break;
    }
    case "go": {
      const match = text.match(directionRegex);
      const capture = match ? match[0].replace(/\s/g, "") : text;
      return {
        direction: directionShortcuts[capture] || capture
      };
    }
    default:
      break;
  }
  return { nouns: text };
};

const NORTH = "north";
const SOUTH = "south";
const EAST = "east";
const WEST = "west";
const NORTHEAST = "northeast";
const NORTHWEST = "northwest";
const SOUTHEAST = "southeast";
const SOUTHWEST = "southwest";
const UP = "up";
const DOWN = "down";

const directionShortcuts = {
  n: NORTH,
  s: SOUTH,
  e: EAST,
  w: WEST,
  ne: NORTHEAST,
  nw: NORTHWEST,
  se: SOUTHEAST,
  sw: SOUTHWEST,
  u: UP,
  d: DOWN
};

const WORLD = "world";
const INVENTORY = "inventory";
const DIRECTION = "direction";
const CHARACTER = "character";
const TIME = "time";
const KNOWLEDGE = "knowledge";
const TOPIC = "topic";

// If one word - check commands or bust - or verb what?

/**
 * Special case to incorporate
 * Turn handle clockwise -
 * Sleep in bed - as will get split up [sleep, in bed]
 * Yell at 'guard'
 *  Say the magic words.
 * Understand adjectives - i.e which key
 */

const actionPriorities = {
  get: [WORLD],
  steal: [WORLD],
  attack: [CHARACTER, WORLD],
  sleep: [TIME],
  listen: [WORLD, INVENTORY, CHARACTER],
  wait: [TIME],
  talk: [CHARACTER],
  go: [DIRECTION],
  examine: [INVENTORY, WORLD], // Acts as a reverse priority look
  drop: [INVENTORY],
  default: [WORLD, INVENTORY]
};

// Safer to go world then inventory - for less posibility to get stuck
const interactionPriorities = {
  remove: [
    [WORLD, WORLD],
    [INVENTORY, INVENTORY],
    [INVENTORY, WORLD]
  ], // consider sub item
  get: [[WORLD, INVENTORY]],
  tell: [
    [CHARACTER, "about", KNOWLEDGE],
    [CHARACTER, "to", "jump etc"]
  ],
  show: [
    [INVENTORY, "to", CHARACTER],
    [CHARACTER, INVENTORY]
  ], // show _character_ item - show _item_ to _character_
  ask: [
    [CHARACTER, "about", TOPIC],
    [CHARACTER, "to", "give you diamond"]
  ],
  replace: [[WORLD, INVENTORY]],
  throw: [[INVENTORY, WORLD]],
  drop: [[INVENTORY, WORLD]],
  use: [
    [INVENTORY, WORLD],
    [INVENTORY, INVENTORY]
  ],
  combine: [
    [INVENTORY, INVENTORY],
    [INVENTORY, WORLD]
  ],
  attack: [
    [CHARACTER, INVENTORY],
    [WORLD, INVENTORY]
  ],
  default: [
    [WORLD, INVENTORY],
    [INVENTORY, INVENTORY]
  ]
};

export const getPriorities = (verb, isPrep) => {
  const priorities = isPrep ? interactionPriorities : actionPriorities;
  return priorities[verb] || priorities["default"];
};
