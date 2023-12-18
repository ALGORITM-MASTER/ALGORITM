function solution(r1, r2) {
  let ret = 0;
  for (let i = 1; i <= r2; i++) {
    let len_r1 = ~~Math.ceil((r1 ** 2 - i ** 2) ** 0.5);
    const len_r2 = ~~((r2 ** 2 - i ** 2) ** 0.5);

    ret += len_r2 - len_r1 + 1;
  }
  return ret * 4;
}
