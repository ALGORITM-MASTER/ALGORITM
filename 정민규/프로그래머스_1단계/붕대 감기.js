function solution([시전시간, 초당회복량, 추가회복량], 체력, 공격) {
  let attackIdx = 0;
  let 현재시간 = 1;
  let 힐cnt = 0;
  const 최대체력 = 체력;

  while (attackIdx < 공격.length) {
    if (공격[attackIdx][0] === 현재시간) {
      체력 -= 공격[attackIdx][1];
      if (체력 <= 0) return -1;
      attackIdx++;
      힐cnt = 0;
    } else {
      체력 += 초당회복량;
      힐cnt++;
      if (힐cnt === 시전시간) {
        체력 += 추가회복량;
        힐cnt = 0;
      }
      체력 = Math.min(최대체력, 체력);
    }
    현재시간++;
  }
  return 체력;
}
