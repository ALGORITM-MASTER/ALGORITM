function solution(play_time, adv_time, logs) {
  const strToSeconds = (str) => {
    const [h, m, s] = str.split(":").map((v) => +v);
    return h * 3600 + m * 60 + s;
  };

  const fillZero = (num) => {
    return String(num).padStart(2, "0");
  };
  const secondsToStr = (seconds) => {
    const h = ~~(seconds / 3600);
    const m = ~~((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${fillZero(h)}:${fillZero(m)}:${fillZero(s)}`;
  };

  const timeTable = Array(strToSeconds(play_time)).fill(0);

  for (const time of logs) {
    const [start, end] = time.split("-").map((v) => strToSeconds(v));
    timeTable[start] += 1;
    timeTable[end] -= 1;
  }
  //누적합 계산
  let sum = 0;
  for (let i = 0; i < timeTable.length; i++) {
    sum += timeTable[i];
    timeTable[i] = sum;
  }

  const advTime = strToSeconds(adv_time);

  let curSum = 0;
  for (let i = 0; i < advTime; i++) {
    curSum += timeTable[i];
  }
  let maxSum = curSum;
  let ret = 0;
  for (let i = 1; i < timeTable.length - advTime; i++) {
    curSum -= timeTable[i];
    curSum += timeTable[i + advTime];
    if (curSum > maxSum) {
      maxSum = curSum;
      ret = i + 1;
    }
  }

  return secondsToStr(ret);
}
