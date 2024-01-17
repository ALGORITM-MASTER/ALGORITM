function solution(n, times) {
  //첫 시작값을 최대 시간값 * n으로 잡아서 넉넉하게 둠
  let [start, end] = [0n, BigInt(n * Math.max(...times))];

  //time분안에 손님들을 전부 처리할 수 있는지 검사
  const isCanPass = (time) =>
    times.reduce((a, c) => a + ~~(time / BigInt(c)), 0n) >= n ? true : false;

  //이분탐색
  while (start <= end) {
    const mid = ~~((start + end) / 2n);
    if (isCanPass(mid)) end = mid - 1n;
    else start = mid + 1n;
  }
  return start;
}
