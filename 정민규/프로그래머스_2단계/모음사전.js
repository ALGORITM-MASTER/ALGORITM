function solution(word) {
  const map = new Map();
  const words = ["A", "E", "I", "O", "U"];
  let cnt = 0;
  const dfs = (word) => {
    if (word.length > 5) return;
    map.set(word, ++cnt);
    for (let i = 0; i < 5; i++) {
      dfs(word + words[i]);
    }
  };
  dfs("");
  return map.get(word) - 1;
}
