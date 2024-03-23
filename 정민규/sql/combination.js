const getCombination = (ary, n) => {
  if (n === 1) return ary.map((v) => [v]);

  const ret = [];
  ary.forEach((fixed, idx) => {
    const rest = ary.slice(idx + 1);

    const combination = getCombination(rest, n - 1);
    const attach = combination.map((v) => [fixed, ...v]);
    ret.push(...attach);
  });
  return ret;
};

console.log(getCombination([1, 2, 3, 4, 5], 3));
