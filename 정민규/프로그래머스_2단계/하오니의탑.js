function solution(n) {
  const ret = [];
  const dfs = (n, s, e) => {
    if (n === 0) return;

    const rest = [1, 2, 3].filter((v) => v !== s && v !== e)[0];
    dfs(n - 1, s, rest);
    ret.push([s, e]);
    dfs(n - 1, rest, e);
  };

  dfs(n, 1, 3);
  return ret;
}
