function solution(N, stages) {
  var ary = [...Array(N)].map((_, i) => [0, 0, i + 1]);

  for (const stage of stages) {
    for (let i = 1; i < stage; i++) ary[i - 1][0] += 1;
    if (stage === N + 1) continue;
    ary[stage - 1][1]++;
    ary[stage - 1][0]++;
  }
  const ret = ary.sort((a, b) => a[0] / a[1] - b[0] / b[1]).map((el) => el[2]);
  return ret;
}
