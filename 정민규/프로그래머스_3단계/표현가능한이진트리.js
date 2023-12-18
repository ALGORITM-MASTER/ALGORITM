const isZeroTree = (str) => (str.indexOf("1") === -1 ? true : false);

const isTree = (str) => {
  if (str.length === 1) return 1;
  const rootIdx = ~~(str.length / 2);
  const [before, root, after] = [
    str.slice(0, rootIdx),
    str[rootIdx],
    str.slice(rootIdx + 1),
  ];
  if (root === "0") return isZeroTree(str) ? 1 : 0;

  return isTree(before) && isTree(after);
};

function solution(numbers) {
  const ret = numbers.map((number) => {
    const binary = number.toString(2);
    const n = binary.length.toString(2).length;

    const str = "0".repeat(2 ** n - 1 - binary.length) + binary;
    // console.log(str)
    return isTree(str);
  });
  return ret;
}
//좀 더 봐야함
