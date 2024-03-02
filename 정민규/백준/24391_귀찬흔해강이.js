const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));

let inputIdx = 0;

const [n, m] = input[inputIdx++];

const parent = [...Array(n + 1)].map((_, i) => i);

const find = (a) => {
  if (a === parent[a]) return a;
  return (a = find(parent[a]));
};

const union = (a, b) => {
  a = find(a);
  b = find(b);

  if (a < b) parent[b] = a;
  else parent[a] = b;
};
for (let i = 0; i < m; i++) {
  const [a, b] = input[inputIdx++];
  union(a, b);
}

let ret = 0;
const lecture = input[inputIdx++];
for (let i = 0; i < lecture.length - 1; i++) {
  if (find(lecture[i]) !== find(lecture[i + 1])) ret++;
}

console.log(ret);
