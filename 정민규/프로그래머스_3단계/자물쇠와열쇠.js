function solution(key, lock) {
  const kLen = key.length;
  const lLen = lock.length;

  //key 배열을 시계방향 1회회전
  const rotateKeyRight = (ary) => {
    const ret = [...Array(kLen)].map((_) => Array(kLen).fill(0));
    for (let i = 0; i < kLen; i++) {
      for (let j = 0; j < kLen; j++) {
        ret[j][kLen - i - 1] = ary[i][j];
      }
    }
    return ret;
  };

  //key,자물쇠를 맞춰보기위한 확장배열
  const extendLock = [...Array(2 * kLen + lLen - 1)].map((_) =>
    Array(2 * kLen + lLen - 1).fill(0)
  );
  for (let i = 0; i < lLen; i++) {
    for (let j = 0; j < lLen; j++) {
      extendLock[i + kLen - 1][j + kLen - 1] = lock[i][j];
    }
  }

  //자물쇠가 열리는지 체크
  const openLock = (extendLock, key, addR, addC) => {
    const tmp = [...Array(2 * kLen + lLen - 1)].map((_, idx) => [
      ...extendLock[idx],
    ]);
    //확장된 lock배열에 key를 쑤셔넣음
    for (let i = 0; i < kLen; i++) {
      for (let j = 0; j < kLen; j++) {
        tmp[addR + i][addC + j] += key[i][j];
      }
    }
    //열리는 상태인지 체크
    for (let i = kLen - 1; i < lLen + kLen - 1; i++) {
      for (let j = kLen - 1; j < lLen + kLen - 1; j++) {
        if (tmp[i][j] !== 1) return false;
      }
    }
    return true;
  };

  for (let i = 0; i < 4; i++) {
    for (let i = 0; i < kLen + lLen - 1; i++) {
      for (let j = 0; j < kLen + lLen - 1; j++) {
        if (openLock(extendLock, key, i, j)) return true;
      }
    }
    key = rotateKeyRight(key);
  }

  return false;
}
