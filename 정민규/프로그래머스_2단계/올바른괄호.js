function solution(s) {
  let cnt = 0;
  for (let el of s) {
    if (el === "(") cnt += 1;
    else cnt -= 1;

    if (cnt < 0) {
      return false;
    }
  }
  return cnt === 0 ? true : false;
}
