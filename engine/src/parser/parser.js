import {
  prepositions,
  getPriorities,
  verbAliases,
  keywordAliases,
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
  const cleanCmd = clean(cmd);
  const keyword = checkForKeyword(cleanCmd);
  if (keyword) return { keyword };
  const [verb, remaining] = splitAtVerb(cleanCmd);
  const preposition = prepositions.find(prep =>
    getPrepRegex(prep).test(remaining)
  );
  let nouns;
  if (preposition) {
    const [before, after] = remaining.split(preposition);
    nouns = before ? [before, after].map(s => s.trim()) : after.trim();
  } else {
    nouns = remaining;
  }
  return {
    verb,
    ...parseByVerb(verb, nouns),
    preposition,
    priority: getPriorities(verb, preposition, Array.isArray(nouns))
  };
};

export const checkForKeyword = cmd =>
  Object.keys(keywordAliases).find(keyword =>
    [keyword, ...keywordAliases[keyword]].includes(cmd)
  );

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
