function solution(coin, cards) {
  const n = cards.length;
  const memo = new Array(n / 2 + 1).fill(0);

  //카드를 넣음
  const putCard = (card, ary) => {
    if (card > n / 2) ary[n + 1 - card] += 1;
    else ary[card] += 1;
  };
  //가능배열 초기화
  const updateAble = (card, memo, initial, able) => {
    const num = card > n / 2 ? n + 1 - card : card;
    if (memo[num] === 2) able.push([num, 2 - initialMemo[num]]);
    able.sort((a, b) => b[1] - a[1]);
  };

  //초기값 설정
  for (let i = 0; i < n / 3; i++) putCard(cards[i], memo);
  let ret = 1;
  const initialMemo = [...memo];
  const able = [];
  for (let i = 1; i < memo.length; i++) {
    if (memo[i] === 2) able.push([i, 0]);
  }

  //라운드 진행
  for (let i = n / 3; i < n; i += 2) {
    putCard(cards[i], memo);
    putCard(cards[i + 1], memo);
    updateAble(cards[i], memo, initialMemo, able);
    updateAble(cards[i + 1], memo, initialMemo, able);

    if (!able.length) return ret;
    coin -= able.pop()[1];
    if (coin < 0) return ret;
    ret++;
  }
  return ret;
}
