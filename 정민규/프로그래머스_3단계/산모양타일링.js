function solution(n, tops) {
  const dp = tops[0] === 1 ? [1, 4] : [1, 3]; // 밑바닥 사다리꼴모양
  const dp2 = tops[0] === 1 ? [0, 3] : [0, 2]; // 밑바닥 마름모모양

  for (let i = 2; i <= n; i++) {
    const multi = tops[i - 1] ? 3 : 2;
    const multi2 = tops[i - 1] ? 2 : 1;
    dp[i] = (dp[i - 1] * multi + dp2[i - 1]) % 10007;
    dp2[i] = (dp2[i - 1] * multi + dp[i - 2] * multi2) % 10007;
  }

  return dp[dp.length - 1];
}
