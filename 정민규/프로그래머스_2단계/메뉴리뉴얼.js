const getCombination = (ary, n) => {
  let ret = [];
  if (n === 1) return ary.map((el) => [el]);

  ary.forEach((fixed, idx, ary) => {
    const rest = ary.slice(idx + 1);
    const combination = getCombination(rest, n - 1);

    const attached = combination.map((el) => [fixed, ...el]);
    ret.push(...attached);
  });
  return ret;
};

function solution(orders, course) {
  const ret = [];
  for (const size of course) {
    const map = new Map();
    for (const order of orders) {
      getCombination(order.split("").sort(), size).forEach((el) => {
        el = el.join("");
        if (map.get(el)) map.set(el, map.get(el) + 1);
        else map.set(el, 1);
      });
    }

    let tmpAry = [];
    let max_ = 2;
    for (const [key, val] of map) {
      if (map.get(key) > max_) {
        max_ = map.get(key);
        tmpAry = [key];
      } else if (map.get(key) === max_) {
        tmpAry.push(key);
      }
    }
    ret.push(...tmpAry);
  }

  return ret.sort();
}
