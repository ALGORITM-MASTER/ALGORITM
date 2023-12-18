function solution(m, n, board) {
  board = board
    .map((v) => v.split(""))
    .reduce(
      (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
      []
    );
  const dy = [0, 0, 1, 1];
  const dx = [0, 1, 0, 1];

  const pullBoard = (board) => {
    return board.map((el) => {
      const stk = [];
      const ret = [];
      for (const v of el) {
        if (v) ret.push(v);
        else stk.push(v);
      }
      return [...stk, ...ret];
    });
  };

  const checkBoard = (board1, board2) => {
    for (let i = 0; i < board1.length; i++) {
      for (let j = 0; j < board1[0].length; j++) {
        if (board1[i][j] !== board2[i][j]) return false;
      }
    }
    return true;
  };

  while (1) {
    let retBoard = board.map((v) => [...v]);

    for (let i = 0; i < retBoard.length - 1; i++) {
      for (let j = 0; j < retBoard[0].length - 1; j++) {
        const word = board[i][j];
        if (
          board[i + 1][j] === word &&
          board[i][j + 1] === word &&
          board[i + 1][j + 1] === word
        ) {
          for (let k = 0; k < 4; k++) {
            retBoard[i + dy[k]][j + dx[k]] = 0;
          }
        }
      }
    }

    const tmpBoard = pullBoard(retBoard);
    if (checkBoard(tmpBoard, board)) break;
    board = tmpBoard.map((v) => [...v]);
  }

  return board.reduce(
    (a, c) => a + c.reduce((a, c) => (c === 0 ? a + 1 : a), 0),
    0
  );
}
