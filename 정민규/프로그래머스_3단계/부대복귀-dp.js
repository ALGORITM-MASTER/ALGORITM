function solution(n, roads, sources, destination) {
  const graph = [...Array(n + 1)].map((_) => []);
  for (const [a, b] of roads) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const getDist = (end) => {
    const dp = Array(n + 1).fill(Infinity);
    dp[end] = 0;
    const que = [end];
    let idx = 0;
    while (que[idx]) {
      const node = que[idx++];

      for (const nextNode of graph[node]) {
        if (dp[nextNode] > dp[node] + 1) {
          dp[nextNode] = dp[node] + 1;
          que.push(nextNode);
        }
      }
    }
    return dp;
  };
  const dp = getDist(destination);
  return sources.map((v) => (dp[v] === Infinity ? -1 : dp[v]));
}
