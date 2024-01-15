class MaxHeap {
  constructor() {
    this.ary = [0];
  }
  swap(a, b) {
    [this.ary[a], this.ary[b]] = [this.ary[b], this.ary[a]];
  }
  push(value) {
    this.ary.push(value);
    let idx = this.ary.length - 1;
    while (idx > 1) {
      const parent = ~~(idx / 2);
      if (this.ary[parent] >= this.ary[idx]) break;
      this.swap(parent, idx);
      idx = parent;
    }
  }
  pop() {
    if (this.ary.length === 1) return undefined;
    if (this.ary.length === 2) return this.ary.pop();
    const ret = this.ary[1];
    this.ary[1] = this.ary.pop();
    let idx = 1;
    while (idx < this.ary.length) {
      const [left, right] = [idx * 2, idx * 2 + 1];
      let maxIdx = left;
      if (left >= this.ary.length) break;
      if (right < this.ary.length && this.ary[right] > this.ary[left])
        maxIdx = right;
      if (this.ary[maxIdx] <= this.ary[idx]) break;
      this.swap(maxIdx, idx);
      idx = maxIdx;
    }
    return ret;
  }
}

function solution(n, works) {
  const heap = new MaxHeap();
  for (const work of works) {
    heap.push(work);
  }

  for (let i = 0; i < n; i++) {
    const num = heap.pop();
    if (num > 1) heap.push(num - 1);
  }

  return heap.ary.reduce((a, c) => a + c ** 2, 0);
}
