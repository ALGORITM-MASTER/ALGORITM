function solution(scores) {
  const ary = [];
  const [wanhoA, wanhoB] = scores[0];

  for (let i = 0; i < scores.length; i++) {
    const [a, b] = scores[i];
    if (a + b > wanhoA + wanhoB) ary.push([a, b]);
    if (a > wanhoA && b > wanhoB) return -1;
  }

  let ret = 1;
  outer: for (let i = 0; i < ary.length; i++) {
    const [a, b] = ary[i];
    for (let j = 0; j < ary.length; j++) {
      const [tA, tB] = ary[j];
      if (tA > a && tB > b) continue outer;
    }
    ret += 1;
  }

  return ret;
}
