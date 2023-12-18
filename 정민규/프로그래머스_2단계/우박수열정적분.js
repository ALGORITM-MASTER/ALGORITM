function solution(k, ranges) {
  const ary = [k];
  while (k !== 1) {
    if (k % 2) k = k * 3 + 1;
    else k = k / 2;
    ary.push(k);
  }

  const areaList = [];
  for (let i = 0; i < ary.length - 1; i++) {
    const min_ = Math.min(ary[i], ary[i + 1]);
    const max_ = Math.max(ary[i], ary[i + 1]);
    areaList.push(min_ + (max_ - min_) / 2);
  }

  return ranges.map(([a, b]) => {
    b = ary.length - 1 + b;
    if (a > b) return -1;
    let ret = 0;

    for (let i = a; i < b; i++) {
      ret += areaList[i];
    }
    return ret;
  });
}
