/**
 * @param {any[]} arr
 * @returns {?} - sorry no type hint for this
 */
function wrap(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      if (prop === Symbol.iterator) {
        return target[prop];
      }
      let index = +prop;
      if (index < 0) {
        index += arr.length;
        return target[index];
      }
      return target[prop];
    },
    set(target, prop, value) {
      let index = +prop;
      if (index < 0) {
        index += arr.length;
        target[index] = value;
        if (index < 0) {
          throw new Error("Overflow");
        }
        return;
      }

      target[prop] = value;
      return true;
    },
  });
}

const originalArr = [1, 2, 3];
const arr = wrap(originalArr);
arr[0]; // 1
arr[1]; // 2
arr[2]; // 3
arr[3]; // undefined
arr[-1]; // 3
arr[-2]; // 2
arr[-3]; // 1
arr[-4]; // undefined

arr.push(4);
arr[3]; // 4
originalArr[3]; // 4
arr.shift();
arr[0]; // 2
originalArr[0]; // 2
arr.bfe = "bfe";
originalArr.bfe; // 'bfe'
arr[-1] = 5;
arr; // [2,3,5]
originalArr; // [2,3,5]
originalArr[2] = 6;
arr; // [2,3,6]
originalArr; // [2,3,6]
