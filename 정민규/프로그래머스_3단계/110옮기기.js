function solution(s) {
  return s.map((str) => {
    const [newStr, cnt] = find110(str);
    const idx11 = newStr.indexOf("11");
    if (idx11 !== -1)
      return newStr.slice(0, idx11) + "110".repeat(cnt) + newStr.slice(idx11);
    const zeroIdx = newStr.lastIndexOf("0");
    if (zeroIdx !== -1)
      return (
        newStr.slice(0, zeroIdx + 1) +
        "110".repeat(cnt) +
        newStr.slice(zeroIdx + 1)
      );
    return "110".repeat(cnt) + newStr;
  });
}

const find110 = (str) => {
  const stk = [];
  let cnt = 0;
  for (const c of str) {
    stk.push(c);
    while (
      stk.length > 2 &&
      stk[stk.length - 1] === "0" &&
      stk[stk.length - 2] === "1" &&
      stk[stk.length - 3] === "1"
    ) {
      stk.pop();
      stk.pop();
      stk.pop();
      cnt += 1;
    }
  }

  return [stk.join(""), cnt];
};
