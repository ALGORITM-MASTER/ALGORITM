const getCombinations = (ary, num) => {
  const ret = [];
  if (num === 1) return ary.map((el) => [el]);

  ary.forEach((fixed, idx, ori) => {
    const rest = ori.slice(idx + 1);
    const combinations = getCombinations(rest, num - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    ret.push(...attached);
  });
  return ret;
};

const isPrime = (n) => {
  for (let i = 2; i <= ~~(n ** 0.5); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

function solution(nums) {
  return getCombinations(nums, 3).reduce(
    (a, c) => (isPrime(c.reduce((a, c) => a + c, 0)) ? a + 1 : a),
    0
  );
}
