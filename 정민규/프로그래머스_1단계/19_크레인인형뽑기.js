function solution(board, moves) {
  const stack = [];
  const newBoard = board.reduce(
    (result, row) =>
      row.map((_, i) => (row[i] ? [row[i], ...(result[i] || [])] : [])),
    []
  );

  return moves.reduce((a, c) => {
    const doll = newBoard[c - 1].pop();
    if (doll === stack[stack.length - 1] && stack.length) {
      stack.pop();
      return a + 2;
    }
    if (doll) stack.push(doll);
    return a;
  }, 0);
}
