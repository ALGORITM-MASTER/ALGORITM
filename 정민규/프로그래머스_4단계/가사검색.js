class Node {
  constructor(v) {
    this.val = v;
    this.next = [];
    this.end = 0;
  }
}

function solution(words, queries) {
  const map = new Map(); //물음표가 뒤에 있는 경우를 위함
  const reverseMap = new Map(); //물음표가 앞에 있는 경우를 위함

  //트리 구조로 단어 저장
  for (const word of words) {
    const rootNode = map.has(word.length) ? map.get(word.length) : new Node("");
    if (!map.has(word.length)) map.set(word.length, rootNode);

    let node = rootNode;
    for (let i = 0; i < word.length; i++) {
      let nxNode = node.next.find((v) => v.val === word[i]);
      if (!nxNode) {
        nxNode = new Node(word[i]);
        node.next.push(nxNode);
      }
      node = nxNode;
    }
    node.end += 1;
  }
  //거꾸로 단어도 저장
  for (const word of words) {
    const rootNode = reverseMap.has(word.length)
      ? reverseMap.get(word.length)
      : new Node("");
    if (!reverseMap.has(word.length)) reverseMap.set(word.length, rootNode);

    let node = rootNode;
    for (let i = word.length - 1; i >= 0; i--) {
      let nxNode = node.next.find((v) => v.val === word[i]);
      if (!nxNode) {
        nxNode = new Node(word[i]);
        node.next.push(nxNode);
      }
      node = nxNode;
    }
    node.end += 1;
  }
  //?가 나왔을때 갯수를 미리 저장해둠
  const dfs = (rootNode) => {
    const retNode = new Node("");
    const stk = [[rootNode, retNode, false]];

    while (stk.length) {
      const [node, parent, isVisited] = stk.pop();
      if (!node.next.length) {
        parent.end += 1;
        continue;
      }
      if (isVisited) {
        parent.end += node.end;
        continue;
      }

      stk.push([node, parent, true]);
      for (const nxNode of node.next) {
        stk.push([nxNode, node, false]);
      }
    }

    return retNode.end;
  };
  //정방향과 역방향 모두 개수 저장
  for (const [len, rootNode] of map) {
    dfs(rootNode);
  }
  for (const [len, rootNode] of reverseMap) {
    dfs(rootNode);
  }
  // word와 node로 문자 개수 계산
  const getCnt = (word, node) => {
    for (let i = 0; i < word.length; i++) {
      const st = word[i];
      if (st === "?") {
        return node.end;
      }
      const nxNode = node.next.find((v) => v.val === st);
      if (!nxNode) return 0;
      node = nxNode;
    }
    return node.end;
  };

  //?가 앞에있다면 역방향, ?가 뒤에있다면 정방향으로 검사
  return queries.map((querie) => {
    const rootMap = querie[querie.length - 1] === "?" ? map : reverseMap;
    if (querie[querie.length - 1] !== "?")
      querie = [...querie].reverse().join("");
    const rootNode = rootMap.get(querie.length);
    if (!rootNode) return 0;
    return getCnt(querie, rootNode);
  });
}
