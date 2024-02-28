function solution(k, room_number) {
  const map = new Map();

  const getParent = (a) => {
    if (!map.has(a)) {
      map.set(a, a);
      return a;
    }
    if (a === map.get(a)) return a;
    const ret = getParent(map.get(a));
    map.set(a, ret);
    return ret;
  };

  const union = (a, b) => {
    a = getParent(a);
    b = getParent(b);

    if (a > b) map.set(b, a);
    else map.set(a, b);
  };

  return room_number.map((v) => {
    const num = getParent(v);
    union(v, num + 1);
    return num;
  });
}
