function solution(number, limit, power) {
  const lst = [...new Array(number)].map((v, idx) => {
    const num = idx + 1;
    let cnt = 0;
    for (let i = 1; i <= num ** 0.5; i++) {
      if (!(num % i)) {
        cnt++;
        if (num / i != i) cnt++;
      }
    }
    return cnt;
  });
  const ret = lst.reduce((a, c) => (c > limit ? a + power : a + c), 0);

  return ret;
}
