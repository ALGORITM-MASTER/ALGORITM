function solution(n, words) {
  const map = new Map();

  let order = 0;
  let round = 1;
  let lastWord = words[0][0];

  for (const word of words) {
    if (map.get(word) || lastWord[lastWord.length - 1] !== word[0]) {
      return [order + 1, round];
    }

    lastWord = word;
    map.set(word, 1);
    if (++order >= n) {
      order = order % n;
      round++;
    }
  }

  return [0, 0];
}
