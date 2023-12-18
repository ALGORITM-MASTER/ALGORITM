const getCombination = (arr, n) => {
  let ret = [];
  if (n === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, idx, arr) => {
    const rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    getCombination(rest, n - 1).forEach((el) => ret.push([fixed, ...el]));
  });
  return ret;
};

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= n ** 0.5; i++) {
    if (!(n % i)) return false;
  }
  return true;
};

function solution(numbers) {
  let ret = new Set();
  const numList = numbers.split("");

  for (let i = 1; i <= numbers.length; i++) {
    const combi = getCombination(numList, i);
    for (const num of combi) {
      const n = ~~num.join("");
      if (isPrime(n)) ret.add(n);
    }
  }
  return ret.size;
}
