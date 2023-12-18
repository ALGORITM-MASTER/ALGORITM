function solution(clothes) {
  const map = new Map();
  for (const [name, type] of clothes) {
    if (map.get(type)) map.set(type, map.get(type) + 1);
    else map.set(type, 1);
  }
  let ret = 1;
  for (const [key, val] of map) {
    ret *= val + 1;
  }
  return ret - 1;
}
