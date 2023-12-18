function solution(msg) {
  const map = new Map();
  let mapSize = 27;
  const ret = [];

  for (let i = 0; i < 26; i++) {
    map.set(String.fromCharCode(i + 65), i + 1);
  }

  for (let i = 0; i < msg.length; i++) {
    let word = msg[i];
    while (1) {
      const nWord = word + msg[i + 1];
      if (map.get(nWord)) {
        word = nWord;
        i++;
      } else break;
    }

    ret.push(map.get(word));
    map.set(word + msg[i + 1], mapSize++);
  }

  return ret;
}
