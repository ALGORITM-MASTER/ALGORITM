function solution(n, t, m, p) {
  let ret = "";
  let i = 0;
  let cnt = 0;

  while (ret.length < t) {
    const num = i.toString(n).toUpperCase();
    for (const s of num.split("")) {
      if (cnt % m === p - 1 && ret.length < t) ret += s;
      cnt++;
    }
    i++;
  }
  return ret;
}
