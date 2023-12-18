function solution(t, p) {
  let ret = 0;
  for (let i = 0; i < t.length - p.length + 1; i++)
    ret += +t.slice(i, i + p.length) <= +p ? 1 : 0;
  return ret;
}
