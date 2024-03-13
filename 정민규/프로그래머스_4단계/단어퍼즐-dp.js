function solution(strs, t) {
  const dp = Array(t.length).fill(Infinity);

  const isCanPut = (str, idx) => {
    if (idx + 1 < str.length) return false;

    for (let i = 0; i < str.length; i++) {
      if (str[str.length - i - 1] !== t[idx - i]) return false;
    }
    return true;
  };

  outer: for (const str of strs) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== t[i]) continue outer;
    }
    dp[str.length - 1] = 1;
  }

  for (let i = 0; i < t.length; i++) {
    const tmp = strs.filter((v) => isCanPut(v, i));
    for (const str of tmp) {
      if (!dp[i - str.length]) continue;
      dp[i] = Math.min(dp[i - str.length] + 1, dp[i]);
    }
  }

  return dp[dp.length - 1] === Infinity ? -1 : dp[dp.length - 1];
}
