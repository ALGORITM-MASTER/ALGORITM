function solution(n) {
  const setAry = [...Array(n + 1)].map((_) => new Set());

  setAry[1].add("()");

  for (let i = 2; i <= n; i++) {
    for (const str of setAry[i - 1]) {
      for (let j = 0; j < str.length; j++) {
        const nxStr = str.slice(0, j) + "()" + str.slice(j);
        setAry[i].add(nxStr);
      }
    }
  }

  return setAry[n].size;
}
