/**
 * @param {string} str
 * @return {string}
 */
function snakeToCamel(str) {
  return str.replace(
    /([^_])_([^_])/g,
    (_, before, after) => before + after.toUpperCase(),
  );
}
