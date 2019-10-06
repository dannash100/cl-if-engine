export const prepositions = Object.values(prepAliases).reduce(
  (a, b) => a.concat(b),
  Object.keys(actionsToPrepositons)
);

const prepAliases = {
  on: ["onto", "on to"],
  in: ["into", "on to"],
  put: ["place"],
  get: ["take"]
};

// finish

export const actionsToPrepositons = {
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

export const aliases = {
  get: ["take", "pickup", "pick up"],
  use: ["operate"]
};

const WORLD = "world";
const INVENTORY = "inventory";
export const getPriorities = verb =>
  ({
    get: [WORLD],
    use: [[INVENTORY, WORLD], [INVENTORY, INVENTORY]],
    replace: [[WORLD, INVENTORY]],
    combine: [[INVENTORY, INVENTORY], [INVENTORY, WORLD]],
    examine: [[INVENTORY, INVENTORY], [WORLD, INVENTORY]]
  }[verb]);
