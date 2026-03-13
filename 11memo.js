/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  const cache = {};
  return function (...args) {
    const key = resolver ? resolver(...args) : args.join("_");
    if (cache[key]) {
      return cache[key];
    }
    const result = func.apply(this, args);
    cache[key] = result;
    return result;
  };
}

let callCount = 0;
const func = (a, b) => {
  callCount += 1;
  return a + b;
};
const memoed = memo(func, (a, b) => ((a + b) % 2 === 0 ? "even" : "odd"));
memoed(1, 2);
console.log(callCount); // 1
memoed(1, 4);
console.log(callCount); // 1
memoed(1, 3);
console.log(callCount); // 2
memoed(11, 31);
console.log(callCount); // 2
