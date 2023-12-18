function solution(alp, cop, problems) {
  let [maxAlp, maxCop] = [alp, cop];

  problems.forEach((v) => {
    maxAlp = Math.max(maxAlp, v[0]);
    maxCop = Math.max(maxCop, v[1]);
  });

  const dp = Array.from({ length: maxAlp + 1 }, () =>
    Array.from({ length: maxCop + 1 }, () => Infinity)
  );
  dp[alp][cop] = 0;

  for (let i = alp; i <= maxAlp; i++) {
    for (let j = cop; j <= maxCop; j++) {
      if (i < maxAlp) dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
      if (j < maxCop) dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);
      if (i === maxAlp && j === maxCop) break;
      for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
        if (i < alp_req || j < cop_req) continue;
        let currAlp = i + alp_rwd > maxAlp ? maxAlp : i + alp_rwd;
        let currCop = j + cop_rwd > maxCop ? maxCop : j + cop_rwd;
        dp[currAlp][currCop] = Math.min(dp[currAlp][currCop], dp[i][j] + cost);
      }
    }
  }

  return dp[maxAlp][maxCop];
}
