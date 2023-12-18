class LRU {
  constructor(cacheSize) {
    this.cache = [];
    this.maxSize = cacheSize;
  }

  set(val) {
    const idx = this.cache.indexOf(val);
    if (idx !== -1) {
      this.cache = [
        this.cache[idx],
        ...this.cache.slice(0, idx),
        ...this.cache.slice(idx + 1),
      ];
      return 1;
    }

    this.cache.unshift(val);
    if (this.maxSize < this.cache.length) this.cache.pop();
    return 5;
  }
}

function solution(cacheSize, cities) {
  cities = cities.map((v) => v.toLowerCase());
  const cache = new LRU(cacheSize);
  let ret = 0;
  for (const city of cities) {
    ret += cache.set(city);
  }
  return ret;
}
