function solution(n, stations, w) {
  stations.sort((a, b) => a - b);

  let ret = 0;
  let dist = 1;
  const range = 2 * w + 1; //기지국 범위

  for (const station of stations) {
    const tmp = station - w - dist; //미설치된 구간
    if (tmp > 0) ret += ~~(tmp / range) + (tmp % range ? 1 : 0); //기지국 설치
    dist = station + w + 1; //다음 미설치된 시작점
  }
  //마지막 기지국 이후 설치
  if (dist <= n)
    ret += ~~((n + 1 - dist) / range) + ((n + 1 - dist) % range ? 1 : 0);

  return ret;
}
