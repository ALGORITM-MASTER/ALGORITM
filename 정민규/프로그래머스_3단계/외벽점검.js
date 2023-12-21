class Node {
  constructor(isWeek, idx) {
    this.isWeek = isWeek;
    this.idx = idx;
    this.next = null;
    this.prev = null;
  }
}

class CirculrLinkedList {
  constructor(node) {
    this.head = node;
    this.size = node ? 1 : 0;
  }

  push(node) {
    if (this.size < 1) this.head = node;
    else if (this.size === 1) {
      this.head.next = node;
      this.head.prev = node;
    } else {
      this.head.prev.next = node;
      this.head.prev = node;
      node.next = this.head;
    }
    this.size++;
  }

  print() {
    let node = this.head;
    for (let i = 0; i < this.size; i++) {
      process.stdout.write(`${node.isWeek ? 1 : 0}-`);
      node = node.next;
    }

    console.log();
  }

  isClean() {
    let node = this.head;
    for (let i = 0; i < this.size; i++) {
      if (node.isWeek === true) return false;
      node = node.next;
    }
    return true;
  }

  cleanCircle(order, start) {
    let node = this.head;
    for (let i = 0; i < start; i++) node = node.next;
    for (const dist of order) {
      let cnt = 0;
      while (!node.isWeek && cnt <= this.size) {
        node = node.next;
        cnt++;
      }

      for (let i = 0; i <= dist; i++) {
        node.isWeek = false;
        node = node.next;
      }
    }
  }
}

const getPermutation = (ary, n) => {
  if (n === 1) return ary.map((v) => [v]);
  const ret = [];
  ary.forEach((fixed, idx) => {
    const rest = [...ary.slice(0, idx), ...ary.slice(idx + 1)];
    const combinations = getPermutation(rest, n - 1);
    const attach = combinations.map((v) => [fixed, ...v]);
    ret.push(...attach);
  });
  return ret;
};

function solution(n, weak, dist) {
  const makeCircle = () => {
    const ret = new CirculrLinkedList();
    for (let i = 0; i < n; i++) {
      ret.push(new Node(weak.includes(i) ? true : false, i));
    }
    return ret;
  };

  for (let i = 0; i < (dist.length < 8 ? dist.length + 1 : dist.length); i++) {
    const orders = getPermutation(dist, i);
    for (const order of orders) {
      for (const start of weak) {
        const cirList = makeCircle();
        cirList.cleanCircle(order, start);
        if (cirList.isClean()) return order.length;
      }
    }
  }

  return -1;
}
