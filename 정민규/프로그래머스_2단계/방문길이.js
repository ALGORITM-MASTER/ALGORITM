v;
function solution(dirs) {
  const d = {
    U: [0, -1],
    R: [1, 0],
    D: [0, 1],
    L: [-1, 0],
  };
  const dIdx = {
    U: 2,
    R: 3,
    D: 0,
    L: 1,
  };

  const ndIdx = {
    U: 0,
    R: 1,
    D: 2,
    L: 3,
  };

  const dp = new Array(11)
    .fill(0)
    .map((_) => new Array(11).fill(0).map((v) => [false, false, false, false]));

  let x = 5;
  let y = 5;
  let ret = 0;
  for (const order of dirs) {
    const [dx, dy] = d[order];
    const [nx, ny] = [x + dx, y + dy];

    if (0 <= nx && nx <= 10 && 0 <= ny && ny <= 10) {
      if (dp[ny][nx][dIdx[order]]) {
        x = nx;
        y = ny;
        continue;
      }
      dp[ny][nx][dIdx[order]] = true;
      dp[y][x][ndIdx[order]] = true;
      x = nx;
      y = ny;
      ret++;
    }
  }
  return ret;
}
