function solution(numbers) {
  const key = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    "*": 9,
    0: 10,
    "#": 11,
  };

  const getLen = (a, b) => {
    if (a == b) return 1;
    const [aR, aC] = [~~(a / 3), a % 3];
    const [bR, bC] = [~~(b / 3), b % 3];
    const [r, c] = [Math.abs(aR - bR), Math.abs(aC - bC)];
    const [rightAngle, diagonal] = [
      Math.abs(r - c),
      Math.max(r, c) - Math.abs(r - c),
    ];
    return 2 * rightAngle + 3 * diagonal;
  };

  let dp = [...Array(12)].map((_) => Array(12).fill(Infinity));
  dp[key[4]][key[6]] = 0;
  for (const number of numbers) {
    const n = key[number];
    const tmp = [...Array(12)].map((_) => Array(12).fill(Infinity));
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        if (i === j) continue;
        if (dp[i][j] !== Infinity) {
          tmp[i][n] = Math.min(dp[i][j] + getLen(j, n), tmp[i][n]);
          tmp[n][j] = Math.min(dp[i][j] + getLen(i, n), tmp[n][j]);
        }
      }
    }
    dp = tmp;
  }

  let ret = Infinity;
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
      ret = ret > dp[i][j] ? dp[i][j] : ret;
    }
  }
  return ret;
}
