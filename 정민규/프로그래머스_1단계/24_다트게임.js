function solution(dartResult) {
  const dart = dartResult.match(/[0-9]+[SDT][*#]?/g);
  const ret = [0, 0, 0];
  const bonusList = {
    S: 1,
    D: 2,
    T: 3,
  };
  dart.forEach((scoreInfo, idx) => {
    const score = scoreInfo.match(/[0-9]+/g)[0];
    const bonus = scoreInfo.match(/[SDT]/g)[0];
    const opt = scoreInfo.match(/[*#]/g);
    ret[idx] = score ** bonusList[bonus];
    if (opt) {
      if (opt[0] === "*") ret[idx] *= 2;
      if (opt[0] === "*" && idx > 0) ret[idx - 1] *= 2;
      if (opt[0] === "#") ret[idx] *= -1;
    }
  });

  return ret.reduce((a, c) => a + c, 0);
}
