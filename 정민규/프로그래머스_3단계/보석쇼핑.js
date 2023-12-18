function solution(gems) {
  const map = new Map();
  const amount = new Set(gems).size;

  const getMinIdx = (start) => {
    while (start < gems.length) {
      const curGem = gems[start];
      const gemCnt = map.get(curGem);

      if (gemCnt > 1) {
        map.set(curGem, gemCnt - 1);
        start++;
        continue;
      }
      return start;
    }
  };

  let start = 0;

  let retS = 0;
  let retE = gems.length;

  for (let i = 0; i < gems.length; i++) {
    const gem = gems[i];
    const gemCnt = map.get(gem);

    if (gemCnt) map.set(gem, gemCnt + 1);
    else map.set(gem, 1);

    if (map.size < amount) continue;

    start = getMinIdx(start);

    if (i - start < retE - retS) {
      retE = i;
      retS = start;
    }
  }

  return [retS + 1, retE + 1];
}
