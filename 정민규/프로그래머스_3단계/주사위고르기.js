//조합 구하기
const combination = (ary, n) => {
  if (n === 1) return ary.map((v) => [v]);
  const ret = [];

  ary.forEach((fixed, idx) => {
    const rest = ary.slice(idx + 1);
    const combinations = combination(rest, n - 1);
    const attach = combinations.map((v) => [fixed, ...v]);
    ret.push(...attach);
  });
  return ret;
};

function solution(dice) {
  //주사위를 굴려 합을 map 자료형으로 저장
  const rollDice = (ary, dice, map) => {
    if (ary.length === dice.length) {
      const sum = ary.reduce((a, c) => a + c, 0);
      if (map.get(sum)) map.set(sum, map.get(sum) + 1);
      else map.set(sum, 1);
      return;
    }
    const ret = [];
    for (let i = 0; i < 6; i++) {
      ary.push(dice[ary.length][i]);
      rollDice(ary, dice, map);
      ary.pop();
    }
    return ret;
  };

  //결과값을 저장할 공간
  let retAry = [];
  let retCnt = 0;

  //dice를 번호로 나타내기위한 배열
  const diceIdx = [...Array(dice.length)].map((_, i) => i);
  //조합 가져오기
  const combinations = combination(diceIdx, dice.length / 2);

  for (const aAry of combinations) {
    //이번 조합에서의 a,b다이스
    const aDice = aAry.map((v) => dice[v]);
    const bDice = diceIdx.filter((v) => !aAry.includes(v)).map((v) => dice[v]);

    //굴린 주사위의 정보를 map자료형으로 가져옴
    const aMap = new Map();
    const bMap = new Map();
    rollDice([], aDice, aMap);
    rollDice([], bDice, bMap);
    let ret = 0;

    console.log(aMap);
    console.log(bMap);

    //이번 조합에서의 승리 횟수를 구함
    for (const [aCurSum, aCnt] of aMap) {
      for (const [bCurSum, bCnt] of bMap) {
        if (aCurSum > bCurSum) ret += aCnt * bCnt;
      }
    }

    //결과값 업데이트
    if (ret > retCnt) {
      retAry = aAry;
      retCnt = ret;
    }
  }
  //주사위가 1부터 시작이라 바꿔줌
  return retAry.map((v) => v + 1);
}
