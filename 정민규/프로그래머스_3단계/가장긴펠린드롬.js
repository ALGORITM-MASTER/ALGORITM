function solution(s) {
  const getPalindromeCnt = (start, end) => {
    let len = 0;
    while (start >= 0 && end < s.length) {
      if (s[start--] != s[end++]) break;
      len++;
    }
    return len;
  };
  let ret = 0;
  for (let i = 0; i < s.length; i++) {
    const odd = getPalindromeCnt(i - 1, i + 1) * 2 + 1;
    if (odd > ret) ret = odd;
    const even = getPalindromeCnt(i - 1, i) * 2;
    if (even > ret) ret = even;
  }
  return ret;
}
