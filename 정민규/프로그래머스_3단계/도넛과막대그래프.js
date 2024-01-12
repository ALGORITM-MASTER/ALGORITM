function solution(edges) {
  //노드에서 나가는 정보 , 들어오는 정보 저장
  const outGraph = new Map();
  const inGraph = new Map();
  const visited = new Array(10000001).fill(false);

  for (const [s, e] of edges) {
    if (!outGraph.has(s)) outGraph.set(s, [e]);
    else outGraph.get(s).push(e);

    if (!inGraph.has(e)) inGraph.set(e, [s]);
    else inGraph.get(e).push(s);
  }

  const checkGraphType = (node, graph, visited) => {
    while (1) {
      const nxNodes = graph.get(node);
      if (!nxNodes) return 2;
      if (visited[node] && nxNodes.length === 1) return 1;
      if (nxNodes.length === 2) return 3;
      visited[node] = true;
      node = nxNodes[0];
    }
  };

  //중심노드 찾기 (들어오는 노드가 없고 나가는 노드가 2개 이상)
  const mainNode = [...outGraph].find(
    ([node, ary]) => ary.length > 1 && !inGraph.has(node)
  )[0];
  //중심노드에서 뻗은 그래프의 종류 파악
  const ret = [mainNode, 0, 0, 0];
  for (const nxNode of outGraph.get(mainNode)) {
    ret[checkGraphType(nxNode, outGraph, visited)]++;
  }
  return ret;
}
