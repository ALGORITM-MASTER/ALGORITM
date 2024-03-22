function solution(n, path, order) {
  //그래프 등록
  const tmpGraph = [...Array(n)].map((_) => []);
  for (const [s, e] of path) {
    tmpGraph[s].push(e);
    tmpGraph[e].push(s);
  }

  //자식,부모 정보만 가진 그래프 등록
  const graph = [...Array(n)].map((_) => new Set());
  const parentInfo = Array(n).fill(0);
  const setGraph = (node, parent) => {
    for (const nxNode of tmpGraph[node]) {
      if (nxNode === parent) continue;
      graph[node].add(nxNode);
      parentInfo[nxNode] = node;
      setGraph(nxNode, node);
    }
  };
  setGraph(0, -1);

  //명령등록 : key에 접근하려면 val방문필요
  const orderMap = new Map();
  const reverseOrderMap = new Map();
  for (const [s, e] of order) {
    orderMap.set(e, s);
    reverseOrderMap.set(s, e);
  }
  if (orderMap.has(0)) return false; // 0이 무조건 시작점임

  //현재 방문 가능한 노드들
  const ableNode = new Set();

  //특정 node부터 방문 가능 노드를 계산
  const setAbleNode = (node) => {
    if (ableNode.has(node)) return [];
    ableNode.add(node);
    const ret = [node];
    for (const nxNode of graph[node]) {
      if (orderMap.has(nxNode)) continue;
      ret.push(...setAbleNode(nxNode));
    }
    return ret;
  };

  const stk = [];
  stk.push(...setAbleNode(0)); // 초깃값 설정

  while (orderMap.size > 0) {
    //orderMap에서 갈 수 있는 노드를 새로 열어줌
    const tmpOrderMapSize = orderMap.size;
    for (const [end, start] of orderMap) {
      if (!(ableNode.has(start) && ableNode.has(parentInfo[end]))) continue;
      orderMap.delete(end);
      stk.push(...setAbleNode(end));
    }
    //stk에는 새로 방문가능한 노드들의 정보가 담겨있고 이를 토대로 지움
    while (stk.length) {
      const start = stk.pop();
      if (!reverseOrderMap.has(start)) continue;
      const end = reverseOrderMap.get(start);
      if (!ableNode.has(parentInfo[end])) continue;
      orderMap.delete(end);
      reverseOrderMap.delete(start);
      const addNodes = setAbleNode(end);
      for (const addNode of addNodes) stk.push(addNode);
    }

    if (tmpOrderMapSize === orderMap.size) return false;
  }

  return ableNode.size === n ? true : false;
}
