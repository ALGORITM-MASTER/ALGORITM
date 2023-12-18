function solution(a) {
  if (a.length <= 2) return a.length;
  const left = Array(a.length).fill(0);
  let tmp = Infinity;
  for (let i = 0; i < a.length; i++) {
    if (tmp > a[i]) tmp = a[i];
    left[i] = tmp;
  }
  tmp = Infinity;
  const right = Array(a.length).fill(0);
  for (let i = a.length - 1; i >= 0; i--) {
    if (tmp > a[i]) tmp = a[i];
    right[i] = tmp;
  }

  let ret = 2;
  for (let i = 1; i < a.length - 1; i++) {
    if (left[i - 1] < a[i] && a[i] > right[i + 1]) continue;
    ret += 1;
  }

  return ret;
}
