function solution(board, r, c) {
  const dc = [1, 0, -1, 0];
  const dr = [0, 1, 0, -1];

  const isInBoard = (r, c) => {
    if (0 <= r && r < 4 && 0 <= c && c < 4) return true;
    return false;
  };

  const ctrlMove = (d, r, c, board) => {
    do {
      r += dr[d];
      c += dc[d];
    } while (isInBoard(r, c) && board[r][c] === 0);
    if (!isInBoard(r, c)) {
      r -= dr[d];
      c -= dc[d];
    }
    return [r, c];
  };

  const isClear = (board) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] !== 0) return false;
      }
    }
    return true;
  };
  const copyBoard = (ary) => [0, 0, 0, 0].map((_, i) => [...ary[i]]);

  let ret = Infinity;

  function beforeOpenCard(sR, sC, board, cnt) {
    const visited = [0, 0, 0, 0].map((_) => [0, 0, 0, 0]);
    visited[sR][sC] = 1;
    const que = [[sR, sC, cnt]];
    let queIdx = 0;
    const startCnt = cnt;

    while (queIdx < que.length) {
      const [r, c, cnt] = que[queIdx];

      //앞면 오픈
      if (board[r][c] !== 0) {
        const nxBoard = copyBoard(board);
        const target = board[r][c];
        nxBoard[r][c] = 0;

        afterOpenCard(r, c, nxBoard, target, cnt + 1);
      }

      //ctrl움직임
      for (let d = 0; d < 4; d++) {
        const [nR, nC] = ctrlMove(d, r, c, board);
        if (isInBoard(nR, nC) && !visited[nR][nC]) {
          visited[nR][nC] = 1;
          que.push([nR, nC, cnt + 1]);
        }
      }
      //일반 움직임
      for (let d = 0; d < 4; d++) {
        const [nR, nC] = [r + dr[d], c + dc[d]];
        if (isInBoard(nR, nC) && !visited[nR][nC]) {
          visited[nR][nC] = 1;
          que.push([nR, nC, cnt + 1]);
        }
      }
      queIdx++;
    }
  }

  function afterOpenCard(sR, sC, board, target, cnt) {
    const visited = [0, 0, 0, 0].map((_) => [0, 0, 0, 0]);
    visited[sR][sC] = 1;
    const que = [[sR, sC, cnt]];
    let queIdx = 0;
    const startCnt = cnt;

    while (queIdx < que.length) {
      const [r, c, cnt] = que[queIdx];

      if (board[r][c] === target) {
        const nxBoard = copyBoard(board);
        nxBoard[r][c] = 0;
        if (isClear(nxBoard)) {
          ret = Math.min(ret, cnt + 1);
          return;
        }

        beforeOpenCard(r, c, nxBoard, cnt + 1);
      }

      //ctrl움직임
      for (let d = 0; d < 4; d++) {
        const [nR, nC] = ctrlMove(d, r, c, board);
        if (isInBoard(nR, nC) && !visited[nR][nC]) {
          visited[nR][nC] = 1;
          que.push([nR, nC, cnt + 1]);
        }
      }
      //일반 움직임
      for (let d = 0; d < 4; d++) {
        const [nR, nC] = [r + dr[d], c + dc[d]];
        if (isInBoard(nR, nC) && !visited[nR][nC]) {
          visited[nR][nC] = 1;
          que.push([nR, nC, cnt + 1]);
        }
      }
      queIdx++;
    }
  }

  beforeOpenCard(r, c, copyBoard(board), 0);
  return ret;
}
