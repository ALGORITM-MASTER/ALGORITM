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
  const isSummit = new Set(summits);

  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, c] of paths) {
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  const queue = new Heap();
  const visited = Array(n + 1).fill(Infinity);

  for (const gate of gates) {
    queue.push([gate, 0]);
    visited[gate] = 0;
  }

  while (queue.length) {
    const [node, intensity] = queue.pop();

    if (isSummit.has(node) || visited[node] < intensity) {
      continue;
    }

    for (const [nextNode, weight] of graph[node]) {
      const newIntensity = Math.max(intensity, weight);
      if (newIntensity < visited[nextNode]) {
        visited[nextNode] = newIntensity;
        queue.push([nextNode, newIntensity]);
      }
    }
  }

  let answer = [0, Infinity];
  summits.sort((a, b) => a - b);
  for (const summit of summits) {
    if (visited[summit] < answer[1]) answer = [summit, visited[summit]];
  }

  return answer;
}
