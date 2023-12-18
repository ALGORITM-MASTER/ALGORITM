function solution(elements) {
  const ary = [...elements, ...elements];
  const set = new Set();
  for (let i = 1; i <= elements.length; i++) {
    for (let j = 0; j + i < ary.length; j++) {
      set.add(ary.slice(j, j + i).reduce((a, c) => a + c, 0));
    }
  }
  return set.size;
}
