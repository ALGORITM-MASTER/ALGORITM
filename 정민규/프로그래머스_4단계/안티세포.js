function solution(a, s) {
  const bs = [];
  let tmp = 0;
  for (const len of s) {
    bs.push(a.slice(tmp, tmp + len));
    tmp += len;
  }

  const concatIdxAndBeforeIdx = (i, ary) => {
    const ret = [];
    for (let j = 0; j < ary.length; j++) {
      if (j === i - 1) ret.push(ary[j] + ary[j + 1]);
      else if (j === i) continue;
      else ret.push(ary[j]);
    }
    return ret;
  };

  const ret = [];
  for (const b of bs) {
    const n = b.length;

    const stk = [[0, [...b]]];
    let cnt = 0;
    while (stk.length) {
      const [i, ary] = stk.pop();

      if (i === ary.length) {
        cnt += 1;
        continue;
      }
      if (i > 0 && ary[i] === ary[i - 1]) {
        const nxAry = concatIdxAndBeforeIdx(i, ary);
        stk.push([i - 1, nxAry]);
      }
      stk.push([i + 1, [...ary]]);
    }
    ret.push(cnt);
  }

  return ret;
}
