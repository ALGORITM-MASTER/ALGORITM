function solution(game_board, table) {
  const dc = [1, 0, -1, 0];
  const dr = [0, 1, 0, -1];
  const len = table.length;

  //퍼즐조각들의 정보를 가져옴
  const getPuzzle = (table) => {
    const visited = [...Array(len)].map((v) => Array(len).fill(false));

    const dfs = (cood, relativeCood) => {
      const [r, c] = cood;
      const [rR, rC] = relativeCood;
      if (visited[r][c]) return [];
      visited[r][c] = true;
      const ret = [[rR, rC]];
      for (let d = 0; d < 4; d++) {
        const [nR, nC] = [r + dr[d], c + dc[d]];
        const [nRR, nRC] = [rR + dr[d], rC + dc[d]];
        if (0 <= nR && nR < len && 0 <= nC && nC < len && table[nR][nC])
          ret.push(...dfs([nR, nC], [nRR, nRC]));
      }
      return ret;
    };
    const ret = [];
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (table[i][j] && !visited[i][j]) ret.push(dfs([i, j], [0, 0]));
      }
    }
    return ret;
  };

  //좌표를 우측으로 회전
  const lotateCoodRight = ([r, c]) => {
    return [c, -r];
  };

  //회전한 4가지 piece를 가져옴
  const lotatePiece = (piece) => {
    const ret = [piece];
    for (let i = 0; i < 3; i++) {
      const tmp = [];
      for (const cood of ret[ret.length - 1]) {
        tmp.push(lotateCoodRight(cood));
      }
      ret.push(tmp);
    }
    return ret;
  };

  let pieces = [];
  for (const i of getPuzzle(table)) {
    pieces.push(lotatePiece(i));
  }

  const canPutPiece = (piece, r, c) => {
    for (const [dR, dC] of piece) {
      const [nR, nC] = [r + dR, c + dC];
      if (0 <= nR && nR < len && 0 <= nC && nC < len && !game_board[nR][nC])
        continue;
      return false;
    }

    return true;
  };

  const isNearEmpty = (piece, r, c) => {
    for (const [dR, dC] of piece) {
      const [nR, nC] = [r + dR, c + dC];
      for (let i = 0; i < 4; i++) {
        const [nnR, nnC] = [nR + dr[i], nC + dc[i]];
        if (
          0 <= nnR &&
          nnR < len &&
          0 <= nnC &&
          nnC < len &&
          !game_board[nnR][nnC]
        )
          return true;
      }
    }

    return false;
  };

  //보드를바꾸는 함수 (제거하거나 조각을 넣거나)
  const changeBoard = (piece, r, c, isPut) => {
    for (const [dR, dC] of piece) {
      const [nR, nC] = [r + dR, c + dC];
      game_board[nR][nC] = isPut ? 2 : 0;
    }
  };

  let ret = 0;

  const dfs = (cR, cC, cnt, pieces) => {
    if (cR >= len) return;
    if (cnt > ret) ret = cnt;

    const [nR, nC] = [cR + ~~((cC + 1) / len), (cC + 1) % len];
    for (let idx = 0; idx < pieces.length; idx++) {
      const curPiece = pieces[idx];
      for (const piece of curPiece) {
        if (canPutPiece(piece, cR, cC)) {
          changeBoard(piece, cR, cC, true);
          const removePiece = pieces.filter((v, i) => i !== idx);
          if (!isNearEmpty(piece, cR, cC))
            dfs(nR, nC, cnt + piece.length, removePiece);
          changeBoard(piece, cR, cC, false);
        }
      }
    }
    dfs(nR, nC, cnt, pieces);
  };

  dfs(0, 0, 0, pieces);
  return ret;
}
