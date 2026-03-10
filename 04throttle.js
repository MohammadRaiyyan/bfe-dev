function throttle(func, wait) {
  let waiting = 0;

  return function (...args) {
    const now = Date.now();
    console.log("now - waiting >= wait", now - waiting >= wait);
    if (now - waiting >= wait) {
      waiting = now;
      func.apply(this, args);
    }
  };
}

let currentTime = 0;
const run = (input) => {
  currentTime = 0;
  const calls = [];
  const func = (arg) => {
    calls.push(`${arg}@${currentTime}`);
  };
  const throttled = throttle(func, 3);
  input.forEach((call) => {
    const [arg, time] = call.split("@");
    setTimeout(() => throttled(arg), time);
  });
  return calls;
};
console.log(run(["A@0", "B@2", "C@3"]));
//["A@0", "C@3"]
