function solution(n, roads, sources, destination) {
  const graph = [...Array(n + 1)].map((_) => []);
  for (const [a, b] of roads) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const getDist = (start, end) => {
    const visited = Array(n + 1).fill(false);

    const que = [[start, 0]];
    let idx = 0;
    while (que[idx]) {
      const [node, dist] = que[idx++];
      visited[node] = true;
      if (node === end) return dist;
      for (const nextNode of graph[node]) {
        if (!visited[nextNode]) que.push([nextNode, dist + 1]);
      }
    }
    return -1;
  };

  return sources.map((v) => getDist(v, destination));
}
