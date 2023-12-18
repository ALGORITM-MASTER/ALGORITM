function solution(n, m, x, y, queries) {
  let minR = BigInt(x);
  let maxR = BigInt(x);
  let minC = BigInt(y);
  let maxC = BigInt(y);

  while (queries.length) {
    let [dist, cnt] = queries.pop();
    cnt = BigInt(cnt);

    if (dist === 0) {
      if (minC !== 0n) minC = minC + cnt;
      maxC = maxC + cnt;
    } else if (dist === 1) {
      if (maxC !== BigInt(m - 1)) maxC = maxC - cnt;
      minC = minC - cnt;
    } else if (dist === 2) {
      if (minR !== 0n) minR = minR + cnt;
      maxR = maxR + cnt;
    } else if (dist === 3) {
      if (maxR !== BigInt(n - 1)) maxR = maxR - cnt;
      minR = minR - cnt;
    }

    if (maxR < 0 || maxC < 0 || minR >= n || minC >= m) return 0;
    minR = minR < 0n ? 0n : minR;
    maxR = maxR >= BigInt(n) ? BigInt(n - 1) : maxR;
    minC = minC < 0n ? 0n : minC;
    maxC = maxC >= BigInt(m) ? BigInt(m - 1) : maxC;
  }

  const ret = (maxR - minR + 1n) * (maxC - minC + 1n);

  return ret;
}
