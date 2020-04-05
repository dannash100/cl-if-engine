import { parseCommand, splitAtVerb } from "./parser";

/**
 * n
 * v
 * adj
 * adv
 *
 * get the dog
 * get the red dog
 * get the tiny red dog
 * get the dogs ear
 *
 * Define a prop - give it a bunch of optional adjectives
 * give it a bunch of optional aliases - i.e if you say look at sea, surf, coast, same thing
 * Door - castle door
 * if red key - blue key, green key, make primary prop name red key
 * if only red key - alias as key
 */

/*
  first try - verb on full target text - if none. Try see if prop matches noun adjs
  so the object being operated on is the object of a preposition
  the with 
*/

/*

Open          Door            With              Key
Root
(adjec) mod -> (noun) <- nmod (prepos) <- case (noun)

Prepositions ['with', 'at', 'from', 'into',]
anything after the prep is the obj of the prepositon


Adjectives and adverbs are called modifiers - 
  nmod - propisition of noun
  mod 
*/

// tests = {
//   ['Get the blue key'] : {verb: 'get', target: ['blue', 'key']},
//   ['get The key'] : {verb: 'get', target: 'key'},
//   ['Open door with key'] : {verb: 'open', target: 'door', case:}
// };

const tests = {
  "Get the good dog": {
    verb: "get",
    nouns: "good dog",
    prepositions: undefined,
    priority: ["world"]
  },
  "Pickup the Dog": {
    verb: "get",
    nouns: "dog",
    prepositions: undefined,
    priority: ["world"]
  },
  "Take the dog": {
    verb: "get",
    nouns: "dog",
    prepositions: undefined,
    priority: ["world"]
  },
  " Take  the   muffin man ": {
    verb: "get",
    nouns: "muffin man",
    preposition: undefined,
    priority: ["world"]
  },
  "Open the red door": {
    verb: "open",
    nouns: "red door",
    prepositions: undefined,
    priority: ["world", "inventory"]
  },
  "Turn handle clockwise": {
    verb: "turn",
    noun: "handle",
    direction: "clockwise",
    preposition: undefined,
    priority: ["world", "inventory"]
  },
  save: {
    keyword: "save"
  },
  "save game": {
    keyword: "save"
  },
  "Steal ruby from king": {
    verb: "steal",
    nouns: ["ruby", "king"],
    preposition: "from",
    priority: [["world", "character"]]
  },
  "Tell king about road": {
    verb: "tell",
    nouns: ["king", "road"],
    preposition: "about",
    priority: ["character", "knowledge"]
  },
  "Tell king to run": {
    verb: "tell",
    nouns: ["king", "run"],
    preposition: "to",
    priority: ["character", "request"]
  },
  "Show ruby to the king": {
    verb: "show",
    nouns: ["ruby", "king"],
    preposition: 'to',
    priority: ["inventory", "character"]
  }
};

describe("Parser understands user input", () => {
  it("understands basic get commands with aliases", () => {
    Object.keys(tests).forEach(test => {
      expect(parseCommand(test)).toEqual(tests[test]);
    });
  });
  it("understands special cases", () => {
    console.log(parseCommand("Turn handle clockwise"));
    console.log(parseCommand("go up"));
    console.log(parseCommand("go s e"));
    console.log(parseCommand("Open the red door"));
    console.log(parseCommand("Combine shoe with the tooth"));
    console.log(parseCommand("Jump into red river"));
    console.log(parseCommand("Use shoe on cat"));
    // Need to not be treated as prep
    // Maybe dont need prep
    console.log(parseCommand("Break into house"));
    console.log(parseCommand("Steal ruby from king"));
    console.log(parseCommand("Tell king about the road"));
    console.log(parseCommand("Tell king about the road"));
  });
});
