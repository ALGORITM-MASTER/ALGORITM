function solution(progresses, speeds) {
  const ret = [];
  while (progresses.length) {
    const progress = progresses.shift();
    const speed = speeds.shift();

    progresses = progresses.map((v, i) => v + Math.ceil((100 - progress) / speed) * speeds[i]);

    let cnt = 1;
    while (progresses[0] >= 100) {
      progresses.shift();
      speeds.shift();
      cnt++;
    }
    ret.push(cnt);
  }
  return ret;
}
