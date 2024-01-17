function solution(routes) {
  routes.sort((a, b) => a[0] - b[0]);

  let ret = 0;
  let tmp = -30001;
  for (const [start, end] of routes) {
    if (tmp < start) {
      ret++;
      tmp = end;
    }
    if (tmp > end) tmp = end;
  }
  return ret;
}
