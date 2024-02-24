const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let total = +input[0];
const n = +input[1];

for (let i = 2; i < n + 2; i++) {
  const [money, num] = input[i].split(" ").map((v) => +v);
  total -= money * num;
  console.log(total);
}

console.log(total ? "No" : "Yes");
