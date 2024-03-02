const getCombination = (ary, n) => {
  if (n === 1) return ary.map((v) => [v]);
  let ret = [];
  ary.forEach((fixed, i, arr) => {
    const rest = arr.slice(i + 1);

    const combinations = getCombination(rest, n - 1);
    const attach = combinations.map((v) => [fixed, ...v]);
    ret.push(...attach);
  });
  return ret;
};

console.log(getCombination([1, 2, 3, 4], 2));
