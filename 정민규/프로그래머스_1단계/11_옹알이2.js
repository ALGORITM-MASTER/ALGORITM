function solution(babbling) {
  const li = ["aya", "ye", "woo", "ma"];

  const ret = babbling.reduce((a, c, i, arr) => {
    if (li.some((el) => c.includes(el.repeat(2)))) return a;
    for (const el of li) c = c.replaceAll(el, " ");
    return c.replaceAll(" ", "").length ? a : a + 1;
  }, 0);

  return ret;
}
