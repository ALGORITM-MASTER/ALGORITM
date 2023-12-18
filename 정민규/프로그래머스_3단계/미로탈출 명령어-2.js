function solution(n, m, x, y, r, c, k) {
  let ret = "";
  let dist = Math.abs(x - r) + Math.abs(y - c);
  k -= dist;
  if (k < 0 || k % 2 != 0) return "impossible";

  const direction = { d: 0, l: 0, r: 0, u: 0 };
  if (x > r) direction.u += x - r;
  else direction.d += r - x;
  if (y > c) direction.l += y - c;
  else direction.r += c - y;

  ret += "d".repeat(direction.d);
  const d = Math.min(k / 2, n - (x + direction.d));
  ret += "d".repeat(d);
  direction.u += d;
  k -= 2 * d;

  ret += "l".repeat(direction.l);
  const l = Math.min(k / 2, y - direction.l - 1);
  ret += "l".repeat(l);
  direction.r += l;
  k -= 2 * l;

  ret += "rl".repeat(k / 2);
  ret += "r".repeat(direction.r);
  ret += "u".repeat(direction.u);
  return ret;
}
