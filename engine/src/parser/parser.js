import {
  prepositions,
  getPriorities,
  verbAliases,
  getPrepRegex,
  getVerbRegex,
  getSplitAheadRegex,
  parseByVerb
} from "./parser.config";

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
  const nouns = preposition
    ? remaining.split(preposition).map(s => s.trim())
    : remaining;
  return {
    verb,
    ...parseByVerb(verb, nouns),
    preposition,
    priority: getPriorities(verb, Boolean(preposition))
  };
};

/**
 *
 * @param {String} cmd cleaned inputted command
 * @returns {Array}
 * @property {String} verb root verb of inputted action
 * @property {String} remaining remaining words
 */
export const splitAtVerb = cmd =>
  Object.keys(verbAliases).reduce((split, key) => {
    const match = verbAliases[key]
      .concat(key)
      .find(verb => getVerbRegex(verb).test(cmd));
    return match && !split.length
      ? cmd
          .replace(getVerbRegex(match), key)
          .split(getSplitAheadRegex(key))
          .map(s => s.trim())
      : split;
  }, []);
