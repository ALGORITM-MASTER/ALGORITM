function solution(s) {
  var ret = [];

  for (let i = 0; i < s.length; i++) {
    const before = s.slice(0, i);
    ret.push(
      before.lastIndexOf(s[i]) === -1 ? -1 : i - before.lastIndexOf(s[i])
    );
  }

  return ret;
}
