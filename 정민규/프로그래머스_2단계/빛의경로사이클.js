function solution(grid) {
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  const visited = [...new Array(grid.length)].map((_, i) =>
    grid[i].split("").map((el) => [...new Array(4).fill(false), el])
  );

  const ret = [];

  const makeRange = (num, range) => {
    if (num < 0) return range + num;
    return num % range;
  };
  const colLen = visited.length;
  const rowLen = visited[0].length;

  for (let i = 0; i < colLen; i++) {
    for (let j = 0; j < rowLen; j++) {
      for (let k = 0; k < 4; k++) {
        if (visited[i][j][k]) continue;

        visited[i][j][k] = true;
        const nx = makeRange(j + dx[k], rowLen);
        const ny = makeRange(i + dy[k], colLen);

        const stk = [[ny, nx, k]];
        let cnt = 1;
        while (stk.length) {
          let [y, x, d] = stk.pop();
          const state = visited[y][x][4];
          if (state === "L") d = makeRange(d - 1, 4);
          else if (state === "R") d = makeRange(d + 1, 4);
          if (visited[y][x][d]) continue;
          visited[y][x][d] = true;
          const nx = makeRange(x + dx[d], rowLen);
          const ny = makeRange(y + dy[d], colLen);
          stk.push([ny, nx, d]);
          cnt++;
        }
        ret.push(cnt);
      }
    }
  }

  return ret.sort((a, b) => a - b);
}
