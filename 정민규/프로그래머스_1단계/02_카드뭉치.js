function solution(cards1, cards2, goal) {
  const cards = [cards1, cards2];
  let ret = "Yes";
  let i = cards2.includes(goal[0]) ? 1 : 0;
  for (const word of goal) {
    if (cards[i][0] === word) {
      cards[i].shift();
      continue;
    }
    i = i ? 0 : 1;
    if (cards[i][0] === word) {
      cards[i].shift();
      continue;
    }
    ret = "No";
  }

  return ret;
}
