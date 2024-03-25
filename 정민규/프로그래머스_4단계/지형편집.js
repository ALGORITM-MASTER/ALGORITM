function solution(land, P, Q) {
  // n층일 때 소요되는 비용
  const getCost = (floor) => {
    let ret = 0;
    for (let i = 0; i < land.length; i++) {
      for (let j = 0; j < land[0].length; j++) {
        ret += (land[i][j] - floor) * (land[i][j] > floor ? Q : -P);
      }
    }
    return ret;
  };

  let left = 0;
  let right = Math.max(...land.map((v) => Math.max(...v)));

  //경사하강법과 비슷하게 구현
  while (1) {
    const mid = ~~((left + right) / 2);

    const midCnt = getCost(mid);
    const midLeftCnt = getCost(mid - 1);
    const midRightCnt = getCost(mid + 1);

    //웅덩이에 빠진 경우
    if (midLeftCnt >= midCnt && midRightCnt >= midCnt) return midCnt;

    //현재 내리막길인지 오르막길인지 파악
    if (midLeftCnt < midRightCnt) right = mid - 1;
    else left = mid + 1;
  }
}
