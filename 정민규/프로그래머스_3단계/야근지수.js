function solution(weights) {
  let ret = 0;
  const map = new Map();
  for (const weight of weights) {
    if (map.get(weight)) map.set(weight, map.get(weight) + 1);
    else map.set(weight, 1);
  }
  const ary = [2 / 3, 2 / 4, 3 / 2, 3 / 4, 4 / 2, 4 / 3, 1];

  for (let i = 0; i < weights.length; i++) {
    const a = weights[i];
    for (const b of ary) {
      const num = map.get(a * b);

      if (num) {
        if (a * b === a && num > 1) ret += num - 1;
        else if (a * b !== a) ret += num;
      }
    }
  }

  return ret / 2;
}
