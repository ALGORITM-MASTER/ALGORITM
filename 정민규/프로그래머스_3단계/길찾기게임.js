function solution(nodeinfo) {
  // [x좌표 , y좌표 , 노드번호] 로 nodeinfo를 저장
  nodeinfo = nodeinfo.map((v, idx) => [...v, idx + 1]);
  nodeinfo.sort((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[0] - b[0];
  });
  // level별로 노드 저장
  const maxLevel = nodeinfo[nodeinfo.length - 1][1];
  const nodesInLevel = [...Array(maxLevel + 1)].map((_) => []);
  let curLevel = 0;
  for (let node of nodeinfo) {
    if (node[1] !== curLevel) curLevel = node[1];
    nodesInLevel[curLevel].push(node);
  }

  console.log(nodesInLevel);

  const ret1 = [];
  const ret2 = [];

  //전위,후위 탐색
  const graph = new Map();
  const dfs = (node, left, right) => {
    const [nodeX, level, name] = node;
    graph.set(name, { left: null, right: null });
    const nodeInfo = graph.get(name);
    ret1.push(node[2]);
    let nxLevel = level - 1;
    while (nodesInLevel[nxLevel] && !nodesInLevel[nxLevel].length) nxLevel--;
    if (!nodesInLevel[nxLevel]) {
      ret2.push(node[2]);
      return;
    }
    for (const child of nodesInLevel[nxLevel]) {
      if (!nodeInfo.left && child[0] > left && child[0] < nodeX) {
        nodeInfo.left = child[2];
        dfs(child, left, nodeX);
      }
      if (!nodeInfo.right && child[0] < right && child[0] > nodeX) {
        nodeInfo.right = child[2];
        dfs(child, nodeX, right);
      }
    }
    ret2.push(node[2]);
  };
  dfs(nodesInLevel[maxLevel][0], -1, Infinity);

  return [ret1, ret2];
}
