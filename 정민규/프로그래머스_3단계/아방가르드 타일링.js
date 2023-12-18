function solution(n) {
  const dp = [1, 1, 3, 10, 23, 62, 170];
  const sum = [1, 1, 3, 11, 24, 65, 181];

  for (let i = 7; i <= n; i++) {
    dp.push(
      (dp[i - 1] +
        dp[i - 2] * 2 +
        dp[i - 3] * 5 +
        sum[i - 4] * 2 +
        sum[i - 5] * 2 +
        sum[i - 6] * 4) %
        1000000007
    );
    sum.push((dp[i] + sum[i - 3]) % 1000000007);
  }
  return dp[n];
}
