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
      if (this.heap[parentIdx] >= this.heap[idx]) {
        this.swap(parentIdx, idx);
        idx = parentIdx;
      } else break;
    }
  }

  pop() {
    if (!this.length) return undefined;
    if (this.length === 1) {
      this.length--;
      return this.heap.pop();
    }
    const max = this.heap[1];

    this.heap[1] = this.heap.pop();
    this.length--;
    let idx = 1;

    while (idx < this.length) {
      const [leftIdx, rightIdx] = [idx * 2, idx * 2 + 1];

      let minIdx = 1;
      if (leftIdx > this.length) break;
      else if (rightIdx > this.length) minIdx = leftIdx;
      else
        minIdx = this.heap[leftIdx] <= this.heap[rightIdx] ? leftIdx : rightIdx;

      if (this.heap[idx] > this.heap[minIdx]) {
        this.swap(idx, minIdx);
        idx = minIdx;
      } else break;
    }
    return max;
  }
}

function solution(n, paths, gates, summits) {
  const graph = [...Array(n + 1)].map((v) => []);
  for (const [i, j, w] of paths) {
    graph[i].push([j, w]);
    graph[j].push([i, w]);
  }
  gates.sort();
  summits.sort();

  const summitMap = new Map();
  for (const summit of summits) summitMap.set(summit, true);

  let ret = [-1, Infinity];
  for (const gate of gates) {
    const heap = new Heap();
    const dp = Array(n + 1).fill(Infinity);
    const visited = Array(n + 1).fill(false);
    for (const gate of gates) dp[gate] = -1;

    for (const [nextNode, weight] of graph[gate]) {
      if (dp[nextNode] !== -1) {
        heap.push(nextNode);
        dp[nextNode] = weight;
        visited[nextNode] = true;
      }
    }
    
    while (heap.length) {
      const node = heap.pop();
      const weight = dp[node];
      for (const [nearNode, nearNodeWeight] of graph[node]) {
        if (dp[nearNode] === -1 || dp[nearNode] <= weight) continue;
        const nextWeight = weight > nearNodeWeight ? weight : nearNodeWeight;
        dp[nearNode] = Math.min(dp[nearNode], nextWeight);
        if (summitMap.get(nearNode) || visited[nearNode]) continue;
        heap.push(nearNode);
        visited[nearNode] = true;
      }
    }

    let tmp = Infinity;
    let tmpSummit = Infinity;
    for (const summit of summits) {
      if (dp[summit] < tmp) {
        tmp = dp[summit];
        tmpSummit = summit;
      }
    }

    if (ret[1] > tmp) ret = [tmpSummit, tmp];
  }
  return ret;
}
