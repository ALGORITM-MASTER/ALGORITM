function solution(strs, t) {
  const isCanGo = (str, word) => {
    if (str.length > word.length) return false;
    for (let i = 0; i < word.length; i++) {
      if (str[i] !== word[i]) return false;
    }
    return true;
  };

  let ret = Infinity;
  const dfs = (word, cnt) => {
    if (cnt > ret) return;
    if (word.length === 0 && ret > cnt) ret = cnt;
    const nxStrs = strs.filter((v) => isCanGo(v, word.slice(0, v.length)));
    nxStrs.sort((a, b) => a - b);
    for (const str of nxStrs) {
      dfs(word.slice(str.length), cnt + 1);
    }
  };
  dfs(t, 0);
  return ret === Infinity ? -1 : ret;
}
