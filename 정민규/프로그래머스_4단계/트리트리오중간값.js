function solution(n, edges) {
  const tree = [...Array(n + 1)].map((_) => []);
  for (const [s, e] of edges) {
    tree[s].push(e);
    tree[e].push(s);
  }

  const getMaxInfo = (node) => {
    const visited = Array(n + 1).fill(false);
    const stk = [[node, 0]];
    const ret = {
      maxLen: 0,
      ary: [],
    };

    while (stk.length) {
      const [node, cnt] = stk.pop();
      visited[node] = true;
      if (cnt > ret.maxLen) {
        ret.maxLen = cnt;
        ret.ary = [node];
      } else if (cnt === ret.maxLen) {
        ret.ary.push(node);
      }

      for (const nxNode of tree[node]) {
        if (visited[nxNode]) continue;
        stk.push([nxNode, cnt + 1]);
      }
    }
    return ret;
  };

  const { ary } = getMaxInfo(1);

  const ret = getMaxInfo(ary[0]);
  if (ary.length > 1 || ret.ary.length > 1) return ret.maxLen;
  else return ret.maxLen - 1;
}
