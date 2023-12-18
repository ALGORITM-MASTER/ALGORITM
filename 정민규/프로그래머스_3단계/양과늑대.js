function solution(info, edges) {
  const graph = [...Array(info.length)].map((_) => []);
  for (const [start, end] of edges) {
    graph[start].push(end);
  }

  let ret = 0;
  const dfs = (node, sheep, wolf, possible) => {
    // console.log('node',node,'possible',possible,'sheep',sheep,'wolf',wolf)
    ret = Math.max(ret, sheep);
    if (sheep <= wolf) return;

    const possibleNode = [...possible, ...graph[node]];
    possibleNode.splice(possibleNode.indexOf(node), 1);

    for (const nxNode of possibleNode) {
      if (info[nxNode]) dfs(nxNode, sheep, wolf + 1, possibleNode);
      else dfs(nxNode, sheep + 1, wolf, possibleNode);
    }
  };

  dfs(0, 1, 0, [0]);
  return ret;
}
