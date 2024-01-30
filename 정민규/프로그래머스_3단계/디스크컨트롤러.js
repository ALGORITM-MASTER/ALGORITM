class MinHeap {
  constructor() {
    this.ary = [0];
  }

  swap(a, b) {
    [this.ary[a], this.ary[b]] = [this.ary[b], this.ary[a]];
  }

  push(val) {
    let idx = this.ary.length;
    this.ary.push(val);

    while (idx > 1) {
      const parentIdx = ~~(idx / 2);
      if (this.ary[parentIdx][1] > this.ary[idx][1]) {
        this.swap(idx, parentIdx);
        idx = parentIdx;
      } else break;
    }
  }

  pop() {
    if (this.ary.length === 1) return undefined;
    if (this.ary.length === 2) return this.ary.pop();
    const ret = this.ary[1];
    this.ary[1] = this.ary.pop();
    let idx = 1;

    while (idx < this.ary.length) {
      const left = idx * 2;
      const right = idx * 2 + 1;
      if (left >= this.ary.length) break;
      let minIdx = left;
      if (right < this.ary.length && this.ary[right][1] < this.ary[left][1])
        minIdx = right;
      if (this.ary[minIdx][1] < this.ary[idx][1]) {
        this.swap(minIdx, idx);
        idx = minIdx;
      } else break;
    }
    return ret;
  }
}

function solution(jobs) {
  const len = jobs.length;
  jobs.sort((a, b) => b[0] - a[0]);

  const heap = new MinHeap();

  let ret = 0;
  let time = 0;
  while (jobs.length || heap.ary.length > 1) {
    while (jobs.length && jobs[jobs.length - 1][0] <= time)
      heap.push(jobs.pop());

    if (heap.ary.length > 1) {
      const curTask = heap.pop();

      ret += curTask[1] + time - curTask[0];
      time += curTask[1];
    } else {
      time += 1;
    }
  }

  return ~~(ret / len);
}
