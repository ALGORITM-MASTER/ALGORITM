function solution(ingredient) {
  let ret = 0;
  let idx = 0;
  while (1) {
    if (
      ingredient[idx] === 1 &&
      ingredient[idx + 1] === 2 &&
      ingredient[idx + 2] === 3 &&
      ingredient[idx + 3] === 1
    ) {
      ret++;
      ingredient.splice(idx, 4);
      idx -= 4;
    }
    idx++;
    if (idx > ingredient.length - 4) break;
  }
  return ret;
}
