function solution(lines) {
  const map = new Map();

  //hh:mm:ss 형태를 ms로 변경
  const changeHHMMSSToMs = (time) => {
    const [h, m, s] = time.split(":");
    return (+h * 60 * 60 + +m * 60 + +s) * 1000;
  };

  //ss.ms 형태를 ms로 변경
  const changeSMsToMs = (time) => {
    let [s, ms] = time.split("s")[0].split(".");
    s = s ? +s : 0;
    ms = ms ? +ms : 0;
    return s * 1000 + ms;
  };

  for (const line of lines) {
    //시간을 몽땅 ms로 바꿈
    const [date, S, T] = line.split(" ");
    const [hms, ms] = S.split(".");

    let end = changeHHMMSSToMs(hms) + +ms;
    let start = end - changeSMsToMs(T);
    //시작시간과 끝나는 시간을 고름

    start = start > 0 ? start : 0; //start가 0보다 작다면 0으로 맞춰줌
    end = end += 999; //end가 되어도 1초동안은 처리한 요청으로 처리하기 위해 더해줌

    //map 자료형에 누적합 저장
    if (map.has(start)) map.set(start, map.get(start) + 1);
    else map.set(start, 1);

    if (map.has(end)) map.set(end, map.get(end) - 1);
    else map.set(end, -1);
  }

  //누적합을 더해가며 i초에서 처리할 수 있는 작업의 개수를 구함
  let ret = 0;
  let tmp = 0;
  for (let i = 0; i < 24 * 60 * 60 * 1000; i++) {
    if (map.has(i)) {
      tmp += map.get(i);
      if (ret < tmp) ret = tmp;
    }
  }

  return ret;
}
