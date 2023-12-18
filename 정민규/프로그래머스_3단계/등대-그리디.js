function solution(n, lighthouse) {
  const memo = new Array(n + 1).fill(false);
  let result = 0;

  while (lighthouse.length) {
    const map = new Array(n + 1).fill().map((_) => []);

    for (const el of lighthouse) {
      const [a, b] = el;
      map[a].push(b);
      map[b].push(a);
    }

    map
      .filter((el) => el.length === 1)
      .forEach((el) => {
        const [target] = el;
        if (!memo[target]) {
          memo[target] = true;
          if (map[target].length !== 1) {
            result += 1;
          } else {
            result += 0.5;
          }
        }
      });

    lighthouse = lighthouse.filter((el) => {
      const [a, b] = el;

      return !memo[a] && !memo[b];
    });
  }

  return result;
}
