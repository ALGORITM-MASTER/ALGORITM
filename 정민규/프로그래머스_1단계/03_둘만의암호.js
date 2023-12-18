function solution(s, skip, index) {
  const alpha = [...new Array(26)]
    .map((v, i) => String.fromCharCode(i + 97))
    .filter((el) => !skip.includes(el));

  return [...s]
    .map((el) => alpha[(alpha.indexOf(el) + index) % alpha.length])
    .join("");
}
