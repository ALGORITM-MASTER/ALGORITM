class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

//Deque 구현
class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(node) {
    this.size++;
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  pushLeft(node) {
    this.size++;
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }

  pop() {
    const ret = this.tail;
    if (this.size === 0) return;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return ret;
    }
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    this.size--;
    return ret;
  }

  popLeft() {
    const ret = this.head;
    if (this.size === 0) return;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return ret;
    }

    this.head.next.prev = null;
    this.head = this.head.next;
    this.size--;
    return ret;
  }
}

function solution(rc, operations) {
  const leftCol = new Deque();
  const rightCol = new Deque();
  const center = new Deque();

  //Deque로 변환
  for (const ary of rc) {
    leftCol.push(new Node(ary[0]));
    rightCol.push(new Node(ary[ary.length - 1]));
    const centerNode = new Deque();
    for (const arr of ary.slice(1, ary.length - 1)) {
      centerNode.push(new Node(arr));
    }
    center.push(new Node(centerNode));
  }

  const shiftRow = () => {
    leftCol.pushLeft(leftCol.pop());
    rightCol.pushLeft(rightCol.pop());
    center.pushLeft(center.pop());
  };

  const rotate = () => {
    center.head.val.pushLeft(leftCol.popLeft());
    rightCol.pushLeft(center.head.val.pop());
    center.tail.val.push(rightCol.pop());
    leftCol.push(center.tail.val.popLeft());
  };

  for (const operation of operations) {
    if (operation === "Rotate") rotate();
    else shiftRow();
  }

  //Deque -> Array 변환
  const ret = [];
  for (let i = 0; i < rc.length; i++) {
    const tmp = [];
    tmp.push(leftCol.popLeft().val);
    const nums = center.popLeft().val;
    while (nums.head) {
      tmp.push(nums.popLeft().val);
    }
    tmp.push(rightCol.popLeft().val);
    ret.push(tmp);
  }

  return ret;
}
