function solution(board) {
  const len = board.length;
  const dc = [1, 0, -1, 0];
  const dr = [0, 1, 0, -1];

  //가로 -> 왼쪽이 기준
  //세로 -> 위가 기준
  //사방향 조회순서는 우->하->좌->상

  const isCanGo = (r, c) => {
    if (0 <= r && r < len && 0 <= c && c < len && !board[r][c]) return true;
    return false;
  };

  const rotate = (r, c, isRow) => {
    const dr = isRow
      ? [
          [1, 1],
          [-1, -1],
        ]
      : [
          [0, 1],
          [0, 1],
        ];
    const dc = isRow
      ? [
          [0, 1],
          [0, 1],
        ]
      : [
          [1, 1],
          [-1, -1],
        ];
    const nxDirection = +!isRow;

    const sR = isRow
      ? [
          [0, 0],
          [-1, -1],
        ]
      : [
          [0, 1],
          [0, 1],
        ];
    const sC = isRow
      ? [
          [0, 1],
          [0, 1],
        ]
      : [
          [0, 0],
          [-1, -1],
        ];

    const ret = [];
    outer: for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const nR = r + dr[i][j];
        const nC = c + dc[i][j];
        if (!isCanGo(nR, nC)) continue outer;
      }

      for (let j = 0; j < 2; j++) {
        const retR = r + sR[i][j];
        const retC = c + sC[i][j];
        ret.push([retR, retC, nxDirection]);
      }
    }
    return ret;
  };

  //첫번째는 세로 , 두번째는 가로의 방문여부
  const visited = [...Array(len)].map((_) =>
    [...Array(len)].map((_) => [0, 0])
  );

  const que = [[0, 0, 1, 0]];
  let queIdx = 0;
  let ret = Infinity;
  while (queIdx < que.length) {
    const [r, c, isRow, cnt] = que[queIdx];
    const otherR = isRow ? r : r + 1;
    const otherC = isRow ? c + 1 : c;

    if (visited[r][c][isRow]) {
      queIdx++;
      continue;
    }
    visited[r][c][isRow] = true;
    if (otherR === len - 1 && otherC === len - 1) {
      ret = Math.min(ret, cnt);
    }

    for (let d = 0; d < 4; d++) {
      const [nR, nC] = [r + dr[d], c + dc[d]];
      const [nOtherR, nOtherC] = [otherR + dr[d], otherC + dc[d]];
      if (isCanGo(nR, nC) && isCanGo(nOtherR, nOtherC)) {
        que.push([nR, nC, isRow, cnt + 1]);
      }
    }
    for (const [nR, nC, nIsRow] of rotate(r, c, isRow)) {
      que.push([nR, nC, nIsRow, cnt + 1]);
    }

    queIdx++;
  }
  return ret;
}
