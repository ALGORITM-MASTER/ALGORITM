function solution(order) {
  const stk = [];
  let ret = 0;
  let box = 1;

  outer: for (const orderBox of order) {
    while (orderBox > box) stk.push(box++);
    if (orderBox < box) {
      while (stk.length) {
        if (orderBox === stk.pop()) {
          ret++;
          continue outer;
        }
        return ret;
      }
    }
    ret++;
    box++;
  }
  return ret;
}
