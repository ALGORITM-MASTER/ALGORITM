function solution(cookie) {
  const getCnt = (i) => {
    let j = i + 1;
    if (!(0 <= i && j < cookie.length)) return 0;
    let left = cookie[i];
    let right = cookie[j];
    let ret = 0;
    while (0 <= i && j < cookie.length) {
      if (left === right) {
        ret = left;
        if (0 <= --i && ++j < cookie.length) {
          left += cookie[i];
          right += cookie[j];
        }
      } else if (left > right && ++j < cookie.length) right += cookie[j];
      else if (0 <= --i) left += cookie[i];
    }
    return ret;
  };

  let ret = 0;
  for (let i = 0; i < cookie.length; i++) {
    const cnt = getCnt(i);
    if (ret < cnt) ret = cnt;
  }
  return ret;
}
