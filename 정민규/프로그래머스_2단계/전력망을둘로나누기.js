function solution(n, wires) {
  const tree = [...new Array(n + 1)].map((_) => []);

  for (const [s, e] of wires) {
    tree[s].push(e);
    tree[e].push(s);
  }

  let ret = n;
  for (const [s, e] of wires) {
    const tmpTree = tree.map((el, idx) => {
      if (idx === s && el.includes(e)) return el.filter((el) => el !== e);
      if (idx === e && el.includes(s)) return el.filter((el) => el !== s);
      return el;
    });
    const visited = [...new Array(n + 1)].fill(false);
    const stk = [];
    const cnt = [];
    for (let i = 1; i <= n; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      stk.push(...tmpTree[i]);
      let curCnt = 1;
      while (stk.length) {
        const node = stk.pop();
        if (visited[node]) continue;
        visited[node] = true;
        stk.push(...tmpTree[node]);
        curCnt++;
      }
      cnt.push(curCnt);
    }
    const num = Math.abs(cnt[0] - cnt[1]);
    ret = Math.min(num, ret);
  }

  return ret;
}
