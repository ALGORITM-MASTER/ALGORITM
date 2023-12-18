class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.size = 0;
    this.end = null;
    this.sum = 0;
  }

  push(val) {
    const node = new Node(val);
    if (!this.size) {
      this.front = node;
      this.end = node;
    } else {
      this.end.next = node;
      this.end = node;
    }
    this.size++;
    this.sum += this.end.val;
  }

  pop() {
    if (!this.size) return undefined;
    const ret = this.front;
    this.front = this.front.next;
    this.size--;
    this.sum -= ret.val;
    return ret.val;
  }
}

function solution(bridge_length, weight, truck_weights) {
  const que = new Queue();

  for (let i = 0; i < bridge_length; i++) {
    que.push(0);
  }

  let ret = 0;

  for (const truck of truck_weights) {
    que.pop();

    while (truck + que.sum > weight) {
      que.pop();
      que.push(0);
      ret++;
    }

    que.push(truck);
    ret++;
  }

  while (que.sum > 0) {
    que.pop();
    ret++;
  }

  return ret;
}
