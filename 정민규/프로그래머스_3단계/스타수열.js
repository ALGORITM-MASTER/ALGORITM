class maxHeap {
  constructor() {
    this.ary = [0];
  }

  swap(aIdx, bIdx) {
    const c = this.ary[aIdx];
    this.ary[aIdx] = this.ary[bIdx];
    this.ary[bIdx] = c;
  }

  push(value) {
    this.ary.push(value);
    let idx = this.ary.length - 1;
    let parentIdx = ~~(idx / 2);
    while (parentIdx > 0 && this.ary[idx][1] > this.ary[parentIdx][1]) {
      this.swap(idx, parentIdx);
      idx = parentIdx;
      parentIdx = ~~(idx / 2);
    }
  }

  pop() {
    if (this.ary.length === 1) return undefined;
    if (this.ary.length === 2) return this.ary.pop();
    const ret = this.ary[1];
    this.ary[1] = this.ary.pop();
    let idx = 1;

    while (idx < this.ary.length) {
      const leftIdx = idx * 2;
      const rightIdx = idx * 2 + 1;
      let mainIdx = leftIdx;
      if (leftIdx >= this.ary.length) break;
      if (
        rightIdx < this.ary.length &&
        this.ary[rightIdx][1] > this.ary[leftIdx][1]
      )
        mainIdx = rightIdx;

      if (this.ary[mainIdx][1] < this.ary[idx][1]) break;
      this.swap(idx, mainIdx);
      idx = mainIdx;
    }
    return ret;
  }
}

function solution(a) {
  const cnt = Array(a.length).fill(0);
  const heap = new maxHeap();

  const getStarSequenceLen = (star) => {
    let ret = 0;
    let tmp = -1;
    for (const num of a) {
      if (tmp === -1) tmp = num;
      else if (tmp === star && num !== star) {
        ret++;
        tmp = -1;
      } else if (tmp !== star && num === star) {
        ret++;
        tmp = -1;
      }
    }
    return ret;
  };

  if (a.length > 1) cnt[a[0]] += 1;
  for (let i = 1; i < a.length - 1; i++) {
    if (a[i - 1] !== a[i] || a[i + 1] !== a[i]) cnt[a[i]] += 1;
  }
  if (a.length > 1) cnt[a[a.length - 1]] += 1;

  for (let i = 0; i < cnt.length; i++) {
    heap.push([i, cnt[i]]);
  }

  while (heap.ary.length > 1) {
    const [star, cnt] = heap.pop();
    const realLen = getStarSequenceLen(star);
    if (realLen === cnt) return cnt * 2;
    heap.push([star, realLen]);
  }
}
