function solution(n, l, r) {
  const oneCnt = [0, 1, 2, 2, 3, 4];

  const recur = (n, pos) => {
    if (n == 1) return oneCnt[pos];
    const [share, remain] = [~~(pos / 5 ** (n - 1)), pos % 5 ** (n - 1)];

    if (share < 2) return 4 ** (n - 1) * share + recur(n - 1, remain);
    else if (share === 2) return 2 * 4 ** (n - 1);
    else return 4 ** (n - 1) * (share - 1) + recur(n - 1, remain);
  };
  return recur(n, r) - recur(n, l - 1);
}
