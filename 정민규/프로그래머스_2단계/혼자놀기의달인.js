const find = (arr, a) => {
  if (arr[a] === a) return a;

  return (arr[a] = find(arr, arr[a]));
};

const union = (arr, a, b) => {
  a = find(arr, a);
  b = find(arr, b);

  if (a < b) arr[b] = arr[a];
  else arr[a] = arr[b];
};

function solution(cards) {
  const ary = [...new Array(cards.length + 1)].map((_, i) => i);
  cards = [0, ...cards];
  for (let i = 1; i < cards.length; i++) {
    union(ary, i, cards[i]);
  }

  const map = new Map();

  for (let i = 1; i < ary.length; i++) {
    const el = find(ary, ary[i]);

    if (map.has(el)) map.set(el, map.get(el) + 1);
    else map.set(el, 1);
  }
  const ret = [...map].map((el) => el[1]).sort((a, b) => b - a);
  return ret.length > 1 ? ret[0] * ret[1] : 0;
}
