function solution(money) {
  const { length } = money;
  let ret = 0;
  //첫집을 턴 경우
  let still = -99999;
  let noneStill = money[0];

  for (let i = 2; i < length - 1; i++) {
    const nxStill = noneStill + money[i];
    const nxNoneStill = Math.max(still, noneStill);
    still = nxStill;
    noneStill = nxNoneStill;
  }
  ret = Math.max(still, noneStill);
  //첫집을 안턴 경우
  still = 0;
  noneStill = 0;
  for (let i = 1; i < length; i++) {
    const nxStill = noneStill + money[i];
    const nxNoneStill = Math.max(still, noneStill);
    still = nxStill;
    noneStill = nxNoneStill;
  }

  return Math.max(still, noneStill, ret);
}
