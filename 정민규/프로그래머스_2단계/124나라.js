function solution(n) {
  let ret = "";

  while (n > 0) {
    if (n % 3 === 0) {
      ret = "4" + ret;
      n = ~~(n / 3) - 1;
    } else {
      ret = (n % 3) + ret;
      n = ~~(n / 3);
    }
  }

  return ret;
}
