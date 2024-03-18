function solution(board) {
  const { length } = board;

  //퍼즐정보 저장
  const firstR = [
    [0, 0, 0, 1],
    [0, 0, 1, 2],
    [0, 1, 1, 1],
    [0, 1, 2, 2],
  ];
  const firstC = [
    [0, 1, 2, 2],
    [0, 1, 0, 0],
    [0, 0, 1, 2],
    [0, 0, 0, -1],
  ];
  const secondR = [
    [0, 0, 0, 1],
    [0, 1, 2, 2],
    [0, 1, 1, 1],
    [0, 0, 1, 2],
  ];
  const secondC = [
    [0, 1, 2, 0],
    [0, 0, 0, 1],
    [0, -2, -1, 0],
    [0, 1, 1, 1],
  ];
  const thirdR = [
    [0, 1, 1, 1],
    [0, 1, 1, 2],
    [0, 0, 0, 1],
    [0, 1, 1, 2],
  ];
  const thirdC = [
    [0, -1, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 2, 1],
    [0, -1, 0, 0],
  ];

  const pR = [...firstR, ...secondR, ...thirdR];
  const pC = [...firstC, ...secondC, ...thirdC];

  //삭제할때 위가 뚫려있는지 확인해야 하는 부분 정보
  const deleteR = [0, 0, [0, 0], [1], 0, [1], [0, 0], 0, [0, 0], 0, 0, 0];
  const deleteC = [0, 0, [1, 2], [-1], 0, [1], [-2, -1], 0, [-1, 1], 0, 0, 0];

  //완성이 가능,불가능한 퍼즐 정보 생성
  const isAblePuzzle = [0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0];
  // r,c가 유효한 보드 범위 내인지
  const isCanGo = (r, c) => 0 <= r && r < length && 0 <= c && c < length;

  const getPuzzleType = (r, c, num, board) => {
    outer: for (let i = 0; i < 12; i++) {
      for (let d = 0; d < 4; d++) {
        const [nR, nC] = [r + pR[i][d], c + pC[i][d]];
        if (!isCanGo(nR, nC) || board[nR][nC] !== num) continue outer;
      }
      return i;
    }
  };
  //해당번호의 타일이 어느 타입인지 추출
  const puzzleTypeMap = new Map();

  const visited = Array(201).fill(false); //시작점을 기준으로 타입을 검증함
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const num = board[i][j];
      if (!num || visited[num]) continue;
      visited[num] = true;
      const type = getPuzzleType(i, j, num, board);
      puzzleTypeMap.set(num, [i, j, type]);
    }
  }

  //지울 가능성이 있는 타일들을 저장
  let curAbleMap = new Map();
  for (const [num, [r, c, type]] of puzzleTypeMap) {
    if (!isAblePuzzle[type]) continue;
    curAbleMap.set(num, [r, c, type]);
  }
  //해당 퍼즐을 지울 수 있는 상태인지
  const isCanDeletePuzzle = (r, c, type, num, board) => {
    for (let d = 0; d < deleteR[type].length; d++) {
      const [nR, nC] = [r + deleteR[type][d], c + deleteC[type][d]];
      for (let i = 0; i <= nR; i++) {
        if (board[i][nC] !== 0) return false;
      }
    }
    return true;
  };
  //실제로 보드에서 퍼즐을 지움
  const deletePuzzle = (r, c, type, board) => {
    for (let d = 0; d < 4; d++) {
      const [nR, nC] = [r + pR[type][d], c + pC[type][d]];
      board[nR][nC] = 0;
    }
  };

  const startSize = curAbleMap.size;
  while (1) {
    const curSize = curAbleMap.size;
    for (const [num, [r, c, type]] of curAbleMap) {
      if (isCanDeletePuzzle(r, c, type, num, board)) {
        deletePuzzle(r, c, type, board);
        curAbleMap.delete(num);
      }
    }
    if (curSize === curAbleMap.size) break;
  }
  return startSize - curAbleMap.size;
}
