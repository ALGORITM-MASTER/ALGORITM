function solution(cap, n, deliveries, pickups) {
  let deli_space = 0;
  let pic_space = 0;
  let ret = 0;
  for (let i = pickups.length - 1; i >= 0; i--) {
    let deli = deliveries[i];
    if (deli > deli_space) {
      deli -= deli_space;
      deli_space = 0;
    } else {
      deli_space -= deli;
      deli = 0;
    }
    let pic = pickups[i];
    if (pic > pic_space) {
      pic -= pic_space;
      pic_space = 0;
    } else {
      pic_space -= pic;
      pic = 0;
    }

    const deliCnt = deli % cap ? ~~(deli / cap) + 1 : deli / cap;
    const picCnt = pic % cap ? ~~(pic / cap) + 1 : pic / cap;

    const goCnt = Math.max(deliCnt, picCnt);
    ret += goCnt * (i + 1) * 2;
    deli_space += goCnt * cap - deli;
    pic_space += goCnt * cap - pic;
  }

  return ret;
}
