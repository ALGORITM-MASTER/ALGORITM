function solution(n, money) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;

  for (const currency of money) {
    for (let i = currency; i <= n; i += 1) {
      dp[i] += dp[i - currency];
    }
  }
  return dp[n];
}
