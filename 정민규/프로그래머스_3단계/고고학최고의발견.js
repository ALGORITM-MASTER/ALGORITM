function solution(clockHands) {
  const len = clockHands.length;
  const dc = [0, 1, 0, -1, 0];
  const dr = [0, 0, 1, 0, -1];

  const change = (r, c, map) => {
    for (let k = 0; k < 5; k++) {
      const [nr, nc] = [r + dr[k], c + dc[k]];
      if (0 <= nr && nr < len && 0 <= nc && nc < len) {
        map[nr][nc] = (map[nr][nc] + 1) % 4;
      }
    }
  };

  const checkMap = (map) => {
    const tmpMap = map.map((v) => [...v]);
    let ret = 0;
    for (let i = 1; i < len; i++) {
      for (let j = 0; j < len; j++) {
        for (let k = 0; k < tmpMap[i - 1][j] % 4; k++) {
          change(i, j, tmpMap);
          ret++;
        }
      }
    }

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (tmpMap[i][j]) return false;
      }
    }
    return ret;
  };

  const retAry = [];
  const dfs = (n, cnt) => {
    if (n === len) {
      const ret = checkMap(clockHands);
      if (ret !== false) retAry.push(ret + cnt);
      return;
    }

    for (let i = 0; i < 4; i++) {
      dfs(n + 1, cnt + i);
      change(0, n, clockHands);
    }
  };
  dfs(0, 0);
  return Math.min(...retAry);
}
