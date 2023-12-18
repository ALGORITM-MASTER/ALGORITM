function solution(storey) {
  let ary = [0, ...[...(storey + "")].map((v) => +v)];

  for (let i = ary.length - 1; i > 0; i--) {
    if (ary[i] < 5) continue;
    else if (ary[i] === 5 && ary[i - 1] < 5) continue;

    ary[i] = 10 - ary[i];
    ary[i - 1]++;
  }
  return ary.reduce((a, c) => a + c, 0);
}
