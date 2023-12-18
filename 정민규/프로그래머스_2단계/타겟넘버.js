function solution(numbers, target) {
  const dfs = (ary, num) => {
    if (!ary.length) return num === target ? 1 : 0;

    return (
      dfs(ary.slice(0, ary.length - 1), num + ary[ary.length - 1]) +
      dfs(ary.slice(0, ary.length - 1), num - ary[ary.length - 1])
    );
  };

  return dfs(numbers, 0);
}
