function solution(lottos, win_nums) {
  return lottos
    .reduce(
      (a, c) =>
        c ? (win_nums.includes(c) ? [a[0], a[1] - 1] : [a[0] + 1, a[1]]) : a,
      [1, 7]
    )
    .map((el) => (el > 6 ? 6 : el));
}
