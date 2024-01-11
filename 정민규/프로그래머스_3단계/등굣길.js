function solution(m, n, puddles) {
  const dp = [...Array(n + 1)].map((_) => Array(m + 1).fill(0));

  for (const [c, r] of puddles) {
    dp[r][c] = 1;
  }
  dp[0][1] = 1;

  for (let r = 1; r <= n; r++) {
    for (let c = 1; c <= m; c++) {
      if (dp[r][c]) dp[r][c] = 0;
      else dp[r][c] = (dp[r - 1][c] + dp[r][c - 1]) % 1000000007;
    }
  }

  return dp[n][m];
}
