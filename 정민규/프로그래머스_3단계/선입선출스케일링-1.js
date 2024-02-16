class minQue {
  constructor() {
    this.ary = [0];
  }
  swap(a, b) {
    [this.ary[a], this.ary[b]] = [this.ary[b], this.ary[a]];
  }

  push(value) {
    let idx = this.ary.length;
    this.ary.push(value);
    while (0 < idx) {
      const parent = ~~(idx / 2);
      if (this.ary[parent][1] > this.ary[idx][1]) {
        this.swap(idx, parent);
        idx = parent;
        continue;
      }
      break;
    }
  }
  size() {
    return this.ary.length - 1;
  }

  pop() {
    if (this.ary.length === 1) return undefined;
    if (this.ary.length === 2) return this.ary.pop();

    const ret = this.ary[1];
    this.ary[1] = this.ary.pop();
    let idx = 1;
    while (idx < this.ary.length) {
      const [left, right] = [idx * 2, idx * 2 + 1];
      if (left >= this.ary.length) break;
      let minIdx = left;
      if (right < this.ary.length && this.ary[left][1] > this.ary[right][1])
        minIdx = right;
      if (this.ary[idx][1] > this.ary[minIdx][1]) {
        this.swap(idx, minIdx);
        idx = minIdx;
        continue;
      }
      break;
    }

    return ret;
  }
  //processQue에서만 사용
  runTime() {
    const [core, time] = this.pop();
    const ret = [[core, time]];
    while (this.ary[1][1] === time) ret.push(this.pop());
    return ret;
  }
}

function solution(n, cores) {
  const cpu = cores.map((v, i) => [v, 0]);

  const waitingQue = new minQue(); // [작업시간,큐번호]
  const processQue = new minQue(); // [큐번호,끝나는 작업시간]
  for (let i = cores.length - 1; i >= 0; i--) {
    waitingQue.push([cores[i], i]);
  }

  let curTime = 0;
  for (let i = 0; i < n; i++) {
    if (!waitingQue.size()) {
      const tmpWaitingQueCore = processQue.runTime();
      curTime = tmpWaitingQueCore[0][1];

      for (const [core, t] of tmpWaitingQueCore) {
        waitingQue.push([cores[core], core]);
      }
    }

    const [t, core] = waitingQue.pop();
    processQue.push([core, t + curTime]);
    if (i === n - 1) return core + 1;
  }
}
