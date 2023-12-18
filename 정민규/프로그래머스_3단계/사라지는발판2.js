function solution(board, [aR, aC], [bR, bC]) {
  const dr = [1, 0, -1, 0];
  const dc = [0, 1, 0, -1];
  const rLen = board.length;
  const cLen = board[0].length;

  const isFinish = (r, c) => {
    for (let k = 0; k < 4; k++) {
      const nR = r + dr[k];
      const nC = c + dc[k];
      if (0 <= nR && nR < rLen && 0 <= nC && nC < cLen && board[nR][nC])
        return false;
    }
    return true;
  };

  const dfs = (curPR, curPC, othPR, othPC) => {
    if (isFinish(curPR, curPC)) return [false, 0];
    if (curPR === othPR && curPC === othPC) return [true, 1];

    let canWin = false;
    let maxCnt = 0;
    let minCnt = Infinity;

    for (let k = 0; k < 4; k++) {
      const [nR, nC] = [curPR + dr[k], curPC + dc[k]];
      if (!(0 <= nR && nR < rLen && 0 <= nC && nC < cLen && board[nR][nC]))
        continue;

      board[curPR][curPC] = 0;
      const [isOtherWin, cnt] = dfs(othPR, othPC, nR, nC);
      board[othPR][othPC] = 1;

      if (!isOtherWin) {
        canWin = true;
        minCnt = Math.min(minCnt, cnt);
      } else maxCnt = Math.max(maxCnt, cnt);
    }

    return canWin ? [true, minCnt + 1] : [false, maxCnt + 1];
  };

  return dfs(aR, aC, bR, bC)[1];
}
