import { prepositions, getPriorities, aliases } from "./parser";
import { actionsToPrepositons } from "./parser.config";

const clean = str =>
  str
    .trim()
    .toLowerCase()
    .replace(/\bthe\b/g, "");

export const parseCommand = cmd => {
  const [verb, remaining] = splitAtVerb(clean(cmd));
  const preposition = prepositions.find(prep =>
    getPrepRegex(prep).test(remaining)
  );
  return {
    verb,
    nouns: preposition ? remaining.split(preposition) : remaining,
    preposition,
    priority: getPriorities(verb)
  };
};

const getPrepRegex = prep => new RegExp(`\\b${prep}\\b`);
const getVerbRegex = verb => new RegExp(`^${verb}\\b`);

// const regex = new RegExp(`(${getVerbRegex(verb)})(.+)(${getPrepRegex(prep)}?)(.+)`)

const validPrepositon = (verb, prep) =>
  actionsToPrepositons[
    prep ||
      Object.keys(prepAlias).find(rootPrep =>
        prepAlias[rootPrep].includes(prep)
      )
  ].includes(verb);

/**
 *
 * @param {String} cmd cleaned inputted command
 * @returns {Array}
 * @property {String} verb root verb of inputted action
 * @property {String} remaining remaining words
 */
export const splitAtVerb = cmd =>
  Object.keys(aliases).reduce((split, key) => {
    const match = aliases[key]
      .concat(key)
      .find(verb => getVerbRegex(verb).test(cmd));
    return match && !split.length
      ? cmd
          .replace(getVerbRegex(match), key)
          .split(new RegExp(`(?<=${key})\\s`))
          .map(str => str.trim())
      : split;
  }, []);
