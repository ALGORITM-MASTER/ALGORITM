function solution(str1, str2) {
  const getSet = (str) => {
    const ret = [];
    str = str.toLowerCase();
    for (let i = 0; i < str.length - 1; i++) {
      const st = str[i] + str[i + 1];
      if (/[a-z][a-z]/.test(st)) ret.push(st);
    }
    return ret;
  };

  const set1 = getSet(str1);
  const set2 = getSet(str2);

  const map = new Map();
  for (const el of set2) {
    if (map.get(el)) map.set(el, map.get(el) + 1);
    else map.set(el, 1);
  }

  const union = set1.filter((el) => {
    if (map.get(el)) {
      map.set(el, map.get(el) - 1);
      return true;
    }
    return false;
  });

  const unionSize = union.length;
  const intersectionSize = set1.length + set2.length - union.length;

  if (!intersectionSize) return 65536;
  return ~~((unionSize / intersectionSize) * 65536);
}
