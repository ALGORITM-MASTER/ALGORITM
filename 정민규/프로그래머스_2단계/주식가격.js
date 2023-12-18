function solution(prices) {
  const stk = [];
  const ret = new Array(prices).fill(0);

  for (let i = 0; i < prices.length; i++) {
    while (stk.length && stk[stk.length - 1][0] > prices[i]) {
      const [p, idx] = stk.pop();
      ret[idx] = i - idx;
    }
    stk.push([prices[i], i]);
  }

  while (stk.length) {
    const [p, idx] = stk.pop();
    ret[idx] = prices.length - 1 - idx;
  }
  return ret;
}
