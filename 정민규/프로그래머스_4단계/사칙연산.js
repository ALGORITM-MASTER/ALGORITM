function solution(arr) {
  const nums = [];
  const symbol = [];
  for (const st of arr) {
    if (st === "-" || st === "+") symbol.push(st);
    else nums.push(+st);
  }

  const len = ~~(arr.length / 2) + 1;
  const min = [...Array(len)].map((_) => Array(len).fill(Infinity));
  const max = [...Array(len)].map((_) => Array(len).fill(-Infinity));

  for (let step = 0; step < len; step++) {
    for (let i = 0; i < len - step; i++) {
      const j = i + step;
      if (step === 0) {
        min[i][j] = nums[i];
        max[i][j] = nums[i];
        continue;
      }
      for (let k = i; k < j; k++) {
        if (symbol[k] === "+") {
          min[i][j] = Math.min(min[i][j], min[i][k] + min[k + 1][j]);
          max[i][j] = Math.max(max[i][j], max[i][k] + max[k + 1][j]);
        } else if (symbol[k] === "-") {
          min[i][j] = Math.min(min[i][j], min[i][k] - max[k + 1][j]);
          max[i][j] = Math.max(max[i][j], max[i][k] - min[k + 1][j]);
        }
      }
    }
  }

  return max[0][len - 1];
}
