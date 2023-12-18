const getDivisor = (n) => {
  const ret = [];
  for (let i = 1; i <= n ** 0.5; i++) {
    if (!(n % i)) {
      ret.push(i);
      if (!(i === n ** 0.5)) ret.push(n / i);
    }
  }
  return ret;
};

function solution(arrayA, arrayB) {
  arrayA.sort((a, b) => a - b);
  arrayB.sort((a, b) => a - b);

  const cul = getDivisor(arrayA[0]).sort((a, b) => a - b);
  const young = getDivisor(arrayB[0]).sort((a, b) => a - b);

  let culNum = 0;
  for (const el of cul) {
    culNum =
      arrayA.every((n) => !(n % el)) && arrayB.every((n) => n % el)
        ? el
        : culNum;
  }
  let youngNum = 0;
  for (const el of young) {
    youngNum =
      arrayB.every((num) => !(num % el)) && arrayA.every((n) => n % el)
        ? el
        : youngNum;
  }

  return Math.max(culNum, youngNum);
}
