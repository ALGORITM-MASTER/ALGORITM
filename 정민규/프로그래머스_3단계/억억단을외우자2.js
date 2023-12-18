function solution(e, starts) {
  const sieve = new Array(5000001).fill(0);
  for (let i = 1; i <= e; i++) {
    for (let j = 1; j <= e / i; j++) {
      sieve[i * j]++;
    }
  }

  const ret = [e];
  for (let i = e - 1; i > 0; i--) {
    ret.push(sieve[ret[ret.length - 1]] > sieve[i] ? ret[ret.length - 1] : i);
  }
  return starts.map((n) => ret[e - n]);
}
