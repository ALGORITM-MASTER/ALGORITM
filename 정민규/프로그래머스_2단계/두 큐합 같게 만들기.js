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

function solution(queue1, queue2) {
  const que1 = new Queue();
  const que2 = new Queue();

  for (const el of queue1) que1.push(el);
  for (const el of queue2) que2.push(el);

  const targetSum = (que1.sum + que2.sum) / 2;

  let ret = 0;
  for (let i = 0; i < (que1.size + que2.size) * 2; i++) {
    if (que1.sum === targetSum) return ret;
    if (que1.sum > que2.sum) que2.push(que1.pop());
    else que1.push(que2.pop());
    ret++;
  }
  return -1;
}
