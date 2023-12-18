function solution(name) {
  if (!name.replaceAll("A", "").length) return 0;

  const alphaToNum = (str) => {
    const n = str.charCodeAt() - 65;
    return n > 12 ? 26 - n : n;
  };
  let ret = 0;

  for (const s of name) {
    ret += alphaToNum(s);
  }

  const dfs = (arr, idx, step, dp) => {
    const tmpArr = [...arr];
    const tmpDp = [...dp];
    tmpArr[idx] = "A";
    tmpDp[idx] += 1;

    if (arr.every((v) => v === "A")) return step - 1;
    if (tmpDp[idx] > 2) return name.length - 1;

    const leftIdx = idx === 0 ? name.length - 1 : idx - 1;
    const rightIdx = idx === name.length - 1 ? 0 : idx + 1;

    const left = dfs(tmpArr, leftIdx, step + 1, tmpDp);
    const right = dfs(tmpArr, rightIdx, step + 1, tmpDp);

    return Math.min(left, right);
  };

  const arr = [...name];
  const dp = new Array(name.length).fill(0);

  return ret + dfs(arr, 0, 0, dp);
}
ㅇ