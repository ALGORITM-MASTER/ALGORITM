const getDivisorCnt = (n) => {
  let ret = 0;
  for (let i = 0; i <= n ** 0.5; i++) {
    if (!(n % i)) ret += 1;
  }
  ret *= 2;
  if (Number.isInteger(n ** 0.5)) ret -= 1;
  return ret;
};

function solution(e, starts) {
  const ret = starts.map((n) => {
    let cnt = getDivisorCnt(n);
    let ret = n;
    for (let i = n; i <= e; i++) {
      const tmp = getDivisorCnt(i);
      if (tmp > cnt) {
        cnt = tmp;
        ret = i;
      }
    }
    return ret;
  });

  return ret;
}
