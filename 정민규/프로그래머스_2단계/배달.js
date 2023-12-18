function solution(N, road, K) {
  const graph = new Array(N + 1).fill(0).map((v) => []);

  for (const [s, e, d] of road) {
    graph[s].push([e, d]);
    graph[e].push([s, d]);
  }

  const dp = new Array(N + 1).fill(Infinity);
  const visited = new Array(N + 1).fill(false);

  dp[1] = 0;

  const findSmallNode = () => {
    let ret = 1;
    let tmp = Infinity;

    for (let i = 1; i < dp.length; i++) {
      if (!visited[i] && dp[i] < tmp) {
        tmp = dp[i];
        ret = i;
      }
    }
    return ret;
  };

  for (let i = 1; i < dp.length; i++) {
    const node = findSmallNode();
    visited[node] = true;

    for (const [e, d] of graph[node]) {
      if (!visited[e] && dp[node] + d < dp[e]) {
        dp[e] = dp[node] + d;
      }
    }
  }

  return dp.filter((v) => v <= K).length;
}
