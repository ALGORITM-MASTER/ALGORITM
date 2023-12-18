function solution(n) {
  let ret = 0;

  while (n > 0) {
    if (n % 2) {
      n = (n - 1) / 2;
      ret += 1;
    } else n = n / 2;
  }

  return ret;
}
