// 부모노드를 찾는 함수
function getParent(parentArr, i, j) {
  if (parentArr[i][j][0] === i && parentArr[i][j][1] === j) {
    return [i, j];
  }
  parentArr[i][j] = getParent(
    parentArr,
    parentArr[i][j][0],
    parentArr[i][j][1]
  );
  return parentArr[i][j];
}

// 두 부모노드를 합치는 함수
function unionParent(parentArr, [aI, aJ], [bI, bJ]) {
  const a = getParent(parentArr, aI, aJ);
  const b = getParent(parentArr, bI, bJ);
  if (a < b) parentArr[b[0]][b[1]] = a;
  else parentArr[a[0]][a[1]] = b; // 항상 더 작은 값으로
}

function solution(land) {
  const rLen = land.length;
  const cLen = land[0].length;

  const dc = [1, 0, -1, 0];
  const dr = [0, 1, 0, -1];

  const parents = [...Array(rLen)].map((_, i) =>
    [...Array(cLen)].map((_, j) => [i, j])
  );

  const dfs = (r, c, visited) => {
    let ret = 0;
    const stk = [[r, c]];
    while (stk.length) {
      const [r, c] = stk.pop();
      if (visited[r][c]) continue;
      visited[r][c] = true;
      ret += 1;
      for (let d = 0; d < 4; d++) {
        const [nR, nC] = [r + dr[d], c + dc[d]];
        if (
          0 <= nR &&
          nR < rLen &&
          0 <= nC &&
          nC < cLen &&
          !visited[nR][nC] &&
          land[nR][nC] === 1
        ) {
          stk.push([nR, nC]);
          unionParent(parents, [nR, nC], [r, c]);
        }
      }
    }

    return ret;
  };

  const cntAry = [...Array(rLen)].map((_) => Array(cLen).fill(0));

  const visited = [...Array(rLen)].map((_) => Array(cLen).fill(false));
  for (let i = 0; i < rLen; i++) {
    for (let j = 0; j < cLen; j++) {
      if (!visited[i][j] && land[i][j] === 1) {
        const cnt = dfs(i, j, visited);
        const [r, c] = getParent(parents, i, j);
        cntAry[r][c] = cnt;
      }
    }
  }

  let ret = 0;
  for (let i = 0; i < cLen; i++) {
    const visited = [...Array(rLen)].map((_) => Array(cLen).fill(false));
    let tmpSum = 0;
    for (let j = 0; j < rLen; j++) {
      const [r, c] = getParent(parents, j, i);
      if (!visited[r][c]) {
        visited[r][c] = true;
        tmpSum += cntAry[r][c];
      }
    }
    ret = Math.max(ret, tmpSum);
  }
  return ret;
}
