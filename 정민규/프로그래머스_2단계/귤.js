class Heap {
  constructor() {
    this.heap = [0];
    this.length = 0;
  }

  getMax() {
    return this.heap[1] ? this.heap[1] : undefined;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(value) {
    this.heap.push(value);
    this.length += 1;
    let idx = this.length;
    while (idx > 1) {
      const parentIdx = ~~(idx / 2);
      if (this.heap[parentIdx][1] < this.heap[idx][1]) {
        this.swap(parentIdx, idx);
        idx = parentIdx;
      } else break;
    }
  }

  pop() {
    if (!this.length) return undefined;
    const max = this.heap[1];

    this.heap[1] = this.heap.pop();
    this.length--;
    let idx = 1;

    while (idx < this.length) {
      const [leftIdx, rightIdx] = [idx * 2, idx * 2 + 1];

      let maxIdx = 1;
      if (leftIdx > this.length) break;
      else if (rightIdx > this.length) maxIdx = leftIdx;
      else
        maxIdx =
          this.heap[leftIdx][1] > this.heap[rightIdx][1] ? leftIdx : rightIdx;

      if (this.heap[idx][1] < this.heap[maxIdx][1]) {
        this.swap(idx, maxIdx);
        idx = maxIdx;
      } else break;
    }
    return max;
  }
}

function solution(k, tangerine) {
  const heap = new Heap();
  const map = new Map();
  for (const guel of tangerine) {
    if (map.get(guel)) map.set(guel, map.get(guel) + 1);
    else map.set(guel, 1);
  }
  for (const el of map) heap.push(el);

  let ret = 0;
  let num = 0;
  while (num < k) {
    num += heap.pop()[1];
    ret++;
  }

  return ret;
}
