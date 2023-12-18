function solution(X, Y) {
  const xCount = [...new Array(10)].fill(0);
  const yCount = [...new Array(10)].fill(0);
  for (const word of X) xCount[~~word] += 1;
  for (const word of Y) yCount[~~word] += 1;

  const lst = [...new Array(10)].map((_, idx) =>
    Math.min(xCount[idx], yCount[idx])
  );
  const ret =
    lst.reduce((a, c) => a + c, 0) === lst[0]
      ? "0"
      : lst.reduceRight(
          (a, c, idx) => (c ? a + idx.toString().repeat(c) : a),
          ""
        );

  return lst.reduce((a, c) => a + c, 0) ? ret : "-1";
}
