function solution(A, B) {
  A = A.sort((a, b) => a - b);
  B = B.sort((a, b) => a - b);
  let ret = 0;

  outer: while (B.length) {
    const bScore = B.pop();
    while (A.pop() >= bScore) if (!A.length) break outer;
    ret++;
    if (!A.length) break outer;
  }
  return ret;
}
