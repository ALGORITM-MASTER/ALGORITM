function solution(keymap, targets) {
  const keyMap = {};

  keymap.forEach((key) => {
    [...key].forEach((el, idx) => {
      if (el in keyMap) {
        keyMap[el] = keyMap[el] < idx + 1 ? keyMap[el] : idx + 1;
      } else keyMap[el] = idx + 1;
    });
  });

  return targets.map((el) =>
    [...el].reduce((a, c, idx, arr) => {
      if (!keyMap[c]) {
        arr.splice(1);
        return -1;
      }
      return a + keyMap[c];
    }, 0)
  );
}
