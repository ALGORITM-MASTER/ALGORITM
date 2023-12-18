function solution(target) {
  let ret = 0;

  if (target > 310) {
    target -= 250;
    ret += ~~(target / 60);
    target %= 60;
    target += 250;
  }

  const dp = [...Array(311)].map((v) => [Infinity, 0]);

  for (let i = 1; i <= 20; i++) {
    dp[i * 2] = [1, 0];
    dp[i * 3] = [1, 0];
  }
  for (let i = 1; i <= 20; i++) {
    dp[i] = [1, 1];
  }
  dp[50] = [1, 1];

  for (let i = 21; i < dp.length; i++) {
    for (let j = 1; j < i; j++) {
      const cnt = dp[j][0] + dp[i - j][0];
      const sbCnt = dp[j][1] + dp[i - j][1];
      if (dp[i][0] > cnt) {
        dp[i] = [cnt, sbCnt];
      } else if (dp[i][0] === cnt && dp[i][1] < sbCnt) {
        dp[i] = [cnt, sbCnt];
      }
    }
  }

  dp[target][0] += ret;
  return dp[target];
}
