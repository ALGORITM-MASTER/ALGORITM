function solution(n) {
  let ret = 0;
  const dfs = (str, l) => {
    if (l === n) {
      ret++;
      return;
    }
    dfs(str + "(", l + 1);

    const sCnt = [...str].filter((v) => v === "(").length;
    const eCnt = [...str].filter((v) => v === ")").length;
    if (sCnt > eCnt) dfs(str + ")", l);
  };
  dfs("", 0);
  return ret;
}
