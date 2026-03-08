const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

function curry(fn) {
  return function curried(...args) {
    const isEnoughArgs =
      args.length >= fn.length &&
      args.slice(0, fn.length).every((arg) => arg !== curry.placeholder);
    if (isEnoughArgs) {
      return fn.apply(this, args);
    } else {
      return function (...nextArgs) {
        const replacedArgs = args
          .map((arg) => {
            if (arg === curry.placeholder && nextArgs.length) {
              return nextArgs.shift();
            }
            return arg;
          })
          .concat(nextArgs);
        return curried.apply(this, replacedArgs);
      };
    }
  };
}

const curriedJoin = curry(join);
curry.placeholder = Symbol();
const _ = curry.placeholder;
console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'
console.log(curriedJoin(_, _, _)(1)(_, 3)(2)); // '1_2_3'
