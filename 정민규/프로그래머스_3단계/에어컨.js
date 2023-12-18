// 1번 풀이
function solution(temperature, t1, t2, a, b, onboard) {
  const dp = Array.from(Array(onboard.length), (x) => Array(50).fill(Infinity));

  temperature = temperature > t2 ? t1 - (temperature - t2) : temperature;
  temperature += 10;
  t1 += 10;
  t2 += 10;

  dp[0][temperature] = 0;

  // console.log(temperature,t1,t1,a,b)

  for (let i = 1; i < onboard.length; i++) {
    const isPersonInCar = onboard[i];
    for (let j = 0; j < 50; j++) {
      if (isPersonInCar && (j < t1 || j > t2)) continue;

      const candidates = [];
      candidates.push(j > 0 ? dp[i - 1][j - 1] + a : Infinity);
      candidates.push(dp[i - 1][j] + b);
      candidates.push(j < 49 ? dp[i - 1][j + 1] + a : Infinity);

      const dj = j > temperature ? 1 : j === temperature ? 0 : -1;
      if (0 <= j + dj && j + dj < 50) {
        candidates.push(dp[i - 1][j + dj]);
      }

      dp[i][j] = Math.min(...candidates);
    }
    console.log(dp[i]);
  }

  return Math.min(...dp[dp.length - 1]);
}
