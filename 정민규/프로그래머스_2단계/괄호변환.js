function solution(p) {
  const getSeperateIdx = (str) => {
    const cnt = [0, 0];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "(") cnt[0]++;
      else cnt[1]++;
      if (cnt[0] === cnt[1]) return i;
    }
  };

  const isCorrectBracket = (str) => {
    const stk = [];
    for (const c of str) {
      if (c === "(") stk.push(c);
      else {
        if (!stk.length) return false;
        stk.pop();
      }
    }
    return true;
  };

  const reverseBracket = (str) => {
    let ret = "";
    for (const c of str) {
      if (c === "(") ret += ")";
      else ret += "(";
    }
    return ret;
  };

  const recur = (str) => {
    if (str === "") return str;

    const idx = getSeperateIdx(str);
    const u = str.slice(0, idx + 1);
    const v = str.slice(idx + 1);

    if (isCorrectBracket(u)) return u + recur(v);
    else return "(" + recur(v) + ")" + reverseBracket(u.slice(1, u.length - 1));
  };

  return recur(p);
}
