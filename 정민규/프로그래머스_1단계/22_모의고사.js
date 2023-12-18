function solution(answers) {
  const ary = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const cntLst = answers.reduce(
    (a, c, idx) =>
      [...new Array(3)].map((_, i) =>
        c === ary[i][idx % ary[i].length] ? a[i] + 1 : a[i]
      ),
    [0, 0, 0]
  );

  const ret = [];
  for (let i = 0; i < 3; i++)
    if (cntLst[i] === Math.max(...cntLst)) ret.push(i + 1);
  return ret;
}
