const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= n ** 0.5; i++) {
    if (!(n % i)) return false;
  }
  return true;
};

function solution(n, k) {
  return n
    .toString(k)
    .split("0")
    .filter((el) => isPrime(el)).length;
}
