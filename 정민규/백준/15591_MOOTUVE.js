const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));

let inputIdx = 0;

const [n, q] = input[inputIdx++];

const graph = [...Array(n + 1)].map((_) => []);

for (let i = 0; i < n - 1; i++) {
  const [s, e, usado] = input[inputIdx++];
  graph[s].push([e, usado]);
  graph[e].push([s, usado]);
}

const dfs = (node, k) => {
  const visited = Array(n + 1).fill(false);
  let ret = -1;

  const stk = [[node, Infinity]];
  while (stk.length) {
    const [node, usado] = stk.pop();
    visited[node] = true;

    if (usado >= k) ret++;
    for (const [nxNode, nxUsado] of graph[node]) {
      if (visited[nxNode]) continue;
      stk.push([nxNode, Math.min(nxUsado, usado)]);
    }
  }
  return ret;
};

for (let i = 0; i < q; i++) {
  const [k, v] = input[inputIdx++];
  console.log(dfs(v, k));
}
