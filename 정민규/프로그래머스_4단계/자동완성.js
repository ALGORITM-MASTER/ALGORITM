class Node {
  constructor(val) {
    this.val = val;
    this.next = [];
    this.end = false;
  }
}

function solution(words) {
  const rootNode = new Node(0);

  //트리구조로 단어 생성
  for (const word of words) {
    let curNode = rootNode;
    for (let i = 0; i < word.length; i++) {
      if (!curNode.next.find((v) => v.val === word[i]))
        curNode.next.push(new Node(word[i]));
      curNode = curNode.next.filter((v) => v.val === word[i])[0];
    }
    curNode.end = true;
  }
  let ret = 0;

  for (const word of words) {
    let curNode = rootNode.next.filter((v) => v.val === word[0])[0];
    let tmp = 1;
    for (let i = 1; i < word.length; i++) {
      // 단어의 끝이거나 분기점이 있는경우 i번째까진 탐색해야함
      if (curNode.next.length !== 1 || curNode.end) tmp = i + 1;
      curNode = curNode.next.filter((v) => v.val === word[i])[0];
    }
    if (curNode.next.length > 0) tmp = word.length;
    ret += tmp;
  }
  return ret;
}
