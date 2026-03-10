function flat(arr, depth = 1) {
  const result = [];
  for (let item of arr) {
    if (item) {
      if (Array.isArray(item) && depth) {
        result.push(...flat(item, depth - 1));
      } else {
        result.push(item);
      }
    }
  }
  return result;
}

const arr = [1, [2], [3, [4]]];
console.log(flat(arr));
// [1, 2, 3, [4]]
console.log(flat(arr, 1));
// [1, 2, 3, [4]]
console.log(flat(arr, 2));
// [1, 2, 3, 4]
