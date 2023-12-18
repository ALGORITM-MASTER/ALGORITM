function solution(s) {
  const stk = [];

  for (const word of s) {
    if (stk[stk.length - 1] === word) stk.pop();
    else stk.push(word);
  }
  return stk.length ? 0 : 1;
}
