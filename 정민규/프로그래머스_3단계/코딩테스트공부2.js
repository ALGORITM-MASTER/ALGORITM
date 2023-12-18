function solution(alp, cop, problems) {
  let maxAlp = alp;
  let maxCop = cop;

  for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
    if (alp_req > maxAlp) maxAlp = alp_req;
    if (cop_req > maxCop) maxCop = cop_req;
  }

  const dp = [...Array(maxCop + 1)].map((_, c) =>
    [...Array(maxAlp + 1)].map((__, a) => c + a - alp - cop)
  );

  for (let i = cop; i <= maxCop; i++) {
    for (let j = alp; j <= maxAlp; j++) {
      for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
        if (alp_req > j || cop_req > i) continue;
        const nxCop = i + cop_rwd > maxCop ? maxCop : i + cop_rwd;
        const nxAlp = j + alp_rwd > maxAlp ? maxAlp : j + alp_rwd;
        if (dp[nxCop][nxAlp] > dp[i][j] + cost)
          dp[nxCop][nxAlp] = dp[i][j] + cost;
      }
    }
  }

  return dp[maxCop][maxAlp];
}
