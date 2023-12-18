//갈수 있는곳인지 아닌지 확인해주는 함수
const isCanGo = (x, y, ary) =>
  0 <= x && x < ary[0].length && 0 <= y && y < ary.length && ary[y][x] !== "D";

function solution(board) {
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  //boardList 2차원 배열 만들기
  const boardList = board.map((el) => el.split(""));
  //로봇의 시작 좌표 찾기
  let R;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (boardList[i][j] === "R") R = [j, i, 0];
    }
  }

  //방문했던 곳인지 확인할 배열
  const dp = [...new Array(board.length)].map((_) =>
    [...new Array(board[0].length)].fill(false)
  );

  const que = [R];
  while (que.length) {
    const [x, y, cnt] = que.shift();
    for (let i = 0; i < 4; i++) {
      let nx = x;
      let ny = y;

      while (isCanGo(nx, ny, boardList)) {
        const tmpX = nx + dx[i];
        const tmpY = ny + dy[i];
        if (isCanGo(tmpX, tmpY, boardList)) [nx, ny] = [tmpX, tmpY];
        else break;
      }

      if (isCanGo(nx, ny, boardList)) {
        if (boardList[ny][nx] === "G") return cnt + 1;
        if (!dp[ny][nx]) {
          que.push([nx, ny, cnt + 1]);
          dp[ny][nx] = true;
        }
      }
    }
  }

  return -1;
}
