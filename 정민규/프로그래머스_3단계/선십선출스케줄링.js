function solution(n, cores) {
  cores = cores.map((v) => BigInt(v));

  const getWorkCnt = (time) => {
    return cores.reduce((a, c) => a + ~~(time / c), 0n) + BigInt(cores.length);
  };

  let right = BigInt(5000 * 50000); //2개 코어로 10,000시간짜리 일 50,000개 하는 최대경우
  let left = 0n;
  let work;

  while (left <= right) {
    const mid = ~~((right + left) / 2n);
    work = getWorkCnt(mid);
    if (work >= n) right = mid - 1n;
    else left = mid + 1n;
  }

  let ret = [];
  for (let i = 0; i < cores.length; i++) {
    if (!(left % cores[i])) ret.push(i);
  }

  console.log(ret);
  console.log(left, right, work, ret.length - parseInt(work) + n - 1);

  return ret[ret.length - parseInt(work) + n - 1] + 1;
}
