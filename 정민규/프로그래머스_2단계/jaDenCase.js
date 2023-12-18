function solution(s) {
  return s
    .split(" ")
    .map((v) => (v !== "" ? v[0].toUpperCase() + v.slice(1).toLowerCase() : ""))
    .join(" ");
}
