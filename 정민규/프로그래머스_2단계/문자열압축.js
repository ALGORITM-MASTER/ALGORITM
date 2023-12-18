function solution(s) {
  let ret = s.length;
  for (let i = 1; i < s.length; i++) {
    const ary = [];
    for (let j = 0; j < s.length; j += i) {
      ary.push(s.slice(j, j + i));
    }

    const str = ary.reduce(
      (a, c, idx) => {
        const [ret, cnt, tmp] = a;
        if (c === tmp) {
          if (idx === ary.length - 1) return [ret + String(cnt + 1), 1, c];
          return [ret, cnt + 1, tmp];
        } else {
          if (cnt < 2) return [ret + c, 1, c];
          else return [ret + String(cnt) + c, 1, c];
        }
      },
      ["", 0, 0]
    );

    ret = Math.min(ret, str[0].length);
  }
  return ret;
}
