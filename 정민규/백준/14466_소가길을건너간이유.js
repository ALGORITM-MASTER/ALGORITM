//골드3
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));

const [n, k, r] = input[0];

//그래프 생성
const graph = [...Array(n)].map((_) => [...Array(n)].map((_) => []));
for (let i = 1; i < r + 1; i++) {
  const [sr, sc, er, ec] = input[i].map((v) => v - 1);
  graph[sr][sc].push([er, ec]);
  graph[er][ec].push([sr, sc]);
}
//소 정보 저장
const cowInfo = [];
for (let i = r + 1; i < r + 1 + k; i++) {
  const [r, c] = input[i].map((v) => v - 1);
  cowInfo.push([r, c]);
}

const dr = [1, 0, -1, 0];
const dc = [0, 1, 0, -1];
//소-소로 갈수있는지 판별
const dfs = (ary, sR, sC, eR, eC) => {
  const stk = [[sR, sC]];
  ary[eR][eC] = "e";
  while (stk.length) {
    const [r, c] = stk.pop();
    if (ary[r][c] === 1) continue;
    if (ary[r][c] === "e") return true;
    ary[r][c] = 1;

    for (let d = 0; d < 4; d++) {
      const [nR, nC] = [r + dr[d], c + dc[d]];
      if (!(0 <= nR && nR < n && 0 <= nC && nC < n)) continue;
      if (graph[r][c].find((v) => v[0] === nR && v[1] === nC)) continue;
      stk.push([nR, nC]);
    }
  }
  return false;
};

let ret = 0;

//소의 경우의수 마다 갈 수 있는지 계산
for (let i = 0; i < cowInfo.length - 1; i++) {
  for (let j = i + 1; j < cowInfo.length; j++) {
    const [sR, sC] = cowInfo[i];
    const [eR, eC] = cowInfo[j];
    const cowMap = [...Array(n)].map((_) => Array(n).fill(0));
    ret += dfs(cowMap, sR, sC, eR, eC) ? 0 : 1;
  }
}
console.log(ret);
