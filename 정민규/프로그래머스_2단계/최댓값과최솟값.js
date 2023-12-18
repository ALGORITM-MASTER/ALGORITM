function solution(s) {
  const ary = s.split(" ");
  return `${Math.min(...ary)} ${Math.max(...ary)}`;
}
