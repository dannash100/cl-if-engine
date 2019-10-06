import {parseCommand, splitAtVerb} from './parser'


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

describe('Parser understands user input', () => {
  console.log(parseCommand('pickup the dog'))
  console.log(parseCommand('get the dog'))
  console.log(parseCommand('use dog with cat'))
});