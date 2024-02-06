function solution(A, B) {
  A = A.sort((a, b) => a - b);
  B = B.sort((a, b) => a - b);
  let ret = 0;

  outer: while (B.length && A.length) {
    const bScore = B.pop();
    while (A.pop() >= bScore) if (!A.length) break outer; //남은 A가 b보다 모두 큰경우
    ret++;
  }
  return ret;
}
