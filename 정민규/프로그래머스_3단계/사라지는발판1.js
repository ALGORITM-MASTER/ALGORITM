function solution(board, [aR, aC], [bR, bC]) {
  const tmpMap = board.map((v) => [...v]);
  const stk = [[tmpMap, aR, aC, bR, bC, true, 0]];
  const dc = [1, 0, -1, 0];
  const dr = [0, 1, 0, -1];
  const rLen = board.length;
  const cLen = board[0].length;

  const aWin = new Set();
  const bWin = new Set();

  while (stk.length) {
    const [map, aR, aC, bR, bC, isATurn, cnt] = stk.pop();

    const playerR = isATurn ? aR : bR;
    const playerC = isATurn ? aC : bC;

    if (map[playerR][playerC] === 0) {
      if (isATurn) bWin.add(cnt);
      else aWin.add(cnt);
      continue;
    }

    let flg = true;
    const nxMap = map.map((v) => [...v]);
    nxMap[playerR][playerC] = 0;

    for (let k = 0; k < 4; k++) {
      const nxPR = playerR + dr[k];
      const nxPC = playerC + dc[k];

      if (
        0 <= nxPR &&
        nxPR < rLen &&
        0 <= nxPC &&
        nxPC < cLen &&
        nxMap[nxPR][nxPC] !== 0
      ) {
        flg = false;
        if (isATurn) stk.push([nxMap, nxPR, nxPC, bR, bC, false, cnt + 1]);
        else stk.push([nxMap, aR, aC, nxPR, nxPC, true, cnt + 1]);
      }
    }

    if (flg) {
      if (isATurn) bWin.add(cnt);
      else aWin.add(cnt);
    }
  }

  console.log(aWin, bWin);
  const aWinMinCnt = Math.min(...aWin);
  const bWinMinCnt = Math.min(...bWin);

  if (aWinMinCnt < bWinMinCnt) return Math.max(...aWin);
  else return Math.max(...bWin);
}
