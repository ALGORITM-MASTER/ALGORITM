function solution(rectangle, characterX, characterY, itemX, itemY) {
  const graph = [...Array(51)].map((_) => [...Array(51)].map((__) => []));

  //해당 선분이 다른 사각형 안에 있는지 확인
  const isLineInOtherBox = (idx, aY, aX, bY, bX) => {
    for (let i = 0; i < rectangle.length; i++) {
      if (i === idx) continue;
      const [lx, ly, rx, ry] = rectangle[i];
      if (
        lx <= aX &&
        aX <= rx &&
        lx <= bX &&
        bX <= rx &&
        ly <= aY &&
        aY <= ry &&
        ly <= bY &&
        bY <= ry
      )
        return true;
    }
    return false;
  };

  for (let idx = 0; idx < rectangle.length; idx++) {
    const [lx, ly, rx, ry] = rectangle[idx];
    //좌->우 상->하 방향으로 선분들이 다른 사각형 내부에 있는지 검사
    for (let i = lx; i < rx; i++) {
      if (!isLineInOtherBox(idx, ry, i, ry, i + 1)) {
        graph[ry][i].push([ry, i + 1]);
        graph[ry][i + 1].push([ry, i]);
      }
      if (!isLineInOtherBox(idx, ly, i, ly, i + 1)) {
        graph[ly][i].push([ly, i + 1]);
        graph[ly][i + 1].push([ly, i]);
      }
    }
    for (let i = ly; i < ry; i++) {
      if (!isLineInOtherBox(idx, i, lx, i + 1, lx)) {
        graph[i][lx].push([i + 1, lx]);
        graph[i + 1][lx].push([i, lx]);
      }
      if (!isLineInOtherBox(idx, i, rx, i + 1, rx)) {
        graph[i][rx].push([i + 1, rx]);
        graph[i + 1][rx].push([i, rx]);
      }
    }
  }

  //que를 활용한 bfs로 최소거리가 감지되면 더이상 탐색을 하지않게끔
  const visited = [...Array(51)].map((_) => Array(51).fill(false));
  const que = [[characterY, characterX, 0]];
  let queIdx = 0;
  visited[characterY][characterX] = true;

  while (queIdx < que.length) {
    const [y, x, cnt] = que[queIdx];
    if (y === itemY && x === itemX) return cnt;
    visited[y][x] = true;

    for (const [ny, nx] of graph[y][x]) {
      if (!visited[ny][nx]) que.push([ny, nx, cnt + 1]);
    }
    queIdx++;
  }
}
