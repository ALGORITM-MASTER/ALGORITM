function solution(n, left, right) {
  const ret = [];
  for (let i = left; i <= right; i++) {
    ret.push(Math.max(~~(i / n) + 1, (i % n) + 1));
  }
  return ret;
}

// 1 2 3
// 2 2 3
// 3 3 3
