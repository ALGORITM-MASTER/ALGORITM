function solution(board) {
  const dc = [1, 0, -1, 0];
  const dr = [0, 1, 0, -1];
  const len = board.length;

  const isCanGo = (r, c) => {
    if (0 <= r && r < len && 0 <= c && c < len && !board[r][c]) return true;
    return false;
  };
  const bfs = (sR, sC) => {
    const que = [];
    let queIdx = 0;
    const dp = [...Array(len)].map((_) => Array(len).fill(Infinity));

    //초기화
    dp[sR][sC] = 0;
    if (!board[0][1]) {
      dp[0][1] = 100;
      que.push([0, 1, 100, 0]);
    }
    if (!board[1][0]) {
      dp[1][0] = 100;
      que.push([1, 0, 100, 1]);
    }

    while (queIdx < que.length) {
      const [r, c, cnt, d] = que[queIdx];

      if (r === len - 1 && c === len - 1) {
        ret = Math.min(ret, cnt);
        queIdx++;
        continue;
      }

      for (let k = 0; k < 4; k++) {
        const [nR, nC] = [r + dr[k], c + dc[k]];
        const nCnt = cnt + (d === k ? 100 : 600);
        if (isCanGo(nR, nC) && dp[nR][nC] + 500 > nCnt) {
          que.push([nR, nC, nCnt, k]);
          dp[nR][nC] = nCnt;
        }
      }

      queIdx++;
    }

    for (let i = 0; i < len; i++) {
      console.log(dp[i]);
    }
  };

  let ret = Infinity;
  bfs(0, 0);
  return ret;
}
