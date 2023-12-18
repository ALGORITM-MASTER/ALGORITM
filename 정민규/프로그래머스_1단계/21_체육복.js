function solution(n, lost, reserve) {
  var ret = [...new Array(n)].fill(1);

  lost.forEach((el) => (ret[el - 1] = 0));
  reserve
    .sort((a, b) => a - b)
    .forEach((el) => {
      if (lost.includes(el)) ret[el - 1]++;
      else if (ret[el - 2] === 0) ret[el - 2]++;
      else if (ret[el] === 0) ret[el]++;
    });

  return ret.reduce((a, c) => (c ? a + 1 : a), 0);
}
