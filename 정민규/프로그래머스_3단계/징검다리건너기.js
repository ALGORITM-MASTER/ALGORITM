function solution(stones, k) {
  let left = 0;
  let right = 2000000000;

  while (left <= right) {
    const mid = ~~((left + right) / 2);
    let isCanGo = true;
    let cnt = 0;
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] - mid <= 0) cnt += 1;
      else cnt = 0;
      if (cnt === k) {
        isCanGo = false;
        break;
      }
    }
    if (isCanGo) left = mid + 1;
    else right = mid - 1;
  }

  return left;
}
