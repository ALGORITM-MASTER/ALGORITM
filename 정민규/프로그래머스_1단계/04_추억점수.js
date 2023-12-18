function solution(name, yearning, photo) {
  const map = new Map();
  for (let i = 0; i < name.length; i++) {
    map.set(name[i], yearning[i]);
  }

  return photo.map((el) =>
    el.reduce((a, c) => (map.get(c) ? a + map.get(c) : a), 0)
  );
}
