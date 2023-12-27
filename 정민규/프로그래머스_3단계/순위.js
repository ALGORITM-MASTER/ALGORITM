//DFS + 그리디
function solution(n, results) {
  //이긴정보,진정보 따로 저장
  const winGraph = [...new Array(n + 1)].map((_) => []);
  const loseGraph = [...new Array(n + 1)].map((_) => []);

  for (const [a, b] of results) {
    winGraph[a].push(b);
    loseGraph[b].push(a);
  }

  //이기거나 진사람들을 한방향으로 탐색
  const getLinkedGraphSize = (node, graph, visited) => {
    if (visited[node]) return 0;
    visited[node] = true;
    let ret = 1;
    for (const nxNode of graph[node])
      ret += getLinkedGraphSize(nxNode, graph, visited);
    return ret;
  };

  let ret = 0;
  //node보다 이긴사람들 + node보다 진사람들 DFS로 가져와서 합계반환
  for (let i = 1; i <= n; i++) {
    let cnt = 0;
    let visited = Array(n + 1).fill(false);
    cnt += getLinkedGraphSize(i, winGraph, visited);
    visited = Array(n + 1).fill(false);
    cnt += getLinkedGraphSize(i, loseGraph, visited);
    if (cnt === n + 1) ret++;
  }
  return ret;
}
