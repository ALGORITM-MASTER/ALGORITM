function solution(a, edges) {
  const tree = [...Array(a.length)].map((_) => []);
  for (const [s, e] of edges) {
    tree[s].push(e);
    tree[e].push(s);
  }

  let ret = 0;
  const dfs = (node, parent) => {
    let val = 0;

    for (const nxNode of tree[node].filter((v) => v !== parent)) {
      val += dfs(nxNode, node);
    }

    val += a[node];
    ret += Math.abs(val);
    return val;
  };

  ret = dfs(0) ? -1 : ret;
  return ret;
}
