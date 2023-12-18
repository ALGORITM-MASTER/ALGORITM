function solution(maze) {
  const rLen = maze.length;
  const cLen = maze[0].length;

  const dc = [1, 0, -1, 0];
  const dr = [0, 1, 0, -1];

  //방문배열 생성
  const redVisited = maze.map((v) => Array(cLen).fill(false));
  const blueVisited = maze.map((v) => Array(cLen).fill(false));

  //맵 정보 저장
  let redCood, blueCood, redDest, blueDest;
  for (let i = 0; i < rLen; i++) {
    for (let j = 0; j < cLen; j++) {
      if (maze[i][j] === 1) {
        redCood = [i, j];
        redVisited[i][j] = true;
      }
      if (maze[i][j] === 2) {
        blueCood = [i, j];
        blueVisited[i][j] = true;
      }
      if (maze[i][j] === 3) redDest = [i, j];
      if (maze[i][j] === 4) blueDest = [i, j];
    }
  }

  const isEqualAry = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const isCanMove = (r, c, visited, otherR, otherC) => {
    if (
      0 <= r &&
      r < rLen &&
      0 <= c &&
      c < cLen &&
      !visited[r][c] &&
      maze[r][c] !== 5 &&
      (otherR !== r || otherC !== c)
    )
      return true;
    return false;
  };

  let ret = Infinity;
  const dfs = (redCood, blueCood, cnt) => {
    //둘다 도착한 경우
    if (isEqualAry(redCood, redDest) && isEqualAry(blueCood, blueDest)) {
      ret = Math.min(ret, cnt);
      return;
    }

    if (isEqualAry(redCood, redDest)) {
      //red만 도착한 경우
      for (let bd = 0; bd < 4; bd++) {
        const [nBlueR, nBlueC] = [blueCood[0] + dr[bd], blueCood[1] + dc[bd]];
        if (isCanMove(nBlueR, nBlueC, blueVisited, ...redCood)) {
          blueVisited[nBlueR][nBlueC] = true;
          dfs(redCood, [nBlueR, nBlueC], cnt + 1);
          blueVisited[nBlueR][nBlueC] = false;
        }
      }
    } else if (isEqualAry(blueCood, blueDest)) {
      //blue만 도착한 경우
      for (let rd = 0; rd < 4; rd++) {
        const [nRedR, nRedC] = [redCood[0] + dr[rd], redCood[1] + dc[rd]];
        if (isCanMove(nRedR, nRedC, redVisited, ...blueCood)) {
          redVisited[nRedR][nRedC] = true;
          dfs([nRedR, nRedC], blueCood, cnt + 1);
          redVisited[nRedR][nRedC] = false;
        }
      }
    } else {
      //둘다 도착하지 않음
      for (let rd = 0; rd < 4; rd++) {
        const [nRedR, nRedC] = [redCood[0] + dr[rd], redCood[1] + dc[rd]];
        if (isCanMove(nRedR, nRedC, redVisited, [-1, -1])) {
          redVisited[nRedR][nRedC] = true;
          for (let bd = 0; bd < 4; bd++) {
            const [nBlueR, nBlueC] = [
              blueCood[0] + dr[bd],
              blueCood[1] + dc[bd],
            ];
            if (
              isCanMove(nBlueR, nBlueC, blueVisited, nRedR, nRedC) &&
              !(
                (
                  isEqualAry([nBlueR, nBlueC], redCood) &&
                  isEqualAry(blueCood, [nRedR, nRedC])
                )
                //서로 뒤바뀌며 움직이는 경우 체크
              )
            ) {
              blueVisited[nBlueR][nBlueC] = true;
              dfs([nRedR, nRedC], [nBlueR, nBlueC], cnt + 1);
              blueVisited[nBlueR][nBlueC] = false;
            }
          }
          redVisited[nRedR][nRedC] = false;
        }
      }
    }
  };

  dfs(redCood, blueCood, 0);

  return ret === Infinity ? 0 : ret;
}
