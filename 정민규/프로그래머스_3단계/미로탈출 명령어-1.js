function solution(n, m, x, y, r, c, k) {
  const map = [...Array(n + 1)].map((_) => Array(m + 1).fill("."));
  map[r][c] = "E";

  const dy = [-1, 0, 0, 1];
  const dx = [0, 1, -1, 0];
  const dOrder = "urld";

  const stk = [[x, y, ""]];

  while (stk.length) {
    const [cy, cx, order] = stk.pop();
    if (order.length === k) {
      if (map[cy][cx] === "E") return order;
      else continue;
    }

    for (let d = 0; d < 4; d++) {
      const ny = cy + dy[d];
      const nx = cx + dx[d];
      const nOrder = order + dOrder[d];
      if (0 < ny && ny <= n && 0 < nx && nx <= m) {
        stk.push([ny, nx, nOrder]);
      }
    }
  }
  return "impossible";
}
