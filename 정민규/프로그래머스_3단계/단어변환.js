function solution(begin, target, words) {
  //변할 수 있는 단어인지 체크
  const isCanChange = (st1, st2) => {
    let cnt = 0;
    for (let i = 0; i < st1.length; i++) if (st1[i] !== st2[i]) cnt++;
    return cnt === 1 ? true : false;
  };

  const visited = new Map();
  for (const word of words) visited.set(word, false);

  let ret = Infinity;
  const dfs = (word, cnt) => {
    //종료조건
    if (word === target) {
      ret = Math.min(ret, cnt);
      return;
    }

    for (const nxWord of words) {
      if (!isCanChange(word, nxWord) || visited.get(nxWord)) continue;
      visited.set(nxWord, true);
      dfs(nxWord, cnt + 1);
      visited.set(nxWord, false);
    }
  };
  dfs(begin, 0);
  return ret === Infinity ? 0 : ret;
}
