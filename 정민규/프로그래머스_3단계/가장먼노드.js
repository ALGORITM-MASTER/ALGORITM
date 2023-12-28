function solution(n, edge) {
  //그래프 생성
  const graph = [...Array(n + 1)].map((_) => []);
  for (const [s, e] of edge) {
    graph[s].push(e);
    graph[e].push(s);
  }

  //정답을 저장 및 방문여부 조사용 배열
  const visited = Array(n + 1).fill(0);

  //JS엔 큐가 없어서 시간복잡도 아끼기 위해 아래처럼 구현
  const que = [[1, 0]];
  let queIdx = 0;
  while (queIdx < que.length) {
    const [node, dist] = que[queIdx];
    //방문했다면 그냥 넘김
    if (visited[node]) {
      queIdx++;
      continue;
    }
    //방문처리
    visited[node] = dist;

    //다음 노드를 하나씩 순회
    for (const nxNode of graph[node]) {
      que.push([nxNode, dist + 1]);
    }
    queIdx++;
  }

  //최대값의 개수를 찾음
  let ret = 0;
  let maxValue = 0;
  for (let i = 2; i <= n; i++) {
    if (visited[i] > maxValue) {
      ret = 1;
      maxValue = visited[i];
    } else if (visited[i] === maxValue) ret++;
  }

  return ret;
}
