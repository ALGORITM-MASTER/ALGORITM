function solution(sticker) {
  const len = sticker.length;

  //첫스티커 뗀 경우
  let tmp = [0, sticker[0]];

  for (let i = 2; i < len - 1; i++) {
    tmp = [tmp[1] + sticker[i], Math.max(...tmp)];
  }

  //첫 스티커 안뗀 경우
  let tmp2 = [0, 0];

  for (let i = 1; i < len; i++) {
    tmp2 = [tmp2[1] + sticker[i], Math.max(...tmp2)];
  }
  return Math.max(...tmp, ...tmp2);
}
