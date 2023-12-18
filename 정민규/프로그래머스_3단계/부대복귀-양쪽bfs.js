function solution(n, roads, sources, destination) {
  const graph = [...Array(n + 1)].map((_) => []);
  for (const [a, b] of roads) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const getDist = (start, end) => {
    const sVisited = Array(n + 1).fill(false);
    const eVisited = Array(n + 1).fill(false);

    const sQue = [[start, 0]];
    const eQue = [[end, 0]];
    let sIdx = 0;
    let eIdx = 0;

    while (sQue[sIdx] && eQue[eIdx]) {
      const [sNode, sDist] = sQue[sIdx++];
      const [eNode, eDist] = eQue[eIdx++];

      sVisited[sNode] = sDist;
      eVisited[eNode] = eDist;

      if (eVisited[sNode] !== false) {
        return eVisited[sNode] + sVisited[sNode];
      }

      for (const nextNode of graph[sNode]) {
        if (sVisited[nextNode] === false) sQue.push([nextNode, sDist + 1]);
      }
      for (const nextNode of graph[eNode]) {
        if (eVisited[nextNode] === false) eQue.push([nextNode, eDist + 1]);
      }
    }
    return -1;
  };

  return sources.map((v) => getDist(v, destination));
}
