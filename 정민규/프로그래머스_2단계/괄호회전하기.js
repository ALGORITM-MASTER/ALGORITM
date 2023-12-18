function solution(s) {
  const obj = {
    "}": "{",
    "]": "[",
    ")": "(",
  };

  const isCorrectBracket = (str) => {
    const stk = [];
    for (const c of str) {
      if ("{[(".includes(c)) stk.push(c);
      else if (obj[c] !== stk.pop()) return false;
    }
    return stk.length ? false : true;
  };

  const rotate = (str) => str.substring(1) + str[0];

  let ret = 0;
  for (let i = 0; i < s.length; i++) {
    s = rotate(s);
    ret += isCorrectBracket(s) ? 1 : 0;
  }
  return ret;
}
