function solution(board, skill) {
  const rLen = board.length;
  const cLen = board[0].length;

  const cumSumAry = [...Array(rLen)].map((_) => Array(cLen).fill(0));

  for (const [type, r1, c1, r2, c2, degree] of skill) {
    const attack = type === 1 ? -1 : 1;
    cumSumAry[r1][c1] += attack * degree;
    if (c2 + 1 < cLen) cumSumAry[r1][c2 + 1] += -1 * attack * degree;
    if (r2 + 1 < rLen) cumSumAry[r2 + 1][c1] += -1 * attack * degree;
    if (c2 + 1 < cLen && r2 + 1 < rLen)
      cumSumAry[r2 + 1][c2 + 1] += attack * degree;
  }

  for (let i = 0; i < rLen; i++) {
    for (let j = 1; j < cLen; j++) {
      cumSumAry[i][j] += cumSumAry[i][j - 1];
    }
  }
  for (let i = 1; i < rLen; i++) {
    for (let j = 0; j < cLen; j++) {
      cumSumAry[i][j] += cumSumAry[i - 1][j];
    }
  }

  let ret = 0;
  for (let i = 0; i < rLen; i++) {
    for (let j = 0; j < cLen; j++) {
      if (board[i][j] + cumSumAry[i][j] > 0) ret++;
    }
  }
  return ret;
}
