function solution(land) {
  const dp = [0, 0, 0, 0];

  for (const score of land) {
    const tmp = [...dp];
    for (let i = 0; i < 4; i++) {
      dp[i] = Math.max(...tmp.filter((v, idx) => idx !== i)) + score[i];
    }
    console.log(dp);
  }

  return Math.max(...dp);
}
