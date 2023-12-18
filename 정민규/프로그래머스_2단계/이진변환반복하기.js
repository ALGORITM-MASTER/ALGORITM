function solution(s) {
  let cnt = 0;
  let zeroCnt = 0;
  while (s.length > 1) {
    const sLen = s.length;
    s = s.replaceAll("0", "");
    zeroCnt += sLen - s.length;
    cnt++;
    s = s.length.toString(2);
  }
  return [cnt, zeroCnt];
}
