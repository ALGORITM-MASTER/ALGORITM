function solution(n, s) {
  if (s / n < 1) return [-1];
  const num = ~~(s / n);

  const ret = Array(n).fill(num);
  for (let i = 1; i <= s % n; i++) {
    ret[n - i] += 1;
  }
  return ret;
}
