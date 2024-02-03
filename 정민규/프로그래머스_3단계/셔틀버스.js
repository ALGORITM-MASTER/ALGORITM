function solution(n, t, m, timetable) {
  const changehhmmToM = (time) => {
    const [hour, minute] = time.split(":").map((v) => +v);
    return hour * 60 + minute;
  };
  const changeMTohhmm = (time) => {
    const [hour, minute] = [~~(time / 60), time % 60];
    return (
      String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0")
    );
  };

  const isCanGoCompany = (time) => {
    let pIdx = 0;
    for (let i = 0; i < n; i++) {
      const curTime = 9 * 60 + i * t;

      let busPassenger = 0; //이번 회차의 버스 승객 수
      while (busPassenger < m && timetable[pIdx] <= curTime) {
        if (time < timetable[pIdx]) return true;
        pIdx++;
        busPassenger++;
      }
      //탈수 있다면 회사에 갈 수 있다고 생각
      if (busPassenger < m && time <= curTime) return true;
    }
    return false;
  };

  timetable = timetable.map((v) => changehhmmToM(v)).sort((a, b) => a - b);

  let [left, right] = [0, 24 * 60];
  while (left <= right) {
    const mid = ~~((left + right) / 2);
    if (isCanGoCompany(mid)) left = mid + 1;
    else right = mid - 1;
  }

  return changeMTohhmm(left - 1);
}
