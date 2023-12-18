function solution(n, s, a, b, fares) {
  const graph = [...Array(n + 1)].map((_) => []);
  for (const [c, d, f] of fares) {
    graph[c].push([d, f]);
    graph[d].push([c, f]);
  }

  const findMinDistNode = (map, visited) => {
    let ret = [0, Infinity];
    for (let i = 1; i < map.length; i++) {
      if (visited[i]) continue;
      if (ret[1] >= map[i]) ret = [i, map[i]];
    }
    return ret[0];
  };

  const dijkstra = (startNode) => {
    const ret = Array(n + 1).fill(Infinity);
    const visited = Array(n + 1).fill(false);
    visited[startNode] = true;
    ret[startNode] = 0;
    for (const [end, dist] of graph[startNode])
      ret[end] = Math.min(ret[end], dist);

    for (let i = 0; i < n - 1; i++) {
      const curNode = findMinDistNode(ret, visited);
      visited[curNode] = true;
      for (const [end, dist] of graph[curNode]) {
        if (ret[end] > ret[curNode] + dist) ret[end] = ret[curNode] + dist;
      }
    }

    return ret;
  };

  const sInfo = dijkstra(s);
  const aInfo = dijkstra(a);
  const bInfo = dijkstra(b);

  let ret = Infinity;
  for (let node = 1; node <= n; node++) {
    const cost = sInfo[node] + aInfo[node] + bInfo[node];
    if (ret > cost) ret = cost;
  }

  return ret;
}
