function solution(n, lighthouse) {
  const graph = [...new Array(n + 1)].map((_, idx) => []);

  for (const [a, b] of lighthouse) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const dp = [...Array(n + 1)].map((_) => [0, 0]);
  const dfs = (curNode, parentNode, check) => {
    let ret = check ? 1 : 0;
    for (const node of graph[curNode]) {
      if (node === parentNode) continue;
      const on = dp[node][0] ? dp[node][0] : dfs(node, curNode, true);
      if (!dp[node][0]) dp[node][0] = on;

      const off = dp[node][1] ? dp[node][1] : dfs(node, curNode, false);
      if (!dp[node][1]) dp[node][1] = off;

      ret += check ? Math.min(on, off) : on;
    }
    return ret;
  };

  return Math.min(dfs(1, 0, true), dfs(1, 0, false));
}
