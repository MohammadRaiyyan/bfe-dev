function defaultIsEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((aItem, i) => aItem === b[i]);
}
/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */

function memoizeOne(func, isEqual = defaultIsEqual) {
  let lastArgs = [];
  let result;
  let lastThis;
  return function (...args) {
    if (isEqual(lastArgs, args) && lastThis === this) {
      return result;
    }
    result = func.apply(this, args);
    lastArgs = args;
    lastThis = this;
    return result;
  };
}
